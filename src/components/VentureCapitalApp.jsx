'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import '../styles/ventureApp.css';
import {
  Activity,
  Layers,
  TrendingUp,
  ArrowUpRight,
  Cpu,
  CheckCircle2,
  Zap,
  Clock
} from 'lucide-react';

// ============================================================================
// 1. DATA STRUCTURES (STATUS, STAGE, CAPITAL) — ALL IN INDIAN RUPEES (₹)
// ============================================================================

export const STATUS_DATA = {
  telemetry: [
    { label: 'Deployment Velocity', value: '91.4%', delta: '+4.8% MoM', trend: 'up' },
    { label: 'Active Syndicate Pipeline', value: '₹180 Cr', delta: '18 Deals in Diligence', trend: 'neutral' },
    { label: 'Reserve Buffer Ratio', value: '42.0%', delta: 'Target ≥ 40%', trend: 'up' },
    { label: 'Diligence Velocity', value: '3.2 Wks', delta: '-1.1 Wks vs Industry', trend: 'up' },
  ],
  nodes: [
    {
      id: 'deal-stream',
      name: 'Deal Stream Ingestion',
      metric: '28 Deals / Wk',
      ping: '14ms SLA',
      detail: 'High-conviction student and campus founders evaluated via rigorous proprietary vetting.',
    },
    {
      id: 'consensus-engine',
      name: 'Syndicate Consensus Engine',
      metric: '98.4% Quorum',
      ping: 'Synchronous',
      detail: 'Partner voting rails executing algorithmic scorecards and co-investor allocation agreements.',
    },
    {
      id: 'capital-rails',
      name: 'Capital Execution Gateway',
      metric: '₹42 Cr Deployable',
      ping: 'Instant Disbursal',
      detail: 'Direct capital release infrastructure paired with milestone-governed escrow tranches.',
    },
    {
      id: 'enterprise-mesh',
      name: 'Star Enterprise Capability Mesh',
      metric: '70+ Enterprise Rails',
      ping: 'Direct Access',
      detail: 'Direct plug-in to Star Groups commercial footprint (Airbus, Boeing, Accenture, Siemens) for instant B2B pilots.',
    },
  ],
  liveLogs: [
    { time: '14:28 IST', event: 'Pre-Seed Term Sheet Dispatched', target: 'Project TensorCore (IIT Madras)', status: 'COMPLETED' },
    { time: '12:15 IST', event: 'Enterprise Pilot Validated', target: 'AeroDynamics AI · Enterprise Rail', status: 'VERIFIED' },
    { time: '09:44 IST', event: 'Syndicate Tranche Alloc ₹6.0 Cr', target: 'Foundry OS · Seed Syndicate', status: 'ALLOCATED' },
  ]
};

