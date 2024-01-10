import {
  eslintPluginParserVersion,
  eslintPluginPrettierReactVersion,
  eslintPluginPrettierVueVersion,
  eslintPluginReactVersion,
  eslintPluginTypescriptVersion,
  eslintPluginTypescriptVueVersion,
  eslintPluginVueVersion,
  eslintVersion,
} from './versions';

export const extraVueEslintDependencies = {
  dependencies: {},
  devDependencies: {
    'eslint': eslintVersion,
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
    '@typescript-eslint/eslint-plugin': eslintPluginTypescriptVersion,
    '@typescript-eslint/parser': eslintPluginParserVersion,
    'eslint': eslintVersion,
    "eslint-config-prettier": eslintPluginPrettierReactVersion,
    'eslint-plugin-react': eslintPluginReactVersion,
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
