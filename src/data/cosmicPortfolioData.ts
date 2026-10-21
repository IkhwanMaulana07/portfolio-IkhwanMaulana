import { 
  Project, 
  SkillItem, 
  CapabilityCard, 
  WorkflowStep, 
  EducationItem, 
  CertificationItem, 
  BlogPost 
} from '../types/portfolio';

export const COSMIC_DATA = {
  profile: {
    name: "Ikhwan Maulana",
    monogram: "IM",
    roles: [
      "AI Engineer",
      "Software Engineer",
      "Machine Learning Enthusiast",
      "Computer Vision Developer",
      "Fullstack Developer",
      "AI Automation Developer"
    ],
    headline: "Building Intelligent Solutions for a Better Tomorrow.",
    supportingDesc:
      "I'm Ikhwan Maulana, an Informatics graduate passionate about Artificial Intelligence, Machine Learning, Computer Vision, and Fullstack Development. I transform ideas into practical digital solutions through software engineering and AI.",
    location: "Bekasi, Indonesia",
    email: "ikhwanmaulana796@gmail.com",
    phone: "+62 896-7367-4598",
    whatsapp: "https://wa.me/6289673674598?text=Hello%20Ikhwan,%20I'm%20interested%20in%20your%20engineering%20portfolio",
    linkedin: "https://linkedin.com/in/ikhwan-maulana-1700b842b",
    github: "https://github.com/IkhwanMaulana07",
    avatar: "/profile.jpg",
    cosmicHeroImg: "/cosmic-hero.jpg",
    availability: "Available for AI & Full-Stack Roles",
    cvLink: "#contact"
  },

  heroStats: [
    { value: "5+", label: "Projects Completed", sub: "Production & Research Systems" },
    { value: "3+", label: "AI & ML Deployments", sub: "Vision, LLMs & Recommenders" },
    { value: "15+", label: "Technologies Explored", sub: "JavaScript, Python & Cloud" },
    { value: "3.78", label: "Focus & Commitment", sub: "Gunadarma S.Kom Honors GPA" }
  ],

  capabilities: [
    {
      id: "ai-ml",
      title: "AI & Machine Learning",
      subtitle: "Intelligent Systems",
      desc: "Intelligent systems, model experimentation, predictive solutions, and custom ML pipelines trained on real-world datasets.",
      icon: "Cpu",
      glowColor: "rgba(229, 195, 120, 0.35)"
    },
    {
      id: "cv",
      title: "Computer Vision",
      subtitle: "Visual Intelligence",
      desc: "Image processing, real-time object detection, dataset augmentation pipelines, and lightweight mobile edge inference via YOLO and TFLite.",
      icon: "Scan",
      glowColor: "rgba(212, 175, 55, 0.35)"
    },
    {
      id: "fullstack",
      title: "Fullstack Development",
      subtitle: "High-Performance Systems",
      desc: "Modern reactive interfaces, robust backend services, RESTful API architecture, and normalized relational database schemas.",
      icon: "Layers",
      glowColor: "rgba(247, 231, 196, 0.35)"
    },
    {
      id: "automation",
      title: "AI Automation",
      subtitle: "Workflow Orchestration",
      desc: "Workflow automation, LLM API integration (Google Gemini), prompt engineering, and practical automated enterprise drafting solutions.",
      icon: "Sparkles",
      glowColor: "rgba(158, 123, 52, 0.35)"
    }
  ] as CapabilityCard[],

  projects: [
    {
      id: "veyora-technologies",
      title: "Veyora Technologies",
      tagline: "Luxury F&B Digital Agency & Bespoke Direct-Ordering SaaS Platform",
      category: "Fullstack / F&B Tech SaaS",
      categories: ["Web Platform", "SaaS & F&B Tech", "UI/UX Design"],
      image: "/projects/veyora_technologies.jpg",
      featured: true,
      role: "Fullstack Developer & UI/UX Designer",
      stack: ["Next.js 16", "React 19", "TypeScript", "Motion", "Custom Design System", "Context API (i18n)"],
      summary:
        "Platform digital agency premium khusus industri Food & Beverage yang menghadirkan solusi pemesanan mandiri 0% komisi, sistem QR table ordering, integrasi POS dapur, dan asisten AI. Dilengkapi fitur interaktif Margin Savings Calculator, chatbot AI pintar, animasi mikro 3D Parallax, serta dukungan multibahasa (ID, EN, ZH) yang tersinkronisasi secara real-time.",
      problem:
        "Banyak bisnis kuliner (restoran, cafe, bakery, dan franchise) kehilangan 20%–35% keuntungan bersihnya karena potongan komisi aplikasi aggregator ojek online, ditambah kendala pencatatan pesanan manual yang lambat saat jam sibuk (rush hour) serta ketiadaan kepemilikan data pelanggan setia.",
      objectives: [
        "Reclaim brand sovereignty and eliminate 20%–35% third-party food delivery aggregator commission tolls",
        "Engineer a zero-reload trilingual localization engine (ID, EN, ZH) across all routes and interactive widgets",
        "Implement a dynamic interactive Margin Savings Calculator and context-aware floating culinary AI assistant",
        "Craft a luxury Gastronomy UI/UX with dark obsidian aesthetics, Playfair Display typography, and 3D device tilt parallax"
      ],
      solution:
        "Architected an end-to-end bespoke digital platform with Next.js 16 App Router, React 19, and TypeScript. Engineered contactless 0% commission direct ordering and QR dine-in, an interactive Margin Savings Simulator with multi-currency arithmetic modeling (IDR, USD, CNY), a floating AI culinary assistant widget, and an automated WhatsApp consultation pipeline.",
      architecturePoints: [
        "Engineered zero-reload trilingual state engine (ID, EN, ZH) via React Context and LocalStorage persistence covering all components, pricing, and chatbot interactions",
        "Constructed an interactive Margin Savings Simulator with dynamic multi-currency conversions (IDR, USD, CNY) for restaurateurs to calculate commission leakage",
        "Developed a context-aware floating AI culinary assistant widget handling automated queries regarding package tiers, POS integrations (Moka, ESB, Pawoon), and lead capture",
        "Crafted Gastronomy-first luxury UI/UX with dark obsidian tones (#0a0705), warm champagne gold accents (#d99d66), Playfair Display typography, and 3D device tilt parallax physics",
        "Automated high-conversion WhatsApp consultation pipeline translating form states into structured business inquiries"
      ],
      metrics: [
        { label: "Commission Fee", value: "0% Direct Order" },
        { label: "Localization", value: "Trilingual (ID/EN/ZH)" },
        { label: "Architecture", value: "Next.js 16 & React 19" },
        { label: "Visual Craft", value: "3D Tilt Parallax" }
      ],
      results:
        "Delivered a high-converting luxury digital ecosystem empowering premier hospitality brands to achieve 0% commission direct ordering, streamline kitchen dispatch, and automate high-value customer acquisition.",
      github: "https://github.com/IkhwanMaulana07",
      demo: "http://localhost:3001"
    },
    {
      id: "bsf-larvae-detection",
      title: "BSF Larvae Detection & Classification",
      tagline: "End-to-End Computer Vision Pipeline Deployed On-Device via Flutter & TFLite",
      category: "AI / Computer Vision",
      categories: ["AI / Computer Vision", "Machine Learning"],
      image: "/projects/bsf_mobile_app.png",
      featured: true,
      role: "Lead Computer Vision & Mobile Engineer",
      stack: ["Python", "YOLOv11", "OpenCV", "PyTorch", "TensorFlow Lite", "Flutter"],
      summary:
        "A computer vision project for detecting and classifying Black Soldier Fly larvae growth phases using YOLOv11, with the goal of supporting more informed harvest-time recommendations.",
      problem:
        "BSF farmers struggle to differentiate young larva, mature larva, prepupa, and pupa stages with the naked eye, leading to risks of suboptimal harvest timing and yield loss.",
      objectives: [
        "Construct an automated vision pipeline classifying 4 distinct larval growth phases",
        "Enable zero-dependency on-device mobile execution for remote agricultural fields",
        "Achieve rigorous precision thresholds on high-density image clusters"
      ],
      solution:
        "Engineered an end-to-end deep learning pipeline fine-tuning Ultralytics YOLOv11s on 21,974 annotated images, exported with INT8 quantization to TensorFlow Lite, and deployed within a responsive cross-platform Flutter Android application.",
      architecturePoints: [
        "Dataset curation and computer vision augmentation pipeline across 21,974 annotated images",
        "Fine-tuned deep learning YOLOv11s model achieving 0.9723 precision, 0.8315 recall, and 0.8720 mAP50",
        "Model quantization into TensorFlow Lite format for zero-internet on-device mobile execution",
        "Native Flutter Android camera and gallery ingestion module with real-time inference latency under 85ms"
      ],
      metrics: [
        { label: "Dataset Images", value: "21,974" },
        { label: "Precision Rate", value: "97.23%" },
        { label: "mAP50 Score", value: "0.8720" },
        { label: "Inference Mode", value: "Offline On-Device" }
      ],
      results:
        "Successfully delivered high-accuracy classification across 4 growth stages, enabling reliable on-field identification for local farmers.",
      github: "https://github.com/IkhwanMaulana07",
      demo: "https://github.com/IkhwanMaulana07"
    },
    {
      id: "malaka-jaya-portal",
      title: "Malaka Jaya Digital MSME Community Portal",
      tagline: "Fullstack Community Enterprise Platform with Three-Tier RBAC, Leaflet Maps & Gemini Chatbot",
      category: "Fullstack / AI Integration",
      categories: ["Fullstack / AI Integration", "Web Systems"],
      image: "/projects/umkm_malakajaya.png",
      featured: true,
      role: "Lead Full Stack & AI Developer",
      stack: ["PHP", "MySQL", "JavaScript", "Tailwind CSS", "Gemini API", "Leaflet JS", "Fetch API"],
      summary:
        "A digital platform for local MSMEs featuring merchant dashboards, product management, role-based access control, sales insights, location mapping, and AI chatbot integration.",
      problem:
        "Local micro-enterprises lacked digital discoverability and direct customer channels, while community members needed 24/7 automated assistance for product inquiries without page reload latency.",
      objectives: [
        "Architect a normalized relational schema eliminating data redundancy across merchants and products",
        "Integrate conversational LLM capabilities for automated resident inquiries",
        "Implement frictionless no-reload client transactions using Fetch API and AJAX"
      ],
      solution:
        "Engineered a full-stack MVC application backed by a 10-table normalized MySQL database. Integrated Google Gemini API for intelligent 24/7 conversational customer assistance and dynamic Leaflet geolocation maps for local merchant storefronts.",
      architecturePoints: [
        "Architected MVC backend with 10-table normalized relational MySQL schema (3NF compliance)",
        "Integrated Google Gemini LLM API directly into application workflows for automated resident assistance",
        "Built dynamic Leaflet JS interactive geolocation maps with custom merchant pin clustering",
        "Implemented secure 3-tier Role-Based Access Control (Admin, Merchant, Resident) with email OTP verification"
      ],
      metrics: [
        { label: "Database Schema", value: "10 Tables (3NF)" },
        { label: "AI Integration", value: "Google Gemini API" },
        { label: "Role Tiers", value: "3 (Admin/Merchant/User)" },
        { label: "Client Data Sync", value: "Fetch API (No-Reload)" }
      ],
      results:
        "Empowered local businesses with direct WhatsApp ordering channels and automated administrative reporting.",
      github: "https://github.com/IkhwanMaulana07",
      demo: "https://github.com/IkhwanMaulana07"
    },
    {
      id: "movie-recommender",
      title: "Movie Recommendation System",
      tagline: "Interactive Discovery Application with Content-Based & Collaborative Machine Learning Filtering",
      category: "Machine Learning / Recommendation Systems",
      categories: ["Machine Learning / Recommendation Systems", "Data Science"],
      image: "/projects/movie_recommender.png",
      featured: true,
      role: "Machine Learning & Frontend Engineer",
      stack: ["Python", "Streamlit", "Scikit-learn", "TF-IDF", "Cosine Similarity", "TMDB API"],
      summary:
        "A movie discovery application combining content-based filtering and collaborative filtering through an interactive Streamlit interface and TMDB integration.",
      problem:
        "Users experience choice paralysis when navigating vast catalogs without personalized, feature-weighted recommendation engines.",
      objectives: [
        "Extract semantic textual vectors across genres, overview synopses, and director credits",
        "Compute high-dimensional cosine similarity matrices with sub-second retrieval times",
        "Render high-fidelity poster artwork and cinematic metadata dynamically via REST APIs"
      ],
      solution:
        "Constructed a content-based recommendation model using Scikit-learn TF-IDF vectorization and cosine similarity indexing. Built an interactive Streamlit interface that dynamically queries the TMDB REST API for poster artwork and cast bios.",
      architecturePoints: [
        "Engineered text vectorization pipelines extracting multi-attribute cinematic feature tokens",
        "Computed cosine similarity matrix allowing instantaneous retrieval of top-N closest recommendations",
        "Integrated external TMDB REST APIs for dynamic high-resolution movie poster retrieval",
        "Deployed and maintained as a public live interactive web app on Streamlit Cloud"
      ],
      metrics: [
        { label: "Core Algorithm", value: "TF-IDF & Cosine" },
        { label: "Cloud Hosting", value: "Streamlit Cloud (Live)" },
        { label: "External API", value: "TMDB REST API" },
        { label: "Latency", value: "< 200ms per Query" }
      ],
      results:
        "Live public web application delivering intuitive discovery for cinema enthusiasts worldwide.",
      github: "https://github.com/IkhwanMaulana07",
      demo: "https://ikhwanmaulana07-rekomendasi-film-app-ovnbhf.streamlit.app"
    }
  ] as Project[],

  techStack: {
    programming: [
      { name: "Python", role: "AI & ML Core", level: "Advanced", applied: "Computer Vision & ML", desc: "Data pipelines, deep learning model training, and Streamlit engineering.", orbitRadius: 180, orbitSpeed: 45 },
      { name: "JavaScript", role: "Fullstack Ecosystem", level: "Expert", applied: "Full-Stack Web & SPAs", desc: "Modern ES6+ asynchronous syntax, event-driven DOM, and client-side systems.", orbitRadius: 240, orbitSpeed: 60 },
      { name: "TypeScript", role: "Type System", level: "Advanced", applied: "Type-Safe Apps", desc: "Static contracts, type safety, interface definitions, and scalable enterprise code.", orbitRadius: 300, orbitSpeed: 75 },
      { name: "PHP", role: "Backend Language", level: "Advanced", applied: "SMP Al-Amin & Malaka Jaya", desc: "Object-oriented programming, custom routers, and native MVC architecture.", orbitRadius: 210, orbitSpeed: 50 },
      { name: "Java", role: "OOP Core", level: "Intermediate", applied: "Enterprise Concepts", desc: "Object-oriented programming fundamentals, data structures, and algorithms.", orbitRadius: 270, orbitSpeed: 70 },
      { name: "SQL", role: "Query Language", level: "Advanced", applied: "Relational Schemas", desc: "Query optimization, multi-table joins, indexing, and 3NF normalization.", orbitRadius: 190, orbitSpeed: 40 }
    ] as SkillItem[],
    frontend: [
      { name: "React", role: "UI Framework", level: "Expert", applied: "Production Dashboards", desc: "Component architecture, declarative state management, custom hooks.", orbitRadius: 220, orbitSpeed: 55 },
      { name: "Next.js", role: "Full-Stack Framework", level: "Advanced", applied: "Modern Web Apps", desc: "Server/client component rendering, App Router architecture, and edge optimization.", orbitRadius: 280, orbitSpeed: 65 },
      { name: "Tailwind CSS", role: "Utility Design System", level: "Expert", applied: "Responsive Interfaces", desc: "Utility-first CSS architecture, responsive breakpoints, and dark mode theming.", orbitRadius: 190, orbitSpeed: 45 },
      { name: "HTML5", role: "Semantic Markup", level: "Expert", applied: "Accessible Web UI", desc: "Semantic structure, accessibility standards, and SEO compliance.", orbitRadius: 250, orbitSpeed: 58 },
      { name: "CSS3", role: "Modern Styling", level: "Expert", applied: "Cosmic Glassmorphism", desc: "Flexbox, CSS Grid, keyframe animations, and custom design tokens.", orbitRadius: 310, orbitSpeed: 72 }
    ] as SkillItem[],
    backend: [
      { name: "REST APIs", role: "API Architecture", level: "Expert", applied: "System Integrations", desc: "Stateless endpoint architecture, structured JSON payloads, status codes.", orbitRadius: 200, orbitSpeed: 48 },
      { name: "MySQL", role: "Relational DB", level: "Expert", applied: "Core Web Systems", desc: "Schema normalization (3NF), relational constraints, foreign keys, transaction safety.", orbitRadius: 260, orbitSpeed: 62 },
      { name: "PostgreSQL", role: "Relational DB", level: "Advanced", applied: "Structured Data", desc: "ACID compliance, complex analytical queries, and schema reliability.", orbitRadius: 290, orbitSpeed: 68 },
      { name: "Docker", role: "Containerization", level: "Familiar", applied: "Environment Consistency", desc: "Containerized environments ensuring reproducible deployment.", orbitRadius: 230, orbitSpeed: 52 },
      { name: "Git & GitHub", role: "Version Control", level: "Expert", applied: "Codebase Collaboration", desc: "Branching strategies, semantic commits, and repository maintenance.", orbitRadius: 180, orbitSpeed: 42 }
    ] as SkillItem[],
    ai: [
      { name: "PyTorch", role: "Deep Learning", level: "Advanced", applied: "Neural Networks", desc: "Deep learning architectures, convolutional layers, and model checkpoints.", orbitRadius: 220, orbitSpeed: 50 },
      { name: "Scikit-learn", role: "Machine Learning", level: "Advanced", applied: "Content Recommenders", desc: "TF-IDF text vectorization, cosine similarity metrics, and preprocessing.", orbitRadius: 270, orbitSpeed: 64 },
      { name: "YOLOv11", role: "Object Detection", level: "Advanced", applied: "BSF Larva Mobile App", desc: "Fine-tuned models on 21,974 annotated images for real-time classification.", orbitRadius: 190, orbitSpeed: 44 },
      { name: "OpenCV", role: "Computer Vision", level: "Advanced", applied: "Dataset Augmentation", desc: "Image transformation, feature extraction, filtering, and augmentation.", orbitRadius: 250, orbitSpeed: 56 },
      { name: "Pandas & NumPy", role: "Data Processing", level: "Advanced", applied: "Data Manipulation", desc: "Mathematical computation, array indexing, and tabular data analysis.", orbitRadius: 310, orbitSpeed: 70 }
    ] as SkillItem[],
    automation: [
      { name: "Gemini API", role: "Generative AI & LLM", level: "Advanced", applied: "Malaka Jaya Portal", desc: "Prompt engineering, conversational AI assistants, and automated drafting.", orbitRadius: 210, orbitSpeed: 46 },
      { name: "LLM APIs", role: "AI Integrations", level: "Advanced", applied: "Intelligent Workflows", desc: "Stateless streaming endpoints, token management, and structured JSON parsing.", orbitRadius: 280, orbitSpeed: 66 },
      { name: "n8n", role: "Workflow Automation", level: "Intermediate", applied: "Process Pipelines", desc: "Node-based automated workflows connecting webhooks, APIs, and databases.", orbitRadius: 240, orbitSpeed: 58 }
    ] as SkillItem[]
  },

  workflowSteps: [
    {
      step: "01",
      title: "Understand",
      desc: "Identify the problem, user needs, and core architectural objectives.",
      details: [
        "Deconstruct user pain points and domain requirements",
        "Define technical constraints, performance SLAs, and target metrics",
        "Analyze data availability and feasibility for AI or software integration"
      ]
    },
    {
      step: "02",
      title: "Plan & Design",
      desc: "Define the architecture, normalized data models, and intuitive interface.",
      details: [
        "Model 3NF relational schemas and API contracts (REST / JSON)",
        "Design responsive user journeys and accessibility patterns",
        "Establish model selection, inference strategy, and deployment topologies"
      ]
    },
    {
      step: "03",
      title: "Develop",
      desc: "Build the application and integrate relevant AI capabilities seamlessly.",
      details: [
        "Implement modular components with clean separation of concerns",
        "Embed AI inference (LLM APIs, on-device TFLite, Scikit-learn pipelines)",
        "Implement secure role-based access control and input validation"
      ]
    },
    {
      step: "04",
      title: "Improve",
      desc: "Test, evaluate, refine, and iterate for continuous real-world impact.",
      details: [
        "Validate across mobile breakpoints, edge cases, and keyboard navigation",
        "Benchmark precision, latency, and database query execution times",
        "Deploy continuously to cloud infrastructure with automated monitoring"
      ]
    }
  ] as WorkflowStep[],

  education: [
    {
      degree: "Bachelor of Computer Science (S.Kom) in Informatics Engineering",
      institution: "Universitas Gunadarma (Bekasi, Indonesia)",
      faculty: "Faculty of Industrial Technology, Dept. of Informatics",
      period: "2022 - 2026",
      gpa: "3.78 / 4.00 (High Honors)",
      coursework: [
        "Artificial Intelligence",
        "Machine Learning",
        "Computer Vision",
        "Software Engineering",
        "Database Systems",
        "Web Programming"
      ],
      description:
        "Specialized in full-stack web software architecture, database management systems, and practical AI applications. Completed bachelor thesis developing a computer vision system with 97.23% precision and 0.8720 mAP50."
    }
  ] as EducationItem[],

  certifications: [
    {
      title: "Certified Programmer",
      issuer: "National Professional Certification Board (BNSP) / LSP",
      year: "2025",
      type: "National Professional Credential",
      desc: "Nationally accredited programmer certification validating competencies in software logic, algorithm design, relational database operations, and secure programming practices."
    },
    {
      title: "Golang for Intermediate",
      issuer: "Universitas Gunadarma",
      year: "2025",
      type: "2-Month Intensive Program",
      desc: "Intensive backend training covering Golang concurrency (goroutines, channels), REST API architecture, and database interfacing."
    },
    {
      title: "Oracle for Intermediate",
      issuer: "Universitas Gunadarma",
      year: "2025",
      type: "2-Month Intensive Program",
      desc: "Advanced relational database management, complex SQL querying, indexing techniques, stored procedures, and transaction handling."
    },
    {
      title: "Programmer Course Bootcamp",
      issuer: "Universitas Gunadarma",
      year: "2025",
      type: "Technical Bootcamp",
      desc: "Hands-on bootcamp focusing on full-stack application development, clean coding practices, and system integration."
    }
  ] as CertificationItem[],

  blogPosts: [
    {
      id: "yolo-custom-detection",
      title: "Getting Started with YOLO for Custom Object Detection",
      category: "Computer Vision",
      date: "Oct 2025",
      readTime: "6 min read",
      excerpt:
        "A practical guide to annotating custom datasets, configuring augmentation pipelines, and fine-tuning YOLOv11 for high-precision real-world detection.",
      tags: ["YOLOv11", "PyTorch", "Computer Vision"]
    },
    {
      id: "llm-chatbot-integration",
      title: "Building an AI Chatbot with an LLM API",
      category: "AI Integration",
      date: "Sep 2025",
      readTime: "5 min read",
      excerpt:
        "How to architect conversational AI assistants into existing web platforms using the Google Gemini API with asynchronous streaming and token budgeting.",
      tags: ["Gemini API", "Fullstack", "LLM"]
    },
    {
      id: "nextjs-typescript-web-apps",
      title: "Building Modern Web Applications with Next.js and TypeScript",
      category: "Software Engineering",
      date: "Aug 2025",
      readTime: "7 min read",
      excerpt:
        "Architecting type-safe, resilient web systems using Next.js App Router, strict TypeScript contracts, and Tailwind CSS design systems.",
      tags: ["Next.js", "TypeScript", "Tailwind CSS"]
    }
  ] as BlogPost[]
};
