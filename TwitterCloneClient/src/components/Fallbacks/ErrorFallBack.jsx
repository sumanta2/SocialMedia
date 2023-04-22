const  ErrorFallback=({ error, resetErrorBoundary }) =>{

    return (
      <div role="alert">
        <p>Something went wrong:</p>
        <pre style={{ color: "red" }}>{error.message}</pre>
        <button onClick={resetErrorBoundary}>Reset</button>
      </div>
    );
}
  export default ErrorFallback