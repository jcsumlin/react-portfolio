import type { KnipConfig } from 'knip';

const config: KnipConfig = {
  entry: ['src/main.tsx'],
  ignore: [
    'src/vite-env.d.ts',
    'src/routeTree.gen.ts',
    'worker-configuration.d.ts',
  ],
};

export default config;
