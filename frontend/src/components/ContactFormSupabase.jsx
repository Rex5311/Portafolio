import { useState } from "react";
import { supabase } from "../lib/supabaseClient";
import { FiSend, FiCheck } from "react-icons/fi";

const ContactFormSupabase = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState(null);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setSuccess(false);

    try {
      const { error: insertError } = await supabase.from("messages").insert([
        {
          name: formData.name,
          email: formData.email,
          message: formData.message,
          status: "unread",
        },
      ]);

      if (insertError) throw insertError;

      setSuccess(true);
      setFormData({ name: "", email: "", message: "" });

      // Reset success message after 5 seconds
      setTimeout(() => setSuccess(false), 5000);
    } catch (err) {
      setError(err.message || "Error al enviar el mensaje");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-2xl mx-auto">
      {success && (
        <div className="mb-6 p-4 bg-green-100 border border-green-400 text-green-700 rounded-lg flex items-center gap-2">
          <FiCheck className="text-2xl" />
          <span>¡Mensaje enviado exitosamente! Te responderé pronto.</span>
        </div>
      )}

      {error && (
        <div className="mb-6 p-4 bg-red-100 border border-red-400 text-red-700 rounded-lg">
          {error}
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label className="block text-gray-700 dark:text-gray-300 mb-2 font-medium">
            Nombre
          </label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-600 dark:bg-gray-800 dark:border-gray-700"
            placeholder="Tu nombre"
          />
        </div>

        <div>
          <label className="block text-gray-700 dark:text-gray-300 mb-2 font-medium">
            Email
          </label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-600 dark:bg-gray-800 dark:border-gray-700"
            placeholder="tu@email.com"
          />
        </div>

        <div>
          <label className="block text-gray-700 dark:text-gray-300 mb-2 font-medium">
            Mensaje
          </label>
          <textarea
            name="message"
            value={formData.message}
            onChange={handleChange}
            required
            rows="6"
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-600 dark:bg-gray-800 dark:border-gray-700 resize-none"
            placeholder="Escribe tu mensaje aquí..."
          />
        </div>

        <button
          type="submit"
          disabled={loading}
          className="w-full bg-primary-600 text-white py-3 rounded-lg hover:bg-primary-700 transition flex items-center justify-center gap-2 font-medium disabled:opacity-50"
        >
          {loading ? (
            "Enviando..."
          ) : (
            <>
              <FiSend />
              Enviar Mensaje
            </>
          )}
        </button>
      </form>
    </div>
  );
};

export default ContactFormSupabase;
