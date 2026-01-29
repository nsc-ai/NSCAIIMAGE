import React from 'react';
import { Sparkles, Activity } from 'lucide-react';
import { motion } from 'framer-motion';

const Header = () => {
    return (
        <motion.header
            initial={{ y: -20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            className="glass-panel sticky top-4 z-50 mx-4 mt-4 px-6 py-4 flex items-center justify-between"
        >
            <div className="flex items-center gap-3">
                <div className="bg-gradient-to-tr from-indigo-500 to-pink-500 p-2 rounded-lg">
                    <Sparkles className="text-white w-6 h-6" />
                </div>
                <div>
                    <h1 className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-indigo-400 to-pink-400">
                        NSC AI
                    </h1>
                    <p className="text-xs text-slate-400">Aesthetic Intelligence</p>
                </div>
            </div>

            <div className="flex items-center gap-2">
                <div className="hidden md:flex items-center gap-2 px-3 py-1 bg-slate-800/50 rounded-full border border-slate-700/50">
                    <Activity className="w-4 h-4 text-green-400" />
                    <span className="text-xs text-slate-300">System Online</span>
                </div>
            </div>
        </motion.header>
    );
};

export default Header;
