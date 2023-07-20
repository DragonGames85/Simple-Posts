import { ReactNode } from 'react';
import { render } from '@testing-library/react';
import { I18nextProvider } from 'react-i18next';
import i18nForTests from '@/shared/config/i18n/i18nForTests';
// дружим jest c компонентами с переводом i18n, для него мы создали отдельный i18nForTests конфиг
// этот helper нужен для того чтобы мы не добавляли провайдеры в каждый тест
// https://react.i18next.com/misc/testing
export function renderWithTranslation(component: ReactNode) {
    return render(
        <I18nextProvider i18n={i18nForTests}>
            {component}
        </I18nextProvider>,
    );
}
