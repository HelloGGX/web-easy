import { runTasksInSerial, Tree } from '@nx/devkit';
import { ApplicationGeneratorSchema } from './schema';
import initGenerator from '../init/generator';
import eslintGenerator from '../eslint/generator';

export async function applicationGenerator(
  tree: Tree,
  options: ApplicationGeneratorSchema
) {
  const resolveOptions = {
    ...options,
    skipFormat: true,
  };
  // 初始化
  const initTask = await initGenerator(tree, resolveOptions);
  
  const lintTask = await eslintGenerator(tree, {
    name: resolveOptions.name,
    skipFormat: resolveOptions.skipFormat,
    preset: resolveOptions.preset
  });
  /**
   * 执行任务队列
   */
  return runTasksInSerial(initTask, lintTask);
}

export default applicationGenerator;
