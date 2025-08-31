import React from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';
import { ArrowRight, Play } from 'lucide-react';

const Hero: React.FC = () => {
  const { t } = useTranslation();

  return (
    <section className="relative min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-900 via-slate-900 to-black overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0">
        {/* Réseau neuronal animé */}
        <div className="absolute inset-0 neural-network"></div>
        
        {/* Particules IA intelligentes */}
        <div className="absolute top-20 left-20 w-3 h-3 bg-cyan-400 rounded-full animate-ai-pulse shadow-cyan-400/50 shadow-lg"></div>
        <div className="absolute top-40 right-32 w-2 h-2 bg-blue-400 rounded-full animate-ai-float shadow-blue-400/50 shadow-md"></div>
        <div className="absolute bottom-40 left-1/4 w-4 h-4 bg-indigo-400 rounded-full animate-ai-orbit shadow-indigo-400/50 shadow-lg"></div>
        <div className="absolute top-1/3 right-20 w-2 h-2 bg-purple-400 rounded-full animate-ai-pulse shadow-purple-400/50 shadow-md"></div>
        <div className="absolute bottom-1/3 left-1/3 w-3 h-3 bg-teal-400 rounded-full animate-ai-float shadow-teal-400/50 shadow-lg"></div>
        <div className="absolute top-60 right-1/4 w-2 h-2 bg-cyan-300 rounded-full animate-ai-orbit shadow-cyan-300/50 shadow-md"></div>
        
        {/* Matrices de données flottantes */}
        <div className="absolute top-32 left-1/3 matrix-rain opacity-30"></div>
        <div className="absolute bottom-32 right-1/3 matrix-rain opacity-20" style={{ animationDelay: '2s' }}></div>
        
        {/* Connexions réseau IA */}
        <svg className="absolute inset-0 w-full h-full" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <linearGradient id="aiGradient" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#00d4ff" stopOpacity="0.8" />
              <stop offset="50%" stopColor="#0099ff" stopOpacity="0.6" />
              <stop offset="100%" stopColor="#6366f1" stopOpacity="0.4" />
            </linearGradient>
            <filter id="glow">
              <feGaussianBlur stdDeviation="3" result="coloredBlur"/>
              <feMerge> 
                <feMergeNode in="coloredBlur"/>
                <feMergeNode in="SourceGraphic"/>
              </feMerge>
            </filter>
          </defs>
          
          {/* Connexions réseau IA */}
          <g className="ai-network">
            <path 
              d="M100,200 Q300,100 500,300 T900,200" 
              stroke="url(#aiGradient)" 
              strokeWidth="2" 
              fill="none"
              filter="url(#glow)"
              className="animate-ai-flow"
            />
            <path 
              d="M200,400 Q400,300 600,500 T1000,400" 
              stroke="url(#aiGradient)" 
              strokeWidth="1.5" 
              fill="none"
              filter="url(#glow)"
              className="animate-ai-flow"
              style={{ animationDelay: '1.5s' }}
            />
            <path 
              d="M50,300 Q250,200 450,400 T850,300" 
              stroke="url(#aiGradient)" 
              strokeWidth="1" 
              fill="none"
              filter="url(#glow)"
              className="animate-ai-flow"
              style={{ animationDelay: '3s' }}
            />
          </g>
          
          {/* Nœuds du réseau */}
          <circle cx="100" cy="200" r="4" fill="#00d4ff" className="animate-ai-pulse" filter="url(#glow)" />
          <circle cx="500" cy="300" r="3" fill="#0099ff" className="animate-ai-pulse" style={{ animationDelay: '0.5s' }} filter="url(#glow)" />
          <circle cx="900" cy="200" r="4" fill="#6366f1" className="animate-ai-pulse" style={{ animationDelay: '1s' }} filter="url(#glow)" />
          <circle cx="200" cy="400" r="3" fill="#00d4ff" className="animate-ai-pulse" style={{ animationDelay: '1.5s' }} filter="url(#glow)" />
          <circle cx="600" cy="500" r="4" fill="#0099ff" className="animate-ai-pulse" style={{ animationDelay: '2s' }} filter="url(#glow)" />
        </svg>
        
        {/* Hologrammes flottants */}
        <div className="absolute top-1/4 left-1/5 w-32 h-32 hologram-1 opacity-60"></div>
        <div className="absolute bottom-1/4 right-1/5 w-40 h-40 hologram-2 opacity-50"></div>
        <div className="absolute top-1/2 right-1/4 w-24 h-24 hologram-3 opacity-40"></div>
        
        {/* Scanlines futuristes */}
        <div className="absolute inset-0 scanlines opacity-10"></div>
        
        {/* Éclairage ambiant IA */}
        <div className="absolute top-0 left-0 w-full h-full">
          <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-cyan-500/10 rounded-full blur-3xl animate-ai-glow"></div>
          <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-blue-500/10 rounded-full blur-3xl animate-ai-glow" style={{ animationDelay: '2s' }}></div>
          <div className="absolute top-1/2 left-1/2 w-64 h-64 bg-indigo-500/10 rounded-full blur-3xl animate-ai-glow" style={{ animationDelay: '4s' }}></div>
        </div>
      </div>
      
      {/* Interface HUD futuriste */}
      <div className="absolute top-8 left-8 opacity-30">
        <div className="w-32 h-1 bg-gradient-to-r from-cyan-400 to-transparent animate-ai-scan"></div>
        <div className="w-1 h-32 bg-gradient-to-b from-cyan-400 to-transparent animate-ai-scan" style={{ animationDelay: '1s' }}></div>
      </div>
      <div className="absolute bottom-8 right-8 opacity-30">
        <div className="w-32 h-1 bg-gradient-to-l from-blue-400 to-transparent animate-ai-scan"></div>
        <div className="w-1 h-32 bg-gradient-to-t from-blue-400 to-transparent animate-ai-scan" style={{ animationDelay: '1.5s' }}></div>
      </div>
      
      {/* Données flottantes */}
      <div className="absolute top-20 right-20 text-cyan-400 font-mono text-xs opacity-60 animate-ai-data">
        <div>AI_STATUS: ACTIVE</div>
        <div>OPTIMIZATION: 98.7%</div>
        <div>NEURAL_NET: ONLINE</div>
      </div>
      <div className="absolute bottom-20 left-20 text-blue-400 font-mono text-xs opacity-60 animate-ai-data" style={{ animationDelay: '2s' }}>
        <div>SEO_ENGINE: RUNNING</div>
        <div>TRAFFIC_BOOST: +420%</div>
        <div>RANK_POSITION: #1</div>
      </div>
          />
          <path 
            d="M200,400 Q400,300 600,500 T1000,400" 
            stroke="url(#lineGradient)" 
            strokeWidth="1.5" 
            fill="none"
            className="animate-pulse"
            style={{ animationDelay: '1s' }}
          />
        </svg>
        
        {/* Orbes lumineux */}
        <div className="absolute top-1/4 left-1/4 w-32 h-32 bg-gradient-to-r from-cyan-400/20 to-blue-500/20 rounded-full blur-xl animate-pulse"></div>
        <div className="absolute bottom-1/4 right-1/4 w-40 h-40 bg-gradient-to-r from-purple-400/20 to-indigo-500/20 rounded-full blur-xl animate-pulse" style={{ animationDelay: '2s' }}></div>
        <div className="absolute top-1/2 right-1/3 w-24 h-24 bg-gradient-to-r from-teal-400/20 to-cyan-500/20 rounded-full blur-xl animate-pulse" style={{ animationDelay: '3s' }}></div>
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 xl:px-12 text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          {/* Badge */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.2 }}
            className="inline-flex items-center px-4 py-2 bg-white/10 backdrop-blur-sm text-cyan-300 border border-cyan-400/30 rounded-full text-sm font-medium mb-8"
          >
            {t('hero.badge')}
          </motion.div>

          {/* Main Heading */}
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold text-white mb-6 leading-tight"
          >
            {t('hero.title')}
            <br />
            <span className="bg-gradient-to-r from-cyan-400 via-blue-400 to-purple-400 bg-clip-text text-transparent">
              {t('hero.titleHighlight')}
            </span>
            <br />
            {t('hero.titleEnd')}
          </motion.h1>

          {/* Subtitle */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="text-lg sm:text-xl lg:text-2xl text-gray-300 mb-8 max-w-4xl mx-auto leading-relaxed px-4"
          >
            {t('hero.subtitle')}
          </motion.p>

          {/* CTA Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-12 px-4"
          >
            <Link
              to="/contact"
              className="w-full sm:w-auto inline-flex items-center justify-center px-6 sm:px-8 py-3 sm:py-4 bg-gradient-to-r from-cyan-500 to-blue-500 text-white font-semibold rounded-xl hover:from-cyan-600 hover:to-blue-600 transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-cyan-500/25 group"
            >
              {t('hero.cta')}
              <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
            </Link>
            
            <button className="w-full sm:w-auto inline-flex items-center justify-center px-6 sm:px-8 py-3 sm:py-4 bg-white/10 backdrop-blur-sm text-white font-semibold rounded-xl border-2 border-white/20 hover:bg-white/20 hover:border-white/30 transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl group">
              <Play className="w-5 h-5 mr-2 text-cyan-400" />
              {t('hero.watchDemo')}
            </button>
          </motion.div>

          {/* Trust Indicators */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
            className="flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-6 lg:gap-8 text-xs sm:text-sm text-gray-400 px-4"
          >
            <div className="flex items-center">
              <div className="flex -space-x-2 mr-3">
                {[1,2,3,4,5].map((i) => (
                  <div key={i} className="w-8 h-8 bg-gradient-to-r from-cyan-400 to-blue-400 rounded-full border-2 border-slate-800"></div>
                ))}
              </div>
              <span>500+ {t('hero.stats.sites')}</span>
            </div>
            
            <div className="flex items-center">
              <div className="flex text-yellow-400 mr-2">
                {[1,2,3,4,5].map((i) => (
                  <svg key={i} className="w-4 h-4 fill-current" viewBox="0 0 20 20">
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"/>
                  </svg>
                ))}
              </div>
              <span>4.9/5 (200+ {t('hero.stats.reviews')})</span>
            </div>
            
            <div className="flex items-center">
              <div className="w-2 h-2 sm:w-3 sm:h-3 bg-cyan-400 rounded-full mr-2 animate-pulse"></div>
              <span>7 {t('hero.stats.delivery')}</span>
            </div>
          </motion.div>
        </motion.div>
      </div>

      <style>{`
        .bg-grid-pattern {
          background-image: 
            linear-gradient(rgba(6, 182, 212, 0.1) 1px, transparent 1px),
            linear-gradient(90deg, rgba(6, 182, 212, 0.1) 1px, transparent 1px);
          background-size: 50px 50px;
          animation: grid-move 20s linear infinite;
        }
        
        @keyframes grid-move {
          0% {
            transform: translate(0, 0);
          }
          100% {
            transform: translate(50px, 50px);
          }
        }
        
        @keyframes float-slow {
          0%, 100% {
            transform: translateY(0px) translateX(0px);
          }
          25% {
            transform: translateY(-20px) translateX(10px);
          }
          50% {
            transform: translateY(-10px) translateX(-5px);
          }
          75% {
            transform: translateY(-15px) translateX(15px);
          }
        }
        
        @keyframes float-medium {
          0%, 100% {
            transform: translateY(0px) translateX(0px);
          }
          33% {
            transform: translateY(-15px) translateX(-10px);
          }
          66% {
            transform: translateY(-25px) translateX(8px);
          }
        }
        
        @keyframes float-fast {
          0%, 100% {
            transform: translateY(0px) translateX(0px);
          }
          50% {
            transform: translateY(-30px) translateX(-15px);
          }
        }
        
        .animate-float-slow {
          animation: float-slow 8s ease-in-out infinite;
        }
        
        .animate-float-medium {
          animation: float-medium 6s ease-in-out infinite;
        }
        
        .animate-float-fast {
          animation: float-fast 4s ease-in-out infinite;
        }
        
        @keyframes blob {
          0% {
            transform: translate(0px, 0px) scale(1);
          }
          33% {
            transform: translate(30px, -50px) scale(1.1);
          }
          66% {
            transform: translate(-20px, 20px) scale(0.9);
          }
          100% {
            transform: translate(0px, 0px) scale(1);
          }
        }
        .animate-blob {
          animation: blob 7s infinite;
        }
        .animation-delay-2000 {
          animation-delay: 2s;
        }
        .animation-delay-4000 {
          animation-delay: 4s;
        }
      `}</style>
    </section>
  );
};

export default Hero;