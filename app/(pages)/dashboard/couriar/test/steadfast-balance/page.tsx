import React from 'react'

const Page = () => {
  return (
    <div className="w-full max-w-4xl mx-auto p-4 sm:p-6 lg:p-8">
      <div className="bg-white rounded-lg shadow p-4 sm:p-6">
        <h2 className="text-lg sm:text-xl font-semibold text-gray-800 mb-4">
          Steadfast Courier Balance
        </h2>
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <p className="text-sm text-gray-500">Current Balance</p>
            <p className="text-2xl sm:text-3xl font-bold text-gray-900">৳ 0.00</p>
          </div>
          <button className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition-colors text-sm sm:text-base">
            Refresh
          </button>
        </div>
      </div>
    </div>
  )
}

export default Page