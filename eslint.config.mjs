import { dirname } from "path";
import { fileURLToPath } from "url";
import { FlatCompat } from "@eslint/eslintrc";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const compat = new FlatCompat({
  baseDirectory: __dirname,
});

const eslintConfig = [
  ...compat.extends("next/core-web-vitals", "next/typescript"),
  {
    rules: {
      'no-restricted-imports': ['error', {
        paths: [
          {
            name: '@/lib/api',
            importNames: ['formatBytes', 'formatSpeed', 'formatPercent'],
            message: '请从 "@/lib/utils" 引入格式化函数（API 层禁止导出格式化函数）'
          }
        ]
      }]
    }
  }
];

export default eslintConfig;
