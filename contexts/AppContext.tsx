"use client"

import React, { createContext, useContext, useReducer, ReactNode } from 'react'

// Types
export interface AppState {
  isMobileMenuOpen: boolean
  activeSection: string
  portfolioFilter: string
  portfolioItems: PortfolioItem[]
  statistics: Statistic[]
  services: Service[]
  processSteps: ProcessStep[]
  showModal: boolean
  selectedService: Service | null
  activeForm: string
  formData: {
    quote: QuoteFormData
    support: SupportFormData
  }
}

export interface QuoteFormData {
  firstName: string
  lastName: string
  email: string
  phone: string
  projectType: string
  budgetRange: string
  projectDescription: string
}

export interface SupportFormData {
  name: string
  email: string
  subject: string
  priority: string
  websiteUrl: string
  issueDescription: string
}

export interface PortfolioItem {
  id: string
  title: string
  category: string
  image: string
  description: string
  aspectRatio: string
  colSpan?: string
}

export interface Statistic {
  id: string
  number: number
  symbol: string
  title: string
  description: string
}

export interface Service {
  id: string
  title: string
  description: string
  features: string[]
}

export interface ProcessStep {
  id: string
  number: number
  title: string
  description: string
}

// Action types
type AppAction =
  | { type: 'TOGGLE_MOBILE_MENU' }
  | { type: 'SET_ACTIVE_SECTION'; payload: string }
  | { type: 'SET_PORTFOLIO_FILTER'; payload: string }
  | { type: 'OPEN_MODAL'; payload: Service }
  | { type: 'CLOSE_MODAL' }
  | { type: 'SET_ACTIVE_FORM'; payload: string }
  | { type: 'UPDATE_QUOTE_FORM'; payload: Partial<QuoteFormData> }
  | { type: 'UPDATE_SUPPORT_FORM'; payload: Partial<SupportFormData> }
  | { type: 'RESET_QUOTE_FORM' }
  | { type: 'RESET_SUPPORT_FORM' }
  | { type: 'RESET_ALL_FORMS' }

