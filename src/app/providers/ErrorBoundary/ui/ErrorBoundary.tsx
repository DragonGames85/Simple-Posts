import React, { ErrorInfo, ReactNode, Suspense } from 'react';
import { PageError } from 'widgets/pageError';
// https://ru.react.js.org/docs/error-boundaries.html
interface ErrorBoundaryProps {
    children: ReactNode;
}

interface ErrorBoundaryState {
    hasError: boolean;
}

class ErrorBoundary
    extends React.Component<ErrorBoundaryProps, ErrorBoundaryState> {
    constructor(props: ErrorBoundaryProps) {
        super(props);
        this.state = { hasError: false };
    }

    static getDerivedStateFromError(error: Error) {
        // Update state so the next render will show the fallback UI.
        return { hasError: true };
    }

    public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
        // You can also log the error to an error reporting service
        console.log('Uncaught error:', error, errorInfo);
    }

    public render() {
        const { hasError } = this.state;
        const { children } = this.props;
        // if you need translate here, use withTranslation from "react-i18next"
        // export deffault withTranslatiion()(ErrorBoundary)
        // ТАКЖЕ НЕ ЗАБЫВАЕМ SUSPENSE, чтобы подгружал переводы
        if (hasError) {
            return <Suspense fallback=""><PageError /></Suspense>;
        }

        return children;
    }
}

export default ErrorBoundary;
