import {
  formatFiles,
  generateFiles,
  installPackagesTask,
  names,
  readJson,
  Tree,
  updateJson,
} from '@nx/devkit';
import * as path from 'path';
import { EVueGeneratorSchema } from './schema';

function updatePackageJson(tree) {
  updateJson(tree, 'package.json', (pkgJson) => {
    // if scripts is undefined, set it to an empty object
    pkgJson.scripts = pkgJson.scripts ?? {};
    // 定义命令集
    // "format:check": "prettier --check '**/*.{js,ts,tsx,css,yml,json}'",
    // "format:write": "prettier --write '**/*.{js,ts,tsx,css,yml,json}'",
    // "lint": "nx run-many -t lint",
    // "test": "nx run-many -t test"

    pkgJson.scripts['format:check'] =
      "prettier --ignore-path .prettierignore --check '**/*.{js,ts,tsx,css,yml,json}'";
    pkgJson.scripts['format:write'] =
      'prettier --ignore-path .prettierignore --write "**/*.+(js|json|ts|tsx|vue)"';
    pkgJson.scripts['lint'] = 'nx run-many -t lint';
    pkgJson.scripts['test'] = 'nx run-many -t test';

    // return modified JSON object
    return pkgJson;
  });
}

export async function eVueGenerator(tree: Tree, options: EVueGeneratorSchema) {
  const scopeName = readJson(tree, 'package.json').name;

  const resolveOptions = {
    ...options,
    name: names(options.name).fileName,
    scope: scopeName,
  };

  console.log(resolveOptions);

  const projectRoot = `/${options.name}`;
  // 修改packageJson
  updatePackageJson(tree);
  // 生成文件
  generateFiles(
    tree,
    path.join(__dirname, 'files'),
    projectRoot,
    resolveOptions
  );
  await formatFiles(tree);
  return () => {
    installPackagesTask(tree);
  };
}

export default eVueGenerator;
