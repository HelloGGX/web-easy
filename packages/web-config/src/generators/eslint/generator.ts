import {
  formatFiles,
  GeneratorCallback,
  runTasksInSerial,
  Tree,
} from '@nx/devkit';
import { EslintGeneratorSchema } from './schema';
import { normalizeOptions } from './lib/normalize-options';
import { addVueLinter } from './lib/add-vueLinter';
import { addReactLinter } from './lib/add-reactLinter';

export async function eslintGenerator(
  tree: Tree,
  options: EslintGeneratorSchema
) {
  const tasks: GeneratorCallback[] = [];
  const normalizedOptions = normalizeOptions(tree, options);
  console.log(normalizedOptions);
  /**
   * 添加eslint配置
   */
  if (normalizedOptions.preset === 'vue') {
    const lintTask = await addVueLinter(tree, normalizedOptions);
    tasks.push(lintTask);
  } else {
    const lintTask = await addReactLinter(tree, normalizedOptions);
    tasks.push(lintTask);
  }

  if (!options.skipFormat) {
    await formatFiles(tree);
  }
  /**
   * 执行任务队列
   */
  return runTasksInSerial(...tasks);
}

export default eslintGenerator;
