// pages/DataTableAPI.jsx
import React, { useEffect, useState } from "react";
import DataTable from "../components/DataTable";

export default function DataTableAPI() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("https://jsonplaceholder.typicode.com/users")
      .then((res) => res.json())
      .then((users) => {
        setData(users);
        setLoading(false);
      });
  }, []);

  return (
    <div className="p-6">
      <h2 className="text-2xl font-semibold mb-4">Data Table (API)</h2>
      {loading ? <p>Đang tải dữ liệu...</p> : <DataTable data={data} />}
    </div>
  );
}
