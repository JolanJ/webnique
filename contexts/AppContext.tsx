"use client"

import React, { createContext, useContext, useReducer, ReactNode } from 'react'

// Types
interface ContactFormData {
  name: string
  email: string
  phone: string
  subject: string
  budget: string
  message: string
}

interface PortfolioItem {
  id: string
  title: string
  category: string
  image: string
  description: string
  aspectRatio?: string
  colSpan?: string
}

interface StatisticItem {
  id: string
  number: string
  title: string
  description: string
}

interface ServiceItem {
  id: string
  title: string
  description: string
  features: string[]
}

interface AppState {
  // Theme
  theme: 'light' | 'dark'
  
  // Contact Form
  contactForm: ContactFormData
  isContactFormSubmitting: boolean
  contactFormSubmitted: boolean
  
  // Services
  selectedService: string | null
  expandedService: string | null
  
  // Navigation
  isMobileMenuOpen: boolean
  activeSection: string
  
  // Portfolio
  portfolioFilter: string
  portfolioItems: PortfolioItem[]
  
  // Statistics
  statistics: StatisticItem[]
  
  // Services Data
  services: ServiceItem[]
  
  // UI State
  isLoading: boolean
  notifications: Array<{
    id: string
    type: 'success' | 'error' | 'info' | 'warning'
    message: string
    duration?: number
  }>
}

// Initial State
const initialState: AppState = {
  theme: 'light',
  contactForm: {
    name: '',
    email: '',
    phone: '',
    subject: '',
    budget: '',
    message: ''
  },
  isContactFormSubmitting: false,
  contactFormSubmitted: false,
  selectedService: null,
  expandedService: null,
  isMobileMenuOpen: false,
  activeSection: 'home',
  portfolioFilter: 'all',
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
      number: '20+',
      title: 'Projects Delivered',
      description: 'We\'ve successfully completed over 20 projects—and we\'re just getting started!'
    },
    {
      id: '2',
      number: '70%',
      title: 'Business Growth',
      description: 'Our strategies have helped clients achieve up to 70% revenue growth in just one year!'
    },
    {
      id: '3',
      number: '100+',
      title: 'Happy Clients',
      description: 'More than 100 satisfied clients trust us to bring their ideas to life.'
    }
  ],
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
      description: 'Your brand is more than just a logo—it\'s the story you tell and the impression you leave. We help you craft a brand identity that resonates with your audience and sets you apart from the competition.',
      features: [
        'Logo Design',
        'Brand Identity',
        'Visual Design',
        'Marketing Materials',
        'Brand Guidelines'
      ]
    },
    {
      id: '4',
      title: 'App Design & Development',
      description: 'In today\'s mobile-first world, having a great app can be the difference between success and obscurity. We create intuitive, powerful apps that users love to use.',
      features: [
        'Mobile App Design',
        'iOS Development',
        'Android Development',
        'Cross-Platform Development',
        'App Maintenance'
      ]
    }
  ],
  isLoading: false,
  notifications: []
}

// Action Types
type AppAction =
  | { type: 'SET_THEME'; payload: 'light' | 'dark' }
  | { type: 'UPDATE_CONTACT_FORM'; payload: Partial<ContactFormData> }
  | { type: 'SET_CONTACT_FORM_SUBMITTING'; payload: boolean }
  | { type: 'SET_CONTACT_FORM_SUBMITTED'; payload: boolean }
  | { type: 'RESET_CONTACT_FORM' }
  | { type: 'SET_SELECTED_SERVICE'; payload: string | null }
  | { type: 'SET_EXPANDED_SERVICE'; payload: string | null }
  | { type: 'TOGGLE_MOBILE_MENU' }
  | { type: 'SET_MOBILE_MENU_OPEN'; payload: boolean }
  | { type: 'SET_ACTIVE_SECTION'; payload: string }
  | { type: 'SET_PORTFOLIO_FILTER'; payload: string }
  | { type: 'SET_LOADING'; payload: boolean }
  | { type: 'ADD_NOTIFICATION'; payload: Omit<AppState['notifications'][0], 'id'> }
  | { type: 'REMOVE_NOTIFICATION'; payload: string }

