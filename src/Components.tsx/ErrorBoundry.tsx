import React from "react";
import { Link } from "react-router-dom";
export const ErrorComponent = () => {
  return (
    <div className="w-full h-full flex content-center items-center">
      <div className="w-full flex flex-col items-center">
        <p className="text-2xl font-bold mb-0">Oops! Error</p>
        <p className="text-center font-normal mt-3 text-base">
          Sorry! Something Went Wrong
        </p>
        <Link to='/' className="bg-blue-500 text-white py-2 px-4 rounded-md ">Back to home</Link>
      </div>
    </div>
  );
};

class ErrorBoundary extends React.Component {
  constructor(props: any) {
    super(props);
    this.state = { hasError: false };
  }

  componentDidUpdate() {
    if (this.state.hasError) {
      // eslint-disable-next-line
      this.state.hasError = false;
    }
  }

  static getDerivedStateFromError(error: any) {
    // Update state so the next render will show the fallback UI.
    return { hasError: true };
  }

  componentDidCatch(error: any, errorInfo: any) {
    // You can also log the error to an error reporting service
    console.log(error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      // You can render any custom fallback UI
      return <ErrorComponent />;
    }

    return this.props.children;
  }
}

export { ErrorBoundary };
