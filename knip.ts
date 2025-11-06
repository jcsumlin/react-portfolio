import type { KnipConfig } from 'knip';

const config: KnipConfig = {
  entry: ['src/main.tsx', 'worker/index.ts', 'index.html'],
  project: [
    'src/**/*.{ts,tsx}',
    'worker/**/*.{ts,tsx}',
    'functions/**/*.{ts,tsx}',
  ],
  ignore: [
    'vite-env.d.ts',
    'src/routeTree.gen.ts',
    'worker-configuration.d.ts',
    'src/types/index.d.ts',
    'src/components/Projects.tsx', // temporarily ignore
    'src/routeTree.gen.ts', // generated file
  ],
  ignoreDependencies: [
    'tailwindcss',
    '@svgr/plugin-svgo',
    '@react-email/preview-server',
    '@react-email/components',
    'tw-animate-css',
  ],
};

export default config;
