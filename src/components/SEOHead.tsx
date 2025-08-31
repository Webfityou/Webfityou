import React from 'react';
import { Helmet } from 'react-helmet-async';
import { useLocation } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

interface SEOHeadProps {
  title?: string;
  description?: string;
  image?: string;
  type?: string;
  noindex?: boolean;
}

const SEOHead: React.FC<SEOHeadProps> = ({
  title,
  description,
  image,
  type = 'website',
  noindex = false
}) => {
  const location = useLocation();
  const { i18n } = useTranslation();
  const currentUrl = `https://webfityou.com${location.pathname}`;
  
  const defaultTitle = "WebFitYou - Agence Digitale Nouvelle Génération | Sites Web + SEO Automatisé par IA";
  const defaultDescription = "Créez votre site web professionnel en 7 jours avec WebFitYou. SEO automatisé par GPT-5, design responsive et accompagnement personnalisé. Devis gratuit en 24h.";
  const defaultImage = "https://ptzpnswtgevfxfeosjfj.supabase.co/storage/v1/object/public/Images/Logo-rond-webfityou-seo-ia-optimisation-siteweb-2.png";

  const finalTitle = title || defaultTitle;
  const finalDescription = description || defaultDescription;
  const finalImage = image || defaultImage;

  // Données structurées pour l'organisation
  const organizationSchema = {
    "@context": "https://schema.org",
    "@type": "Organization",
    "name": "WebFitYou",
    "alternateName": "WebFitYou Agence Digitale",
    "url": "https://webfityou.com",
    "logo": "https://ptzpnswtgevfxfeosjfj.supabase.co/storage/v1/object/public/Images/Logo-rond-webfityou-seo-ia-optimisation-siteweb-2.png",
    "description": "Agence digitale nouvelle génération spécialisée dans la création de sites web et le SEO automatisé par intelligence artificielle",
    "foundingDate": "2022",
    "contactPoint": {
      "@type": "ContactPoint",
      "telephone": "+33-6-38-22-98-04",
      "contactType": "customer service",
      "email": "webfityou@gmail.com",
      "availableLanguage": ["French", "English"]
    },
    "address": {
      "@type": "PostalAddress",
      "addressLocality": "Paris",
      "addressCountry": "FR",
      "postalCode": "75001"
    },
    "sameAs": [
      "https://www.linkedin.com/company/webfityou",
      "https://twitter.com/webfityou",
      "https://www.facebook.com/webfityou"
    ],
    "areaServed": {
      "@type": "Country",
      "name": "France"
    },
    "serviceType": [
      "Création de sites web",
      "SEO automatisé par IA",
      "Marketing digital",
      "Identité visuelle",
      "Accompagnement digital"
    ]
  };

  // Données structurées pour le site web
  const websiteSchema = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "name": "WebFitYou",
    "url": "https://webfityou.com",
    "description": finalDescription,
    "publisher": {
      "@type": "Organization",
      "name": "WebFitYou"
    },
    "potentialAction": {
      "@type": "SearchAction",
      "target": "https://webfityou.com/blog?search={search_term_string}",
      "query-input": "required name=search_term_string"
    },
    "mainEntity": {
      "@type": "ItemList",
      "itemListElement": [
        {
          "@type": "SiteNavigationElement",
          "position": 1,
          "name": "À Propos",
          "description": "Découvrez WebFitYou, agence digitale nouvelle génération spécialisée dans le SEO automatisé par IA",
          "url": "https://webfityou.com/a-propos"
        },
        {
          "@type": "SiteNavigationElement",
          "position": 2,
          "name": "Contact",
          "description": "Contactez WebFitYou pour votre projet digital. Devis gratuit en 24h",
          "url": "https://webfityou.com/contact"
        },
        {
          "@type": "SiteNavigationElement",
          "position": 3,
          "name": "Audit Gratuit",
          "description": "Audit gratuit de votre présence digitale en 2 minutes",
          "url": "https://webfityou.com/#audit"
        },
        {
          "@type": "SiteNavigationElement",
          "position": 4,
          "name": "Tarifs",
          "description": "Découvrez nos tarifs transparents pour votre transformation digitale",
          "url": "https://webfityou.com/tarifs"
        },
        {
          "@type": "SiteNavigationElement",
          "position": 5,
          "name": "Services SEO",
          "description": "SEO nouvelle génération automatisé par intelligence artificielle GPT-5",
          "url": "https://webfityou.com/services"
        },
        {
          "@type": "SiteNavigationElement",
          "position": 6,
          "name": "Réalisations",
          "description": "Découvrez nos 500+ sites web créés et leurs résultats",
          "url": "https://webfityou.com/realisations"
        }
      ]
    }
  };

  // Données structurées pour les services
  const serviceSchema = {
    "@context": "https://schema.org",
    "@type": "Service",
    "name": "Création de Sites Web et SEO Automatisé",
    "provider": {
      "@type": "Organization",
      "name": "WebFitYou"
    },
    "description": "Services de création de sites web professionnels avec SEO automatisé par intelligence artificielle",
    "serviceType": "Digital Marketing Agency",
    "areaServed": {
      "@type": "Country",
      "name": "France"
    },
    "hasOfferCatalog": {
      "@type": "OfferCatalog",
      "name": "Services WebFitYou",
      "itemListElement": [
        {
          "@type": "Offer",
          "itemOffered": {
            "@type": "Service",
            "name": "Site Web Clé-en-Main",
            "description": "Site web professionnel livré en 7 jours maximum"
          }
        },
        {
          "@type": "Offer",
          "itemOffered": {
            "@type": "Service",
            "name": "SEO Automatisé par IA",
            "description": "Référencement naturel optimisé par Intelligence Artificielle GPT-5"
          }
        },
        {
          "@type": "Offer",
          "itemOffered": {
            "@type": "Service",
            "name": "Accompagnement Humain",
            "description": "Support personnalisé et conseil stratégique inclus"
          }
        }
      ]
    }
  };

  return (
    <Helmet>
      {/* Titre et description */}
      <title>{finalTitle}</title>
      <meta name="description" content={finalDescription} />
      
      {/* Meta robots */}
      {noindex && <meta name="robots" content="noindex, nofollow" />}
      
      {/* Canonical URL */}
      <link rel="canonical" href={currentUrl} />
      
      {/* Hreflang pour le multilangue */}
      <link rel="alternate" hrefLang="fr" href={`https://webfityou.com${location.pathname}`} />
      <link rel="alternate" hrefLang="en" href={`https://webfityou.com${location.pathname}`} />
      <link rel="alternate" hrefLang="x-default" href={`https://webfityou.com${location.pathname}`} />
      
      {/* Open Graph */}
      <meta property="og:type" content={type} />
      <meta property="og:title" content={finalTitle} />
      <meta property="og:description" content={finalDescription} />
      <meta property="og:image" content={finalImage} />
      <meta property="og:url" content={currentUrl} />
      <meta property="og:site_name" content="WebFitYou" />
      <meta property="og:locale" content={i18n.language === 'fr' ? 'fr_FR' : 'en_US'} />
      
      {/* Twitter Card */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={finalTitle} />
      <meta name="twitter:description" content={finalDescription} />
      <meta name="twitter:image" content={finalImage} />
      
      {/* Données structurées JSON-LD */}
      <script type="application/ld+json">
        {JSON.stringify(organizationSchema)}
      </script>
      <script type="application/ld+json">
        {JSON.stringify(websiteSchema)}
      </script>
      <script type="application/ld+json">
        {JSON.stringify(serviceSchema)}
      </script>
      
      {/* Meta tags additionnels pour le SEO */}
      <meta name="author" content="WebFitYou" />
      <meta name="publisher" content="WebFitYou" />
      <meta name="copyright" content="WebFitYou" />
      <meta name="language" content={i18n.language} />
      
      {/* Meta tags pour les moteurs de recherche */}
      <meta name="googlebot" content="index, follow, max-snippet:-1, max-image-preview:large, max-video-preview:-1" />
      <meta name="bingbot" content="index, follow, max-snippet:-1, max-image-preview:large, max-video-preview:-1" />
      
      {/* Favicon et icônes */}
      <link rel="icon" type="image/png" href="https://ptzpnswtgevfxfeosjfj.supabase.co/storage/v1/object/public/Images/Logo-rond-webfityou-seo-ia-optimisation-siteweb-2.png" />
      <link rel="apple-touch-icon" href="https://ptzpnswtgevfxfeosjfj.supabase.co/storage/v1/object/public/Images/Logo-rond-webfityou-seo-ia-optimisation-siteweb-2.png" />
      
      {/* Meta viewport pour le responsive */}
      <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=5.0" />
      
      {/* Meta theme-color */}
      <meta name="theme-color" content="#2563eb" />
    </Helmet>
  );
};

export default SEOHead;