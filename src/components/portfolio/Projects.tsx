import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { ExternalLink, Github } from 'lucide-react';
import { Button } from '@/components/ui/button';

const Projects = () => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  const projects = [
    {
      title: 'Voyago – Travel Booking Web App',
      description: 'Voyago is a modern, multi-page travel booking web app with responsive design, a complete booking flow, dark/light mode toggle, and polished UI built using React, TypeScript, and Tailwind CSS.',
      tech: ['TypeScript', 'React', 'Tailwind CSS', 'Vite'],
      image: '/img/voyago.png',
      liveDemo: 'https://voyago-romil-patel.vercel.app/',
      github: 'https://github.com/Techy2419/voyago.git',
      status: 'Completed'
    },
    {
      title: 'Publicis Sapient: Homes & Villas by Marriott Bonvoy',
      description: 'Built a functional travel rental website featuring destination search, real-time map pins, user authentication, and dark mode. Delivered a high-fidelity prototype. Certified by Publicis Sapient for real-world product development.',
      tech: ['HTML5', 'CSS3', 'JavaScript', 'BootStrap', 'Firebase', 'UX Research', 'UX Prototyping'],
      image: '/img/publicis_sapient.png',
      liveDemo: 'https://publicis-sapient-project.vercel.app/',
      github: 'https://github.com/Techy2419/Publicis-Sapient-Project.git',
      status: 'Completed'
    },
    {
      title: 'BookSync - Appointment Scheduler',
      description: 'A calendar booking app that syncs with Google Calendar or Apple Calendar via .ics files, allowing users to schedule meetings with smart platform-aware event handling.',
      tech: ['TypeScript', 'React', 'Tailwind CSS', 'Vite'],
      image: '/img/booksync.png',
      liveDemo: 'https://booksync-romil-patel.vercel.app/',
      github: 'https://github.com/Techy2419/BookSync-appointment-scheduler.git',
      status: 'Completed'
    },
    {
      title: 'EmailJs Registration Form',
      description: 'Responsive Bootstrap form that sends confirmation emails using EmailJS and features a modern dark UI with a thank-you screen.',
      tech: ['HTML', 'CSS', 'JavaScript', 'EmailJs'],
      image: '/img/email_js.png',
      liveDemo: 'https://emailjs-registration-form.vercel.app/',
      github: 'https://github.com/Techy2419/emailjs-registration-form.git',
      status: 'Completed'
    },
    {
      title: 'Website with Login & Registration Form',
      description: 'A clean and responsive website featuring a stylish login/signup form with a slide-up effect and blurred background, a 5-link navbar with hover effects, and a hamburger menu for mobile view.',
      tech: ['HTML', 'CSS', 'JavaScript'],
      image: '/img/website_login.png',
      liveDemo: 'https://website-with-login-registration-page.vercel.app/',
      github: 'https://github.com/Techy2419/Website-with-Login-Registration-Page.git',
      status: 'Completed'
    },
    {
      title: 'FinTrackr',
      description: 'Expense tracking web app with simple budget management, transaction logging, and visual reporting.',
      tech: ['HTML', 'CSS', 'JavaScript', 'Firebase'],
      image: '/img/fintrackr.png',
      liveDemo: 'https://fin-trackr-gilt.vercel.app/',
      github: 'https://github.com/Techy2419/FinTrackr.git',
      status: 'In Progress'
    }
  ];

  return (
    <section id="projects" className="py-20 bg-gradient-to-br from-slate-50 to-purple-50 dark:from-gray-900 dark:to-purple-950">
      <div className="container mx-auto px-6">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 50 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent mb-4">
            Projects
          </h2>
          <div className="w-24 h-1 bg-gradient-to-r from-purple-600 to-pink-600 mx-auto rounded-full" />
        </motion.div>

        <div className="grid md:grid-cols-2 gap-8 max-w-6xl mx-auto">
          {projects.map((project, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 50 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="group h-full"
            >
              <div className="bg-white dark:bg-gray-800 rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:scale-105 border border-purple-100 dark:border-purple-800 h-full flex flex-col">
                <div className="relative overflow-hidden">
                  <img 
                    src={project.image} 
                    alt={project.title}
                    className="w-full h-48 object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-purple-900/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                </div>
                
                <div className="p-6 flex flex-col flex-grow">
                  <div className="flex items-center gap-2 mb-3">
                    <h3 className="text-xl font-bold text-gray-800 dark:text-white">
                      {project.title}
                    </h3>
                    {project.status && (
                      <span className="bg-yellow-500 text-white text-xs px-2 py-1 rounded-full">
                        {project.status}
                      </span>
                    )}
                  </div>
                  
                  <p className="text-gray-600 dark:text-gray-300 mb-4 leading-relaxed flex-grow">
                    {project.description}
                  </p>
                  
                  <div className="flex flex-wrap gap-2 mb-6">
                    {project.tech.map((tech) => (
                      <span
                        key={tech}
                        className="bg-purple-100 dark:bg-purple-900 text-purple-800 dark:text-purple-200 px-3 py-1 rounded-full text-sm font-medium"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                  
                  <div className="flex gap-4 mt-auto">
                    <Button
                      asChild
                      className="flex-1 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700"
                    >
                      <a href={project.liveDemo} target="_blank" rel="noopener noreferrer">
                        <ExternalLink className="h-4 w-4 mr-2" />
                        Live Demo
                      </a>
                    </Button>
                    
                    <Button
                      asChild
                      variant="outline"
                      className="flex-1 border-purple-500 text-purple-600 hover:bg-purple-500 hover:text-white"
                    >
                      <a href={project.github} target="_blank" rel="noopener noreferrer">
                        <Github className="h-4 w-4 mr-2" />
                        GitHub
                      </a>
                    </Button>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Projects;
