import { useState, useEffect } from "react";
import { supabase } from "../lib/supabaseClient";

export const useProjects = () => {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchProjects();
  }, []);

  const fetchProjects = async () => {
    try {
      setLoading(true);
      const { data, error } = await supabase
        .from("projects")
        .select("*")
        .order("created_at", { ascending: false });

      if (error) throw error;
      setProjects(data || []);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const addProject = async (projectData) => {
    try {
      const { data, error } = await supabase
        .from("projects")
        .insert([projectData])
        .select();

      if (error) throw error;
      setProjects([data[0], ...projects]);
      return { data, error: null };
    } catch (err) {
      return { data: null, error: err.message };
    }
  };

  const updateProject = async (id, updates) => {
    try {
      const { data, error } = await supabase
        .from("projects")
        .update(updates)
        .eq("id", id)
        .select();

      if (error) throw error;
      setProjects(projects.map((p) => (p.id === id ? data[0] : p)));
      return { data, error: null };
    } catch (err) {
      return { data: null, error: err.message };
    }
  };

  const deleteProject = async (id) => {
    try {
      const { error } = await supabase.from("projects").delete().eq("id", id);

      if (error) throw error;
      setProjects(projects.filter((p) => p.id !== id));
      return { error: null };
    } catch (err) {
      return { error: err.message };
    }
  };

  return {
    projects,
    loading,
    error,
    fetchProjects,
    addProject,
    updateProject,
    deleteProject,
  };
};
