import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { motion, AnimatePresence } from 'framer-motion';
import { CheckCircle, ArrowRight, User, Mail, Phone } from 'lucide-react';
import { useDemandeAudit, DemandeAuditData } from '../../hooks/useAudit';

const FormulaireAuditMini: React.FC = () => {
  const { t } = useTranslation();
  const { soumettreDemandeAudit, loading } = useDemandeAudit();
  const [currentStep, setCurrentStep] = useState(0);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [donneesFormulaire, setDonneesFormulaire] = useState<DemandeAuditData>({
    website: '',
    business_sector: '',
    goals: [],
    budget: '',
    first_name: '',
    last_name: '',
    email: '',
    phone: ''
  });

  const steps = [
    {
      title: t('audit.steps.website.title'),
      question: t('audit.steps.website.question'),
      type: "input",
      key: "website",
      placeholder: t('audit.steps.website.placeholder'),
      optional: false
    },
    {
      title: t('audit.steps.business.title'),
      question: t('audit.steps.business.question'),
      type: "select",
      key: "business_sector",
      options: [
        { value: 'ecommerce', label: t('audit.steps.business.options.ecommerce') },
        { value: 'services', label: t('audit.steps.business.options.services') },
        { value: 'restaurant', label: t('audit.steps.business.options.restaurant') },
        { value: 'health', label: t('audit.steps.business.options.health') },
        { value: 'realestate', label: t('audit.steps.business.options.realestate') },
        { value: 'craft', label: t('audit.steps.business.options.craft') },
        { value: 'coaching', label: t('audit.steps.business.options.coaching') },
        { value: 'other', label: t('audit.steps.business.options.other') }
      ]
    },
    {
      title: t('audit.steps.goals.title'),
      question: t('audit.steps.goals.question'),
      type: "checkbox",
      key: "goals",
      options: [
        { value: 'visibility', label: t('audit.steps.goals.options.visibility') },
        { value: 'leads', label: t('audit.steps.goals.options.leads') },
        { value: 'sales', label: t('audit.steps.goals.options.sales') },
        { value: 'image', label: t('audit.steps.goals.options.image') },
        { value: 'automation', label: t('audit.steps.goals.options.automation') }
      ]
    },
    {
      title: t('audit.steps.budget.title'),
      question: t('audit.steps.budget.question'),
      type: "select",
      key: "budget",
      options: [
        { value: 'low', label: t('audit.steps.budget.options.low') },
        { value: 'medium', label: t('audit.steps.budget.options.medium') },
        { value: 'high', label: t('audit.steps.budget.options.high') },
        { value: 'premium', label: t('audit.steps.budget.options.premium') },
        { value: 'enterprise', label: t('audit.steps.budget.options.enterprise') }
      ]
    },
    {
      title: "Vos coordonnées",
      question: "Pour recevoir votre audit personnalisé, nous avons besoin de vos coordonnées",
      type: "contact",
      key: "contact"
    }
  ];

  const handleInputChange = (key: string, value: string | string[]) => {
    setDonneesFormulaire(prev => ({ ...prev, [key]: value }));
  };

  const handleNext = async () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep(currentStep + 1);
    } else {
      // Soumettre le formulaire
      const success = await soumettreDemandeAudit(donneesFormulaire);
      if (success) {
        setIsSubmitted(true);
      }
    }
  };

  const canProceed = () => {
    const step = steps[currentStep];
    
    if (step.key === 'website') return donneesFormulaire.website.trim() !== ''; // Champ obligatoire
    if (step.key === 'contact') {
      return donneesFormulaire.first_name && donneesFormulaire.last_name && donneesFormulaire.email;
    }
    
    const value = donneesFormulaire[step.key as keyof DemandeAuditData];
    
    if (step.type === 'checkbox') return Array.isArray(value) && value.length > 0;
    return value !== '';
  };

  const renderStep = () => {
    const step = steps[currentStep];

    if (step.type === 'contact') {
      return (
        <div className="space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="relative">
              <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="text"
                value={donneesFormulaire.first_name}
                onChange={(e) => handleInputChange('first_name', e.target.value)}
                placeholder="Prénom"
                className="w-full pl-10 pr-4 py-3 sm:py-4 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none text-base"
              />
            </div>
            <div className="relative">
              <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="text"
                value={donneesFormulaire.last_name}
                onChange={(e) => handleInputChange('last_name', e.target.value)}
                placeholder="Nom"
                className="w-full pl-10 pr-4 py-3 sm:py-4 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none text-base"
              />
            </div>
          </div>
          <div className="relative">
            <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <input
              type="email"
              value={donneesFormulaire.email}
              onChange={(e) => handleInputChange('email', e.target.value)}
              placeholder="Adresse email"
              className="w-full pl-10 pr-4 py-3 sm:py-4 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none text-base"
            />
          </div>
          <div className="relative">
            <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <input
              type="tel"
              value={donneesFormulaire.phone}
              onChange={(e) => handleInputChange('phone', e.target.value)}
              placeholder="Numéro de téléphone (optionnel)"
              className="w-full pl-10 pr-4 py-3 sm:py-4 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none text-base"
            />
          </div>
        </div>
      );
    }

    const value = donneesFormulaire[step.key as keyof DemandeAuditData];

    switch (step.type) {
      case 'input':
        return (
          <input
            type="text"
            value={value as string}
            onChange={(e) => handleInputChange(step.key, e.target.value)}
            placeholder={step.placeholder}
            className="w-full p-3 sm:p-4 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none text-base sm:text-lg"
          />
        );

      case 'select':
        return (
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {step.options?.map((option) => (
              <button
                key={option.value}
                onClick={() => handleInputChange(step.key, option.value)}
                className={`p-3 sm:p-4 text-left border-2 rounded-xl transition-all duration-200 text-sm sm:text-base hover:shadow-md ${
                  value === option.value
                    ? 'border-blue-500 bg-blue-50 text-blue-700 shadow-md'
                    : 'border-gray-200 hover:border-gray-300'
                }`}
              >
                {option.label}
              </button>
            ))}
          </div>
        );

      case 'checkbox':
        return (
          <div className="grid grid-cols-1 gap-3">
            {step.options?.map((option) => (
              <button
                key={option.value}
                onClick={() => {
                  const currentGoals = value as string[] || [];
                  const newGoals = currentGoals.includes(option.value)
                    ? currentGoals.filter(goal => goal !== option.value)
                    : [...currentGoals, option.value];
                  handleInputChange(step.key, newGoals);
                }}
                className={`p-3 sm:p-4 text-left border-2 rounded-xl transition-all duration-200 flex items-center text-sm sm:text-base hover:shadow-md ${
                  (value as string[])?.includes(option.value)
                    ? 'border-blue-500 bg-blue-50 text-blue-700 shadow-md'
                    : 'border-gray-200 hover:border-gray-300'
                }`}
              >
                <CheckCircle className={`w-5 h-5 mr-3 transition-colors ${
                  (value as string[])?.includes(option.value) ? 'text-blue-500' : 'text-gray-300'
                }`} />
                {option.label}
              </button>
            ))}
          </div>
        );

      default:
        return null;
    }
  };

  if (isSubmitted) {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        className="max-w-2xl mx-auto bg-white rounded-2xl shadow-lg p-8 mx-4 text-center"
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
          className="text-2xl sm:text-3xl font-bold text-gray-900 mb-4"
        >
          Merci !
        </motion.h3>
        
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="text-lg text-gray-600 mb-6"
        >
          {t('audit.thanks')}
        </motion.p>
        
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="flex items-center justify-center text-sm text-gray-500"
        >
          <div className="w-2 h-2 bg-green-400 rounded-full mr-2 animate-pulse"></div>
          Nous vous contacterons très bientôt
        </motion.div>
      </motion.div>
    );
  }

  return (
    <div className="max-w-2xl mx-auto bg-white rounded-2xl shadow-lg overflow-hidden mx-4">
      {/* Progress Bar */}
      <div className="bg-gray-50 px-6 sm:px-8 py-4 sm:py-6">
        <div className="flex justify-between items-center mb-3">
          <span className="text-sm font-medium text-gray-600">
            Étape {currentStep + 1} sur {steps.length}
          </span>
          <span className="text-sm text-gray-600">
            {Math.round(((currentStep + 1) / steps.length) * 100)}%
          </span>
        </div>
        <div className="w-full bg-gray-200 rounded-full h-2">
          <motion.div
            className="bg-gradient-to-r from-blue-600 to-teal-600 h-2 rounded-full"
            initial={{ width: 0 }}
            animate={{ width: `${((currentStep + 1) / steps.length) * 100}%` }}
            transition={{ duration: 0.5, ease: "easeOut" }}
          />
        </div>
      </div>

      {/* Step Content */}
      <div className="p-6 sm:p-8">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentStep}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.3 }}
          >
            <h3 className="text-xl sm:text-2xl font-bold text-gray-900 mb-3">
              {steps[currentStep].title}
            </h3>
            <p className="text-sm sm:text-base text-gray-600 mb-6 sm:mb-8">
              {steps[currentStep].question}
            </p>

            {renderStep()}

            <motion.button
              onClick={handleNext}
              disabled={!canProceed() || loading}
              className="w-full mt-6 sm:mt-8 bg-gradient-to-r from-blue-600 to-teal-600 text-white py-3 sm:py-4 rounded-xl font-semibold hover:from-blue-700 hover:to-teal-700 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center group shadow-lg hover:shadow-xl transform hover:scale-[1.02]"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              {loading ? (
                <div className="w-6 h-6 border-2 border-white border-t-transparent rounded-full animate-spin" />
              ) : (
                <>
                  {currentStep === steps.length - 1 ? t('audit.getAudit') : t('audit.continue')}
                  <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
                </>
              )}
            </motion.button>
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
};
