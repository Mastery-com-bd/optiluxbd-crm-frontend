'use client';

export default function StatsSection() {
    return (
        <section className="w-full py-16 bg-white">
            <div className="max-w-6xl mx-auto px-6 md:px-12 lg:px-20">
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-10 text-center">
                    {/* Stat 1 */}
                    <div>
                        <h3 className="text-4xl font-bold text-gray-900">24+</h3>
                        <p className="mt-2 text-gray-600 text-sm">
                            Years of collective experience in providing strategic consultancy services
                        </p>
                    </div>
                    {/* Stat 2 */}
                    <div>
                        <h3 className="text-4xl font-bold text-gray-900">95%</h3>
                        <p className="mt-2 text-gray-600 text-sm">
                            Client satisfaction rate, reflecting our commitment to exceeding expectations
                        </p>
                    </div>
                    {/* Stat 3 */}
                    <div>
                        <h3 className="text-4xl font-bold text-gray-900">20+</h3>
                        <p className="mt-2 text-gray-600 text-sm">
                            A dedicated team professionals, bringing diverse skills & expertise to innovative solutions
                        </p>
                    </div>
                </div>
            </div>
        </section>
    );
}