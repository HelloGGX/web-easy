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
import { exec } from 'child_process';

export async function initGenerator(host: Tree, schema: InitGeneratorSchema) {
  const tasks: GeneratorCallback[] = [];

  const installPackagesTask = addDependencies(host);
  tasks.push(installPackagesTask);

  // const exec = (opts = { cwd: undefined, env: undefined }) => {
  //   const command = ['npx nx@latest init']
  //   .concat(args)
  //   .join(' ');
  //   return new Promise((resolve, reject) => {
  //     exec(
  //       command,
  //       {
  //         cwd,
  //         env: { ...process.env, ...(env ?? {}) },
  //       },
  //       (error, stdout, stderr) => {
  //         if (error) {
  //           reject({ error, stdout, stderr });
  //         }
  //         resolve({ stdout, stderr });
  //       }
  //     ).stdout.pipe(process.stdout);
  //   });
  // };

  // const initNx = async () => {
  //   return exec('npx nx@latest init');
  // };

  // tasks.push(initNx);

  await jsInitGenerator(host, {
    skipFormat: true,
  });

  addPluginToNxJson('@web-easy/web-config', host);

  if (!schema.skipFormat) {
    await formatFiles(host);
  }

  return runTasksInSerial(...tasks);
}

export default initGenerator;
export const initSchematic = convertNxGenerator(initGenerator);
