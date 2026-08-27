import type { ResumeData } from "../types";

export const resumeData: ResumeData = {
  nav: [
    { label: "About", href: "#about" },
    { label: "Skills", href: "#skills" },
    { label: "Projects", href: "#projects" },
    { label: "Experience", href: "#experience" },
    { label: "Certifications", href: "#certifications" },
    { label: "Contact", href: "#contact" },
  ],

  hero: {
    tagline: "Software Development Engineer",
    name: "Divyansh Patel",
    subtitle:
      "Computer Science undergraduate with strong experience in full-stack and blockchain development. Skilled in building scalable web applications, decentralized systems, and secure APIs.",
    socials: [
      { platform: "GitHub", url: "https://github.com/Divyansh089" },
      { platform: "LinkedIn", url: "https://linkedin.com/in/divyansh-patel" },
    ],
  },

  about: {
    paragraphs: [
      "I'm a Computer Science undergraduate specializing in Blockchain Technology at GLA University, Mathura. My passion lies in building decentralized applications and full-stack web solutions that solve real-world problems.",
      "With hands-on experience in Ethereum smart contracts, IPFS, and modern web frameworks like React and Next.js, I bring a unique blend of blockchain expertise and traditional software engineering skills.",
      "I've demonstrated impact through performance optimization, system reliability improvements, and competitive programming achievements on platforms like LeetCode and Codeforces.",
    ],
    stats: [
      { value: 1456, label: "LeetCode Rating" },
      { value: 1612, label: "Codeforces Rating" },
      { value: 7.74, suffix: " CGPA", label: "Academic Score" },
      { value: 250, suffix: "+", label: "Problems Solved" },
    ],
  },

  skills: [
    {
      name: "Blockchain",
      description: "Decentralized applications, smart contracts, and on-chain solutions",
      tags: [
        "Solidity",
        "Ethereum",
        "Hardhat",
        "Foundry",
        "Web3.js",
        "Ethers.js",
        "OpenZeppelin",
        "IPFS",
        "MetaMask",
        "Smart Contracts",
        "DeFi",
        "NFTs",
      ],
    },
    {
      name: "Frontend",
      description: "Modern, responsive, and performant user interfaces",
      tags: [
        "React",
        "Next.js",
        "TypeScript",
        "JavaScript",
        "Tailwind CSS",
        "Redux",
        "Redux Toolkit",
        "HTML5",
        "CSS3",
        "Framer Motion",
        "REST APIs",
        "Responsive Design",
      ],
    },
    {
      name: "Backend",
      description: "Scalable server-side architecture, APIs, and databases",
      tags: [
        "Node.js",
        "Express.js",
        "MongoDB",
        "MySQL",
        "PostgreSQL",
        "REST APIs",
        "JWT",
        "Redis",
        "Mongoose",
        "Prisma",
        "WebSockets",
        "API Design",
      ],
    },
    {
      name: "Languages",
      description: "Proficient across multiple programming paradigms",
      tags: [
        "Java",
        "Python",
        "JavaScript",
        "TypeScript",
        "Solidity",
        "SQL",
        "DSA",
        "OOPs",
        "Rust",
      ],
    },
    {
      name: "DevOps & Cloud",
      description: "Version control, containerization, CI/CD, and deployment",
      tags: [
        "Git",
        "GitHub",
        "Docker",
        "GitHub Actions",
        "CI/CD",
        "Nginx",
        "AWS",
        "Postman",
        "Cloud Deployment",
      ],
    },
    {
      name: "Hyperledger Fabric",
      description: "Enterprise blockchain development with permissioned networks",
      tags: [
        "Chaincode",
        "Fabric CA",
        "Fabric Gateway",
        "PKI",
        "Raft",
        "MSP",
        "Channels",
        "Peers",
        "Orderers",
        "Fabric SDK",
      ],
    },

    {
      name: "Web3 & DeFi",
      description: "Decentralized finance, wallets, protocols, and Web3 integrations",
      tags: [
        "DeFi",
        "DEX",
        "AMM",
        "ERC-20",
        "ERC-721",
        "ERC-1155",
        "WalletConnect",
        "MetaMask",
        "Ethers.js",
        "Web3.js",
        "Oracles",
        "Tokenomics",
      ],
    },

    {
      name: "Blockchain Security",
      description: "Smart contract security, auditing, and protocol-level analysis",
      tags: [
        "Smart Contract Auditing",
        "Solidity Security",
        "Reentrancy",
        "Access Control",
        "Integer Overflow",
        "Oracle Manipulation",
        "Flash Loan Attacks",
        "Foundry",
        "OpenZeppelin",
      ],
    },

    {
      name: "Infrastructure",
      description: "Cloud infrastructure, deployment, networking, and scalable services",
      tags: [
        "Nginx",
        "Linux",
        "Vercel",
        "Render",
        "Redis",
        "Load Balancing",
      ],
    },
  ],

  projects: [
    {
      number: "01",
      name: "Voltra",
      description:
        "Enterprise-grade D2C Consumer Electronics e-commerce platform with RBAC security across 4 roles (Admin, Product Manager, Customer Support, Customer). Features Redis-cached permission middleware, dynamic multi-variant product catalog, automated inventory management, virtual card checkout, and automated staff onboarding with Brevo email notifications.",
      techStack: [
        "Next.js",
        "TypeScript",
        "Node.js",
        "Express",
        "Prisma",
        "PostgreSQL",
        "Redis",
        "Bun",
        "Docker",
        "Tailwind CSS"
      ],
      repoUrl: "https://github.com/Divyansh089/voltro",
      liveUrl: "https://voltro.vercel.app",
    },
    {
      number: "02",
      name: "QuickSafe",
      description:
        "Ethereum-based supply chain DApp with real-time tracking, wallet authentication, and tamper-proof shipment records. Gas-optimized smart contracts with 120+ Hardhat tests ensuring secure on-chain execution.",
      techStack: ["Solidity", "Next.js", "Node.js", "Web3.js", "Hardhat"],
      repoUrl: "https://github.com/Divyansh089/supply-chain-management",
      liveUrl: "https://quick-safe-psi.vercel.app",
    },
    {
      number: "03",
      name: "TrustMed",
      description:
        "Decentralized healthcare platform with smart-contract driven patient consent and e-prescription workflows. IPFS storage with on-chain SHA-256 verification for tamper-proof medical records.",
      techStack: ["Solidity", "Next.js", "Node.js", "TypeScript", "IPFS"],
      repoUrl: "https://github.com/Divyansh089/TrustMed",
      liveUrl: "https://trust-med-beta.vercel.app",
    },
    {
      number: "04",
      name: "PrepPro",
      description:
        "Placement preparation platform with test execution, real-time analytics, and interview simulator using WebRTC. Optimized with route-level lazy loading, TanStack Query caching, and Zustand state management.",
      techStack: ["React", "TypeScript", "Chakra UI", "WebRTC", "PWA"],
      repoUrl: "https://github.com/Divyansh089/PrepPro",
      liveUrl: "https://prep-pro-phi.vercel.app",
    },
  ],

  experience: [
    {
      dateRange: "Feb 2025 – Apr 2025",
      role: "Full-Stack Developer Intern",
      company: "Unified Mentor Private Limited",
      location: "Remote",
      bullets: [
        "Developed responsive React interfaces using hooks and context-based state management.",
        "Built production-ready Express APIs with routing, validation, and error handling.",
        "Created a React memory card game showcasing deterministic state flow.",
        "Applied modular architecture and reusable component patterns.",
        "Collaborated through Git/GitHub workflows and technical documentation.",
      ],
    },
  ],

  certifications: [
    {
      name: "Hyperledger Fabric Developer",
      organization: "Kerala Blockchain Academy",
      year: "2025",
      topics: ["Chaincode", "Endorsement Policies", "Fabric CA/PKI", "Raft Ordering", "SDKs", "Docker/K8s"],
    },
    {
      name: "Full-Stack Web Development",
      organization: "Udemy",
      year: "2025",
      topics: ["React", "Node.js", "REST APIs", "Testing"],
    },
    {
      name: "Advanced Blockchain",
      organization: "Udemy",
      year: "2024",
      topics: ["Consensus Mechanisms", "Token Standards", "Gas Optimization"],
    },
    {
      name: "Java (Basic)",
      organization: "HackerRank",
      year: "2025",
      topics: ["Assessment Badge"],
    },
    {
      name: "Python (Basic)",
      organization: "HackerRank",
      year: "2024",
      topics: ["Assessment Badge"],
    },
  ],

  contact: {
    email: "pateldivyansh131@gmail.com",
    phone: "+91-7906941751",
    location: "Mathura, Uttar Pradesh, India",
    github: "https://github.com/Divyansh089",
    linkedin: "https://linkedin.com/in/divyansh-patel",
  },
};
