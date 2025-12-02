import { FiBook, FiCode, FiGlobe, FiTarget } from 'react-icons/fi';

const About = () => {
  const stats = [
    { icon: <FiBook />, label: '6to Semestre', value: 'Desarrollo Software' },
    { icon: <FiGlobe />, label: 'Inglés', value: 'Nivel A2' },
    { icon: <FiCode />, label: 'Proyectos', value: '10+' },
    { icon: <FiTarget />, label: 'Edad', value: '20 años' },
  ];

  return (
    <section id="about" className="section-padding bg-gray-100 dark:bg-gray-800">
      <div className="container-custom">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            Sobre <span className="gradient-text">Mí</span>
          </h2>
          <div className="w-20 h-1 bg-primary-600 mx-auto"></div>
        </div>

        <div className="grid md:grid-cols-2 gap-12 items-center">
          {/* Image/Avatar */}
          <div className="flex justify-center">
            <div className="relative">
              <div className="w-80 h-80 rounded-2xl bg-gradient-to-br from-primary-500 to-purple-600 p-1">
                <div className="w-full h-full rounded-2xl overflow-hidden bg-gray-200 dark:bg-gray-700">
                  <img
                    src="/images/profile.jpg"
                    alt="Juan Esteban Agudelo Carmona"
                    className="w-full h-full object-cover"
                    onError={(e) => {
                      // Fallback si no hay imagen
                      e.target.style.display = 'none';
                      e.target.nextElementSibling.style.display = 'flex';
                    }}
                  />
                  {/* Fallback cuando no hay imagen */}
                  <div 
                    className="w-full h-full flex items-center justify-center"
                    style={{ display: 'none' }}
                  >
                    <div className="text-8xl font-bold text-gray-400 dark:text-gray-500">
                      JA
                    </div>
                  </div>
                </div>
              </div>
              <div className="absolute -bottom-4 -right-4 w-24 h-24 bg-primary-600 rounded-2xl flex items-center justify-center text-white text-2xl font-bold shadow-lg">
                UV
              </div>
            </div>
          </div>

          {/* Content */}
          <div>
            <h3 className="text-3xl font-bold mb-6">
              Desarrollador Fullstack apasionado por la tecnología
            </h3>
            <p className="text-gray-600 dark:text-gray-400 mb-6 leading-relaxed">
              Soy Juan Esteban Agudelo Carmona, estudiante de sexto semestre de Desarrollo 
              de Software en la Universidad del Valle, Colombia. Mi pasión es crear 
              soluciones web completas y eficientes.
            </p>
            <p className="text-gray-600 dark:text-gray-400 mb-6 leading-relaxed">
              Me especializo principalmente en Python con experiencia en frameworks como 
              FastAPI y Express. También tengo conocimientos en desarrollo frontend con 
              React y trabajo activamente con inteligencia artificial. Me encanta aprender 
              nuevas tecnologías y aplicarlas en proyectos reales que generen impacto.
            </p>
            <p className="text-gray-600 dark:text-gray-400 mb-8 leading-relaxed">
              Actualmente busco oportunidades de prácticas o posiciones junior donde 
              pueda aplicar mis conocimientos y seguir creciendo profesionalmente en 
              el desarrollo de software.
            </p>

            {/* Stats Grid */}
            <div className="grid grid-cols-2 gap-4">
              {stats.map((stat, index) => (
                <div
                  key={index}
                  className="card flex items-start gap-4"
                >
                  <div className="text-3xl text-primary-600 dark:text-primary-400 mt-1">
                    {stat.icon}
                  </div>
                  <div>
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                      {stat.label}
                    </p>
                    <p className="font-bold text-lg">{stat.value}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
