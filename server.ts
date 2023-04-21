import express from 'express';
import * as path from 'path';
import { ReactNode } from 'react';
import { renderToPipeableStream } from 'react-dom/server';
import { createServer as createViteServer } from 'vite';

import { fileURLToPath } from 'url';

const PORT = process.env.PORT || 7000;
const app = express();

const isProduction = process.env.NODE_ENV?.toLowerCase() === 'production';
const distpath = getDistPath();
const assetDir = 'assets';

const vite = !isProduction
  ? await createViteServer({
      appType: 'custom',
      server: {
        middlewareMode: true,
      },
    })
  : null;

if (vite) app.use(vite.middlewares);
else app.use(express.static(distpath, { maxAge: '30d', index: false }));

app.use('/', async (req, res, next) => {
  const url = req.originalUrl;

  try {
    const serverEntry = !vite ? './server/entry-server.js' : '/src/entry-server.tsx';
    const importedModule = !vite
      ? await import(serverEntry)
      : await vite.ssrLoadModule(serverEntry);
    const getContent = importedModule.getContent;
    const css = `./${assetDir}/entry-client.css`;
    const nodes: Promise<ReactNode> = await getContent(css, url);

    const entry = isProduction ? `./${assetDir}/entry-client.js` : './src/entry-client.tsx';

    let didError = false;
    const pipe = renderToPipeableStream(await nodes, {
      bootstrapModules: [entry],
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
    if (vite) {
      vite.ssrFixStacktrace(e as Error);
      next(e);
    } else {
      console.error('Error', e);
      res.status(500).end((e as Error).stack);
    }
  }
});

app.listen(PORT, () => {
  console.log(`${isProduction ? 'PROD' : 'Dev'} Server is listening on port ${PORT}`);
});

function getDistPath() {
  const __filename = fileURLToPath(import.meta.url);
  const __dirname = path.dirname(__filename);
  const distpath = path.resolve(__dirname);
  return distpath;
}
