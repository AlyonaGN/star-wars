import { Component, ErrorInfo, ReactNode } from "react";
import { PersonInterface } from '../interfaces/Person';

interface Props {
  children: ReactNode;
  setPerson: (person: PersonInterface) => void;
}

interface State {
  hasError: boolean;
}

class ErrorBoundary extends Component<Props, State> {
  public state: State = {
    hasError: false
  };

  public static getDerivedStateFromError(_: Error): State {
    return { hasError: true };
  }

  public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error("Uncaught error:", error, errorInfo);
  }

  public render() {
    return this.props.children;
  }
}

export default ErrorBoundary;
