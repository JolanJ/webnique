"use client"

import React, { useState, useEffect, useRef } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Star, Plus, Check, Zap, Menu, X } from "lucide-react"
import { useProcessSteps } from "@/contexts/AppContext"
import { useLanguage } from "@/contexts/LanguageContext"
import Image from "next/image"

// Animation hook for scroll-triggered animations
function useScrollAnimation() {
  const [isVisible, setIsVisible] = useState(false)
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true)
        }
      },
      { threshold: 0.1 }
    )

    if (ref.current) {
      observer.observe(ref.current)
    }

    return () => observer.disconnect()
  }, [])

  return { ref, isVisible }
}

// Fade in from bottom with blur
function FadeInUp({ children, className = "", delay = 0 }: { children: React.ReactNode; className?: string; delay?: number }) {
  const { ref, isVisible } = useScrollAnimation()
  return (
    <div
      ref={ref}
      className={`transition-all duration-1000 ease-out ${isVisible ? 'opacity-100 translate-y-0 blur-0' : 'opacity-0 translate-y-8 blur-sm'} ${className}`}
      style={{ transitionDelay: isVisible ? `${delay}ms` : '0ms' }}
    >
      {children}
    </div>
  )
}

// Staggered animation with different effects
function StaggeredAnimation({ children, className = "", staggerDelay = 200, animationType = "fadeUp" }: {
  children: React.ReactNode;
  className?: string;
  staggerDelay?: number;
  animationType?: "fadeUp" | "slideLeft" | "slideRight" | "scale" | "rotate"
}) {
  const { ref, isVisible } = useScrollAnimation()

  const getAnimationClasses = (type: string) => {
    switch (type) {
      case "fadeUp":
        return isVisible ? 'opacity-100 translate-y-0 blur-0' : 'opacity-0 translate-y-8 blur-sm'
      case "slideLeft":
        return isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-12'
      case "slideRight":
        return isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-12'
      case "scale":
        return isVisible ? 'opacity-100 scale-100' : 'opacity-0 scale-95'
      case "rotate":
        return isVisible ? 'opacity-100 translate-y-0 rotate-0' : 'opacity-0 translate-y-8 rotate-3'
      default:
        return isVisible ? 'opacity-100 translate-y-0 blur-0' : 'opacity-0 translate-y-8 blur-sm'
    }
  }

  return (
    <div ref={ref} className={className}>
      {Array.isArray(children) ? children.map((child, index) => (
        <div
          key={index}
          className={`transition-all duration-1000 ease-out ${getAnimationClasses(animationType)}`}
          style={{
            transitionDelay: isVisible ? `${index * staggerDelay}ms` : '0ms'
          }}
        >
          {child}
        </div>
      )) : (
        <div
          className={`transition-all duration-1000 ease-out ${getAnimationClasses(animationType)}`}
        >
          {children}
        </div>
      )}
    </div>
  )
}

function Counter({ target, symbol, className }: { target: number; symbol: string; className?: string }) {
  const [count, setCount] = useState(0)
  const [hasAnimated, setHasAnimated] = useState(false)
  const [isClient, setIsClient] = useState(false)
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    setIsClient(true)
  }, [])

  useEffect(() => {
    if (!isClient) return

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && !hasAnimated) {
            setHasAnimated(true)
            let start = 0
            const duration = 2000
            const increment = target / (duration / 16)

            const updateCounter = () => {
              start += increment
              if (start < target) {
                setCount(Math.floor(start))
                requestAnimationFrame(updateCounter)
              } else {
                setCount(target)
              }
            }
            updateCounter()
          }
        })
      },
      { threshold: 0.5 }
    )

    if (ref.current) {
      observer.observe(ref.current)
    }

    return () => observer.disconnect()
  }, [target, hasAnimated, isClient])

  return (
    <div ref={ref} className={className}>
      {isClient ? count : 0}
      <span className="text-5xl align-top mt-10">{symbol}</span>
    </div>
  )
}

