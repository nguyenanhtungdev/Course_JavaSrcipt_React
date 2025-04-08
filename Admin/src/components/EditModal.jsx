import React, { useEffect, useState } from "react";

export default function EditModal({ data, onClose, onSave }) {
  const [form, setForm] = useState(data);
  const [show, setShow] = useState(false);
  const [loading, setLoading] = useState(true);

  // Hiệu ứng mở modal
  useEffect(() => {
    setTimeout(() => setShow(true), 10);
  }, []);

  // Fetch dữ liệu từ API khi modal mở
  useEffect(() => {
    fetch(`https://dummyjson.com/users/${data.id}`)
      .then((res) => res.json())
      .then((user) => {
        setForm((prev) => ({
          ...prev,
          name: `${user.firstName} ${user.lastName}`,
          company: user.company?.name || "",
        }));
        setLoading(false);
      });
  }, [data.id]);

  // Hàm xử lý khi nhập dữ liệu
  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  // Gửi PUT API khi lưu
  const handleSave = () => {
    const [firstName, ...last] = form.name.split(" ");
    const lastName = last.join(" ");

    fetch(`https://dummyjson.com/users/${data.id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        firstName,
        lastName,
        company: { name: form.company },
      }),
    })
      .then((res) => res.json())
      .then((updated) => {
        onSave({
          ...form,
          name: `${updated.firstName} ${updated.lastName}`,
          company: updated.company?.name,
        });
        onClose();
      });
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-white/20 backdrop-blur-sm transition duration-300">
      <div
        className={`bg-white rounded-xl shadow-2xl w-[400px] p-6 transform transition-all duration-300 ${
          show ? "opacity-100 translate-y-0" : "opacity-0 -translate-y-4"
        }`}
      >
        <h2 className="text-2xl font-semibold text-gray-800 mb-6 text-center">
          ✏️ Edit Order
        </h2>

        {loading ? (
          <p className="text-gray-500 text-center">Loading user data...</p>
        ) : (
          <>
            <div className="space-y-4">
              <label className="block text-sm text-gray-600 font-medium">
                Customer Name
                <input
                  name="name"
                  value={form.name}
                  onChange={handleChange}
                  className="mt-1 w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-pink-400"
                  placeholder="Enter name"
                />
              </label>

              <label className="block text-sm text-gray-600 font-medium">
                Company
                <input
                  name="company"
                  value={form.company}
                  onChange={handleChange}
                  className="mt-1 w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-pink-400"
                  placeholder="Enter company"
                />
              </label>

              <label className="block text-sm text-gray-600 font-medium">
                Order Value
                <input
                  name="value"
                  value={form.value}
                  onChange={handleChange}
                  className="mt-1 w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-pink-400"
                  placeholder="$000"
                />
              </label>

              <label className="block text-sm text-gray-600 font-medium">
                Order Date
                <input
                  name="date"
                  type="date"
                  value={form.date}
                  onChange={handleChange}
                  className="mt-1 w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-pink-400"
                />
              </label>

              <label className="block text-sm text-gray-600 font-medium">
                Status
                <select
                  name="status"
                  value={form.status}
                  onChange={handleChange}
                  className="mt-1 w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-pink-400"
                >
                  <option value="New">New</option>
                  <option value="In-progress">In-progress</option>
                  <option value="Completed">Completed</option>
                </select>
              </label>
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
          </>
        )}
      </div>
    </div>
  );
}
