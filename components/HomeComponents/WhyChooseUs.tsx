'use client';
import Image from 'next/image';

export default function WhyChooseUs() {
    return (
        <section className="w-full px-6 md:px-12 lg:px-20 py-20 bg-white">
            {/* Section Header */}
            <div className="text-center max-w-3xl mx-auto mb-12">
                <span className="text-xs font-bold text-white bg-gradient-to-r from-yellow-400 to-orange-500 inline-block px-3 py-1 rounded-full shadow-sm">
                    WHY CHOOSE US
                </span>
                <h2 className="mt-4 text-3xl md:text-4xl font-bold text-gray-900">
                    Optimize Your Sales, Maximize Your Profits
                </h2>
            </div>

            {/* Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {/* Card 1 */}
                <div className="bg-gray-50 p-6 rounded-xl shadow-sm">
                    <h3 className="font-semibold text-lg mb-2 text-gray-800">
                        Real-Time Analytics
                    </h3>
                    <p className="text-sm text-gray-600 mb-4">
                        Stay on top of your performance with informed decisions and faster.
                    </p>
                    <div className="w-full h-52 flex items-center justify-center">
                        <Image
                            src="/images/analytics.jpg"
                            width={500}
                            height={300}
                            alt="Real-Time Analytics"
                            className="object-contain max-h-full"
                        />
                    </div>
                </div>

                {/* Card 2 */}
                <div className="bg-gray-50 p-6 rounded-xl shadow-sm">
                    <h3 className="font-semibold text-lg mb-2 text-gray-800">
                        Automated Workflow
                    </h3>
                    <p className="text-sm text-gray-600 mb-4">
                        Save time and reduce errors by allowing your team to focus on selling.
                    </p>
                    <div className="w-full h-52 flex items-center justify-center">
                        <Image
                            src="/images/workflow.jpg"
                            width={500}
                            height={300}
                            alt="Automated Workflow"
                            className="object-contain max-h-full"
                        />
                    </div>
                </div>

                {/* Card 3 */}
                <div className="bg-gray-50 p-6 rounded-xl shadow-sm">
                    <h3 className="font-semibold text-lg mb-2 text-gray-800">
                        Opportunity Tracking
                    </h3>
                    <p className="text-sm text-gray-600 mb-4">
                        Easily manage leads and track opportunities from first contact to closing.
                    </p>
                    <div className="w-full h-52 flex items-center justify-center">
                        <Image
                            src="/images/opportunity.jpg"
                            width={500}
                            height={300}
                            alt="Opportunity Tracking"
                            className="object-contain max-h-full"
                        />
                    </div>
                </div>

                {/* Card 4 */}
                <div className="bg-gray-50 p-6 rounded-xl shadow-sm">
                    <h3 className="font-semibold text-lg mb-2 text-gray-800">
                        Team Collaboration
                    </h3>
                    <p className="text-sm text-gray-600 mb-4">
                        Enable your sales team to collaborate on deals, share notes, and keep everyone aligned.
                    </p>
                    <div className="w-full h-52 flex items-center justify-center">
                        <Image
                            src="/images/collaboration.jpg"
                            width={500}
                            height={300}
                            alt="Team Collaboration"
                            className="object-contain max-h-full"
                        />
                    </div>
                </div>

                {/* Card 5 */}
                <div className="bg-gray-50 p-6 rounded-xl shadow-sm">
                    <h3 className="font-semibold text-lg mb-2 text-gray-800">
                        Customizable Dashboards
                    </h3>
                    <p className="text-sm text-gray-600 mb-4">
                        Tailor your dashboard to display the metrics that matter most to you.
                    </p>
                    <div className="w-full h-52 flex items-center justify-center">
                        <Image
                            src="/images/dashboard.jpg"
                            width={500}
                            height={300}
                            alt="Customizable Dashboards"
                            className="object-contain max-h-full"
                        />
                    </div>
                </div>
            </div>
        </section>
    );
}