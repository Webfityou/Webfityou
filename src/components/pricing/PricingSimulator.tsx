import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { motion, AnimatePresence } from 'framer-motion';
import { Calculator, ArrowRight, User, Mail, Phone, CheckCircle } from 'lucide-react';
import { useSimulateurTarif, SimulationTarifData } from '../../hooks/usePricingSimulator';

interface DonneesSimulateur {
  projectType: string;
  pages: number;
  features: string[];
  timeline: string;
  support: string;
  first_name: string;
  last_name: string;
  email: string;
  phone: string;
}

const SimulateurTarif: React.FC = () => {
  const [currentStep, setCurrentStep] = useState(0);
  const { t } = useTranslation();
  const { soumettreSimulation, loading } = useSimulateurTarif();
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [donnees, setDonnees] = useState<DonneesSimulateur>({
    projectType: '',
    pages: 5,
    features: [],
    timeline: '',
    support: '',
    first_name: '',
    last_name: '',
    email: '',
    phone: ''
  });

  const steps = [
    {
      title: t('pricing.simulator.steps.projectType.title'),
      question: t('pricing.simulator.steps.projectType.question'),
      options: [
        { value: 'vitrine', label: t('pricing.simulator.steps.projectType.options.vitrine'), price: 0 },
        { value: 'ecommerce', label: t('pricing.simulator.steps.projectType.options.ecommerce'), price: 200 },
        { value: 'blog', label: t('pricing.simulator.steps.projectType.options.blog'), price: 100 },
        { value: 'plateforme', label: t('pricing.simulator.steps.projectType.options.plateforme'), price: 500 }
      ]
    },
    {
      title: t('pricing.simulator.steps.pages.title'),
      question: t('pricing.simulator.steps.pages.question'),
      type: 'slider',
      min: 1,
      max: 50,
      step: 1,
      pricePerUnit: 20
    },
    {
      title: t('pricing.simulator.steps.features.title'),
      question: t('pricing.simulator.steps.features.question'),
      options: [
        { value: 'seo', label: t('pricing.simulator.steps.features.options.seo'), price: 50 },
        { value: 'blog', label: t('pricing.simulator.steps.features.options.blog'), price: 100 },
        { value: 'ecommerce', label: t('pricing.simulator.steps.features.options.ecommerce'), price: 200 },
        { value: 'booking', label: t('pricing.simulator.steps.features.options.booking'), price: 150 },
        { value: 'crm', label: t('pricing.simulator.steps.features.options.crm'), price: 200 },
        { value: 'analytics', label: t('pricing.simulator.steps.features.options.analytics'), price: 75 }
      ],
      multiple: true
    },
    {
      title: t('pricing.simulator.steps.timeline.title'),
      question: t('pricing.simulator.steps.timeline.question'),
      options: [
        { value: 'express', label: t('pricing.simulator.steps.timeline.options.express'), price: 500 },
        { value: 'standard', label: t('pricing.simulator.steps.timeline.options.standard'), price: 0 },
        { value: 'confort', label: t('pricing.simulator.steps.timeline.options.confort'), price: -200 }
      ]
    },
    {
      title: t('pricing.simulator.steps.support.title'),
      question: t('pricing.simulator.steps.support.question'),
      options: [
        { value: 'email', label: t('pricing.simulator.steps.support.options.email'), price: 0 },
        { value: 'priority', label: t('pricing.simulator.steps.support.options.priority'), price: 100 },
        { value: 'dedicated', label: t('pricing.simulator.steps.support.options.dedicated'), price: 300 }
      ]
    },
    {
      title: "Vos coordonnées",
      question: "Pour recevoir votre devis personnalisé, nous avons besoin de vos coordonnées",
      type: 'contact',
      key: 'contact'
    }
  ];

  const calculatePrice = () => {
    let basePrice = 500; // Prix de base
    
    // Type de projet
    const projectOption = steps[0].options?.find(opt => opt.value === donnees.projectType);
    if (projectOption) basePrice += projectOption.price;
    
    // Nombre de pages (au-delà de 5 pages de base)
    if (donnees.pages > 5) {
      basePrice += (donnees.pages - 5) * 20;
    }
    
    // Fonctionnalités
    donnees.features.forEach(feature => {
      const featureOption = steps[2].options?.find(opt => opt.value === feature);
      if (featureOption) basePrice += featureOption.price;
    });
    
    // Timeline
    const timelineOption = steps[3].options?.find(opt => opt.value === donnees.timeline);
    if (timelineOption) basePrice += timelineOption.price;
    
    // Support
    const supportOption = steps[4].options?.find(opt => opt.value === donnees.support);
    if (supportOption) basePrice += supportOption.price;
    
    return Math.max(basePrice, 300); // Prix minimum
  };

  const handleNext = async () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep(currentStep + 1);
    } else {
      // Soumettre la simulation
      const donneesSimulation: SimulationTarifData = {
        project_type: donnees.projectType,
        pages: donnees.pages,
        features: donnees.features,
        timeline: donnees.timeline,
        support: donnees.support,
        estimated_price: calculatePrice(),
        first_name: donnees.first_name,
        last_name: donnees.last_name,
        email: donnees.email,
        phone: donnees.phone
      };
      
      const success = await soumettreSimulation(donneesSimulation);
      if (success) {
        setIsSubmitted(true);
      }
    }
  };

  const handlePrevious = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  const mettreAJourDonnees = (key: keyof DonneesSimulateur, value: any) => {
    setDonnees(prev => ({ ...prev, [key]: value }));
  };

  const canProceed = () => {
    if (currentStep === 0) return donnees.projectType !== '';
    if (currentStep === 1) return donnees.pages > 0;
    if (currentStep === 2) return true; // Features are optional
    if (currentStep === 3) return donnees.timeline !== '';
    if (currentStep === 4) return donnees.support !== '';
    if (currentStep === 5) return donnees.first_name && donnees.last_name && donnees.email;
    return false;
  };
  
  const renderStep = () => {
    const step = steps[currentStep];
    
    if (step.type === 'contact') {
      return (
        <div className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="relative">
              <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="text"
                value={donnees.first_name}
                onChange={(e) => mettreAJourDonnees('first_name', e.target.value)}
                placeholder="Prénom"
                className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
              />
            </div>
            <div className="relative">
              <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="text"
                value={donnees.last_name}
                onChange={(e) => mettreAJourDonnees('last_name', e.target.value)}
                placeholder="Nom"
                className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
              />
            </div>
          </div>
          <div className="relative">
            <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <input
              type="email"
              value={donnees.email}
              onChange={(e) => mettreAJourDonnees('email', e.target.value)}
              placeholder="Adresse email"
              className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
            />
          </div>
          <div className="relative">
            <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <input
              type="tel"
              value={donnees.phone}
              onChange={(e) => mettreAJourDonnees('phone', e.target.value)}
              placeholder="Numéro de téléphone (optionnel)"
              className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
            />
          </div>
        </div>
      );
    }

    if (step.type === 'slider') {
      return (
        <div className="space-y-6">
          <div className="text-center">
            <span className="text-4xl font-bold text-blue-600">{donnees.pages}</span>
            <span className="text-gray-600 ml-2">{t('pricing.simulator.steps.pages.unit')}</span>
          </div>
          <div className="text-center text-sm text-gray-500 mb-4">
            Si vous ne savez pas, mettez 5 pages
          </div>
          <input
            type="range"
            min={step.min}
            max={step.max}
            step={step.step}
            value={donnees.pages}
            onChange={(e) => mettreAJourDonnees('pages', parseInt(e.target.value))}
            className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer slider"
          />
          <div className="flex justify-between text-sm text-gray-500">
            <span>{step.min} page</span>
            <span>{step.max} pages</span>
          </div>
        </div>
      );
    }

    const isMultiple = step.multiple;
    const currentValue = isMultiple ? donnees.features : 
      currentStep === 0 ? donnees.projectType :
      currentStep === 3 ? donnees.timeline : donnees.support;

    return (
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {step.options?.map((option) => {
          const isSelected = isMultiple 
            ? (currentValue as string[]).includes(option.value)
            : currentValue === option.value;

          return (
            <button
              key={option.value}
              onClick={() => {
                if (isMultiple) {
                  const current = currentValue as string[];
                  const updated = isSelected
                    ? current.filter(v => v !== option.value)
                    : [...current, option.value];
                  mettreAJourDonnees('features', updated);
                } else {
                  const key = currentStep === 0 ? 'projectType' :
                    currentStep === 3 ? 'timeline' : 'support';
                  mettreAJourDonnees(key, option.value);
                }
              }}
              className={`p-4 text-left border-2 rounded-xl transition-all ${
                isSelected
                  ? 'border-blue-500 bg-blue-50 text-blue-700'
                  : 'border-gray-200 hover:border-gray-300'
              }`}
            >
              <div className="flex justify-between items-start">
                <div>
                  <div className="font-medium">{option.label}</div>
                  {option.price !== 0 && (
                    <div className={`text-sm ${
                      option.price > 0 ? 'text-green-600' : 'text-red-600'
                    }`}>
                      {option.price > 0 ? '+' : ''}{option.price}€
                    </div>
                  )}
                </div>
                {isSelected && (
                  <div className="w-5 h-5 bg-blue-500 rounded-full flex items-center justify-center">
                    <div className="w-2 h-2 bg-white rounded-full"></div>
                  </div>
                )}
              </div>
            </button>
          );
        })}
      </div>
    );
  };

  const currentPrice = calculatePrice();

  if (isSubmitted) {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        className="max-w-2xl mx-auto bg-white rounded-2xl shadow-lg p-8 text-center"
      >
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
          className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6"
        >
          <CheckCircle className="w-10 h-10 text-green-600" />
        </motion.div>
        
        <motion.h3
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="text-3xl font-bold text-gray-900 mb-4"
        >
          Merci !
        </motion.h3>
        
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="text-2xl font-bold text-blue-600 mb-4"
        >
          Devis estimé : {currentPrice}€
        </motion.div>
        
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="text-lg text-gray-600 mb-6"
        >
          Votre devis personnalisé sera envoyé dans les 24 heures.
        </motion.p>
        
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="flex items-center justify-center text-sm text-gray-500"
        >
          <div className="w-2 h-2 bg-green-400 rounded-full mr-2 animate-pulse"></div>
          Nous vous contacterons très bientôt
        </motion.div>
      </motion.div>
    );
  }
  return (
    <div className="max-w-3xl mx-auto bg-white rounded-2xl shadow-lg overflow-hidden">
      {/* Progress */}
      <div className="bg-gray-50 px-8 py-4">
        <div className="flex justify-between items-center mb-2">
          <span className="text-sm font-medium text-gray-600">
            {t('common.step')} {currentStep + 1} {t('common.of')} {steps.length}
          </span>
          <div className="text-2xl font-bold text-blue-600">
            {currentPrice}€
          </div>
        </div>
        <div className="w-full bg-gray-200 rounded-full h-2">
          <motion.div
            className="bg-blue-600 h-2 rounded-full"
            animate={{ width: `${((currentStep + 1) / steps.length) * 100}%` }}
            transition={{ duration: 0.3 }}
          />
        </div>
      </div>

      {/* Content */}
      <div className="p-8">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentStep}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.3 }}
          >
            <h3 className="text-2xl font-bold text-gray-900 mb-2">
              {steps[currentStep].title}
            </h3>
            <p className="text-gray-600 mb-8">
              {steps[currentStep].question}
            </p>

            {renderStep()}
          </motion.div>
        </AnimatePresence>

        {/* Navigation */}
        <div className="flex justify-between items-center mt-8 pt-8 border-t border-gray-200">
          <button
            onClick={handlePrevious}
            disabled={currentStep === 0}
            className="px-6 py-3 border border-gray-300 rounded-xl text-gray-700 font-medium hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
          >
            {t('pricing.simulator.previous')}
          </button>

          {currentStep < steps.length - 1 ? (
            <button
              onClick={handleNext}
              disabled={!canProceed() || loading}
              className="px-6 py-3 bg-blue-600 text-white rounded-xl font-medium hover:bg-blue-700 transition-colors flex items-center group disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? (
                <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
              ) : (
                <>
                  {t('pricing.simulator.next')}
                  <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
                </>
              )}
            </button>
          ) : (
            <button
              onClick={handleNext}
              disabled={!canProceed() || loading}
              className="px-6 py-3 bg-green-600 text-white rounded-xl font-medium hover:bg-green-700 transition-colors flex items-center group disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? (
                <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
              ) : (
                <>
                  {t('pricing.simulator.getQuote')}
                  <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
                </>
              )}
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default SimulateurTarif;
