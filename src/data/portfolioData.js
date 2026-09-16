export const PORTFOLIO_DATA = {
  profile: {
    name: "Ikhwan Maulana",
    role: "Full Stack Developer",
    subtitle: "JavaScript Ecosystem | React · Vue · Node.js | AI-Integrated Web Applications",
    location: "Bekasi, Indonesia",
    phone: "+62 896-7367-4598",
    email: "ikhwanmaulana796@gmail.com",
    whatsapp: "https://wa.me/6289673674598?text=Halo%20Ikhwan,%20saya%20tertarik%20dengan%20profil%20Full%20Stack%20Developer%20Anda",
    linkedin: "https://linkedin.com/in/ikhwan-maulana-1700b842b",
    github: "https://github.com/IkhwanMaulana07",
    resumeUrl: "/cv_ikhwan_maulana.pdf",
    cvOnlineUrl: "/cv_ikhwan_maulana.html",
    avatar: "/profile.jpg",
    availability: "Available for Full-Stack Roles",
    summary:
      "Full Stack Developer with hands-on experience designing, building, and deploying end-to-end web applications across the modern JavaScript ecosystem. Skilled in building responsive front-ends with React, Vue, and Tailwind CSS, and robust back-ends with Node.js, Express, and PHP Native MVC, backed by relational (MySQL) database design. Experienced in RESTful API architecture, asynchronous data handling (Fetch/AJAX), authentication and role-based access control, and integrating AI/ML capabilities (Google Gemini API, Python model inference) directly into production web applications. Comfortable owning a project from database schema and API design through to a polished, deployed UI."
  },

  stats: [
    { value: "3.78", label: "Cumulative GPA", sub: "Gunadarma (S.Kom)" },
    { value: "5+", label: "Fullstack & AI Projects", sub: "Production-ready" },
    { value: "10+", label: "Normalized Schemas", sub: "Relational DBs" },
    { value: "BNSP", label: "Certified Programmer", sub: "National LSP" },
    { value: "21K+", label: "Dataset Images", sub: "Computer Vision" }
  ],

  // Software Engineering Experience directly from CV
  softwareEngineeringExperience: [
    {
      id: "architecture",
      title: "End-to-End Full-Stack Architecture",
      icon: "Server",
      desc: "Engineered full-stack applications end-to-end: relational database design, backend business logic, RESTful API architecture, and front-end implementation through to production deployment."
    },
    {
      id: "modularity",
      title: "Modular & Decoupled Programming Paradigms",
      icon: "Layers",
      desc: "Applied modular programming paradigms to cleanly decouple data layer, business logic, API layer, and presentation layer across both JavaScript and PHP stacks."
    },
    {
      id: "tooling",
      title: "Build Tooling & Runtime Optimization",
      icon: "Cpu",
      desc: "Experienced diagnosing runtime environments, resolving package/dependency conflicts (npm/yarn), and configuring build tooling (Vite/Webpack) and GPU/CUDA acceleration for ML workloads."
    },
    {
      id: "deployment",
      title: "Git Collaboration & Multi-Platform Deployment",
      icon: "Cloud",
      desc: "Proficient with Git/GitHub version control workflows, code review, and deploying applications to platforms such as Vercel, Netlify, and Streamlit Cloud."
    }
  ],

  // Technical Skills formatted strictly matching CV categories
  skills: {
    languages: [
      { name: "JavaScript (ES6+)", role: "Core Language", applied: "Full-Stack Web & SPAs", desc: "Modern asynchronous syntax, closures, event-driven DOM, and modular client-side architecture." },
      { name: "TypeScript", role: "Type System", applied: "Type-Safe Web Apps", desc: "Static contracts, type safety, interface definitions, and enterprise-grade maintainability." },
      { name: "PHP", role: "Backend Language", applied: "SMP Al-Amin & Malaka Jaya", desc: "Object-oriented programming, custom router implementations, and native MVC architecture." },
      { name: "Python", role: "AI & ML Core", applied: "Computer Vision & ML", desc: "Data processing, deep learning pipelines, model training, and Streamlit application engineering." },
      { name: "Java", role: "Object-Oriented Programming", applied: "Enterprise Concepts", desc: "Object-oriented programming fundamentals, data structures, and algorithms." },
      { name: "SQL", role: "Query Language", applied: "Relational Schemas", desc: "Relational query optimization, complex multi-table joins, indexing, and 3NF normalization." },
      { name: "HTML5 & CSS3", role: "Markup & Styling", applied: "Responsive Web UI", desc: "Semantic structure, responsive Flexbox/Grid layouts, and modern glassmorphic styling." }
    ],
    frontend: [
      { name: "ReactJs", role: "UI Framework", applied: "Production Dashboards", desc: "Component architecture, declarative state management, custom hooks, and modern SPA lifecycle." },
      { name: "Next.js", role: "Full-Stack Framework", applied: "Modern Web Apps", desc: "Server and client component rendering, API routing, and optimized web performance." },
      { name: "Vue.js", role: "Frontend Framework", applied: "Interactive Interfaces", desc: "Reactivity system, Single File Components (SFC), and client-side routing." },
      { name: "Angular (familiar)", role: "Framework", applied: "Component Frameworks", desc: "Familiar with TypeScript-based component structures and modular directives." },
      { name: "Redux", role: "State Management", applied: "Centralized State", desc: "Predictable centralized state container, reducers, and unidirectional data flow." },
      { name: "jQuery", role: "DOM Manipulation", applied: "Interactive Web Pages", desc: "Event handling, animated DOM updates, and AJAX data fetching." }
    ],
    backend: [
      { name: "Node.js", role: "JavaScript Runtime", applied: "Server-Side Execution", desc: "Event-driven non-blocking I/O model for building high-concurrency network applications." },
      { name: "Express.js", role: "Web Framework", applied: "RESTful Endpoints & Middleware", desc: "Modular route handling, JSON body parsing, and authentication middleware pipelines." },
      { name: "Nest.js (familiar)", role: "Enterprise Framework", applied: "Modular TypeScript Backends", desc: "Familiar with decorator-based modular dependency injection architecture." },
      { name: "PHP Native MVC", role: "Modular Backend", applied: "SMP Al-Amin Portal", desc: "Clean separation of Models, Views, and Controllers with secure authentication and session management." },
      { name: "Laravel (familiar)", role: "PHP Framework", applied: "Modern PHP Systems", desc: "Familiar with Eloquent ORM, Blade templating, and artisan CLI workflows." }
    ],
    api: [
      { name: "REST API Design", role: "API Architecture", applied: "System Integrations", desc: "Stateless endpoint architecture, structured JSON payloads, status codes, and endpoint security." },
      { name: "Fetch API & AJAX", role: "Client-Server Sync", applied: "Dynamic UI Updates", desc: "Seamless asynchronous data transactions without page reloads for fluid user experiences." },
      { name: "Axios", role: "HTTP Client", applied: "API Requests", desc: "Promise-based HTTP client with request/response interceptors and automated JSON transformation." },
      { name: "GraphQL (familiar)", role: "Query Language", applied: "Flexible Data Fetching", desc: "Schema-defined queries, mutations, and typed data resolution." },
      { name: "WebSocket & Socket.IO", role: "Real-Time Comms", applied: "Live Data Streams", desc: "Full-duplex bidirectional communication channels for real-time messaging and status." },
      { name: "JWT & OAuth", role: "Token Authentication", applied: "Security & RBAC", desc: "Stateless JSON Web Token verification, session guards, and role permissions." }
    ],
    styling: [
      { name: "Tailwind CSS", role: "Utility Design System", applied: "Responsive Interfaces", desc: "Utility-first CSS architecture, responsive breakpoints, and dark mode theming." },
      { name: "Bootstrap", role: "UI Toolkit", applied: "Rapid Layouts", desc: "Grid system prototyping, responsive navigation, and modal components." },
      { name: "Material UI", role: "React Components", applied: "Modern Design", desc: "Google Material Design components with comprehensive customization." },
      { name: "Responsive & Mobile-First", role: "Design Principle", applied: "All Interfaces", desc: "Fluid layouts ensuring seamless experience from smartphones up to ultrawide monitors." }
    ],
    databases: [
      { name: "MySQL", role: "Relational DB", applied: "Core Web Systems", desc: "Schema normalization (3NF), relational constraints, foreign keys, transaction handling, and indexing." },
      { name: "PostgreSQL", role: "Relational DB", applied: "Structured Data", desc: "ACID compliance, complex analytical queries, and schema reliability." },
      { name: "MongoDB", role: "Document DB", applied: "Flexible Data Models", desc: "Document-based NoSQL storage, BSON models, and aggregation pipeline operations." }
    ],
    tools: [
      { name: "Vite", role: "Modern Build Tool", applied: "Portfolio & SPAs", desc: "Lightning-fast HMR, ES module bundling, tree shaking, and production asset optimization." },
      { name: "npm / pnpm", role: "Package Management", applied: "Dependency Resolution", desc: "Package lifecycle management, semantic versioning, and monorepo workspace configurations." },
      { name: "ESLint & Prettier", role: "Code Quality", applied: "Clean Codebase", desc: "Automated code formatting, style consistency, and static code analysis." },
      { name: "Jest & React Testing Library", role: "Automated Testing", applied: "Component & Unit Tests", desc: "Unit testing, component rendering assertions, and mock functions." },
      { name: "Postman", role: "API Testing", applied: "Endpoint Verification", desc: "Comprehensive REST API endpoint testing, request automated mocking, and environment variables." }
    ],
    devops: [
      { name: "Git & GitHub", role: "Version Control", applied: "Codebase Collaboration", desc: "Branching strategies, semantic commit workflows, pull requests, and repository maintenance." },
      { name: "GitHub Actions (familiar)", role: "CI/CD Workflows", applied: "Automated Testing", desc: "Workflow YAML automation for continuous testing and lint checks." },
      { name: "Docker (familiar)", role: "Containerization", applied: "Environment Consistency", desc: "Containerized application environments ensuring reproducible development and deployment." },
      { name: "Vercel & Netlify", role: "Cloud Hosting", applied: "Production Deployments", desc: "Zero-configuration automated edge deployment, SSL certificates, and custom domains." },
      { name: "Streamlit Cloud", role: "ML Hosting", applied: "Movie Recommender", desc: "Dedicated cloud hosting and live execution of interactive Python applications." }
    ],
    ai: [
      { name: "Python AI Core", role: "Language Core", applied: "ML Pipelines", desc: "NumPy, Pandas, model training routines, and mathematical computation." },
      { name: "PyTorch & TensorFlow/Keras", role: "Deep Learning", applied: "Neural Networks", desc: "Deep learning architectures, convolutional layers, and model weight checkpointing." },
      { name: "Ultralytics YOLOv11s / v8", role: "Object Detection", applied: "BSF Larva Mobile App", desc: "Fine-tuned deep learning models on 21,974 annotated images for real-time classification." },
      { name: "OpenCV", role: "Computer Vision", applied: "Dataset Augmentation", desc: "Image transformation, feature extraction, filtering, and dataset augmentation pipelines." },
      { name: "scikit-learn", role: "Machine Learning", applied: "Content Recommender", desc: "TF-IDF text vectorization, cosine similarity metrics, and dataset preprocessing." },
      { name: "Google Gemini API", role: "Generative AI & LLM", applied: "Malaka Jaya Portal", desc: "Prompt engineering, conversational AI assistants, and automated contextual responses." }
    ]
  },

  projects: [
    {
      id: "malaka-jaya-portal",
      title: "Malaka Jaya Digital MSME Community Web Portal",
      tagline: "AI-Powered Community Enterprise Platform with Three-Tier RBAC, Leaflet Maps & Gemini Chatbot",
      category: "Full-Stack Web & AI",
      categories: ["Full-Stack Web", "AI-Integrated"],
      image: "/projects/umkm_malakajaya.png",
      featured: true,
      role: "Lead Full Stack & AI Developer",
      stack: ["PHP Native (MVC)", "MySQL", "JavaScript", "Tailwind CSS", "Fetch API/AJAX", "Leaflet JS", "PHPMailer", "Google Gemini API"],
      summary: "Architected a full-stack community enterprise platform with a three-tier role system (Admin, Merchant, Resident), dynamic Leaflet geolocation, direct WhatsApp ordering, and an embedded Google Gemini API AI assistant chatbot.",
      problem: "Local MSMEs lacked digital visibility and automated channels to receive direct orders without high marketplace fees, while residents and merchants needed real-time automated assistance for inquiries and news publication without clunky page reloads.",
      solution: "Engineered a high-performance full-stack web application on a structured MVC architecture with a 10-table normalized relational MySQL schema. Features asynchronous Fetch/AJAX UI interactions, interactive Leaflet JS merchant location maps, role-based access control (RBAC), and an embedded Google Gemini API chatbot providing 24/7 resident assistance and automated news drafting.",
      architecturePoints: [
        "Architected a full-stack community enterprise and product catalog platform with a three-tier role system (Admin, Merchant, Resident), enabling direct customer ordering via WhatsApp.",
        "Built the backend with PHP Native MVC and a 10-table normalized MySQL schema covering users, merchants, products, articles, and audit logs; exposed data through internal RESTful endpoints.",
        "Integrated Google Gemini API (LLM) capabilities directly into application workflows to power an AI assistant chatbot for resident guidance and automated news drafting.",
        "Developed responsive, mobile-first front-end pages (JavaScript, Tailwind CSS) including MSME directories, product galleries, merchant location maps (Leaflet JS), news publishing, and global search.",
        "Implemented secure authentication and role-based access control (RBAC) with email OTP verification (PHPMailer) and password recovery flows.",
        "Used Fetch API/AJAX for asynchronous, no-reload interactions across interactive Admin and Merchant dashboards, including live sales metrics and full CRUD product management with photo uploads."
      ],
      metrics: [
        { label: "AI Integration", value: "Google Gemini Chatbot" },
        { label: "Role System", value: "3 Tiers (Admin/Merchant/Resident)" },
        { label: "Database Schema", value: "10 Normalized Tables" },
        { label: "Data Flow", value: "Fetch API/AJAX (No Reload)" }
      ],
      github: "https://github.com/IkhwanMaulana07",
      demo: "#"
    },
    {
      id: "academic-grading-system",
      title: "Student Academic Grading System — SMP Islam Al-Amin",
      tagline: "Role-Gated Academic Management System with Real-Time Grade Calculations",
      category: "Full-Stack Web",
      categories: ["Full-Stack Web"],
      image: "/projects/smp_alamin_nilai.png",
      featured: true,
      role: "Backend & Full Stack Developer",
      stack: ["PHP Native MVC", "MySQL (mysqli)", "JavaScript", "HTML5/CSS3", "Multi-Role RBAC", "Excel TSV Export"],
      summary: "Engineered a role-gated full-stack academic grading system (Admin, Teacher, Student) with dynamic weighted calculations and real-time client-side grade recapitulation using JavaScript.",
      problem: "Teachers and school administrators relied on fragmented spreadsheets, causing calculation inconsistencies, delayed semester reports, and lack of self-service access for students.",
      solution: "Developed an end-to-end academic portal with separate gateways for Admin, Teachers, and Students. Features real-time client-side grade calculation, server-side 0-100 score validation, automated pass/fail thresholding, and one-click TSV Excel report card export.",
      architecturePoints: [
        "Engineered a role-gated full-stack academic grading system (Admin, Teacher, Student) with secure session-based authentication.",
        "Built teacher-facing grading interfaces with dynamic weighted calculations and real-time client-side grade recapitulation using JavaScript.",
        "Implemented upsert database logic and server-side 0–100 score validation, plus filterable grade summary tables and printable report cards.",
        "Designed a relational schema linking users, students, teachers, and grades, with automated pass/fail thresholding and TSV-based Excel export for reporting."
      ],
      metrics: [
        { label: "Users Supported", value: "Admin, Teacher, Student" },
        { label: "Validation", value: "Server-side 0-100 & Upsert" },
        { label: "Export", value: "Automated TSV Excel" },
        { label: "Grade Recapitulation", value: "Real-time Client Calculation" }
      ],
      github: "https://github.com/IkhwanMaulana07",
      demo: "#"
    },
    {
      id: "movie-recommender",
      title: "AI-Powered Movie Recommender & Image Classification Apps",
      tagline: "Interactive Web Application with Content-Based Filtering & Dynamic Poster Fetch",
      category: "AI-Integrated",
      image: "/projects/movie_recommender.png",
      featured: false,
      role: "ML & Frontend Developer",
      stack: ["Python", "Streamlit", "TensorFlow/Keras", "TF-IDF", "Cosine Similarity", "REST API"],
      summary: "Built interactive, front-end-driven Python web applications (Streamlit) featuring real-time search/filtering, dynamic content rendering, and file-upload based inference.",
      problem: "Users face choice overload when browsing extensive catalogs without accurate recommendations matching cinematic traits.",
      solution: "Constructed a machine learning recommender utilizing TF-IDF textual feature extraction across movie genres, keywords, and overviews, computing cosine similarity matrices and rendering dynamic movie posters via external REST APIs.",
      architecturePoints: [
        "Built interactive, front-end-driven Python web applications (Streamlit) featuring real-time search/filtering, dynamic content rendering, and file-upload based inference.",
        "Applied core UI/UX and state-management principles shared with JS front-end development.",
        "Integrated external APIs for dynamic data fetching (poster retrieval, metadata) and designed responsive, non-technical-user-friendly interfaces.",
        "Deployed and maintained as a public live application on Streamlit Community Cloud."
      ],
      metrics: [
        { label: "Algorithm", value: "TF-IDF & Cosine Similarity" },
        { label: "Deployment", value: "Streamlit Cloud (Live)" },
        { label: "External API", value: "Dynamic Poster Retrieval" }
      ],
      github: "https://github.com/IkhwanMaulana07",
      demo: "https://ikhwanmaulana07-rekomendasi-film-app-ovnbhf.streamlit.app"
    },
    {
      id: "bsf-larva-detection",
      title: "Black Soldier Fly (BSF) Larva Detection & Classification System (Bachelor's Thesis)",
      tagline: "End-to-End Computer Vision Pipeline Deployed On-Device via Flutter",
      category: "Mobile AI & Computer Vision",
      image: "/projects/bsf_mobile_app.png",
      featured: false,
      role: "Computer Vision & Mobile Engineer",
      stack: ["Python", "YOLOv11s", "TensorFlow Lite", "Flutter", "Dart", "OpenCV"],
      summary: "Developed an end-to-end computer vision system, later deployed on-device via a Flutter mobile front-end, demonstrating cross-platform application delivery beyond the web.",
      overview: "An intelligent Android mobile application engineered to assist farmers in real-time observation and accurate classification of Black Soldier Fly (BSF) larva growth stages (Young Larva, Mature Larva, Prepupa, Pupa). Featuring camera and gallery image capture, the on-device TFLite model performs instantaneous inference with zero internet dependency.",
      problem: "BSF farmers struggle to distinguish young larva, mature larva, prepupa, and pupa stages with the naked eye, leading to risks of suboptimal harvest timing and yield loss.",
      solution: "Integrated a fine-tuned YOLOv11s model converted to TensorFlow Lite into a Flutter Android mobile application. Equipped with camera/gallery image processing, model readiness indicator, and automated harvest window guidance.",
      features: [
        "Direct image capture via mobile Camera or phone Gallery",
        "Rapid & offline on-device inference using TensorFlow Lite",
        "Classification of 4 BSF growth stages (Young Larva, Mature Larva, Prepupa, Pupa)",
        "Model readiness status indicator with an intuitive, farmer-friendly UI"
      ],
      results: "Achieved 0.9723 precision, 0.8315 recall, and 0.8720 mAP50 across 4 classification stages on a 21,974-image dataset.",
      architecturePoints: [
        "Developed an end-to-end computer vision system, later deployed on-device via a Flutter mobile front-end, demonstrating cross-platform application delivery beyond the web.",
        "Achieved 0.9723 precision, 0.8315 recall, and 0.8720 mAP50 across 4 classification stages on a 21,974-image dataset.",
        "Curated and annotated 21,974 images with robust computer vision augmentation pipelines.",
        "Zero-dependency local model execution enabling on-site field operation in remote agricultural environments."
      ],
      metrics: [
        { label: "Dataset Size", value: "21,974 Images" },
        { label: "Precision", value: "0.9723 (97.23%)" },
        { label: "Recall", value: "0.8315 (83.15%)" },
        { label: "mAP50", value: "0.8720 (87.20%)" }
      ],
      github: "https://github.com/IkhwanMaulana07",
      demo: "#"
    }
  ],

  fullstackArchitecture: {
    title: "Full-Stack End-to-End Engineering Lifecycle",
    description: "How I architect robust, scalable, and AI-integrated digital products from database schema design through to production deployment.",
    layers: [
      {
        id: "frontend",
        title: "1. Client & Presentation Layer",
        tech: "React.js, Vite, Vue.js, Tailwind CSS",
        icon: "Layout",
        details: [
          "Component-driven architecture with modular, reusable UI components",
          "Responsive, mobile-first design with modern dark glassmorphism styling",
          "Client-side state management, async Fetch API handlers, and real-time UI updates",
          "Performance-optimized asset loading and micro-interactions"
        ]
      },
      {
        id: "api",
        title: "2. API & Business Logic Layer",
        tech: "Node.js, Express.js, PHP Native MVC",
        icon: "Server",
        details: [
          "RESTful endpoint architecture following HTTP semantics & JSON standards",
          "Secure authentication pipelines: JWT tokens, session cookies, and email OTP flows",
          "Role-Based Access Control (RBAC) protecting endpoints and user resources",
          "Real-time bidirectional communication via WebSocket / Socket.IO"
        ]
      },
      {
        id: "database",
        title: "3. Persistence & Relational Data Layer",
        tech: "MySQL, PostgreSQL, MongoDB",
        icon: "Database",
        details: [
          "Normalized relational database schemas (up to 3NF) eliminating redundancy",
          "Transaction safety, foreign key constraints, and indexing for query performance",
          "Server-side validation and upsert logic preventing data race conditions",
          "Automated TSV/Excel export generation for enterprise reporting"
        ]
      },
      {
        id: "ai",
        title: "4. AI & Machine Learning Integration",
        tech: "Google Gemini API, Python Inference, TFLite",
        icon: "Cpu",
        details: [
          "Integration of Google Gemini LLMs for contextual assistance and automated writing",
          "Python-based ML inference pipelines (TensorFlow, scikit-learn, TF-IDF)",
          "Edge model optimization (TFLite) for zero-latency, offline on-device deployment",
          "Asynchronous webhook and API integration bridging AI models with web frontends"
        ]
      },
      {
        id: "devops",
        title: "5. Build, DevOps & Deployment",
        tech: "Vite, Git/GitHub, Docker, Vercel, Netlify",
        icon: "Cloud",
        details: [
          "Automated continuous deployment (CI/CD) pipelines to Vercel and Netlify",
          "Production asset optimization, bundle tree-shaking, and environment management",
          "Git branch protection workflows, semantic versioning, and code reviews",
          "Cross-environment debugging across Windows, Linux, and cloud runtimes"
        ]
      }
    ]
  },

  education: [
    {
      degree: "Bachelor of Computer Science (S.Kom) in Informatics Engineering",
      institution: "Universitas Gunadarma — Bekasi, Indonesia",
      faculty: "Faculty of Industrial Technology, Dept. of Informatics",
      period: "2022 — 2026",
      gpa: "3.78 / 4.00 (NPM: 50422698)",
      coursework: [
        "Software Engineering",
        "Web Programming",
        "Database Systems",
        "Artificial Intelligence",
        "Machine Learning",
        "Computer Vision",
        "Data Science"
      ],
      description: "Graduated with High Honors (GPA 3.78/4.00). Specialized in full-stack web software architecture, database management systems, and practical AI applications. Completed bachelor's thesis developing a computer vision system with 97.23% precision and 0.8720 mAP50."
    },
    {
      degree: "Computer and Network Engineering (TKJ)",
      institution: "SMK Islam Al-Amin",
      period: "2019 — 2022",
      focus: "Computer Networking, Hardware Maintenance, Server & Network Administration",
      description: "Gained comprehensive foundational grounding in Linux/Windows server administration, local area networks (LAN), TCP/IP protocols, and hardware troubleshooting."
    }
  ],

  certifications: [
    {
      title: "Programmer",
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
      desc: "Intensive backend training covering Golang concurrency (goroutines, channels), REST API architecture, struct serialization, and database interfacing."
    },
    {
      title: "Oracle for Intermediate",
      issuer: "Universitas Gunadarma",
      year: "2025",
      type: "2-Month Intensive Program",
      desc: "Advanced relational database management, complex SQL querying, indexing techniques, stored procedures, and enterprise transaction handling."
    },
    {
      title: "Programmer Course",
      issuer: "Universitas Gunadarma",
      year: "2025",
      type: "1-Week Technical Bootcamp",
      desc: "Hands-on bootcamp focusing on full-stack application development, clean coding practices, and system integration."
    },
    {
      title: "Application Development Design",
      issuer: "Universitas Gunadarma",
      year: "2024",
      type: "Technical Certification",
      desc: "System design principles, UML diagramming, database entity-relationship modeling (ERD), and modular application design."
    },
    {
      title: "Wireless LAN Installation",
      issuer: "Universitas Gunadarma",
      year: "2024",
      type: "Technical Certification",
      desc: "Networking protocols, wireless infrastructure configuration, security parameters, and network troubleshooting."
    }
  ],

  conferences: [
    {
      title: "Tech Talk: \"Designing Future with Back End in Tech Industry\"",
      organizer: "Google Developer Student Clubs (GDSC), Universitas Gunadarma",
      year: "2024",
      desc: "Explored scalable backend architectures, microservices vs modular monoliths, and API performance optimization in modern tech enterprises."
    },
    {
      title: "National Symposium: \"Synergy of University and Industry Collaboration: Software and Hardware for Artificial Intelligence\"",
      organizer: "Universitas Gunadarma",
      year: "2025",
      desc: "Deep dive into hardware acceleration for artificial intelligence, GPU/CUDA computing, and productionizing AI models."
    }
  ],

  organization: {
    role: "Head of Entrepreneurship & Skills Division",
    org: "Student Council (OSIS), SMK Islam Al-Amin",
    desc: "Led student entrepreneurship initiatives, organized hands-on technical workshops, and coordinated cross-functional student project teams."
  },

  additionalInfo: {
    languages: [
      { name: "Indonesian", proficiency: "Native" },
      { name: "English", proficiency: "Intermediate / Professional Working Proficiency" }
    ],
    interests: [
      "Full Stack Web Development",
      "JavaScript Ecosystem",
      "Artificial Intelligence",
      "Generative AI",
      "Cloud & Mobile Deployment"
    ]
  }
};
