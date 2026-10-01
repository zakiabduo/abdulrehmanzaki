export const profile = {
  name: "Abdul Rehman Zaki",
  roles: ["AI/ML Trainee", "MERN Full-Stack Developer", "UX/UI Designer"],
  bio: "AI/ML Trainee and Software Engineer with experience in MERN full-stack development and UX/UI design. Passionate about building user-focused digital solutions and exploring AI/ML technologies.",
  email: "abdulrehmanzaki007@gmail.com", // TODO: replace
  location: "Pakistan",
  linkedin: "https://www.linkedin.com/in/abdulrehmanzaki/",
  github: "", // TODO: add GitHub URL
  cv: "/cv.pdf", // TODO: put your CV at public/cv.pdf
  siteUrl: "https://your-domain.com", // TODO: replace
};

export const stats = [
  { label: "Years studying software engineering", value: 4 },
  { label: "Projects built", value: 6 }, // TODO: update
  { label: "Core disciplines", value: 3 },
];

export const skillGroups = [
  { title: "AI & Data", items: ["AI & Machine Learning", "Python", "Data Analysis & Visualization"] },
  { title: "Web development", items: ["MERN Stack Development", "React.js & JavaScript", "MongoDB & Express.js"] },
  { title: "Design & workflow", items: ["UI/UX Design", "Figma", "Git & GitHub", "Problem Solving & Leadership"] },
];

export type Project = { title: string; description: string; tags: string[]; category: "AI/ML" | "Web" | "Design"; image?: string; live?: string; github?: string };
// TODO: replace with your real projects
export const projects: Project[] = [
  {image:"/projects/Ai-mern-appointment-system.png", title: "MERN AI-powered doctor appointment system", description: "Production-ready full-stack healthcare platform featuring real-time consultations, payment gateway, and AI triage.", tags: ["React", "Node.js", "MongoDB","Express.js","Cloudinary"], category: "Web", live: "https://fyp-frontend-mu-flame.vercel.app/" },
  {image:"/projects/Screenshot 2026-10-01 143301.png", title: "Naive Bayes Classification End-to-End ML Pipeline", description: "Built an end-to-end machine learning pipeline using Naive Bayes Classification, covering data cleaning, missing-value imputation, categorical encoding, feature engineering, model training, evaluation, and model comparison using real-world-style data", tags: ["Python", "scikit-learn","Pandas","Numpy","Matplotlib","Seaborn","Naive Bayes","TF-IDF","Data Preprocessinng","Featured Engineering","Model Evaluation","Model Comparison"], category: "AI/ML" },
  {image:"/projects/car_app_design.png", title: "Rental Car App", description: "A complete car rental mobile app design with ptototyping.", tags: ["Figma", "Prototyping"], category: "Design"},
];

export const timeline = [
  { title: "AI/ML Trainee", place: "NETSOL Technologies Pakistan", period: "2026 – Present" },
  { title: "BS Software Engineering", place: "University of Okara, Pakistan", period: "2022 – 2026" },
];
