import ErrorPage from '@/pages/common/ErrorPage';
import { Component, ErrorInfo } from 'react';

interface Props {
  children: React.ReactNode;
}

interface State {
  hasError: boolean;
  error?: Error;
  component: string;
}

class ErrorBoundary extends Component<Props, State> {
  state: State = {
    hasError: false,
    error: undefined,
    component: '',
  };

  static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error, component: '' };
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    this.setState({
      hasError: true,
      error,
      component: errorInfo.componentStack || '',
    });
  }

  render() {
    if (this.state.hasError) {
      return <ErrorPage error={this.state.error} />;
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
