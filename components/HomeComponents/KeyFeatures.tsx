'use client';
import { Zap, Repeat, BarChart } from 'lucide-react';

export default function KeyFeatures() {
    return (
        <section className="w-full px-6 md:px-12 lg:px-20 py-20 bg-white">
            {/* Section Header */}
            <div className="text-center max-w-3xl mx-auto mb-12">
                <p className="text-xs font-bold text-yellow-800 bg-yellow-200 inline-block px-4 py-1 rounded-full">
                    KEY FEATURES
                </p>
                <h2 className="mt-4 text-3xl md:text-4xl font-bold text-gray-900">
                    Powerful Features to Drive Sales Success
                </h2>
                <p className="mt-4 text-sm text-gray-600">
                    Our platform is packed with features designed to streamline your sales workflow and maximize productivity.
                </p>
            </div>

            {/* Cards with animation */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-10">
                {/* Feature 1 */}
                <div className="bg-gradient-to-br from-yellow-100 to-yellow-200 p-6 rounded-xl shadow-sm h-full cursor-pointer transition duration-300 transform hover:scale-105 hover:shadow-lg">
                    <div className="w-10 h-10 bg-yellow-400 text-white flex items-center justify-center rounded-md mb-4">
                        <Zap size={20} />
                    </div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-2">Lead Management</h3>
                    <p className="text-sm text-gray-700 mb-4">
                        Organize and manage all your leads in one place, from initial contact to conversion, with easy access to all relevant info.
                    </p>
                    <a href="#" className="text-sm font-medium text-yellow-600 hover:underline">
                        Explore All Features &rarr;
                    </a>
                </div>

                {/* Feature 2 */}
                <div className="bg-gradient-to-br from-yellow-100 to-yellow-200 p-6 rounded-xl shadow-sm h-full cursor-pointer transition duration-300 transform hover:scale-105 hover:shadow-lg">
                    <div className="w-10 h-10 bg-yellow-400 text-white flex items-center justify-center rounded-md mb-4">
                        <Repeat size={20} />
                    </div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-2">Sales Automation</h3>
                    <p className="text-sm text-gray-700 mb-4">
                        Automate repetitive tasks and set up custom workflows to save time and ensure nothing falls through the cracks.
                    </p>
                    <a href="#" className="text-sm font-medium text-yellow-600 hover:underline">
                        Explore All Features &rarr;
                    </a>
                </div>

                {/* Feature 3 */}
                <div className="bg-gradient-to-br from-yellow-100 to-yellow-200 p-6 rounded-xl shadow-sm h-full cursor-pointer transition duration-300 transform hover:scale-105 hover:shadow-lg">
                    <div className="w-10 h-10 bg-yellow-400 text-white flex items-center justify-center rounded-md mb-4">
                        <BarChart size={20} />
                    </div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-2">Analytics & Reporting</h3>
                    <p className="text-sm text-gray-700 mb-4">
                        Gain valuable insights into your sales performance with real-time metrics and customizable reports.
                    </p>
                    <a href="#" className="text-sm font-medium text-yellow-600 hover:underline">
                        Explore All Features &rarr;
                    </a>
                </div>
            </div>
        </section>
    );
}