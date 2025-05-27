import React from "react";

export default function Orders() {
  return (
    <div className="flex flex-col items-center justify-center min-h-[60vh] px-4 py-12 text-center">
      <div className="text-5xl md:text-6xl mb-4">🚧</div>
      <h1 className="text-2xl md:text-3xl font-bold mb-2">Orders Page</h1>
      <p className="text-gray-600 dark:text-gray-300 text-base md:text-lg max-w-md mb-6">
        This page is under construction.
        <br />
        Please check back soon!
      </p>
      <a
        href="/"
        className="inline-block bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-lg px-6 py-2 text-base md:text-lg transition-colors"
      >
        ← Back to Home
      </a>
    </div>
  );
}
