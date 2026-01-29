import React, { useState, useRef, useEffect } from 'react';
import Header from './components/Header';
import Footer from './components/Footer';
import ProcedureForm from './components/ProcedureForm';
import ImageUpload from './components/ImageUpload';
import ResultDisplay from './components/ResultDisplay';
import { uploadImage, generateImage, pollTaskResult } from './services/api';
import { Sparkles } from 'lucide-react';

const DEFAULT_LEVEL_PROMPTS = {
  level1: 'Natural improvement, slight refinement, preserving original character.',
  level2: 'Defined structure, clearer bridge, noticeable improvement.',
  level3: 'High bridge, sharp tip, dramatic aesthetic change, celebrity style.'
};

const LEVEL_CONFIG = [
  { id: 'level1', name: 'Level 1: Natural (ธรรมชาติ)' },
  { id: 'level2', name: 'Level 2: Defined (ชัดเจน/โด่งกลาง)' },
  { id: 'level3', name: 'Level 3: Dramatic (พุ่ง/สายฝอ)' },
];

function App() {
  const [frontImage, setFrontImage] = useState(null);
  const [sideImage, setSideImage] = useState(null);
  const [selectedProcedure, setSelectedProcedure] = useState(null);
  const [details, setDetails] = useState('');
  const [levelPrompts, setLevelPrompts] = useState(DEFAULT_LEVEL_PROMPTS);

  const [status, setStatus] = useState('idle'); // idle, loading, success, error
  // Results structure: { level1: { front: url, side: url }, level2: ... }
  const [results, setResults] = useState(null);
  const [errorContainer, setErrorContainer] = useState(null);

  const toggleProcedure = (id) => {
    setSelectedProcedure(prev => (prev === id ? null : id));
  };

  const handleGenerate = async () => {
    if (!frontImage || !sideImage || !selectedProcedure) {
      alert('กรุณาอัปโหลดรูปภาพทั้ง 2 มุมและเลือกหัตถการ');
      return;
    }

    setStatus('loading');
    setErrorContainer(null);
    setResults(null);

    try {
      // 1. Upload Images
      console.log('Uploading images...');
      const [frontUrl, sideUrl] = await Promise.all([
        uploadImage(frontImage.file),
        uploadImage(sideImage.file)
      ]);
      console.log('Images uploaded:', frontUrl, sideUrl);

      // 2. Generate Tasks (3 Levels x 2 Angles = 6 Tasks)
      console.log('Creating 6 tasks...');
      const taskPromises = [];

      LEVEL_CONFIG.forEach(level => {
        const promptMod = levelPrompts[level.id];
        // Front Task
        taskPromises.push(
          generateImage(frontUrl, [selectedProcedure], `${details} -- Style: ${promptMod} (Front View)`)
            .then(taskId => ({ level: level.id, view: 'front', taskId }))
        );
        // Side Task
        taskPromises.push(
          generateImage(sideUrl, [selectedProcedure], `${details} -- Style: ${promptMod} (Side View)`)
            .then(taskId => ({ level: level.id, view: 'side', taskId }))
        );
      });

      const tasks = await Promise.all(taskPromises);
      console.log('Tasks created:', tasks);

      // 3. Poll Results
      console.log('Polling results...');
      const pollPromises = tasks.map(async (task) => {
        const url = await pollTaskResult(task.taskId);
        return { ...task, url };
      });

      const completedTasks = await Promise.all(pollPromises);

      // 4. Structure Data
      const finalResults = {};
      LEVEL_CONFIG.forEach(l => finalResults[l.id] = {});

      completedTasks.forEach(t => {
        if (finalResults[t.level]) {
          finalResults[t.level][t.view] = t.url;
        }
      });

      console.log('Final Results:', finalResults);
      setResults(finalResults);
      setStatus('success');

    } catch (err) {
      console.error(err);
      setErrorContainer(err.message || 'An error occurred during simulation');
      setStatus('error');
    }
  };

  const resultRef = useRef(null);

  useEffect(() => {
    if (status === 'success' && resultRef.current) {
      resultRef.current.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }
  }, [status]);

  return (
    <div className="min-h-screen pb-20">
      <Header />

      <main className="container mx-auto px-4 max-w-4xl mt-8">
        <div className="glass-panel p-6 md:p-8 space-y-8">
          <div className="text-center space-y-2 mb-8">
            <h2 className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-white to-slate-400">
              สร้างภาพจำลอง 3 ระดับ (3-Level Simulation)
            </h2>
            <p className="text-slate-400">
              อัปโหลดรูปหน้าตรงและด้านข้าง เพื่อเปรียบเทียบผลลัพธ์ 3 สไตล์
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <div className="space-y-8">
              <ImageUpload
                frontImage={frontImage} setFrontImage={setFrontImage}
                sideImage={sideImage} setSideImage={setSideImage}
              />
            </div>

            <div className="space-y-6 md:space-y-8">
              <ProcedureForm
                selectedProcedure={selectedProcedure}
                toggleProcedure={toggleProcedure}
                details={details}
                setDetails={setDetails}
                levelPrompts={levelPrompts}
                setLevelPrompts={setLevelPrompts}
                levelConfig={LEVEL_CONFIG}
              />
            </div>
          </div>

          <div className="flex justify-center pt-6 border-t border-white/5">
            <button
              onClick={handleGenerate}
              disabled={status === 'loading' || !frontImage || !sideImage || !selectedProcedure}
              className={`glass-button w-full md:w-auto min-w-[200px] flex items-center justify-center gap-2 text-lg
                ${(status === 'loading' || !frontImage || !sideImage || !selectedProcedure) ? 'opacity-50 cursor-not-allowed' : ''}
              `}
            >
              {status === 'loading' ? (
                'Processing 6 variations...'
              ) : (
                <>
                  <Sparkles className="w-5 h-5" />
                  เริ่มการจำลอง (Generate 3 Levels)
                </>
              )}
            </button>
          </div>
        </div>

        <div ref={resultRef}>
          <ResultDisplay
            status={status}
            results={results}
            error={errorContainer}
            onReset={() => setStatus('idle')}
            levels={LEVEL_CONFIG}
          />
        </div>
      </main>

      <Footer />
    </div>
  );
}

export default App;
