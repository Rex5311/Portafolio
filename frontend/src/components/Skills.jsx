import {
  FiCode,
  FiDatabase,
  FiServer,
  FiLayout,
  FiGitBranch,
  FiTool,
} from 'react-icons/fi';
import {
  SiReact,
  SiNodedotjs,
  SiPython,
  SiJavascript,
  SiHtml5,
  SiCss3,
  SiTailwindcss,
  SiPostgresql,
  SiMysql,
  SiMongodb,
  SiExpress,
  SiFastapi,
  SiGit,
  SiGithub,
  SiVisualstudiocode,
  SiPostman,
  SiFigma,
} from 'react-icons/si';

const Skills = () => {
  const skillCategories = [
    {
      title: 'Frontend',
      icon: <FiLayout />,
      color: 'from-blue-500 to-cyan-500',
      skills: [
        { name: 'React', icon: <SiReact />, level: 85 },
        { name: 'JavaScript', icon: <SiJavascript />, level: 90 },
        { name: 'HTML5', icon: <SiHtml5 />, level: 95 },
        { name: 'CSS3', icon: <SiCss3 />, level: 90 },
        { name: 'Tailwind CSS', icon: <SiTailwindcss />, level: 85 },
      ],
    },
    {
      title: 'Backend',
      icon: <FiServer />,
      color: 'from-green-500 to-emerald-500',
      skills: [
        { name: 'Python', icon: <SiPython />, level: 85 },
        { name: 'FastAPI', icon: <SiFastapi />, level: 75 },
        { name: 'Express', icon: <SiExpress />, level: 65 },
        { name: 'Node.js', icon: <SiNodedotjs />, level: 70 },
      ],
    },
    {
      title: 'Bases de Datos',
      icon: <FiDatabase />,
      color: 'from-purple-500 to-pink-500',
      skills: [
        { name: 'PostgreSQL', icon: <SiPostgresql />, level: 60 },
        { name: 'MySQL', icon: <SiMysql />, level: 60 },
        { name: 'MongoDB', icon: <SiMongodb />, level: 55 },
      ],
    },
    {
      title: 'Herramientas',
      icon: <FiTool />,
      color: 'from-orange-500 to-red-500',
      skills: [
        { name: 'Git', icon: <SiGit />, level: 85 },
        { name: 'GitHub', icon: <SiGithub />, level: 90 },
        { name: 'VS Code', icon: <SiVisualstudiocode />, level: 95 },
        { name: 'Postman', icon: <SiPostman />, level: 80 },
        { name: 'Figma', icon: <SiFigma />, level: 70 },
      ],
    },
  ];

  return (
    <section id="skills" className="section-padding">
      <div className="container-custom">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            Mis <span className="gradient-text">Habilidades</span>
          </h2>
          <div className="w-20 h-1 bg-primary-600 mx-auto mb-6"></div>
          <p className="text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
            Tecnologías y herramientas con las que trabajo para crear soluciones completas
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          {skillCategories.map((category, categoryIndex) => (
            <div key={categoryIndex} className="card">
              {/* Category Header */}
              <div className="flex items-center gap-4 mb-6">
                <div
                  className={`p-3 rounded-lg bg-gradient-to-br ${category.color} text-white text-2xl`}
                >
                  {category.icon}
                </div>
                <h3 className="text-2xl font-bold">{category.title}</h3>
              </div>

              {/* Skills List */}
              <div className="space-y-4">
                {category.skills.map((skill, skillIndex) => (
                  <div key={skillIndex}>
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center gap-2">
                        <span className="text-xl text-gray-600 dark:text-gray-400">
                          {skill.icon}
                        </span>
                        <span className="font-medium">{skill.name}</span>
                      </div>
                      <span className="text-sm text-gray-600 dark:text-gray-400">
                        {skill.level}%
                      </span>
                    </div>
                    {/* Progress Bar */}
                    <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2.5 overflow-hidden">
                      <div
                        className={`h-full rounded-full bg-gradient-to-r ${category.color} transition-all duration-1000 ease-out`}
                        style={{ width: `${skill.level}%` }}
                      ></div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* Additional Skills */}
        <div className="mt-12 text-center">
          <h3 className="text-2xl font-bold mb-6">Otras Competencias</h3>
          <div className="flex flex-wrap justify-center gap-3">
            {[
              'Inteligencia Artificial',
              'Machine Learning',
              'API REST',
              'Responsive Design',
              'Git Flow',
              'Metodologías Ágiles',
              'Problem Solving',
              'Trabajo en Equipo',
            ].map((skill, index) => (
              <span
                key={index}
                className="px-4 py-2 bg-primary-100 dark:bg-primary-900/30 text-primary-700 dark:text-primary-300 rounded-full font-medium hover:scale-105 transition-transform"
              >
                {skill}
              </span>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Skills;
