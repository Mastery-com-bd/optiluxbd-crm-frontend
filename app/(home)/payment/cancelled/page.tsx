

import React from 'react';
import { XCircle, RefreshCcw, Home } from 'lucide-react'; // Icons

export default function Cancelled() {
    return (
        <div className="min-h-screen flex items-center justify-center  px-4">
            <div className="max-w-md w-full effect rounded-2xl shadow-xl p-8 text-center">
                {/* Icon Section */}
                <div className="flex justify-center mb-6">
                    <div className="bg-red-100 p-4 rounded-full">
                        <XCircle className="w-16 h-16 text-red-500" />
                    </div>
                </div>

                {/* Text Content */}
                <h1 className="text-3xl font-bold text-gray-100 mb-2">
                    Payment Cancelled
                </h1>
                <p className="text-gray-600 mb-8">
                    Apnar payment-ti cancel kora hoyeche. Kono taka kata hoyni. Jodi bhulboshto hoye thake, nicher button-e click kore abar chesta korun.
                </p>

                {/* Action Buttons */}
                <div className="space-y-4">
                    <button
                        // Link to your checkout
                        className="w-full flex items-center justify-center gap-2 bg-indigo-600 hover:bg-indigo-700 text-white font-semibold py-3 rounded-lg transition duration-300"
                    >
                        <RefreshCcw className="w-5 h-5" />
                        Try Again
                    </button>

                    <button
                         // Link to home
                        className="w-full flex items-center justify-center gap-2 bg-gray-100 hover:bg-gray-200 text-gray-700 font-semibold py-3 rounded-lg transition duration-300"
                    >
                        <Home className="w-5 h-5" />
                        Back to Home
                    </button>
                </div>

                {/* Support Text */}
                <p className="mt-8 text-sm text-gray-500">
                    Kono somossa hole amader <a href="/support" className="text-indigo-600 underline">support</a> e jogajog korun.
                </p>
            </div>
        </div>
    );
}