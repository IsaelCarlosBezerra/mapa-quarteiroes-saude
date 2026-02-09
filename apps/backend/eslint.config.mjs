// @ts-check
import eslint from '@eslint/js';
import eslintPluginPrettierRecommended from 'eslint-plugin-prettier/recommended';
import globals from 'globals';
import tseslint from 'typescript-eslint';

export default tseslint.config(
  // 1) Ignorar o que NÃO deve ser lintado (build output e configs)
  {
    ignores: [
      'dist/**',
      'node_modules/**',
      'eslint.config.mjs',
      '**/*.d.ts', // opcional, mas evita ruído
    ],
  },

  // 2) Regras base
  eslint.configs.recommended,

  // 3) Type-aware lint APENAS para TS de código-fonte
  ...tseslint.configs.recommendedTypeChecked.map((cfg) => ({
    ...cfg,
    files: ['src/**/*.ts', 'test/**/*.ts', 'prisma.config.ts'],
  })),

  // 4) Prettier
  eslintPluginPrettierRecommended,

  // 5) Opções de linguagem só para os arquivos alvo
  {
    files: ['src/**/*.ts', 'test/**/*.ts', 'prisma.config.ts'],
    languageOptions: {
      globals: {
        ...globals.node,
        ...globals.jest,
      },
      sourceType: 'commonjs',
      parserOptions: {
        projectService: true,
        tsconfigRootDir: import.meta.dirname,
      },
    },
  },

  // 6) Suas regras
  {
    files: ['src/**/*.ts', 'test/**/*.ts', 'prisma.config.ts'],
    rules: {
      '@typescript-eslint/no-explicit-any': 'off',
      '@typescript-eslint/no-floating-promises': 'warn',
      '@typescript-eslint/no-unsafe-argument': 'warn',
      'prettier/prettier': ['error', { endOfLine: 'auto' }],
    },
  },
);
