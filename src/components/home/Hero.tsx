import React from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';
import { ArrowRight, Play, Circle } from 'lucide-react';

// Helper function for cn (tailwind-merge like functionality)
function cn(...inputs: (string | undefined | null | boolean)[]) {
  return inputs.filter(Boolean).join(' ');
}

function ElegantShape({
  className,
  delay = 0,
  width = 400,
  height = 100,
  rotate = 0,
  gradient = "from-white/[0.08]",
}: {
  className?: string;
  delay?: number;
  width?: number;
  height?: number;
  rotate?: number;
  gradient?: string;
}) {
  return (
    <motion.div
      initial={{
        opacity: 0,
        y: -150,
        rotate: rotate - 15,
      }}
      animate={{
        opacity: 1,
        y: 0,
        rotate: rotate,
      }}
      transition={{
        duration: 2.4,
        delay,
        ease: [0.23, 0.86, 0.39, 0.96],
        opacity: { duration: 1.2 },
      }}
      className={cn("absolute", className)}
    >
      <motion.div
        animate={{
          y: [0, 15, 0],
        }}
        transition={{
          duration: 12,
          repeat: Number.POSITIVE_INFINITY,
          ease: "easeInOut",
        }}
        style={{
          width,
          height,
        }}
        className="relative"
      >
        <div
          className={cn(
            "absolute inset-0 rounded-full",
            "bg-gradient-to-r to-transparent",
            gradient,
            "backdrop-blur-[2px] border-2 border-black/[0.08]",
            "shadow-[0_8px_32px_0_rgba(0,0,0,0.1)]",
            "after:absolute after:inset-0 after:rounded-full",
            "after:bg-[radial-gradient(circle_at_50%_50%,rgba(0,0,0,0.1),transparent_70%)]"
          )}
        />
      </motion.div>
    </motion.div>
  );
}

