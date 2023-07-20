import '@/app/styles/index.scss';
import { Story } from '@storybook/react';
// декоратор подключающий глобальные стили в сторис
export const StyleDecorator = (story: () => Story) => story();
