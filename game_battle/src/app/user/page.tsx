"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";

export default function UserPage() {
  const [username, setUsername] = useState("");
  const router = useRouter();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!username.trim()) return alert("Enter a username!");
    localStorage.setItem("username", username);
    setTimeout(() => {
    router.push("/pokemonsCards"); // after login, go to fight page
     }, 100);
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50">
      <h1 className="text-3xl font-bold mb-6">Sign Up / Sign In</h1>
      <form
        onSubmit={handleSubmit}
        className="bg-white p-6 rounded-xl shadow-md w-80 flex flex-col gap-4"
      >
        <input
          type="text"
          placeholder="Enter username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          className="border rounded-md p-2"
        />
        <button
          type="submit"
          className="bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600"
        >
          Continue
        </button>
      </form>
    </div>
  );
}
