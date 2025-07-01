import { useEffect, useState } from "react";
import api from "../../api/axios";

export default function ViewContacts() {
  const [contacts, setContacts] = useState([]);

  useEffect(() => {
    api.get("/contacts").then((res) => setContacts(res.data));
  }, []);

  return (
    <div className="border p-4 rounded shadow">
      <h2 className="font-bold text-xl mb-2">Contact Form Responses</h2>
      <ul className="space-y-2">
        {contacts.map((c) => (
          <li key={c._id} className="border-b pb-2">
            <p><strong>Name:</strong> {c.name}</p>
            <p><strong>Email:</strong> {c.email}</p>
            <p><strong>Phone:</strong> {c.phone}</p>
            <p><strong>City:</strong> {c.city}</p>
          </li>
        ))}
      </ul>
    </div>
  );
}