// Initial state
const initialState: AppState = {
  isMobileMenuOpen: false,
  activeSection: 'home',
  portfolioFilter: 'all',
  showModal: false,
  selectedService: null,
  activeForm: 'quote',
  formData: {
    quote: {
      firstName: '',
      lastName: '',
      email: '',
      phone: '',
      projectType: '',
      budgetRange: '',
      projectDescription: ''
    },
    support: {
      name: '',
      email: '',
      subject: '',
      priority: '',
      websiteUrl: '',
      issueDescription: ''
    }
  },
  // Updated Portfolio Items - Now using video and images for Section 2
  portfolioItems: [
    {
      id: '1',
      title: 'Left Column Image',
      category: 'image',
      image: '/leftcol.avif',
      description: 'Left column image for portfolio showcase',
      aspectRatio: 'aspect-auto',
      colSpan: 'col-span-1'
    },
    {
      id: '2',
      title: 'Center Video',
      category: 'video',
      image: '/section2vid.mp4',
      description: 'Center video for portfolio showcase',
      aspectRatio: 'aspect-auto',
      colSpan: 'col-span-1'
    },
    {
      id: '3',
      title: 'Right Column Image',
      category: 'image',
      image: '/rightcol.avif',
      description: 'Right column image for portfolio showcase',
      aspectRatio: 'aspect-auto',
      colSpan: 'col-span-1'
    }
  ],
  // Updated Statistics with counter animation targets
  statistics: [
    {
      id: '1',
      number: 20,
      symbol: '+',
      title: 'Projects Delivered',
      description: 'We\'ve successfully completed over 20 projects—and we\'re just getting started!'
    },
    {
      id: '2',
      number: 70,
      symbol: '%',
      title: 'Business Growth',
      description: 'Our strategies have helped clients achieve up to 70% revenue growth in just one year!'
    },
    {
      id: '3',
      number: 100,
      symbol: '+',
      title: 'Happy Clients',
      description: 'More than 100 satisfied clients trust us to bring their ideas to life.'
    }
  ],
  // Updated Services with complete content
  services: [
    {
      id: '1',
      title: 'Web Design and Development',
      description: 'Your website is like your digital handshake—it\'s the first thing people notice about you online. Our Web Design & Development services are all about making that handshake firm, friendly, and unforgettable.',
      features: [
        'UI UX Design',
        'Custom Website Design',
        'E-Commerce Development',
        'Website Maintenance and Support',
        'SEO Integration',
        'UX/UI Optimization'
      ]
    },
    {
      id: '2',
      title: 'Digital Marketing',
      description: 'Let\'s face it, the internet is a noisy place. But with our Digital Marketing services, you won\'t just stand out—you\'ll shine. We\'ll help you show up where your customers are hanging out, whether that\'s Google, Instagram, or somewhere in between.',
      features: [
        'SEO (Search Engine Optimization)',
        'PPC Advertising',
        'Social Media Marketing',
        'Email Marketing',
        'Content Marketing'
      ]
    },
    {
      id: '3',
      title: 'Branding & Creative Services',
      description: 'Your brand is more than just a logo—it\'s the story you tell, the emotions you evoke, and the connection you build with your audience. We create memorable brand experiences that resonate and inspire action.',
      features: [
        'Brand Identity Design',
        'Logo Design & Brand Guidelines',
        'Marketing Collateral Design',
        'Social Media Graphics',
        'Print Design',
        'Brand Strategy'
      ]
    },
    {
      id: '4',
      title: 'App Design & Development',
      description: 'In today\'s mobile-first world, your app is your direct line to customers. We design and develop intuitive, powerful applications that users love to use and businesses love to own.',
      features: [
        'Mobile App Design',
        'iOS & Android Development',
        'Cross-Platform Development',
        'App Store Optimization',
        'App Maintenance & Updates',
        'Performance Optimization'
      ]
    }
  ],
  // Process Steps
  processSteps: [
    {
      id: '1',
      number: 1,
      title: 'Discover & Strategize',
      description: 'We dive deep into understanding your brand, goals, and audience. Through collaborative discussions and research, we craft a clear roadmap tailored to your needs.'
    },
    {
      id: '2',
      number: 2,
      title: 'Design & Develop',
      description: 'Our creative team brings your vision to life with stunning designs and robust development, ensuring every detail aligns with your brand identity.'
    },
    {
      id: '3',
      number: 3,
      title: 'Launch & Optimize',
      description: 'We launch your project with precision and continue optimizing based on performance data and user feedback to ensure maximum impact.'
    },
    {
      id: '4',
      number: 4,
      title: 'Maintain & Scale',
      description: 'We provide ongoing support and maintenance to ensure your project continues to perform at its best, while helping you scale and grow your business.'
    }
  ]
}

// Reducer
function appReducer(state: AppState, action: AppAction): AppState {
  switch (action.type) {
    case 'TOGGLE_MOBILE_MENU':
      return {
        ...state,
        isMobileMenuOpen: !state.isMobileMenuOpen
      }
    case 'SET_ACTIVE_SECTION':
      return {
        ...state,
        activeSection: action.payload
      }
    case 'SET_PORTFOLIO_FILTER':
      return {
        ...state,
        portfolioFilter: action.payload
      }
    case 'SET_ACTIVE_FORM':
      return {
        ...state,
        activeForm: action.payload
      }
    case 'UPDATE_QUOTE_FORM':
      return {
        ...state,
        formData: {
          ...state.formData,
          quote: {
            ...state.formData.quote,
            ...action.payload
          }
        }
      }
    case 'UPDATE_SUPPORT_FORM':
      return {
        ...state,
        formData: {
          ...state.formData,
          support: {
            ...state.formData.support,
            ...action.payload
          }
        }
      }
    case 'RESET_QUOTE_FORM':
      return {
        ...state,
        formData: {
          ...state.formData,
          quote: {
            firstName: '',
            lastName: '',
            email: '',
            phone: '',
            projectType: '',
            budgetRange: '',
            projectDescription: ''
          }
        }
      }
    case 'RESET_SUPPORT_FORM':
      return {
        ...state,
        formData: {
          ...state.formData,
          support: {
            name: '',
            email: '',
            subject: '',
            priority: '',
            websiteUrl: '',
            issueDescription: ''
          }
        }
      }
    case 'RESET_ALL_FORMS':
      return {
        ...state,
        formData: {
          quote: {
            firstName: '',
            lastName: '',
            email: '',
            phone: '',
            projectType: '',
            budgetRange: '',
            projectDescription: ''
          },
          support: {
            name: '',
            email: '',
            subject: '',
            priority: '',
            websiteUrl: '',
            issueDescription: ''
          }
        }
      }
    default:
      return state
  }
}

