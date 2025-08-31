import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Cookie, Shield, Settings, X, Check } from 'lucide-react';
import { useTranslation } from 'react-i18next';

const CookieBanner: React.FC = () => {
  const { t } = useTranslation();
  const [isVisible, setIsVisible] = useState(false);
  const [showSettings, setShowSettings] = useState(false);
  const [preferences, setPreferences] = useState({
    necessary: true, // Toujours activé
    analytics: false,
    marketing: false,
    functional: false
  });

  useEffect(() => {
    // Vérifier si l'utilisateur a déjà donné son consentement
    const cookieConsent = localStorage.getItem('webfityou-cookie-consent');
    if (!cookieConsent) {
      // Délai pour l'animation d'entrée
      setTimeout(() => setIsVisible(true), 1000);
    }
  }, []);

  const handleAcceptAll = () => {
    const allPreferences = {
      necessary: true,
      analytics: true,
      marketing: true,
      functional: true
    };
    
    localStorage.setItem('webfityou-cookie-consent', JSON.stringify({
      preferences: allPreferences,
      timestamp: new Date().toISOString()
    }));
    
    setIsVisible(false);
  };

  const handleAcceptSelected = () => {
    localStorage.setItem('webfityou-cookie-consent', JSON.stringify({
      preferences,
      timestamp: new Date().toISOString()
    }));
    
    setIsVisible(false);
  };

  const handleReject = () => {
    const minimalPreferences = {
      necessary: true,
      analytics: false,
      marketing: false,
      functional: false
    };
    
    localStorage.setItem('webfityou-cookie-consent', JSON.stringify({
      preferences: minimalPreferences,
      timestamp: new Date().toISOString()
    }));
    
    setIsVisible(false);
  };

  const togglePreference = (key: keyof typeof preferences) => {
    if (key === 'necessary') return; // Ne peut pas être désactivé
    setPreferences(prev => ({ ...prev, [key]: !prev[key] }));
  };

  return (
    <AnimatePresence>
      {isVisible && (
        <>
          {/* Overlay */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/20 backdrop-blur-sm z-40"
          />

          {/* Cookie Banner */}
          <motion.div
            initial={{ opacity: 0, y: 100, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 100, scale: 0.95 }}
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
            className="fixed bottom-6 left-6 right-6 md:left-auto md:right-6 md:max-w-md z-50"
          >
            <div className="bg-white/95 backdrop-blur-xl rounded-2xl shadow-2xl border border-white/20 overflow-hidden">
              {/* Header avec gradient futuriste */}
              <div className="bg-gradient-to-r from-blue-600 via-cyan-500 to-teal-600 p-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 bg-white/20 rounded-xl flex items-center justify-center">
                      <Cookie className="w-5 h-5 text-white" />
                    </div>
                    <div>
                      <h3 className="text-white font-bold text-lg">Cookies & Confidentialité</h3>
                      <p className="text-blue-100 text-xs">Optimisé par WebFitYou</p>
                    </div>
                  </div>
                  <button
                    onClick={() => setIsVisible(false)}
                    className="w-8 h-8 bg-white/20 rounded-lg flex items-center justify-center text-white hover:bg-white/30 transition-colors"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </div>
              </div>

              {/* Content */}
              <div className="p-6">
                {!showSettings ? (
                  <>
                    <p className="text-gray-700 text-sm mb-6 leading-relaxed">
                      Nous utilisons des cookies pour améliorer votre expérience et analyser notre trafic. 
                      Acceptez-vous nos cookies pour une expérience optimale ?
                    </p>

                    {/* Actions principales */}
                    <div className="space-y-3">
                      <button
                        onClick={handleAcceptAll}
                        className="w-full bg-gradient-to-r from-blue-600 to-teal-600 text-white py-3 rounded-xl font-semibold hover:from-blue-700 hover:to-teal-700 transition-all duration-300 flex items-center justify-center group shadow-lg"
                      >
                        <Check className="w-4 h-4 mr-2" />
                        Accepter tous les cookies
                      </button>
                      
                      <div className="flex space-x-2">
                        <button
                          onClick={() => setShowSettings(true)}
                          className="flex-1 bg-gray-100 text-gray-700 py-2.5 rounded-lg font-medium hover:bg-gray-200 transition-colors flex items-center justify-center text-sm"
                        >
                          <Settings className="w-4 h-4 mr-2" />
                          Personnaliser
                        </button>
                        
                        <button
                          onClick={handleReject}
                          className="flex-1 bg-gray-100 text-gray-700 py-2.5 rounded-lg font-medium hover:bg-gray-200 transition-colors text-sm"
                        >
                          Refuser
                        </button>
                      </div>
                    </div>
                  </>
                ) : (
                  <>
                    {/* Paramètres détaillés */}
                    <div className="space-y-4 mb-6">
                      <div className="flex items-center justify-between p-3 bg-gray-50 rounded-xl">
                        <div className="flex items-center space-x-3">
                          <Shield className="w-5 h-5 text-green-600" />
                          <div>
                            <div className="font-medium text-gray-900 text-sm">Cookies nécessaires</div>
                            <div className="text-xs text-gray-500">Fonctionnement du site</div>
                          </div>
                        </div>
                        <div className="w-10 h-6 bg-green-500 rounded-full flex items-center justify-end px-1">
                          <div className="w-4 h-4 bg-white rounded-full"></div>
                        </div>
                      </div>

                      {[
                        { key: 'analytics', label: 'Analytics', desc: 'Mesure d\'audience', icon: '📊' },
                        { key: 'marketing', label: 'Marketing', desc: 'Publicités ciblées', icon: '🎯' },
                        { key: 'functional', label: 'Fonctionnels', desc: 'Fonctionnalités avancées', icon: '⚡' }
                      ].map(({ key, label, desc, icon }) => (
                        <div key={key} className="flex items-center justify-between p-3 bg-gray-50 rounded-xl">
                          <div className="flex items-center space-x-3">
                            <span className="text-lg">{icon}</span>
                            <div>
                              <div className="font-medium text-gray-900 text-sm">{label}</div>
                              <div className="text-xs text-gray-500">{desc}</div>
                            </div>
                          </div>
                          <button
                            onClick={() => togglePreference(key as keyof typeof preferences)}
                            className={`w-10 h-6 rounded-full flex items-center transition-colors ${
                              preferences[key as keyof typeof preferences]
                                ? 'bg-blue-500 justify-end'
                                : 'bg-gray-300 justify-start'
                            }`}
                          >
                            <div className="w-4 h-4 bg-white rounded-full mx-1 transition-transform"></div>
                          </button>
                        </div>
                      ))}
                    </div>

                    {/* Actions paramètres */}
                    <div className="flex space-x-2">
                      <button
                        onClick={() => setShowSettings(false)}
                        className="flex-1 bg-gray-100 text-gray-700 py-2.5 rounded-lg font-medium hover:bg-gray-200 transition-colors text-sm"
                      >
                        Retour
                      </button>
                      <button
                        onClick={handleAcceptSelected}
                        className="flex-1 bg-gradient-to-r from-blue-600 to-teal-600 text-white py-2.5 rounded-lg font-medium hover:from-blue-700 hover:to-teal-700 transition-all text-sm"
                      >
                        Confirmer
                      </button>
                    </div>
                  </>
                )}
              </div>

              {/* Footer avec logo WebFitYou */}
              <div className="bg-gray-50 px-6 py-3 border-t border-gray-100">
                <div className="flex items-center justify-center space-x-2">
                  <img 
                    src="https://ptzpnswtgevfxfeosjfj.supabase.co/storage/v1/object/public/Images/Logo-rond-webfityou-seo-ia-optimisation-siteweb-2.png"
                    alt="WebFitYou"
                    className="w-5 h-5 rounded"
                  />
                  <span className="text-xs text-gray-600 font-medium">WebFitYou - Respect de votre vie privée</span>
                </div>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

export default CookieBanner;