import React from 'react';
import { motion } from 'framer-motion';
import { Loader2, Download, RefreshCw, AlertCircle } from 'lucide-react';

const ResultDisplay = ({ status, results, error, onReset, levels }) => {
    if (status === 'idle') return null;

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="glass-panel p-4 md:p-6 mt-6 md:mt-8"
        >
            <h3 className="text-lg md:text-xl font-bold mb-4 md:mb-6 flex items-center gap-2">
                {status === 'loading' && <Loader2 className="w-5 h-5 md:w-6 md:h-6 animate-spin text-indigo-400" />}
                {status === 'success' && <span className="text-green-400">✨ ผลลัพธ์เปรียบเทียบ (Result)</span>}
                {status === 'error' && <span className="text-red-400">❌ เกิดข้อผิดพลาด (Error)</span>}
            </h3>

            {status === 'loading' && (
                <div className="text-center p-8 md:p-12">
                    <div className="w-12 h-12 md:w-16 md:h-16 border-4 border-indigo-500/30 border-t-indigo-500 rounded-full animate-spin mx-auto mb-4"></div>
                    <p className="text-slate-300 font-medium text-sm md:text-base">AI กำลังวิเคราะห์และสร้างภาพจำลอง 3 ระดับ...</p>
                    <p className="text-slate-500 text-xs md:text-sm mt-2">กำลังประมวลผล 6 ภาพพร้อมกัน (Estimated ~1-2 mins)</p>
                </div>
            )}

            {status === 'success' && results && (
                <div className="space-y-6 md:space-y-8">
                    {levels.map((level) => (
                        <div key={level.id} className="space-y-2 md:space-y-3">
                            <h4 className="text-base md:text-lg font-semibold text-indigo-300 border-l-4 border-indigo-500 pl-3">
                                {level.name}
                            </h4>
                            <div className="grid grid-cols-2 gap-2 md:gap-4">
                                {/* Front View */}
                                <div className="space-y-2">
                                    <span className="text-xs text-slate-500 uppercase tracking-wider">Front View</span>
                                    <div className="rounded-xl overflow-hidden border border-white/10 bg-black/20 aspect-[3/4]">
                                        {results[level.id]?.front ? (
                                            <img
                                                src={results[level.id].front}
                                                alt={`${level.name} Front`}
                                                className="w-full h-full object-cover"
                                            />
                                        ) : (
                                            <div className="w-full h-full flex items-center justify-center text-slate-600">No Image</div>
                                        )}
                                    </div>
                                </div>

                                {/* Side View */}
                                <div className="space-y-2">
                                    <span className="text-xs text-slate-500 uppercase tracking-wider">Side View</span>
                                    <div className="rounded-xl overflow-hidden border border-white/10 bg-black/20 aspect-[3/4]">
                                        {results[level.id]?.side ? (
                                            <img
                                                src={results[level.id].side}
                                                alt={`${level.name} Side`}
                                                className="w-full h-full object-cover"
                                            />
                                        ) : (
                                            <div className="w-full h-full flex items-center justify-center text-slate-600">No Image</div>
                                        )}
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}

                    <div className="flex flex-col sm:flex-row gap-3 pt-6 border-t border-white/5">
                        <button
                            onClick={onReset}
                            className="w-full px-6 py-3 rounded-xl bg-slate-700/50 hover:bg-slate-700 text-white font-medium transition-colors flex items-center justify-center gap-2"
                        >
                            <RefreshCw className="w-5 h-5" />
                            ลองใหม่ (Try Again)
                        </button>
                    </div>
                </div>
            )}

            {status === 'error' && (
                <div className="text-center p-8 text-red-300">
                    <AlertCircle className="w-12 h-12 mx-auto mb-4 opacity-80" />
                    <p>{error || 'Something went wrong. Please try again.'}</p>
                    <button
                        onClick={onReset}
                        className="mt-6 px-6 py-3 rounded-xl bg-slate-700/50 hover:bg-slate-700 text-white font-medium transition-colors"
                    >
                        ลองใหม่อีกครั้ง (Try Again)
                    </button>
                </div>
            )}
        </motion.div>
    );
};

export default ResultDisplay;
