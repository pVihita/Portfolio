
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { ExternalLink } from 'lucide-react';

const Achievements = () => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  const achievements = [
    {
      title: "🏅 Global Career Accelerator Badge",
      description: "Completed certification in HTML, CSS, and Bootstrap through the GCA program.",
      link: "https://www.credential.net/74c31023-1dd8-4e86-8b18-7f1a518b3b50",
      image: "https://api.badgr.io/public/badges/136728910"
    },
    {
      title: "🌍 Intercultural Skills Badge",
      description: "Completed training in intercultural communication, emotional intelligence, and cultural self-awareness to collaborate effectively in diverse global teams.",
      link: "https://www.credential.net/6edc1ed8-8b14-47a5-9899-9787f0ade449",
      image: "https://api.badgr.io/public/badges/142918764"
    },
    {
      title: "🏅 JavaScript & APIs Badge",
      description: "Completed certification in JavaScript & APIs through the GCA program.",
      link: "https://www.credential.net/3e175b16-4b2e-4b24-93d7-4b24077e3dbe",
      image: "https://api.badgr.io/public/badges/142435296"
    },
    {
      title: "🏅 Global Career Accelerator Certificate",
      description: "Completed training in HTML, CSS, JavaScript, and Bootstrap, demonstrating strong front-end development and responsive design skills.",
      link: "https://www.credential.net/68ac15e5-2b79-41d8-be2e-20433056a854",
      image: "https://api.badgr.io/public/badges/142704496"
    },
    {
      title: "💻 Publicis Sapient Project Certificate",
      description: "Completed a real-world web development project using JavaScript and prototyping frameworks, applying product management and user research skills.",
      link: "https://www.credential.net/421ca7be-749a-490a-9a26-8b2018c311ca",
      image: "https://api.badgr.io/public/badges/142922854"
    }
  ];

  return (
    <section id="achievements" className="py-20 bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 dark:from-black dark:via-purple-950 dark:to-black">
      <div className="container mx-auto px-6">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 50 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent mb-4">
            Achievements
          </h2>
          <div className="w-24 h-1 bg-gradient-to-r from-purple-400 to-pink-400 mx-auto rounded-full" />
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
          {achievements.map((achievement, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 50 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="group"
            >
              <div className="bg-white/10 dark:bg-gray-800/50 backdrop-blur-lg rounded-2xl p-6 border border-purple-500/20 hover:border-purple-400/50 transition-all duration-300 transform hover:scale-105 h-full">
                <div className="text-center mb-4">
                  <h3 className="text-xl font-bold text-white mb-3 group-hover:text-purple-300 transition-colors">
                    {achievement.title}
                  </h3>
                  <p className="text-gray-300 leading-relaxed mb-6">
                    {achievement.description}
                  </p>
                </div>
                
                <div className="flex justify-center mb-4">
                  <img 
                    src={achievement.image} 
                    alt="Achievement Badge" 
                    className="w-24 h-24 object-contain group-hover:scale-110 transition-transform duration-300"
                  />
                </div>

                <div className="text-center">
                  <a
                    href={achievement.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white px-6 py-3 rounded-full font-semibold transition-all duration-300 transform hover:scale-105"
                  >
                    View Certificate
                    <ExternalLink className="h-4 w-4" />
                  </a>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Achievements;
