import React from 'react';
import { motion } from 'framer-motion';
import { Check, Sparkles, Sliders } from 'lucide-react';

const options = [
    { id: 'job_nose', label: 'จมูก (Rhinoplasty)', icon: '👃', desc: 'เสริมจมูก, ลดปีกจมูก' },
    { id: 'job_chin', label: 'คาง (Chin Augmentation)', icon: '🧔', desc: 'เสริมคาง, ปรับรูปคาง' },
    { id: 'job_eyes', label: 'ตา (Eyes)', icon: '👀', desc: 'ปรับรูปตา, ชั้นตา' },
    { id: 'job_lift', label: 'ดึงหน้า (Face Lift)', icon: '🧖', desc: 'ลดริ้วรอย, ยกกระชับ' },
    { id: 'job_eyebrow', label: 'ยกคิ้ว (Brow Lift)', icon: '👁️', desc: 'แก้ตาดุ, ยกหางตา' },
];

const ProcedureForm = ({
    selectedProcedure,
    toggleProcedure,
    details,
    setDetails,
    levelPrompts,
    setLevelPrompts,
    levelConfig
}) => {
    const handleLevelChange = (id, value) => {
        setLevelPrompts(prev => ({
            ...prev,
            [id]: value
        }));
    };

    return (
        <div className="space-y-6">
            <div className="space-y-4">
                <label className="text-sm font-semibold text-indigo-300 uppercase tracking-wider flex items-center gap-2">
                    <Sparkles className="w-4 h-4" />
                    เลือกหัตถการ (Select One Procedure)
                </label>
                <div className="grid grid-cols-1 gap-3">
                    {options.map((option) => {
                        const isSelected = selectedProcedure === option.label.split(' ')[0];
                        return (
                            <motion.button
                                key={option.id}
                                whileHover={{ scale: 1.01 }}
                                whileTap={{ scale: 0.99 }}
                                onClick={() => toggleProcedure(option.label.split(' ')[0])}
                                className={`relative group flex items-start gap-4 p-4 rounded-xl border transition-all duration-300 text-left ${isSelected
                                    ? 'bg-indigo-600/20 border-indigo-500 shadow-[0_0_20px_rgba(99,102,241,0.2)]'
                                    : 'bg-slate-800/40 border-white/5 hover:border-white/10 hover:bg-slate-800/60'
                                    }`}
                            >
                                <div className={`mt-1 flex-shrink-0 flex items-center justify-center w-12 h-12 rounded-full text-2xl transition-colors ${isSelected ? 'bg-indigo-500 text-white' : 'bg-slate-700/50 text-slate-400 group-hover:bg-slate-700'
                                    }`}>
                                    {option.icon}
                                </div>

                                <div className="flex-1">
                                    <h3 className={`font-semibold text-lg ${isSelected ? 'text-white' : 'text-slate-300 group-hover:text-white'}`}>
                                        {option.label}
                                    </h3>
                                    <p className="text-sm text-slate-500 mt-1">{option.desc}</p>
                                </div>

                                <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center transition-all ${isSelected
                                    ? 'border-indigo-400 bg-indigo-500 text-white'
                                    : 'border-slate-600 group-hover:border-slate-500'
                                    }`}>
                                    {isSelected && <Check className="w-3.5 h-3.5" />}
                                </div>
                            </motion.button>
                        );
                    })}
                </div>
            </div>

            {/* Comparison Level Settings */}
            <div className="space-y-4 pt-4 border-t border-white/5">
                <label className="text-sm font-semibold text-indigo-300 uppercase tracking-wider flex items-center gap-2">
                    <Sliders className="w-4 h-4" />
                    กำหนดรายละเอียด 3 ระดับ (Simulation Levels)
                </label>
                <div className="space-y-4">
                    {levelConfig && levelConfig.map((level) => (
                        <div key={level.id} className="space-y-2">
                            <label className="text-xs font-medium text-slate-400">
                                {level.name}
                            </label>
                            <input
                                type="text"
                                value={levelPrompts[level.id]}
                                onChange={(e) => handleLevelChange(level.id, e.target.value)}
                                className="glass-input py-2 text-sm"
                                placeholder={`Enter detail for ${level.name}...`}
                            />
                        </div>
                    ))}
                </div>
            </div>

            <div className="space-y-4 pt-4 border-t border-white/5">
                <label className="text-sm font-semibold text-indigo-300 uppercase tracking-wider">
                    รายละเอียดเพิ่มเติม (Additional Notes)
                </label>
                <div className="relative">
                    <textarea
                        value={details}
                        onChange={(e) => setDetails(e.target.value)}
                        placeholder="ระบุรายละเอียดเพิ่มเติม...&#10;เช่น ปีกจมูกกว้าง, เนื้อจมูกน้อย"
                        className="glass-input h-24 resize-none text-base leading-relaxed placeholder:text-slate-600 focus:bg-slate-900/80"
                    />
                </div>
            </div>
        </div>
    );
};

export default ProcedureForm;
