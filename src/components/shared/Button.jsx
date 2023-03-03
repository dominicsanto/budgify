import React from "react";

export function Button({ children, classes, ...rest }) {
  return (
    <button
      type="button"
      className={
        `relative inline-flex  active:bg-gray-500 active:border-gray-300 justify-center items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 ${classes}`}
      {...rest}
    >
      {children}
    </button>
  );
}

export function PageButton({ children, classes, ...rest }) {
  return (
    <button
      type="button"
      className={
        `relative inline-flex items-center justify-center px-2 py-2 active:bg-gray-500 active:border-gray-300 text-sm font-medium text-gray-500 hover:bg-gray-50 ${classes}`}
      {...rest}
    >
      {children}
    </button>
  );
}
