/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, useEffect, FormEvent } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Mail, Compass, Sparkles, FolderKanban, CheckCheck, Trash2, Calendar, ClipboardList } from 'lucide-react';
import { Inquiry } from '../types';

export default function ConsultationForm() {
  const [inquiries, setInquiries] = useState<Inquiry[]>([]);
  const [showAdminPortal, setShowAdminPortal] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submissionSuccess, setSubmissionSuccess] = useState(false);
  const [formError, setFormError] = useState<string | null>(null);
  const [sureToPurge, setSureToPurge] = useState(false);

  // Form State
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [projectType, setProjectType] = useState('Space planning & Core');
  const [budget, setBudget] = useState('₹15,00,000 - ₹35,00,050');
  const [timeframe, setTimeframe] = useState('Within 3 Months');
  const [details, setDetails] = useState('');

  // Prepopulate or load from LocalStorage on mount
  useEffect(() => {
    const stored = localStorage.getItem('inandout_inquiries');
    if (stored) {
      try {
        setInquiries(JSON.parse(stored));
      } catch (e) {
        console.error("Fails parsing inquiries", e);
      }
    } else {
      // Seed initially one premium default client so the inbox board isn't completely bare
      const initialSeed: Inquiry[] = [
        {
          id: 'seed-1',
          name: 'Rajesh Patel',
          email: 'rajesh.patel@jabalpurgroup.com',
          projectType: 'Space planning & Core',
          budget: '₹15,00,000 - ₹35,00,000',
          timeframe: 'Immediate Studio Onboarding',
          details: 'Seeking room and space planning services with fluted teakwood wall cladding for our duplex in Sheetalpuri, Jabalpur. Wishing to also evaluate lighting selection.',
          timestamp: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toLocaleString(),
          status: 'contacted'
        }
      ];
      setInquiries(initialSeed);
      localStorage.setItem('inandout_inquiries', JSON.stringify(initialSeed));
    }
  }, []);

  const saveInquiriesToStorage = (updatedInquiries: Inquiry[]) => {
    setInquiries(updatedInquiries);
    localStorage.setItem('inandout_inquiries', JSON.stringify(updatedInquiries));
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !email.trim() || !details.trim()) {
      setFormError("Please honor our master house protocols by providing Name, Email, and Spatial Vision details.");
      return;
    }

    setFormError(null);
    setIsSubmitting(true);

    // Simulate luxury envelope sealing / processing
    setTimeout(() => {
      const newInquiry: Inquiry = {
        id: `inq-${Date.now()}`,
        name,
        email,
        projectType,
        budget,
        timeframe,
        details,
        timestamp: new Date().toLocaleString(),
        status: 'new'
      };

      const updated = [newInquiry, ...inquiries];
      saveInquiriesToStorage(updated);
      setIsSubmitting(false);
      setSubmissionSuccess(true);
      
      // Reset form fields
      setName('');
      setEmail('');
      setDetails('');
    }, 1500);
  };

  const triageStatus = (id: string, newStatus: 'new' | 'contacted' | 'archived') => {
    const updated = inquiries.map(inq => {
      if (inq.id === id) {
        return { ...inq, status: newStatus };
      }
      return inq;
    });
    saveInquiriesToStorage(updated);
  };

  const deleteInquiry = (id: string) => {
    const updated = inquiries.filter(inq => inq.id !== id);
    saveInquiriesToStorage(updated);
  };

  const projectTiers = [
    'Space planning & Core',
    'Living & Private Areas',
    'Fittings & Finishes',
    'Commercial & Hospitality'
  ];

  const budgets = [
    '₹5,00,000 - ₹15,00,000',
    '₹15,00,000 - ₹35,00,000',
    '₹35,00,000 - ₹50,00,000',
    '₹50,00,000+'
  ];

  const timeframes = [
    'Immediate Studio Onboarding',
    'Within 3 Months',
    '3 - 6 Months Scope',
    'General Consultation Inquiry'
  ];

  return (
    <section id="commission" className="py-24 md:py-32 bg-[#0A0A0A] text-white overflow-hidden relative">
      {/* Absolute background patterns */}
      <div className="absolute inset-0 z-0 opacity-5 pointer-events-none bg-[radial-gradient(#FAFAFA_1px,transparent_1px)] [background-size:24px_24px]" />

      <div className="max-w-4xl mx-auto px-6 relative z-10 flex flex-col items-center">
        
        {/* Editorial Heading */}
        <motion.div 
          initial={{ opacity: 0, y: 25 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="text-center mb-16"
        >
          <span className="text-[10px] uppercase tracking-widest text-white/40 block mb-3 font-normal">Private Ingress</span>
          <h2 className="font-serif text-5xl md:text-7xl mb-6 leading-none tracking-tight font-light text-white">
            Begin Your <br />
            <span className="italic text-white/60">Commission</span>
          </h2>
          <p className="font-sans text-white/50 max-w-md mx-auto text-sm font-light leading-relaxed">
            We invite you to register your residential or commercial project. In&amp;Out Spaces accepts a selective number of boutique spatial design inquiries.
          </p>
        </motion.div>

        {/* Dynamic Workflow Area */}
        <motion.div 
          initial={{ opacity: 0, y: 35 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.8, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
          className="w-full max-w-xl mx-auto bg-white/5 border border-white/10 p-8 md:p-12 rounded-sm backdrop-blur-sm"
        >
          <AnimatePresence mode="wait">
            {!submissionSuccess ? (
              <motion.form 
                id="commission-form"
                onSubmit={handleSubmit}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="space-y-8 text-left"
              >
                {/* 1. Project Type Selector */}
                <div className="space-y-3">
                  <label className="text-[10px] uppercase tracking-widest font-normal text-white/40 block">01. Service Specialty</label>
                  <div className="grid grid-cols-2 gap-2">
                    {projectTiers.map(tier => (
                      <button
                        id={`btn-service-choice-${tier.toLowerCase().replace(/\s+/g, '-')}`}
                        type="button"
                        key={tier}
                        onClick={() => setProjectType(tier)}
                        className={`p-3 text-left text-[10px] uppercase tracking-widest transition-all border ${
                          projectType === tier 
                            ? 'border-white bg-white text-black font-medium' 
                            : 'border-white/10 hover:border-white/30 text-white/70'
                        }`}
                      >
                        {tier}
                      </button>
                    ))}
                  </div>
                </div>

                {/* 2. Client Identity Row */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-3">
                    <label className="text-[10px] uppercase tracking-widest font-normal text-white/40 block">02. Name</label>
                    <input 
                      id="input-full-name"
                      type="text" 
                      required
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      className="w-full bg-transparent border border-white/15 px-4 py-3 text-sm text-white font-light focus:outline-none focus:border-white/60 transition-colors placeholder-white/20" 
                      placeholder="Enter full name"
                    />
                  </div>

                  <div className="space-y-3">
                    <label className="text-[10px] uppercase tracking-widest font-normal text-white/40 block">03. Email Address</label>
                    <input 
                      id="input-email-address"
                      type="email" 
                      required
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="w-full bg-transparent border border-white/15 px-4 py-3 text-sm text-white font-light focus:outline-none focus:border-white/60 transition-colors placeholder-white/20" 
                      placeholder="studio@client.com"
                    />
                  </div>
                </div>

                {/* 3. Budget Range */}
                <div className="space-y-3">
                  <label className="text-[10px] uppercase tracking-widest font-normal text-white/40 block">04. Projected Allocation Range</label>
                  <select 
                    id="select-budget-tier"
                    value={budget}
                    onChange={(e) => setBudget(e.target.value)}
                    className="w-full bg-[#111] border border-white/15 px-4 py-3 text-sm text-white/80 font-light focus:outline-none focus:border-white/60 transition-colors select-custom"
                  >
                    {budgets.map(b => (
                      <option key={b} value={b} className="bg-[#111] text-white">{b}</option>
                    ))}
                  </select>
                </div>

                {/* 4. Timeframe Spec */}
                <div className="space-y-3">
                  <label className="text-[10px] uppercase tracking-widest font-normal text-white/40 block">05. Preferred Onboarding Timeframe</label>
                  <div className="grid grid-cols-2 gap-2">
                    {timeframes.map(tf => (
                      <button
                        id={`btn-timeframe-choice-${tf.toLowerCase().replace(/\s+/g, '-')}`}
                        type="button"
                        key={tf}
                        onClick={() => setTimeframe(tf)}
                        className={`p-3 text-[10px] uppercase tracking-widest transition-all border ${
                          timeframe === tf 
                            ? 'border-white bg-white/10 text-white font-medium' 
                            : 'border-white/5 hover:border-white/15 text-white/50'
                        }`}
                      >
                        {tf}
                      </button>
                    ))}
                  </div>
                </div>

                {/* 5. Spatial Vision */}
                <div className="space-y-3">
                  <label className="text-[10px] uppercase tracking-widest font-normal text-white/40 block">06. Spatial Vision Summary</label>
                  <textarea 
                    id="textarea-project-details"
                    rows={4} 
                    required
                    value={details}
                    onChange={(e) => setDetails(e.target.value)}
                    className="w-full bg-transparent border border-white/15 px-4 py-3 text-sm text-white font-light focus:outline-none focus:border-white/60 transition-colors placeholder-white/20 resize-none" 
                    placeholder="Describe your architectural envelope, light exposure, and core requirements..."
                  ></textarea>
                </div>

                {formError && (
                  <motion.div 
                    initial={{ opacity: 0, y: -5 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="p-3 bg-red-400/10 border border-red-500/25 text-red-200 text-xs rounded-sm font-sans font-light"
                  >
                    {formError}
                  </motion.div>
                )}

                {/* Submit button with luxury loading effects */}
                <button 
                  id="submit-inquiry-btn"
                  type="submit" 
                  disabled={isSubmitting}
                  className="w-full px-8 py-4 bg-white text-black text-xs uppercase tracking-widest font-medium hover:bg-[#E5E5E5] transition-colors duration-500 text-center flex justify-center items-center gap-2 group mt-6"
                >
                  {isSubmitting ? (
                    <>
                      <div className="animate-spin rounded-full h-3 w-3 border-t border-b border-black" />
                      <span>Transmitting Blueprint Sealing...</span>
                    </>
                  ) : (
                    <>
                      <span>Transmit Inquiry</span>
                      <Compass size={14} className="group-hover:rotate-45 transition-transform duration-500 text-black" />
                    </>
                  )}
                </button>
              </motion.form>
            ) : (
              <motion.div 
                id="submission-success-container"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0 }}
                className="text-center py-12 space-y-6"
              >
                <div className="w-16 h-16 rounded-full bg-white/10 border border-white/20 flex items-center justify-center mx-auto">
                  <CheckCheck size={28} className="text-white" />
                </div>
                
                <h3 className="font-serif text-3xl font-light">Sealed &amp; Transmitted</h3>
                
                <div className="text-white/60 text-sm leading-relaxed max-w-sm mx-auto font-light space-y-4">
                  <p>
                    Thank you, <span className="text-white font-medium">{inquiries[0]?.name}</span>. Your vision report has been digitally sealed and indexed under local registry.
                  </p>
                  <p className="italic text-xs text-white/40 font-serif">
                    "Fine design demands passion and precision. The team at In&amp;Out Spaces will contact you within 48 business hours to establish layout parameters and timelines."
                  </p>
                </div>

                <div className="pt-4 flex flex-col sm:flex-row gap-3 justify-center">
                  <button
                    id="submit-another-btn"
                    onClick={() => setSubmissionSuccess(false)}
                    className="px-6 py-2.5 border border-white/20 hover:border-white text-xs uppercase tracking-widest text-white transition-colors"
                  >
                    Submit New Custom Workspace
                  </button>
                  <button
                    id="view-portal-fast-btn"
                    onClick={() => setShowAdminPortal(true)}
                    className="px-6 py-2.5 bg-white text-black hover:bg-neutral-200 text-xs uppercase tracking-widest transition-colors font-medium"
                  >
                    Inspect Inbox Record ({inquiries.length})
                  </button>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>

        {/* Separator line for Admin portal entry */}
        <div className="mt-16 pt-8 border-t border-white/10 w-full flex flex-col items-center">
          <button 
            id="toggle-inbox-dashboard-btn"
            onClick={() => setShowAdminPortal(!showAdminPortal)}
            className="flex items-center gap-2 px-5 py-2 text-[10px] uppercase tracking-widest text-white/40 hover:text-white transition-colors border border-white/5 hover:border-white/20 rounded-full"
          >
            <ClipboardList size={12} />
            <span>{showAdminPortal ? "Hide Studio Inbox Registry" : "Review Studio Inquiries Inbox Board"}</span>
          </button>
        </div>

        {/* Collapsible Inbox Registry Panel */}
        <AnimatePresence>
          {showAdminPortal && (
            <motion.div 
              id="admin-portal-dashboard"
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="w-full border border-white/10 mt-10 bg-[#111111] p-6 md:p-8 overflow-hidden rounded-sm text-left"
            >
              <div className="flex justify-between items-center mb-8 pb-4 border-b border-white/10">
                <div>
                  <h4 className="text-xs uppercase tracking-widest font-semibold text-white">In&amp;Out Spaces CRM Panel</h4>
                  <p className="text-[10px] uppercase tracking-widest text-[#171717]/40 block opacity-50">Local Web Registry ({inquiries.length} Active Records)</p>
                </div>
                <button 
                  id="clear-all-records-btn"
                  onClick={() => {
                    if (sureToPurge) {
                      saveInquiriesToStorage([]);
                      setSureToPurge(false);
                    } else {
                      setSureToPurge(true);
                      setTimeout(() => setSureToPurge(false), 5000);
                    }
                  }}
                  className={`text-[9px] uppercase tracking-widest transition-colors font-medium ${
                    sureToPurge 
                      ? 'text-yellow-300 hover:text-yellow-250 animate-pulse' 
                      : 'text-red-400 hover:text-red-350'
                  }`}
                >
                  {sureToPurge ? "Click again to confirm purge" : "Purge Registry"}
                </button>
              </div>

              {inquiries.length === 0 ? (
                <p className="text-xs text-white/40 italic py-6 text-center">No active commissions recorded. Try submitting the luxury booking form above.</p>
              ) : (
                <div className="space-y-6">
                  {inquiries.map((inq) => (
                    <div 
                      key={inq.id}
                      className="p-5 bg-white/5 border border-white/5 rounded-sm flex flex-col md:flex-row justify-between gap-6"
                    >
                      <div className="space-y-3 flex-1">
                        {/* Name Line */}
                        <div className="flex flex-wrap items-center gap-2">
                          <span className="font-serif text-lg font-normal text-white">{inq.name}</span>
                          <span className="text-[8px] px-2 py-0.5 bg-white/10 text-white/70 uppercase tracking-widest rounded-full">{inq.projectType}</span>
                          
                          <span className={`text-[8px] px-2 py-0.5 uppercase tracking-widest rounded-full ${
                            inq.status === 'new' 
                              ? 'bg-amber-400/20 text-amber-300' 
                              : inq.status === 'contacted'
                              ? 'bg-blue-400/20 text-blue-300'
                              : 'bg-white/10 text-white/50'
                          }`}>
                            {inq.status}
                          </span>
                        </div>

                        {/* Details Block */}
                        <p className="text-xs text-white/70 leading-relaxed font-light">{inq.details}</p>

                        <div className="flex flex-wrap items-center gap-y-2 gap-x-6 text-[10px] text-white/45 font-mono">
                          <div className="flex items-center gap-1">
                            <Mail size={10} />
                            <span>{inq.email}</span>
                          </div>
                          <div>Budget: <span className="text-white/70 font-medium">{inq.budget}</span></div>
                          <div>Onboard: <span className="text-white/70 font-medium">{inq.timeframe}</span></div>
                          <div className="flex items-center gap-1">
                            <Calendar size={10} />
                            <span>Indexed: {inq.timestamp}</span>
                          </div>
                        </div>
                      </div>

                      {/* Controls Area */}
                      <div className="flex md:flex-col justify-end gap-2 shrink-0 border-t md:border-t-0 pt-4 md:pt-0 border-white/5">
                        <button
                          id={`triage-contacted-btn-${inq.id}`}
                          onClick={() => triageStatus(inq.id, 'contacted')}
                          disabled={inq.status === 'contacted'}
                          className="px-3 py-1 bg-blue-500/10 text-blue-300 hover:bg-blue-500/20 text-[9px] uppercase tracking-widest border border-blue-500/25 disabled:opacity-30 rounded-sm transition-opacity"
                        >
                          Mark Contacted
                        </button>
                        <button
                          id={`triage-archive-btn-${inq.id}`}
                          onClick={() => triageStatus(inq.id, 'archived')}
                          disabled={inq.status === 'archived'}
                          className="px-3 py-1 bg-white/5 text-white/60 hover:bg-white/10 text-[9px] uppercase tracking-widest border border-white/10 disabled:opacity-30 rounded-sm transition-opacity"
                        >
                          Archive
                        </button>
                        <button
                          id={`delete-inquiry-btn-${inq.id}`}
                          onClick={() => deleteInquiry(inq.id)}
                          className="px-3 py-1 bg-red-500/10 text-red-300 hover:bg-red-500/20 text-[9px] uppercase tracking-widest border border-red-500/25 rounded-sm flex items-center justify-center gap-1 text-center"
                          aria-label="Delete entry"
                        >
                          <Trash2 size={10} />
                          <span>Delete</span>
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </motion.div>
          )}
        </AnimatePresence>

        <div className="mt-16 text-xs text-white/40 tracking-widest font-light flex items-center gap-4">
          <span className="">17, Baldeobagh, Sheetalpuri</span>
          <span className="w-1 h-1 rounded-full bg-white/20"></span>
          <span>Jabalpur, Madhya Pradesh 482002</span>
        </div>

      </div>
    </section>
  );
}
