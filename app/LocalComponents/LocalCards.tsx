import React from 'react';

const LocalCards = () => {
    return (
        <div className="w-full mb-20">
        <div className="w-1/full  ml-24 grid grid-cols-3 gap-4 m-2">
          <article className="rounded-lg border border-gray-300 bg-black p-6 hover:shadow-lg">
            <div>
              <p className="text-sm text-white">Profit</p>

              <p className="text-2xl font-medium text-white">$240.94</p>
            </div>

            <div className="mt-1 flex gap-1 text-green-400">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-4 w-4"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6"
                />
              </svg>

              <p className="flex gap-2 text-xs">
                <span className="font-medium"> 67.81% </span>

                <span className="text-gray-100"> Since last week </span>
              </p>
            </div>
          </article>

          <article className="rounded-lg border border-gray-300 bg-white p-6 hover:shadow-lg">
            <div>
              <p className="text-sm text-gray-500">Profit</p>

              <p className="text-2xl font-medium text-gray-900">$240.94</p>
            </div>

            <div className="mt-1 flex gap-1 text-red-600">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-4 w-4"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M13 17h8m0 0V9m0 8l-8-8-4 4-6-6"
                />
              </svg>

              <p className="flex gap-2 text-xs">
                <span className="font-medium"> 67.81% </span>
                <span className="text-gray-500"> Since last week </span>
              </p>
            </div>
          </article>
        </div></div>
    );
};

export default LocalCards;