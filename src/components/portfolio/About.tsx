
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { GraduationCap, Code } from 'lucide-react';

const About = () => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.3,
        duration: 0.6,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: 'easeOut' },
    },
  };

  return (
    <section id="about" className="py-20 bg-black/20 backdrop-blur-sm">
      <div className="container mx-auto px-6">
        <motion.div
          ref={ref}
          variants={containerVariants}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
          className="text-center mb-16"
        >
          <motion.h2
            variants={itemVariants}
            className="text-5xl font-bold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent mb-6"
          >
            About Me
          </motion.h2>
          <motion.div
            variants={itemVariants}
            className="w-24 h-1 bg-gradient-to-r from-purple-400 to-pink-400 mx-auto rounded-full"
          />
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <motion.div
            variants={itemVariants}
            className="space-y-6"
          >
            <div className="relative group">
              <div className="absolute inset-0 bg-gradient-to-r from-purple-600 to-pink-600 rounded-2xl blur-lg opacity-75 group-hover:opacity-100 transition-opacity" />
              <img
                src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop&crop=face"
                alt="Romil Patel"
                className="relative w-80 h-80 object-cover rounded-2xl mx-auto shadow-2xl"
              />
            </div>
          </motion.div>

          <motion.div
            variants={containerVariants}
            className="space-y-6"
          >
            <motion.p
              variants={itemVariants}
              className="text-lg text-gray-300 leading-relaxed"
            >
              I'm Romil Patel, a first-year student at <strong className="text-purple-400">Arizona State University</strong>, 
              majoring in <strong className="text-purple-400">Astronomical and Planetary Sciences</strong>. While my academic 
              journey is rooted in space and science, I've developed a strong passion for <strong className="text-purple-400">web development</strong> through 
              the <strong className="text-purple-400">Global Career Accelerator (GCA)</strong> program.
            </motion.p>

            <motion.p
              variants={itemVariants}
              className="text-lg text-gray-300 leading-relaxed"
            >
              I've built multiple interactive web projects using <strong className="text-purple-400">HTML</strong>, 
              <strong className="text-purple-400"> CSS</strong>, <strong className="text-purple-400">Bootstrap</strong>, 
              <strong className="text-purple-400"> JavaScript</strong>, and <strong className="text-purple-400">Firebase</strong>. 
              I'm passionate about creating exceptional digital experiences and aspire to join the competitive gaming scene.
            </motion.p>

            <motion.p
              variants={itemVariants}
              className="text-lg text-gray-300 leading-relaxed"
            >
              I recently earned a GCA certification badge for completing training in HTML, CSS, and Bootstrap — 
              a recognition of my growth and dedication in web development.
            </motion.p>

            <motion.div
              variants={itemVariants}
              className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-8"
            >
              {[
                { icon: GraduationCap, title: "ASU Student", desc: "Astronomical Sciences" },
                { icon: Code, title: "Web Developer", desc: "Full-Stack Focus" },
              ].map((item, index) => (
                <motion.div
                  key={index}
                  whileHover={{ scale: 1.05, y: -5 }}
                  className="bg-gradient-to-br from-purple-900/50 to-pink-900/50 p-6 rounded-xl border border-purple-500/20 backdrop-blur-sm"
                >
                  <item.icon className="h-8 w-8 text-purple-400 mb-3" />
                  <h3 className="font-semibold text-white mb-1">{item.title}</h3>
                  <p className="text-gray-400 text-sm">{item.desc}</p>
                </motion.div>
              ))}
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default About;
