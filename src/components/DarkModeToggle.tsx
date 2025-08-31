import React from 'react';
import { Moon, Sun } from 'lucide-react';
import { motion } from 'framer-motion';
import { useDarkMode } from '../hooks/useDarkMode';

const DarkModeToggle: React.FC = () => {
  const { isDarkMode, toggleDarkMode } = useDarkMode();

  return (
    <motion.button
      onClick={toggleDarkMode}
      className="relative flex items-center justify-center w-14 h-8 bg-gradient-to-r from-gray-200 to-gray-300 dark:from-gray-700 dark:to-gray-600 rounded-full transition-all duration-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 dark:focus:ring-offset-gray-800 shadow-inner hover:shadow-lg"
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      aria-label={isDarkMode ? 'Passer en mode clair' : 'Passer en mode sombre'}
      role="switch"
      aria-checked={isDarkMode}
    >
      {/* Background gradient overlay */}
      <motion.div
        className="absolute inset-0 rounded-full bg-gradient-to-r from-blue-400 via-purple-500 to-indigo-600 dark:from-slate-800 dark:via-slate-700 dark:to-slate-600"
        initial={false}
        animate={{
          opacity: isDarkMode ? 1 : 0,
        }}
        transition={{ duration: 0.5, ease: "easeInOut" }}
      />
      
      {/* Animated stars for dark mode */}
      <motion.div
        className="absolute inset-0 rounded-full overflow-hidden"
        initial={false}
        animate={{
          opacity: isDarkMode ? 1 : 0,
        }}
        transition={{ duration: 0.5 }}
      >
        {[...Array(3)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-1 h-1 bg-white rounded-full"
            style={{
              left: `${20 + i * 25}%`,
              top: `${30 + (i % 2) * 20}%`,
            }}
            animate={{
              opacity: isDarkMode ? [0, 1, 0] : 0,
              scale: isDarkMode ? [0.5, 1, 0.5] : 0,
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              delay: i * 0.5,
            }}
          />
        ))}
      </motion.div>
      
      {/* Toggle Circle */}
      <motion.div
        className="relative z-10 flex items-center justify-center w-6 h-6 bg-white dark:bg-gray-100 rounded-full shadow-lg border border-gray-200 dark:border-gray-300"
        initial={false}
        animate={{
          x: isDarkMode ? 14 : -6,
          rotate: isDarkMode ? 360 : 0,
        }}
        transition={{
          type: "spring",
          stiffness: 500,
          damping: 30,
          duration: 0.6
        }}
      >
        {/* Sun Icon */}
        <motion.div
          initial={false}
          animate={{
            scale: isDarkMode ? 0 : 1,
            rotate: isDarkMode ? 180 : 0,
            opacity: isDarkMode ? 0 : 1,
          }}
          transition={{ duration: 0.4, ease: "easeInOut" }}
          className="absolute"
        >
          <Sun className="w-4 h-4 text-yellow-500" />
        </motion.div>
        
        {/* Moon Icon */}
        <motion.div
          initial={false}
          animate={{
            scale: isDarkMode ? 1 : 0,
            rotate: isDarkMode ? 0 : -180,
            opacity: isDarkMode ? 1 : 0,
          }}
          transition={{ duration: 0.4, ease: "easeInOut" }}
          className="absolute"
        >
          <Moon className="w-4 h-4 text-slate-700" />
        </motion.div>
      </motion.div>

      {/* Glow effect */}
      <motion.div
        className="absolute inset-0 rounded-full"
        animate={{
          boxShadow: isDarkMode 
            ? '0 0 20px rgba(99, 102, 241, 0.4), inset 0 0 20px rgba(99, 102, 241, 0.1)'
            : '0 0 15px rgba(251, 191, 36, 0.3), inset 0 0 15px rgba(251, 191, 36, 0.1)',
        }}
        transition={{ duration: 0.5 }}
      />
    </motion.button>
  );
};

export default DarkModeToggle;