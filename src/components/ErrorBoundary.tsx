import React, { Component, ErrorInfo, ReactNode } from "react";
import { Box } from "@mui/material";
import SomethingWentWrong from "./SomethingWentWrong";

interface ErrorBoundaryProps {
  children: ReactNode;
}

interface ErrorBoundaryState {
  hasError: boolean;
}

class ErrorBoundary extends Component<ErrorBoundaryProps, ErrorBoundaryState> {
  constructor(props: ErrorBoundaryProps) {
    super(props);
    this.state = { hasError: false };
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    // You can log the error or send it to an error reporting service
    console.error("Error:", error);
    this.setState({ hasError: true });
  }

  render() {
    if (this.state.hasError) {
      // You can render a fallback UI when an error occurs
      return (
        <>
          <Box
            component='main'
            sx={{
              alignItems: "center",
              display: "flex",
              flexGrow: 1,
              minHeight: "93vh",
            }}
          >
            <SomethingWentWrong />
          </Box>
        </>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
