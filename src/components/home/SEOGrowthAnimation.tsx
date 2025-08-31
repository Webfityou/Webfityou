import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { motion, useInView } from 'framer-motion';
import { TrendingUp, Search, MessageSquare, BarChart3 } from 'lucide-react';

const SEOGrowthAnimation: React.FC = () => {
  const { t } = useTranslation();
  const [googleRanking, setGoogleRanking] = useState(0);
  const [chatgptVisibility, setChatgptVisibility] = useState(0);
  const [trafficMultiplier, setTrafficMultiplier] = useState(1);
  const ref = React.useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  useEffect(() => {
    if (!isInView) return;

    // Animation des métriques
    const duration = 3000; // 3 secondes
    const steps = 60; // 60 étapes pour une animation fluide
    const interval = duration / steps;

    let step = 0;
    const timer = setInterval(() => {
      const progress = step / steps;
      const easeOut = 1 - Math.pow(1 - progress, 3); // Courbe d'animation

      // Google ranking (de 0 à 95%)
      setGoogleRanking(Math.round(easeOut * 95));
      
      // ChatGPT visibility (de 0 à 88%)
      setChatgptVisibility(Math.round(easeOut * 88));
      
      // Traffic multiplier (de 1x à 4.2x)
      setTrafficMultiplier(1 + (easeOut * 3.2));

      step++;
      if (step > steps) {
        clearInterval(timer);
      }
    }, interval);

    return () => clearInterval(timer);
  }, [isInView]);

  const metrics = [
    {
      icon: <Search className="w-6 h-6" />,
      label: "Visibilité Google",
      value: googleRanking,
      unit: "%",
      color: "blue",
      description: "Amélioration du positionnement"
    },
    {
      icon: <MessageSquare className="w-6 h-6" />,
      label: "Visibilité ChatGPT",
      value: chatgptVisibility,
      unit: "%",
      color: "green",
      description: "Référencement IA nouvelle génération"
    },
    {
      icon: <TrendingUp className="w-6 h-6" />,
      label: "Trafic organique",
      value: trafficMultiplier,
      unit: "x",
      color: "orange",
      description: "Multiplication du trafic naturel"
    }
  ];

  const getColorClasses = (color: string) => {
    const colors = {
      blue: { bg: 'bg-blue-50', text: 'text-blue-600', border: 'border-blue-200', progress: 'bg-blue-500' },
      green: { bg: 'bg-green-50', text: 'text-green-600', border: 'border-green-200', progress: 'bg-green-500' },
      orange: { bg: 'bg-orange-50', text: 'text-orange-600', border: 'border-orange-200', progress: 'bg-orange-500' }
    };
    return colors[color as keyof typeof colors];
  };

  return (
    <section ref={ref} className="py-16 sm:py-20 lg:py-24 bg-gradient-to-br from-gray-50 to-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 xl:px-12">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-12 sm:mb-16"
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={isInView ? { opacity: 1, scale: 1 } : {}}
            transition={{ delay: 0.2, duration: 0.6 }}
            className="inline-flex items-center px-4 py-2 bg-gradient-to-r from-blue-100 to-green-100 text-gray-800 rounded-full text-sm font-medium mb-6"
          >
            <BarChart3 className="w-4 h-4 mr-2 text-blue-600" />
            Résultats mesurables garantis
          </motion.div>

          <h2 className="text-2xl sm:text-3xl lg:text-4xl xl:text-5xl font-bold text-gray-900 mb-4 sm:mb-6 leading-tight">
            Votre référencement{' '}
            <span className="bg-gradient-to-r from-blue-600 to-green-600 bg-clip-text text-transparent">
              nouvelle génération
            </span>
          </h2>
          
          <p className="text-base sm:text-lg lg:text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed px-4">
            Notre Intelligence Artificielle optimise votre visibilité sur Google ET ChatGPT. 
            Soyez trouvé partout où vos clients vous cherchent.
          </p>
        </motion.div>

        {/* Métriques animées */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 mb-12 sm:mb-16">
          {metrics.map((metric, index) => {
            const colors = getColorClasses(metric.color);
            const progressValue = metric.unit === 'x' 
              ? ((metric.value - 1) / 3.2) * 100 
              : metric.value;

            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ delay: 0.4 + index * 0.2, duration: 0.6 }}
                className={`relative bg-white rounded-2xl p-6 sm:p-8 shadow-lg hover:shadow-xl transition-all duration-300 border ${colors.border} group`}
              >
                {/* Icône */}
                <div className={`inline-flex items-center justify-center w-12 h-12 ${colors.bg} ${colors.text} rounded-xl mb-4 group-hover:scale-110 transition-transform duration-300`}>
                  {metric.icon}
                </div>

                {/* Valeur animée */}
                <div className="mb-4">
                  <div className="flex items-baseline">
                    <motion.span
                      className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900"
                      key={metric.value}
                      initial={{ scale: 1.2, opacity: 0.8 }}
                      animate={{ scale: 1, opacity: 1 }}
                      transition={{ duration: 0.3 }}
                    >
                      {metric.unit === 'x' ? metric.value.toFixed(1) : metric.value}
                    </motion.span>
                    <span className={`text-lg sm:text-xl font-semibold ml-1 ${colors.text}`}>
                      {metric.unit}
                    </span>
                  </div>
                  <p className="text-sm sm:text-base font-medium text-gray-900 mt-1">
                    {metric.label}
                  </p>
                  <p className="text-xs sm:text-sm text-gray-500 mt-1">
                    {metric.description}
                  </p>
                </div>

                {/* Barre de progression */}
                <div className="relative">
                  <div className="w-full bg-gray-200 rounded-full h-2 overflow-hidden">
                    <motion.div
                      className={`h-full ${colors.progress} rounded-full`}
                      initial={{ width: 0 }}
                      animate={isInView ? { width: `${progressValue}%` } : {}}
                      transition={{ delay: 0.6 + index * 0.2, duration: 2, ease: "easeOut" }}
                    />
                  </div>
                  <div className="flex justify-between text-xs text-gray-400 mt-2">
                    <span>Avant</span>
                    <span>Après WebFitYou</span>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Section explicative */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 1, duration: 0.8 }}
          className="max-w-4xl mx-auto"
        >
          <div className="bg-white rounded-2xl p-6 sm:p-8 lg:p-12 shadow-lg border border-gray-100">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center">
              <div>
                <h3 className="text-xl sm:text-2xl lg:text-3xl font-bold text-gray-900 mb-4 sm:mb-6">
                  L'avenir du référencement est{' '}
                  <span className="bg-gradient-to-r from-blue-600 to-green-600 bg-clip-text text-transparent">
                    déjà là
                  </span>
                </h3>
                <div className="space-y-4 text-sm sm:text-base text-gray-600">
                  <p>
                    <strong className="text-gray-900">Google reste essentiel</strong>, mais vos clients 
                    utilisent de plus en plus ChatGPT pour leurs recherches. Notre IA optimise 
                    votre contenu pour les deux plateformes simultanément.
                  </p>
                  <p>
                    <strong className="text-gray-900">Résultat :</strong> Vous captez le trafic traditionnel 
                    ET le nouveau trafic généré par l'IA. Une longueur d\'avance sur vos concurrents.
                  </p>
                </div>
              </div>

              <div className="relative">
                {/* Graphique simplifié */}
                <div className="bg-gradient-to-br from-blue-50 to-green-50 rounded-xl p-6 sm:p-8">
                  <div className="space-y-4">
                    {/* Google */}
                    <div className="flex items-center justify-between">
                      <div className="flex items-center">
                        <div className="w-8 h-8 bg-blue-500 rounded-lg flex items-center justify-center mr-3">
                          <Search className="w-4 h-4 text-white" />
                        </div>
                        <span className="font-medium text-gray-900">Google</span>
                      </div>
                      <div className="flex items-center">
                        <div className="w-20 sm:w-24 bg-gray-200 rounded-full h-2 mr-3">
                          <motion.div
                            className="bg-blue-500 h-2 rounded-full"
                            initial={{ width: "20%" }}
                            animate={isInView ? { width: "95%" } : {}}
                            transition={{ delay: 1.2, duration: 2 }}
                          />
                        </div>
                        <span className="text-sm font-bold text-blue-600">+{googleRanking}%</span>
                      </div>
                    </div>

                    {/* ChatGPT */}
                    <div className="flex items-center justify-between">
                      <div className="flex items-center">
                        <div className="w-8 h-8 bg-green-500 rounded-lg flex items-center justify-center mr-3">
                          <MessageSquare className="w-4 h-4 text-white" />
                        </div>
                        <span className="font-medium text-gray-900">ChatGPT</span>
                      </div>
                      <div className="flex items-center">
                        <div className="w-20 sm:w-24 bg-gray-200 rounded-full h-2 mr-3">
                          <motion.div
                            className="bg-green-500 h-2 rounded-full"
                            initial={{ width: "0%" }}
                            animate={isInView ? { width: "88%" } : {}}
                            transition={{ delay: 1.4, duration: 2 }}
                          />
                        </div>
                        <span className="text-sm font-bold text-green-600">+{chatgptVisibility}%</span>
                      </div>
                    </div>

                    {/* Trafic total */}
                    <div className="pt-4 border-t border-gray-200">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center">
                          <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-green-500 rounded-lg flex items-center justify-center mr-3">
                            <TrendingUp className="w-4 h-4 text-white" />
                          </div>
                          <span className="font-bold text-gray-900">Trafic Total</span>
                        </div>
                        <motion.div
                          className="text-xl sm:text-2xl font-bold bg-gradient-to-r from-blue-600 to-green-600 bg-clip-text text-transparent"
                          key={trafficMultiplier}
                          initial={{ scale: 1.2 }}
                          animate={{ scale: 1 }}
                          transition={{ duration: 0.3 }}
                        >
                          {trafficMultiplier.toFixed(1)}x
                        </motion.div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Badge flottant */}
                <motion.div
                  initial={{ opacity: 0, scale: 0.8, y: 20 }}
                  animate={isInView ? { opacity: 1, scale: 1, y: 0 } : {}}
                  transition={{ delay: 2, duration: 0.6 }}
                  className="absolute -top-4 -right-4 bg-gradient-to-r from-orange-400 to-red-400 text-white px-3 py-2 rounded-full text-xs font-bold shadow-lg"
                >
                  🚀 Nouveau !
                </motion.div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default SEOGrowthAnimation;