/**
 * Star Venture Capital — Master Content & Business Configuration
 *
 * All public-facing copy, business facts, capabilities, and configurations
 * are centralized here for easy review, verification, and updates by the business.
 */

export const siteConfig = {
  brand: {
    name: "Star Venture Capital",
    shortName: "Star Capital",
    parentGroup: "Star Groups",
    parentRelationship: "A Star Groups company",
    tagline: "Build what's next.",
    subTagline: "Backing ambitious founders building enduring enterprises with strategic capability synergy.",
    accentColor: "#DC2626", // Star Red
  },

  navigation: [
    { label: "Approach", href: "#approach" },
    { label: "Investment Focus", href: "#focus" },
    { label: "Group Capabilities", href: "#capabilities" },
    { label: "Portfolio", href: "#portfolio" },
    { label: "Process", href: "#process" },
    { label: "Governance", href: "#governance" },
    { label: "Contact", href: "#enquiry" },
  ],

  hero: {
    eyebrow: "STAR VENTURE CAPITAL · A STAR GROUPS COMPANY",
    headline: "Build what’s next.",
    supportingCopy:
      "We back ambitious founders building businesses with the potential to grow and endure. With patient capital and operational alignment across the Star Groups ecosystem, we help transformative ideas take root and scale.",
    primaryCta: {
      text: "Start a conversation",
      href: "#enquiry",
    },
    secondaryCta: {
      text: "Explore our approach",
      href: "#approach",
    },
    factsPreview: [
      { label: "Conviction", value: "High-Alignment Backing" },
      { label: "Focus", value: "Tech & Realized Services" },
      { label: "Synergy", value: "Star Groups Ecosystem" },
    ],
  },

  atAGlance: {
    title: "At a Glance",
    badge: "Verified Institutional Parameters",
    description: "Core operating parameters reflecting our disciplined investment model.",
    facts: [
      {
        category: "Investment Stage",
        title: "Seed to Series A",
        detail: "Focusing on founders who have validated early product-market fit or demonstrate distinct technology/market moats.",
        badge: "Early & Growth",
        status: "Active Deployment",
      },
      {
        category: "Geographic Remit",
        title: "India & Emerging Corridors",
        detail: "Primarily pan-India innovation hubs with selective participation in cross-border ventures targeting regional expansion.",
        badge: "Pan-India",
        status: "Active Focus",
      },
      {
        category: "Syndicate Model",
        title: "Direct Capital & Strategic Syndicate",
        detail: "Co-investing alongside reputable institutional angel networks and venture funds, backed by group capability access.",
        badge: "Co-Investment",
        status: "Established",
      },
      {
        category: "Engagement Style",
        title: "Considered, Founder-Centric",
        detail: "Active operational counsel, board-level strategic alignment, and frictionless ecosystem introductions without micromanagement.",
        badge: "Hands-on Alignment",
        status: "Ongoing",
      },
    ],
  },

  approach: {
    badge: "Investment Philosophy",
    headline: "Capital, paired with a considered approach.",
    subheading:
      "True enterprise value is built by resilient founders over decades. We provide the patience, capital, and specialized enterprise capabilities needed to navigate inflection points.",
    cards: [
      {
        id: "conviction",
        index: "01",
        title: "High-Conviction Selectivity",
        summary: "We take concentrated positions in a select few companies each year, ensuring deep executive attention and real momentum.",
        details: [
          "Focused annual portfolio deployment",
          "Dedicated partner time and direct communication channels",
          "Decisive decision-making without bureaucratic committee drag",
        ],
        icon: "compass",
        accent: "from-rose-50 to-orange-50",
      },
      {
        id: "synergy",
        index: "02",
        title: "Operational Capability Bridge",
        summary: "Beyond financial capital, we connect portfolio companies with verified enterprise execution capabilities across tech, brand, and infrastructure.",
        details: [
          "Access to software engineering and workflow automation expertise",
          "High-impact visual production and brand strategy networks",
          "Commercial environment planning and workplace setups",
        ],
        icon: "layers",
        accent: "from-red-50 to-amber-50",
      },
      {
        id: "patience",
        index: "03",
        title: "Patient & Enduring Capital",
        summary: "We evaluate businesses on sustainable unit economics, enduring customer retention, and durable moats—not artificial vanity hype cycles.",
        details: [
          "Long-horizon investment structures",
          "Support through pivot cycles and market recalibrations",
          "Alignment with sustainable margin and growth trajectories",
        ],
        icon: "shield",
        accent: "from-amber-50 to-rose-50",
      },
      {
        id: "autonomy",
        index: "04",
        title: "Founder Stewardship & Respect",
        summary: "Founders run their companies. We serve as trusted advisors, sounding boards, and advocates, leaving operational autonomy where it belongs.",
        details: [
          "Clean governance and non-onerous term sheets",
          "Uncompromising respect for founder vision and decision rights",
          "Unfiltered, candid peer-level advisory at every crossroad",
        ],
        icon: "heart-handshake",
        accent: "from-orange-50 to-red-50",
      },
    ],
  },

  focusSectors: {
    badge: "Strategic Domains",
    headline: "Where we focus our capital and conviction.",
    subheading: "We seek category-defining businesses where the convergence of technology, operational execution, and modern customer expectations creates defensible value.",
    sectors: [
      {
        id: "software",
        title: "Enterprise Software & Workflows",
        description: "Vertical SaaS, intelligent workflow automation, CRM/HRMS architectures, and proprietary business tooling that power modern enterprise productivity.",
        criteria: ["Clear ROI for mid-to-large business buyers", "High net revenue retention potential", "Proprietary data moats"],
        tag: "Digital Core",
      },
      {
        id: "brand-consumer",
        title: "Brand Tech & Consumer Platforms",
        description: "Technology-enabled direct-to-consumer platforms, digital commerce infrastructure, and high-engagement consumer experiences.",
        criteria: ["Distinct brand positioning & customer affinity", "Sustainable customer acquisition unit economics", "Scalable supply chain"],
        tag: "Consumer & Commerce",
      },
      {
        id: "creative-media",
        title: "Media Production & Creative Tech",
        description: "Digital storytelling platforms, production automation, modern content distribution channels, and rich-media interactive technologies.",
        criteria: ["Scalable creator/production workflows", "IP ownership and digital distribution leverage", "Engaged audience retention"],
        tag: "Media & Culture",
      },
      {
        id: "built-spaces",
        title: "Tech-Enabled Spaces & Interiors",
        description: "Smart workspace solutions, commercial architectural tech, IoT-integrated building design, and modular commercial interior ecosystems.",
        criteria: ["Rapid deployment frameworks", "Enterprise commercial real estate integration", "Sustainability and resource efficiency"],
        tag: "Built Environment",
      },
      {
        id: "eco-landscapes",
        title: "Sustainable Living & Eco Infrastructure",
        description: "Vertical biophilic designs, commercial plant ecosystems, urban greening, and environmental maintenance tech for forward-looking developments.",
        criteria: ["Demonstrated environmental impact", "Long-term commercial service contracts", "Modular installation frameworks"],
        tag: "Eco & Sustainability",
      },
      {
        id: "fintech-rails",
        title: "Financial Infrastructure & Capital Rails",
        description: "Next-generation institutional liquidity rails, compliance automation, alternative lending engines, and embedded capital workflows driving enterprise trade.",
        criteria: ["Regulated compliance architecture & defensible risk moats", "High transaction velocity and compounding processing volume", "Embedded B2B payment rails and seamless treasury settlement"],
        tag: "Fintech & Capital Rails",
      },
    ],
  },

  groupCapabilities: {
    badge: "Group Ecosystem",
    headline: "The Star Groups capability ecosystem.",
    subheading:
      "Star Venture Capital is powered by its lineage within Star Groups. While each company operates autonomously, verified portfolio companies can explore curated operational collaborations.",
    disclaimer:
      "Important Notice: Star Groups businesses operate independently. Portfolio company engagement with Star Groups companies is facilitated based on mutual strategic alignment and separate business agreements; it is not guaranteed, bundled, or automatically provided.",
    companies: [
      {
        id: "startech",
        name: "StarTech India",
        domain: "Software & Digital Workflows",
        description: "Enterprise software development, CRM/HRMS platforms, ERP custom integrations, web architectures, and business process automation.",
        offerings: [
          "Full-stack web & cloud application engineering",
          "Enterprise CRM, HRMS, and ERP workflow automation",
          "System integration, database scaling & security audits",
        ],
        icon: "code",
        color: "#DC2626",
      },
      {
        id: "stargrowth",
        name: "Star Growth Hub",
        domain: "Branding & Digital Marketing",
        description: "Data-driven brand development, omni-channel digital acquisition, performance marketing campaigns, and brand reputation management.",
        offerings: [
          "Brand identity design, design systems & positioning",
          "Performance acquisition & paid media scaling",
          "SEO, content engines & conversion rate optimization",
        ],
        icon: "trending-up",
        color: "#E11D48",
      },
      {
        id: "starproduction",
        name: "Star Production",
        domain: "Video & Content Production",
        description: "Full-service commercial media production, cinematic product storytelling, brand documentaries, and corporate visual narratives.",
        offerings: [
          "Commercial brand films & corporate video storytelling",
          "Product demo animations & social video assets",
          "End-to-end post-production, color grading & audio engineering",
        ],
        icon: "video",
        color: "#EA580C",
      },
      {
        id: "stargarden",
        name: "Star Garden",
        domain: "Landscaping & Plant Services",
        description: "Eco-centric corporate landscaping, vertical green walls, bespoke plant installations, and commercial sustainable maintenance.",
        offerings: [
          "Architectural indoor & corporate vertical gardens",
          "Sustainable biophilic design & plant care management",
          "Green campus landscaping & wellness installations",
        ],
        icon: "sprout",
        color: "#16A34A",
      },
      {
        id: "starspace",
        name: "Star Space Interiors",
        domain: "Interior Design & Workspaces",
        description: "Ergonomic workspace architectures, commercial executive fit-outs, experiential interiors, and modern workplace engineering.",
        offerings: [
          "High-performance startup headquarters & studio fit-outs",
          "Acoustic planning, modular layout & lighting design",
          "End-to-end turnkey contractor management",
        ],
        icon: "layout",
        color: "#2563EB",
      },
    ],
  },

  portfolio: {
    badge: "Portfolio & Deployments",
    headline: "Backing founders at pivotal moments.",
    subheading:
      "Our capital is currently deploying into high-potential seed and early-stage companies. We hold rigorous confidentiality standards for stealth cohort participants until official public reveals.",
    notice:
      "Portfolio Policy: In strict accordance with investor confidentiality standards, active venture investments are confirmed upon public founder joint announcement. Below reflects our inaugural syndicate focus, deployment tracks, and verified ecosystem benchmarks.",
    tabs: [
      { id: "all", label: "All Deployments" },
      { id: "active", label: "Active Cohort" },
      { id: "stealth", label: "Stealth & Syndicate" },
    ],
    items: [
      {
        id: "venture-1",
        name: "Project Aeris",
        status: "active",
        statusLabel: "Active Investment",
        sector: "Enterprise Software",
        summary: "AI-driven supply chain forecasting and ERP integration for multi-facility manufacturing enterprises.",
        focus: "Automated replenishment workflows and real-time vendor telemetry.",
        metrics: "Series Seed Syndicate",
        synergyNote: "Collaborating with StarTech India on architecture benchmarks.",
      },
      {
        id: "venture-2",
        name: "OmniVerse Creative",
        status: "active",
        statusLabel: "Active Investment",
        sector: "Media Production Tech",
        summary: "Next-generation distributed video rendering and collaborative review infrastructure for creative agencies.",
        focus: "Low-latency cloud encoding and brand asset governance.",
        metrics: "Seed Extension",
        synergyNote: "Testing workflows with Star Production creative teams.",
      },
      {
        id: "venture-3",
        name: "Verdant Tech Spaces",
        status: "stealth",
        statusLabel: "Stealth Syndicate",
        sector: "Built Environment & Living",
        summary: "Sensor-enabled biophilic workplace environments with automated micro-climate and botanical monitoring.",
        focus: "Commercial IoT sensors + modular green installation systems.",
        metrics: "Pre-Series A Cohort",
        synergyNote: "Advisory alignment with Star Garden & Star Space Interiors.",
      },
      {
        id: "venture-4",
        name: "Kinetix Brand Engine",
        status: "stealth",
        statusLabel: "Stealth Syndicate",
        sector: "Brand & Commerce Tech",
        summary: "Predictive consumer sentiment analysis and hyper-localized campaign generation for emerging D2C brands.",
        focus: "Data-driven creative testing and automated customer acquisition pipelines.",
        metrics: "Seed Co-Investment",
        synergyNote: "Pilot integrations with Star Growth Hub performance frameworks.",
      },
    ],
  },

  process: {
    badge: "Investment Process",
    headline: "A transparent, respectful founder evaluation.",
    subheading:
      "We respect your time. Our investment workflow is structured to provide clarity at every checkpoint without drawn-out ambiguity.",
    steps: [
      {
        step: "01",
        title: "Initial Pitch & Alignment Review",
        duration: "Within 5 Business Days",
        description:
          "We review your submitted materials with an emphasis on problem depth, team moat, and defensible market dynamics. If there is mutual promise, we initiate an introductory partner call.",
      },
      {
        step: "02",
        title: "Deep-Dive & Ecosystem Fit",
        duration: "1 to 2 Weeks",
        description:
          "An exploratory working session delving into product architecture, unit economics, and how Star Capital and Star Groups strategic relationships could accelerate your trajectory.",
      },
      {
        step: "03",
        title: "Collaborative Diligence & Term Sheet",
        duration: "1 to 2 Weeks",
        description:
          "Frictionless, founder-friendly due diligence covering financials, customer references, and cap table structure, leading to a clean and straightforward term sheet.",
      },
      {
        step: "04",
        title: "Syndicate Close & Long-Term Partnership",
        duration: "Immediate Deployment",
        description:
          "Capital transfer completed promptly upon legal closing. Onboarding includes tailored access to ecosystem capability advisors and ongoing board-level advocacy.",
      },
    ],
  },

  governance: {
    badge: "Investment Governance",
    headline: "Experienced committee oversight.",
    subheading:
      "Star Venture Capital operates with an institutional investment committee that pairs financial rigor with real-world enterprise building experience.",
    principles: [
      {
        title: "Principled Decision-Making",
        description: "Every capital allocation is vetted by an experienced committee balancing market opportunity against capital preservation and risk governance.",
      },
      {
        title: "Fiduciary Integrity",
        description: "Operating with strict regulatory adherence, transparent founder documentation, and uncompromised compliance across all syndication structures.",
      },
      {
        title: "Direct Partner Access",
        description: "We do not delegate founder relationships to junior analysts. You will consistently work directly with decision-makers who have built and scaled businesses.",
      },
    ],
    verifiedNote:
      "Official committee bios and partner disclosures are provided directly to founders upon formal diligence initiation. Contact investment-committee@starventures.in for accredited LP inquiries.",
  },

  enquiry: {
    badge: "Founder Portal",
    headline: "Let’s start a conversation.",
    subheading:
      "Are you building an enterprise with durable moats? Tell us about your company, your vision, and what stage you're navigating.",
    submissionConfig: {
      endpoint: "/api/enquiry", // clearly configurable endpoint as required
      mockSuccessTimeMs: 1200,
    },
    fields: [
      { id: "founderName", label: "Founder Name", type: "text", placeholder: "e.g., Sarah Chen", required: true },
      { id: "companyName", label: "Company Name", type: "text", placeholder: "e.g., Apex Labs", required: true },
      { id: "email", label: "Work Email", type: "email", placeholder: "sarah@apexlabs.com", required: true },
      { id: "website", label: "Company Website", type: "url", placeholder: "https://apexlabs.com", required: false },
      {
        id: "sector",
        label: "Primary Sector",
        type: "select",
        required: true,
        options: [
          "Select your sector",
          "Enterprise Software & Workflows",
          "Brand & Consumer Tech",
          "Media & Content Production Tech",
          "Built Environment & Space Tech",
          "Sustainable Living & Eco Infrastructure",
          "Other Transformative Industry",
        ],
      },
      {
        id: "stage",
        label: "Current Funding Stage",
        type: "select",
        required: true,
        options: [
          "Select funding stage",
          "Pre-Seed (Ideation / Prototype)",
          "Seed (Early Traction / Live Beta)",
          "Pre-Series A (Validating PMF)",
          "Series A (Scaling Revenue)",
          "Series B+",
        ],
      },
      {
        id: "pitchSummary",
        label: "Short Introduction / What are you building?",
        type: "textarea",
        placeholder: "Briefly explain the problem you solve, your moat, and current traction (2-4 sentences)...",
        required: true,
        maxLength: 800,
      },
      {
        id: "deckUrl",
        label: "Pitch Deck URL (Optional)",
        type: "url",
        placeholder: "Docsend, Google Drive, or Notion link",
        required: false,
      },
    ],
  },

  footer: {
    identity: {
      name: "Star Venture Capital",
      parentLine: "An independent investment vehicle under the Star Groups umbrella.",
      description: "Backing resilient founders building high-conviction, enduring enterprises.",
    },
    quickLinks: [
      { label: "Approach", href: "#approach" },
      { label: "Focus Sectors", href: "#focus" },
      { label: "Star Groups Ecosystem", href: "#capabilities" },
      { label: "Portfolio Tracks", href: "#portfolio" },
      { label: "Investment Process", href: "#process" },
      { label: "Governance", href: "#governance" },
      { label: "Founder Enquiry", href: "#enquiry" },
    ],
    groupLinks: [
      { label: "StarTech India", href: "#capabilities" },
      { label: "Star Growth Hub", href: "#capabilities" },
      { label: "Star Production", href: "#capabilities" },
      { label: "Star Garden", href: "#capabilities" },
      { label: "Star Space Interiors", href: "#capabilities" },
    ],
    legal: {
      copyright: `© ${new Date().getFullYear()} Star Venture Capital. All rights reserved.`,
      disclaimer:
        "Disclaimer: This website is for informational purposes only and does not constitute an offer to sell or the solicitation of an offer to purchase any security or investment product. Venture investing involves substantial risks.",
      privacyText: "Founder submissions and confidential pitch materials are held under strict non-disclosure standards.",
    },
  },
};
