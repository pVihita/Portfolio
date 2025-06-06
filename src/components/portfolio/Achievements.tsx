
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { Award, ExternalLink } from 'lucide-react';
import { Button } from '@/components/ui/button';

const Achievements = () => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  const achievements = [
    {
      id: '1',
      title: 'AWS Certified Solutions Architect',
      description: 'Professional certification demonstrating expertise in designing distributed systems on AWS.',
      certificateUrl: 'https://example.com/cert1'
    },
    {
      id: '2',
      title: 'React Developer Certification',
      description: 'Advanced certification in React development and best practices.',
      certificateUrl: 'https://example.com/cert2'
    },
    {
      id: '3',
      title: 'Google Cloud Professional',
      description: 'Certification in Google Cloud Platform services and architecture.',
      certificateUrl: 'https://example.com/cert3'
    }
  ];

  return (
    <section id="achievements" className="py-20 bg-gradient-to-br from-purple-50 to-slate-50 dark:from-purple-950 dark:to-gray-900">
      <div className="container mx-auto px-6">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 50 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent mb-4">
            Achievements
          </h2>
          <div className="w-24 h-1 bg-gradient-to-r from-purple-600 to-pink-600 mx-auto rounded-full" />
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {achievements.map((achievement, index) => (
            <motion.div
              key={achievement.id}
              initial={{ opacity: 0, y: 50 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="group"
            >
              <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:scale-105 border border-purple-100 dark:border-purple-800 h-full flex flex-col">
                <div className="flex items-center mb-4">
                  <div className="w-12 h-12 bg-gradient-to-r from-yellow-400 to-orange-500 rounded-full flex items-center justify-center mr-4">
                    <Award className="h-6 w-6 text-white" />
                  </div>
                  <h3 className="text-xl font-bold text-gray-800 dark:text-white">
                    {achievement.title}
                  </h3>
                </div>
                
                <p className="text-gray-600 dark:text-gray-300 mb-6 leading-relaxed flex-grow">
                  {achievement.description}
                </p>
                
                {achievement.certificateUrl && (
                  <Button
                    asChild
                    className="w-full bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700"
                  >
                    <a href={achievement.certificateUrl} target="_blank" rel="noopener noreferrer">
                      <ExternalLink className="h-4 w-4 mr-2" />
                      View Certificate
                    </a>
                  </Button>
                )}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Achievements;
