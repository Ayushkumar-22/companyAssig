import { useEffect, useState } from "react";
import api from "../api/axios";

export default function ProjectList() {
  const [projects, setProjects] = useState([]);

  useEffect(() => {
    api.get("/projects")
      .then((res) => setProjects(res.data))
      .catch((err) => {
        console.error("Error fetching projects:", err);
        alert("Failed to load projects.");
      });
  }, []);

  return (
    <section className="mt-10 px-4 text-center">
      {/* Section Heading */}
      <h2 className="text-2xl font-semibold mb-2 text-blue-600">
        Our Projects
      </h2>
      <p className="text-gray-600 mb-6 max-w-2xl mx-auto">
        We know what buyers are looking for and suggest projects that will bring
        clients top dollar for the sale of their homes.
      </p>

      {/* Projects Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-6">
        {projects.map((proj) => (
          <div
            key={proj._id}
            className="bg-white shadow-md rounded-lg overflow-hidden hover:shadow-lg transition flex flex-col"
          >
            {/* Image */}
            <img
              src={proj.image}
              alt={proj.name}
              className="h-32 w-full object-cover"
              onError={(e) => {
                e.target.src =
                  "https://via.placeholder.com/450x300?text=Image+Not+Available";
              }}
            />

            {/* Content */}
            <div className="p-4 flex flex-col flex-grow justify-between">
              <div>
                <h3 className="text-lg font-bold text-blue-600 mb-2">
                  {proj.name}
                </h3>
                <p className="text-sm text-gray-600 mb-4">
                  {proj.description?.slice(0, 100)}...
                </p>
              </div>

              <button
                type="button"
                className="bg-orange-500 text-white px-3 py-2 rounded hover:bg-orange-600 transition mt-auto"
              >
                READ MORE
              </button>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
