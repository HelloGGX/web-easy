import { formatFiles, runTasksInSerial, Tree } from '@nx/devkit';
import { EslintGeneratorSchema } from './schema';
import { normalizeOptions } from './lib/normalize-options';
import initGenerator from '../init/generator';
import { addLinter } from './lib/add-linter';

export async function eslintGenerator(
  tree: Tree,
  options: EslintGeneratorSchema
) {
  const normalizedOptions = normalizeOptions(tree, options);

  const initTask = await initGenerator(tree, {
    ...options,
    skipFormat: true,
  });

  /**
   * 添加eslint配置
   */
  const lintTask = await addLinter(tree, normalizedOptions);

  if (!options.skipFormat) {
    await formatFiles(tree);
  }

  /**
   * 执行任务队列
   */
  return runTasksInSerial(initTask, lintTask);
}

export default eslintGenerator;
