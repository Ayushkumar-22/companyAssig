import { useEffect, useState } from "react";
import api from "../api/axios";

export default function ClientList() {
  const [clients, setClients] = useState([]);

  useEffect(() => {
    api.get("/clients").then((res) => setClients(res.data));
  }, []);

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
      {clients.map((client) => (
        <div key={client._id} className="bg-white shadow-md p-4 rounded-lg text-center">
          <div className="flex justify-center mb-4">
            <img
              src={client.image}
              alt={client.name}
              className="w-16 h-16 rounded-full object-cover"
            />
          </div>
          <p className="text-sm text-gray-600 mb-2">{client.description}</p>
          <h4 className="text-blue-600 font-semibold">{client.name}</h4>
          <p className="text-xs text-gray-500">{client.designation}</p>
        </div>
      ))}
    </div>
  );
}
