import {
  convertNxGenerator,
  formatFiles,
  GeneratorCallback,
  Tree,
  runTasksInSerial,
} from '@nx/devkit';
import { initGenerator as jsInitGenerator } from '@nx/js';

import { InitGeneratorSchema } from './schema';
import { addPluginToNxJson } from '../../utils/add-plugin-to-nx-json';
import { addDependencies } from './lib/add-dependencies';

export async function initGenerator(host: Tree, schema: InitGeneratorSchema) {
  const tasks: GeneratorCallback[] = [];

  const installPackagesTask = addDependencies(host);
  tasks.push(installPackagesTask);

  await jsInitGenerator(host, {
    skipFormat: false,
  });

  addPluginToNxJson('@web-easy/web-config', host);

  if (!schema.skipFormat) {
    await formatFiles(host);
  }

  return runTasksInSerial(...tasks);
}

export default initGenerator;
export const initSchematic = convertNxGenerator(initGenerator);
