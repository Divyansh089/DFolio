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
      icon: "🔗",
      name: "Blockchain",
      description: "Decentralized apps, smart contracts, and on-chain solutions",
      tags: ["Solidity", "Hardhat", "Web3.js", "IPFS", "Ethereum"],
    },
    {
      icon: "⚛️",
      name: "Frontend",
      description: "Modern, responsive, and performant user interfaces",
      tags: ["React", "Next.js", "TypeScript", "Tailwind CSS", "Redux"],
    },
    {
      icon: "🖥️",
      name: "Backend",
      description: "Scalable server-side architecture and APIs",
      tags: ["Node.js", "Express.js", "MongoDB", "MySQL"],
    },
    {
      icon: "💻",
      name: "Languages",
      description: "Proficient across multiple programming paradigms",
      tags: ["Java", "Python", "JavaScript", "Solidity"],
    },
    {
      icon: "🛠️",
      name: "DevOps & Tools",
      description: "Version control, containerization, and deployment",
      tags: ["Git", "Docker", "Linux", "GitHub"],
    },
    {
      icon: "🧱",
      name: "Hyperledger Fabric",
      description: "Enterprise blockchain with permissioned networks",
      tags: ["Chaincode", "Fabric CA", "PKI", "Raft", "Kubernetes"],
    },
  ],

  projects: [
    {
      number: "01",
      name: "QuickSafe",
      description:
        "Ethereum-based supply chain DApp with real-time tracking, wallet authentication, and tamper-proof shipment records. Gas-optimized smart contracts with 120+ Hardhat tests ensuring secure on-chain execution.",
      techStack: ["Solidity", "Next.js", "Node.js", "Web3.js", "Hardhat"],
      repoUrl: "https://github.com/Divyansh089/supply-chain-management",
      liveUrl: "https://quick-safe-psi.vercel.app",
    },
    {
      number: "02",
      name: "TrustMed",
      description:
        "Decentralized healthcare platform with smart-contract driven patient consent and e-prescription workflows. IPFS storage with on-chain SHA-256 verification for tamper-proof medical records.",
      techStack: ["Solidity", "Next.js", "Node.js", "TypeScript", "IPFS"],
      repoUrl: "https://github.com/Divyansh089/TrustMed",
      liveUrl: "https://trust-med-beta.vercel.app",
    },
    {
      number: "03",
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
    location: "Bareilly, Uttar Pradesh, India",
    github: "https://github.com/Divyansh089",
    linkedin: "https://linkedin.com/in/divyansh-patel",
  },
};
