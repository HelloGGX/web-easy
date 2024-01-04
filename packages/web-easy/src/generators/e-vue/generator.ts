import {
  formatFiles,
  generateFiles,
  names,
  readJson,
  Tree,
} from '@nx/devkit';
import * as path from 'path';
import { EVueGeneratorSchema } from './schema';

export async function eVueGenerator(tree: Tree, options: EVueGeneratorSchema) {

  const scopeName = readJson(tree, 'package.json').name;

  const resolveOptions = {
    ...options,
    name: names(options.name).fileName,
    scope: scopeName
  };

  const projectRoot = `/${options.name}`;
  
  generateFiles(tree, path.join(__dirname, 'files'), projectRoot, resolveOptions);
  await formatFiles(tree);
}

export default eVueGenerator;
