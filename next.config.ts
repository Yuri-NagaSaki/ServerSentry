import type { NextConfig } from 'next'

const nextConfig: NextConfig = {
  reactStrictMode: true,
  output: 'standalone',
  images: {
    unoptimized: true,
  },
  compiler: {
    removeConsole: process.env.NODE_ENV === 'production',
  },
  experimental: {
    // 现代浏览器优化
    optimizePackageImports: ['lucide-react'],
  },
  webpack: (config, { dev, isServer }) => {
    if (!dev && !isServer) {
      // 完全禁用所有polyfill和转换
      config.resolve.fallback = {
        ...config.resolve.fallback,
        // 禁用核心polyfill
        'core-js': false,
        'regenerator-runtime': false,
        'es6-promise': false,
        'whatwg-fetch': false,
        // 禁用其他polyfill
        'buffer': false,
        'crypto': false,
        'stream': false,
        'util': false,
        'assert': false,
        'http': false,
        'https': false,
        'os': false,
        'url': false,
      };
      
      // 移除polyfill别名
      config.resolve.alias = {
        ...config.resolve.alias,
        'core-js/stable': false,
        'core-js/features': false,
        'core-js/es': false,
        'core-js/web': false,
        'regenerator-runtime/runtime': false,
        '@babel/runtime': false,
      };
      
      // 现代浏览器目标配置
      config.target = 'web';
      config.optimization = {
        ...config.optimization,
        usedExports: true,
        sideEffects: false,
        minimize: true,
        // 针对现代浏览器的chunk分割
        splitChunks: {
          ...config.optimization.splitChunks,
          cacheGroups: {
            ...config.optimization.splitChunks?.cacheGroups,
            modern: {
              name: 'modern',
              test: /[\\/]node_modules[\\/]/,
              priority: 30,
              chunks: 'all',
              enforce: true,
            },
          },
        },
      };

      // 移除不必要的babel转换
      config.module.rules = config.module.rules.map((rule: any) => {
        if (rule.use && rule.use.loader && rule.use.loader.includes('babel-loader')) {
          return {
            ...rule,
            use: {
              ...rule.use,
              options: {
                ...rule.use.options,
                presets: [
                  ['next/babel', {
                    'preset-env': {
                      targets: {
                        browsers: ['> 1%', 'last 2 versions', 'not ie <= 11'],
                        esmodules: true,
                      },
                      modules: false,
                      useBuiltIns: false,
                      bugfixes: true,
                    },
                  }],
                ],
              },
            },
          };
        }
        return rule;
      });
    }
    return config;
  },
  async rewrites() {
    return [
      {
        source: '/api/:path*',
        destination: process.env.NEXT_PUBLIC_API_URL ? `${process.env.NEXT_PUBLIC_API_URL}/:path*` : '/api/:path*',
      },
    ];
  },
  async headers() {
    return [
      {
        source: '/api/:path*',
        headers: [
          { key: 'Access-Control-Allow-Credentials', value: 'true' },
          { key: 'Access-Control-Allow-Origin', value: '*' },
          { key: 'Access-Control-Allow-Methods', value: 'GET,POST,PUT,DELETE,OPTIONS' },
          { key: 'Access-Control-Allow-Headers', value: 'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version' },
        ],
      },
    ];
  },
};

export default nextConfig;
