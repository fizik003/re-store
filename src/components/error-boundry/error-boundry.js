import React, { Component } from "react";
import ErrorIndicator from "../error-indicator";

export class ErrorBoundry extends Component {
  state = {
    hasError: false,
  };

  componentDidCatch() {
    this.setState({ hasError: true });
  }

  render() {
    const { hasError } = this.state;
    const { children } = this.props;
    return (
      <>
        {hasError && <ErrorIndicator />}
        {!hasError && children}
      </>
    );
  }
}

export default ErrorBoundry;
