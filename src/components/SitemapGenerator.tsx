import React, { useEffect } from 'react';

const SitemapGenerator: React.FC = () => {
  useEffect(() => {
    // Générer le sitemap dynamiquement côté client
    const generateSitemap = () => {
      const baseUrl = 'https://webfityou.com';
      const pages = [
        { url: '/', priority: '1.0', changefreq: 'weekly' },
        { url: '/services', priority: '0.9', changefreq: 'monthly' },
        { url: '/tarifs', priority: '0.9', changefreq: 'monthly' },
        { url: '/contact', priority: '0.8', changefreq: 'monthly' },
        { url: '/a-propos', priority: '0.7', changefreq: 'monthly' },
        { url: '/realisations', priority: '0.8', changefreq: 'weekly' },
        { url: '/blog', priority: '0.8', changefreq: 'daily' }
      ];

      const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
        xmlns:xhtml="http://www.w3.org/1999/xhtml">
${pages.map(page => `  <url>
    <loc>${baseUrl}${page.url}</loc>
    <lastmod>${new Date().toISOString().split('T')[0]}</lastmod>
    <changefreq>${page.changefreq}</changefreq>
    <priority>${page.priority}</priority>
    <xhtml:link rel="alternate" hreflang="fr" href="${baseUrl}${page.url}" />
    <xhtml:link rel="alternate" hreflang="en" href="${baseUrl}${page.url}" />
  </url>`).join('\n')}
</urlset>`;

      // En production, ce sitemap serait généré côté serveur
      console.log('Sitemap généré:', sitemap);
    };

    generateSitemap();
  }, []);

  return null; // Ce composant ne rend rien visuellement
};

export default SitemapGenerator;