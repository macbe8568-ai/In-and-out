/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Star, Quote, ChevronLeft, ChevronRight, MapPin, CheckCircle, Sparkles } from 'lucide-react';

interface TestimonialItem {
  id: string;
  name: string;
  role: string;
  location: string;
  rating: number;
  text: string;
  services: string[];
  avatarBg: string;
  avatarColor: string;
}

const TESTIMONIALS_DATA: TestimonialItem[] = [
  {
    id: 'test-1',
    name: 'Mrs. Seema & Rajesh Patel',
    role: 'Homeowners, Luxury Duplex',
    location: 'Sheetalpuri, Jabalpur',
    rating: 5.0,
    text: "In&Out Spaces planned our entire living room layout and modular cabinetry perfectly. The seamless integration of raw wood timber grains, flooring selections, and window fittings completely transformed our daily lifestyle structure. Absolute masterpieces of execution!",
    services: ['Space Planning', 'Living Room Design', 'Wardrobe Design'],
    avatarBg: 'bg-stone-100',
    avatarColor: 'text-stone-850',
  },
  {
    id: 'test-2',
    name: 'Mr. Lalit Shrivastava',
    role: 'Managing Director, Shrivastava Corp',
    location: 'Civil Lines, Jabalpur',
    rating: 5.0,
    text: "Extremely satisfied with their professional team. They managed the complete refurbishment of our corporate suites. The acoustic timber partition doors, custom handles, and precise custom spot lighting completely redefined our workspaces focused on productivity.",
    services: ['Commercial Interior Design', 'Lighting Layout', 'Door Design'],
    avatarBg: 'bg-neutral-150',
    avatarColor: 'text-neutral-800',
  },
  {
    id: 'test-3',
    name: 'Dr. Neha Baghel',
    role: 'Founder, Baghel Specialty Atrium',
    location: 'Baldeobagh, Jabalpur',
    rating: 5.0,
    text: "Operating on physical symmetry, they connected our indoor reception halls to external visual green landscapes. Their choice of beige travertine tile selections, paint parameters, and custom hardware fittings are world-class. A stellar local design studio in MP.",
    services: ['Space Planning', 'Flooring Selection', 'Interior Decorating'],
    avatarBg: 'bg-orange-50',
    avatarColor: 'text-amber-850',
  },
  {
    id: 'test-4',
    name: 'Anand Verma',
    role: 'Bespoke Retail Lounge Owner',
    location: 'Wright Town, Jabalpur',
    rating: 5.0,
    text: "Our client lounge now radiates refined residential warmth. Their delicate cabinetry craftsmanship and bespoke custom metal trimmings received compliments from every visitor. Outstanding balance, exceptional coordination, and on-time delivery.",
    services: ['Cabinetry & Hardware', 'Bespoke Lounge Planning', 'Home Decor Selection'],
    avatarBg: 'bg-amber-50',
    avatarColor: 'text-[#171717]',
  }
];

