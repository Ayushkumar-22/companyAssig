import { useState } from "react";
import api from "../api/axios";

export default function ContactForm() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    city: ""
  });
  const [success, setSuccess] = useState(false);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    await api.post("/contacts", form);
    setSuccess(true);
    setForm({ name: "", email: "", phone: "", city: "" });
  };

  return (
    <form onSubmit={handleSubmit} className="max-w-md mx-auto space-y-4">
      <input name="name" value={form.name} onChange={handleChange} placeholder="Full Name"
             className="w-full p-3 border rounded" required />
      <input name="email" value={form.email} onChange={handleChange} placeholder="Email Address"
             className="w-full p-3 border rounded" required />
      <input name="phone" value={form.phone} onChange={handleChange} placeholder="Mobile Number"
             className="w-full p-3 border rounded" required />
      <input name="city" value={form.city} onChange={handleChange} placeholder="City"
             className="w-full p-3 border rounded" required />
      <button className="bg-blue-600 text-white w-full p-3 rounded hover:bg-blue-700" type="submit">
        Submit
      </button>
      {success && <p className="text-green-600 text-center">Thank you! We received your info.</p>}
    </form>
  );
}
