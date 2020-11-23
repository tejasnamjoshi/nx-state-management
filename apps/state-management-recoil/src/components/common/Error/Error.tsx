import React from 'react';

export interface IError {
  children: any;
}

interface IState {
  hasError: boolean;
  errorMessage: string;
}

class Error extends React.Component<IError, IState> {
  state = { hasError: false, errorMessage: '' };

  static getDerivedStateFromError(error: any) {
    // Update state so the next render will show the fallback UI.
    return { hasError: true };
  }

  dismissError = () => {
    this.setState({ hasError: false, errorMessage: '' });
  };

  componentDidCatch(error: any, errorInfo: any) {
    // You can also log the error to an error reporting service
    this.setState({ hasError: true, errorMessage: error.message });
  }

  render() {
    if (this.state.hasError) {
      // You can render any custom fallback UI
      return (
        <div className="Error d-flex justify-content-center mt-4">
          <div className="alert alert-danger alert-dismissible fade show" role="alert">
            <p className="m-0">{this.state.errorMessage}</p>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}

export default Error;
