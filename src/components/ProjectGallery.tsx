/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, MapPin, ArrowRight, Layers, SlidersHorizontal } from 'lucide-react';
import { PROJECTS_DATA, LUXURY_MATERIALS } from '../data';
import { Project, Material } from '../types';

interface ProjectGalleryProps {
  onSelectMaterial: (materialName: string) => void;
}

export default function ProjectGallery({ onSelectMaterial }: ProjectGalleryProps) {
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [showArchive, setShowArchive] = useState(false);
  const [activeFilter, setActiveFilter] = useState<string>('All');

  // Filter list for the Archive mode
  const categories = ['All', 'Full Interior Architecture', 'Bespoke Private Residence', 'Commercial interior design'];

  const filteredProjects = activeFilter === 'All' 
    ? PROJECTS_DATA 
    : PROJECTS_DATA.filter(p => p.category === activeFilter);

  // Helper map to find material IDs
  const getMaterialId = (name: string): string => {
    const mat = LUXURY_MATERIALS.find(m => m.name.toLowerCase() === name.toLowerCase());
    return mat ? mat.id : '';
  };

  return (
    <section className="px-6 md:px-12 max-w-[1920px] mx-auto py-24 md:py-32" id="projects">
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-8"
      >
        <div>
          <span className="text-xs uppercase tracking-widest text-[#171717]/40 block mb-3 font-normal">Selected Portfolio</span>
          <h2 className="font-serif text-4xl md:text-5xl font-light tracking-tight text-[#171717]">
            Architectural <span className="italic text-[#171717]/50">Narratives</span>
          </h2>
        </div>
        
        {/* Archive / Filter controls if requested or viewing archive */}
        <div className="flex flex-wrap items-center gap-4">
          <button 
            id="toggle-archive-btn"
            onClick={() => setShowArchive(!showArchive)}
            className="flex items-center gap-2 px-5 py-2.5 border border-[#171717]/10 hover:border-[#171717]/30 transition-colors text-xs uppercase tracking-wider font-medium text-[#171717]/80"
          >
            <SlidersHorizontal size={14} className="text-[#171717]/60" />
            <span>{showArchive ? "Simple View" : "Explore Archive Grid"}</span>
          </button>
        </div>
      </motion.div>

      {/* Categories Filter Shelf - animated presence */}
      <AnimatePresence>
        {showArchive && (
          <motion.div 
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="overflow-hidden mb-12 border-b border-[#171717]/5 pb-6"
          >
            <div className="flex flex-wrap gap-3">
              {categories.map((cat) => (
                <button
                  id={`filter-btn-${cat.toLowerCase().replace(/\s+/g, '-')}`}
                  key={cat}
                  onClick={() => setActiveFilter(cat)}
                  className={`px-4 py-2 text-xs uppercase tracking-widest transition-all duration-300 ${
                    activeFilter === cat 
                      ? 'bg-[#171717] text-white' 
                      : 'border border-[#171717]/10 text-[#171717]/60 hover:text-[#171717] hover:border-[#171717]/30'
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Projects Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
        {filteredProjects.map((project, idx) => (
          <motion.div
            id={`project-card-${project.id}`}
            key={project.id}
            layoutId={`project-container-${project.id}`}
            onClick={() => setSelectedProject(project)}
            className={`group relative cursor-pointer overflow-hidden bg-[#E5E5E5] aspect-[4/3] ${
              !showArchive && idx === 1 ? 'md:translate-y-16' : ''
            }`}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-40px" }}
            transition={{ duration: 0.8, delay: idx * 0.08, ease: [0.16, 1, 0.3, 1] }}
          >
            {/* Image Wrap */}
            <div className="w-full h-full overflow-hidden absolute inset-0">
              <img 
                src={project.imageUrl} 
                alt={project.title} 
                className="w-full h-full object-cover transition-transform duration-[1.5s] ease-[0.16, 1, 0.3, 1] group-hover:scale-105"
              />
            </div>
            
            {/* Dark elegant overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-black/10 opacity-40 group-hover:opacity-75 transition-opacity duration-500" />
            
            {/* Project Quick Meta - always visible but elegant */}
            <div className="absolute bottom-6 left-6 right-6 text-white flex justify-between items-end">
              <div>
                <div className="flex items-center gap-1.5 text-[10px] uppercase tracking-widest opacity-80 mb-1.5">
                  <MapPin size={10} className="text-white/70" />
                  <span>{project.location}</span>
                </div>
                <h3 className="font-serif text-2xl lg:text-3xl tracking-tight font-light">{project.title}</h3>
                <span className="text-[10px] uppercase tracking-widest opacity-60 font-light block mt-1">{project.category}</span>
              </div>
              
              <div className="w-8 h-8 rounded-full border border-white/20 flex items-center justify-center opacity-0 group-hover:opacity-100 group-hover:translate-x-1 transition-all duration-300">
                <ArrowRight size={14} className="text-white" />
              </div>
            </div>
          </motion.div>
        ))}

        {/* View Archive Link Card in nonarchive mode */}
        {!showArchive && activeFilter === 'All' && (
          <div className="flex items-center justify-center aspect-[4/3] md:translate-y-16 border border-[#171717]/10 hover:bg-[#171717]/5 transition-colors duration-500">
            <button 
              id="view-archive-card-btn"
              onClick={() => {
                setShowArchive(true);
                // Scroll slightly over to direct attention to filter bar-like area
                window.scrollTo({ top: document.getElementById('projects')?.offsetTop ?? 0, behavior: 'smooth' });
              }}
              className="flex flex-col items-center gap-4 p-8 w-full h-full justify-center text-center"
            >
              <span className="font-serif text-3xl italic text-[#171717] tracking-tight font-light">View Archive</span>
              <span className="text-[10px] uppercase tracking-widest text-[#171717]/50 font-normal">Explore complete regional portfolio &amp; categories</span>
              <div className="w-10 h-10 rounded-full border border-[#171717]/10 flex items-center justify-center mt-2 group-hover:scale-105 transition-transform">
                <ArrowRight size={16} className="text-[#171717]/80" />
              </div>
            </button>
          </div>
        )}
      </div>

      {/* Immersive Selected Project Presentation Modal */}
      <AnimatePresence>
        {selectedProject && (
          <div className="fixed inset-0 z-50 overflow-y-auto bg-black/90 backdrop-blur-md flex items-center justify-center p-4 md:p-10">
            {/* Modal Closer Mask */}
            <div className="absolute inset-0 cursor-pointer" onClick={() => setSelectedProject(null)} />
            
            {/* Inner Content Card */}
            <motion.div
              layoutId={`project-container-${selectedProject.id}`}
              className="relative bg-[#FAFAFA] text-[#171717] w-full max-w-6xl overflow-hidden z-10 shadow-2xl flex flex-col md:flex-row my-8"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
            >
              {/* Left Side: Images Stream */}
              <div className="w-full md:w-1/2 bg-[#171717] relative flex flex-col">
                <div className="aspect-[4/3] md:h-[400px] overflow-hidden relative">
                  <img 
                    src={selectedProject.imageUrl} 
                    alt={selectedProject.title} 
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute top-4 left-4 bg-black/40 text-white text-[10px] uppercase tracking-widest px-3 py-1 font-mono">
                    Exterior/Primary View
                  </div>
                </div>
                
                {/* Secondary details scroll */}
                <div className="p-4 grid grid-cols-2 gap-3 bg-[#111111]">
                  {selectedProject.secondaryImages.map((imgUrl, sidx) => (
                    <div key={sidx} className="aspect-[4/3] overflow-hidden relative group">
                      <img 
                        src={imgUrl} 
                        alt={`${selectedProject.title} Detail ${sidx + 1}`} 
                        className="w-full h-full object-cover grayscale opacity-70 group-hover:grayscale-0 group-hover:opacity-100 transition-all duration-500"
                      />
                      <div className="absolute bottom-2 left-2 text-white/50 text-[8px] uppercase tracking-widest">
                        Interiors
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Right Side: Editorial architectural specs */}
              <div className="w-full md:w-1/2 p-8 md:p-12 flex flex-col justify-between overflow-y-auto max-h-[85vh] no-scrollbar">
                {/* Header info */}
                <div>
                  <div className="flex justify-between items-start mb-6">
                    <div>
                      <div className="flex items-center gap-1 text-[#171717]/50 text-xs uppercase tracking-widest mb-1.5">
                        <MapPin size={12} className="text-[#171717]/40" />
                        <span>{selectedProject.location}</span>
                      </div>
                      <h4 className="font-serif text-3xl md:text-4xl text-[#171717] font-light">{selectedProject.title}</h4>
                      <p className="text-[10px] uppercase tracking-widest font-semibold text-[#171717]/40 mt-1">{selectedProject.category}</p>
                    </div>
                    
                    <button 
                      id="close-project-modal-btn"
                      onClick={() => setSelectedProject(null)}
                      className="w-10 h-10 border border-[#171717]/10 flex items-center justify-center hover:bg-black/5 transition-colors rounded-full"
                      aria-label="Close details"
                    >
                      <X size={16} className="text-[#171717]" />
                    </button>
                  </div>

                  <hr className="border-[#171717]/5 my-6" />

                  {/* Core description */}
                  <div className="mb-8">
                    <span className="text-[10px] uppercase tracking-widest text-[#171717]/40 block mb-2 font-normal">Design Vision</span>
                    <p className="text-[#171717]/75 text-sm leading-relaxed font-light font-sans">
                      {selectedProject.description}
                    </p>
                  </div>

                  {/* Curated material specs */}
                  <div className="mb-8">
                    <span className="text-[10px] uppercase tracking-widest text-[#171717]/40 block mb-3 font-normal">Luxury Material Palette</span>
                    <div className="flex flex-wrap gap-2.5">
                      {selectedProject.materials.map((matName) => (
                        <button
                          id={`material-chip-${getMaterialId(matName)}`}
                          key={matName}
                          onClick={() => {
                            onSelectMaterial(matName);
                            setSelectedProject(null);
                          }}
                          className="flex items-center gap-1.5 px-3 py-1.5 bg-[#171717]/5 hover:bg-[#171717]/10 transition-colors text-[10px] uppercase tracking-widest font-normal text-[#171717]"
                        >
                          <Layers size={10} className="opacity-60" />
                          <span>{matName}</span>
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Detailed Specs */}
                  <div className="space-y-4">
                    <span className="text-[10px] uppercase tracking-widest text-[#171717]/40 block font-normal">Architectural Chronicles</span>
                    <ul className="space-y-3">
                      {selectedProject.details.map((detail, dIdx) => (
                        <li key={dIdx} className="text-xs font-light text-[#171717]/75 font-sans leading-relaxed list-disc list-inside">
                          {detail}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                {/* Closing Callout CTA */}
                <div className="mt-12 pt-6 border-t border-[#171717]/5 flex justify-between items-center bg-[#171717]/5 p-4 rounded-sm">
                  <div className="text-left">
                    <span className="text-[8px] uppercase tracking-widest text-[#171717]/40 block">Bespoke Commission</span>
                    <p className="text-xs font-serif italic text-[#171717]/80">Annually Selective Availability</p>
                  </div>
                  <a 
                    href="#commission" 
                    onClick={() => setSelectedProject(null)}
                    className="text-[10px] uppercase tracking-widest font-normal border-b border-[#171717] pb-1 hover:opacity-60 transition-opacity"
                  >
                    Discuss Space
                  </a>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </section>
  );
}
