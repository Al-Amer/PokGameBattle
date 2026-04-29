import React from 'react';

const AboutMe = () => {
  return (
    <div className="max-w-4xl mx-auto py-12">
      <h1 className="text-4xl font-bold mb-8 text-center">About Me 👨‍💻</h1>
      <div className="bg-white rounded-xl shadow-lg p-8">
        <p className="text-lg text-gray-700 mb-4">
          Welcome to PokGameBattle! This is a full-stack project showcasing my skills in:
        </p>
        <ul className="list-disc list-inside space-y-2 text-gray-600 mb-6">
          <li>React.js with Hooks and Router</li>
          <li>Node.js with TypeScript backend</li>
          <li>Tailwind CSS for modern styling</li>
          <li>RESTful API integration (PokéAPI)</li>
          <li>Database management with PostgreSQL</li>
          <li>Authentication and authorization</li>
        </ul>
        <p className="text-gray-700">
          This project demonstrates my ability to create engaging, full-stack applications 
          with modern technologies and best practices.
        </p>
      </div>
    </div>
  );
};

export default AboutMe;
