import React, { ReactNode } from 'react';
import { entryRender } from './entry-shared';

export function gc(url: string): ReactNode {
  return <div id="root">{entryRender(true, url)}</div>;
}
