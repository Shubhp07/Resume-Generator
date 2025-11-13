import React, { useState } from 'react';
import ResumeForm from './components/ResumeForm';
import ResumeDisplay from './components/ResumeDisplay';
import { generateResume } from './api';

function App() {
  const [resumeText, setResumeText] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleGenerateResume = async (profile) => {
    setLoading(true);
    setError('');
    setResumeText('');
    try {
      const response = await generateResume(profile);
      setResumeText(response.data.resume.content);
    } catch (err) {
      setError('Failed to generate resume. Please check the console for details.');
      console.error(err);
    }
    setLoading(false);
  };

  return (
    <div className="w-full min-h-screen p-8 bg-gray-100">
      <main className={resumeText ? "grid grid-cols-1 md:grid-cols-2 gap-8" : "grid grid-cols-1"}>
        {/* LEFT: FORM */}
        <div>
          <ResumeForm onResumeGenerated={handleGenerateResume} />
        </div>

        {/* RIGHT: RESUME PREVIEW ONLY WHEN AVAILABLE */}
        {resumeText && (
          <div className="bg-white p-6 rounded-2xl shadow-xl">
            {loading && <div className="text-center">Generating...</div>}
            {error && <div className="text-red-500 text-center">{error}</div>}
            <ResumeDisplay resumeText={resumeText} />
          </div>
        )}
      </main>
    </div>
  );
}

export default App;