export default function WebniquePage() {
  const { language, setLanguage, t } = useLanguage()
  const [activeService, setActiveService] = useState<string>('web-design')
  const [carouselPosition, setCarouselPosition] = useState(0)
  const carouselRef = useRef<HTMLDivElement>(null)
  const [activeProcessStep, setActiveProcessStep] = useState<number>(0)
  const [activeForm, setActiveForm] = useState<string>('quote')
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

  // Initialize carousel position on mount
  useEffect(() => {
    // Start with the first service active
    setActiveService('web-design')
    setCarouselPosition(0)
  }, [])

  const scrollToService = (serviceId: string) => {
    console.log('Moving carousel to service:', serviceId)
    const serviceIndex = {
      'web-design': 0,
      'digital-marketing': 1,
      'branding': 2,
      'app-design': 3
    }[serviceId] || 0

    setCarouselPosition(serviceIndex)
    setActiveService(serviceId)
  }

  // Create a circular array of services for the carousel
  const getCarouselServices = () => {
    const services = [
      { id: 'web-design', title: 'Web Design and Development' },
      { id: 'digital-marketing', title: 'Digital Marketing' },
      { id: 'branding', title: 'Branding & Creative Services' },
      { id: 'app-design', title: 'App Design & Development' }
    ]

    // Rotate the array based on carousel position
    const rotated = [...services.slice(carouselPosition), ...services.slice(0, carouselPosition)]
    return rotated
  }

  return (
    <div className="min-h-screen bg-white overflow-x-hidden">
      {/* Navigation */}
      <nav className="bg-[#0f0c2b] px-6 py-4">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="w-40 h-3  flex items-center justify-center">
<Image src="/webnique.svg" alt="WEBNIQUE"  width={200} height={200}      className="w-full h-auto scale-150" // Fill the container
 priority />
</div>  


          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8 text-[#fffef5]">
            <a href="#services" className="text-[#d4c7a9] font-medium text-sm hover:opacity-80 transition-opacity">
              {t('nav.services')}
            </a>
            <a href="#statistics" className="text-[#d4c7a9] font-medium text-sm hover:opacity-80 transition-opacity">
              {t('nav.projects')}
            </a>
            <a href="#process" className="text-[#d4c7a9] font-medium text-sm hover:opacity-80 transition-opacity">
              {t('nav.process')}
            </a>

            <a href="#pricing" className="text-[#d4c7a9] font-medium text-sm hover:opacity-80 transition-opacity">
              {t('nav.pricing')}
            </a>
            <div className="flex items-center space-x-2 ml-4">
              <button
                onClick={() => setLanguage('en')}
                className={`px-2 py-1 rounded text-sm font-medium transition-colors ${language === 'en'
                    ? 'bg-[#d4c7a9] text-[#0f0c2b]'
                    : 'text-[#fffef5] hover:text-[#d4c7a9]'
                  }`}
              >
                EN
              </button>
              <button
                onClick={() => setLanguage('fr')}
                className={`px-2 py-1 rounded text-sm font-medium transition-colors ${language === 'fr'
                    ? 'bg-[#d4c7a9] text-[#0f0c2b]'
                    : 'text-[#fffef5] hover:text-[#d4c7a9]'
                  }`}
              >
                FR
              </button>
            </div>
          </div>

          {/* Mobile Menu Button and Language Switcher */}
          <div className="md:hidden flex items-center space-x-2">
            {/* Mobile Language Switcher - Always Visible */}
            <div className="flex items-center space-x-1">
              <button
                onClick={() => setLanguage('en')}
                className={`px-2 py-1 rounded text-xs font-medium transition-colors ${language === 'en'
                    ? 'bg-[#d4c7a9] text-[#0f0c2b]'
                    : 'text-[#fffef5] hover:text-[#d4c7a9] border border-[#d4c7a9]/30'
                  }`}
              >
                EN
              </button>
              <button
                onClick={() => setLanguage('fr')}
                className={`px-2 py-1 rounded text-xs font-medium transition-colors ${language === 'fr'
                    ? 'bg-[#d4c7a9] text-[#0f0c2b]'
                    : 'text-[#fffef5] hover:text-[#d4c7a9] border border-[#d4c7a9]/30'
                  }`}
              >
                FR
              </button>
            </div>

            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="text-[#fffef5] p-2"
            >
              {isMobileMenuOpen ? (
                <X className="w-6 h-6" />
              ) : (
                <Menu className="w-6 h-6" />
              )}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div className="md:hidden mt-4 pb-4 border-t border-[#d4c7a9]/20">
            <div className="flex flex-col space-y-4 pt-4">
              <a
                href="#services"
                className="text-[#d4c7a9] font-medium text-sm hover:opacity-80 transition-opacity"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                {t('nav.services')}
              </a>
              <a
                href="#statistics"
                className="text-[#d4c7a9] font-medium text-sm hover:opacity-80 transition-opacity"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                {t('nav.projects')}
              </a>
              <a
                href="#process"
                className="text-[#d4c7a9] font-medium text-sm hover:opacity-80 transition-opacity"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                {t('nav.process')}
              </a>
              <a
                href="#pricing"
                className="text-[#d4c7a9] font-medium text-sm hover:opacity-80 transition-opacity"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                {t('nav.pricing')}
              </a>
            </div>
          </div>
        )}
      </nav>

      {/* Hero Section */}
      <section className="px-4 sm:px-6 py-12 pb-48">
        <div className="max-w-6xl mx-auto mt-16">
          <FadeInUp delay={0}>
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-medium text-[#0f0c2b] leading-none mb-6 break-words tracking-tighter">
              <div>{t('hero.title.line1')}</div>
              <div>{t('hero.title.line2')}</div>
              <div className="flex items-center">
                {t('hero.title.line3')}
                <span className="inline-flex items-center mx-1 sm:mx-2 text-3xl sm:text-4xl md:text-5xl">
                  ⚡
                </span>
                {t('hero.title.line4')}
              </div>
            </h1>
          </FadeInUp>
          <FadeInUp delay={200}>
            <div className="text-base text-gray-700 mb-6 max-w-2xl font-normal">
              <div>{t('hero.subtitle.line1')}</div>
              <div>{t('hero.subtitle.line2')}</div>
            </div>
          </FadeInUp>
          <FadeInUp delay={400}>
            <div className="flex items-center space-x-2">
              <div className="flex items-center">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-4 h-4 fill-black text-black" />
                ))}
              </div>
              <span className="text-sm text-gray-600 font-medium">{t('hero.reviews')}</span>
            </div>
          </FadeInUp>
        </div>
      </section>

      {/* Portfolio Showcase Section */}
      <section id="projects" className="px-8 sm:px-12 py-32">
        <div className="w-full h-[80vh]">
          <div className="grid grid-cols-3 gap-4 h-full">
            {/* Left Column - Image */}
            <div className="w-full h-full rounded-2xl overflow-hidden">
              <img
                src="/leftcol.avif"
                alt="Left column image"
                className="w-full h-full object-cover"
              />
            </div>

            {/* Center Column - Video */}
            <div className="w-full h-full rounded-2xl overflow-hidden">
              <video
                className="w-full h-full object-cover"
                autoPlay
                muted
                loop
              >
                <source src="/section2vid.mp4" type="video/mp4" />
                Your browser does not support the video tag.
              </video>
            </div>

            {/* Right Column - Image */}
            <div className="w-full h-full rounded-2xl overflow-hidden">
              <img
                src="/rightcol.avif"
                alt="Right column image"
                className="w-full h-full object-cover"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Statistics Section */}
      <section id="statistics" className="px-4 sm:px-6 py-20">
        <div className="max-w-6xl mx-auto text-center">
          <FadeInUp delay={0}>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-semibold text-[#0f0c2b] mb-16 break-words tracking-tighter leading-none">
              <div>{t('stats.title.line1')}</div>
              <div>{t('stats.title.line2')}</div>
              <div>{t('stats.title.line3')}</div>
            </h2>
          </FadeInUp>

          <StaggeredAnimation staggerDelay={200} animationType="scale">
            <div className="grid md:grid-cols-3 gap-8">
              <div className="flex flex-col items-start">
                <div className="box-border w-full h-min flex flex-col justify-start items-start p-5 bg-[#0f0c2b] overflow-visible align-content-center flex-nowrap gap-0 relative rounded-[30px] border border-dashed border-black/40 mb-4">
                  <div className="text-7xl font-normal mb-2 text-white font-inter tracking-tighter">
                    <Counter target={20} symbol="+" />
                  </div>
                  <div className="text-xl font-normal mb-4 text-white font-inter">{t('stats.projects.title')}</div>
                </div>
                <div className="text-gray-600 text-left max-w-xs text-sm font-normal ml-2">
                  <div>{t('stats.projects.desc.line1')}</div>
                  <div>{t('stats.projects.desc.line2')}</div>
                </div>
              </div>

              <div className="flex flex-col items-start">
                <div className="box-border w-full h-min flex flex-col justify-start items-start p-5 bg-[#0f0c2b] overflow-visible align-content-center flex-nowrap gap-0 relative rounded-[30px] border border-dashed border-black/40 mb-4">
                  <div className="text-7xl font-normal mb-2 text-white font-inter tracking-tighter">
                    <Counter target={70} symbol="%" />
                  </div>
                  <div className="text-xl font-normal mb-4 text-white font-inter">{t('stats.growth.title')}</div>
                </div>
                <div className="text-gray-600 text-left max-w-xs text-sm font-normal ml-2">
                  <div>{t('stats.growth.desc.line1')}</div>
                  <div>{t('stats.growth.desc.line2')}</div>
                </div>
              </div>

              <div className="flex flex-col items-start">
                <div className="box-border w-full h-min flex flex-col justify-start items-start p-5 bg-[#0f0c2b] overflow-visible align-content-center flex-nowrap gap-0 relative rounded-[30px] border border-dashed border-black/40 mb-4">
                  <div className="text-7xl font-normal mb-2 text-white font-inter tracking-tighter">
                    <Counter target={100} symbol="+" />
                  </div>
                  <div className="text-xl font-normal mb-4 text-white font-inter">{t('stats.clients.title')}</div>
                </div>
                <div className="text-gray-600 text-left max-w-xs text-sm font-normal ml-2">
                  <div>{t('stats.clients.desc.line1')}</div>
                  <div>{t('stats.clients.desc.line2')}</div>
                </div>
              </div>
            </div>
          </StaggeredAnimation>
        </div>
      </section>



      {/* Services Section */}
      <section id="services" className="px-4 sm:px-6 py-20">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <FadeInUp delay={0}>
              <Badge className="bg-[#0f0c2b] text-[#fffef5] mb-4">{t('services.badge')}</Badge>
            </FadeInUp>
            <FadeInUp delay={200}>
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-semibold text-[#0f0c2b] mb-16 break-words tracking-tighter leading-none">
                <div>{t('services.title.line1')}</div>
                <div>{t('services.title.line2')}</div>
              </h2>
            </FadeInUp>
          </div>

          {/* Desktop Layout - Carousel with Sidebar */}
          <div className="hidden lg:grid lg:grid-cols-10 gap-8">
            {/* Left sidebar */}
            <div className="space-y-0 lg:max-w-xs lg:col-span-3">
              {[
                { title: t('services.web.title'), id: "web-design" },
                { title: t('services.marketing.title'), id: "digital-marketing" },
                { title: t('services.branding.title'), id: "branding" },
                { title: t('services.app.title'), id: "app-design" },
              ].map((service, index) => (
                <button
                  key={service.id}
                  onClick={() => scrollToService(service.id)}
                  className={`w-full text-left p-0.5 rounded-lg transition-colors flex items-center gap-0 font-normal cursor-pointer group ${activeService === service.id
                      ? "bg-[#0f0c2b] text-white"
                      : "bg-white text-gray-700"
                    }`}
                >
                  {activeService === service.id && (
                    <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M8.5 5.5L15.5 12L8.5 18.5V5.5Z" />
                    </svg>
                  )}
                  {activeService !== service.id && (
                    <svg className="w-6 h-6 fill-gray-400 opacity-0 group-hover:opacity-100 transition-all duration-300 transform -translate-x-2 group-hover:translate-x-1" viewBox="0 0 24 24">
                      <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" />
                    </svg>
                  )}
                  <span className={`transition-all duration-300 ${activeService !== service.id ? 'group-hover:translate-x-1' : ''}`}>
                    {service.title}
                  </span>
                </button>
              ))}
            </div>

            {/* Right content - Carousel */}
            <div className="w-full lg:col-span-7 overflow-visible">
              <div
                ref={carouselRef}
                className="h-full transition-all duration-500 ease-in-out"
              >
                <div className="space-y-8 pt-0.5">
                  {getCarouselServices().map((service, index) => {
                    const serviceData = {
                      'web-design': {
                        title: t('services.web.title'),
                        description: t('services.web.desc'),
                        features: [
                          t('services.web.features.uiux'),
                          t('services.web.features.custom'),
                          t('services.web.features.ecom'),
                          t('services.web.features.maintenance'),
                          t('services.web.features.seo'),
                          t('services.web.features.uxopt')
                        ]
                      },
                      'digital-marketing': {
                        title: t('services.marketing.title'),
                        description: t('services.marketing.desc'),
                        features: [
                          t('services.marketing.features.seo'),
                          t('services.marketing.features.ppc'),
                          t('services.marketing.features.social'),
                          t('services.marketing.features.email'),
                          t('services.marketing.features.content')
                        ]
                      },
                      'branding': {
                        title: t('services.branding.title'),
                        description: t('services.branding.desc'),
                        features: [
                          t('services.branding.features.identity'),
                          t('services.branding.features.logo'),
                          t('services.branding.features.collateral'),
                          t('services.branding.features.social'),
                          t('services.branding.features.print'),
                          t('services.branding.features.strategy')
                        ]
                      },
                      'app-design': {
                        title: t('services.app.title'),
                        description: t('services.app.desc'),
                        features: [
                          t('services.app.features.mobileDesign'),
                          t('services.app.features.iosAndroid'),
                          t('services.app.features.crossPlatform'),
                          t('services.app.features.aso'),
                          t('services.app.features.maintenance'),
                          t('services.app.features.performance')
                        ]
                      }
                    }[service.id]

                    return (
                      <Card key={`${service.id}-${index}`} id={service.id} className="service-card bg-[#0f0c2b] text-[#fffef5] border-0 rounded-[34px] flex flex-col justify-center items-center gap-4">
                        <CardContent className="px-4">
                          <h3 className="text-2xl font-bold mb-4 text-white">{serviceData?.title || service.title}</h3>
                          <p className="mb-6 opacity-90">{serviceData?.description || ''}</p>
                          <div className="grid grid-cols-2 gap-4 mb-6">
                            {serviceData?.features?.map((feature, featureIndex) => (
                              <div key={featureIndex} className="flex items-center space-x-2">
                                <Check className="w-4 h-4" />
                                <span className="text-sm">{feature}</span>
                              </div>
                            ))}
                          </div>
                          <button className="group w-full flex justify-between items-center p-5 bg-white rounded-[20px] text-[#0f0c2b] hover:bg-gray-50 transition-colors">
                            <span className="text-lg font-normal tracking-tight">{t('services.view.details')}</span>
                            <div className="relative w-8 h-8 flex items-center justify-center">
                              <div className="w-8 h-8 bg-[#0f0c2b] rounded-md opacity-0 group-hover:opacity-100 transition-all duration-300 absolute inset-0"></div>
                              <Plus className="w-4 h-4 group-hover:text-white transition-all duration-300 relative z-10" />
                            </div>
                          </button>
                        </CardContent>
                      </Card>
                    )
                  })}
                </div>
              </div>
            </div>
          </div>

          {/* Mobile/Tablet Layout - All 4 Cards */}
          <div className="lg:hidden space-y-6">
            {[
              {
                id: 'web-design',
                title: t('services.web.title'),
                description: t('services.web.desc'),
                features: [
                  t('services.web.features.uiux'),
                  t('services.web.features.custom'),
                  t('services.web.features.ecom'),
                  t('services.web.features.maintenance'),
                  t('services.web.features.seo'),
                  t('services.web.features.uxopt')
                ]
              },
              {
                id: 'digital-marketing',
                title: t('services.marketing.title'),
                description: t('services.marketing.desc'),
                features: [
                  t('services.marketing.features.seo'),
                  t('services.marketing.features.ppc'),
                  t('services.marketing.features.social'),
                  t('services.marketing.features.email'),
                  t('services.marketing.features.content')
                ]
              },
              {
                id: 'branding',
                title: t('services.branding.title'),
                description: t('services.branding.desc'),
                features: [
                  t('services.branding.features.identity'),
                  t('services.branding.features.logo'),
                  t('services.branding.features.collateral'),
                  t('services.branding.features.social'),
                  t('services.branding.features.print'),
                  t('services.branding.features.strategy')
                ]
              },
              {
                id: 'app-design',
                title: t('services.app.title'),
                description: t('services.app.desc'),
                features: [
                  t('services.app.features.mobileDesign'),
                  t('services.app.features.iosAndroid'),
                  t('services.app.features.crossPlatform'),
                  t('services.app.features.aso'),
                  t('services.app.features.maintenance'),
                  t('services.app.features.performance')
                ]
              }
            ].map((service, index) => (
              <Card key={service.id} id={service.id} className="bg-[#0f0c2b] text-[#fffef5] border-0 rounded-[20px] sm:rounded-[34px] flex flex-col justify-center items-center gap-4">
                <CardContent className="px-3 sm:px-4">
                  <h3 className="text-xl sm:text-2xl font-bold mb-4 text-white">{service.title}</h3>
                  <p className="mb-6 opacity-90 text-sm sm:text-base">{service.description}</p>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4 mb-6">
                    {service.features.map((feature, featureIndex) => (
                      <div key={featureIndex} className="flex items-center space-x-2">
                        <Check className="w-4 h-4" />
                        <span className="text-sm">{feature}</span>
                      </div>
                    ))}
                  </div>
                  <button className="group w-full flex justify-between items-center p-4 sm:p-5 bg-white rounded-[16px] sm:rounded-[20px] text-[#0f0c2b] hover:bg-gray-50 transition-colors">
                    <span className="text-base sm:text-lg font-normal tracking-tight">{t('services.view.details')}</span>
                    <div className="relative w-8 h-8 flex items-center justify-center">
                      <div className="w-8 h-8 bg-[#0f0c2b] rounded-md opacity-0 group-hover:opacity-100 transition-all duration-300 absolute inset-0"></div>
                      <Plus className="w-4 h-4 group-hover:text-white transition-all duration-300 relative z-10" />
                    </div>
                  </button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Process Section */}
      <section id="process" className="px-4 sm:px-6 py-20">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <FadeInUp delay={0}>
              <Badge className="bg-[#0f0c2b] text-[#fffef5] mb-4">{t('process.badge')}</Badge>
            </FadeInUp>
            <FadeInUp delay={200}>
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-semibold text-[#0f0c2b] mb-16 break-words tracking-tighter leading-none">
                <div>{t('process.title.line1')}</div>
                <div>{t('process.title.line2')}</div>
                <div>{t('process.title.line3')}</div>
              </h2>
            </FadeInUp>
          </div>

          <div className="flex gap-2 h-[500px] max-w-6xl mx-auto justify-center">
            {useProcessSteps().map((step, index) => {
              const isActive = activeProcessStep === index;
              return (
                <div
                  key={step.id}
                  className={`cursor-pointer transition-all duration-1000 ease-in-out ${isActive ? 'w-[70%]' : 'w-[10%]'
                    }`}
                  onClick={() => setActiveProcessStep(index)}
                >
                  <Card className={`border-0 rounded-2xl transition-all duration-1000 ease-in-out h-full flex flex-col ${isActive
                      ? 'bg-[#0f0c2b] text-[#fffef5] shadow-2xl overflow-hidden'
                      : 'bg-white text-[#0f0c2b] shadow-lg hover:shadow-xl overflow-hidden group-hover:overflow-visible'
                    }`}>
                    <CardContent className={`transition-all duration-1000 ease-in-out flex-1 flex flex-col ${isActive ? 'p-6 md:p-8' : 'p-6 md:p-8'
                      }`}>
                      {/* Step Number - Single element that changes layout */}
                      <div className={`font-semibold transition-all duration-1000 ease-in-out text-8xl ${isActive
                          ? 'text-[#d4c7a9]'
                          : 'text-[#0f0c2b] opacity-60'
                        } ${isActive ? 'flex items-start gap-4 mb-6' : ''}`}>
                        <span>{step.number}</span>

                        {/* Step Title - Only visible when active */}
                        {isActive && (
                          <h3 className={`font-bold transition-all duration-1000 ease-in-out text-lg md:text-xl lg:text-2xl text-[#fffef5]`}>
                            {t(`process.steps.${step.number}.title`)}
                          </h3>
                        )}
                      </div>

                      {/* Step Description - Only visible when active, aligned to left */}
                      <p className={`leading-relaxed transition-all duration-1000 ease-in-out font-normal ${isActive
                          ? 'text-base md:text-lg mt-auto text-left text-[#fffef5]'
                          : 'opacity-0 h-0 overflow-hidden'
                        }`}>
                        {t(`process.steps.${step.number}.desc`)}
                      </p>
                    </CardContent>
                  </Card>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section id="pricing" className="px-4 sm:px-6 py-20">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <FadeInUp delay={0}>
              <Badge className="bg-[#0f0c2b] text-[#fffef5] mb-4">{t('pricing.badge')}</Badge>
            </FadeInUp>
            <FadeInUp delay={200}>
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-semibold text-[#0f0c2b] mb-16 break-words tracking-tighter leading-none">
                <div>{t('pricing.title.line1')}</div>
                <div>{t('pricing.title.line2')}</div>
                <div>{t('pricing.title.line3')}</div>
              </h2>
            </FadeInUp>
          </div>

          <div className="max-w-6xl mx-auto space-y-6">
            {/* Standard Package */}
            <div className="bg-[#0A062A] rounded-2xl p-6 -mx-4 sm:-mx-6">
              <div className="grid md:grid-cols-2 gap-6">
                {/* Left Column - White Rounded Box */}
                <div className="bg-white p-6 rounded-2xl shadow-lg">
                  <div>
                    <div className="flex items-center space-x-2 mb-4">
                      <div className="w-8 h-8 bg-[#0A062A] rounded-full flex items-center justify-center">
                        <Zap className="w-4 h-4 text-white" />
                      </div>
                      <span className="text-sm font-normal text-[#0A062A] bg-gray-100 px-3 py-1 rounded-full">{t('pricing.standard.title')}</span>
                    </div>

                    <div className="mb-4">
                      <div className="text-5xl font-semibold text-[#0A062A] mb-3 tracking-tight">{t('pricing.standard.price')}</div>
                      <p className="text-gray-600 text-sm leading-relaxed">
                        {t('pricing.standard.desc')}
                      </p>
                    </div>
                  </div>
                </div>

                {/* Right Column - Dark Blue Content */}
                <div className="text-white p-6 flex flex-col justify-between">
                  <div>
                    <div className="space-y-3">
                      {[
                        t('pricing.standard.features.basicWebsite'),
                        t('pricing.standard.features.maps'),
                        t('pricing.standard.features.seo'),
                        t('pricing.standard.features.scheduling'),
                        t('pricing.standard.features.responsive'),
                        t('pricing.standard.features.galleries')
                      ].map((feature) => (
                        <div key={feature} className="flex items-start space-x-3">
                          <Check className="w-5 h-5 text-white mt-0.5 flex-shrink-0" />
                          <span className="text-sm leading-relaxed font-normal tracking-normal">{feature}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  <Button className="w-full bg-white text-[#0A062A] hover:bg-gray-50 h-10 text-base font-medium rounded-full px-4 mt-4" onClick={() => window.location.href = '#contact'}>
                    {t('pricing.get.started')}
                  </Button>
                </div>
              </div>
            </div>

            {/* Custom Package */}
            <div className="bg-[#0A062A] rounded-2xl p-6 -mx-4 sm:-mx-6">
              <div className="grid md:grid-cols-2 gap-6">
                {/* Left Column - White Rounded Box */}
                <div className="bg-white p-6 rounded-2xl shadow-lg">
                  <div>
                    <div className="flex items-center space-x-2 mb-4">
                      <div className="w-8 h-8 bg-[#0A062A] rounded-full flex items-center justify-center">
                        <Plus className="w-4 h-4 text-white" />
                      </div>
                      <span className="text-sm font-normal text-[#0A062A] bg-gray-100 px-3 py-1 rounded-full">{t('pricing.custom.title')}</span>
                    </div>

                    <div className="mb-4">
                      <div className="flex items-baseline gap-2 mb-3">
                        <span className="text-sm text-gray-500">{t('pricing.custom.starting')}</span>
                        <div className="text-5xl font-semibold text-[#0A062A] tracking-tight">{t('pricing.custom.price')}</div>
                      </div>
                      <p className="text-gray-600 text-sm leading-relaxed">
                        {t('pricing.custom.desc')}
                      </p>
                    </div>
                  </div>
                </div>

                {/* Right Column - Dark Blue Content */}
                <div className="text-white p-6 flex flex-col justify-between">
                  <div>
                    <div className="space-y-3">
                      {[
                        t('pricing.custom.features.preamble'),
                        t('pricing.custom.features.analysis'),
                        t('pricing.custom.features.strategy'),
                        t('pricing.custom.features.manager'),
                        t('pricing.custom.features.checkins'),
                        t('pricing.custom.features.analytics'),
                        t('pricing.custom.features.support')
                      ].map((feature) => (
                        <div key={feature} className="flex items-start space-x-3">
                          <Check className="w-5 h-5 text-white mt-0.5 flex-shrink-0" />
                          <span className="text-sm leading-relaxed font-normal tracking-normal">{feature}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  <Button className="w-full bg-white text-[#0A062A] hover:bg-gray-50 h-10 text-base font-medium rounded-full px-4 mt-4" onClick={() => window.location.href = '#contact'}>
                    {t('pricing.get.started')}
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Forms Section */}
      <section id="contact" className="px-4 sm:px-6 pt-8 pb-20">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <FadeInUp delay={0}>
              <h2 className="text-4xl md:text-5xl font-bold text-[#0f0c2b] mb-4">
                <div>{t('contact.title.line1')}</div>
                <div>{t('contact.title.line2')}</div>
              </h2>
            </FadeInUp>
            <FadeInUp delay={200}>
              <p className="text-lg text-gray-600">
                {t('contact.subtitle')}
              </p>
            </FadeInUp>
          </div>

          <div className="bg-[#0f0c2b] rounded-3xl p-8 md:p-12">
            <div className="grid lg:grid-cols-2 gap-8">
              {/* Custom Quote Card */}
              <Card className="bg-white border-0 rounded-2xl overflow-hidden">
                <CardContent className="p-8">
                  <div className="text-center mb-6">
                    <div className="w-12 h-12 bg-[#0f0c2b] rounded-full flex items-center justify-center mx-auto mb-4">
                      <Zap className="w-6 h-6 text-white" />
                    </div>
                    <h3 className="text-2xl font-bold text-[#0f0c2b] mb-2">{t('contact.quote.title')}</h3>
                    <p className="text-gray-600 text-sm">
                      {t('contact.quote.desc')}
                    </p>
                  </div>

                  <form className="space-y-4">
                    <div className="grid grid-cols-2 gap-3">
                      <Input
                        placeholder={t('contact.form.firstName')}
                        className="bg-gray-50 border-gray-200 text-gray-900 placeholder:text-gray-500 h-11 rounded-lg focus:border-[#0f0c2b] focus:ring-[#0f0c2b] focus:bg-white transition-all"
                      />
                      <Input
                        placeholder={t('contact.form.lastName')}
                        className="bg-gray-50 border-gray-200 text-gray-900 placeholder:text-gray-500 h-11 rounded-lg focus:border-[#0f0c2b] focus:ring-[#0f0c2b] focus:bg-white transition-all"
                      />
                    </div>
                    <Input
                      placeholder={t('contact.form.email')}
                      type="email"
                      className="bg-gray-50 border-gray-200 text-gray-900 placeholder:text-gray-500 h-11 rounded-lg focus:border-[#0f0c2b] focus:ring-[#0f0c2b] focus:bg-white transition-all"
                    />
                    <Input
                      placeholder={t('contact.form.projectType')}
                      className="bg-gray-50 border-gray-200 text-gray-900 placeholder:text-gray-500 h-11 rounded-lg focus:border-[#0f0c2b] focus:ring-[#0f0c2b] focus:bg-white transition-all"
                    />
                    <Textarea
                      placeholder={t('contact.form.message')}
                      rows={3}
                      className="bg-gray-50 border-gray-200 text-gray-900 placeholder:text-gray-500 rounded-lg resize-none focus:border-[#0f0c2b] focus:ring-[#0f0c2b] focus:bg-white transition-all"
                    />
                    <Button className="w-full bg-[#0f0c2b] text-white hover:bg-[#1a1a2b] h-11 rounded-lg font-semibold transition-colors">
                      {t('contact.form.getQuote')}
                    </Button>
                  </form>
                </CardContent>
              </Card>

              {/* Support Card */}
              <Card className="bg-white border-0 rounded-2xl overflow-hidden">
                <CardContent className="p-8">
                  <div className="text-center mb-6">
                    <div className="w-12 h-12 bg-[#0f0c2b] rounded-full flex items-center justify-center mx-auto mb-4">
                      <Plus className="w-6 h-6 text-white" />
                    </div>
                    <h3 className="text-2xl font-bold text-[#0f0c2b] mb-2">{t('contact.support.title')}</h3>
                    <p className="text-gray-600 text-sm">
                      {t('contact.support.desc')}
                    </p>
                  </div>

                  <form className="space-y-4">
                    <div className="grid grid-cols-2 gap-3">
                      <Input
                        placeholder={t('contact.form.firstName')}
                        className="bg-gray-50 border-gray-200 text-gray-900 placeholder:text-gray-500 h-11 rounded-lg focus:border-[#0f0c2b] focus:ring-[#0f0c2b] focus:bg-white transition-all"
                      />
                      <Input
                        placeholder={t('contact.form.lastName')}
                        className="bg-gray-50 border-gray-200 text-gray-900 placeholder:text-gray-500 h-11 rounded-lg focus:border-[#0f0c2b] focus:ring-[#0f0c2b] focus:bg-white transition-all"
                      />
                    </div>
                    <Input
                      placeholder={t('contact.form.email')}
                      type="email"
                      className="bg-gray-50 border-gray-200 text-gray-900 placeholder:text-gray-500 h-11 rounded-lg focus:border-[#0f0c2b] focus:ring-[#0f0c2b] focus:bg-white transition-all"
                    />
                    <Input
                      placeholder={t('contact.form.subject')}
                      className="bg-gray-50 border-gray-200 text-gray-900 placeholder:text-gray-500 h-11 rounded-lg focus:border-[#0f0c2b] focus:ring-[#0f0c2b] focus:bg-white transition-all"
                    />
                    <Textarea
                      placeholder={t('contact.form.supportMessage')}
                      rows={3}
                      className="bg-gray-50 border-gray-200 text-gray-900 placeholder:text-gray-500 rounded-lg resize-none focus:border-[#0f0c2b] focus:ring-[#0f0c2b] focus:bg-white transition-all"
                    />
                    <Button className="w-full bg-[#0f0c2b] text-white hover:bg-[#1a1a2b] h-11 rounded-lg font-semibold transition-colors">
                      {t('contact.form.sendRequest')}
                    </Button>
                  </form>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-[#0f0c2b] text-[#fffef5] px-4 sm:px-6 py-12 mx-4 sm:mx-6 mb-4 rounded-3xl">
        <div className="max-w-6xl mx-auto">
          <div className="grid md:grid-cols-3 gap-8">
            <div>
              <div className="w-40 h-3  flex items-center justify-center ml-2 mb-4">
              
              <Image src="/webnique.svg" alt="WEBNIQUE" width={200} height={200} className="w-full h-auto scale-150" priority />
              </div>
              <p className="text-lg opacity-90 mb-6">
                {t('footer.tagline')}
              </p>
            </div>

            <div>
              <h4 className="font-semibold mb-4">{t('footer.quickLinks')}</h4>
              <div className="space-y-2">
                <div>
                  <a href="#services" className="hover:opacity-80 transition-opacity">
                    {t('nav.services')}
                  </a>
                </div>
                <div>
                  <a href="#statistics" className="hover:opacity-80 transition-opacity">
                    {t('nav.projects')}
                  </a>
                </div>
                <div>
                  <a href="#process" className="hover:opacity-80 transition-opacity">
                    {t('nav.process')}
                  </a>
                </div>
                <div>
                  <a href="#pricing" className="hover:opacity-80 transition-opacity">
                    {t('nav.pricing')}
                  </a>
                </div>
              </div>
            </div>

            <div>
              <h4 className="font-semibold mb-4">{t('footer.followUs')}</h4>
              <div className="space-y-2">
                <div>
                  <a href="#" className="hover:opacity-80 transition-opacity">
                    {t('footer.linkedin')}
                  </a>
                </div>
                <div>
                  <a href="#" className="hover:opacity-80 transition-opacity">
                    {t('footer.facebook')}
                  </a>
                </div>
                <div>
                  <a href="#" className="hover:opacity-80 transition-opacity">
                    {t('footer.instagram')}
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}
