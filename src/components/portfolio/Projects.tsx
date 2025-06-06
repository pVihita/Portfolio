
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
      id: '1',
      title: 'E-Commerce Platform',
      description: 'A full-stack e-commerce solution built with React, Node.js, and MongoDB. Features include user authentication, payment integration, and admin dashboard.',
      tags: ['React', 'Node.js', 'MongoDB', 'Stripe'],
      liveUrl: 'https://example.com',
      githubUrl: 'https://github.com',
      imageUrl: '/placeholder.svg',
      status: 'completed'
    },
    {
      id: '2',
      title: 'Task Management App',
      description: 'A collaborative task management application with real-time updates, built using React and Firebase.',
      tags: ['React', 'Firebase', 'Material-UI'],
      liveUrl: 'https://example.com',
      githubUrl: 'https://github.com',
      imageUrl: '/placeholder.svg',
      status: 'completed'
    },
    {
      id: '3',
      title: 'Weather Dashboard',
      description: 'A responsive weather dashboard that displays current weather and forecasts using OpenWeatherMap API.',
      tags: ['JavaScript', 'API', 'CSS3', 'HTML5'],
      liveUrl: 'https://example.com',
      githubUrl: 'https://github.com',
      imageUrl: '/placeholder.svg',
      status: 'completed'
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
              key={project.id}
              initial={{ opacity: 0, y: 50 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="group h-full"
            >
              <div className="bg-white dark:bg-gray-800 rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:scale-105 border border-purple-100 dark:border-purple-800 h-full flex flex-col">
                {project.imageUrl && (
                  <div className="relative overflow-hidden">
                    <img 
                      src={project.imageUrl} 
                      alt={project.title}
                      className="w-full h-48 object-cover group-hover:scale-110 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-purple-900/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  </div>
                )}
                
                <div className="p-6 flex flex-col flex-grow">
                  <div className="flex items-center gap-2 mb-3">
                    <h3 className="text-xl font-bold text-gray-800 dark:text-white">
                      {project.title}
                    </h3>
                    {project.status === 'in-progress' && (
                      <span className="bg-yellow-500 text-white text-xs px-2 py-1 rounded-full">
                        In Progress
                      </span>
                    )}
                    {project.status === 'planned' && (
                      <span className="bg-blue-500 text-white text-xs px-2 py-1 rounded-full">
                        Planned
                      </span>
                    )}
                  </div>
                  
                  <p className="text-gray-600 dark:text-gray-300 mb-4 leading-relaxed flex-grow">
                    {project.description}
                  </p>
                  
                  <div className="flex flex-wrap gap-2 mb-6">
                    {project.tags.map((tag, tagIndex) => (
                      <span
                        key={tagIndex}
                        className="bg-purple-100 dark:bg-purple-900 text-purple-800 dark:text-purple-200 px-3 py-1 rounded-full text-sm font-medium"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                  
                  <div className="flex gap-4 mt-auto">
                    {project.liveUrl && (
                      <Button
                        asChild
                        className="flex-1 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700"
                      >
                        <a href={project.liveUrl} target="_blank" rel="noopener noreferrer">
                          <ExternalLink className="h-4 w-4 mr-2" />
                          Live Demo
                        </a>
                      </Button>
                    )}
                    
                    {project.githubUrl && (
                      <Button
                        asChild
                        variant="outline"
                        className="flex-1 border-purple-500 text-purple-600 hover:bg-purple-500 hover:text-white"
                      >
                        <a href={project.githubUrl} target="_blank" rel="noopener noreferrer">
                          <Github className="h-4 w-4 mr-2" />
                          GitHub
                        </a>
                      </Button>
                    )}
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
