import React from 'react';

export default class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }

  componentDidCatch(error, errorInfo) {
    console.error('Heritage Shield ErrorBoundary caught an exception:', error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      if (this.props.fallback) {
        return this.props.fallback;
      }
      return (
        <div className="w-full min-h-[400px] p-8 flex flex-col items-center justify-center text-center bg-[#07080B] border border-amber-900/40 rounded-3xl text-[#FAF5ED] space-y-4">
          <div className="text-4xl">🏛️</div>
          <h3 className="text-lg font-serif font-bold text-[#C5A059]">
            {this.props.title || '3D Digital Twin Engine'}
          </h3>
          <p className="text-xs text-gray-400 font-mono max-w-md">
            WebGL acceleration recovered. Click below to reload the high-fidelity 3D viewport.
          </p>
          <button
            onClick={() => this.setState({ hasError: false, error: null })}
            className="px-5 py-2.5 rounded-xl terracotta-btn text-xs font-mono font-bold cursor-pointer shadow-md"
          >
            ↻ Reload 3D Twin Viewport
          </button>
        </div>
      );
    }

    return this.props.children;
  }
}
