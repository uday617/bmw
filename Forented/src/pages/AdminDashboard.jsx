import { useEffect, useState } from "react";

function AdminDashboard() {
  const [type, setType] = useState("testdrive");
  const [data, setData] = useState([]);

  useEffect(() => {
    fetch(`http://localhost:5000/api/${type}`)
      .then(res => res.json())
      .then(data => setData(data));
  }, [type]);

  return (
    <div className="p-6 bg-gray-950 min-h-screen text-white">

      <h1 className="text-2xl font-semibold mb-6">Orders</h1>

      {/* 🔘 Toggle Buttons */}
      <div className="flex gap-4 mb-6">
        <button
          onClick={() => setType("testdrive")}
          className={`px-4 py-2 rounded-lg transition ${
            type === "testdrive"
              ? "bg-blue-600"
              : "bg-gray-800 hover:bg-gray-700"
          }`}
        >
          Test Drives
        </button>

        <button
          onClick={() => setType("purchase")}
          className={`px-4 py-2 rounded-lg transition ${
            type === "purchase"
              ? "bg-blue-600"
              : "bg-gray-800 hover:bg-gray-700"
          }`}
        >
          Purchases
        </button>
      </div>

      {/* 📊 Table */}
      <div className="overflow-x-auto bg-gray-900 rounded-xl">
        <table className="w-full text-left">
          <thead className="bg-gray-800 text-gray-300">
            <tr>
              <th className="p-3">Name</th>
              <th className="p-3">Email</th>
              <th className="p-3">Car</th>

              {type === "testdrive" && <th className="p-3">Date</th>}
              {type === "purchase" && <th className="p-3">Price</th>}

              <th className="p-3">Status</th>
            </tr>
          </thead>

          <tbody>
            {data.map((item) => (
              <tr key={item._id} className="border-b border-gray-800">
                <td className="p-3">{item.name}</td>
                <td className="p-3">{item.email}</td>
                <td className="p-3">{item.carName}</td>

                {type === "testdrive" && (
                  <td className="p-3">{item.preferredDate}</td>
                )}

                {type === "purchase" && (
                  <td className="p-3">{item.price}</td>
                )}

                {/* 🎯 Status Badge */}
                <td className="p-3">
                  <span
                    className={`px-2 py-1 rounded-full text-sm ${
                      item.status === "Approved"
                        ? "bg-green-500/20 text-green-400"
                        : item.status === "Rejected"
                        ? "bg-red-500/20 text-red-400"
                        : "bg-yellow-500/20 text-yellow-400"
                    }`}
                  >
                    {item.status || "Pending"}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default AdminDashboard;