export const STAGE_DATA = [
  {
    id: 'pre-seed',
    badge: 'STAGE 01',
    name: 'Pre-Seed / Campus Incubation',
    cheque: '₹40 Lakhs – ₹1.2 Crores',
    turnaround: '10–14 Days',
    focus: 'Student founders, university lab spinouts, and early engineering prototypes.',
    metrics: [
      { label: 'Target Valuation', value: '₹12 Cr – ₹25 Cr Cap' },
      { label: 'Typical Runway', value: '12 – 18 Months' },
      { label: 'Star Capability Grant', value: 'StarTech Stack + Cloud Infrastructure' },
      { label: 'Governance', value: 'Advisor Seat / Zero Board Overhead' },
    ],
    vectors: [
      'Technical moat with working functional demo or repository proof',
      'Full-time technical founding duo committed pre-graduation',
      'Direct pipeline access to university incubation labs and patent rails'
    ]
  },
  {
    id: 'institutional-seed',
    badge: 'STAGE 02',
    name: 'Institutional Seed Check',
    cheque: '₹2.0 Crores – ₹6.0 Crores',
    turnaround: '14–21 Days',
    focus: 'Early commercial traction, validated pilot customers, and expanding enterprise queues.',
    metrics: [
      { label: 'Target Valuation', value: '₹30 Cr – ₹60 Cr' },
      { label: 'Typical Runway', value: '18 – 24 Months' },
      { label: 'Star Capability Grant', value: 'Star Growth Hub GTM Pod' },
      { label: 'Governance', value: 'Board Observer / Strategic Sync' },
    ],
    vectors: [
      'Initial annualized recurring revenue or verified pilot waitlists',
      'Demonstrated 40%+ retention or defensible unit economics',
      'Readiness for Star Groups enterprise partner deployments'
    ]
  },
  {
    id: 'series-a',
    badge: 'STAGE 03',
    name: 'Early Series A Syndicate',
    cheque: '₹8.0 Crores – ₹20.0 Crores',
    turnaround: '21–28 Days',
    focus: 'Proven product-market fit with accelerating enterprise contract values and expansion velocity.',
    metrics: [
      { label: 'Target Valuation', value: '₹100 Cr – ₹200 Cr' },
      { label: 'Typical Runway', value: '24+ Months' },
      { label: 'Star Capability Grant', value: 'Executive Commercial Introductions' },
      { label: 'Governance', value: 'Fiduciary Board Seat' },
    ],
    vectors: [
      'Repeatable enterprise sales motions with net revenue retention > 115%',
      'Gross margins exceeding 70% with scalable operational model',
      'Syndication lead with co-investing institutional funds'
    ]
  },
  {
    id: 'strategic-growth',
    badge: 'STAGE 04',
    name: 'Strategic Growth & Follow-On',
    cheque: '₹20.0 Crores+',
    turnaround: 'Custom Schedule',
    focus: 'Pro-rata protection, breakout venture acceleration, and pan-regional corridor expansion.',
    metrics: [
      { label: 'Target Valuation', value: '₹250 Cr+' },
      { label: 'Typical Runway', value: '30+ Months' },
      { label: 'Star Capability Grant', value: 'Full Star Enterprise Syndicate' },
      { label: 'Governance', value: 'Lead Syndicate Sponsor' },
    ],
    vectors: [
      'Top-decile performance within portfolio cohort',
      'Expansion into cross-border corridors (SE Asia, MENA, US)',
      'Clear path to strategic enterprise liquidity or primary public listing'
    ]
  }
];

export const CAPITAL_DATA = {
  allocation: [
    { sector: 'Early-Stage Campus Checks', percent: 45, capital: '₹180 Cr', color: '#DC2626' },
    { sector: 'Pro-Rata Follow-on Reserves', percent: 35, capital: '₹140 Cr', color: '#B91C1C' },
    { sector: 'Strategic Opportunistic Buffer', percent: 20, capital: '₹80 Cr', color: '#991B1B' },
  ],
  verticals: [
    { name: 'Enterprise SaaS & Applied AI', share: '38%', barWidth: '38%', status: 'Active Deploy' },
    { name: 'DeepTech, Robotics & Automation', share: '28%', barWidth: '28%', status: 'High Priority' },
    { name: 'Industrial Tech & Built Spaces', share: '18%', barWidth: '18%', status: 'Selective' },
    { name: 'FinTech Rails & Consumer Infrastructure', share: '16%', barWidth: '16%', status: 'Opportunistic' },
  ],
  ticketSizes: [
    { amount: '₹80L', stage: 'Pre-Seed', equity: '4.0% – 6.5%', upfront: '60% (₹48L)', tranches: '2 Milestones', credit: '₹20 Lakhs' },
    { amount: '₹2.0 Cr', stage: 'Seed Entry', equity: '6.0% – 9.0%', upfront: '50% (₹1.0 Cr)', tranches: '2 Milestones', credit: '₹40 Lakhs' },
    { amount: '₹4.0 Cr', stage: 'Seed Core', equity: '8.0% – 12.0%', upfront: '50% (₹2.0 Cr)', tranches: '2 Milestones', credit: '₹60 Lakhs' },
    { amount: '₹8.0 Cr', stage: 'Series A Lead', equity: '10.0% – 15.0%', upfront: '70% (₹5.6 Cr)', tranches: '1 Milestone', credit: '₹1.0 Crore' },
    { amount: '₹20.0 Cr', stage: 'Growth Syndicate', equity: 'Co-Investment', upfront: '80% (₹16.0 Cr)', tranches: 'Custom', credit: '₹1.5 Crores' },
  ]
};

