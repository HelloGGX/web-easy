export const enum Preset {
  VUE = 'vue',
  REACT = 'react',
}

export interface ApplicationGeneratorSchema {
  // 项目文件夹名称
  name: string;
  // 前端框架
  preset: Preset;
  // 是否需要eslint
  needEslint: boolean;
}
