import React from 'react'
// import reactLogo from './assets/react.svg'
// import viteLogo from './assets/vite.svg'
// import heroImg from './assets/hero.png'
// import './App.css'
import './index.css'

function App() {
  // const [count, setCount] = useState(0)

    return (
    <div className="min-h-screen bg-gradient-to-br from-blue-500 to-purple-600">
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-4xl font-bold text-white text-center mb-4">
          PokGameBattle
        </h1>
        <div className="bg-white rounded-lg shadow-xl p-6">
          <p className="text-gray-700 text-center">
            Frontend is working! 🎉
          </p>
          <button className="mt-4 w-full bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 transition">
            Test Button
          </button>
        </div>
      </div>
    </div>
  )
}

export default App
