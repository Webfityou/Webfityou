import React from 'react';
import { Moon, Sun } from 'lucide-react';
import { motion } from 'framer-motion';
import { useDarkMode } from '../hooks/useDarkMode';

const DarkModeToggle: React.FC = () => {
  const { isDarkMode, toggleDarkMode } = useDarkMode();

  return (
    <motion.button
      onClick={toggleDarkMode}
      className="relative flex items-center justify-center w-12 h-6 bg-gray-200 dark:bg-gray-700 rounded-full transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 dark:focus:ring-offset-gray-800"
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      aria-label={isDarkMode ? 'Switch to light mode' : 'Switch to dark mode'}
      role="switch"
      aria-checked={isDarkMode}
    >
      {/* Toggle Background */}
      <motion.div
        className="absolute inset-0 rounded-full bg-gradient-to-r from-blue-400 to-blue-600 dark:from-gray-600 dark:to-gray-800"
        initial={false}
        animate={{
          opacity: isDarkMode ? 1 : 0,
        }}
        transition={{ duration: 0.3 }}
      />
      
      {/* Toggle Circle */}
      <motion.div
        className="relative z-10 flex items-center justify-center w-5 h-5 bg-white dark:bg-gray-200 rounded-full shadow-md"
        initial={false}
        animate={{
          x: isDarkMode ? 24 : 4,
        }}
        transition={{
          type: "spring",
          stiffness: 500,
          damping: 30
        }}
      >
        <motion.div
          initial={false}
          animate={{
            scale: isDarkMode ? 0 : 1,
            rotate: isDarkMode ? 180 : 0,
          }}
          transition={{ duration: 0.3 }}
          className="absolute"
        >
          <Sun className="w-3 h-3 text-yellow-500" />
        </motion.div>
        
        <motion.div
          initial={false}
          animate={{
            scale: isDarkMode ? 1 : 0,
            rotate: isDarkMode ? 0 : -180,
          }}
          transition={{ duration: 0.3 }}
          className="absolute"
        >
          <Moon className="w-3 h-3 text-blue-400" />
        </motion.div>
      </motion.div>
    </motion.button>
  );
};

export default DarkModeToggle;