import { ReactNode } from 'react';
import { createPortal } from 'react-dom';

interface PortalProps {
    children: ReactNode; // что мы импортируем
    element?: HTMLElement; // куда
}

export const Portal = (props: PortalProps) => {
    const { children, element = document.body } = props;

    return createPortal(children, element);
};
