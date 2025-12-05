import { FiAward, FiExternalLink } from "react-icons/fi";
import { SiAmazonaws } from "react-icons/si";

/**
 * Certifications Component
 * Muestra certificados profesionales
 */
const Certifications = () => {
  const certifications = [
    {
      title: "AWS Certification",
      issuer: "Amazon Web Services",
      date: "2024",
      image:
        "https://hsxqkllexhcjimpxdkrn.supabase.co/storage/v1/object/public/portfolio/Certificado_AWS.png",
      icon: <SiAmazonaws />,
      color: "from-orange-500 to-yellow-500",
      link: "#", // Agrega el link de verificación si lo tienes
    },
    {
      title: "Dev Senior Certification",
      issuer: "Dev Senior",
      date: "2024",
      image:
        "https://hsxqkllexhcjimpxdkrn.supabase.co/storage/v1/object/public/portfolio/Certificado_dev_senior.png",
      icon: <FiAward />,
      color: "from-blue-500 to-purple-500",
      link: "#", // Agrega el link de verificación si lo tienes
    },
  ];

  return (
    <section
      id="certifications"
      className="section-padding bg-gray-100 dark:bg-gray-800"
    >
      <div className="container-custom">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            Certificaciones
          </h2>
          <div className="w-20 h-1 bg-primary-600 mx-auto mb-6"></div>
          <p className="text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
            Certificaciones profesionales que validan mis conocimientos y
            habilidades
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          {certifications.map((cert, index) => (
            <div
              key={index}
              className="card group hover:shadow-xl transition-all duration-300"
            >
              {/* Certificate Image */}
              <div className="relative overflow-hidden rounded-lg mb-6 bg-gray-200 dark:bg-gray-700">
                <img
                  src={cert.image}
                  alt={cert.title}
                  className="w-full h-64 object-cover group-hover:scale-105 transition-transform duration-300"
                  onError={(e) => {
                    // Fallback si la imagen no existe
                    e.target.style.display = "none";
                    e.target.nextElementSibling.style.display = "flex";
                  }}
                />
                {/* Fallback cuando no hay imagen */}
                <div
                  className="hidden absolute inset-0 flex-col items-center justify-center text-gray-400"
                  style={{ display: "none" }}
                >
                  <div
                    className={`text-6xl mb-4 bg-gradient-to-br ${cert.color} bg-clip-text text-transparent`}
                  >
                    {cert.icon}
                  </div>
                  <p className="text-sm">Certificado</p>
                </div>
              </div>

              {/* Certificate Info */}
              <div className="flex items-start gap-4">
                <div
                  className={`p-3 rounded-lg bg-gradient-to-br ${cert.color} text-white text-2xl flex-shrink-0`}
                >
                  {cert.icon}
                </div>
                <div className="flex-1">
                  <h3 className="text-xl font-bold mb-2">{cert.title}</h3>
                  <p className="text-gray-600 dark:text-gray-400 mb-1">
                    {cert.issuer}
                  </p>
                  <p className="text-sm text-gray-500 dark:text-gray-500 mb-3">
                    {cert.date}
                  </p>
                  {cert.link && cert.link !== "#" && (
                    <a
                      href={cert.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 text-primary-600 dark:text-primary-400 hover:underline text-sm"
                    >
                      Ver credencial <FiExternalLink size={14} />
                    </a>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Certifications;
