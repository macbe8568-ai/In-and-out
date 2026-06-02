/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Layers, Plus, Trash2, HelpCircle, Flame, MapPin, Check, Bookmark } from 'lucide-react';
import { LUXURY_MATERIALS } from '../data';
import { Material } from '../types';

interface MaterialLibraryProps {
  selectedMaterialName?: string | null;
  onClearSelectedName?: () => void;
}

export default function MaterialLibrary({ selectedMaterialName, onClearSelectedName }: MaterialLibraryProps) {
  const [activeCategory, setActiveCategory] = useState<'all' | 'stone' | 'wood' | 'metal' | 'fabric'>('all');
  const [selectedMaterial, setSelectedMaterial] = useState<Material | null>(null);
  const [moodboard, setMoodboard] = useState<Material[]>([]);
  const [showMoodboardGuide, setShowMoodboardGuide] = useState(false);
  const [moodboardLimitError, setMoodboardLimitError] = useState<string | null>(null);
  const sectionRef = useRef<HTMLDivElement>(null);

  // Synchronize selection from Gallery Material chip clicks
  useEffect(() => {
    if (selectedMaterialName) {
      const match = LUXURY_MATERIALS.find(
        m => m.name.toLowerCase() === selectedMaterialName.toLowerCase()
      );
      if (match) {
        setSelectedMaterial(match);
        // Scroll to Materials section
        sectionRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
        // Clean state
        onClearSelectedName?.();
      }
    }
  }, [selectedMaterialName]);

  const categories = [
    { key: 'all', label: 'All Noble Sources' },
    { key: 'stone', label: 'Stones & Marbles' },
    { key: 'wood', label: 'Fine Woods' },
    { key: 'metal', label: 'Hand-Finished Metals' },
    { key: 'fabric', label: 'Sensory Textiles' }
  ];

  const filteredMaterials = activeCategory === 'all'
    ? LUXURY_MATERIALS
    : LUXURY_MATERIALS.filter(m => m.category === activeCategory);

  const addToMoodboard = (mat: Material) => {
    if (moodboard.some(m => m.id === mat.id)) return;
    if (moodboard.length >= 4) {
      setMoodboardLimitError("A refined moodboard typically comprises at most 4 curated substances.");
      setTimeout(() => setMoodboardLimitError(null), 4000);
      return;
    }
    setMoodboardLimitError(null);
    setMoodboard([...moodboard, mat]);
  };

  const removeFromMoodboard = (id: string) => {
    setMoodboard(moodboard.filter(m => m.id !== id));
  };

  // Dynamically analyze the moodboard mood!
  const analyzeMoodDescription = () => {
    if (moodboard.length === 0) return { title: 'Empty Slate', desc: 'Add luxurious materials below to craft your heritage custom theme.' };
    
    const count = { stone: 0, wood: 0, metal: 0, fabric: 0 };
    moodboard.forEach(m => count[m.category]++);

    if (count.stone > 0 && count.wood > 0 && count.metal > 0 && count.fabric > 0) {
      return {
        title: 'In&Out Absolute Harmony',
        desc: 'A masterfully balanced synthesis combining robust stone architecture, sensory woodwork warmth, soft organic linens, and the understated glitter of Aligarh antique-brushed brass.'
      };
    }
    if (count.stone >= 2 && count.metal >= 1) {
      return {
        title: 'Imperial Brutalism',
        desc: 'Dominated by deep, cold geometric marble slabs and sharp, brushed metal outlines. Highly monumental, intellectual, and dramatic.'
      };
    }
    if (count.wood >= 2 && count.fabric >= 1) {
      return {
        title: 'Organic Beach Sanctuary',
        desc: 'Centering native thermowood planks and cozy raw alpaca loops. Emphasizes absolute quietness, touch-responsiveness, and natural wellness.'
      };
    }
    if (count.stone >= 1 && count.wood >= 1) {
      return {
        title: 'Warm Editorial Contemporary',
        desc: 'A gorgeous interplay between monumental mineral stone faces and fluted walnut cabinetry. Softened by linear organic shadow lines.'
      };
    }
    return {
      title: 'Curated Heritage Theme',
      desc: 'An exquisite material layout. This palette radiates refined restraint and individual design-forward style.'
    };
  };

  const themeAnalysis = analyzeMoodDescription();

  return (
    <section ref={sectionRef} className="py-24 md:py-32 bg-white px-6 md:px-12 border-b border-[#171717]/5" id="materials">
      <div className="max-w-[1920px] mx-auto">
        
        {/* Title & Introduction */}
        <motion.div 
          initial={{ opacity: 0, y: 25 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="max-w-4xl mb-16"
        >
          <span className="text-xs uppercase tracking-widest text-[#171717]/40 block mb-3 font-normal">Origins & Texture</span>
          <h2 className="font-serif text-4xl md:text-5xl font-light tracking-tight text-[#171717] mb-6">
            The Bespoke <span className="italic text-[#171717]/50">Material Library</span>
          </h2>
          <p className="font-sans text-sm text-[#171717]/60 leading-relaxed max-w-2xl font-light">
            We scour old quarries of Rajasthan, sustainable Central Indian woodlands, and historic brass foundries to extract materials of exquisite behavior. Assemble them in real-time below to preview your lifestyle envelope.
          </p>
        </motion.div>

        {/* Dynamic Moodboard Workbench Panel */}
        <motion.div 
          initial={{ opacity: 0, scale: 0.98, y: 30 }}
          whileInView={{ opacity: 1, scale: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
          className="bg-[#FAFAFA] border border-[#171717]/5 p-6 md:p-10 rounded-sm mb-20"
        >
          <div className="flex flex-col lg:flex-row justify-between items-start gap-12">
            
            {/* Visual Collage Card */}
            <div className="w-full lg:w-7/12">
              <div className="flex justify-between items-center mb-6">
                <div className="flex items-center gap-2">
                  <Bookmark size={14} className="text-[#171717]/60" />
                  <h3 className="text-xs uppercase tracking-widest font-semibold text-[#171717]">Moodboard Workbench</h3>
                </div>
                <button 
                  id="moodboard-help-btn"
                  onClick={() => setShowMoodboardGuide(!showMoodboardGuide)}
                  className="text-xs text-[#171717]/40 hover:text-[#171717]/80 flex items-center gap-1"
                >
                  <HelpCircle size={12} />
                  <span>Interactive Guide</span>
                </button>
              </div>

              {/* Guide Alert */}
              <AnimatePresence>
                {showMoodboardGuide && (
                  <motion.div 
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    className="p-4 bg-[#171717]/5 border border-[#171717]/10 mb-6 text-xs text-[#171717]/70 leading-relaxed font-light"
                  >
                    Select stone slabs, rich grain indigenous timbers, custom hand-brushed metals, or organic khadi linens below. Limit to 4 elements. The workbench evaluates physical weights and provides aesthetic direction in real-time.
                  </motion.div>
                )}
              </AnimatePresence>

              {/* Limit Warning Alert */}
              <AnimatePresence>
                {moodboardLimitError && (
                  <motion.div 
                    initial={{ opacity: 0, y: -15 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -15 }}
                    className="p-4 bg-amber-500/10 border border-amber-500/20 mb-6 text-xs text-amber-800 leading-relaxed font-sans font-medium flex items-center gap-2 rounded-sm"
                  >
                    <span>⚠️ {moodboardLimitError}</span>
                  </motion.div>
                )}
              </AnimatePresence>

              {/* Dynamic Collage Grid */}
              <div className="aspect-[2/1] md:aspect-[3/1.2] border border-[#171717]/5 rounded-sm overflow-hidden relative bg-white flex">
                {moodboard.length === 0 ? (
                  <div className="absolute inset-0 flex flex-col items-center justify-center text-center p-6 bg-[#171717]/2">
                    <span className="font-serif italic text-lg text-[#171717]/40 mb-2">An empty canvas awaits</span>
                    <p className="text-[10px] uppercase tracking-widest text-[#171717]/30 max-w-xs leading-relaxed">
                      Click the [+] Add to moodboard button on any of our materials below
                    </p>
                  </div>
                ) : (
                  <div className="w-full h-full flex transition-all duration-550 ease-out">
                    {moodboard.map((mat, mIdx) => (
                      <motion.div 
                        id={`moodboard-slot-${mat.id}`}
                        key={mat.id}
                        initial={{ width: 0, opacity: 0 }}
                        animate={{ width: `${100 / moodboard.length}%`, opacity: 1 }}
                        exit={{ width: 0, opacity: 0 }}
                        className="h-full relative group overflow-hidden border-r border-[#FAFAFA]"
                      >
                        <img 
                          src={mat.image} 
                          alt={mat.name} 
                          className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                        />
                        <div className="absolute inset-0 bg-black/40 group-hover:bg-black/20 transition-all duration-300" />
                        
                        {/* Material Info Slice */}
                        <div className="absolute bottom-4 left-4 right-4 text-white">
                          <span className="text-[8px] uppercase tracking-widest opacity-60 block">{mat.category}</span>
                          <h4 className="font-serif italic text-sm md:text-base leading-tight font-light truncate">{mat.name}</h4>
                          <span className="text-[8px] uppercase tracking-widest font-mono opacity-80 block truncate mt-1">
                            {mat.origin.split(',')[0]}
                          </span>
                        </div>

                        {/* Remove Button Overlay */}
                        <button 
                          id={`remove-moodboard-btn-${mat.id}`}
                          onClick={() => removeFromMoodboard(mat.id)}
                          className="absolute top-3 right-3 w-7 h-7 bg-black/70 hover:bg-black text-white flex items-center justify-center rounded-full transition-colors opacity-0 group-hover:opacity-100"
                          aria-label="Remove element"
                        >
                          <Trash2 size={12} />
                        </button>
                      </motion.div>
                    ))}
                  </div>
                )}
              </div>
            </div>

            {/* Harmony Report Card & Actions */}
            <div className="w-full lg:w-5/12 flex flex-col justify-between self-stretch bg-white border border-[#171717]/5 p-6 md:p-8">
              <div>
                <span className="text-[9px] uppercase tracking-widest text-[#171717]/40 block mb-2">Heritage Soundness Index</span>
                <h4 className="font-serif text-2xl font-light text-[#171717] mb-2">{themeAnalysis.title}</h4>
                <p className="text-xs font-sans text-[#171717]/60 leading-relaxed font-light mb-6">
                  {themeAnalysis.desc}
                </p>

                {moodboard.length > 0 && (
                  <div className="grid grid-cols-2 gap-4 pt-4 border-t border-[#171717]/5">
                    <div>
                      <span className="text-[8px] uppercase tracking-widest text-[#171717]/40 block mb-1">Curation Scale</span>
                      <p className="text-xs font-mono font-medium text-[#171717]">{moodboard.length} / 4 elements</p>
                    </div>
                    <div>
                      <span className="text-[8px] uppercase tracking-widest text-[#171717]/40 block mb-1">Aesthetic Sync</span>
                      <div className="flex items-center gap-1 text-xs text-[#171717] font-mono">
                        <Check size={12} className="text-[#171717]/60" />
                        <span>High-end Harmony</span>
                      </div>
                    </div>
                  </div>
                )}
              </div>

              {/* Action buttons */}
              <div className="mt-8 pt-6 border-t border-[#171717]/5 flex gap-3">
                <button 
                  id="reset-moodboard-btn"
                  onClick={() => setMoodboard([])}
                  disabled={moodboard.length === 0}
                  className="px-4 py-3 border border-[#171717]/10 text-[#171717]/60 hover:text-[#171717] hover:border-[#171717]/30 text-xs uppercase tracking-widest disabled:opacity-20 transition-all font-light"
                >
                  Clear Palette
                </button>
                <a 
                  id="transfer-moodboard-btn"
                  href="#commission"
                  className="flex-1 px-4 py-3 bg-[#171717] text-white hover:bg-black text-xs uppercase tracking-widest text-center transition-colors font-medium flex items-center justify-center gap-2"
                >
                  <span>Build commission with materials</span>
                </a>
              </div>
            </div>

          </div>
        </motion.div>

        {/* Noble Materials Catalog View */}
        <div>
          {/* Filters Category Ribbon */}
          <div className="flex flex-wrap border-b border-[#171717]/10 mb-12 gap-8 md:gap-12 pb-2.5">
            {categories.map((cat) => (
              <button
                id={`cat-filter-${cat.key}`}
                key={cat.key}
                onClick={() => setActiveCategory(cat.key as any)}
                className={`text-xs uppercase tracking-widest font-normal pb-3 relative transition-colors duration-300 ${
                  activeCategory === cat.key 
                    ? 'text-[#171717]' 
                    : 'text-[#171717]/40 hover:text-[#171717]/70'
                }`}
              >
                {cat.label}
                {activeCategory === cat.key && (
                  <motion.div 
                    layoutId="activeCategoryBorder" 
                    className="absolute bottom-0 left-0 right-0 h-[1.5px] bg-[#171717]" 
                  />
                )}
              </button>
            ))}
          </div>

          {/* Grid Layout */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredMaterials.map((mat, mIdx) => {
              const inMoodboard = moodboard.some(m => m.id === mat.id);
              return (
                <motion.div 
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-40px" }}
                  transition={{ duration: 0.7, delay: Math.min((mIdx % 3) * 0.1, 0.4), ease: [0.16, 1, 0.3, 1] }}
                  id={`material-card-${mat.id}`}
                  key={mat.id}
                  className="bg-white border border-[#171717]/5 group flex flex-col justify-between p-4 bg-gradient-to-b hover:from-white hover:to-[#FAFAFA] transition-all duration-350"
                >
                  <div>
                    {/* Material Image Slice */}
                    <div 
                      onClick={() => setSelectedMaterial(mat)}
                      className="aspect-[4/3] overflow-hidden bg-[#E5E5E5] mb-5 relative cursor-pointer"
                    >
                      <img 
                        src={mat.image} 
                        alt={mat.name} 
                        className="w-full h-full object-cover transition-transform duration-[1.2s] ease-[0.16, 1, 0.3, 1] group-hover:scale-105"
                      />
                      <div className="absolute inset-0 bg-black/10 group-hover:bg-black/0 transition-colors" />
                    </div>

                    {/* Metadata line */}
                    <div className="flex justify-between items-start mb-2">
                      <div>
                        <span className="text-[9px] uppercase tracking-widest text-[#171717]/40 block font-normal">{mat.category}</span>
                        <h3 
                          onClick={() => setSelectedMaterial(mat)}
                          className="font-serif text-xl tracking-tight text-[#171717] hover:text-[#171717]/60 transition-colors cursor-pointer"
                        >
                          {mat.name}
                        </h3>
                      </div>
                      <div className="flex items-center gap-1.5 text-[9px] uppercase tracking-widest text-[#171717]/50">
                        <MapPin size={10} className="opacity-70" />
                        <span>{mat.origin.split(',').pop()?.trim()}</span>
                      </div>
                    </div>

                    <p className="text-xs text-[#171717]/60 leading-relaxed font-light mb-6">
                      {mat.description}
                    </p>
                  </div>

                  {/* Actions Shelf */}
                  <div className="flex justify-between items-center pt-4 border-t border-[#171717]/5">
                    <button 
                      id={`inspect-material-btn-${mat.id}`}
                      onClick={() => setSelectedMaterial(mat)}
                      className="text-[10px] uppercase tracking-widest text-[#171717]/80 hover:text-[#171717] border-b border-[#171717]/10"
                    >
                      Inspect Finishes
                    </button>

                    <button
                      id={`add-moodboard-btn-${mat.id}`}
                      onClick={() => addToMoodboard(mat)}
                      disabled={inMoodboard}
                      className={`text-[10px] uppercase tracking-widest px-3 py-1.5 flex items-center gap-1 transition-all ${
                        inMoodboard
                          ? 'border border-[#171717]/5 bg-[#171717]/5 text-[#171717]/30'
                          : 'border border-[#171717]/10 text-[#171717] hover:bg-[#171717] hover:text-white hover:border-[#171717]'
                      }`}
                    >
                      {inMoodboard ? (
                        <>
                          <Check size={10} />
                          <span>Assembled</span>
                        </>
                      ) : (
                        <>
                          <Plus size={10} />
                          <span>Add to Moodboard</span>
                        </>
                      )}
                    </button>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>

      </div>

      {/* Material Detailed Specification Slider Sheet */}
      <AnimatePresence>
        {selectedMaterial && (
          <div className="fixed inset-0 z-50 overflow-hidden bg-black/80 backdrop-blur-sm flex justify-end">
            {/* Click mask to close */}
            <div className="absolute inset-0 cursor-pointer" onClick={() => setSelectedMaterial(null)} />

            {/* Slider Sheet */}
            <motion.div
              id="material-slider-sheet"
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', damping: 26, stiffness: 220 }}
              className="relative w-full max-w-xl bg-[#FAFAFA] h-full shadow-2xl overflow-y-auto p-8 md:p-12 z-10 flex flex-col justify-between"
            >
              <div>
                {/* Header Close button */}
                <div className="flex justify-between items-center mb-8">
                  <span className="text-xs uppercase tracking-widest text-[#171717]/40">Substance Specification</span>
                  <button 
                    id="close-material-sheet-btn"
                    onClick={() => setSelectedMaterial(null)}
                    className="w-8 h-8 rounded-full border border-[#171717]/10 flex items-center justify-center hover:bg-black/5 transition-colors"
                  >
                    Close
                  </button>
                </div>

                {/* Primary Image slab */}
                <div className="aspect-[4/3] bg-[#E5E5E5] overflow-hidden mb-8">
                  <img 
                    src={selectedMaterial.image} 
                    alt={selectedMaterial.name} 
                    className="w-full h-full object-cover"
                  />
                </div>

                <span className="text-[10px] uppercase tracking-widest text-[#171717]/40 block mb-1">{selectedMaterial.category}</span>
                <h3 className="font-serif text-3xl text-[#171717] font-light mb-2">{selectedMaterial.name}</h3>
                <div className="flex items-center gap-1 text-xs text-[#171717]/60 uppercase tracking-wider mb-6">
                  <MapPin size={12} className="text-[#171717]/40" />
                  <span>Quarried / Gathered in {selectedMaterial.origin}</span>
                </div>

                <hr className="border-[#171717]/5 my-6" />

                {/* Narrative */}
                <div className="mb-8">
                  <span className="text-[10px] uppercase tracking-widest text-[#171717]/40 block mb-2 font-normal">Geological & Botanical Narrative</span>
                  <p className="text-sm font-sans text-[#171717]/70 leading-relaxed font-light">
                    {selectedMaterial.description}
                  </p>
                </div>

                {/* Finishes */}
                <div>
                  <span className="text-[10px] uppercase tracking-widest text-[#171717]/40 block mb-3 font-normal">Available Studio Finishes</span>
                  <div className="space-y-2">
                    {selectedMaterial.finishes.map((f, fIdx) => (
                      <div key={fIdx} className="flex justify-between items-center p-3 border border-[#171717]/5 bg-white text-xs font-sans text-[#171717]">
                        <span className="font-medium text-[#171717]/80">{f}</span>
                        <span className="text-[10px] uppercase tracking-widest text-[#171717]/40">In&Out Fine Touch</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Bottom Moodboard Integration drawer */}
              <div className="mt-12 pt-6 border-t border-[#171717]/5 flex gap-4">
                <button
                  id={`add-moodboard-drawer-btn-${selectedMaterial.id}`}
                  onClick={() => {
                    addToMoodboard(selectedMaterial);
                    setSelectedMaterial(null);
                  }}
                  className="w-full px-6 py-3.5 bg-[#171717] text-white hover:bg-black text-xs uppercase tracking-widest text-center font-medium transition-colors"
                >
                  Assemble to Active Workbench
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </section>
  );
}
