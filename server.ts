import path from "path";
import fs from "fs";
import React, { ReactNode } from "react";
import ReactDOMServer, { PipeableStream, renderToPipeableStream } from "react-dom/server";
import express from "express";
import {createServer as createViteServer} from 'vite';
import stream, { pipeline } from "stream";
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);

const __dirname = path.dirname(__filename);

const PORT = process.env.PORT || 7000;
const app = express();

// const html = fs
//   .readFileSync(path.resolve(__dirname, "./dist/client/index.html"))
//   .toString();



const vite = await createViteServer({
  appType: 'custom',
  server: {
    middlewareMode: true
  }
});

app.use(vite.middlewares);


app.use('*',
  async (req, res, next) =>{

    const url = req.originalUrl;
    console.log(url);

    try {

    const xx = await vite.ssrLoadModule('./src/entry-server.tsx');
    const func = await xx['render'];

    const gc = xx['gc'];

    console.log(gc);

    const nodes:ReactNode = gc(url);

    let didError = false;
    const pipe = renderToPipeableStream(nodes
      ,
      {
        bootstrapModules: ['./src/entry-client.tsx'],
        onShellReady: () => {
            res.statusCode = didError ? 500 : 200;
            res.setHeader('Content-type', 'text/html');
            pipe.pipe(res);
        },
        onError: (error) => {
            didError = true;
            console.log(error);
        }
    });

  } catch (e) {
    vite.ssrFixStacktrace(e as Error);
    next(e);
  }

});



app.listen(PORT, () => {
  console.log(`Server is listening on port ${PORT}`);
});

