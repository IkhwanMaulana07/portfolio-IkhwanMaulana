import { 
  Project, 
  SkillItem, 
  CapabilityCard, 
  WorkflowStep, 
  EducationItem, 
  CertificationItem, 
  ConferenceItem,
  OrganizationItem,
  BlogPost 
} from '../types/portfolio';

export const COSMIC_DATA = {
  profile: {
    name: "Ikhwan Maulana",
    monogram: "IM",
    roles: [
      "Full Stack Developer",
      "Software Engineer",
      "Go & PHP Backend Architect",
      "React & Next.js Frontend Developer",
      "RESTful API & Database Designer",
      "AI & Systems Integrator"
    ],
    headline: "Engineering End-to-End Scalable Web Applications & Resilient Software Systems.",
    supportingDesc:
      "Full Stack Developer and Software Engineer with hands-on experience designing, building, and deploying end-to-end web applications. Proficient in Go (Golang, Gin-Gonic), PHP (Native MVC, Laravel), and React.js / Next.js, backed by relational database expertise in MySQL and Oracle SQL, secure RESTful API architectures, Docker containerization, and pragmatic AI/ML integrations.",
    location: "Bekasi, Indonesia",
    email: "ikhwanmaulana796@gmail.com",
    phone: "+62 896-7367-4598",
    whatsapp: "https://wa.me/6289673674598?text=Hello%20Ikhwan,%20I'm%20interested%20in%20your%20Full%20Stack%20%26%20Software%20Engineering%20portfolio",
    linkedin: "https://linkedin.com/in/ikhwan-maulana-1700b842b",
    github: "https://github.com/IkhwanMaulana07",
    avatar: "/profile.jpg",
    cosmicHeroImg: "/cosmic-hero.jpg",
    availability: "Available for Full-Stack & Software Engineering Roles",
    cvLink: "/CV_Ikhwan_Maulana_FullStack_Developer.pdf"
  },

  heroStats: [
    { value: "5+", label: "Full-Stack Deployments", sub: "Go, PHP, Next.js & Python" },
    { value: "3.78", label: "Academic Honors", sub: "Gunadarma S.Kom Informatics" },
    { value: "BNSP", label: "Certified Programmer", sub: "National Competency Credential" },
    { value: "100%", label: "End-to-End Delivery", sub: "DB Schema → API → Production UI" }
  ],

  capabilities: [
    {
      id: "fullstack-eng",
      title: "Full-Stack Web Development",
      subtitle: "End-to-End Web Systems",
      desc: "Building component-driven SPAs and responsive interfaces with React.js & Next.js, backed by modular Go (Gin) and PHP (Native MVC / Laravel) servers.",
      icon: "Layers",
      glowColor: "rgba(247, 231, 196, 0.35)"
    },
    {
      id: "backend-api",
      title: "Backend & API Architecture",
      subtitle: "High Concurrency & Security",
      desc: "Architecting high-performance RESTful APIs, asynchronous data handling (AJAX/Fetch/Axios), JWT HTTP-Only authentication, and Role-Based Access Control (RBAC).",
      icon: "Cpu",
      glowColor: "rgba(229, 195, 120, 0.35)"
    },
    {
      id: "database-design",
      title: "Database Modeling & ORM",
      subtitle: "ACID & Schema Optimization",
      desc: "Relational database design in MySQL/MariaDB, Oracle SQL, and PostgreSQL with 3NF schema normalization, indexing, query optimization, and GORM persistence.",
      icon: "Scan",
      glowColor: "rgba(212, 175, 55, 0.35)"
    },
    {
      id: "ai-devops",
      title: "AI Integration & DevOps",
      subtitle: "Intelligent APIs & CI/CD",
      desc: "Integrating Google Gemini LLM API, PyTorch, computer vision, Docker multi-stage containerization, and GitHub Actions CI/CD automated build testing.",
      icon: "Sparkles",
      glowColor: "rgba(158, 123, 52, 0.35)"
    }
  ] as CapabilityCard[],

  projects: [
    {
      id: "veyora-technologies",
      title: "Veyora Technologies",
      tagline: "F&B Digital Infrastructure Platform & 0% Commission Direct-Ordering Monorepo",
      category: "Full Stack / Monorepo Web Platform",
      categories: ["Full Stack Platform", "F&B Infrastructure", "Next.js & Golang"],
      image: "/projects/veyora_technologies.jpg",
      featured: true,
      role: "Full Stack Software Engineer",
      stack: ["Next.js 16", "React 19", "Golang (Gin Gonic)", "Redux Toolkit", "TypeScript", "Tailwind CSS", "Docker", "Docker Compose"],
      summary:
        "Architected and engineered a full-stack, decoupled monorepo web platform delivering 0% commission direct-ordering infrastructure for F&B businesses. Built responsive, high-performance UIs using Next.js 16 (App Router, Turbopack) and Tailwind CSS with i18n multi-language support (ID, EN, ZH), Redux Toolkit centralized state, high-concurrency Golang Gin RESTful APIs with sub-millisecond response times, Next.js dynamic reverse proxy, and multi-stage Docker containerization.",
      problem:
        "F&B businesses face steep 20%–35% third-party aggregator commissions, slow manual order recording during peak hours, and fractured customer data ownership across disparate channels.",
      objectives: [
        "Deliver a 0% commission direct-ordering infrastructure eliminating third-party aggregator tolls",
        "Build a zero-reload trilingual localization engine (ID, EN, ZH) across all routes and interactive widgets",
        "Engineer sub-millisecond Golang Gin RESTful APIs for automated lead persistence and WhatsApp dispatch",
        "Containerize full-stack architecture with Docker multi-stage builds reducing image footprint by 60%"
      ],
      solution:
        "Constructed a high-concurrency decoupled monorepo architecture with Next.js 16 on the frontend and Golang Gin-Gonic on the backend. Centralized state with Redux Toolkit for dynamic aggregator savings simulations, reverse-proxied container requests, and containerized deployment with Docker Compose.",
      architecturePoints: [
        "Architected decoupled monorepo with Next.js 16 (App Router, Turbopack) and Golang Gin-Gonic backend",
        "Built responsive UI with Tailwind CSS, custom interactive micro-animations via React Bits, and i18n support (ID, EN, ZH)",
        "Centralized application state using Redux Toolkit to power dynamic aggregator savings calculations and consultation funnels",
        "Developed high-concurrency, low-latency RESTful APIs in Golang achieving sub-millisecond response times",
        "Engineered Next.js dynamic runtime reverse proxy managing container routing and sanitizing hop-by-hop HTTP headers",
        "Containerized using Docker & Docker Compose with multi-stage builds (node:22-alpine & golang:alpine), cutting footprint by 60%"
      ],
      metrics: [
        { label: "Commission Toll", value: "0% Direct Order" },
        { label: "API Latency", value: "< 1ms (Golang)" },
        { label: "Docker Footprint", value: "-60% Optimized" },
        { label: "State Architecture", value: "Redux Toolkit" }
      ],
      results:
        "Empowered culinary enterprises to capture direct revenue with zero commission loss, sub-millisecond lead processing, and production-grade containerized deployment.",
      github: "https://github.com/IkhwanMaulana07",
      demo: "https://github.com/IkhwanMaulana07"
    },
    {
      id: "malaka-jaya-portal",
      title: "Malaka Jaya Digital MSME Community Web Portal",
      tagline: "Full-Stack Community Enterprise Platform with Golang Backend, RBAC & Google Gemini AI",
      category: "Full Stack / Go & AI Integration",
      categories: ["Full Stack Web", "Golang Backend", "AI Chatbot Integration"],
      image: "/projects/umkm_malakajaya.png",
      featured: true,
      role: "Full Stack Developer",
      stack: ["Go (Golang)", "Gin-Gonic", "GORM", "SQLite / MySQL", "JWT", "Vanilla CSS", "Google Gemini API"],
      summary:
        "Architected a full-stack community enterprise and product catalog platform in Go (Gin-Gonic) with role-based access control (Admin, Merchant, Resident) and direct customer ordering via WhatsApp at 0% commission. Built backend with GORM persistence, secure JWT in HTTP-Only cookies, Bcrypt hashing, merchant & admin dashboards with CRUD, live metrics, one-click MSME verification with audit log, and integrated Google Gemini API (gemini-1.5-flash) for hyperlocal recommendations.",
      problem:
        "Community micro-enterprises suffered from limited local digital discovery and lack of automated product assistance, while residents needed instant 24/7 product licensing and purchase guidance.",
      objectives: [
        "Architect high-efficiency Go backend with GORM persistence and internal RESTful endpoints",
        "Implement secure authentication with JWT in HTTP-Only cookies, Bcrypt hashing, and Gin RBAC middleware",
        "Build full merchant & admin dashboards with product CRUD, stock toggles, and verification audit logs",
        "Integrate Google Gemini 1.5 Flash AI chatbot with live backend directory injection"
      ],
      solution:
        "Engineered an end-to-end Go Gin application with normalized database persistence, secure cookie-based session management, clean Vanilla CSS responsive interfaces, and an intelligent Gemini AI assistant delivering hyperlocal product recommendations.",
      architecturePoints: [
        "Architected Go (Gin-Gonic) backend with GORM persistence layer supporting SQLite and MySQL relational databases",
        "Implemented secure JWT authentication stored in HTTP-Only cookies, Bcrypt password hashing, and Gin RBAC middleware",
        "Developed responsive mobile-first frontend pages with search across 6 business sectors, galleries, and news CMS",
        "Built Merchant and Admin dashboards with full product CRUD, one-click stock toggles, and live business metrics",
        "Integrated Google Gemini API (gemini-1.5-flash) chatbot injecting live directory data for real-time recommendations"
      ],
      metrics: [
        { label: "Backend Core", value: "Go Gin-Gonic" },
        { label: "Authentication", value: "JWT HTTP-Only" },
        { label: "Role Tiers", value: "3 (Admin/Merch/Res)" },
        { label: "AI Chatbot", value: "Gemini 1.5 Flash" }
      ],
      results:
        "Delivered a robust, high-performance community platform connecting local merchants directly to residents with zero commission intermediaries and intelligent AI guidance.",
      github: "https://github.com/IkhwanMaulana07",
      demo: "https://github.com/IkhwanMaulana07"
    },
    {
      id: "al-amin-academic-system",
      title: "Al-Amin Academic Information & Grading System",
      tagline: "Institution-Scale Academic Management Platform with Laravel 11, Next.js & Docker CI/CD",
      category: "Full Stack / Enterprise Web Application",
      categories: ["Full Stack Web", "Laravel 11 Backend", "Next.js Frontend"],
      image: "/projects/smp_alamin_nilai.png",
      featured: true,
      role: "Fullstack Web Developer",
      stack: ["Next.js 14", "React 18", "TypeScript", "Redux Toolkit", "Laravel 11", "PHP 8.3", "SQLite", "Docker", "GitHub Actions"],
      summary:
        "Developed an institution-scale fullstack web platform for academic management and student grading with 3 user roles (Role-Based Access Control: Admin, Teacher, Student). Implemented centralized state management with Redux Toolkit and TypeScript, high-performance Laravel 11 RESTful API backend with Laravel Sanctum token auth and ACID transactions, dynamic weighting calculation engine (30% Assignments + 30% Midterm + 40% Final Exam), Excel (.xls) exports, and Docker Compose CI/CD with GitHub Actions.",
      problem:
        "Educational institutions struggle with error-prone manual grading calculations, fragmented grade record storage, and delayed report card distribution to parents and students.",
      objectives: [
        "Design high-performance RESTful API architecture in Laravel 11 with Sanctum token authentication",
        "Implement centralized state management with Redux Toolkit and strict TypeScript typing",
        "Build an automated grading calculation engine with dynamic multi-tier component weighting",
        "Package application into Docker Compose multi-stage containers with automated GitHub Actions CI/CD"
      ],
      solution:
        "Constructed a decoupled architecture combining Next.js 14 on the frontend and Laravel 11 on the backend. Designed secure ACID database transactions, self-service student grade inspection, automated report cards, and automated PHPUnit testing via CI/CD.",
      architecturePoints: [
        "Built institution-scale academic platform with 3-tier Role-Based Access Control (Admin, Teacher, Student)",
        "Implemented centralized state management using Redux Toolkit and TypeScript for caching and live search synchronization",
        "Designed Laravel 11 RESTful API backend architecture with Laravel Sanctum token authentication and ACID transactions",
        "Engineered automated calculation engine (30% Assignments + 30% Midterm + 40% Final Exam) with Excel (.xls) export",
        "Packaged full infrastructure into Docker Compose (multi-stage Alpine Linux) with GitHub Actions CI/CD pipeline"
      ],
      metrics: [
        { label: "Grading Engine", value: "3-Tier Weighted" },
        { label: "Backend API", value: "Laravel 11 & Sanctum" },
        { label: "Frontend State", value: "Redux Toolkit (TS)" },
        { label: "CI/CD Pipeline", value: "GitHub Actions + Docker" }
      ],
      results:
        "Eliminated calculation discrepancies, automated digital report card generation, and provided secure self-service academic tracking for teachers and students.",
      github: "https://github.com/IkhwanMaulana07",
      demo: "https://github.com/IkhwanMaulana07"
    },
    {
      id: "movie-recommender",
      title: "AI-Powered Movie Recommender & Classification Apps",
      tagline: "Interactive Discovery & Predictive Analysis Web Application with Sub-Second Retrieval",
      category: "Full Stack / AI & Machine Learning",
      categories: ["AI Web App", "Machine Learning", "Python & Streamlit"],
      image: "/projects/movie_recommender.png",
      featured: true,
      role: "Machine Learning & Frontend Engineer",
      stack: ["Python", "Streamlit", "TensorFlow/Keras", "Scikit-learn", "TF-IDF", "Cosine Similarity", "TMDB API"],
      summary:
        "Built interactive, front-end-driven Python web applications (Streamlit) featuring real-time search/filtering, dynamic content rendering, and file-upload based inference — applying core UI/UX and state-management principles shared with JS front-end development. Integrated external TMDB REST APIs for dynamic metadata and high-resolution poster retrieval.",
      problem:
        "Users experience choice paralysis when navigating extensive content catalogs without personalized feature-weighted algorithmic recommendation engines.",
      objectives: [
        "Build interactive web interfaces with real-time search filtering and dynamic content rendering",
        "Extract semantic text vectors across genres and synopses with TF-IDF indexing",
        "Compute high-dimensional cosine similarity matrices with sub-second retrieval times",
        "Integrate external REST APIs for dynamic artwork retrieval and responsive display"
      ],
      solution:
        "Constructed a content-based recommendation model using Scikit-learn TF-IDF vectorization and cosine similarity indexing. Built an interactive Streamlit web interface that dynamically queries the TMDB REST API for poster artwork and cast bios.",
      architecturePoints: [
        "Built interactive front-end-driven Python web application with real-time search and state management",
        "Engineered text vectorization pipelines extracting multi-attribute cinematic feature tokens",
        "Computed cosine similarity matrix allowing instantaneous retrieval of top-N closest recommendations",
        "Integrated external TMDB REST APIs for dynamic high-resolution movie poster retrieval",
        "Deployed and maintained as a public live interactive web app on Streamlit Cloud"
      ],
      metrics: [
        { label: "Core Algorithm", value: "TF-IDF & Cosine" },
        { label: "Cloud Hosting", value: "Streamlit Cloud" },
        { label: "External API", value: "TMDB REST API" },
        { label: "Query Latency", value: "< 200ms" }
      ],
      results:
        "Live public web application delivering intuitive discovery for cinema enthusiasts with sub-second response times.",
      github: "https://github.com/IkhwanMaulana07",
      demo: "https://ikhwanmaulana07-rekomendasi-film-app-ovnbhf.streamlit.app"
    },
    {
      id: "bsf-larvae-detection",
      title: "Black Soldier Fly (BSF) Larva Detection & Classification",
      tagline: "End-to-End Computer Vision Pipeline Deployed On-Device via Flutter (Bachelor's Thesis)",
      category: "Computer Vision / Mobile Deployment",
      categories: ["Computer Vision", "Deep Learning", "Flutter Mobile"],
      image: "/projects/bsf_mobile_app.png",
      featured: true,
      role: "Lead Computer Vision & Mobile Developer",
      stack: ["Python", "YOLOv11s", "OpenCV", "PyTorch", "TensorFlow Lite", "Flutter"],
      summary:
        "Developed an end-to-end computer vision system, later deployed on-device via a Flutter mobile front-end, demonstrating cross-platform application delivery beyond the web. Achieved 0.9723 precision, 0.8315 recall, and 0.8720 mAP50 across 4 classification stages on a 21,974-image dataset.",
      problem:
        "BSF farmers struggle to differentiate young larva, mature larva, prepupa, and pupa stages with the naked eye, leading to suboptimal harvest timing and yield loss.",
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
    }
  ] as Project[],

  techStack: {
    languages: [
      { name: "JavaScript (ES6+)", role: "Core Language", level: "Expert", applied: "Dynamic SPAs & Event Handling", desc: "Modern ES6+ asynchronous syntax, closures, event-driven DOM, and fullstack JS development.", orbitRadius: 180, orbitSpeed: 45 },
      { name: "TypeScript", role: "Type System", level: "Advanced", applied: "Scalable Enterprise Apps", desc: "Static typing, generics, strict interface contracts, and reliable maintainable codebases.", orbitRadius: 240, orbitSpeed: 60 },
      { name: "Go (Golang)", role: "High-Performance Backend", level: "Advanced", applied: "Gin-Gonic & Microservices", desc: "High-concurrency goroutines, RESTful APIs, low-latency microservices, and GORM persistence.", orbitRadius: 210, orbitSpeed: 50 },
      { name: "PHP", role: "Backend Language", level: "Advanced", applied: "Native MVC & Laravel 11", desc: "Object-oriented backend design, MVC architecture, routing, and enterprise application logic.", orbitRadius: 270, orbitSpeed: 68 },
      { name: "Java", role: "OOP Core", level: "Intermediate", applied: "Spring Boot Fundamentals", desc: "Enterprise object-oriented programming, data structures, algorithms, and design patterns.", orbitRadius: 300, orbitSpeed: 75 },
      { name: "Python", role: "AI & ML Scripting", level: "Advanced", applied: "Data Pipelines & Models", desc: "Computer vision pipelines, scikit-learn models, and fullstack Streamlit applications.", orbitRadius: 190, orbitSpeed: 40 },
      { name: "SQL", role: "Relational Querying", level: "Expert", applied: "MySQL & Oracle SQL", desc: "Complex joins, indexing, query optimization, constraints, and 3NF database design.", orbitRadius: 230, orbitSpeed: 52 },
      { name: "HTML5 & CSS3", role: "Web Standards", level: "Expert", applied: "Semantic & Responsive UI", desc: "Accessible semantic structure, responsive CSS Grid, Flexbox, and modern CSS variables.", orbitRadius: 260, orbitSpeed: 62 }
    ] as SkillItem[],

    backend: [
      { name: "Go Gin-Gonic", role: "Web Framework", level: "Advanced", applied: "Veyora & Malaka Jaya", desc: "High-speed HTTP routing, custom middleware (RBAC, CORS), and sub-millisecond response times.", orbitRadius: 200, orbitSpeed: 48 },
      { name: "PHP Native MVC", role: "Architecture Pattern", level: "Advanced", applied: "Custom Web Backends", desc: "Clean separation of models, views, and controllers without third-party framework overhead.", orbitRadius: 240, orbitSpeed: 55 },
      { name: "Laravel 11", role: "Fullstack Framework", level: "Intermediate", applied: "Al-Amin Grading System", desc: "Eloquent ORM, Laravel Sanctum token authentication, migrations, and artisan CLI.", orbitRadius: 280, orbitSpeed: 65 },
      { name: "RESTful API Architecture", role: "API Design", level: "Expert", applied: "Frontend-Backend Contracts", desc: "Stateless REST endpoints, structured JSON payloads, HTTP status codes, and API versioning.", orbitRadius: 190, orbitSpeed: 44 },
      { name: "GORM (Go ORM)", role: "Data Persistence", level: "Advanced", applied: "Golang Database Layer", desc: "Type-safe database transactions, automated migrations, hooks, and relational associations.", orbitRadius: 250, orbitSpeed: 58 },
      { name: "Java Spring Boot", role: "Enterprise Backend", level: "Familiar", applied: "Enterprise Architectures", desc: "Familiar with Spring Boot fundamentals, dependency injection, and REST controllers.", orbitRadius: 310, orbitSpeed: 72 }
    ] as SkillItem[],

    frontend: [
      { name: "React.js", role: "UI Library", level: "Expert", applied: "Interactive Web Interfaces", desc: "Component-driven architecture, custom hooks, declarative state, and virtual DOM reconciliation.", orbitRadius: 220, orbitSpeed: 55 },
      { name: "Next.js", role: "Full-Stack Framework", level: "Advanced", applied: "App Router & SSR", desc: "Next.js 14/16 App Router, Turbopack, server/client components, and dynamic reverse proxying.", orbitRadius: 280, orbitSpeed: 65 },
      { name: "Redux Toolkit", role: "State Management", level: "Advanced", applied: "Al-Amin & Veyora", desc: "Centralized application state, async thunks, entity caching, and immutable data cycles.", orbitRadius: 200, orbitSpeed: 48 },
      { name: "Tailwind CSS", role: "Utility Design System", level: "Expert", applied: "Production Layouts", desc: "Utility-first design tokens, responsive breakpoints, dark mode theming, and micro-interactions.", orbitRadius: 240, orbitSpeed: 58 },
      { name: "Vue.js", role: "Frontend Framework", level: "Intermediate", applied: "Component UI", desc: "Single-file components, Vue reactivity system, and progressive frontend enhancement.", orbitRadius: 260, orbitSpeed: 62 },
      { name: "Bootstrap & MUI", role: "Component Libraries", level: "Advanced", applied: "Rapid Enterprise UI", desc: "Responsive 12-column grid system, accessible dialogs, and enterprise design patterns.", orbitRadius: 300, orbitSpeed: 70 }
    ] as SkillItem[],

    databases: [
      { name: "MySQL / MariaDB", role: "Relational Database", level: "Expert", applied: "Primary Storage Engine", desc: "3NF schema normalization, foreign key constraints, indexing strategies, and ACID integrity.", orbitRadius: 190, orbitSpeed: 44 },
      { name: "Oracle SQL", role: "Enterprise Database", level: "Advanced", applied: "Intermediate Training", desc: "Complex analytical queries, subqueries, view definitions, stored procedures, and transactions.", orbitRadius: 250, orbitSpeed: 56 },
      { name: "PostgreSQL", role: "Relational Database", level: "Advanced", applied: "Structured Applications", desc: "Robust relational constraints, JSONB storage, and reliable ACID transaction safety.", orbitRadius: 280, orbitSpeed: 66 },
      { name: "SQLite", role: "Embedded Database", level: "Advanced", applied: "Local & Monorepo Caches", desc: "Zero-configuration embedded relational persistence for lightweight production services.", orbitRadius: 220, orbitSpeed: 50 },
      { name: "MongoDB", role: "NoSQL Database", level: "Intermediate", applied: "Document Stores", desc: "Document-oriented data modeling, BSON data structures, and dynamic collection querying.", orbitRadius: 310, orbitSpeed: 72 }
    ] as SkillItem[],

    devops: [
      { name: "Docker & Compose", role: "Containerization", level: "Intermediate", applied: "Multi-Stage Builds", desc: "Containerized environments, multi-stage alpine builds (-60% image footprint), and volume persistence.", orbitRadius: 210, orbitSpeed: 50 },
      { name: "Git & GitHub", role: "Version Control", level: "Expert", applied: "Team Collaboration", desc: "Branching strategies, code reviews, semantic commits, and git repository maintenance.", orbitRadius: 180, orbitSpeed: 42 },
      { name: "GitHub Actions", role: "CI/CD Pipeline", level: "Intermediate", applied: "Al-Amin System", desc: "Automated test runs (PHPUnit), continuous integration workflows, and build verification.", orbitRadius: 260, orbitSpeed: 60 },
      { name: "Postman", role: "API Testing", level: "Advanced", applied: "Endpoint Verification", desc: "RESTful endpoint testing, environment variable management, and automated test collections.", orbitRadius: 230, orbitSpeed: 54 },
      { name: "Vercel & Netlify", role: "Edge Cloud Hosting", level: "Advanced", applied: "Production Deployments", desc: "Zero-config Next.js continuous deployment, custom domain DNS, and serverless edge functions.", orbitRadius: 290, orbitSpeed: 68 },
      { name: "Vite, npm & pnpm", role: "Build Tooling", level: "Expert", applied: "Modern Toolchain", desc: "Fast HMR bundling, dependency management, ESLint, and Prettier code formatting.", orbitRadius: 200, orbitSpeed: 46 }
    ] as SkillItem[],

    ai: [
      { name: "Google Gemini API", role: "Generative AI & LLM", level: "Advanced", applied: "Malaka Jaya Portal", desc: "Gemini 1.5 Flash chatbot integration, prompt engineering, and live backend data injection.", orbitRadius: 200, orbitSpeed: 46 },
      { name: "PyTorch", role: "Deep Learning", level: "Advanced", applied: "Neural Network Research", desc: "Convolutional layers, tensor transformations, dataset loaders, and model fine-tuning.", orbitRadius: 240, orbitSpeed: 56 },
      { name: "Ultralytics YOLOv11", role: "Object Detection", level: "Advanced", applied: "BSF Larva Mobile App", desc: "Fine-tuned YOLOv11s model achieving 0.9723 precision and 0.8720 mAP50 on 21,974 images.", orbitRadius: 270, orbitSpeed: 64 },
      { name: "TensorFlow & TFLite", role: "Edge Inference", level: "Advanced", applied: "On-Device Mobile Models", desc: "Model conversion, INT8 quantization, and offline edge deployment for mobile devices.", orbitRadius: 220, orbitSpeed: 52 },
      { name: "OpenCV", role: "Computer Vision", level: "Advanced", applied: "Image Preprocessing", desc: "Image augmentation, filtering, contour detection, and bounding-box rendering.", orbitRadius: 290, orbitSpeed: 68 },
      { name: "Scikit-learn", role: "Machine Learning", level: "Advanced", applied: "Movie Recommender", desc: "TF-IDF text vectorization, cosine similarity matrices, and content-based recommendation.", orbitRadius: 310, orbitSpeed: 72 }
    ] as SkillItem[]
  },

  workflowSteps: [
    {
      step: "01",
      title: "Analyze & Architect",
      desc: "Deconstruct business requirements, database schemas, and API contracts.",
      details: [
        "Analyze stakeholder pain points, system constraints, and functional specifications",
        "Model 3NF normalized relational schemas (MySQL/Oracle) and RESTful API endpoints",
        "Define authentication boundaries (JWT, RBAC) and state management topology"
      ]
    },
    {
      step: "02",
      title: "Engineer Full-Stack",
      desc: "Implement high-performance backend services and responsive frontend UI.",
      details: [
        "Develop high-concurrency Go (Gin) or PHP (Laravel) RESTful backend logic",
        "Build modular, accessible reactive components with React.js / Next.js and Tailwind CSS",
        "Integrate centralized state (Redux Toolkit) and asynchronous data synchronization"
      ]
    },
    {
      step: "03",
      title: "Augment & Integrate",
      desc: "Embed intelligent AI capabilities and external third-party services.",
      details: [
        "Integrate conversational LLM APIs (Google Gemini) with live database context injection",
        "Embed computer vision models (YOLO / TFLite) or ML recommender systems",
        "Connect automated WhatsApp dispatch pipelines and dynamic payment workflows"
      ]
    },
    {
      step: "04",
      title: "Test & Containerize",
      desc: "Automate testing, containerize with Docker, and deploy with CI/CD.",
      details: [
        "Conduct manual test case validation, input sanitization, and Postman API testing",
        "Containerize full-stack architecture with Docker multi-stage builds (-60% footprint)",
        "Deploy to production with automated GitHub Actions CI/CD pipelines and monitoring"
      ]
    }
  ] as WorkflowStep[],

  education: [
    {
      degree: "Bachelor of Computer Science (S.Kom) in Informatics Engineering",
      institution: "Universitas Gunadarma — Bekasi, Indonesia",
      faculty: "Faculty of Industrial Technology, Dept. of Informatics | NPM: 50422698",
      period: "2022 - 2026",
      gpa: "3.78 / 4.00 (Fresh Graduate)",
      coursework: [
        "Software Engineering",
        "Web Programming",
        "Database Systems",
        "Artificial Intelligence",
        "Machine Learning",
        "Computer Vision",
        "Data Science"
      ],
      description:
        "Specialized in full-stack web application architecture, relational database management systems, and practical AI integrations. Completed bachelor thesis engineering an end-to-end computer vision system with 97.23% precision and 0.8720 mAP50."
    },
    {
      degree: "Computer and Network Engineering (TKJ)",
      institution: "SMK Islam Al-Amin",
      faculty: "Vocational High School Diploma",
      period: "2019 - 2022",
      coursework: [
        "Computer Networking",
        "Hardware Maintenance",
        "Server Administration",
        "Network Protocols"
      ],
      description:
        "Comprehensive foundational training in computer networking, hardware maintenance, server administration, and local area network installations."
    }
  ] as EducationItem[],

  certifications: [
    {
      title: "Certified Programmer",
      issuer: "National Professional Certification Board (BNSP) / LSP",
      year: "2026",
      type: "National Professional Credential",
      desc: "Nationally accredited programmer certification validating competencies in software logic, algorithm design, relational database operations, and secure programming practices."
    },
    {
      title: "Golang for Intermediate",
      issuer: "Universitas Gunadarma",
      year: "2025",
      type: "Intensive Technical Training",
      desc: "Advanced backend engineering covering Golang concurrency (goroutines, channels), Gin-Gonic REST API architecture, and database persistence."
    },
    {
      title: "Oracle for Intermediate",
      issuer: "Universitas Gunadarma",
      year: "2025",
      type: "Intensive Database Program",
      desc: "Advanced relational database management, complex SQL querying, indexing techniques, stored procedures, and transaction handling."
    },
    {
      title: "Programmer Course",
      issuer: "Universitas Gunadarma",
      year: "2025",
      type: "Technical Certification",
      desc: "Comprehensive course focusing on full-stack application development, clean coding practices, and system integration."
    },
    {
      title: "Application Development Design",
      issuer: "Universitas Gunadarma",
      year: "2024",
      type: "Design & Systems Course",
      desc: "Software architecture paradigms, system modeling, UML design, and user-centric application workflows."
    },
    {
      title: "Wireless LAN Installation",
      issuer: "Universitas Gunadarma",
      year: "2024",
      type: "Network Infrastructure Certification",
      desc: "Network topology planning, wireless access point configuration, routing protocols, and enterprise network security."
    }
  ] as CertificationItem[],

  conferences: [
    {
      title: 'Tech Talk: "Designing Future with Back End in Tech Industry"',
      organizer: "Google Developer Student Clubs (GDSC), Universitas Gunadarma",
      year: "2024"
    },
    {
      title: 'National Symposium: "Synergy of University and Industry Collaboration: Software and Hardware for Artificial Intelligence"',
      organizer: "Universitas Gunadarma",
      year: "2025"
    }
  ] as ConferenceItem[],

  organization: [
    {
      role: "Head of Entrepreneurship & Skills Division",
      organization: "Student Council (OSIS), SMK Islam Al-Amin",
      description: "Led student entrepreneurship initiatives, organized hands-on technical workshops, and coordinated cross-functional student project teams."
    }
  ] as OrganizationItem[],

  blogPosts: [
    {
      id: "golang-rest-apis",
      title: "Building High-Concurrency RESTful APIs with Go (Golang) and Gin",
      category: "Backend Engineering",
      date: "Nov 2025",
      readTime: "6 min read",
      excerpt:
        "How to architect high-throughput, low-latency microservices with Go, Gin-Gonic, GORM persistence, and secure JWT in HTTP-Only cookies.",
      tags: ["Golang", "Gin-Gonic", "REST APIs", "Backend"]
    },
    {
      id: "fullstack-nextjs-redux",
      title: "Scaling State in Full-Stack Web Applications with Next.js and Redux Toolkit",
      category: "Full Stack Development",
      date: "Oct 2025",
      readTime: "7 min read",
      excerpt:
        "Architecting clean, type-safe fullstack platforms combining Next.js App Router, centralized Redux state, and automated Docker CI/CD.",
      tags: ["Next.js", "Redux Toolkit", "TypeScript", "Docker"]
    },
    {
      id: "llm-gemini-integration",
      title: "Integrating Google Gemini AI Assistant into Production Web Applications",
      category: "AI Integration",
      date: "Sep 2025",
      readTime: "5 min read",
      excerpt:
        "Practical guide to injecting live relational database context into Google Gemini 1.5 Flash for accurate hyperlocal business recommendations.",
      tags: ["Google Gemini", "AI Chatbot", "Full Stack"]
    }
  ] as BlogPost[]
};
