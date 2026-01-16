import { Experience, Photo, Project } from "./types";

export const HERO_CONTENT = {
  name: "Parth Mistry",
  headline: "Data & Analytics Associate @ Scotiabank",
  subheadline: "Specializing in NLP, BI Reporting, and Cloud Orchestration to drive organizational efficiency.",
  location: "Toronto, ON",
};

export const ABOUT_CONTENT = {
  bio: "I am a Data & Analytics Associate at Scotiabank with a Master of Science in Computer Science. My expertise lies in bridging the gap between raw data and actionable insights using Python, SQL, and Machine Learning. I have a strong background in MLOps, pipeline optimization, and risk analytics.",
  hobbies: ["Data Visualization", "Open Source Contribution", "Tech Automation"], // Hobbies kept generic as they are not listed in the resume
};

export const CONTACT_CONTENT = {
  email: "imparthmistry@gmail.com",
  linkedin: "https://www.linkedin.com/in/m-prth/",
  github: "https://github.com/m-prth",

};

export const EXPERIENCES: Experience[] = [
  {
    id: 1,
    role: "Data Scientist",
    company: "Scotiabank",
    period: "Current",
    description: [
      "Performing NLP analysis on Operational Risk Events to identify pattern anomalies.",
      "Improving operational efficiency through automated data pipelines.",
      "Bridging the gap between finance stakeholders and raw technical data."
    ],
    skills: ["NLP", "Python", "Risk Analytics"]
  },
  {
    id: 2,
    role: "BI Analyst",
    company: "Scotiabank",
    period: "2024 - 2025",
    description: [
      "Developed comprehensive International Banking dashboards using Power BI.",
      "Validated KPIs against source systems to ensure data accuracy.",
      "Modeled complex data relationships for executive reporting."
    ],
    skills: ["Power BI", "DAX", "Data Modeling"]
  },
  {
    id: 3,
    role: "Analytics Engineer",
    company: "Scotiabank",
    period: "2024 - 2024",
    description: [
      "Migrated legacy pipelines from EDL to on-premises.",
      "Orchestrated workflows using Airflow, Docker, and Rancher.",
      "Assisted in the data restructuring for Auto Loan systems."
    ],
    skills: ["GCP", "Airflow", "Docker", "Kubernetes"]
  },
  {
    id: 4,
    role: "GRADUATE ASSISTANT",
    company: "University of Windsor",
    period: "2022 - 2024",
    description: [
      "Led UNIX/systems labs (40 students/term).",
      "Created grading rubrics and reference solutions for assignments.",
      "Provided one-on-one tutoring for struggling students."
    ],
    skills: ["Linux", "Bash Scripting", "Teaching"]
  }
];

export const SKILLS = {
  engineering: ["Python", "SQL", "Hadoop", "Spark", "Airflow"],
  bi: ["Power BI", "DAX", "KPI Design", "Data Modeling", "Excel", "Project Management"],
  ai: ["Pandas", "NumPy", "Scikit-learn", "Hugging Face", "TensorFlow", "OpenCV", "NLTK"],
  devops: ["Docker", "Kubernetes", "Git", "CI/CD", "GCP"]
};

export const PROJECTS: Project[] = [
    {
    id: 1,
    title: "Adaptive Loan Pricing Engine",
    description: "A Financial Model that optimizes loan interest rates to maximize profit.",
    tags: ["Python", "XGBoost", "Statsmodels", "Streamlit", "Docker"],
    image: "/assets/loan-buy-house-pressure-buy-house_2560x1707.jpg", // Placeholder
    link: "https://github.com/m-prth/adaptive-pricing-engine"
  },
  {
    id: 2,
    title: "Data Science Salary Estimator",
    description: "Developed a system to estimate Data Scientist salaries.",
    tags: ["Python", "Scikit-learn", "Pandas", "Flask"],
    image: "/assets/payday-concept-calendar-with-marker-and-circled-day-of-salary-874346900-3b95ff61632a40d1954a09e7d6374177.jpg", // Placeholder
    link: "https://github.com/m-prth/Salary-Estimator"
  },
  {
    id: 3,
    title: "Text Summarization using LLM",
    description: "Developed a text summarization pipeline using the  Hugging Face transformers.",
    tags: ["Hugging Face", "FastAPI", "Docker", "MLOps"],
    image: "/assets/a-flat-colorful-illustration-depicting-aylxxlivpqb6rmxk0kkfefanq9tiartquyqqc3rxzybwq-1747814001340-compressed.png", // Placeholder
    link: "https://github.com/m-prth/poneglyph-processor"
  },
  {
    id: 4,
    title: "Traffic Sign Classifier",
    description: "Built a CNN to classify images from the German Traffic Signs dataset.",
    tags: ["TensorFlow", "Keras", "Python", "OpenCV"],
    image: "/assets/traffic_signs.jpg", // Placeholder
    link: "https://github.com/m-prth/traffic-sign-classifier"
  }
];

export const PHOTOS: Photo[] = [
  { id: 1, url: "/assets/IMG_0999.jpg", thumbnailUrl: "/assets/IMG_0999-thumb.jpg", title: "Toronto, ON", aspectRatio: "3/4" },
  { id: 2, url: "/assets/IMG_2339.JPG", thumbnailUrl: "/assets/IMG_2339-thumb.jpg", title: "Ottawa, ON", aspectRatio: "3/4" },
  { id: 3, url: "/assets/IMG_0116.jpg", thumbnailUrl: "/assets/IMG_0116-thumb.jpg", title: "Whimbrell Point, ON", aspectRatio: "4/3" },
  { id: 4, url: "/assets/IMG_2911.jpg", thumbnailUrl: "/assets/IMG_2911-thumb.jpg", title: "Detroit, MI", aspectRatio: "3/4" },
  { id: 5, url: "/assets/IMG_4089.jpg", thumbnailUrl: "/assets/IMG_4089-thumb.jpg", title: "Niagara Falls, ON", aspectRatio: "3/4" },
  { id: 6, url: "/assets/IMG_4703.jpg", thumbnailUrl: "/assets/IMG_4703-thumb.jpg", title: "Ottawa, ON", aspectRatio: "3/4" },
];