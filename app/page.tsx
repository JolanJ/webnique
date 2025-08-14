"use client"

import { useState, useEffect, useRef } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Star, Plus, Check, Zap } from "lucide-react"

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
  const [expandedService, setExpandedService] = useState<string | null>(null)

  const toggleService = (service: string) => {
    setExpandedService(expandedService === service ? null : service)
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
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-[#0f0c2b] mb-4 break-words">
              Services designed to help your brand shine brighter.
            </h2>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            {/* Left sidebar */}
            <div className="space-y-4">
              {[
                "Web Design and Development",
                "Digital Marketing",
                "Branding & Creative Services",
                "App Design & Development",
              ].map((service, index) => (
                <button
                  key={service}
                  onClick={() => toggleService(service)}
                  className={`w-full text-left p-4 rounded-lg transition-colors ${
                    expandedService === service ? "bg-gray-200" : "bg-gray-100 hover:bg-gray-200"
                  }`}
                >
                  {service}
                </button>
              ))}
            </div>

            {/* Right content */}
            <div className="space-y-6">
              {expandedService === "Web Design and Development" && (
                <Card className="bg-[#0f0c2b] text-[#fffef5] border-0">
                  <CardContent className="p-8">
                    <h3 className="text-2xl font-bold mb-4">Web Design and Development</h3>
                    <p className="mb-6 opacity-90">
                      Your website is like your digital handshake—it's the first thing people notice about you online.
                      Our Web Design & Development services are all about making that handshake firm, friendly, and
                      unforgettable.
                    </p>
                    <div className="grid grid-cols-2 gap-4 mb-6">
                      <div className="flex items-center space-x-2">
                        <Check className="w-4 h-4" />
                        <span className="text-sm">UI UX Design</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Check className="w-4 h-4" />
                        <span className="text-sm">Custom Website Design</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Check className="w-4 h-4" />
                        <span className="text-sm">E-Commerce Development</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Check className="w-4 h-4" />
                        <span className="text-sm">Website Maintenance and Support</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Check className="w-4 h-4" />
                        <span className="text-sm">SEO Integration</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Check className="w-4 h-4" />
                        <span className="text-sm">UX/UI Optimization</span>
                      </div>
                    </div>
                    <Button className="bg-[#fffef5] text-[#0f0c2b] hover:bg-white">
                      View Details <Plus className="w-4 h-4 ml-2" />
                    </Button>
                  </CardContent>
                </Card>
              )}

              {expandedService === "Digital Marketing" && (
                <Card className="bg-[#0f0c2b] text-[#fffef5] border-0">
                  <CardContent className="p-8">
                    <h3 className="text-2xl font-bold mb-4">Digital Marketing</h3>
                    <p className="mb-6 opacity-90">
                      Let's face it, the internet is a noisy place. But with our Digital Marketing services, you won't
                      just stand out—you'll shine. We'll help you show up where your customers are hanging out, whether
                      that's Google, Instagram, or somewhere in between.
                    </p>
                    <div className="grid grid-cols-2 gap-4 mb-6">
                      <div className="flex items-center space-x-2">
                        <Check className="w-4 h-4" />
                        <span className="text-sm">SEO (Search Engine Optimization)</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Check className="w-4 h-4" />
                        <span className="text-sm">PPC Advertising</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Check className="w-4 h-4" />
                        <span className="text-sm">Social Media Marketing</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Check className="w-4 h-4" />
                        <span className="text-sm">Email Marketing</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Check className="w-4 h-4" />
                        <span className="text-sm">Content Marketing</span>
                      </div>
                    </div>
                    <Button className="bg-[#fffef5] text-[#0f0c2b] hover:bg-white">
                      View Details <Plus className="w-4 h-4 ml-2" />
                    </Button>
                  </CardContent>
                </Card>
              )}

              {!expandedService && (
                <div className="text-center py-20 text-gray-500">Select a service to view details</div>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Process Section */}
      <section id="process" className="px-4 sm:px-6 py-20">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <Badge className="bg-[#0f0c2b] text-[#fffef5] mb-4">Our Work Process</Badge>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-[#0f0c2b] mb-4 break-words">
              From idea to impact—our process makes it easy, exciting, and effective!
            </h2>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <Card className="bg-[#0f0c2b] text-[#fffef5] border-0">
              <CardContent className="p-8">
                <div className="text-6xl font-bold text-[#fffef5] opacity-20 mb-4">1</div>
                <h3 className="text-2xl font-bold mb-4">Discover & Strategize</h3>
                <p className="opacity-90">
                  We dive deep into understanding your brand, goals, and audience. Through collaborative discussions and
                  research, we craft a clear roadmap tailored to your needs.
                </p>
              </CardContent>
            </Card>

            <Card className="bg-gray-100 border-0">
              <CardContent className="p-8">
                <div className="text-6xl font-bold text-[#0f0c2b] opacity-20 mb-4">2</div>
                <h3 className="text-2xl font-bold text-[#0f0c2b] mb-4">Design & Develop</h3>
                <p className="text-gray-600">
                  Our creative team brings your vision to life with stunning designs and robust development, ensuring
                  every detail aligns with your brand identity.
                </p>
              </CardContent>
            </Card>

            <Card className="bg-gray-100 border-0">
              <CardContent className="p-8">
                <div className="text-6xl font-bold text-[#0f0c2b] opacity-20 mb-4">3</div>
                <h3 className="text-2xl font-bold text-[#0f0c2b] mb-4">Launch & Optimize</h3>
                <p className="text-gray-600">
                  We launch your project with precision and continue optimizing based on performance data and user
                  feedback to ensure maximum impact.
                </p>
              </CardContent>
            </Card>
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

          <div className="grid md:grid-cols-2 gap-8">
            <Card className="bg-[#0f0c2b] text-[#fffef5] border-0">
              <CardContent className="p-8">
                <div className="flex items-center space-x-3 mb-6">
                  <div className="w-8 h-8 bg-[#fffef5] rounded-full flex items-center justify-center">
                    <Zap className="w-4 h-4 text-[#0f0c2b]" />
                  </div>
                  <span className="font-semibold">Marketing Momentum</span>
                </div>

                <div className="mb-6">
                  <div className="text-5xl font-bold mb-2">$1K</div>
                  <p className="opacity-90">
                    Small to medium-sized businesses looking to build and sustain a consistent online presence without
                    the hassle.
                  </p>
                </div>

                <div className="space-y-3 mb-8">
                  {[
                    "Social Media Management (3 platforms, 12 posts/month)",
                    "Monthly Email Marketing Campaign (up to 3 campaigns)",
                    "Blog Content Creation (2 articles/month)",
                    "Basic Analytics Report with Actionable Insights",
                    "Post Scheduling and Optimization",
                    "Quarterly Competitor Analysis",
                    "Engagement Monitoring and Response (comments and messages)",
                  ].map((feature) => (
                    <div key={feature} className="flex items-start space-x-2">
                      <Check className="w-4 h-4 mt-1 flex-shrink-0" />
                      <span className="text-sm">{feature}</span>
                    </div>
                  ))}
                </div>

                <Button className="w-full bg-[#fffef5] text-[#0f0c2b] hover:bg-white">Get started</Button>
              </CardContent>
            </Card>

            <Card className="bg-[#0f0c2b] text-[#fffef5] border-0">
              <CardContent className="p-8">
                <div className="flex items-center space-x-3 mb-6">
                  <div className="w-8 h-8 bg-[#fffef5] rounded-full flex items-center justify-center">
                    <Plus className="w-4 h-4 text-[#0f0c2b]" />
                  </div>
                  <span className="font-semibold">Custom Package</span>
                </div>

                <div className="mb-6">
                  <div className="text-sm opacity-75 mb-1">Starting at</div>
                  <div className="text-5xl font-bold mb-2">$1.5K</div>
                  <p className="opacity-90">
                    Businesses with unique needs that require a customized, holistic approach to their digital strategy.
                  </p>
                </div>

                <div className="space-y-3 mb-8">
                  {[
                    "Comprehensive Business Analysis",
                    "Custom Strategy Development (Marketing, SEO, Web, Branding)",
                    "Dedicated Account Manager",
                    "Monthly Check-ins & Adjustments",
                    "Advanced Analytics and Reporting",
                    "Campaign Management for Paid Ads (Google, Facebook, Instagram)",
                    "Personalized Training for Your Team",
                    "Direct Support via Email or Phone",
                  ].map((feature) => (
                    <div key={feature} className="flex items-start space-x-2">
                      <Check className="w-4 h-4 mt-1 flex-shrink-0" />
                      <span className="text-sm">{feature}</span>
                    </div>
                  ))}
                </div>

                <Button className="w-full bg-[#fffef5] text-[#0f0c2b] hover:bg-white">Get started</Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section className="px-4 sm:px-6 py-20">
        <div className="max-w-6xl mx-auto">
          <div className="bg-[#d4c7a9] rounded-3xl p-6 sm:p-8 md:p-12">
            <div className="grid md:grid-cols-2 gap-8">
              <div className="bg-[#0f0c2b] rounded-3xl p-8 md:p-12 text-[#fffef5]">
                <h2 className="text-4xl md:text-5xl font-bold mb-6">Need a custom quote?</h2>
                <p className="text-lg md:text-xl opacity-90">
                  Don't let your ideas sit idle—slide into our inbox and let's make magic!
                </p>
              </div>

              <div className="bg-[#0a0a0a] rounded-3xl p-8 md:p-12">
                <form className="space-y-6">
                  <Input
                    placeholder="Name"
                    className="bg-[#1a1a1a] border-[#333333] text-[#999999] placeholder:text-[#666666] h-12 rounded-lg"
                  />
                  <div className="grid grid-cols-2 gap-4">
                    <Input
                      placeholder="Email"
                      className="bg-[#1a1a1a] border-[#333333] text-[#999999] placeholder:text-[#666666] h-12 rounded-lg"
                    />
                    <Input
                      placeholder="Phone"
                      className="bg-[#1a1a1a] border-[#333333] text-[#999999] placeholder:text-[#666666] h-12 rounded-lg"
                    />
                  </div>
                  <Input
                    placeholder="Enter Subject"
                    className="bg-[#1a1a1a] border-[#333333] text-[#999999] placeholder:text-[#666666] h-12 rounded-lg"
                  />
                  <Input
                    placeholder="Your Budget"
                    className="bg-[#1a1a1a] border-[#333333] text-[#999999] placeholder:text-[#666666] h-12 rounded-lg"
                  />
                  <Textarea
                    placeholder="Enter your Message"
                    rows={6}
                    className="bg-[#1a1a1a] border-[#333333] text-[#999999] placeholder:text-[#666666] rounded-lg resize-none"
                  />
                  <Button className="w-full bg-[#0f0c2b] text-[#fffef5] hover:bg-[#1a1540] h-12 rounded-lg font-medium">
                    Submit
                  </Button>
                </form>
              </div>
            </div>
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