// Reducer
function appReducer(state: AppState, action: AppAction): AppState {
  switch (action.type) {
    case 'SET_THEME':
      return {
        ...state,
        theme: action.payload
      }
    
    case 'UPDATE_CONTACT_FORM':
      return {
        ...state,
        contactForm: {
          ...state.contactForm,
          ...action.payload
        }
      }
    
    case 'SET_CONTACT_FORM_SUBMITTING':
      return {
        ...state,
        isContactFormSubmitting: action.payload
      }
    
    case 'SET_CONTACT_FORM_SUBMITTED':
      return {
        ...state,
        contactFormSubmitted: action.payload
      }
    
    case 'RESET_CONTACT_FORM':
      return {
        ...state,
        contactForm: initialState.contactForm,
        contactFormSubmitted: false
      }
    
    case 'SET_SELECTED_SERVICE':
      return {
        ...state,
        selectedService: action.payload
      }
    
    case 'SET_EXPANDED_SERVICE':
      return {
        ...state,
        expandedService: action.payload
      }
    
    case 'TOGGLE_MOBILE_MENU':
      return {
        ...state,
        isMobileMenuOpen: !state.isMobileMenuOpen
      }
    
    case 'SET_MOBILE_MENU_OPEN':
      return {
        ...state,
        isMobileMenuOpen: action.payload
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
    
    case 'SET_LOADING':
      return {
        ...state,
        isLoading: action.payload
      }
    
    case 'ADD_NOTIFICATION':
      const newNotification = {
        ...action.payload,
        id: Date.now().toString()
      }
      return {
        ...state,
        notifications: [...state.notifications, newNotification]
      }
    
    case 'REMOVE_NOTIFICATION':
      return {
        ...state,
        notifications: state.notifications.filter(n => n.id !== action.payload)
      }
    
    default:
      return state
  }
}

// Context
interface AppContextType {
  state: AppState
  dispatch: React.Dispatch<AppAction>
  
  // Helper functions
  updateContactForm: (data: Partial<ContactFormData>) => void
  submitContactForm: () => Promise<void>
  resetContactForm: () => void
  toggleService: (service: string) => void
  setActiveSection: (section: string) => void
  filterPortfolio: (filter: string) => void
  addNotification: (notification: Omit<AppState['notifications'][0], 'id'>) => void
  removeNotification: (id: string) => void
  toggleTheme: () => void
  toggleMobileMenu: () => void
  setMobileMenuOpen: (open: boolean) => void
}

const AppContext = createContext<AppContextType | undefined>(undefined)

// Provider Component
interface AppProviderProps {
  children: ReactNode
}

export function AppProvider({ children }: AppProviderProps) {
  const [state, dispatch] = useReducer(appReducer, initialState)

  // Helper functions
  const updateContactForm = (data: Partial<ContactFormData>) => {
    dispatch({ type: 'UPDATE_CONTACT_FORM', payload: data })
  }

  const submitContactForm = async () => {
    dispatch({ type: 'SET_CONTACT_FORM_SUBMITTING', payload: true })
    
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 2000))
      
      dispatch({ type: 'SET_CONTACT_FORM_SUBMITTED', payload: true })
      dispatch({ type: 'ADD_NOTIFICATION', payload: {
        type: 'success',
        message: 'Thank you! Your message has been sent successfully.',
        duration: 5000
      }})
      
      // Reset form after 3 seconds
      setTimeout(() => {
        dispatch({ type: 'RESET_CONTACT_FORM' })
      }, 3000)
      
    } catch (error) {
      dispatch({ type: 'ADD_NOTIFICATION', payload: {
        type: 'error',
        message: 'Sorry, something went wrong. Please try again.',
        duration: 5000
      }})
    } finally {
      dispatch({ type: 'SET_CONTACT_FORM_SUBMITTING', payload: false })
    }
  }

  const resetContactForm = () => {
    dispatch({ type: 'RESET_CONTACT_FORM' })
  }

  const toggleService = (service: string) => {
    const newService = state.expandedService === service ? null : service
    dispatch({ type: 'SET_EXPANDED_SERVICE', payload: newService })
  }

  const setActiveSection = (section: string) => {
    dispatch({ type: 'SET_ACTIVE_SECTION', payload: section })
  }

  const filterPortfolio = (filter: string) => {
    dispatch({ type: 'SET_PORTFOLIO_FILTER', payload: filter })
  }

  const addNotification = (notification: Omit<AppState['notifications'][0], 'id'>) => {
    dispatch({ type: 'ADD_NOTIFICATION', payload: notification })
  }

  const removeNotification = (id: string) => {
    dispatch({ type: 'REMOVE_NOTIFICATION', payload: id })
  }

  const toggleTheme = () => {
    const newTheme = state.theme === 'light' ? 'dark' : 'light'
    dispatch({ type: 'SET_THEME', payload: newTheme })
  }

  const toggleMobileMenu = () => {
    dispatch({ type: 'TOGGLE_MOBILE_MENU' })
  }

  const setMobileMenuOpen = (open: boolean) => {
    dispatch({ type: 'SET_MOBILE_MENU_OPEN', payload: open })
  }

  const value: AppContextType = {
    state,
    dispatch,
    updateContactForm,
    submitContactForm,
    resetContactForm,
    toggleService,
    setActiveSection,
    filterPortfolio,
    addNotification,
    removeNotification,
    toggleTheme,
    toggleMobileMenu,
    setMobileMenuOpen
  }

  return (
    <AppContext.Provider value={value}>
      {children}
    </AppContext.Provider>
  )
}

// Hook
export function useApp() {
  const context = useContext(AppContext)
  if (context === undefined) {
    throw new Error('useApp must be used within an AppProvider')
  }
  return context
}

// Selector hooks for better performance
export function useTheme() {
  const { state, toggleTheme } = useApp()
  return { theme: state.theme, toggleTheme }
}

export function useContactForm() {
  const { state, updateContactForm, submitContactForm, resetContactForm } = useApp()
  return {
    contactForm: state.contactForm,
    isSubmitting: state.isContactFormSubmitting,
    isSubmitted: state.contactFormSubmitted,
    updateContactForm,
    submitContactForm,
    resetContactForm
  }
}

export function useServices() {
  const { state, toggleService } = useApp()
  return {
    selectedService: state.selectedService,
    expandedService: state.expandedService,
    services: state.services,
    toggleService
  }
}

export function useNavigation() {
  const { state, setActiveSection, toggleMobileMenu, setMobileMenuOpen } = useApp()
  return {
    isMobileMenuOpen: state.isMobileMenuOpen,
    activeSection: state.activeSection,
    setActiveSection,
    toggleMobileMenu,
    setMobileMenuOpen
  }
}

export function usePortfolio() {
  const { state, filterPortfolio } = useApp()
  const filteredItems = state.portfolioFilter === 'all' 
    ? state.portfolioItems 
    : state.portfolioItems.filter(item => item.category === state.portfolioFilter)
  
  return {
    portfolioItems: filteredItems,
    allItems: state.portfolioItems,
    filter: state.portfolioFilter,
    filterPortfolio
  }
}

export function useStatistics() {
  const { state } = useApp()
  return {
    statistics: state.statistics
  }
}

export function useNotifications() {
  const { state, addNotification, removeNotification } = useApp()
  return {
    notifications: state.notifications,
    addNotification,
    removeNotification
  }
}
