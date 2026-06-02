/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  ArrowRight, 
  Quote, 
  Instagram, 
  Linkedin, 
  Twitter, 
  Building2, 
  Menu, 
  X, 
  Compass, 
  ChevronRight, 
  Sparkles,
  ArrowUp,
  MapPin,
  Clock,
  Search,
  CheckCircle,
  Phone,
  Star
} from 'lucide-react';
import ProjectGallery from './components/ProjectGallery';
import MaterialLibrary from './components/MaterialLibrary';
import ConsultationForm from './components/ConsultationForm';
import Testimonials from './components/Testimonials';
import { IN_OUT_SERVICES } from './data';

export default function App() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [selectedMaterialName, setSelectedMaterialName] = useState<string | null>(null);
  const [showBackToTop, setShowBackToTop] = useState(false);
  
  // Real-time local Indian Standard Time (UTC+5:30)
  const [localTime, setLocalTime] = useState('');

  // Service Hub Search and Category States
  const [serviceSearch, setServiceSearch] = useState('');
  const [activeServiceCat, setActiveServiceCat] = useState<'all' | 'core' | 'living' | 'fittings' | 'commercial'>('all');
  const [selectedServiceFeedback, setSelectedServiceFeedback] = useState<string | null>(null);

  useEffect(() => {
    // Scroll tracker
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
      setShowBackToTop(window.scrollY > 800);
    };

    // Calculate dynamic Jabalpur, MP, India Time (UTC +5:30)
    const updateTime = () => {
      const options: Intl.DateTimeFormatOptions = {
        timeZone: 'Asia/Kolkata',
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
        hour12: true
      };
      setLocalTime(new Date().toLocaleTimeString('en-US', options));
    };

    window.addEventListener('scroll', handleScroll);
    updateTime();
    const timer = setInterval(updateTime, 1000);

    return () => {
      window.removeEventListener('scroll', handleScroll);
      clearInterval(timer);
    };
  }, []);

  const handleSelectMaterial = (name: string) => {
    setSelectedMaterialName(name);
  };

  const handleClearSelectedMaterial = () => {
    setSelectedMaterialName(null);
  };

  const handleScrollToSection = (id: string) => {
    setMobileMenuOpen(false);
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  // Trigger selection from Service Hub -> Consultation form
  const handleSelectServiceForInquiry = (serviceName: string) => {
    // Find input element or scroll down
    handleScrollToSection('commission');
    
    // Auto-populate the description with this service
    const textElement = document.getElementById('textarea-project-details') as HTMLTextAreaElement | null;
    if (textElement) {
      textElement.value = `I am interested in commissioning an exquisite "${serviceName}" project for my space. Let us discuss layout parameters, finishes, and implementation schedule.`;
      // Trigger vanilla event if needed or simulate it
      const event = new Event('input', { bubbles: true });
      textElement.dispatchEvent(event);
    }

    // Set interactive visual badge feedback
    setSelectedServiceFeedback(serviceName);
    setTimeout(() => {
      setSelectedServiceFeedback(null);
    }, 3000);
  };

  // Helper map for Service Icons (represented clean & robust)
  const renderServiceIcon = (serviceId: string) => {
    const iconBaseSet: { [key: string]: string } = {
      'srv-1': '📐', // Space planning
      'srv-2': '🧩', // Room planning
      'srv-3': '🛠️', // Refurbishment
      'srv-4': '🛋️', // Home staging
      'srv-5': '📺', // Living room design
      'srv-6': '🛏️', // Bedroom design
      'srv-7': '🍷', // Dining room design
      'srv-8': '🍳', // Kitchen design
      'srv-9': '🛁', // Bathroom design
      'srv-10': '👔', // Wardrobe design
      'srv-11': '🔑', // Cabinetry and hardware design
      'srv-12': '🪵', // Flooring selection
      'srv-13': '🚪', // Door design
      'srv-14': '🪟', // Window design
      'srv-15': '💡', // Lighting design
      'srv-16': '🎨', // Interior painting
      'srv-17': '🖼️', // Interior decorating
      'srv-18': '🏺', // Home decor selection
      'srv-19': '🏢', // Commercial interior design
      'srv-20': '💻', // Office space design
      'srv-21': '🛎️', // Hospitality design
      'srv-22': '🍽️', // Restaurant design
    };
    return iconBaseSet[serviceId] || '✨';
  };

  // Filter Services
  const filteredServices = IN_OUT_SERVICES.filter(srv => {
    const matchesSearch = srv.name.toLowerCase().includes(serviceSearch.toLowerCase()) || 
                          srv.description.toLowerCase().includes(serviceSearch.toLowerCase());
    const matchesCategory = activeServiceCat === 'all' || srv.category === activeServiceCat;
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="bg-[#FAFAFA] text-[#171717] font-sans antialiased selection:bg-[#E5E5E5] selection:text-[#171717] min-h-screen relative overflow-x-hidden">
      
      {/* Immersive Floating Back to Top Button */}
      <AnimatePresence>
        {showBackToTop && (
          <motion.button
            id="back-to-top-btn"
            initial={{ opacity: 0, scale: 0.8, y: 10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.8, y: 10 }}
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            className="fixed bottom-6 right-6 z-40 w-11 h-11 bg-[#171717]/90 text-white flex items-center justify-center hover:bg-black transition-colors rounded-full shadow-lg border border-white/10"
            aria-label="Back to top"
          >
            <ArrowUp size={16} />
          </motion.button>
        )}
      </AnimatePresence>

      {/* Navigation Header */}
      <nav className={`fixed top-0 left-0 w-full z-45 transition-all duration-500 px-6 md:px-12 py-5 flex justify-between items-center ${
        scrolled 
          ? 'bg-[#171717]/95 text-white shadow-2xl backdrop-blur-md py-4' 
          : 'bg-transparent text-white'
      }`}>
        {/* Brand Logo */}
        <a 
          href="#" 
          onClick={(e) => {
            e.preventDefault();
            window.scrollTo({ top: 0, behavior: 'smooth' });
          }}
          className="group flex flex-col items-start leading-none"
        >
          <span className="uppercase text-xl md:text-2xl font-light tracking-tight font-serif">In&amp;Out Spaces.</span>
          <span className="text-[7.5px] uppercase tracking-[0.25em] opacity-40 mt-1 font-sans">Aesthetic Architecture</span>
        </a>

        {/* Desktop Links / Actions */}
        <div className="hidden lg:flex items-center gap-12 font-sans">
          <div className="flex gap-10">
            <button 
              id="nav-link-projects"
              onClick={() => handleScrollToSection('projects')}
              className="text-[10px] uppercase tracking-widest font-light hover:opacity-100 transition-opacity duration-300 opacity-60"
            >
              Selected Projects
            </button>
            <button 
              id="nav-link-services"
              onClick={() => handleScrollToSection('services')}
              className="text-[10px] uppercase tracking-widest font-light hover:opacity-100 transition-opacity duration-300 opacity-60"
            >
              Our 22 Services
            </button>
            <button 
              id="nav-link-materials"
              onClick={() => handleScrollToSection('materials')}
              className="text-[10px] uppercase tracking-widest font-light hover:opacity-100 transition-opacity duration-300 opacity-60"
            >
              Material Library
            </button>
            <button 
              id="nav-link-studio"
              onClick={() => handleScrollToSection('studio')}
              className="text-[10px] uppercase tracking-widest font-light hover:opacity-100 transition-opacity duration-300 opacity-60"
            >
              The Studio
            </button>
          </div>
          
          <button 
            id="nav-cta-consultation"
            onClick={() => handleScrollToSection('commission')}
            className="group relative inline-flex items-center gap-2 px-5 py-2.5 border border-white/20 hover:bg-white hover:text-[#171717] hover:border-white transition-all duration-500 rounded-sm"
          >
            <span className="text-[10px] uppercase tracking-widest font-medium">Book Consultation</span>
            <ChevronRight size={10} className="group-hover:translate-x-1 transition-transform" />
          </button>
        </div>

        {/* Mobile menu toggle */}
        <button 
          id="mobile-menu-toggle-btn"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="lg:hidden w-10 h-10 border border-white/10 flex items-center justify-center hover:bg-white/5 rounded-full transition-colors"
          aria-label="Toggle navigation drawer"
        >
          {mobileMenuOpen ? <X size={16} /> : <Menu size={16} />}
        </button>
      </nav>

      {/* Mobile Drawer Slideout Overlay */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div 
            id="mobile-nav-drawer"
            initial={{ opacity: 0, x: '100%' }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: '100%' }}
            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
            className="fixed inset-y-0 right-0 z-40 w-full max-w-sm bg-[#171717] text-white p-8 pt-28 flex flex-col justify-between shadow-2xl"
          >
            {/* Links Stack */}
            <div className="space-y-6">
              <span className="text-[8px] uppercase tracking-widest text-white/30 block border-b border-white/5 pb-2">Navigation Matrix</span>
              
              <div className="flex flex-col gap-5 text-left">
                <button 
                  id="mobile-link-projects"
                  onClick={() => handleScrollToSection('projects')}
                  className="font-serif italic text-2xl font-light hover:opacity-60 text-left"
                >
                  Selected Projects
                </button>
                <button 
                  id="mobile-link-services"
                  onClick={() => handleScrollToSection('services')}
                  className="font-serif italic text-2xl font-light hover:opacity-60 text-left"
                >
                  Our 22 Services
                </button>
                <button 
                  id="mobile-link-materials"
                  onClick={() => handleScrollToSection('materials')}
                  className="font-serif italic text-2xl font-light hover:opacity-60 text-left"
                >
                  Material Library
                </button>
                <button 
                  id="mobile-link-studio"
                  onClick={() => handleScrollToSection('studio')}
                  className="font-serif italic text-2xl font-light hover:opacity-60 text-left"
                >
                  Our Origins Studio
                </button>
              </div>
            </div>

            {/* Bottom context drawer panel */}
            <div className="space-y-6">
              <button 
                id="mobile-cta-consultation"
                onClick={() => handleScrollToSection('commission')}
                className="w-full text-center py-4 bg-white text-black text-xs uppercase tracking-widest font-medium hover:bg-neutral-200 transition-colors"
              >
                Register Private Commission
              </button>
              
              <div className="text-xs text-white/40 leading-relaxed font-light">
                <p>17, Baldeobagh, Sheetalpuri</p>
                <p>Jabalpur, Madhya Pradesh 482002</p>
                <p className="mt-2 text-white/60 font-mono">089821 39671</p>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Hero Section */}
      <header className="relative w-full h-[95vh] md:h-screen flex items-center justify-center overflow-hidden bg-[#171717]">
        {/* Background Image with slow elegant viewport zoom */}
        <div className="absolute inset-0 w-full h-full z-0 overflow-hidden">
          <div className="absolute inset-0 bg-black/45 z-10" />
          <motion.img 
            initial={{ scale: 1.05 }}
            animate={{ scale: 1 }}
            transition={{ duration: 15, ease: 'easeOut' }}
            src="https://hoirqrkdgbmvpwutwuwj.supabase.co/storage/v1/object/public/assets/assets/b69f4321-07c1-4a2b-b610-852f7f5e5013_1600w.jpg" 
            alt="Warm Luxury Interior Design" 
            className="w-full h-full object-cover"
          />
        </div>

        {/* Hero Content Overlay */}
        <div className="relative z-20 text-center text-white px-6 max-w-5xl mx-auto flex flex-col justify-center h-full pt-16">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
          >
            <h1 className="font-serif text-5xl sm:text-6xl md:text-7xl lg:text-8xl leading-tight md:leading-none tracking-tight mb-8 font-light">
              Designing Inner Worlds,<br />
              <span className="italic font-light opacity-90 text-white/85">Refining Outer Forms</span>
            </h1>
          </motion.div>

          <motion.p 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 0.6 }}
            className="font-sans text-[11px] sm:text-xs md:text-sm font-light tracking-[0.2em] max-w-xl mx-auto text-white/70 uppercase mb-12"
          >
            In&amp;Out Spaces — Bespoke Interior Design &amp; Architectural Planning in Jabalpur, MP
          </motion.p>
          
          {/* Scroll Down Guide lines */}
          <div className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-4">
            <motion.div 
              initial={{ height: 0 }}
              animate={{ height: 60 }}
              transition={{ duration: 1, delay: 1 }}
              className="h-16 w-[1.5px] bg-white/20 relative overflow-hidden"
            >
              <div className="absolute top-0 left-0 right-0 h-4 bg-white/60 animate-bounce" />
            </motion.div>
            <span className="text-[9px] uppercase tracking-widest font-light text-white/40">Scroll</span>
          </div>
        </div>
      </header>

      {/* The Philosophy */}
      <section className="py-24 md:py-40 bg-white border-b border-black/5 flex items-center justify-center">
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="max-w-4xl mx-auto px-6 text-center space-y-10"
        >
          <span className="text-[10px] uppercase tracking-widest text-[#171717]/40 block font-normal">The Studio Philosophy</span>
          <p className="font-serif text-3.5xl sm:text-4xl md:text-5xl leading-tight text-[#171717] font-light tracking-tight">
            We operate on the boundary where physical layout dissolves into pure comfort. By orchestrating both <span className="italic text-[#171717]/60">Indoor spaces</span> and <span className="italic text-[#171717]/65">Outdoor structures</span>, we tailor environment flows precisely to frame your life's daily rhythm.
          </p>
        </motion.div>
      </section>

      {/* Featured Projects Gallery Module */}
      <ProjectGallery onSelectMaterial={handleSelectMaterial} />

      {/* NEW: Interactive 22-Services Catalog Explorer Section */}
      <section id="services" className="py-24 md:py-32 bg-white px-6 md:px-12 border-y border-black/5">
        <div className="max-w-[1920px] mx-auto">
          
          {/* Header Description */}
          <div className="flex flex-col lg:flex-row justify-between items-start lg:items-end mb-16 gap-8">
            <div className="max-w-xl">
              <span className="text-xs uppercase tracking-widest text-[#171717]/40 block mb-3 font-normal">Technical Proficiency</span>
              <h2 className="font-serif text-4xl md:text-5xl font-light tracking-tight text-[#171717] mb-6">
                Our <span className="italic text-[#171717]/50">22 Comprehensive</span> Offerings
              </h2>
              <p className="font-sans text-sm text-[#171717]/60 leading-relaxed font-light">
                From master layout diagnostics to delicate hardware alignment, we cover the full scope of interior architecture. Browse or search through our specialized branches below.
              </p>
            </div>

            {/* Inline search bar */}
            <div className="w-full lg:w-96 relative">
              <span className="absolute left-4 top-1/2 -translate-y-1/2 text-[#171717]/45">
                <Search size={16} />
              </span>
              <input
                id="service-search-input"
                type="text"
                value={serviceSearch}
                onChange={(e) => setServiceSearch(e.target.value)}
                placeholder="Search services (e.g. kitchen, lighting, door)..."
                className="w-full pl-11 pr-4 py-3 bg-[#FAFAFA] border border-[#171717]/10 text-xs uppercase tracking-widest focus:outline-none focus:border-[#171717]/40 transition-colors rounded-sm"
              />
              {serviceSearch && (
                <button 
                  onClick={() => setServiceSearch('')}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-[9px] uppercase tracking-wider text-red-500 hover:text-red-700"
                >
                  Clear
                </button>
              )}
            </div>
          </div>

          {/* Interactive Category Tabs */}
          <div className="flex flex-wrap border-b border-[#171717]/10 mb-12 gap-6 md:gap-10 pb-2.5">
            {[
              { key: 'all', label: 'All 22 Specialties' },
              { key: 'core', label: 'Space Planning & Core' },
              { key: 'living', label: 'Living & Comfort Areas' },
              { key: 'fittings', label: 'Fittings & Fine Finishing' },
              { key: 'commercial', label: 'Commercial & Institutional' }
            ].map((cat) => (
              <button
                id={`btn-service-tab-${cat.key}`}
                key={cat.key}
                onClick={() => setActiveServiceCat(cat.key as any)}
                className={`text-xs uppercase tracking-widest font-normal pb-3 relative transition-colors duration-200 ${
                  activeServiceCat === cat.key 
                    ? 'text-[#171717] font-semibold' 
                    : 'text-[#171717]/40 hover:text-[#171717]/70'
                }`}
              >
                {cat.label}
                {activeServiceCat === cat.key && (
                  <motion.div 
                    layoutId="activeServiceCategoryBorder" 
                    className="absolute bottom-0 left-0 right-0 h-[1.5px] bg-[#171717]" 
                  />
                )}
              </button>
            ))}
          </div>

          {/* Feedback toaster-like banner */}
          <AnimatePresence>
            {selectedServiceFeedback && (
              <motion.div 
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className="p-4 bg-emerald-50 border border-emerald-400/20 text-emerald-800 text-xs mb-8 rounded-sm flex items-center justify-between font-sans shadow-sm"
              >
                <div className="flex items-center gap-2">
                  <CheckCircle size={14} className="text-emerald-600" />
                  <span>
                    Selected <strong>"{selectedServiceFeedback}"</strong> specialty! The Consultation booking form has been prepared with your choice.
                  </span>
                </div>
                <button onClick={() => setSelectedServiceFeedback(null)} className="text-[10px] uppercase font-bold text-emerald-800/60 hover:text-emerald-800">Dismiss</button>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Grid Layout of the 22 Services */}
          {filteredServices.length === 0 ? (
            <div className="py-20 text-center border border-dashed border-[#171717]/15 rounded-sm">
              <p className="font-serif italic text-lg text-[#171717]/50 mb-1">No services matched your inquiry</p>
              <p className="text-xs uppercase tracking-widest text-[#171717]/30">Try typing another keyword or reset the category filters</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {filteredServices.map((srv, idx) => (
                <motion.div 
                  initial={{ opacity: 0, y: 25 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-40px" }}
                  transition={{ duration: 0.6, delay: Math.min((idx % 4) * 0.1, 0.4), ease: [0.16, 1, 0.3, 1] }}
                  id={`service-block-card-${srv.id}`}
                  key={srv.id}
                  className="bg-white border border-[#171717]/5 p-6 flex flex-col justify-between hover:border-[#171717]/15 transition-all duration-300 hover:shadow-xl hover:shadow-neutral-100 rounded-sm group text-left"
                >
                  <div>
                    {/* Header line */}
                    <div className="flex justify-between items-start mb-4">
                      <span className="text-2xl" role="img" aria-label={srv.name}>
                        {renderServiceIcon(srv.id)}
                      </span>
                      <span className="text-[8px] font-semibold uppercase tracking-widest px-2 py-0.5 bg-neutral-100 text-neutral-500 rounded-full font-mono">
                        {srv.category === 'core' && 'Space & Core'}
                        {srv.category === 'living' && 'Comfort Areas'}
                        {srv.category === 'fittings' && 'Fine Accent'}
                        {srv.category === 'commercial' && 'Corporate'}
                      </span>
                    </div>

                    <h3 className="font-serif text-lg md:text-xl font-normal text-[#171717] tracking-tight mb-2 group-hover:text-[#171717]/85 transition-colors">
                      {srv.name}
                    </h3>

                    <p className="text-xs text-[#171717]/60 leading-relaxed font-light mb-6">
                      {srv.description}
                    </p>
                  </div>

                  <button
                    id={`btn-choose-service-trigger-${srv.id}`}
                    onClick={() => handleSelectServiceForInquiry(srv.name)}
                    className="w-full text-center py-2.5 bg-[#171717]/5 text-[#171717] hover:bg-[#171717] hover:text-white transition-all text-[9px] uppercase tracking-widest font-medium border border-transparent rounded-sm"
                  >
                    Select for Inquiry
                  </button>
                </motion.div>
              ))}
            </div>
          )}

        </div>
      </section>

      {/* Client Testimonials & Google Trust Board */}
      <Testimonials />

      {/* Process: Methodology Section */}
      <section id="process" className="py-24 md:py-32 px-6 md:px-12 max-w-[1920px] mx-auto border-b border-black/5 bg-[#FAFAFA]">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-16 md:gap-8">
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="md:col-span-3 text-left"
          >
            <span className="text-xs uppercase tracking-widest text-[#171717]/40 block mb-4 font-normal">Our Methodology</span>
            <h2 className="font-serif text-4xl tracking-tight font-light leading-tight text-[#171717]">
              The Art of <br />
              <span className="italic text-[#171717]/50">Spatial Flow</span>
            </h2>
          </motion.div>
          
          <div className="md:col-span-9 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-10 md:gap-8 relative text-left">
            {/* Horizontal line for aesthetic alignment */}
            <div className="hidden md:block absolute top-[22px] left-0 w-full h-[1px] bg-black/5 -z-0" />

            {/* Step 1 */}
            <motion.div 
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.7, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
              className="relative pt-10 group bg-[#FAFAFA] z-10"
            >
              <span className="absolute top-0 left-0 bg-[#FAFAFA] pr-4 font-serif text-2.5xl tracking-tight text-[#171717]/35 italic -translate-y-1">01</span>
              <h3 className="text-xs uppercase tracking-widest font-semibold text-[#171717] mb-3">Envision</h3>
              <p className="font-sans text-xs text-[#171717]/60 leading-relaxed font-light">A meticulous spatial conversation mapping indoor scale, sight paths, window exposures, and operational requirements.</p>
            </motion.div>

            {/* Step 2 */}
            <motion.div 
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.7, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
              className="relative pt-10 group bg-[#FAFAFA] z-10"
            >
              <span className="absolute top-0 left-0 bg-[#FAFAFA] pr-4 font-serif text-2.5xl tracking-tight text-[#171717]/35 italic -translate-y-1">02</span>
              <h3 className="text-xs uppercase tracking-widest font-semibold text-[#171717] mb-3">Plan</h3>
              <p className="font-sans text-xs text-[#171717]/60 leading-relaxed font-light">Our studio drafts complex 3D rooms, selecting precise natural finishes, doors, windows, and custom structural hardware.</p>
            </motion.div>

            {/* Step 3 */}
            <motion.div 
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.7, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
              className="relative pt-10 group bg-[#FAFAFA] z-10"
            >
              <span className="absolute top-0 left-0 bg-[#FAFAFA] pr-4 font-serif text-2.5xl tracking-tight text-[#171717]/35 italic -translate-y-1">03</span>
              <h3 className="text-xs uppercase tracking-widest font-semibold text-[#171717] mb-3">Procure</h3>
              <p className="font-sans text-xs text-[#171717]/60 leading-relaxed font-light">Meticulous stone extraction from Rajasthan quarries and premium Teak processing in our regional Madhya Pradesh workshops.</p>
            </motion.div>

            {/* Step 4 */}
            <motion.div 
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.7, delay: 0.4, ease: [0.16, 1, 0.3, 1] }}
              className="relative pt-10 group bg-[#FAFAFA] z-10"
            >
              <span className="absolute top-0 left-0 bg-[#FAFAFA] pr-4 font-serif text-2.5xl tracking-tight text-[#171717]/35 italic -translate-y-1">04</span>
              <h3 className="text-xs uppercase tracking-widest font-semibold text-[#171717] mb-3">Install</h3>
              <p className="font-sans text-xs text-[#171717]/60 leading-relaxed font-light">Flawless, laser-level deployment and white-glove setup overseen closely by our senior lead planners.</p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Materials Module */}
      <MaterialLibrary 
        selectedMaterialName={selectedMaterialName}
        onClearSelectedName={handleClearSelectedMaterial}
      />

      {/* Studio / Origins Profile */}
      <section id="studio" className="py-24 md:py-32 bg-white">
        <div className="max-w-screen-xl mx-auto flex flex-col md:flex-row items-center gap-16 md:gap-24 px-6">
          
          <motion.div 
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="w-full md:w-5/12 aspect-[3/4] overflow-hidden relative bg-[#FAFAFA] border border-black/5 shadow-sm group"
          >
            <img 
              src="https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&q=80&w=1200" 
              alt="In And Out Spaces Studio" 
              className="w-full h-full object-cover grayscale-[20%] group-hover:grayscale-0 transition-all duration-[2.5s] ease-out group-hover:scale-102"
            />
            <div className="absolute top-4 left-4 bg-[#171717] text-white text-[9px] uppercase tracking-widest px-3 py-1 font-mono">
              In&amp;Out Studio
            </div>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
            className="w-full md:w-7/12 space-y-8 text-left"
          >
            <span className="text-xs uppercase tracking-widest text-[#171717]/40 font-normal">Origins &amp; Creed</span>
            <h2 className="font-serif text-4xl md:text-5xl leading-tight tracking-tight font-light text-[#171717]">
              "Spaces must breathe, bridging the comfort of <span className="italic text-[#171717]/50">interior volumes</span> with outdoor freedom."
            </h2>
            <p className="font-sans text-xs md:text-sm text-[#171717]/60 leading-relaxed max-w-xl font-light">
              Operating with an uncompromising focus on symmetry and material honesty, In&amp;Out Spaces serves Jabalpur and surrounding regions. We believe true design is built from the ground up, utilizing raw regional marbles, aged timber grains, and silent hardware fittings to craft lasting architectures.
            </p>
            
            <div className="pt-4">
              <button 
                id="origins-discover-btn"
                onClick={() => handleScrollToSection('commission')}
                className="inline-flex items-center gap-3 text-xs uppercase tracking-widest font-medium group text-[#171717]"
              >
                <span>Discover Our Origins</span>
                <ArrowRight size={14} className="group-hover:translate-x-1.5 transition-transform" />
              </button>
            </div>
          </motion.div>

        </div>
      </section>

      {/* Consultation & Local CRM Registry */}
      <ConsultationForm />

      {/* Footer Editorial Section */}
      <footer className="bg-[#0A0A0A] text-white pt-24 pb-12 px-6 md:px-12 border-t border-white/10 relative z-10">
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-40px" }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="max-w-[1920px] mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-16 lg:gap-24 mb-20 text-left"
        >
          
          {/* Column 1: Brand Info */}
          <div className="space-y-6">
            <span className="font-serif text-2xl tracking-tight font-light uppercase text-white">In&amp;Out Spaces.</span>
            <span className="text-[9px] uppercase tracking-widest text-light text-white/50 block">Est. 2019 — Central India Hub</span>
            <p className="text-xs text-white/50 leading-relaxed max-w-xs font-light">
              Redefining physical room structures and custom modular cabinetry through raw native materials and clean architectural discipline.
            </p>
          </div>

          {/* Column 2: Navigation Links */}
          <div>
            <h4 className="text-xs uppercase tracking-widest text-white/80 mb-6 font-semibold">Selected Portals</h4>
            <ul className="space-y-4 text-xs text-white/50 font-light">
              <li>
                <button 
                  id="foot-link-projects"
                  onClick={() => handleScrollToSection('projects')} 
                  className="hover:text-white transition-colors"
                >
                  Selected Works
                </button>
              </li>
              <li>
                <button 
                  id="foot-link-services"
                  onClick={() => handleScrollToSection('services')} 
                  className="hover:text-white transition-colors"
                >
                  Our 22 Services
                </button>
              </li>
              <li>
                <button 
                  id="foot-link-materials"
                  onClick={() => handleScrollToSection('materials')} 
                  className="hover:text-white transition-colors"
                >
                  Active Material Library
                </button>
              </li>
              <li>
                <a href="#commission" className="hover:text-white transition-colors">Select Commission</a>
              </li>
            </ul>
          </div>

          {/* Column 3: Communication Portal */}
          <div>
            <h4 className="text-xs uppercase tracking-widest text-white/80 mb-6 font-semibold">Consulting Channels</h4>
            <ul className="space-y-4 text-xs text-white/50 font-light">
              <li><a href="#commission" className="hover:text-white transition-colors">Book Private Consultation</a></li>
              <li><span className="font-sans">Phone: 089821 39671</span></li>
              <li><span className="text-white/30 block">Monday to Sunday, 11 AM - 8 PM</span></li>
            </ul>
          </div>

          {/* Column 4: Location MapPin */}
          <div className="space-y-6">
            <h4 className="text-xs uppercase tracking-widest text-white/80 mb-6 font-semibold">Jabalpur Headquarters</h4>
            <address className="not-italic text-xs text-white/50 font-light space-y-4">
              <p className="leading-relaxed">
                17, Baldeobagh, Sheetalpuri<br />
                Jabalpur, Madhya Pradesh 482002
              </p>
              <p className="text-[10px] uppercase tracking-widest text-yellow-400 font-serif">
                5.0 ★★★★★ Rated on Google Reviews
              </p>
            </address>
            
            {/* Social icons */}
            <div className="flex gap-6 pt-2">
              <a href="#" className="w-8 h-8 rounded-full border border-white/10 hover:border-white flex items-center justify-center text-white/50 hover:text-white transition-colors" aria-label="Instagram">
                <Instagram size={14} />
              </a>
              <a href="#" className="w-8 h-8 rounded-full border border-white/10 hover:border-white flex items-center justify-center text-white/50 hover:text-white transition-colors" aria-label="LinkedIn">
                <Linkedin size={14} />
              </a>
              <a href="#" className="w-8 h-8 rounded-full border border-white/10 hover:border-white flex items-center justify-center text-white/50 hover:text-white transition-colors" aria-label="Twitter">
                <Twitter size={14} />
              </a>
            </div>
          </div>

        </motion.div>

        {/* Bottom copyright line */}
        <div className="border-t border-white/10 pt-8 flex flex-col md:flex-row justify-between items-center gap-4 text-[10px] uppercase tracking-widest text-white/30 font-light">
          <p>© 2026 In&amp;Out Spaces India. All Rights Reserved.</p>
          <div className="flex gap-8">
            <a href="#" className="hover:text-white transition-colors">Privacy Charter</a>
            <a href="#" className="hover:text-white transition-colors">Terms of Commission</a>
          </div>
        </div>
      </footer>

    </div>
  );
}
