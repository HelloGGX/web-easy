import {
  eslintPluginPrettierVueVersion,
  eslintPluginTypescriptVueVersion,
  eslintPluginVueVersion,
} from './versions';

export const extraVueEslintDependencies = {
  dependencies: {},
  devDependencies: {
    'eslint-plugin-vue': eslintPluginVueVersion,
    '@vue/eslint-config-prettier': eslintPluginPrettierVueVersion,
    '@vue/eslint-config-typescript': eslintPluginTypescriptVueVersion,
  },
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const extendVueEslintJson = (json: any) => {
  const { extends: pluginExtends, ...config } = json;

  return {
    extends: [
      'plugin:vue/vue3-essential',
      'eslint:recommended',
      '@vue/eslint-config-typescript',
      '@vue/eslint-config-prettier/skip-formatting',
      ...(pluginExtends || []),
    ],
    ...config,
  };
};

export const extraReactEslintDependencies = {
  dependencies: {},
  devDependencies: {
    '@typescript-eslint/eslint-plugin': '^6.18.1',
    '@typescript-eslint/parser': '^6.18.1',
    eslint: '^8.56.0',
    "eslint-config-prettier": "^9.1.0",
    'eslint-plugin-react': '^7.33.2',
  },
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const extendReactEslintJson = (json: any) => {
  const { extends: pluginExtends, ...config } = json;

  return {
    extends: [
      'eslint:recommended',
      'plugin:react/recommended',
      'plugin:@typescript-eslint/recommended',
      'prettier',
      ...(pluginExtends || []),
    ],
    parser: '@typescript-eslint/parser',
    parserOptions: {
      ecmaVersion: 'latest',
      sourceType: 'module',
    },
    plugins: ['react', '@typescript-eslint'],
    ...config,
  };
};
