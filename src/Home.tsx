import { useEffect, useState } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { ArrowUpRight } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { usePortfolioData } from './hooks/usePortfolioData';

function Home() {
  const { data, loading, error } = usePortfolioData();
  const { scrollYProgress } = useScroll();
  const rotate = useTransform(scrollYProgress, [0, 1], [0, 360]);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [openFaq, setOpenFaq] = useState<number | null>(null);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  const fadeInUpVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6 } }
  };

  const scrollToSection = (sectionId: string) => {
    setIsMobileMenuOpen(false);
    document.querySelector(sectionId)?.scrollIntoView({ behavior: 'smooth' });
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-black text-white flex items-center justify-center">
        Loading...
      </div>
    );
  }

  if (error || !data) {
    return (
      <div className="min-h-screen bg-black text-white flex items-center justify-center">
        Error loading data: {error}
      </div>
    );
  }

  const { personalInfo, projects, skills, careerHistory, faqs, social, footer } = data;

  return (
    <div className="min-h-[150vh] bg-black text-white font-inter relative overflow-x-hidden">
      <motion.div
        className="fixed w-4 h-4 bg-white rounded-full pointer-events-none z-50 mix-blend-difference"
        animate={{
          x: mousePosition.x - 18,
          y: mousePosition.y - 18,
        }}
        transition={{
          type: "spring",
          stiffness: 500,
          damping: 28,
          mass: 0.8
        }}
      />

      <nav className="max-w-6xl mt-4 mx-auto w-full top-0 z-40 px-6 py-4 flex justify-between items-center relative">
        <div className="flex items-center gap-2">
          <div className="w-7 h-7 bg-white text-black flex justify-center items-center rounded-full">
              <p className='font-semibold'>{personalInfo.initial}</p>
          </div>
          <span className="font-medium">{personalInfo.name}</span>
        </div>
        <div className="hidden md:flex items-center gap-8">
          <a href="#portfolio" className="hover:text-gray-300 transition-colors" onClick={(e) => {
            e.preventDefault();
            scrollToSection('#portfolio');
          }}>Portfolio</a>
          <a href="#about" className="hover:text-gray-300 transition-colors" onClick={(e) => {
            e.preventDefault();
            scrollToSection('#about');
          }}>About</a>
          <a href="#career" className="hover:text-gray-300 transition-colors" onClick={(e) => {
            e.preventDefault();
            scrollToSection('#career');
          }}>Career</a>
          <a href="#contact" className="hover:text-gray-300 transition-colors" onClick={(e) => {
            e.preventDefault();
            scrollToSection('#contact');
          }}>Contact</a>
          <a 
            href="#template" 
            className="flex items-center gap-1 hover:text-gray-300 transition-colors"
          >
            Get template
            <ArrowUpRight size={16} />
          </a>
        </div>
        <button 
          className="md:hidden z-50"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        >
          <div className={`w-6 h-0.5 bg-white mb-1.5 transition-all duration-300 ${isMobileMenuOpen ? 'rotate-45 translate-y-2' : ''}`}></div>
          <div className={`w-6 h-0.5 bg-white transition-all duration-300 ${isMobileMenuOpen ? '-rotate-45' : ''}`}></div>
        </button>

        {/* Mobile Menu */}
        <motion.div
          className="fixed md:hidden inset-0 bg-black z-40"
          initial={{ opacity: 0, x: '100%' }}
          animate={{
            opacity: isMobileMenuOpen ? 1 : 0,
            x: isMobileMenuOpen ? 0 : '100%'
          }}
          transition={{ duration: 0.3 }}
        >
          <div className="flex flex-col items-center justify-center h-full gap-8 text-2xl">
            <a href="#portfolio" className="hover:text-gray-300 transition-colors" onClick={(e) => {
              e.preventDefault();
              scrollToSection('#portfolio');
            }}>Portfolio</a>
            <a href="#about" className="hover:text-gray-300 transition-colors" onClick={(e) => {
              e.preventDefault();
              scrollToSection('#about');
            }}>About</a>
            <a href="#career" className="hover:text-gray-300 transition-colors" onClick={(e) => {
              e.preventDefault();
              scrollToSection('#career');
            }}>Career</a>
            <a href="#contact" className="hover:text-gray-300 transition-colors" onClick={(e) => {
              e.preventDefault();
              scrollToSection('#contact');
            }}>Contact</a>
            <a 
              href="https://folio-lynkr-main.vercel.app/" 
              className="flex items-center gap-1 hover:text-gray-300 transition-colors"
            >
              Get template
              <ArrowUpRight size={16} />
            </a>
          </div>
        </motion.div>
      </nav>

      <main className="pt-32 px-6">
        <div className="max-w-6xl mx-auto">
          <div className="text-center">
            <div className="inline-block text-[13px] border border-[#333333] bg-[#1E1E1E] text-zinc-100 font-thin px-4 py-2 rounded-full mb-6">
              Hello, I'm {personalInfo.name} 👋
            </div>
          </div>

          <h1 className="text-center text-6xl md:text-7xl leading-tight mb-4">
            <span className="text-white font-normal">{personalInfo.designation} </span>
            <span className="text-zinc-600 font-normal">crafting</span>
            <br />
            <span className="text-zinc-600">{personalInfo.tagline}</span>
          </h1>

          <div className="text-center mt-8">
            <a 
              href={`mailto:${personalInfo.email}`}
              className="inline-flex items-center gap-2 border border-gray-500 bg-black hover:bg-zinc-900 transition-colors px-6 py-3 rounded-full"
            >
              Email me
              <ArrowUpRight size={16} />
            </a>
          </div>

          <div className="spiral-container relative mt-20 flex justify-center">
            <motion.img
              src="https://framerusercontent.com/images/PNuQI9DRcL2AUdDWdNTx1C6Sroo.png?scale-down-to=1024"
              alt="Spiral Design"
              className="w-[500px] max-w-full"
              initial={{ rotate: 0 }}
              animate={{ rotate: 144 }}
              transition={{ 
                duration: 2,
                ease: "easeInOut"
              }}
              style={{
                rotate
              }}
            />
          </div>

          <section className="mt-32" id="portfolio">
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-100px" }}
              variants={fadeInUpVariants}
              className="text-center mb-16"
            >
              <div className="inline-block text-[13px] border border-[#333333] bg-[#191919] text-zinc-100 font-thin px-4 py-2 rounded-full mb-6">
                Portfolio
              </div>
              <h2 className="text-5xl font-medium">
                <span className="text-zinc-400">My Latest</span>
                <span className="text-white"> Projects</span>
              </h2>
            </motion.div>

            <div className="grid md:grid-cols-2 gap-6">
              {projects.map((project, index) => (
                <motion.div
                  key={index}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true, margin: "-100px" }}
                  variants={{
                    hidden: { opacity: 0, y: 20 },
                    visible: { 
                      opacity: 1, 
                      y: 0, 
                      transition: { 
                        duration: 0.6,
                        delay: index * 0.2 
                      } 
                    }
                  }}
                  className="group relative h-[300px] md:h-[400px] rounded-2xl bg-zinc-900 overflow-hidden cursor-pointer"
                  whileHover="hover"
                  onClick={() => navigate(`/project/${index}`)}
                >
                  <motion.div
                    className="absolute inset-0 bg-cover bg-center"
                    style={{ backgroundImage: `url(${project.image})` }}
                    initial={{ opacity: 0 }}
                    variants={{
                      hover: {
                        opacity: 0.5,
                        scale: 1.05,
                        transition: { duration: 0.3 }
                      }
                    }}
                  />
                  <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                    <div className="bg-black/50 px-6 py-3 rounded-full flex items-center gap-2">
                      <span>View Project</span>
                      <ArrowUpRight size={16} />
                    </div>
                  </div>
                  <div className="absolute bottom-0 left-0 right-0 p-6">
                    <h3 className="text-xl font-medium">{project.title}</h3>
                    <p className="text-zinc-400">{project.year}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </section>

          <section className="mt-32 grid md:grid-cols-2 gap-12 items-center" id="about">
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-100px" }}
              variants={fadeInUpVariants}
              className="relative"
            >
              <div className="inline-block text-[13px] border border-[#474747] bg-[#191919] text-zinc-100 font-thin px-4 py-2 rounded-full mb-6">
                About
              </div>
              <div className="bg-zinc-900  rounded-2xl">
                <img 
                  src={personalInfo.profileImage}
                  alt="Profile"
                  className="w-full object-cover h-[600px] rounded-2xl"
                />
              </div>
            </motion.div>
            <div>
              <h2 className="text-5xl font-medium mb-6">
                <span className="text-zinc-200">I am an Architect Turned Into a Fontend Developer</span>
              </h2>
              <p className="text-zinc-400 text-lg mb-12">
                With a background in CSE, I now apply my expertise to software development, 
                blending aesthetics, functionality, and innovation. My goal is to develop modern, 
                user-focused that bring your vision to life.
              </p>
              <div className="grid grid-cols-2 gap-8">
                <div>
                  <p className="text-zinc-400 mb-2">Years of experience</p>
                  <p className="text-4xl font-medium">8+</p>
                </div>
                <div>
                  <p className="text-zinc-400 mb-2">Clients</p>
                  <p className="text-4xl font-medium">20+</p>
                </div>
                <div>
                  <p className="text-zinc-400 mb-2">Projects Completed</p>
                  <p className="text-4xl font-medium">40+</p>
                </div>
                <div>
                  <p className="text-zinc-400 mb-2">Hours of Development</p>
                  <p className="text-4xl font-medium">10,000+</p>
                </div>
              </div>
            </div>
          </section>

          <section className="mt-32 overflow-hidden">
          <div className="bg-[#0E0E0E] rounded-[18px] border border-[#333333] py-5 px-8">
  <div className="relative flex whitespace-nowrap overflow-hidden">
    {/* Left gradient */}
    <div className="absolute left-0 top-0 bottom-0 w-20 z-10 bg-gradient-to-r from-[#0E0E0E] to-transparent"></div>
    
    <motion.div
      className="flex gap-12 items-center"
      animate={{
        x: ["0%", "-50%"]
      }}
      transition={{
        duration: 50,
        ease: "linear",
        repeat: Infinity
      }}
    >
      {[...skills, ...skills].map((skill, index) => (
        <span
          key={index}
          className="text-[16px] font-light text-[#d2d2d2] whitespace-nowrap"
        >
          {skill}
        </span>
      ))}
    </motion.div>

    {/* Right gradient */}
    <div className="absolute right-0 top-0 bottom-0 w-20 z-10 bg-gradient-to-l from-[#0E0E0E] to-transparent"></div>
  </div>
</div>
          </section>

          <section className="mt-32 max-w-6xl mx-auto px-6" id="career">
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-100px" }}
              variants={fadeInUpVariants}
            >
              <div className="inline-block text-[13px] border border-[#474747] bg-[#191919] text-zinc-100 font-thin px-4 py-2 rounded-full mb-6">
                Career
              </div>
              <h2 className="text-5xl font-medium mb-16">
                <span className="text-zinc-400">And This Is </span>
                <span className="text-white">My Career</span>
              </h2>
            </motion.div>

            <div className="space-y-16">
              {careerHistory.map((job, index) => (
                <motion.div
                  key={index}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true, margin: "-100px" }}
                  variants={{
                    hidden: { opacity: 0, y: 20 },
                    visible: { 
                      opacity: 1, 
                      y: 0, 
                      transition: { 
                        duration: 0.6,
                        delay: index * 0.2 
                      } 
                    }
                  }}
                  className="grid md:grid-cols-2 gap-8 pb-16 border-b border-zinc-800"
                >
                  <div>
                    <h3 className="text-2xl font-medium mb-2">{job.title}</h3>
                    <p className="text-zinc-600"><span className='text-zinc-400'>@{job.company}</span> : {job.period}</p>
                  </div>
                  <p className="text-zinc-400 text-lg">{job.description}</p>
                </motion.div>
              ))}
            </div>
          </section>

          <section className="mt-32 max-w-6xl mx-auto px-6">
          <div className="inline-block text-[13px] border border-[#474747] bg-[#191919] text-zinc-100 font-thin px-4 py-2 rounded-full mb-6">
              FAQ
            </div>
            <h2 className="text-5xl font-medium mb-16">
              <span className="text-zinc-400">Frequently Asked </span>
              <span className="text-white">Questions</span>
            </h2>

            <div className="space-y-4">
              {faqs.map((faq, index) => (
                <div
                  key={index}
                  className="bg-zinc-900 rounded-2xl overflow-hidden"
                >
                  <button
                    className="w-full px-8 py-6 text-left flex justify-between items-center"
                    onClick={() => setOpenFaq(openFaq === index ? null : index)}
                  >
                    <span className="text-lg text-gray-300">{faq.question}</span>
                    <motion.span
                      animate={{ rotate: openFaq === index ? 180 : 0 }}
                      className="text-2xl"
                    >
                      ↓
                    </motion.span>
                  </button>
                  <motion.div
                    initial={false}
                    animate={{
                      height: openFaq === index ? "auto" : 0,
                      opacity: openFaq === index ? 1 : 0
                    }}
                    className="overflow-hidden"
                  >
                    <p className="px-8 pb-6 text-zinc-400">
                      {faq.answer}
                    </p>
                  </motion.div>
                </div>
              ))}
            </div>

            <p className="text-center mt-8 text-zinc-400">
              Did not find the answer you're looking for?<br />
              Contact <a href="mailto:info@example.com" className="text-white">karthick1242004@gmail.com</a>
            </p>
          </section>

          <section className="mt-32 relative" id="contact">
            <div className="absolute inset-0 bg-cover bg-center" style={{ 
              backgroundImage: 'url(https://framerusercontent.com/images/63o2VcfSXaOuqMKYDolL0wuFk.png)',
              backgroundBlendMode: 'multiply'
            }}>
              <div className="absolute inset-0 bg-gradient-to-b from-black/50 to-black">
              </div>
            </div>

            <div className="relative max-w-6xl mx-auto px-6 py-32 text-center">
            <div className="inline-block text-[13px] border border-[#474747] bg-[#191919] text-zinc-100 font-thin px-4 py-2 rounded-full mb-6">
                Contact
              </div>
              <h2 className="text-5xl font-medium mb-4">
                <span className="text-zinc-400">Let's Get in </span>
                <span className="text-white">Touch</span>
              </h2>
              <p className="text-zinc-400 mb-8">
                Let's connect and start with your project ASAP.
              </p>
              <a 
                href="#book"
                 className="inline-flex gap-2 text-[13px] border border-[#474747] bg-[#191919] text-zinc-100 font-thin px-7 py-3 rounded-full mb-6"
              >
                Book a call
                <ArrowUpRight className='mt-[2%]' size={16} />
              </a>
              <p className="mt-4 text-zinc-400">
                Or email <a href="mailto:karthick1242004@gmail.com" className="text-white">karthick1242004@gmail.com</a>
              </p>
            </div>
          </section>

          <footer className="border-t border-zinc-800 mt-32">
            <div className="max-w-6xl mx-auto px-6 py-12">
              <div className="grid md:grid-cols-3 gap-8">
                <div className="space-y-4">
                  <div className="flex items-center gap-2">
                    <p className="w-8 h-8 bg-white text-black flex justify-center items-center rounded-full">
                      {personalInfo.initial}
                    </p>
                    <span className="font-medium">{personalInfo.name}</span>
                  </div>
                  <p className="text-zinc-400 text-sm">
                    {personalInfo.designation} {personalInfo.tagline}
                  </p>
                  <p className="text-zinc-400 text-sm">
                    {personalInfo.email}
                  </p>
                </div>
                <div>
                  <h4 className="font-medium mb-4">Navigation</h4>
                  <div className="space-y-2">
                    <a href="#portfolio" className="block text-zinc-400 hover:text-white">Portfolio</a>
                    <a href="#about" className="block text-zinc-400 hover:text-white">About</a>
                    <a href="#contact" className="block text-zinc-400 hover:text-white">Contact me</a>
                    <a href="#book" className="block text-zinc-400 hover:text-white">Book a call</a>
                  </div>
                </div>
                <div>
                  <h4 className="font-medium mb-4">Social</h4>
                  <div className="space-y-2">
                    {Object.entries(social).map(([platform, link]) => (
                      <a key={platform} href={link} className="block text-zinc-400 hover:text-white capitalize">
                        {platform}
                      </a>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </footer>
        </div>
      </main>
    </div>
  );
}

export default Home;