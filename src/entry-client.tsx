import { hydrateRoot } from 'react-dom/client';
import { entryRender } from './entry-shared';

const root = document.getElementById('root') as HTMLElement;

hydrateRoot(root, entryRender(false));
