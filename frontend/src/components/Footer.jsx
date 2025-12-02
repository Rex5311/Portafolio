import { FiGithub, FiLinkedin, FiMail, FiHeart } from 'react-icons/fi';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  const footerLinks = [
    { name: 'Inicio', href: '#home' },
    { name: 'Sobre mí', href: '#about' },
    { name: 'Habilidades', href: '#skills' },
    { name: 'Proyectos', href: '#projects' },
    { name: 'Contacto', href: '#contact' },
  ];

  const socialLinks = [
    {
      name: 'GitHub',
      icon: <FiGithub />,
      href: 'https://github.com/Rex5311',
    },
    {
      name: 'LinkedIn',
      icon: <FiLinkedin />,
      href: 'https://www.linkedin.com/in/juan-esteban-agudelo-carmona-02385439b/',
    },
    {
      name: 'Email',
      icon: <FiMail />,
      href: 'mailto:juanesteban5311@gmail.com',
    },
  ];

  return (
    <footer className="bg-gray-900 text-gray-300">
      <div className="container-custom section-padding">
        <div className="grid md:grid-cols-3 gap-12 mb-12">
          {/* Brand */}
          <div>
            <h3 className="text-2xl font-bold text-white mb-4">
              Juan Agudelo
            </h3>
            <p className="mb-4">
              Desarrollador Fullstack apasionado por crear soluciones web
              innovadoras y eficientes.
            </p>
            <div className="flex gap-4">
              {socialLinks.map((social, index) => (
                <a
                  key={index}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2 bg-gray-800 rounded-lg hover:bg-primary-600 hover:text-white transition-all duration-300 hover:scale-110"
                  aria-label={social.name}
                >
                  <span className="text-xl">{social.icon}</span>
                </a>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-xl font-bold text-white mb-4">
              Enlaces Rápidos
            </h3>
            <ul className="space-y-2">
              {footerLinks.map((link, index) => (
                <li key={index}>
                  <a
                    href={link.href}
                    className="hover:text-primary-400 transition-colors"
                  >
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="text-xl font-bold text-white mb-4">Contacto</h3>
            <ul className="space-y-2">
              <li>
                <span className="font-semibold text-white">Email Personal:</span>
                <br />
                <a
                  href="mailto:juanesteban5311@gmail.com"
                  className="hover:text-primary-400 transition-colors"
                >
                  juanesteban5311@gmail.com
                </a>
              </li>
              <li>
                <span className="font-semibold text-white">Email Estudiantil:</span>
                <br />
                <a
                  href="mailto:juan.agudelo.carmona@correounivalle.edu.co"
                  className="hover:text-primary-400 transition-colors"
                >
                  juan.agudelo.carmona@correounivalle.edu.co
                </a>
              </li>
              <li>
                <span className="font-semibold text-white">Teléfono:</span>
                <br />
                +57 316 328 xxxx
              </li>
              <li>
                <span className="font-semibold text-white">Ubicación:</span>
                <br />
                Cali, Colombia
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-gray-800">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-sm text-center md:text-left">
              © {currentYear} Juan Esteban Agudelo Carmona. Todos los derechos
              reservados.
            </p>
            <p className="text-sm flex items-center gap-1">
              Hecho con <FiHeart className="text-red-500" /> usando React +
              Tailwind CSS
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
