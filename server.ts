import express from 'express';
import { ReactNode } from 'react';
import { renderToPipeableStream } from 'react-dom/server';
import { createServer as createViteServer } from 'vite';

const PORT = process.env.PORT || 7000;
const app = express();

const vite = await createViteServer({
  appType: 'custom',
  server: {
    middlewareMode: true,
  },
});

app.use(vite.middlewares);

app.use('*', async (req, res, next) => {
  const url = req.originalUrl;

  try {
    const isProduction = process.env.NODE_ENV?.toLowerCase() === 'production';
    const entryPath = isProduction ? './server/entry-server.js' : '/src/entry-server.tsx';
    const xx = isProduction ? await import(entryPath) : await vite.ssrLoadModule(entryPath);
    const gc = xx['gc'];
    const nodes: ReactNode = gc(url);

    let didError = false;
    const pipe = renderToPipeableStream(nodes, {
      bootstrapModules: ['./src/entry-client.tsx'],
      onShellReady: () => {
        res.statusCode = didError ? 500 : 200;
        res.setHeader('Content-type', 'text/html; charset=utf-8');
        pipe.pipe(res);
      },
      onError: (error) => {
        didError = true;
        console.log(error);
      },
    });
  } catch (e) {
    vite.ssrFixStacktrace(e as Error);
    next(e);
  }
});

app.listen(PORT, () => {
  console.log(`Server is listening on port ${PORT}`);
});
