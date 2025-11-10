'use client'
import { motion } from 'framer-motion';

export default function StatsSection() {
    return (
        <section className="w-full py-16 bg-white">
            <div className="max-w-[1444px] mx-auto px-6 md:px-12 lg:px-20">
                <motion.div
                    className="grid grid-cols-1 sm:grid-cols-3 gap-10 text-center"
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, amount: 0.4 }}
                    transition={{ staggerChildren: 0.2 }}
                    variants={{
                        hidden: {},
                        visible: {
                            transition: {
                                staggerChildren: 0.2,
                            },
                        },
                    }}
                >
                    {/* Stat 1 */}
                    <motion.div
                        variants={{
                            hidden: { opacity: 0, y: 30 },
                            visible: { opacity: 1, y: 0 },
                        }}
                        transition={{ duration: 0.6 }}
                    >
                        <h3 className="text-4xl font-bold text-gray-900">24+</h3>
                        <p className="mt-2 text-gray-600 text-sm">
                            Years of collective experience in providing strategic consultancy services
                        </p>
                    </motion.div>

                    {/* Stat 2 */}
                    <motion.div
                        variants={{
                            hidden: { opacity: 0, y: 30 },
                            visible: { opacity: 1, y: 0 },
                        }}
                        transition={{ duration: 0.6, delay: 0.1 }}
                    >
                        <h3 className="text-4xl font-bold text-gray-900">95%</h3>
                        <p className="mt-2 text-gray-600 text-sm">
                            Client satisfaction rate, reflecting our commitment to exceeding expectations
                        </p>
                    </motion.div>

                    {/* Stat 3 */}
                    <motion.div
                        variants={{
                            hidden: { opacity: 0, y: 30 },
                            visible: { opacity: 1, y: 0 },
                        }}
                        transition={{ duration: 0.6, delay: 0.2 }}
                    >
                        <h3 className="text-4xl font-bold text-gray-900">20+</h3>
                        <p className="mt-2 text-gray-600 text-sm">
                            A dedicated team professionals, bringing diverse skills & expertise to innovative solutions
                        </p>
                    </motion.div>
                </motion.div>
            </div>
        </section>
    );
}