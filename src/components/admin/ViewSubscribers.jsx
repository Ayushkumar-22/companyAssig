import { useEffect, useState } from "react";
import api from "../../api/axios";

export default function ViewSubscribers() {
  const [subs, setSubs] = useState([]);

  useEffect(() => {
    api.get("/newsletter").then((res) => setSubs(res.data));
  }, []);

  return (
    <div className="border p-4 rounded shadow">
      <h2 className="font-bold text-xl mb-2">Newsletter Subscribers</h2>
      <ul className="list-disc list-inside">
        {subs.map((s) => (
          <li key={s._id}>{s.email}</li>
        ))}
      </ul>
    </div>
  );
}
