"use client"

import React, { createContext, useContext, useState, ReactNode } from 'react'

type Language = 'en' | 'fr'

interface LanguageContextType {
  language: Language
  setLanguage: (lang: Language) => void
  t: (key: string) => string
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined)

// Translation data
const translations: Record<Language, Record<string, string>> = {
  en: {
    // Navigation
    'nav.services': 'Services',
    'nav.projects': 'Projects',
    'nav.process': 'Process',
    'nav.reviews': 'Reviews',
    'nav.pricing': 'Pricing',
    
    // Hero Section
    'hero.title.line1': 'Big ideas, smart strategies,',
    'hero.title.line2': 'and endless creativity to',
    'hero.title.line3': 'supercharge',
    'hero.title.line4': 'your brand!',
    'hero.subtitle.line1': 'Your go-to agency for designs that inspire and strategies',
    'hero.subtitle.line2': 'that deliver. We turn ideas into lasting impressions.',
    'hero.reviews': 'Over 200+ Five Star Reviews',
    
    // Statistics Section
    'stats.title.line1': 'Building brands, boosting businesses,',
    'stats.title.line2': 'and redefining possibilities.',
    'stats.title.line3': "Let's grow your brand together.",
    'stats.projects.title': 'Projects Delivered',
    'stats.projects.desc.line1': "We've successfully completed over 20",
    'stats.projects.desc.line2': 'projects—and we\'re just getting started!',
    'stats.growth.title': 'Business Growth',
    'stats.growth.desc.line1': 'Our strategies have helped clients achieve',
    'stats.growth.desc.line2': 'up to 70% revenue growth in just one year!',
    'stats.clients.title': 'Happy Clients',
    'stats.clients.desc.line1': 'More than 100 satisfied clients',
    'stats.clients.desc.line2': 'trust us to bring their ideas to life.',
    
    // Services Section
    'services.badge': 'Our services',
    'services.title.line1': 'Services designed to help',
    'services.title.line2': 'your brand shine brighter.',
    'services.web.title': 'Web Design and Development',
    'services.web.desc': 'Your website is like your digital handshake—it\'s the first thing people notice about you online. Our Web Design & Development services are all about making that handshake firm, friendly, and unforgettable.',
    'services.marketing.title': 'Digital Marketing',
    'services.marketing.desc': 'Let\'s face it, the internet is a noisy place. But with our Digital Marketing services, you won\'t just stand out—you\'ll shine. We\'ll help you show up where your customers are hanging out, whether that\'s Google, Instagram, or somewhere in between.',
    'services.branding.title': 'Branding & Creative Services',
    'services.branding.desc': 'Your brand is more than just a logo—it\'s the story you tell, the emotions you evoke, and the connection you build with your audience. We create memorable brand experiences that resonate and inspire action.',
    'services.app.title': 'App Design & Development',
    'services.app.desc': 'In today\'s mobile-first world, your app is your direct line to customers. We design and develop intuitive, powerful applications that users love to use and businesses love to own.',
    'services.view.details': 'View Details',
    // Service Features (EN)
    'services.web.features.uiux': 'UI UX Design',
    'services.web.features.custom': 'Custom Website Design',
    'services.web.features.ecom': 'E-Commerce Development',
    'services.web.features.maintenance': 'Website Maintenance and Support',
    'services.web.features.seo': 'SEO Integration',
    'services.web.features.uxopt': 'UX/UI Optimization',

    'services.marketing.features.seo': 'SEO (Search Engine Optimization)',
    'services.marketing.features.ppc': 'PPC Advertising',
    'services.marketing.features.social': 'Social Media Marketing',
    'services.marketing.features.email': 'Email Marketing',
    'services.marketing.features.content': 'Content Marketing',

    'services.branding.features.identity': 'Brand Identity Design',
    'services.branding.features.logo': 'Logo Design & Brand Guidelines',
    'services.branding.features.collateral': 'Marketing Collateral Design',
    'services.branding.features.social': 'Social Media Graphics',
    'services.branding.features.print': 'Print Design',
    'services.branding.features.strategy': 'Brand Strategy',

    'services.app.features.mobileDesign': 'Mobile App Design',
    'services.app.features.iosAndroid': 'iOS & Android Development',
    'services.app.features.crossPlatform': 'Cross-Platform Development',
    'services.app.features.aso': 'App Store Optimization',
    'services.app.features.maintenance': 'App Maintenance & Updates',
    'services.app.features.performance': 'Performance Optimization',
    
    // Process Section
    'process.badge': 'Our Work Process',
    'process.title.line1': 'From idea to impact—',
    'process.title.line2': 'our process makes it easy,',
    'process.title.line3': 'exciting, and effective!',
    'process.steps.1.title': 'Discover & Strategize',
    'process.steps.1.desc': 'We dive deep into understanding your brand, goals, and audience. Through collaborative discussions and research, we craft a clear roadmap tailored to your needs.',
    'process.steps.2.title': 'Design & Develop',
    'process.steps.2.desc': 'Our creative team brings your vision to life with stunning designs and robust development, ensuring every detail aligns with your brand identity.',
    'process.steps.3.title': 'Launch & Optimize',
    'process.steps.3.desc': 'We launch your project with precision and continue optimizing based on performance data and user feedback to ensure maximum impact.',
    'process.steps.4.title': 'Maintain & Scale',
    'process.steps.4.desc': 'We provide ongoing support and maintenance to ensure your project continues to perform at its best, while helping you scale and grow your business.',
    
    // Pricing Section
    'pricing.badge': 'Pricing Plans',
    'pricing.title.line1': 'Affordable, transparent pricing',
    'pricing.title.line2': 'tailored to your business—',
    'pricing.title.line3': 'because every detail matters!',
    'pricing.standard.title': 'Standard Package',
    'pricing.standard.price': '$999.95',
    'pricing.standard.desc': 'Small to medium-sized businesses looking to build and sustain a consistent online presence without the hassle.',
    'pricing.custom.title': 'Custom Package',
    'pricing.custom.starting': 'Starting at',
    'pricing.custom.price': '$1499.99',
    'pricing.custom.desc': 'Businesses with unique needs that require a customized, holistic approach to their digital strategy.',
    'pricing.get.started': 'Get started',
    // Pricing Features (EN)
    'pricing.standard.features.basicWebsite': 'Basic website 3–5 pages',
    'pricing.standard.features.maps': 'Google Maps integration',
    'pricing.standard.features.seo': 'Basic SEO setup',
    'pricing.standard.features.scheduling': 'Post Scheduling and Optimization',
    'pricing.standard.features.responsive': 'Mobile-responsive design',
    'pricing.standard.features.galleries': 'Photo galleries',
    'pricing.custom.features.preamble': 'Everything in the basic package, plus:',
    'pricing.custom.features.analysis': 'Comprehensive Business Analysis',
    'pricing.custom.features.strategy': 'Custom Strategy Development (Marketing, SEO, Web, Branding)',
    'pricing.custom.features.manager': 'Dedicated Account Manager',
    'pricing.custom.features.checkins': 'Monthly Check-ins & Adjustments',
    'pricing.custom.features.analytics': 'Advanced Analytics and Reporting',
    'pricing.custom.features.support': 'Direct Support via Email or Phone',
    
    // Contact Section
    'contact.title.line1': 'Ready to get',
    'contact.title.line2': 'started?',
    'contact.subtitle': "Let's bring your vision to life",
    'contact.quote.title': 'Get a Custom Quote',
    'contact.quote.desc': 'Tell us about your project and we\'ll create a personalized solution',
    'contact.support.title': 'Need Support?',
    'contact.support.desc': 'We\'re here to help you get back on track',
    'contact.form.firstName': 'First Name',
    'contact.form.lastName': 'Last Name',
    'contact.form.email': 'Email',
    'contact.form.projectType': 'Project Type',
    'contact.form.message': 'Tell us about your project...',
    'contact.form.subject': 'Subject',
    'contact.form.supportMessage': 'Describe your issue or question...',
    'contact.form.getQuote': 'Get Quote',
    'contact.form.sendRequest': 'Send Request',
    
    // Footer
    'footer.tagline': 'The next big thing starts here—drop us a line and let\'s get creating!',
    'footer.quickLinks': 'Quick Links',
    'footer.home': 'Home',
    'footer.benefits': 'Benefits',
    'footer.portfolio': 'Portfolio',
    'footer.reviews': 'Reviews',
    'footer.about': 'About',
    'footer.followUs': 'Follow Us',
    'footer.linkedin': 'LinkedIn',
    'footer.facebook': 'Facebook',
    'footer.instagram': 'Instagram',
  },
  fr: {
    // Navigation
    'nav.services': 'Services',
    'nav.projects': 'Projets',
    'nav.process': 'Processus',
    'nav.reviews': 'Avis',
    'nav.pricing': 'Tarifs',
    
    // Hero Section
    'hero.title.line1': 'Grandes idées, stratégies intelligentes,',
    'hero.title.line2': 'et créativité sans limites pour',
    'hero.title.line3': 'propulser',
    'hero.title.line4': 'votre marque !',
    'hero.subtitle.line1': 'Votre agence de référence pour des designs qui inspirent et des stratégies',
    'hero.subtitle.line2': 'qui délivrent. Nous transformons les idées en impressions durables.',
    'hero.reviews': 'Plus de 200+ Avis Cinq Étoiles',
    
    // Statistics Section
    'stats.title.line1': 'Construire des marques, stimuler les entreprises,',
    'stats.title.line2': 'et redéfinir les possibilités.',
    'stats.title.line3': 'Faisons grandir votre marque ensemble.',
    'stats.projects.title': 'Projets Livrés',
    'stats.projects.desc.line1': 'Nous avons réussi plus de 20',
    'stats.projects.desc.line2': 'projets—et ce n\'est que le début !',
    'stats.growth.title': 'Croissance d\'Entreprise',
    'stats.growth.desc.line1': 'Nos stratégies ont aidé les clients à atteindre',
    'stats.growth.desc.line2': 'jusqu\'à 70% de croissance des revenus en un an !',
    'stats.clients.title': 'Clients Satisfaits',
    'stats.clients.desc.line1': 'Plus de 100 clients satisfaits',
    'stats.clients.desc.line2': 'nous font confiance pour donner vie à leurs idées.',
    
    // Services Section
    'services.badge': 'Nos services',
    'services.title.line1': 'Services conçus pour aider',
    'services.title.line2': 'votre marque à briller davantage.',
    'services.web.title': 'Conception et Développement Web',
    'services.web.desc': 'Votre site web est comme votre poignée de main numérique—c\'est la première chose que les gens remarquent de vous en ligne. Nos services de Conception et Développement Web visent à rendre cette poignée de main ferme, amicale et inoubliable.',
    'services.marketing.title': 'Marketing Digital',
    'services.marketing.desc': 'Soyons honnêtes, internet est un endroit bruyant. Mais avec nos services de Marketing Digital, vous ne vous contenterez pas de vous démarquer—vous brillerez. Nous vous aiderons à apparaître là où vos clients se trouvent, que ce soit Google, Instagram, ou ailleurs.',
    'services.branding.title': 'Services de Marque et Créatifs',
    'services.branding.desc': 'Votre marque est plus qu\'un simple logo—c\'est l\'histoire que vous racontez, les émotions que vous évoquez, et la connexion que vous établissez avec votre audience. Nous créons des expériences de marque mémorables qui résonnent et inspirent l\'action.',
    'services.app.title': 'Conception et Développement d\'Applications',
    'services.app.desc': 'Dans le monde mobile-first d\'aujourd\'hui, votre application est votre ligne directe vers les clients. Nous concevons et développons des applications intuitives et puissantes que les utilisateurs adorent utiliser et que les entreprises adorent posséder.',
    'services.view.details': 'Voir les Détails',
    // Service Features (FR)
    'services.web.features.uiux': 'Conception UI/UX',
    'services.web.features.custom': 'Conception de site web sur mesure',
    'services.web.features.ecom': 'Développement e-commerce',
    'services.web.features.maintenance': 'Maintenance et support du site',
    'services.web.features.seo': 'Intégration SEO',
    'services.web.features.uxopt': 'Optimisation UX/UI',

    'services.marketing.features.seo': 'SEO (Référencement naturel)',
    'services.marketing.features.ppc': 'Publicité PPC',
    'services.marketing.features.social': 'Marketing sur les réseaux sociaux',
    'services.marketing.features.email': 'Email marketing',
    'services.marketing.features.content': 'Marketing de contenu',

    'services.branding.features.identity': 'Conception d\'identité de marque',
    'services.branding.features.logo': 'Création de logo et charte graphique',
    'services.branding.features.collateral': 'Création de supports marketing',
    'services.branding.features.social': 'Visuels pour réseaux sociaux',
    'services.branding.features.print': 'Design imprimé',
    'services.branding.features.strategy': 'Stratégie de marque',

    'services.app.features.mobileDesign': 'Conception d\'applications mobiles',
    'services.app.features.iosAndroid': 'Développement iOS & Android',
    'services.app.features.crossPlatform': 'Développement multiplateforme',
    'services.app.features.aso': 'Optimisation App Store (ASO)',
    'services.app.features.maintenance': 'Maintenance et mises à jour d\'app',
    'services.app.features.performance': 'Optimisation des performances',
    
    // Process Section
    'process.badge': 'Notre Processus de Travail',
    'process.title.line1': 'De l\'idée à l\'impact—',
    'process.title.line2': 'notre processus rend tout facile,',
    'process.title.line3': 'passionnant et efficace !',
    'process.steps.1.title': 'Découvrir et définir la stratégie',
    'process.steps.1.desc': 'Nous analysons en profondeur votre marque, vos objectifs et votre audience. Grâce à des échanges et à la recherche, nous élaborons une feuille de route claire et adaptée à vos besoins.',
    'process.steps.2.title': 'Concevoir et développer',
    'process.steps.2.desc': 'Notre équipe créative donne vie à votre vision avec des designs soignés et un développement robuste, en veillant à l’alignement avec votre identité de marque.',
    'process.steps.3.title': 'Lancer et optimiser',
    'process.steps.3.desc': 'Nous lançons votre projet avec précision et l’optimisons en continu selon les performances et les retours utilisateurs pour un impact maximal.',
    'process.steps.4.title': 'Maintenir et faire évoluer',
    'process.steps.4.desc': 'Nous assurons un support et une maintenance continus pour des performances durables, tout en vous aidant à faire évoluer et à développer votre activité.',
    
    // Pricing Section
    'pricing.badge': 'Plans Tarifaires',
    'pricing.title.line1': 'Tarification abordable et transparente',
    'pricing.title.line2': 'adaptée à votre entreprise—',
    'pricing.title.line3': 'parce que chaque détail compte !',
    'pricing.standard.title': 'Forfait Standard',
    'pricing.standard.price': '$999.95',
    'pricing.standard.desc': 'Petites et moyennes entreprises cherchant à construire et maintenir une présence en ligne cohérente sans tracas.',
    'pricing.custom.title': 'Forfait Personnalisé',
    'pricing.custom.starting': 'À partir de',
    'pricing.custom.price': '$1499.99',
    'pricing.custom.desc': 'Entreprises avec des besoins uniques nécessitant une approche holistique et personnalisée de leur stratégie digitale.',
    'pricing.get.started': 'Commencer',
    // Pricing Features (FR)
    'pricing.standard.features.basicWebsite': 'Site vitrine 3–5 pages',
    'pricing.standard.features.maps': 'Intégration Google Maps',
    'pricing.standard.features.seo': 'Paramétrage SEO de base',
    'pricing.standard.features.scheduling': 'Planification et optimisation des publications',
    'pricing.standard.features.responsive': 'Design responsive (mobile)',
    'pricing.standard.features.galleries': 'Galeries photos',
    'pricing.custom.features.preamble': 'Tout ce qui est inclus dans le forfait standard, plus :',
    'pricing.custom.features.analysis': 'Analyse complète de l’entreprise',
    'pricing.custom.features.strategy': 'Stratégie personnalisée (Marketing, SEO, Web, Branding)',
    'pricing.custom.features.manager': 'Chef de projet dédié',
    'pricing.custom.features.checkins': 'Suivi mensuel et ajustements',
    'pricing.custom.features.analytics': 'Analyses avancées et rapports',
    'pricing.custom.features.support': 'Support direct par e-mail ou téléphone',
    
    // Contact Section
    'contact.title.line1': 'Prêt à',
    'contact.title.line2': 'commencer ?',
    'contact.subtitle': 'Donnons vie à votre vision',
    'contact.quote.title': 'Obtenir un Devis Personnalisé',
    'contact.quote.desc': 'Parlez-nous de votre projet et nous créerons une solution personnalisée',
    'contact.support.title': 'Besoin d\'Aide ?',
    'contact.support.desc': 'Nous sommes là pour vous remettre sur la bonne voie',
    'contact.form.firstName': 'Prénom',
    'contact.form.lastName': 'Nom',
    'contact.form.email': 'Email',
    'contact.form.projectType': 'Type de Projet',
    'contact.form.message': 'Parlez-nous de votre projet...',
    'contact.form.subject': 'Sujet',
    'contact.form.supportMessage': 'Décrivez votre problème ou question...',
    'contact.form.getQuote': 'Obtenir Devis',
    'contact.form.sendRequest': 'Envoyer Demande',
    
    // Footer
    'footer.tagline': 'La prochaine grande chose commence ici—contactez-nous et créons ensemble !',
    'footer.quickLinks': 'Liens Rapides',
    'footer.home': 'Accueil',
    'footer.benefits': 'Avantages',
    'footer.portfolio': 'Portfolio',
    'footer.reviews': 'Avis',
    'footer.about': 'À Propos',
    'footer.followUs': 'Suivez-nous',
    'footer.linkedin': 'LinkedIn',
    'footer.facebook': 'Facebook',
    'footer.instagram': 'Instagram',
  }
}

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [language, setLanguage] = useState<Language>('en')

  const t = (key: string): string => {
    return translations[language][key] || key
  }

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  )
}

export function useLanguage() {
  const context = useContext(LanguageContext)
  if (context === undefined) {
    throw new Error('useLanguage must be used within a LanguageProvider')
  }
  return context
}