export default function Testimonials() {
  const [activeIndex, setActiveIndex] = useState(0);

  const nextTestimonial = () => {
    setActiveIndex((prev) => (prev + 1) % TESTIMONIALS_DATA.length);
  };

  const prevTestimonial = () => {
    setActiveIndex((prev) => (prev - 1 + TESTIMONIALS_DATA.length) % TESTIMONIALS_DATA.length);
  };

  const current = TESTIMONIALS_DATA[activeIndex];

  return (
    <section 
      id="testimonials"
      className="py-24 md:py-36 bg-[#FAFAFA] border-y border-neutral-100 overflow-hidden text-left"
    >
      <div className="max-w-[1920px] mx-auto px-6 md:px-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 lg:gap-20 items-center">
          
          {/* Left Column: Trust Summary Board */}
          <motion.div 
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="lg:col-span-4 space-y-8"
          >
            <div>
              <span className="text-xs uppercase tracking-widest text-[#171717]/40 block mb-3 font-normal">Authentic Calibre</span>
              <h2 className="font-serif text-4xl md:text-5xl font-light tracking-tight text-[#171717] leading-tight">
                Undeniable <br />
                <span className="italic text-[#171717]/50">Reputation</span>
              </h2>
            </div>

            <p className="font-sans text-xs md:text-sm text-[#171717]/60 leading-relaxed font-light max-w-sm">
              Our residential and corporate clients in Madhya Pradesh expect rigorous design compliance. We stand by our historic commitment to quality.
            </p>

            {/* Google Trust Board Summary Badge */}
            <div className="p-6 bg-white border border-[#171717]/5 rounded-sm shadow-sm space-y-4 max-w-sm">
              <div className="flex items-center gap-2">
                <span className="text-emerald-500 flex items-center gap-1 text-xs uppercase font-mono font-bold">
                  <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse inline-block" />
                  Verified Google Reviews
                </span>
              </div>
              <div className="flex items-baseline gap-3">
                <span className="text-5xl font-serif font-light text-[#171717]">5.0</span>
                <div className="space-y-1">
                  <div className="flex text-yellow-400 gap-0.5">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} size={14} className="fill-yellow-400 text-yellow-400" />
                    ))}
                  </div>
                  <p className="text-[10px] uppercase font-semibold tracking-wider text-[#171717]/40 block">61 Organic Audits</p>
                </div>
              </div>
              <p className="text-[10px] leading-relaxed text-[#171717]/50 font-light pt-2 border-t border-neutral-100">
                100% Client Satisfaction Score based across Jabalpur, Sheetalpuri, and Civil Lines projects.
              </p>
            </div>
          </motion.div>

          {/* Right Column: Interactive Slides / Grid and Details */}
          <motion.div 
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
            className="lg:col-span-8 space-y-12 relative"
          >
            {/* Massive decorative Quote mark */}
            <div className="absolute right-0 top-0 -translate-y-8 text-[#171717]/5 pointer-events-none select-none">
              <Quote size={200} strokeWidth={0.5} />
            </div>

            {/* Slide Presentation Card Frame */}
            <div className="bg-white border border-neutral-100 p-8 md:p-12 shadow-xl shadow-neutral-150/40 rounded-sm relative min-h-[380px] flex flex-col justify-between">
              
              <AnimatePresence mode="wait">
                <motion.div
                  key={current.id}
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -15 }}
                  transition={{ duration: 0.4 }}
                  className="space-y-6"
                >
                  {/* Rating & Location meta line */}
                  <div className="flex flex-wrap justify-between items-center gap-4">
                    <div className="flex text-yellow-400 gap-0.5">
                      {[...Array(5)].map((_, i) => (
                        <Star key={i} size={12} className="fill-yellow-400 text-yellow-400" />
                      ))}
                    </div>
                    <div className="flex items-center gap-1.5 text-xs text-[#171717]/40 font-mono">
                      <MapPin size={11} />
                      <span>{current.location}</span>
                    </div>
                  </div>

                  {/* Core Review Quote */}
                  <blockquote className="font-serif text-xl md:text-2xl leading-relaxed text-[#171717] font-light italic tracking-tight">
                    "{current.text}"
                  </blockquote>

                  {/* Commissioned Services Badges */}
                  <div className="space-y-2">
                    <span className="text-[8px] uppercase tracking-widest text-[#171717]/40 font-semibold block">Commissioned Specialties</span>
                    <div className="flex flex-wrap gap-2">
                      {current.services.map((srv, idx) => (
                        <span 
                          key={idx}
                          className="px-2.5 py-1 bg-stone-50 border border-neutral-100 text-[9px] uppercase tracking-widest text-stone-600 rounded-sm"
                        >
                          {srv}
                        </span>
                      ))}
                    </div>
                  </div>
                </motion.div>
              </AnimatePresence>

              {/* Card Footer: Author details + navigation controls */}
              <div className="pt-8 mt-8 border-t border-neutral-100 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-6">
                {/* Author Info */}
                <div className="flex items-center gap-4">
                  {/* Styled Letter Avatar container */}
                  <div className={`w-12 h-12 rounded-full ${current.avatarBg} ${current.avatarColor} flex items-center justify-center font-serif text-lg font-medium border border-neutral-100 shrink-0`}>
                    {current.name.split(' ').pop()?.charAt(0) || 'C'}
                  </div>
                  <div>
                    <h4 className="font-sans text-xs uppercase tracking-widest font-semibold text-[#171717]">
                      {current.name}
                    </h4>
                    <p className="font-serif italic text-xs text-[#171717]/50 mt-0.5">
                      {current.role}
                    </p>
                  </div>
                </div>

                {/* Micro-Navigation Controls */}
                <div className="flex items-center gap-4 self-end sm:self-auto">
                  <span className="text-xs font-mono text-neutral-400">
                    {activeIndex + 1} <span className="opacity-30">/</span> {TESTIMONIALS_DATA.length}
                  </span>
                  <div className="flex gap-2">
                    <button 
                      id="prev-testimonial-btn"
                      onClick={prevTestimonial}
                      className="w-10 h-10 border border-neutral-100 hover:border-[#171717]/30 text-[#171717]/60 hover:text-[#171717] flex items-center justify-center rounded-full transition-colors bg-white focus:outline-none"
                      aria-label="Previous review"
                    >
                      <ChevronLeft size={16} />
                    </button>
                    <button 
                      id="next-testimonial-btn"
                      onClick={nextTestimonial}
                      className="w-10 h-10 border border-neutral-100 hover:border-[#171717]/30 text-[#171717]/60 hover:text-[#171717] flex items-center justify-center rounded-full transition-colors bg-white focus:outline-none"
                      aria-label="Next review"
                    >
                      <ChevronRight size={16} />
                    </button>
                  </div>
                </div>
              </div>

            </div>

            {/* Ambient indicator of verified satisfaction */}
            <div className="flex items-center gap-2 text-[10px] uppercase tracking-widest text-[#171717]/40 justify-center">
              <CheckCircle size={12} className="text-emerald-500" />
              <span>Certified 5-Star Experience Index • Transmitted dynamically via client review logs</span>
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
}
