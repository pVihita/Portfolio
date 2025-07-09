import { useState, useEffect, useRef } from 'react';
import gsap from '@/utils/gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { animationUtils } from '@/utils/gsap';
import { Github, Linkedin, Mail, Send } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import emailjs from '@emailjs/browser';

const Contact = () => {
  const contactRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const formRef = useRef<HTMLDivElement>(null);
  const socialRef = useRef<HTMLDivElement>(null);

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus('idle');

    try {
      // Send main contact email
      await emailjs.send(
        'service_b8wcxgn',
        'template_3y8l8dn',
        {
          from_name: formData.name,
          from_email: formData.email,
          subject: formData.subject,
          message: formData.message,
          to_name: 'Romil Patel'
        },
        'b-uNk6s2WC-8hJ1WN'
      );

      // Send auto-reply email to client
      await emailjs.send(
        'service_b8wcxgn',
        'template_auto_reply',
        {
          to_name: formData.name,
          to_email: formData.email,
          subject: formData.subject,
          from_name: 'Romil Patel'
        },
        'b-uNk6s2WC-8hJ1WN'
      );
      
      setSubmitStatus('success');
      setFormData({ name: '', email: '', subject: '', message: '' });
      
      // Success animation
      animationUtils.particleExplosion(formRef.current!, 30);
      
    } catch (error) {
      console.error('EmailJS error:', error);
      setSubmitStatus('error');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const socialLinks = [
    {
      icon: Github,
      href: "https://github.com/Techy2419",
      label: "GitHub",
      color: "hover:text-gray-400"
    },
    {
      icon: Linkedin,
      href: "https://www.linkedin.com/in/romil-patel-",
      label: "LinkedIn",
      color: "hover:text-blue-400"
    },
    {
      icon: Mail,
      href: "mailto:romilpatel2007@gmail.com",
      label: "Email",
      color: "hover:text-red-400"
    }
  ];

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    
    const ctx = gsap.context(() => {
      // Title animation
      animationUtils.textReveal(titleRef.current!, {
        scrollTrigger: {
          trigger: titleRef.current,
          start: "top 80%",
          toggleActions: "play none none reverse"
        }
      });

      // Form animation
      const formElements = formRef.current?.querySelectorAll('.form-element');
      formElements?.forEach((element, index) => {
        gsap.from(element, {
          opacity: 0,
          x: -50,
          duration: 0.8,
          ease: "power3.out",
          delay: index * 0.1,
          scrollTrigger: {
            trigger: element,
            start: "top 85%",
            toggleActions: "play none none reverse"
          }
        });
      });

      // Social links animation
      const socialItems = socialRef.current?.querySelectorAll('.social-item');
      socialItems?.forEach((item, index) => {
        const itemElement = item as HTMLElement;
        
        gsap.from(item, {
          opacity: 0,
          x: 50,
          duration: 0.8,
          ease: "back.out(1.7)",
          delay: index * 0.2,
          scrollTrigger: {
            trigger: item,
            start: "top 85%",
            toggleActions: "play none none reverse"
          }
        });

        // Add magnetic effect
        animationUtils.magneticButton(itemElement);

        // Hover animation
        itemElement.addEventListener('mouseenter', () => {
          gsap.to(item, {
            scale: 1.1,
            rotation: 5,
            duration: 0.3,
            ease: "power2.out"
          });
        });

        itemElement.addEventListener('mouseleave', () => {
          gsap.to(item, {
            scale: 1,
            rotation: 0,
            duration: 0.3,
            ease: "power2.out"
          });
        });
      });

      // Floating animation for form container
      gsap.to(formRef.current, {
        y: -10,
        duration: 3,
        ease: "sine.inOut",
        repeat: -1,
        yoyo: true
      });

      // Background wave animation
      createWaveBackground();

    }, contactRef);

    return () => ctx.revert();
  }, []);

  const createWaveBackground = () => {
    const container = contactRef.current;
    if (!container) return;

    const svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
    svg.setAttribute('width', '100%');
    svg.setAttribute('height', '100%');
    svg.setAttribute('viewBox', '0 0 1200 600');
    svg.style.cssText = `
      position: absolute;
      top: 0;
      left: 0;
      opacity: 0.1;
      pointer-events: none;
    `;

    const defs = document.createElementNS('http://www.w3.org/2000/svg', 'defs');
    const gradient = document.createElementNS('http://www.w3.org/2000/svg', 'linearGradient');
    gradient.setAttribute('id', 'waveGradient');
    gradient.innerHTML = `
      <stop offset="0%" stop-color="#8B5CF6" />
      <stop offset="100%" stop-color="#EC4899" />
    `;
    defs.appendChild(gradient);
    svg.appendChild(defs);

    // Create multiple wave paths
    for (let i = 0; i < 3; i++) {
      const path = document.createElementNS('http://www.w3.org/2000/svg', 'path');
      path.setAttribute('fill', 'url(#waveGradient)');
      path.setAttribute('opacity', (0.3 - i * 0.1).toString());
      
      const initialPath = `M0,${200 + i * 50} Q300,${150 + i * 30} 600,${200 + i * 50} T1200,${200 + i * 50} V600 H0 Z`;
      path.setAttribute('d', initialPath);
      
      svg.appendChild(path);

      // Animate waves
      gsap.to(path, {
        attr: { 
          d: `M0,${250 + i * 50} Q300,${100 + i * 30} 600,${250 + i * 50} T1200,${250 + i * 50} V600 H0 Z` 
        },
        duration: 4 + i,
        ease: "sine.inOut",
        repeat: -1,
        yoyo: true,
        delay: i * 0.5
      });
    }

    container.appendChild(svg);
  };

  return (
    <section 
      ref={contactRef} 
      id="contact" 
      className="py-20 bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 dark:from-black dark:via-purple-950 dark:to-black relative overflow-hidden"
    >
      <div className="container mx-auto px-6 relative z-10">
        <div className="text-center mb-16">
          <h2 
            ref={titleRef}
            className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent mb-4"
          >
            Let's Connect
          </h2>
          <div className="w-24 h-1 bg-gradient-to-r from-purple-400 to-pink-400 mx-auto rounded-full mb-6" />
          <p className="text-xl text-gray-300 max-w-2xl mx-auto">
            Ready to start your next project with me? Send me a message or connect with me through social media!
          </p>
        </div>

        <div className="max-w-4xl mx-auto grid md:grid-cols-2 gap-12 items-start">
          {/* Contact Form */}
          <div ref={formRef} className="form-element">
            <div className="bg-white/10 dark:bg-gray-800/50 backdrop-blur-lg rounded-2xl p-8 border border-purple-500/20">
              <h3 className="text-2xl font-bold text-white mb-6">Send a Message</h3>
              
              {submitStatus === 'success' && (
                <div className="bg-green-500/20 border border-green-500/50 rounded-lg p-4 mb-6">
                  <p className="text-green-300">Message sent successfully! I'll get back to you soon.</p>
                </div>
              )}

              {submitStatus === 'error' && (
                <div className="bg-red-500/20 border border-red-500/50 rounded-lg p-4 mb-6">
                  <p className="text-red-300">Failed to send message. Please try again or contact me directly.</p>
                </div>
              )}
              
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="form-element">
                  <Input
                    type="text"
                    name="name"
                    placeholder="Your Name"
                    value={formData.name}
                    onChange={handleInputChange}
                    required
                    className="bg-white/10 border-purple-500/30 text-white placeholder:text-gray-400 focus:border-purple-400"
                  />
                </div>
                
                <div className="form-element">
                  <Input
                    type="email"
                    name="email"
                    placeholder="Your Email"
                    value={formData.email}
                    onChange={handleInputChange}
                    required
                    className="bg-white/10 border-purple-500/30 text-white placeholder:text-gray-400 focus:border-purple-400"
                  />
                </div>
                
                <div className="form-element">
                  <Input
                    type="text"
                    name="subject"
                    placeholder="Subject"
                    value={formData.subject}
                    onChange={handleInputChange}
                    required
                    className="bg-white/10 border-purple-500/30 text-white placeholder:text-gray-400 focus:border-purple-400"
                  />
                </div>
                
                <div className="form-element">
                  <Textarea
                    name="message"
                    placeholder="Your Message"
                    value={formData.message}
                    onChange={handleInputChange}
                    required
                    rows={5}
                    className="bg-white/10 border-purple-500/30 text-white placeholder:text-gray-400 focus:border-purple-400"
                  />
                </div>
                
                <Button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white py-3 rounded-lg font-semibold transition-all duration-300"
                >
                  {isSubmitting ? (
                    <div className="h-5 w-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                  ) : (
                    <>
                      <Send className="h-5 w-5 mr-2" />
                      Send Message
                    </>
                  )}
                </Button>
              </form>
            </div>
          </div>

          {/* Social Links */}
          <div ref={socialRef} className="space-y-8">
            <div className="bg-white/10 dark:bg-gray-800/50 backdrop-blur-lg rounded-2xl p-8 border border-purple-500/20">
              <h3 className="text-2xl font-bold text-white mb-6">Connect With Me</h3>
              
              <div className="space-y-6">
                {socialLinks.map((social, index) => (
                  <a
                    key={social.label}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`social-item flex items-center gap-4 text-white ${social.color} transition-all duration-300 group cursor-pointer`}
                  >
                    <div className="bg-gradient-to-r from-purple-600 to-pink-600 p-3 rounded-full transition-transform duration-300">
                      <social.icon className="h-6 w-6" />
                    </div>
                    <span className="text-lg font-medium">{social.label}</span>
                  </a>
                ))}
              </div>
            </div>

            <div className="text-center">
              <p className="text-gray-300 text-lg">
                Let's build something amazing together!
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;