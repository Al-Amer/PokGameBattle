import React from 'react';
import { FaGithub, FaLinkedin, FaGlobe, FaEnvelope, FaMapMarkerAlt, FaLaptopCode, FaReact, FaNodeJs, FaDatabase, FaCss3Alt } from 'react-icons/fa';
import { SiTailwindcss, SiTypescript, SiPostgresql, SiExpress, SiPokemon } from 'react-icons/si';
import { GiBattleGear } from 'react-icons/gi';

const AboutMe = () => {
  const skills = [
    { name: "React.js", icon: <FaReact className="text-cyan-400" />, color: "bg-cyan-100 text-cyan-700" },
    { name: "Node.js", icon: <FaNodeJs className="text-green-600" />, color: "bg-green-100 text-green-700" },
    { name: "TypeScript", icon: <SiTypescript className="text-blue-600" />, color: "bg-blue-100 text-blue-700" },
    { name: "Tailwind CSS", icon: <SiTailwindcss className="text-teal-500" />, color: "bg-teal-100 text-teal-700" },
    { name: "PostgreSQL", icon: <SiPostgresql className="text-blue-800" />, color: "bg-blue-100 text-blue-800" },
    { name: "Express.js", icon: <SiExpress className="text-gray-600" />, color: "bg-gray-100 text-gray-700" },
  ];

  const links = [
    {
      name: "GitHub",
      url: "https://github.com/Al-Amer",
      icon: <FaGithub className="text-2xl" />,
      color: "bg-gray-800 hover:bg-gray-900",
      username: "@Al-Amer"
    },
    {
      name: "LinkedIn",
      url: "https://www.linkedin.com/in/amer-almonajed/",
      icon: <FaLinkedin className="text-2xl" />,
      color: "bg-blue-700 hover:bg-blue-800",
      username: "Amer Almonajed"
    },
    {
      name: "Portfolio",
      url: "https://ameralmonajed.netlify.app",
      icon: <FaGlobe className="text-2xl" />,
      color: "bg-purple-600 hover:bg-purple-700",
      username: "ameralmonajed.netlify.app"
    }
  ];

  return (
    <div className="max-w-6xl mx-auto py-12 px-4">
      {/* Hero Section */}
      <div className="text-center mb-12">
        <div className="inline-block bg-gradient-to-r from-red-500 to-blue-500 p-1 rounded-full mb-4">
          <div className="bg-white rounded-full p-4">
            <SiPokemon className="text-6xl text-red-500" />
          </div>
        </div>
        <h1 className="text-5xl font-bold text-gray-800 mb-4">Amer Almonajed</h1>
        <p className="text-xl text-gray-600 mb-3">Full Stack Developer</p>
        <div className="flex items-center justify-center gap-2 text-gray-500">
          <FaMapMarkerAlt className="text-red-500" />
          <span>Based in Germany</span>
          <FaLaptopCode className="ml-4 text-blue-500" />
          <span>5+ Years Experience</span>
        </div>
      </div>

      {/* Bio Section */}
      <div className="bg-white rounded-2xl shadow-xl p-8 mb-8">
        <h2 className="text-2xl font-bold text-gray-800 mb-4 flex items-center gap-2">
          <span className="bg-red-500 w-1 h-8 rounded-full"></span>
          About This Project
        </h2>
        <p className="text-gray-700 leading-relaxed mb-4">
          PokGameBattle is a full-stack Pokémon battle game that I built to demonstrate my skills 
          as a Full Stack Developer. This project showcases my ability to create engaging, 
          interactive web applications using modern technologies.
        </p>
        <p className="text-gray-700 leading-relaxed">
          The application features a React frontend with Tailwind CSS for styling, a Node.js/TypeScript 
          backend, PostgreSQL database, and integrates with the official PokéAPI for authentic 
          Pokémon data. The battle system includes real-time combat, type effectiveness, 
          and AI opponents.
        </p>
      </div>

      {/* Tech Stack Section */}
      <div className="bg-gradient-to-r from-gray-50 to-gray-100 rounded-2xl shadow-xl p-8 mb-8">
        <h2 className="text-2xl font-bold text-gray-800 mb-6 flex items-center gap-2">
          <span className="bg-blue-500 w-1 h-8 rounded-full"></span>
          Technologies Used
        </h2>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
          {skills.map((skill, index) => (
            <div key={index} className={`${skill.color} rounded-xl p-4 text-center transition transform hover:scale-105`}>
              <div className="flex justify-center text-3xl mb-2">{skill.icon}</div>
              <span className="font-semibold">{skill.name}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Features Section */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
        <div className="bg-white rounded-2xl shadow-xl p-8">
          <h3 className="text-xl font-bold text-gray-800 mb-4 flex items-center gap-2">
            <span className="text-green-500 text-2xl">🎯</span>
            Key Features
          </h3>
          <ul className="space-y-3 text-gray-700">
            <li className="flex items-start gap-2">
              <span className="text-green-500 mt-1">✓</span>
              <span>Real-time Pokémon battle system with AI opponent</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-green-500 mt-1">✓</span>
              <span>Full Pokédex integration with official PokéAPI</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-green-500 mt-1">✓</span>
              <span>User authentication and battle history tracking</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-green-500 mt-1">✓</span>
              <span>Type effectiveness and critical hit system</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-green-500 mt-1">✓</span>
              <span>Responsive design with glass morphism effects</span>
            </li>
          </ul>
        </div>

        <div className="bg-white rounded-2xl shadow-xl p-8">
          <h3 className="text-xl font-bold text-gray-800 mb-4 flex items-center gap-2">
            <span className="text-purple-500 text-2xl">💡</span>
            Development Highlights
          </h3>
          <ul className="space-y-3 text-gray-700">
            <li className="flex items-start gap-2">
              <span className="text-purple-500 mt-1">→</span>
              <span>RESTful API design with Express.js and TypeScript</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-purple-500 mt-1">→</span>
              <span>Sequelize ORM for database management</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-purple-500 mt-1">→</span>
              <span>JWT authentication for secure user sessions</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-purple-500 mt-1">→</span>
              <span>Automated battle calculations with damage formulas</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-purple-500 mt-1">→</span>
              <span>Deployed on Netlify and Railway for production</span>
            </li>
          </ul>
        </div>
      </div>

      {/* Connect Section */}
      <div className="bg-gradient-to-r from-red-600 to-blue-600 rounded-2xl shadow-xl p-8 mb-8">
        <h2 className="text-3xl font-bold text-white text-center mb-8">Let's Connect!</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {links.map((link, index) => (
            <a
              key={index}
              href={link.url}
              target="_blank"
              rel="noopener noreferrer"
              className={`${link.color} text-white rounded-xl p-6 transition transform hover:scale-105 shadow-lg`}
            >
              <div className="flex flex-col items-center text-center">
                <div className="mb-3">{link.icon}</div>
                <h3 className="text-xl font-bold mb-2">{link.name}</h3>
                <p className="text-sm opacity-90">{link.username}</p>
              </div>
            </a>
          ))}
        </div>
      </div>

      {/* Contact Section */}
      <div className="bg-white rounded-2xl shadow-xl p-8">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-4">
            <div className="bg-gradient-to-r from-red-500 to-blue-500 p-3 rounded-full">
              <FaEnvelope className="text-white text-2xl" />
            </div>
            <div>
              <p className="text-gray-600">Email Me</p>
              <a href="mailto:amer.almonajed@example.com" className="text-blue-600 hover:underline font-semibold">
                amer.almonajed@gmx.com
              </a>
            </div>
          </div>
          
          <div className="w-px h-12 bg-gray-300 hidden md:block"></div>
          
          <div className="flex items-center gap-4">
            <div className="bg-gradient-to-r from-green-500 to-teal-500 p-3 rounded-full">
              <FaGlobe className="text-white text-2xl" />
            </div>
            <div>
              <p className="text-gray-600">View Project</p>
              <a href="https://github.com/Al-Amer/PokGameBattle" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline font-semibold">
                GitHub Repository
              </a>
            </div>
          </div>
          
          <div className="w-px h-12 bg-gray-300 hidden md:block"></div>
          
          <div className="flex items-center gap-4">
            <div className="bg-gradient-to-r from-purple-500 to-pink-500 p-3 rounded-full">
              <GiBattleGear className="text-white text-2xl" />
            </div>
            <div>
              <p className="text-gray-600">Live Demo</p>
              <a href="https://pokgamebattle.netlify.app" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline font-semibold">
                View Live Site
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Footer Note */}
      <div className="text-center mt-8 text-gray-500 text-sm">
        <p>Built with ❤️ using React, Node.js, TypeScript, and Tailwind CSS</p>
        <p className="mt-2">© 2024 Amer Almonajed - All Rights Reserved</p>
      </div>
    </div>
  );
};

export default AboutMe;
