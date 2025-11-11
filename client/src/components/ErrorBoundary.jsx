import React from 'react';

export default class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }
  static getDerivedStateFromError(err) {
    return { hasError: true };
  }
   componentDidCatch(err, info) {
  // log in non-test environments without import.meta
  if (typeof process !== 'undefined' && process.env && process.env.NODE_ENV !== 'test') {
    // eslint-disable-next-line no-console
    console.error('ErrorBoundary:', err, info);
  }
}
  render() {
    if (this.state.hasError) {
      return <div role="alert">Something went wrong. Please refresh the page.</div>;
    }
    return this.props.children;
  }
}