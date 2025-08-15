"use client"

import { useState, useEffect, useRef } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Star, Plus, Check, Zap } from "lucide-react"
import { useProcessSteps } from "@/contexts/AppContext"

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
  const [activeService, setActiveService] = useState<string>('web-design')
  const [carouselPosition, setCarouselPosition] = useState(0)
  const carouselRef = useRef<HTMLDivElement>(null)
  const [activeProcessStep, setActiveProcessStep] = useState<number>(0)
  const [activeForm, setActiveForm] = useState<string>('quote')
  
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
          <div className="text-[#fffef5] text-2xl font-bold tracking-wide">'WEBNIQUE</div>
          <div className="hidden md:flex items-center space-x-8 text-[#fffef5]">
            <a href="#services" className="hover:opacity-80 transition-opacity">
              Services
            </a>
            <a href="#projects" className="hover:opacity-80 transition-opacity">
              Projects
            </a>
            <a href="#process" className="hover:opacity-80 transition-opacity">
              Process
            </a>
            <a href="#reviews" className="hover:opacity-80 transition-opacity">
              Reviews
            </a>
            <a href="#pricing" className="hover:opacity-80 transition-opacity">
              Pricing
            </a>
          </div>
        </div>
      </nav>

             {/* Hero Section */}
       <section className="px-4 sm:px-6 py-12 pb-48">
                  <div className="max-w-6xl mx-auto mt-16">
                <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-medium text-[#0f0c2b] leading-none mb-6 break-words tracking-tighter">
             <div>Big ideas, smart strategies,</div>
             <div>and endless creativity to</div>
                           <div className="flex items-center">
                supercharge
                <span className="inline-flex items-center mx-1 sm:mx-2 text-3xl sm:text-4xl md:text-5xl">
                  ⚡
                </span>
                your brand!
              </div>
           </h1>
                  <div className="text-base text-gray-700 mb-6 max-w-2xl font-normal">
              <div>Your go-to agency for designs that inspire and strategies</div>
              <div>that deliver. We turn ideas into lasting impressions.</div>
            </div>
                     <div className="flex items-center space-x-2">
             <div className="flex items-center">
               {[...Array(5)].map((_, i) => (
                 <Star key={i} className="w-4 h-4 fill-black text-black" />
               ))}
             </div>
             <span className="text-sm text-gray-600 font-medium">Over 200+ Five Star Reviews</span>
           </div>
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
                                           <h2 className="text-3xl sm:text-4xl md:text-5xl font-semibold text-[#0f0c2b] mb-16 break-words tracking-tighter leading-none">
             <div>Building brands, boosting businesses,</div>
             <div>and redefining possibilities.</div>
             <div>Let's grow your brand together.</div>
           </h2>

                                           <div className="grid md:grid-cols-3 gap-8">
              <div className="flex flex-col items-start">
                <div className="box-border w-full h-min flex flex-col justify-start items-start p-5 bg-[#0f0c2b] overflow-visible align-content-center flex-nowrap gap-0 relative rounded-[30px] border border-dashed border-black/40 mb-4">
                  <div className="text-7xl font-normal mb-2 text-white font-inter tracking-tighter">
                    <Counter target={20} symbol="+" />
                  </div>
                  <div className="text-xl font-normal mb-4 text-white font-inter">Projects Delivered</div>
                </div>
                                 <div className="text-gray-600 text-left max-w-xs text-sm font-normal ml-2">
                   <div>We've successfully completed over 20</div>
                   <div>projects—and we're just getting started!</div>
                 </div>
              </div>

              <div className="flex flex-col items-start">
                <div className="box-border w-full h-min flex flex-col justify-start items-start p-5 bg-[#0f0c2b] overflow-visible align-content-center flex-nowrap gap-0 relative rounded-[30px] border border-dashed border-black/40 mb-4">
                  <div className="text-7xl font-normal mb-2 text-white font-inter tracking-tighter">
                    <Counter target={70} symbol="%" />
                  </div>
                  <div className="text-xl font-normal mb-4 text-white font-inter">Business Growth</div>
                </div>
                                 <div className="text-gray-600 text-left max-w-xs text-sm font-normal ml-2">
                   <div>Our strategies have helped clients achieve</div>
                   <div>up to 70% revenue growth in just one year!</div>
                 </div>
              </div>

              <div className="flex flex-col items-start">
                <div className="box-border w-full h-min flex flex-col justify-start items-start p-5 bg-[#0f0c2b] overflow-visible align-content-center flex-nowrap gap-0 relative rounded-[30px] border border-dashed border-black/40 mb-4">
                  <div className="text-7xl font-normal mb-2 text-white font-inter tracking-tighter">
                    <Counter target={100} symbol="+" />
                  </div>
                  <div className="text-xl font-normal mb-4 text-white font-inter">Happy Clients</div>
                </div>
                                 <div className="text-gray-600 text-left max-w-xs text-sm font-normal ml-2">
                   <div>More than 100 satisfied clients</div>
                   <div>trust us to bring their ideas to life.</div>
                 </div>
              </div>
            </div>
        </div>
      </section>



      {/* Services Section */}
      <section id="services" className="px-4 sm:px-6 py-20">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <Badge className="bg-[#0f0c2b] text-[#fffef5] mb-4">Our services</Badge>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-semibold text-[#0f0c2b] mb-16 break-words tracking-tighter leading-none">
              <div>Services designed to help</div>
              <div>your brand shine brighter.</div>
            </h2>
          </div>

                    {/* Desktop Layout - Carousel with Sidebar */}
          <div className="hidden lg:grid lg:grid-cols-10 gap-8">
            {/* Left sidebar */}
            <div className="space-y-0 lg:max-w-xs lg:col-span-3">
              {[
                { title: "Web Design and Development", id: "web-design" },
                { title: "Digital Marketing", id: "digital-marketing" },
                { title: "Branding & Creative Services", id: "branding" },
                { title: "App Design & Development", id: "app-design" },
              ].map((service, index) => (
                <button
                  key={service.id}
                  onClick={() => scrollToService(service.id)}
                  className={`w-full text-left p-0.5 rounded-lg transition-colors flex items-center gap-0 font-normal cursor-pointer group ${
                    activeService === service.id 
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
            <div className="w-full lg:col-span-7 h-[1600px] overflow-hidden">
              <div 
                ref={carouselRef}
                className="h-full transition-all duration-500 ease-in-out"
              >
                <div className="space-y-8 pt-0.5">
                  {getCarouselServices().map((service, index) => {
                    const serviceData = {
                      'web-design': {
                        title: 'Web Design and Development',
                        description: 'Your website is like your digital handshake—it\'s the first thing people notice about you online. Our Web Design & Development services are all about making that handshake firm, friendly, and unforgettable.',
                        features: ['UI UX Design', 'Custom Website Design', 'E-Commerce Development', 'Website Maintenance and Support', 'SEO Integration', 'UX/UI Optimization']
                      },
                      'digital-marketing': {
                        title: 'Digital Marketing',
                        description: 'Let\'s face it, the internet is a noisy place. But with our Digital Marketing services, you won\'t just stand out—you\'ll shine. We\'ll help you show up where your customers are hanging out, whether that\'s Google, Instagram, or somewhere in between.',
                        features: ['SEO (Search Engine Optimization)', 'PPC Advertising', 'Social Media Marketing', 'Email Marketing', 'Content Marketing']
                      },
                      'branding': {
                        title: 'Branding & Creative Services',
                        description: 'Your brand is more than just a logo—it\'s the story you tell, the emotions you evoke, and the connection you build with your audience. We create memorable brand experiences that resonate and inspire action.',
                        features: ['Brand Identity Design', 'Logo Design & Brand Guidelines', 'Marketing Collateral Design', 'Social Media Graphics', 'Print Design', 'Brand Strategy']
                      },
                      'app-design': {
                        title: 'App Design & Development',
                        description: 'In today\'s mobile-first world, your app is your direct line to customers. We design and develop intuitive, powerful applications that users love to use and businesses love to own.',
                        features: ['Mobile App Design', 'iOS & Android Development', 'Cross-Platform Development', 'App Store Optimization', 'App Maintenance & Updates', 'Performance Optimization']
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
                            <span className="text-lg font-normal tracking-tight">View Details</span> 
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
                title: 'Web Design and Development',
                description: 'Your website is like your digital handshake—it\'s the first thing people notice about you online. Our Web Design & Development services are all about making that handshake firm, friendly, and unforgettable.',
                features: ['UI UX Design', 'Custom Website Design', 'E-Commerce Development', 'Website Maintenance and Support', 'SEO Integration', 'UX/UI Optimization']
              },
              {
                id: 'digital-marketing',
                title: 'Digital Marketing',
                description: 'Let\'s face it, the internet is a noisy place. But with our Digital Marketing services, you won\'t just stand out—you\'ll shine. We\'ll help you show up where your customers are hanging out, whether that\'s Google, Instagram, or somewhere in between.',
                features: ['SEO (Search Engine Optimization)', 'PPC Advertising', 'Social Media Marketing', 'Email Marketing', 'Content Marketing']
              },
              {
                id: 'branding',
                title: 'Branding & Creative Services',
                description: 'Your brand is more than just a logo—it\'s the story you tell, the emotions you evoke, and the connection you build with your audience. We create memorable brand experiences that resonate and inspire action.',
                features: ['Brand Identity Design', 'Logo Design & Brand Guidelines', 'Marketing Collateral Design', 'Social Media Graphics', 'Print Design', 'Brand Strategy']
              },
              {
                id: 'app-design',
                title: 'App Design & Development',
                description: 'In today\'s mobile-first world, your app is your direct line to customers. We design and develop intuitive, powerful applications that users love to use and businesses love to own.',
                features: ['Mobile App Design', 'iOS & Android Development', 'Cross-Platform Development', 'App Store Optimization', 'App Maintenance & Updates', 'Performance Optimization']
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
                    <span className="text-base sm:text-lg font-normal tracking-tight">View Details</span> 
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
            <Badge className="bg-[#0f0c2b] text-[#fffef5] mb-4">Our Work Process</Badge>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-[#0f0c2b] mb-4">
              <div>From idea to impact—</div>
              <div>our process makes it easy,</div>
              <div>exciting, and effective!</div>
            </h2>
          </div>

          <div className="flex gap-2 h-[500px] max-w-6xl mx-auto justify-center">
            {useProcessSteps().map((step, index) => {
              const isActive = activeProcessStep === index;
              return (
                <div 
                  key={step.id} 
                  className={`cursor-pointer transition-all duration-1000 ease-in-out ${
                    isActive ? 'w-[70%]' : 'w-[10%]'
                  }`}
                  onClick={() => setActiveProcessStep(index)}
                >
                  <Card className={`border-0 rounded-2xl transition-all duration-1000 ease-in-out h-full flex flex-col ${
                    isActive 
                      ? 'bg-[#0f0c2b] text-[#fffef5] shadow-2xl overflow-hidden' 
                      : 'bg-white text-[#0f0c2b] shadow-lg hover:shadow-xl overflow-hidden group-hover:overflow-visible'
                  }`}>
                    <CardContent className={`transition-all duration-1000 ease-in-out flex-1 flex flex-col ${
                      isActive ? 'p-6 md:p-8' : 'p-6 md:p-8'
                    }`}>
                      {/* Step Number - Single element that changes layout */}
                      <div className={`font-semibold transition-all duration-1000 ease-in-out text-8xl ${
                        isActive 
                          ? 'text-[#d4c7a9]' 
                          : 'text-[#0f0c2b] opacity-60'
                      } ${isActive ? 'flex items-start gap-4 mb-6' : ''}`}>
                        <span>{step.number}</span>
                        
                        {/* Step Title - Only visible when active */}
                        {isActive && (
                          <h3 className={`font-bold transition-all duration-1000 ease-in-out text-lg md:text-xl lg:text-2xl text-[#fffef5]`}>
                            {step.title}
                          </h3>
                        )}
                      </div>
                      
                      {/* Step Description - Only visible when active, aligned to left */}
                      <p className={`leading-relaxed transition-all duration-1000 ease-in-out font-normal ${
                        isActive 
                          ? 'text-base md:text-lg mt-auto text-left text-[#fffef5]' 
                          : 'opacity-0 h-0 overflow-hidden'
                      }`}>
                        {step.description}
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
            <Badge className="bg-[#0f0c2b] text-[#fffef5] mb-4">Pricing Plans</Badge>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-[#0f0c2b] mb-4 break-words">
              Affordable, transparent pricing tailored to your business—because every detail matters!
            </h2>
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
                        <span className="text-sm font-normal text-[#0A062A] bg-gray-100 px-3 py-1 rounded-full">Standard Package</span>
                      </div>
                      
                      <div className="mb-4">
                        <div className="text-5xl font-semibold text-[#0A062A] mb-3 tracking-tight">$999.95</div>
                        <p className="text-gray-600 text-sm leading-relaxed">
                          Small to medium-sized businesses looking to build and sustain a consistent online presence without the hassle.
                        </p>
                      </div>
                  </div>
                </div>
                
                                  {/* Right Column - Dark Blue Content */}
                  <div className="text-white p-6 flex flex-col justify-between">
                    <div>
                      <div className="space-y-3">
                        {[
                          "Basic website 3–5 pages",
                          "Google Maps integration",
                          "Basic SEO setup",
                          "Post Scheduling and Optimization",
                          "Mobile-responsive design",
                          "Photo galleries"
                        ].map((feature) => (
                          <div key={feature} className="flex items-start space-x-3">
                            <Check className="w-5 h-5 text-white mt-0.5 flex-shrink-0" />
                            <span className="text-sm leading-relaxed font-normal tracking-normal">{feature}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                    
                    <Button className="w-full bg-white text-[#0A062A] hover:bg-gray-50 h-10 text-base font-medium rounded-full px-4 mt-4">
                      Get started
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
                                              <span className="text-sm font-normal text-[#0A062A] bg-gray-100 px-3 py-1 rounded-full">Custom Package</span>
                    </div>
                    
                                          <div className="mb-4">
                        <div className="flex items-baseline gap-2 mb-3">
                          <span className="text-sm text-gray-500">Starting at</span>
                          <div className="text-5xl font-semibold text-[#0A062A] tracking-tight">$1499.99</div>
                        </div>
                        <p className="text-gray-600 text-sm leading-relaxed">
                          Businesses with unique needs that require a customized, holistic approach to their digital strategy.
                        </p>
                      </div>
                  </div>
                </div>
                
                                  {/* Right Column - Dark Blue Content */}
                  <div className="text-white p-6 flex flex-col justify-between">
                    <div>
                      <div className="space-y-3">
                        {[
                          "Everything in the basic package, plus:",
                          "Comprehensive Business Analysis",
                          "Custom Strategy Development (Marketing, SEO, Web, Branding)",
                          "Dedicated Account Manager",
                          "Monthly Check-ins & Adjustments",
                          "Advanced Analytics and Reporting",
                          "Direct Support via Email or Phone"
                        ].map((feature) => (
                          <div key={feature} className="flex items-start space-x-3">
                            <Check className="w-5 h-5 text-white mt-0.5 flex-shrink-0" />
                            <span className="text-sm leading-relaxed font-normal tracking-normal">{feature}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                    
                    <Button className="w-full bg-white text-[#0A062A] hover:bg-gray-50 h-10 text-base font-medium rounded-full px-4 mt-4">
                      Get started
                    </Button>
                  </div>  
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Forms Section */}
      <section className="px-4 sm:px-6 py-20">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-[#fffef5] mb-4">
              <div>Ready to get</div>
              <div>started?</div>
            </h2>
            <p className="text-lg md:text-xl text-[#fffef5] opacity-80">
              Choose how you'd like to connect with us
            </p>
          </div>

          {/* Form Toggle Buttons */}
          <div className="flex justify-center mb-12">
            <div className="bg-[#0f0c2b] rounded-2xl p-2 flex">
              <button
                onClick={() => setActiveForm('quote')}
                className={`px-8 py-3 rounded-xl font-semibold transition-all duration-300 ${
                  activeForm === 'quote'
                    ? 'bg-[#d4c7a9] text-[#0f0c2b] shadow-lg'
                    : 'text-[#fffef5] hover:text-[#d4c7a9]'
                }`}
              >
                Custom Quote
              </button>
              <button
                onClick={() => setActiveForm('support')}
                className={`px-8 py-3 rounded-xl font-semibold transition-all duration-300 ${
                  activeForm === 'support'
                    ? 'bg-[#d4c7a9] text-[#0f0c2b] shadow-lg'
                    : 'text-[#fffef5] hover:text-[#d4c7a9]'
                }`}
              >
                Support Request
              </button>
            </div>
          </div>

          {/* Form Container */}
          <div className="bg-[#0f0c2b] rounded-3xl p-8 md:p-12">
            {/* Custom Quote Form */}
            {activeForm === 'quote' && (
              <div className="max-w-2xl mx-auto">
                <div className="text-center mb-8">
                  <h3 className="text-3xl font-bold text-[#fffef5] mb-4">Get Your Custom Quote</h3>
                  <p className="text-[#fffef5] opacity-80">
                    Tell us about your project and we'll create a personalized solution
                  </p>
                </div>
                
                <form className="space-y-6">
                  <div className="grid md:grid-cols-2 gap-4">
                    <Input
                      placeholder="First Name"
                      className="bg-[#1a1a1a] border-[#333333] text-[#fffef5] placeholder:text-[#666666] h-12 rounded-lg focus:border-[#d4c7a9] focus:ring-[#d4c7a9]"
                    />
                    <Input
                      placeholder="Last Name"
                      className="bg-[#1a1a1a] border-[#333333] text-[#fffef5] placeholder:text-[#666666] h-12 rounded-lg focus:border-[#d4c7a9] focus:ring-[#d4c7a9]"
                    />
                  </div>
                  <div className="grid md:grid-cols-2 gap-4">
                    <Input
                      placeholder="Email"
                      type="email"
                      className="bg-[#1a1a1a] border-[#333333] text-[#fffef5] placeholder:text-[#666666] h-12 rounded-lg focus:border-[#d4c7a9] focus:ring-[#d4c7a9]"
                    />
                    <Input
                      placeholder="Phone"
                      type="tel"
                      className="bg-[#1a1a1a] border-[#333333] text-[#fffef5] placeholder:text-[#666666] h-12 rounded-lg focus:border-[#d4c7a9] focus:ring-[#d4c7a9]"
                    />
                  </div>
                  <Input
                    placeholder="Project Type"
                    className="bg-[#1a1a1a] border-[#333333] text-[#fffef5] placeholder:text-[#666666] h-12 rounded-lg focus:border-[#d4c7a9] focus:ring-[#d4c7a9]"
                  />
                  <Input
                    placeholder="Budget Range"
                    className="bg-[#1a1a1a] border-[#333333] text-[#fffef5] placeholder:text-[#666666] h-12 rounded-lg focus:border-[#d4c7a9] focus:ring-[#d4c7a9]"
                  />
                  <Textarea
                    placeholder="Tell us about your project..."
                    rows={5}
                    className="bg-[#1a1a1a] border-[#333333] text-[#fffef5] placeholder:text-[#666666] rounded-lg resize-none focus:border-[#d4c7a9] focus:ring-[#d4c7a9]"
                  />
                  <Button className="w-full bg-[#d4c7a9] text-[#0f0c2b] hover:bg-[#c4b799] h-12 rounded-lg font-semibold text-lg transition-colors">
                    Get Custom Quote
                  </Button>
                </form>
              </div>
            )}

            {/* Support Form */}
            {activeForm === 'support' && (
              <div className="max-w-2xl mx-auto">
                <div className="text-center mb-8">
                  <h3 className="text-3xl font-bold text-[#fffef5] mb-4">Need Support?</h3>
                  <p className="text-[#fffef5] opacity-80">
                    We're here to help you get back on track
                  </p>
                </div>
                
                <form className="space-y-6">
                  <div className="grid md:grid-cols-2 gap-4">
                    <Input
                      placeholder="Name"
                      className="bg-[#1a1a1a] border-[#333333] text-[#fffef5] placeholder:text-[#666666] h-12 rounded-lg focus:border-[#d4c7a9] focus:ring-[#d4c7a9]"
                    />
                    <Input
                      placeholder="Email"
                      type="email"
                      className="bg-[#1a1a1a] border-[#333333] text-[#fffef5] placeholder:text-[#666666] h-12 rounded-lg focus:border-[#d4c7a9] focus:ring-[#d4c7a9]"
                    />
                  </div>
                  <Input
                    placeholder="Subject"
                    className="bg-[#1a1a1a] border-[#333333] text-[#fffef5] placeholder:text-[#666666] h-12 rounded-lg focus:border-[#d4c7a9] focus:ring-[#d4c7a9]"
                  />
                  <div className="grid md:grid-cols-2 gap-4">
                    <Input
                      placeholder="Priority"
                      className="bg-[#1a1a1a] border-[#333333] text-[#fffef5] placeholder:text-[#666666] h-12 rounded-lg focus:border-[#d4c7a9] focus:ring-[#d4c7a9]"
                    />
                    <Input
                      placeholder="Website URL (if applicable)"
                      className="bg-[#1a1a1a] border-[#333333] text-[#fffef5] placeholder:text-[#666666] h-12 rounded-lg focus:border-[#d4c7a9] focus:ring-[#d4c7a9]"
                    />
                  </div>
                  <Textarea
                    placeholder="Describe your issue or question..."
                    rows={6}
                    className="bg-[#1a1a1a] border-[#333333] text-[#fffef5] placeholder:text-[#666666] rounded-lg resize-none focus:border-[#d4c7a9] focus:ring-[#d4c7a9]"
                  />
                  <Button className="w-full bg-[#d4c7a9] text-[#0f0c2b] hover:bg-[#c4b799] h-12 rounded-lg font-semibold text-lg transition-colors">
                    Send Support Request
                  </Button>
                </form>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-[#0f0c2b] text-[#fffef5] px-4 sm:px-6 py-12 rounded-t-3xl">
        <div className="max-w-6xl mx-auto">
          <div className="grid md:grid-cols-3 gap-8">
            <div>
              <div className="text-3xl font-bold mb-4">'WEBNIQUE</div>
              <p className="text-lg opacity-90 mb-6">
                The next big thing starts here—drop us a line and let's get creating!
              </p>
            </div>

            <div>
              <h4 className="font-semibold mb-4">Quick Links</h4>
              <div className="space-y-2">
                <div>
                  <a href="#" className="hover:opacity-80 transition-opacity">
                    Home
                  </a>
                </div>
                <div>
                  <a href="#" className="hover:opacity-80 transition-opacity">
                    Benefits
                  </a>
                </div>
                <div>
                  <a href="#" className="hover:opacity-80 transition-opacity">
                    Portfolio
                  </a>
                </div>
                <div>
                  <a href="#" className="hover:opacity-80 transition-opacity">
                    Reviews
                  </a>
                </div>
                <div>
                  <a href="#" className="hover:opacity-80 transition-opacity">
                    About
                  </a>
                </div>
              </div>
            </div>

            <div>
              <h4 className="font-semibold mb-4">Follow Us</h4>
              <div className="space-y-2">
                <div>
                  <a href="#" className="hover:opacity-80 transition-opacity">
                    LinkedIn
                  </a>
                </div>
                <div>
                  <a href="#" className="hover:opacity-80 transition-opacity">
                    Facebook
                  </a>
                </div>
                <div>
                  <a href="#" className="hover:opacity-80 transition-opacity">
                    Instagram
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
