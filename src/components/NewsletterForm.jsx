import { useState } from "react";
import api from "../api/axios";

export default function NewsletterForm() {
  const [email, setEmail] = useState("");
  const [done, setDone] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    await api.post("/newsletter", { email });
    setDone(true);
    setEmail("");
  };

  return (
    <form onSubmit={handleSubmit} className="max-w-md mx-auto space-y-4">
      <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} required
             placeholder="Enter your email"
             className="w-full p-3 border rounded" />
      <button className="bg-green-600 text-white w-full p-3 rounded hover:bg-green-700" type="submit">
        Subscribe
      </button>
      {done && <p className="text-green-600 text-center">Subscribed successfully!</p>}
    </form>
  );
}
