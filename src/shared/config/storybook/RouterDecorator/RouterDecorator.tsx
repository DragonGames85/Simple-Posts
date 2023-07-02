import { Story } from '@storybook/react';
import { BrowserRouter } from 'react-router-dom';
// декоратор чтобы в компонентах где мы использовали href (ссылки), не возникала ошибка
export const RouterDecorator = (story: () => Story) => (
    <BrowserRouter>
        {story()}
    </BrowserRouter>
);
