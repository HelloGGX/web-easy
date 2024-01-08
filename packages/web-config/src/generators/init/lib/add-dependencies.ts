import {
  addDependenciesToPackageJson,
  GeneratorCallback,
  NX_VERSION,
  Tree,
} from '@nx/devkit';

export function addDependencies(tree: Tree): GeneratorCallback {
  return addDependenciesToPackageJson(
    tree,
    {},
    {
      '@nx/js': NX_VERSION
    }
  );
}
