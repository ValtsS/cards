// eslint-disable-next-line import/no-extraneous-dependencies
import { type CodegenConfig } from '@graphql-codegen/cli';

const config: CodegenConfig = {
  schema: 'http://lyra.velns.org:8000/graphql',
  documents: ['src/**/*.graphql'],
  generates: {
    './src/__generated__/': {
      config: {
        scalars: {
          DateTime: 'Date',
        },
      },
      preset: 'client',
      presetConfig: {
        fragmentMasking: false,
        strictScalars: true,
        defaultScalarType: false,
      },
    },
  },
  hooks: { afterAllFileWrite: ['prettier --write'] },
};

export default config;
