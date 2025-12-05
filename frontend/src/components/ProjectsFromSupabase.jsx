import { useState, useEffect } from "react";
import { useProjects } from "../hooks/useProjects";
import { FiGithub, FiExternalLink, FiLoader } from "react-icons/fi";

const ProjectsFromSupabase = () => {
  const { projects, loading, error } = useProjects();

  if (loading) {
    return (
      <div className="flex justify-center items-center py-12">
        <FiLoader className="animate-spin text-4xl text-primary-600" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
        Error al cargar proyectos: {error}
      </div>
    );
  }

  if (projects.length === 0) {
    return (
      <div className="text-center py-12 text-gray-600 dark:text-gray-400">
        No hay proyectos disponibles. Agrega algunos desde Supabase.
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
      {projects.map((project) => (
        <div
          key={project.id}
          className="bg-white dark:bg-gray-800 rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300"
        >
          {project.image && (
            <img
              src={project.image}
              alt={project.title}
              className="w-full h-48 object-cover"
            />
          )}

          <div className="p-6">
            <h3 className="text-2xl font-bold mb-2">{project.title}</h3>

            <div className="mb-4">
              <span className="inline-block px-3 py-1 text-sm bg-primary-100 dark:bg-primary-900/30 text-primary-700 dark:text-primary-300 rounded-full">
                {project.category}
              </span>
            </div>

            <p className="text-gray-600 dark:text-gray-400 mb-4">
              {project.description}
            </p>

            <div className="flex flex-wrap gap-2 mb-4">
              {project.technologies &&
                project.technologies.map((tech, index) => (
                  <span
                    key={index}
                    className="px-2 py-1 text-xs bg-gray-200 dark:bg-gray-700 rounded"
                  >
                    {tech}
                  </span>
                ))}
            </div>

            <div className="flex gap-4">
              {project.github && (
                <a
                  href={project.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 text-primary-600 hover:text-primary-700"
                >
                  <FiGithub /> Código
                </a>
              )}
              {project.demo && (
                <a
                  href={project.demo}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 text-primary-600 hover:text-primary-700"
                >
                  <FiExternalLink /> Demo
                </a>
              )}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default ProjectsFromSupabase;
