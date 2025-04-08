import React, { useState } from "react";

export default function AddModal({ onClose, onAdd }) {
  const [form, setForm] = useState({
    name: "",
    company: "",
    value: "",
    date: "",
    status: "New",
    avatar: `https://i.pravatar.cc/48?img=${
      Math.floor(Math.random() * 70) + 1
    }`,
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSave = () => {
    const [firstName, ...last] = form.name.trim().split(" ");
    const lastName = last.join(" ");

    fetch("https://dummyjson.com/users/add", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        firstName,
        lastName,
        company: { name: form.company },
      }),
    })
      .then((res) => res.json())
      .then((created) => {
        onAdd({
          id: created.id,
          ...form,
        });
        onClose();
      });
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/30 backdrop-blur-sm transition-all duration-300">
      <div className="bg-white p-6 rounded-2xl shadow-2xl w-[400px] animate-fade-in">
        <h2 className="text-2xl font-semibold mb-6 text-center text-purple-600">
          ➕ Add New User
        </h2>

        <div className="space-y-4">
          {/* Full name */}
          <input
            name="name"
            placeholder="Full name"
            value={form.name}
            onChange={handleChange}
            className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all shadow-sm"
          />

          {/* Company */}
          <input
            name="company"
            placeholder="Company"
            value={form.company}
            onChange={handleChange}
            className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all shadow-sm"
          />

          {/* Order Value */}
          <input
            name="value"
            placeholder="Order Value"
            value={form.value}
            onChange={handleChange}
            className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all shadow-sm"
          />

          {/* Date */}
          <input
            name="date"
            type="date"
            value={form.date}
            onChange={handleChange}
            className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all shadow-sm"
          />

          {/* Status */}
          <select
            name="status"
            value={form.status}
            onChange={handleChange}
            className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all shadow-sm"
          >
            <option>New</option>
            <option>In-progress</option>
            <option>Completed</option>
          </select>
        </div>

        <div className="flex justify-end mt-6 gap-3">
          <button
            onClick={onClose}
            className="px-4 py-2 rounded-lg border border-gray-300 text-gray-600 hover:bg-gray-100 transition"
          >
            Cancel
          </button>
          <button
            onClick={handleSave}
            className="px-5 py-2 rounded-lg bg-pink-500 text-white font-medium hover:bg-pink-600 transition"
          >
            Save
          </button>
        </div>
      </div>
    </div>
  );
}
