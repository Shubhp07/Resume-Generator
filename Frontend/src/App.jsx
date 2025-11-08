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
    <div className="container mx-auto p-8">
      <header className="text-center mb-10">
        <h1 className="text-4xl font-bold">AI Resume Generator</h1>
        <p className="text-lg text-gray-600">Fill in your details and let AI create a professional resume for you.</p>
      </header>
      <main className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div>
          <ResumeForm onResumeGenerated={handleGenerateResume} />
        </div>
        <div>
          {loading && <div className="text-center">Generating...</div>}
          {error && <div className="text-red-500 text-center">{error}</div>}
          {resumeText && <ResumeDisplay resumeText={resumeText} />}
        </div>
      </main>
    </div>
  );
}

export default App;
