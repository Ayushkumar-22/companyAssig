import { useState } from "react";
import api from "../../api/axios";

export default function AddClient() {
  const [form, setForm] = useState({
    name: "",
    designation: "",
    description: "",
    image: "", // Base64 cropped image
  });

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file && file.type.startsWith("image/")) {
      const reader = new FileReader();

      reader.onload = () => {
        const img = new Image();
        img.onload = () => {
          const cropWidth = 450;
          const cropHeight = 350;
          const canvas = document.createElement("canvas");
          canvas.width = cropWidth;
          canvas.height = cropHeight;
          const ctx = canvas.getContext("2d");

          // Scale image if it's smaller than crop size
          const scaleX = cropWidth / img.width;
          const scaleY = cropHeight / img.height;
          const scale = Math.max(scaleX, scaleY);

          const scaledWidth = img.width * scale;
          const scaledHeight = img.height * scale;

          const offsetX = (cropWidth - scaledWidth) / 2;
          const offsetY = (cropHeight - scaledHeight) / 2;

          ctx.drawImage(img, offsetX, offsetY, scaledWidth, scaledHeight);

          const croppedBase64 = canvas.toDataURL("image/jpeg", 0.9);
          setForm((prevForm) => ({ ...prevForm, image: croppedBase64 }));
        };
        img.src = reader.result;
      };

      reader.readAsDataURL(file);
    } else {
      alert("Please upload a valid image file.");
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await api.post("/clients", form);
      setForm({ name: "", designation: "", description: "", image: "" });
      alert("Client added!");
    } catch (error) {
      console.error("Error adding client:", error);
      alert("Failed to add client.");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="border p-4 rounded shadow max-w-md mx-auto">
      <h2 className="font-bold text-xl mb-4 text-center">Add Client</h2>

      <input
        type="text"
        name="name"
        value={form.name}
        onChange={(e) => setForm({ ...form, name: e.target.value })}
        placeholder="Client Name"
        className="w-full p-2 border rounded mb-3"
        required
      />

      <input
        type="text"
        name="designation"
        value={form.designation}
        onChange={(e) => setForm({ ...form, designation: e.target.value })}
        placeholder="Client Designation"
        className="w-full p-2 border rounded mb-3"
        required
      />

      <textarea
        name="description"
        value={form.description}
        onChange={(e) => setForm({ ...form, description: e.target.value })}
        placeholder="Client Description"
        className="w-full p-2 border rounded mb-3"
        required
      />

      <input
        type="file"
        accept="image/*"
        onChange={handleImageChange}
        className="w-full p-2 border rounded mb-3"
        required
      />

      {form.image && (
        <div className="mb-4">
          <p className="text-sm text-gray-600 mb-1">Cropped Image Preview (450x350):</p>
          <img
            src={form.image}
            alt="Cropped Preview"
            className="w-[225px] h-[175px] object-cover border rounded"
          />
        </div>
      )}

      <button
        type="submit"
        className="bg-green-600 text-white px-4 py-2 rounded w-full hover:bg-green-700 transition"
      >
        Add Client
      </button>
    </form>
  );
}
