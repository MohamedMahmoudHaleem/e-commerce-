import React from "react";

interface ErrorMessageProps {
  message: string;
  onRetry?: () => void;
}

const ErrorMessage: React.FC<ErrorMessageProps> = ({ message, onRetry }) => (
  <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative">
    <strong className="font-bold">Error!</strong>
    <span className="block sm:inline"> {message}</span>
    {onRetry && (
      <button onClick={onRetry} className="absolute top-0 right-0 px-4 py-3">
        Retry
      </button>
    )}
  </div>
);

export default React.memo(ErrorMessage);
