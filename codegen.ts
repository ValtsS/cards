// eslint-disable-next-line import/no-extraneous-dependencies
import { type CodegenConfig } from '@graphql-codegen/cli';

const config: CodegenConfig = {
  schema: 'http://lyra.velns.org:8000/graphql',
  documents: ['src/**/*.graphql'],
  generates: {
    './src/__generated__/': {
      preset: 'client',
      presetConfig: {
        fragmentMasking: false,
        strictScalars: true,
        defaultScalarType: false,
        scalars: {
          DateTime: 'Date', // Convert DateTime types to Date
        },
        skipDocuments: ['**/*.gql.ts'], // Skip generating gql.ts files
      },
    },
  },
  hooks: { afterAllFileWrite: ['prettier --write'] },
};

export default config;
