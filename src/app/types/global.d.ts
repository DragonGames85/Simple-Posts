declare module '*.scss' {
  // для модулей
  // https://stackoverflow.com/questions/41336858/how-to-import-css-modules-with-typescript-react-and-webpack
  interface IClassNames {
    [className: string]: string;
  }
  const classNames: IClassNames;
  export = classNames;
}

declare module '*.png';
declare module '*.jpg';
declare module '*.jpeg'; // https://stackoverflow.com/questions/44717164/unable-to-import-svg-files-in-typescript
declare module '*.svg' {
  // https://github.com/gregberge/svgr/issues/546
  import React from 'react';

  const SVG: React.VFC<React.SVGProps<SVGSVGElement>>;
  export default SVG;
}

// каждую глобальную переменную совместно с DefinePlugin нужно декларировать
declare const __IS_DEV__: boolean;
declare const __API__: string;
declare const __PROJECT__: 'storybook' | 'frontend' | 'jest';

type DeepPartial<T> = T extends object // собственный deep partial
  ? {
      [P in keyof T]?: DeepPartial<T[P]>;
    }
  : T;