// ============================================================================
// 2. MAIN VENTURE CAPITAL APPLICATION COMPONENT (RED & WHITE THEME)
// ============================================================================

export default function VentureCapitalApp() {
  const [activeTab, setActiveTab] = useState('status'); // 'status' | 'stage' | 'capital'
  const [selectedStageIndex, setSelectedStageIndex] = useState(0);
  const [selectedTicketIndex, setSelectedTicketIndex] = useState(1);

  // Clean Tab definitions without extra live tags
  const tabs = [
    { id: 'status', label: 'OPERATING TELEMETRY', icon: Activity },
    { id: 'stage', label: 'INVESTMENT STAGES', icon: Layers },
    { id: 'capital', label: 'CAPITAL ALLOCATION', icon: TrendingUp },
  ];

  return (
    <section 
      className="relative w-full bg-white text-slate-900 border-y border-slate-200 overflow-hidden font-sans select-none"
      id="venture-capital-matrix"
    >
      {/* Structural matrix pattern grid overlay in Red & White */}
      <div
        className="absolute inset-0 pointer-events-none opacity-60"
        style={{
          backgroundImage: `
            linear-gradient(to right, rgba(220, 38, 38, 0.04) 1px, transparent 1px),
            linear-gradient(to bottom, rgba(220, 38, 38, 0.04) 1px, transparent 1px)
          `,
          backgroundSize: '36px 36px',
          maskImage: 'radial-gradient(ellipse 70% 60% at 50% 50%, #000 40%, transparent 100%)',
          WebkitMaskImage: 'radial-gradient(ellipse 70% 60% at 50% 50%, #000 40%, transparent 100%)',
        }}
        aria-hidden="true"
      />

      {/* Ambient Red Glow Highlights */}
      <div 
        className="absolute top-0 right-1/4 w-[480px] h-[480px] pointer-events-none rounded-full"
        style={{
          background: 'radial-gradient(circle, rgba(220, 38, 38, 0.045) 0%, transparent 70%)',
          filter: 'blur(60px)',
        }}
        aria-hidden="true"
      />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14 sm:py-20">
        
        {/* Header Section without mock eyebrows */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-8 border-b border-slate-200"
        >
          <div>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black tracking-tight text-slate-900 leading-none">
              Venture Capital <span className="text-[#DC2626]">Operating Matrix</span>
            </h2>
            <p className="mt-3 text-sm sm:text-base text-slate-600 max-w-2xl font-normal leading-relaxed">
              Institutional deployment metrics, multi-stage founder qualification criteria, and transparent capital distribution rails backed by the Star Groups ecosystem.
            </p>
          </div>

          {/* Quick Metrics Capsule in Red & White */}
          <div className="flex items-center gap-3 bg-white border border-red-100 rounded-xl p-3 px-4 shadow-sm self-start md:self-auto">
            <Cpu className="w-5 h-5 text-[#DC2626]" />
            <div className="text-left">
              <div className="text-[10px] font-mono tracking-widest uppercase text-slate-500 font-semibold">Consensus Quorum</div>
              <div className="text-sm font-black text-[#DC2626] font-mono">98.4% NOMINAL</div>
            </div>
            <div className="h-6 w-[1px] bg-slate-200 mx-1"></div>
            <div className="text-left">
              <div className="text-[10px] font-mono tracking-widest uppercase text-slate-500 font-semibold">Fund Tranche</div>
              <div className="text-sm font-black text-slate-900 font-mono">₹400 Cr POOL</div>
            </div>
          </div>
        </motion.div>

        {/* Clean Tab Navigation without mock tags */}
        <div className="mt-7 flex flex-wrap items-center justify-between gap-4">
          <div className="inline-flex p-1 bg-slate-100/80 border border-slate-200 rounded-xl relative">
            {tabs.map((tab) => {
              const Icon = tab.icon;
              const isActive = activeTab === tab.id;

              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`relative flex items-center gap-2 px-4 py-2.5 rounded-lg text-xs font-bold tracking-wider uppercase transition-colors duration-200 z-10 ${
                    isActive ? 'text-[#DC2626]' : 'text-slate-600 hover:text-slate-900'
                  }`}
                  style={{ outline: 'none' }}
                >
                  <Icon className={`w-4 h-4 ${isActive ? 'text-[#DC2626]' : 'text-slate-400'}`} />
                  <span>{tab.label}</span>

                  {/* Red & White active tab backing with layoutId="activeGlow" */}
                  {isActive && (
                    <motion.div
                      layoutId="activeGlow"
                      className="absolute inset-0 bg-white border border-red-200 rounded-lg shadow-sm -z-10"
                      transition={{
                        type: 'spring',
                        stiffness: 380,
                        damping: 30,
                      }}
                    >
                      <span className="absolute bottom-0 left-3 right-3 h-[2px] bg-[#DC2626] rounded-full" />
                    </motion.div>
                  )}
                </button>
              );
            })}
          </div>
        </div>

        {/* Tab Transitions */}
        <div className="mt-8">
          <AnimatePresence mode="wait">
            
            {/* --------------------------------------------------------------
                STRUCTURE 1: OPERATING TELEMETRY VIEW (IN ₹ RUPEES)
                -------------------------------------------------------------- */}
            {activeTab === 'status' && (
              <motion.div
                key="status-view"
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -12 }}
                transition={{ duration: 0.3, ease: 'easeInOut' }}
                className="space-y-6"
              >
                {/* 4 Macro Telemetry Cards */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                  {STATUS_DATA.telemetry.map((item, idx) => (
                    <div
                      key={idx}
                      className="bg-white border border-slate-200/90 rounded-xl p-5 hover:border-red-300 transition-all duration-200 shadow-sm"
                    >
                      <div className="flex items-center justify-between text-slate-500 mb-2">
                        <span className="text-[11px] font-mono font-bold tracking-wider uppercase">
                          {item.label}
                        </span>
                        <TrendingUp className="w-4 h-4 text-[#DC2626]" />
                      </div>
                      <div className="text-3xl font-black text-slate-900 font-mono tracking-tight">
                        {item.value}
                      </div>
                      <div className="mt-2 text-[11px] font-mono text-[#DC2626] font-semibold flex items-center gap-1.5">
                        <span className="inline-block w-1.5 h-1.5 rounded-full bg-[#DC2626]"></span>
                        {item.delta}
                      </div>
                    </div>
                  ))}
                </div>

                {/* Main Telemetry Canvas: Nodes & Event Ledger */}
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
                  
                  {/* Left 8 Cols: Operational Nodes (clean without mock badges) */}
                  <div className="lg:col-span-8 bg-white border border-slate-200/90 rounded-2xl p-6 sm:p-7 shadow-sm">
                    <div className="pb-4 border-b border-slate-100">
                      <h3 className="text-xl font-black text-slate-900 tracking-tight">
                        Operational Node Deployment
                      </h3>
                      <p className="text-xs text-slate-500 mt-1 font-normal">
                        Core operational tracks facilitating founder diligence, investment governance, and corporate introductions.
                      </p>
                    </div>

                    <div className="mt-5 grid grid-cols-1 sm:grid-cols-2 gap-4">
                      {STATUS_DATA.nodes.map((node) => (
                        <div
                          key={node.id}
                          className="bg-slate-50/70 border border-slate-200/80 rounded-xl p-4 hover:border-red-300 hover:bg-white transition-all group"
                        >
                          <div className="mb-1.5">
                            <span className="text-sm font-bold text-slate-900 group-hover:text-[#DC2626] transition-colors">
                              {node.name}
                            </span>
                          </div>

                          <p className="text-xs text-slate-600 leading-relaxed min-h-[38px]">
                            {node.detail}
                          </p>

                          <div className="mt-4 pt-3 border-t border-slate-200/60 flex items-center justify-between text-[11px] font-mono text-slate-500">
                            <span className="text-slate-900 font-bold">{node.metric}</span>
                            <span className="text-[#DC2626] font-semibold">{node.ping}</span>
                          </div>
                        </div>
                      ))}
                    </div>

                    {/* Bandwidth Progress Meter */}
                    <div className="mt-6 p-4 rounded-xl bg-slate-50/80 border border-slate-200/80">
                      <div className="flex items-center justify-between text-xs font-mono text-slate-600 mb-2">
                        <span className="font-semibold">CAPITAL ALLOCATION BANDWIDTH</span>
                        <span className="text-[#DC2626] font-bold">88.6% CAPACITY</span>
                      </div>
                      <div className="w-full h-2 bg-slate-200 rounded-full overflow-hidden">
                        <div 
                          className="h-full bg-gradient-to-r from-[#DC2626] via-[#B91C1C] to-[#991B1B] rounded-full"
                          style={{ width: '88.6%', transform: 'translateZ(0)' }}
                        />
                      </div>
                    </div>
                  </div>

                  {/* Right 4 Cols: Event Stream */}
                  <div className="lg:col-span-4 bg-white border border-slate-200/90 rounded-2xl p-6 flex flex-col justify-between shadow-sm">
                    <div>
                      <div className="flex items-center justify-between pb-3 border-b border-slate-100">
                        <span className="text-[11px] font-mono tracking-wider uppercase text-slate-900 font-bold">
                          Execution Stream
                        </span>
                        <Clock className="w-4 h-4 text-[#DC2626]" />
                      </div>

                      <div className="mt-4 space-y-3 font-mono">
                        {STATUS_DATA.liveLogs.map((log, i) => (
                          <div key={i} className="p-3 bg-slate-50/70 border border-slate-200/80 rounded-lg text-xs">
                            <div className="flex items-center justify-between text-[10px] text-slate-500 mb-1">
                              <span>{log.time}</span>
                              <span className="text-[#DC2626] font-bold">{log.status}</span>
                            </div>
                            <div className="text-slate-900 font-sans font-bold text-xs">{log.event}</div>
                            <div className="text-[11px] text-slate-500 mt-0.5">{log.target}</div>
                          </div>
                        ))}
                      </div>
                    </div>

                    <div className="mt-5 p-4 rounded-xl bg-red-50/60 border border-red-100">
                      <div className="text-xs font-bold text-[#DC2626] mb-1">
                        Institutional Governance
                      </div>
                      <p className="text-[11px] text-slate-600 leading-relaxed font-sans">
                        All pipeline engagements pass through Star Venture Capital investment committee quorum under strict confidentiality.
                      </p>
                    </div>
                  </div>

                </div>
              </motion.div>
            )}

            {/* --------------------------------------------------------------
                STRUCTURE 2: STAGE QUALIFICATION RUBRIC VIEW (IN ₹ RUPEES)
                -------------------------------------------------------------- */}
            {activeTab === 'stage' && (
              <motion.div
                key="stage-view"
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -12 }}
                transition={{ duration: 0.3, ease: 'easeInOut' }}
                className="space-y-6"
              >
                {/* 4 Interactive Stage Horizontal Gate Bars */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
                  {STAGE_DATA.map((stage, idx) => {
                    const isSelected = selectedStageIndex === idx;
                    return (
                      <button
                        key={stage.id}
                        onClick={() => setSelectedStageIndex(idx)}
                        className={`text-left p-4 rounded-xl border transition-all duration-200 relative ${
                          isSelected
                            ? 'bg-white border-[#DC2626] shadow-md ring-1 ring-red-200'
                            : 'bg-white border-slate-200 hover:border-slate-300'
                        }`}
                      >
                        <div className="flex items-center justify-between text-[10px] font-mono uppercase tracking-widest text-slate-500 mb-1">
                          <span className="font-bold text-slate-700">{stage.badge}</span>
                          <span className="font-bold text-[#DC2626]">{stage.turnaround}</span>
                        </div>
                        <h4 className="text-sm font-black text-slate-900 tracking-tight">{stage.name}</h4>
                        <div className="mt-2 text-xs font-mono font-bold text-[#DC2626]">
                          {stage.cheque}
                        </div>

                        {isSelected && (
                          <span className="absolute top-2 right-2 w-2 h-2 rounded-full bg-[#DC2626]"></span>
                        )}
                      </button>
                    );
                  })}
                </div>

                {/* Stage Detail Deep Dive Showcase */}
                {(() => {
                  const currentStage = STAGE_DATA[selectedStageIndex];
                  return (
                    <div className="bg-white border border-slate-200/90 rounded-2xl p-6 sm:p-8 shadow-sm">
                      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 pb-6 border-b border-slate-100">
                        <div>
                          <div className="flex items-center gap-2 text-xs font-mono font-bold text-[#DC2626] uppercase tracking-wider mb-1">
                            <span>{currentStage.badge} CRITERIA</span>
                            <span>·</span>
                            <span>{currentStage.turnaround} REVIEW</span>
                          </div>
                          <h3 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
                            {currentStage.name}
                          </h3>
                          <p className="text-sm text-slate-600 mt-2 max-w-2xl font-normal leading-relaxed">
                            {currentStage.focus}
                          </p>
                        </div>

                        <div className="bg-red-50/70 border border-red-100 rounded-xl p-4 text-right self-start lg:self-auto">
                          <div className="text-[10px] font-mono tracking-widest uppercase text-slate-500">Typical Cheque Size</div>
                          <div className="text-2xl font-black text-[#DC2626] font-mono mt-0.5">
                            {currentStage.cheque}
                          </div>
                        </div>
                      </div>

                      {/* Metrics 4-Box Grid */}
                      <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                        {currentStage.metrics.map((metric, i) => (
                          <div key={i} className="p-4 bg-slate-50/70 border border-slate-200/70 rounded-xl">
                            <div className="text-[10px] font-mono uppercase tracking-wider text-slate-500 mb-1">
                              {metric.label}
                            </div>
                            <div className="text-sm font-bold text-slate-900 font-mono">
                              {metric.value}
                            </div>
                          </div>
                        ))}
                      </div>

                      {/* Qualification Vectors Checklist */}
                      <div className="mt-6 pt-5 border-t border-slate-100">
                        <div className="text-xs font-mono uppercase tracking-wider font-bold text-slate-900 mb-3">
                          CORE QUALIFICATION CRITERIA
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                          {currentStage.vectors.map((vec, i) => (
                            <div key={i} className="flex items-start gap-3 p-4 bg-slate-50/60 border border-slate-200/60 rounded-xl">
                              <CheckCircle2 className="w-5 h-5 text-[#DC2626] shrink-0 mt-0.5" />
                              <span className="text-xs text-slate-700 leading-relaxed font-normal">
                                {vec}
                              </span>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  );
                })()}
              </motion.div>
            )}

            {/* --------------------------------------------------------------
                STRUCTURE 3: CAPITAL ALLOCATION (IN ₹ RUPEES)
                -------------------------------------------------------------- */}
            {activeTab === 'capital' && (
              <motion.div
                key="capital-view"
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -12 }}
                transition={{ duration: 0.3, ease: 'easeInOut' }}
                className="space-y-6"
              >
                {/* Allocation Matrix & Sector Quotas */}
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
                  
                  {/* Left 6 Cols: Fund Allocation Structure */}
                  <div className="lg:col-span-6 bg-white border border-slate-200/90 rounded-2xl p-6 sm:p-7 shadow-sm">
                    <div className="flex items-center justify-between pb-4 border-b border-slate-100">
                      <div>
                        <h3 className="text-xl font-black text-slate-900 tracking-tight">
                          Tranche Distribution (₹400 Cr Pool)
                        </h3>
                        <p className="text-xs text-slate-500 mt-1">Multi-stage capital reserve architecture.</p>
                      </div>
                      <span className="text-xs font-mono text-[#DC2626] font-bold">100% COMMITTED</span>
                    </div>

                    <div className="mt-5 space-y-4">
                      {CAPITAL_DATA.allocation.map((item, i) => (
                        <div key={i} className="p-4 bg-slate-50/70 border border-slate-200/80 rounded-xl">
                          <div className="flex items-center justify-between text-xs font-bold text-slate-800 mb-2">
                            <span>{item.sector}</span>
                            <span className="font-mono text-[#DC2626]">{item.capital} ({item.percent}%)</span>
                          </div>
                          <div className="w-full h-2 bg-slate-200 rounded-full overflow-hidden">
                            <div 
                              className="h-full rounded-full transition-all duration-500"
                              style={{ 
                                width: `${item.percent}%`, 
                                backgroundColor: item.color,
                                transform: 'translateZ(0)'
                              }}
                            />
                          </div>
                        </div>
                      ))}
                    </div>

                    <div className="mt-5 p-3.5 rounded-xl bg-slate-50 border border-slate-200/80 text-xs text-slate-600 flex items-center justify-between font-sans">
                      <span>Syndicate Co-investment Multiplier</span>
                      <span className="font-mono font-bold text-[#DC2626]">3.5x Ratio</span>
                    </div>
                  </div>

                  {/* Right 6 Cols: Sector Quotas */}
                  <div className="lg:col-span-6 bg-white border border-slate-200/90 rounded-2xl p-6 sm:p-7 shadow-sm">
                    <div className="flex items-center justify-between pb-4 border-b border-slate-100">
                      <div>
                        <h3 className="text-xl font-black text-slate-900 tracking-tight">
                          Sector Deployment Mandate
                        </h3>
                        <p className="text-xs text-slate-500 mt-1">Strategic domain allocation targets.</p>
                      </div>
                      <span className="text-xs font-mono text-slate-500">ACTIVE MANDATE</span>
                    </div>

                    <div className="mt-5 space-y-3.5">
                      {CAPITAL_DATA.verticals.map((vert, i) => (
                        <div key={i} className="p-3.5 bg-slate-50/70 border border-slate-200/80 rounded-xl">
                          <div className="flex items-center justify-between text-xs font-mono mb-1.5">
                            <span className="text-slate-900 font-sans font-bold">{vert.name}</span>
                            <span className="text-[#DC2626] font-bold">{vert.share}</span>
                          </div>
                          <div className="w-full h-1.5 bg-slate-200 rounded-full overflow-hidden mb-2">
                            <div 
                              className="h-full bg-[#DC2626] rounded-full"
                              style={{ width: vert.barWidth, transform: 'translateZ(0)' }}
                            />
                          </div>
                          <div className="text-[10px] font-mono text-slate-500 uppercase flex items-center justify-between">
                            <span>{vert.status}</span>
                            <span className="text-slate-600 font-semibold">Priority Corridor</span>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                </div>

                {/* Interactive Cheque Sizing Matrix in Rupees */}
                <div className="bg-white border border-slate-200/90 rounded-2xl p-6 sm:p-8 shadow-sm">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-5 border-b border-slate-100">
                    <div>
                      <h3 className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight">
                        Interactive Ticket Sizing Matrix
                      </h3>
                      <p className="text-xs sm:text-sm text-slate-600 mt-1 font-normal">
                        Select an institutional cheque size to inspect milestone disbursements and group capability credits.
                      </p>
                    </div>

                    {/* Sizing Pills in Rupees */}
                    <div className="inline-flex p-1 bg-slate-100 border border-slate-200 rounded-xl self-start sm:self-auto">
                      {CAPITAL_DATA.ticketSizes.map((ticket, i) => (
                        <button
                          key={i}
                          onClick={() => setSelectedTicketIndex(i)}
                          className={`px-3 py-1.5 rounded-lg text-xs font-mono font-bold transition-all ${
                            selectedTicketIndex === i
                              ? 'bg-[#DC2626] text-white shadow-sm'
                              : 'text-slate-600 hover:text-slate-900'
                          }`}
                        >
                          {ticket.amount}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Calculated Sizing Outputs */}
                  {(() => {
                    const ticket = CAPITAL_DATA.ticketSizes[selectedTicketIndex];
                    return (
                      <div className="mt-6 grid grid-cols-2 lg:grid-cols-5 gap-4">
                        <div className="p-4 bg-slate-50/70 border border-slate-200/80 rounded-xl">
                          <div className="text-[10px] font-mono uppercase tracking-wider text-slate-500 mb-1">Cheque Level</div>
                          <div className="text-lg font-black text-slate-900 font-mono">{ticket.amount}</div>
                          <div className="text-[10px] font-mono text-[#DC2626] font-semibold mt-1">{ticket.stage}</div>
                        </div>

                        <div className="p-4 bg-slate-50/70 border border-slate-200/80 rounded-xl">
                          <div className="text-[10px] font-mono uppercase tracking-wider text-slate-500 mb-1">Target Equity Range</div>
                          <div className="text-lg font-black text-[#DC2626] font-mono">{ticket.equity}</div>
                          <div className="text-[10px] font-mono text-slate-500 mt-1">Founder-friendly</div>
                        </div>

                        <div className="p-4 bg-slate-50/70 border border-slate-200/80 rounded-xl">
                          <div className="text-[10px] font-mono uppercase tracking-wider text-slate-500 mb-1">Initial Disbursal</div>
                          <div className="text-lg font-black text-slate-900 font-mono">{ticket.upfront}</div>
                          <div className="text-[10px] font-mono text-slate-500 mt-1">At Agreement Signing</div>
                        </div>

                        <div className="p-4 bg-slate-50/70 border border-slate-200/80 rounded-xl">
                          <div className="text-[10px] font-mono uppercase tracking-wider text-slate-500 mb-1">Milestone Tranches</div>
                          <div className="text-lg font-black text-slate-900 font-mono">{ticket.tranches}</div>
                          <div className="text-[10px] font-mono text-slate-500 mt-1">KPI Verified</div>
                        </div>

                        <div className="col-span-2 lg:col-span-1 p-4 bg-red-50/60 border border-red-200 rounded-xl">
                          <div className="text-[10px] font-mono uppercase tracking-wider text-[#DC2626] font-bold mb-1">Star Capability Grant</div>
                          <div className="text-lg font-black text-[#DC2626] font-mono">{ticket.credit}</div>
                          <div className="text-[10px] font-mono text-slate-600 mt-1">Non-dilutive Services</div>
                        </div>
                      </div>
                    );
                  })()}
                </div>
              </motion.div>
            )}

          </AnimatePresence>
        </div>

        {/* Core CTA in Red & White with Star Red Glow */}
        <div className="mt-12 pt-8 border-t border-slate-200 flex flex-col sm:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-red-50 border border-red-100 flex items-center justify-center text-[#DC2626] shrink-0">
              <Zap className="w-5 h-5" />
            </div>
            <div>
              <h4 className="text-sm font-black text-slate-900 uppercase tracking-wider">
                Ready for Institutional Review?
              </h4>
              <p className="text-xs text-slate-600 mt-0.5">
                We review submissions within 5 business days under strict institutional confidentiality.
              </p>
            </div>
          </div>

          <div className="flex items-center gap-4 w-full sm:w-auto">
            <motion.a
              href="/enquiry.html"
              whileHover={{
                scale: 1.025,
                boxShadow: '0 0 30px rgba(220, 38, 38, 0.28)',
              }}
              whileTap={{ scale: 0.98 }}
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 px-7 py-3.5 rounded-xl bg-[#DC2626] text-white font-bold text-xs tracking-wider uppercase border border-[#DC2626] transition-colors duration-200 cursor-pointer shadow-md"
              style={{
                boxShadow: '0 4px 18px rgba(220, 38, 38, 0.2)',
              }}
            >
              <span>Initialize Founder Enquiry</span>
              <ArrowUpRight className="w-4 h-4 stroke-[2.5]" />
            </motion.a>
          </div>
        </div>

      </div>
    </section>
  );
}
