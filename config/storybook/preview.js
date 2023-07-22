import { addDecorator } from '@storybook/react';
import { StyleDecorator } from '../../src/shared/config/storybook/StyleDecorator/StyleDecorator';
import { ThemeDecorator } from '../../src/shared/config/storybook/ThemeDecorator/ThemeDecorator';
import { Theme } from '../../src/app/providers/ThemeProvider';
import { RouterDecorator } from '../../src/shared/config/storybook/RouterDecorator/RouterDecorator';
import { SuspenseDecorator } from '../../src/shared/config/storybook/SuspenseDecorator/SuspenseDecorator';

// тут пути ОТНОСИТЕЛЬНЫЕ, т.к. мы настроили абсолютные импорты только для папки src
// файл для декораторов сторис и прочей обертки
// https://storybook.js.org/docs/react/configure/overview#configure-story-rendering

export const parameters = {
    actions: { argTypesRegex: '^on[A-Z].*' },
    controls: {
        matchers: {
            color: /(background|color)$/i,
            date: /Date$/,
        },
    },
    layout: 'fullscreen', // без padding вокруг сторис
    themes: { // темы для storybook-addon-themes
        default: 'light',
        list: [
            { name: 'light', class: Theme.LIGHT, color: '#ffffff' },
            { name: 'dark', class: Theme.DARK, color: '#000000' },
            { name: 'orange', class: Theme.ORANGE, color: '#ffb005' },
        ],
    },
};
// про декораторы: https://storybook.js.org/docs/react/writing-stories/decorators
// декоратор для подключения глобальных стилей
addDecorator(StyleDecorator);
// декоратор для светлой и темной темы
addDecorator(ThemeDecorator(Theme.LIGHT));
// декоратор для компонентов с ссылками href, to
addDecorator(RouterDecorator);
// декоратор для компонентов с suspense
addDecorator(SuspenseDecorator);
