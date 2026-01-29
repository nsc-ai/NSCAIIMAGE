import React, { useRef } from 'react';
import { Upload, X, Image as ImageIcon } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const SingleUpload = ({ label, image, onUpload, onRemove }) => {
  const fileInputRef = useRef(null);

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        onUpload({ file, preview: reader.result });
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="flex-1 space-y-3">
      <label className="text-sm font-medium text-slate-300 block text-center">
        {label}
      </label>

      <AnimatePresence mode="wait">
        {!image ? (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95 }}
            className="relative group cursor-pointer h-48"
            onClick={() => fileInputRef.current.click()}
          >
            <input
              ref={fileInputRef}
              type="file"
              accept="image/*"
              onChange={handleFileChange}
              className="hidden"
            />
            <div className="absolute inset-0 border-2 border-dashed border-slate-700 rounded-2xl flex flex-col items-center justify-center gap-3 transition-all group-hover:border-indigo-500/50 group-hover:bg-slate-800/30">
              <div className="p-3 rounded-full bg-slate-800 group-hover:bg-indigo-500/20 transition-colors">
                <Upload className="w-6 h-6 text-slate-400 group-hover:text-indigo-400" />
              </div>
              <p className="text-xs text-slate-400 text-center px-4">
                Click to upload
              </p>
            </div>
          </motion.div>
        ) : (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="relative h-48 rounded-2xl overflow-hidden border border-slate-700 group"
          >
            <img
              src={image.preview}
              alt="Preview"
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
              <button
                onClick={onRemove}
                className="p-2 bg-red-500/80 hover:bg-red-600 text-white rounded-full backdrop-blur-sm transition-transform hover:scale-110"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

const ImageUpload = ({ frontImage, setFrontImage, sideImage, setSideImage }) => {
  return (
    <div className="space-y-4">
      <div className="flex flex-col md:flex-row gap-4">
        <SingleUpload
          label="1. หน้าตรง (Front View)"
          image={frontImage}
          onUpload={setFrontImage}
          onRemove={() => setFrontImage(null)}
        />
        <SingleUpload
          label="2. ด้านข้าง 90° (Side View)"
          image={sideImage}
          onUpload={setSideImage}
          onRemove={() => setSideImage(null)}
        />
      </div>
      <p className="text-xs text-slate-500 text-center">
        *กรุณาอัปโหลดทั้ง 2 มุมเพื่อผลลัพธ์ที่แม่นยำที่สุด
      </p>
    </div>
  );
};

export default ImageUpload;
