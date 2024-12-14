import { useState } from 'react';
import './index.css';
import WorkerDashboard from './WorkerDashboard';

function App() {
  return (
    <>
    <div className="bg-black min-h-screen text-white m-0 flex items-center justify-center">
      <form
        action=""
        className="flex flex-col gap-5 w-96 border border-white p-10 rounded shadow-lg bg-gray-800"
      >
        <h1 className="text-3xl font-semibold text-center">Login</h1>
        <div className="flex flex-col text-2xl gap-5">
          <input
            type="text"
            className="input-field bg-gray-700 text-white border border-gray-500 p-2 rounded"
            placeholder="Username"
          />
          <input
            type="password"
            className="input-field bg-gray-700 text-white border border-gray-500 p-2 rounded"
            placeholder="Password"
          />
          <button className="login-button w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600">
            Login
          </button>
        </div>
      </form>
    
    </div>
    <WorkerDashboard />
    </>
  );
}

export default App;
