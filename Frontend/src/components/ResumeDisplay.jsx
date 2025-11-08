import React from "react";

const ResumeDisplay = ({ resumeText }) => {
  return (
    <div className="p-6 border rounded-lg shadow-sm bg-white">
      <h2 className="text-2xl font-semibold mb-4">Generated Resume</h2>
      <pre className="whitespace-pre-wrap font-sans text-sm">{resumeText}</pre>
    </div>
  );
};

export default ResumeDisplay;
