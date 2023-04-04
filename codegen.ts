// eslint-disable-next-line import/no-extraneous-dependencies
import { type CodegenConfig } from '@graphql-codegen/cli';

const config: CodegenConfig = {
  schema: 'http://lyra.velns.org:8000/graphql',
  documents: ['src/**/*.graphql'],
  generates: {
    './src/__generated__/': {
      preset: 'client',
    },
  },
  hooks: { afterAllFileWrite: ['prettier --write'] },
};

export default config;
