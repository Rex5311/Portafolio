import { FiGithub, FiLinkedin, FiMail, FiDownload } from "react-icons/fi";

const Hero = () => {
  return (
    <section
      id="home"
      className="min-h-screen flex items-center justify-center section-padding pt-24"
    >
      <div className="container-custom">
        <div className="text-center animate-fadeInUp">
          {/* Profile Image */}
          <div className="mb-8 flex justify-center">
            <img
              src="https://hsxqkllexhcjimpxdkrn.supabase.co/storage/v1/object/public/portfolio/Foto_de_perfil.jpg"
              alt="Perfil de Juan Esteban Agudelo"
              className="w-32 h-32 rounded-full border-4 border-primary-600 shadow-lg object-cover hover:scale-110 transition-transform duration-300"
            />
          </div>

          {/* Greeting */}
          <p className="text-primary-600 dark:text-primary-400 font-medium text-lg mb-4">
            Hola, soy
          </p>

          {/* Name */}
          <h1 className="text-5xl md:text-7xl font-bold mb-6">
            Juan Esteban Agudelo
            <br />
            <span className="gradient-text">Carmona</span>
          </h1>

          {/* Title */}
          <p className="text-2xl md:text-3xl text-gray-600 dark:text-gray-400 mb-8">
            Desarrollador Fullstack
          </p>

          {/* Description */}
          <p className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto mb-12">
            Estudiante de Desarrollo de Software en la Universidad del Valle
            (6to semestre). Apasionado por crear soluciones web innovadoras con
            tecnologías modernas.
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-wrap justify-center gap-4 mb-12">
            <a href="#contact" className="btn-primary">
              Contáctame
            </a>
            <a href="#projects" className="btn-secondary">
              Ver Proyectos
            </a>
            <a
              href="/resume.pdf"
              download
              className="btn-secondary flex items-center gap-2"
            >
              <FiDownload />
              Descargar CV
            </a>
          </div>

          {/* Social Links */}
          <div className="flex justify-center gap-6">
            <a
              href="https://github.com/Rex5311"
              target="_blank"
              rel="noopener noreferrer"
              className="p-3 rounded-full bg-gray-200 dark:bg-gray-800 hover:bg-primary-600 hover:text-white transition-all duration-300 hover:scale-110"
              aria-label="GitHub"
            >
              <FiGithub size={24} />
            </a>
            <a
              href="https://www.linkedin.com/in/juan-esteban-agudelo-carmona-02385439b/"
              target="_blank"
              rel="noopener noreferrer"
              className="p-3 rounded-full bg-gray-200 dark:bg-gray-800 hover:bg-primary-600 hover:text-white transition-all duration-300 hover:scale-110"
              aria-label="LinkedIn"
            >
              <FiLinkedin size={24} />
            </a>
            <a
              href="mailto:juanesteban5311@gmail.com"
              className="p-3 rounded-full bg-gray-200 dark:bg-gray-800 hover:bg-primary-600 hover:text-white transition-all duration-300 hover:scale-110"
              aria-label="Email"
            >
              <FiMail size={24} />
            </a>
          </div>
        </div>
      </div>

      {/* Animated Background Elements */}
      <div className="absolute inset-0 -z-10 overflow-hidden">
        <div className="absolute top-1/4 left-1/4 w-72 h-72 bg-primary-300 dark:bg-primary-900 rounded-full mix-blend-multiply dark:mix-blend-soft-light filter blur-xl opacity-20 animate-pulse"></div>
        <div className="absolute bottom-1/4 right-1/4 w-72 h-72 bg-purple-300 dark:bg-purple-900 rounded-full mix-blend-multiply dark:mix-blend-soft-light filter blur-xl opacity-20 animate-pulse animation-delay-2000"></div>
      </div>
    </section>
  );
};

export default Hero;
