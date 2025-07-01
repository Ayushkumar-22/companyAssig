import { useState } from "react";
import api from "../../api/axios";

export default function AddProject() {
  const [form, setForm] = useState({
    name: "",
    description: "",
    image: "", // Base64 Data URL (all images converted to JPG)
  });

  const convertSVGToJPG = (svgContent, maxWidth = 800, quality = 0.8) => {
    return new Promise((resolve, reject) => {
      const canvas = document.createElement('canvas');
      const ctx = canvas.getContext('2d');
      const img = new Image();
      
      img.onload = () => {
        // Calculate new dimensions
        let { width, height } = img;
        if (width > maxWidth) {
          height = (height * maxWidth) / width;
          width = maxWidth;
        }
        
        canvas.width = width;
        canvas.height = height;
        
        // Fill with white background (important for SVG to JPG conversion)
        ctx.fillStyle = 'white';
        ctx.fillRect(0, 0, width, height);
        
        // Draw SVG and convert to JPG
        ctx.drawImage(img, 0, 0, width, height);
        const jpgDataURL = canvas.toDataURL('image/jpeg', quality);
        resolve(jpgDataURL);
      };
      
      img.onerror = () => {
        reject(new Error('Failed to load SVG for conversion'));
      };
      
      // Create SVG data URL for the image element
      const svgBlob = new Blob([svgContent], { type: 'image/svg+xml' });
      const svgUrl = URL.createObjectURL(svgBlob);
      img.src = svgUrl;
    });
  };

  const compressImage = (file, maxWidth = 800, quality = 0.8) => {
    return new Promise((resolve) => {
      const canvas = document.createElement('canvas');
      const ctx = canvas.getContext('2d');
      const img = new Image();
      
      img.onload = () => {
        // Calculate new dimensions
        let { width, height } = img;
        if (width > maxWidth) {
          height = (height * maxWidth) / width;
          width = maxWidth;
        }
        
        canvas.width = width;
        canvas.height = height;
        
        // Draw and compress
        ctx.drawImage(img, 0, 0, width, height);
        const compressedDataURL = canvas.toDataURL('image/jpeg', quality);
        resolve(compressedDataURL);
      };
      
      img.src = URL.createObjectURL(file);
    });
  };

  const handleFileChange = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    // Validate file type
    if (!file.type.startsWith("image/")) {
      alert("Please upload a valid image file (JPG, PNG, or SVG).");
      return;
    }

    // Limit file size to 50MB to prevent 413 errors
    const maxSizeMB = 50;
    if (file.size > maxSizeMB * 1024 * 1024) {
      alert(`File is too large. Max allowed size is ${maxSizeMB}MB.`);
      return;
    }

    const reader = new FileReader();

    reader.onload = async () => {
      let imageData = reader.result;
      
      try {
        // Handle SVG files - convert to JPG
        if (file.type.includes('svg')) {
          console.log("Converting SVG to JPG...");
          const textReader = new FileReader();
          textReader.onload = async () => {
            try {
              const svgContent = textReader.result;
              imageData = await convertSVGToJPG(svgContent);
              setForm((prev) => ({ ...prev, image: imageData }));
            } catch (error) {
              console.error("SVG conversion failed:", error);
              alert("Failed to convert SVG. Please try a different image format.");
            }
          };
          textReader.readAsText(file);
        } else {
          // Handle raster images - compress if needed
          if (file.size > 500 * 1024) {
            console.log("Compressing large image...");
            imageData = await compressImage(file);
          }
          setForm((prev) => ({ ...prev, image: imageData }));
        }
      } catch (error) {
        console.error("Image processing failed:", error);
        alert("Failed to process image. Please try again.");
      }
    };

    reader.onerror = () => {
      alert("Failed to read the file. Please try again with a smaller image.");
    };

    reader.readAsDataURL(file); // ✅ Works for SVG, PNG, JPEG
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validate form data
    if (!form.name || !form.description || !form.image) {
      alert("Please fill in all fields and select an image.");
      return;
    }

    try {
      console.log("Submitting project...", { 
        name: form.name, 
        description: form.description, 
        imageSize: form.image.length
      });
      
      await api.post("/projects", form);
      alert("Project added successfully!");
      setForm({ name: "", description: "", image: "" });
      
      // Clear file input
      const fileInput = document.querySelector('input[type="file"]');
      if (fileInput) fileInput.value = "";
      
    } catch (error) {
      console.error("Upload failed:", error);
      
      if (error.response?.status === 413) {
        alert("Image is too large for the server. Please try a smaller image (under 50MB).");
      } else if (error.response?.status === 400) {
        alert("Invalid data. Please check your inputs.");
      } else if (error.response?.status === 500) {
        alert("Server error. Please try again later.");
      } else {
        alert("Failed to upload project. Please try again.");
      }
    }
  };

  return (
    <form onSubmit={handleSubmit} className="border p-4 rounded shadow max-w-md mx-auto">
      <h2 className="font-bold text-xl mb-4 text-center">Add Project</h2>

      <input
        name="name"
        value={form.name}
        onChange={(e) => setForm({ ...form, name: e.target.value })}
        placeholder="Project Name"
        className="w-full p-2 border rounded mb-3"
        required
      />

      <textarea
        name="description"
        value={form.description}
        onChange={(e) => setForm({ ...form, description: e.target.value })}
        placeholder="Project Description"
        className="w-full p-2 border rounded mb-3"
        required
      />

      <input
        type="file"
        accept="image/*,.svg"
        onChange={handleFileChange}
        className="w-full p-2 border rounded mb-3"
        required
      />

      {form.image && (
        <div className="mb-4">
          <p className="text-sm text-gray-600 mb-1">Image Preview:</p>
          <img
            src={form.image}
            alt="Preview"
            className="w-full max-h-60 object-contain border rounded"
          />
        </div>
      )}

      <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded w-full hover:bg-blue-700 transition">
        Add Project
      </button>
    </form>
  );
}