// Context
const AppContext = createContext<{
  state: AppState
  dispatch: React.Dispatch<AppAction>
} | undefined>(undefined)

// Provider component
export function AppProvider({ children }: { children: ReactNode }) {
  const [state, dispatch] = useReducer(appReducer, initialState)

  return (
    <AppContext.Provider value={{ state, dispatch }}>
      {children}
    </AppContext.Provider>
  )
}

// Custom hooks
export function useApp() {
  const context = useContext(AppContext)
  if (context === undefined) {
    throw new Error('useApp must be used within an AppProvider')
  }
  return context
}

export function useAppState() {
  const { state } = useApp()
  return state
}

export function useAppDispatch() {
  const { dispatch } = useApp()
  return dispatch
}

// Helper functions
export function useMobileMenu() {
  const { state, dispatch } = useApp()
  
  const toggleMobileMenu = () => {
    dispatch({ type: 'TOGGLE_MOBILE_MENU' })
  }
  
  return {
    isOpen: state.isMobileMenuOpen,
    toggle: toggleMobileMenu
  }
}

export function useActiveSection() {
  const { state, dispatch } = useApp()
  
  const setActiveSection = (section: string) => {
    dispatch({ type: 'SET_ACTIVE_SECTION', payload: section })
  }
  
  return {
    activeSection: state.activeSection,
    setActiveSection
  }
}

export function usePortfolioFilter() {
  const { state, dispatch } = useApp()
  
  const setPortfolioFilter = (filter: string) => {
    dispatch({ type: 'SET_PORTFOLIO_FILTER', payload: filter })
  }
  
  const filteredPortfolioItems = state.portfolioItems.filter(item => 
    state.portfolioFilter === 'all' || item.category === state.portfolioFilter
  )
  
  return {
    filter: state.portfolioFilter,
    setFilter: setPortfolioFilter,
    items: filteredPortfolioItems,
    allItems: state.portfolioItems
  }
}

export function useStatistics() {
  const { state } = useApp()
  return state.statistics
}

export function useServices() {
  const { state } = useApp()
  return state.services
}

export function useProcessSteps() {
  const { state } = useApp()
  return state.processSteps
}

export function useFormState() {
  const { state, dispatch } = useApp()
  
  const setActiveForm = (form: string) => {
    dispatch({ type: 'SET_ACTIVE_FORM', payload: form })
  }
  
  const updateQuoteForm = (data: Partial<QuoteFormData>) => {
    dispatch({ type: 'UPDATE_QUOTE_FORM', payload: data })
  }
  
  const updateSupportForm = (data: Partial<SupportFormData>) => {
    dispatch({ type: 'UPDATE_SUPPORT_FORM', payload: data })
  }
  
  const resetQuoteForm = () => {
    dispatch({ type: 'RESET_QUOTE_FORM' })
  }
  
  const resetSupportForm = () => {
    dispatch({ type: 'RESET_SUPPORT_FORM' })
  }
  
  const resetAllForms = () => {
    dispatch({ type: 'RESET_ALL_FORMS' })
  }
  
  return {
    activeForm: state.activeForm,
    formData: state.formData,
    setActiveForm,
    updateQuoteForm,
    updateSupportForm,
    resetQuoteForm,
    resetSupportForm,
    resetAllForms
  }
}