const Hero: React.FC = () => {
  const { t } = useTranslation();

  const fadeUpVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: (i: number) => ({
      opacity: 1,
      y: 0,
      transition: {
        duration: 1,
        delay: 0.5 + i * 0.2,
        ease: [0.25, 0.4, 0.25, 1],
      },
    }),
  };

  return (
    <section className="relative min-h-screen flex items-center justify-center bg-white dark:bg-gray-900 overflow-hidden transition-colors duration-300">
      {/* Elegant Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-indigo-500/[0.08] via-transparent to-rose-500/[0.08] blur-3xl" />

      <div className="absolute inset-0 overflow-hidden">
        <ElegantShape
          delay={0.3}
          width={600}
          height={140}
          rotate={12}
          gradient="from-indigo-500/[0.25]"
          className="left-[-15%] sm:left-[-10%] md:left-[-5%] top-[15%] md:top-[20%]"
        />

        <ElegantShape
          delay={0.5}
          width={500}
          height={120}
          rotate={-15}
          gradient="from-rose-500/[0.25]"
          className="right-[-10%] sm:right-[-5%] md:right-[0%] top-[70%] md:top-[75%]"
        />

        <ElegantShape
          delay={0.4}
          width={300}
          height={80}
          rotate={-8}
          gradient="from-violet-500/[0.25]"
          className="left-[0%] sm:left-[5%] md:left-[10%] bottom-[5%] md:bottom-[10%]"
        />

        <ElegantShape
          delay={0.6}
          width={200}
          height={60}
          rotate={20}
          gradient="from-amber-500/[0.25]"
          className="right-[10%] sm:right-[15%] md:right-[20%] top-[10%] md:top-[15%]"
        />

        <ElegantShape
          delay={0.7}
          width={150}
          height={40}
          rotate={-25}
          gradient="from-cyan-500/[0.25]"
          className="left-[15%] sm:left-[20%] md:left-[25%] top-[5%] md:top-[10%]"
        />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          {/* Badge */}
          <motion.div
            custom={0}
            variants={fadeUpVariants}
            initial="hidden"
            animate="visible"
            className="inline-flex items-center gap-2 px-4 py-2 bg-white/90 dark:bg-gray-800/90 border border-gray-200 dark:border-gray-600 rounded-full text-sm font-medium mb-6 sm:mb-8 shadow-lg backdrop-blur-sm"
          >
            <Circle className="h-2 w-2 fill-blue-500 text-blue-500" />
            <span className="text-gray-700 dark:text-gray-200 tracking-wide transition-colors duration-300 font-medium">
              {t('hero.badge')}
            </span>
          </motion.div>

          {/* Main Heading */}
          <motion.h1
            custom={1}
            variants={fadeUpVariants}
            initial="hidden"
            animate="visible"
            className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold mb-4 sm:mb-6 leading-tight tracking-tight"
          >
            <span className="text-gray-900 dark:text-white transition-colors duration-300 drop-shadow-sm">
              {t('hero.title')}
            </span>
            <br />
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-600 drop-shadow-sm">
              {t('hero.titleHighlight')}
            </span>
            <br />
            <span className="text-gray-900 dark:text-white transition-colors duration-300 drop-shadow-sm">
              {t('hero.titleEnd')}
            </span>
          </motion.h1>

          {/* Subtitle */}
          <motion.p
            custom={2}
            variants={fadeUpVariants}
            initial="hidden"
            animate="visible"
            className="text-base sm:text-lg md:text-xl lg:text-2xl text-gray-700 dark:text-gray-200 mb-6 sm:mb-8 max-w-4xl mx-auto leading-relaxed font-medium tracking-wide px-4 transition-colors duration-300 drop-shadow-sm"
          >
            {t('hero.subtitle')}
          </motion.p>

          {/* CTA Buttons */}
          <motion.div
            custom={3}
            variants={fadeUpVariants}
            initial="hidden"
            animate="visible"
            className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center items-center mb-8 sm:mb-12"
          >
            <Link
              to="/contact"
              className="inline-flex items-center px-6 sm:px-8 py-3 sm:py-4 bg-blue-600 text-white font-semibold rounded-xl hover:bg-blue-700 transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl group text-sm sm:text-base w-full sm:w-auto justify-center"
            >
              {t('hero.cta')}
              <ArrowRight className="w-4 h-4 sm:w-5 sm:h-5 ml-2 group-hover:translate-x-1 transition-transform" />
            </Link>
            
            <button className="inline-flex items-center px-6 sm:px-8 py-3 sm:py-4 bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm text-gray-900 dark:text-white font-semibold rounded-xl border-2 border-gray-200/50 dark:border-gray-600/50 hover:border-gray-300 dark:hover:border-gray-500 transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl group w-full sm:w-auto justify-center">
              <Play className="w-4 h-4 sm:w-5 sm:h-5 mr-2 text-blue-600" />
              {t('hero.watchDemo')}
            </button>
          </motion.div>

          {/* Trust Indicators */}
          <motion.div
            custom={4}
            variants={fadeUpVariants}
            initial="hidden"
            animate="visible"
            className="flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-8 text-xs sm:text-sm text-gray-600 dark:text-gray-300 transition-colors duration-300"
          >
            <div className="flex items-center justify-center">
              <div className="flex -space-x-1 sm:-space-x-2 mr-2 sm:mr-3">
                {[1,2,3,4,5].map((i) => (
                  <div key={i} className="w-5 h-5 sm:w-6 sm:h-6 md:w-8 md:h-8 bg-gradient-to-r from-blue-400 to-teal-400 rounded-full border-2 border-white"></div>
                ))}
              </div>
              <span>500+ {t('hero.stats.sites')}</span>
            </div>
            
            <div className="flex items-center justify-center">
              <div className="flex text-yellow-400 mr-2">
                {[1,2,3,4,5].map((i) => (
                  <svg key={i} className="w-3 h-3 sm:w-4 sm:h-4 fill-current" viewBox="0 0 20 20">
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"/>
                  </svg>
                ))}
              </div>
              <span>4.9/5 (200+ {t('hero.stats.reviews')})</span>
            </div>
            
            <div className="flex items-center justify-center">
              <div className="w-2 h-2 sm:w-3 sm:h-3 bg-green-400 rounded-full mr-2 animate-pulse"></div>
              <span>7 {t('hero.stats.delivery')}</span>
            </div>
          </motion.div>
        </motion.div>
      </div>

      {/* Gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-white/95 via-transparent to-white/90 dark:from-gray-900/95 dark:via-transparent dark:to-gray-900/90 pointer-events-none transition-colors duration-300" />
    </section>
  );
};

export default Hero;