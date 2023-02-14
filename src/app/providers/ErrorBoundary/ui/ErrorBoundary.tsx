import { Component, ErrorInfo, ReactNode, Suspense } from "react";
import { PageError } from "widgets/pageError";

interface Props {
  children: ReactNode;
}

interface State {
  hasError: boolean;
}

class ErrorBoundary extends Component<Props, State> {
  public state: State = {
    hasError: false,
  };

  public static getDerivedStateFromError(_: Error): State {
    // Update state so the next render will show the fallback UI.
    return { hasError: true };
  }

  public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error("Uncaught error:", error, errorInfo);
  }

  public render() {

    // if you need translate here, use withTranslation from "react-i18next"
    // export deffault withTranslatiion()(ErrorBoundary)
    if (this.state.hasError) {
      return <Suspense fallback={""}><PageError></PageError></Suspense>;
    }

    return this.props.children;
  }
}

export default ErrorBoundary;

