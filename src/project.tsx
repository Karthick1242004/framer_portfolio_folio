import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { ArrowUpRight } from 'lucide-react';
import { useParams, useNavigate } from 'react-router-dom';
import { usePortfolioData } from './hooks/usePortfolioData';

const ProjectDetail: React.FC = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { data, loading, error } = usePortfolioData();
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

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

  const project = data.projects[Number(id)];
  const { personalInfo } = data;

  if (!project) {
    navigate('/');
    return null;
  }

  return (
    <div className="min-h-screen bg-black text-white font-inter relative">
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

      <nav className="max-w-6xl mt-4 mx-auto w-full top-0 z-40 px-6 py-4 flex justify-between items-center">
        <div className="flex items-center gap-2">
          <div className="w-7 h-7 bg-white text-black flex justify-center items-center rounded-full">
            <p className='font-semibold'>{personalInfo.initial}</p>
          </div>
          <span className="font-medium">{personalInfo.name}</span>
        </div>
        <div className="hidden md:flex items-center gap-8">
          <a href="/" className="hover:text-gray-300 transition-colors">Portfolio</a>
          <a href="/#about" className="hover:text-gray-300 transition-colors">About</a>
          <a href="/#contact" className="hover:text-gray-300 transition-colors">Contact</a>
          <a 
            href="https://folio-lynkr-main.vercel.app/" 
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
            <a 
              href="/" 
              className="hover:text-gray-300 transition-colors"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              Portfolio
            </a>
            <a 
              href="/#about" 
              className="hover:text-gray-300 transition-colors"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              About
            </a>
            <a 
              href="/#contact" 
              className="hover:text-gray-300 transition-colors"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              Contact
            </a>
            <a 
              href="#template" 
              className="flex items-center gap-1 hover:text-gray-300 transition-colors"
            >
              Get template
              <ArrowUpRight size={16} />
            </a>
          </div>
        </motion.div>
      </nav>

      <main className="max-w-6xl mx-auto px-6 pt-20">
        <div className="inline-block text-[13px] border border-[#333333] bg-[#1E1E1E] text-zinc-100 font-thin px-4 py-2 rounded-full mb-6">
          Project detail
        </div>

        <motion.h1 
          className="text-7xl font-normal mb-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          {project.title}
        </motion.h1>

        <motion.p 
          className="text-zinc-400 text-lg max-w-2xl mb-12"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          {project.description}
        </motion.p>

        <div className="flex flex-wrap gap-6 mb-16">
          <div className="bg-zinc-800/50 border border-[#333333] px-6 py-3 rounded-full flex items-center gap-2">
            <span className="text-zinc-400">{project.category}</span>
          </div>
          <a 
            href={project.visitLink}
            target="_blank"
            rel="noopener noreferrer"
            className="bg-zinc-800/50 border border-[#333333] px-6 py-3 rounded-full flex items-center gap-2 hover:bg-zinc-700/50 transition-colors"
          >
            Visit Project
            <ArrowUpRight size={16} />
          </a>
        </div>

        <motion.div 
          className="grid gap-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <img 
            src={project.image} 
            alt={project.title}
            className="w-full h-[600px] object-cover rounded-2xl"
          />
        </motion.div>
        <div className="mt-32 text-center pb-16">
          <a 
            href="/"
            className="inline-flex items-center gap-2 border border-gray-500 bg-black hover:bg-zinc-900 transition-colors px-6 py-3 rounded-full"
          >
            Back to Portfolio
            <ArrowUpRight size={16} />
          </a>
        </div>
      </main>
    </div>
  );
};

export default ProjectDetail;
