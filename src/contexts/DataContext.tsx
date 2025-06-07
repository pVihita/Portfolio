import React, { createContext, useContext, useState, useEffect } from 'react';

// Types for our data structures
export interface ProjectData {
  id: string;
  title: string;
  description: string;
  tech: string[];
  image: string;
  liveDemo: string;
  github: string;
  status: string;
}

export interface AchievementData {
  id: string;
  title: string;
  organization: string;
  date: string;
  description: string;
  image: string;
  credentialUrl?: string;
  skills: string[];
}

interface DataContextType {
  // Projects
  projects: ProjectData[];
  updateProjects: (projects: ProjectData[]) => void;
  addProject: (project: Omit<ProjectData, 'id'>) => void;
  updateProject: (id: string, project: Partial<ProjectData>) => void;
  deleteProject: (id: string) => void;
  
  // Achievements
  achievements: AchievementData[];
  updateAchievements: (achievements: AchievementData[]) => void;
  addAchievement: (achievement: Omit<AchievementData, 'id'>) => void;
  updateAchievement: (id: string, achievement: Partial<AchievementData>) => void;
  deleteAchievement: (id: string) => void;
  
  // Admin controls
  useAdminData: boolean;
  toggleAdminData: () => void;
  resetToOriginal: () => void;
  exportData: () => string;
  importData: (data: string) => boolean;
}

const DataContext = createContext<DataContextType | undefined>(undefined);

// Original hardcoded data (fallback)
const ORIGINAL_PROJECTS: ProjectData[] = [
  {
    id: '1',
    title: 'Voyago – Travel Booking Web App',
    description: 'Voyago is a modern, multi-page travel booking web app with responsive design, a complete booking flow, dark/light mode toggle, and polished UI built using React, TypeScript, and Tailwind CSS.',
    tech: ['TypeScript', 'React', 'Tailwind CSS', 'Vite'],
    image: '/img/voyago.png',
    liveDemo: 'https://voyago-romil-patel.vercel.app/',
    github: 'https://github.com/Techy2419/voyago.git',
    status: 'Completed'
  },
  {
    id: '2',
    title: 'Publicis Sapient: Homes & Villas by Marriott Bonvoy',
    description: 'Built a functional travel rental website featuring destination search, real-time map pins, user authentication, and dark mode. Delivered a high-fidelity prototype. Certified by Publicis Sapient for real-world product development.',
    tech: ['HTML5', 'CSS3', 'JavaScript', 'BootStrap', 'Firebase', 'UX Research', 'UX Prototyping'],
    image: '/img/publicis_sapient.png',
    liveDemo: 'https://publicis-sapient-project.vercel.app/',
    github: 'https://github.com/Techy2419/Publicis-Sapient-Project.git',
    status: 'Completed'
  },
  {
    id: '3',
    title: 'BookSync - Appointment Scheduler',
    description: 'A calendar booking app that syncs with Google Calendar or Apple Calendar via .ics files, allowing users to schedule meetings with smart platform-aware event handling.',
    tech: ['TypeScript', 'React', 'Tailwind CSS', 'Vite'],
    image: '/img/booksync.png',
    liveDemo: 'https://booksync-romil-patel.vercel.app/',
    github: 'https://github.com/Techy2419/BookSync-appointment-scheduler.git',
    status: 'Completed'
  },
  {
    id: '4',
    title: 'EmailJs Registration Form',
    description: 'Responsive Bootstrap form that sends confirmation emails using EmailJS and features a modern dark UI with a thank-you screen.',
    tech: ['HTML', 'CSS', 'JavaScript', 'EmailJs'],
    image: '/img/email_js.png',
    liveDemo: 'https://emailjs-registration-form.vercel.app/',
    github: 'https://github.com/Techy2419/emailjs-registration-form.git',
    status: 'Completed'
  },
  {
    id: '5',
    title: 'Website with Login & Registration Form',
    description: 'A clean and responsive website featuring a stylish login/signup form with a slide-up effect and blurred background, a 5-link navbar with hover effects, and a hamburger menu for mobile view.',
    tech: ['HTML', 'CSS', 'JavaScript'],
    image: '/img/website_login.png',
    liveDemo: 'https://website-with-login-registration-page.vercel.app/',
    github: 'https://github.com/Techy2419/Website-with-Login-Registration-Page.git',
    status: 'Completed'
  },
  {
    id: '6',
    title: 'FinTrackr',
    description: 'Expense tracking web app with simple budget management, transaction logging, and visual reporting.',
    tech: ['HTML', 'CSS', 'JavaScript', 'Firebase'],
    image: '/img/fintrackr.png',
    liveDemo: 'https://fin-trackr-gilt.vercel.app/',
    github: 'https://github.com/Techy2419/FinTrackr.git',
    status: 'In Progress'
  }
];

const ORIGINAL_ACHIEVEMENTS: AchievementData[] = [
  {
    id: '1',
    title: 'React Developer Certification',
    organization: 'Meta',
    date: '2024',
    description: 'Advanced React development certification covering hooks, context, and performance optimization.',
    image: '/img/react-cert.png',
    credentialUrl: '#',
    skills: ['React', 'JavaScript', 'Component Architecture']
  },
  {
    id: '2',
    title: 'Full Stack Web Development',
    organization: 'freeCodeCamp',
    date: '2023',
    description: 'Comprehensive full-stack development certification covering frontend and backend technologies.',
    image: '/img/fullstack-cert.png',
    credentialUrl: '#',
    skills: ['HTML', 'CSS', 'JavaScript', 'Node.js', 'MongoDB']
  }
];

export const DataProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [projects, setProjects] = useState<ProjectData[]>(ORIGINAL_PROJECTS);
  const [achievements, setAchievements] = useState<AchievementData[]>(ORIGINAL_ACHIEVEMENTS);
  const [useAdminData, setUseAdminData] = useState(false);

  // Load admin data from localStorage on mount
  useEffect(() => {
    const adminDataEnabled = localStorage.getItem('admin_data_enabled') === 'true';
    const storedProjects = localStorage.getItem('admin_projects');
    const storedAchievements = localStorage.getItem('admin_achievements');

    setUseAdminData(adminDataEnabled);

    if (adminDataEnabled) {
      if (storedProjects) {
        try {
          setProjects(JSON.parse(storedProjects));
        } catch (error) {
          console.error('Error parsing stored projects:', error);
        }
      }
      if (storedAchievements) {
        try {
          setAchievements(JSON.parse(storedAchievements));
        } catch (error) {
          console.error('Error parsing stored achievements:', error);
        }
      }
    }
  }, []);

  // Save to localStorage whenever data changes and admin mode is enabled
  useEffect(() => {
    if (useAdminData) {
      localStorage.setItem('admin_projects', JSON.stringify(projects));
      localStorage.setItem('admin_achievements', JSON.stringify(achievements));
    }
  }, [projects, achievements, useAdminData]);

  const updateProjects = (newProjects: ProjectData[]) => {
    setProjects(newProjects);
  };

  const addProject = (project: Omit<ProjectData, 'id'>) => {
    const newProject: ProjectData = {
      ...project,
      id: Date.now().toString(),
    };
    setProjects(prev => [...prev, newProject]);
  };

  const updateProject = (id: string, updates: Partial<ProjectData>) => {
    setProjects(prev => prev.map(project => 
      project.id === id ? { ...project, ...updates } : project
    ));
  };

  const deleteProject = (id: string) => {
    setProjects(prev => prev.filter(project => project.id !== id));
  };

  const updateAchievements = (newAchievements: AchievementData[]) => {
    setAchievements(newAchievements);
  };

  const addAchievement = (achievement: Omit<AchievementData, 'id'>) => {
    const newAchievement: AchievementData = {
      ...achievement,
      id: Date.now().toString(),
    };
    setAchievements(prev => [...prev, newAchievement]);
  };

  const updateAchievement = (id: string, updates: Partial<AchievementData>) => {
    setAchievements(prev => prev.map(achievement => 
      achievement.id === id ? { ...achievement, ...updates } : achievement
    ));
  };

  const deleteAchievement = (id: string) => {
    setAchievements(prev => prev.filter(achievement => achievement.id !== id));
  };

  const toggleAdminData = () => {
    const newValue = !useAdminData;
    setUseAdminData(newValue);
    localStorage.setItem('admin_data_enabled', newValue.toString());
    
    if (newValue) {
      // Switch to admin data, keep current data
      localStorage.setItem('admin_projects', JSON.stringify(projects));
      localStorage.setItem('admin_achievements', JSON.stringify(achievements));
    } else {
      // Switch back to original data
      setProjects(ORIGINAL_PROJECTS);
      setAchievements(ORIGINAL_ACHIEVEMENTS);
    }
  };

  const resetToOriginal = () => {
    setProjects(ORIGINAL_PROJECTS);
    setAchievements(ORIGINAL_ACHIEVEMENTS);
    setUseAdminData(false);
    localStorage.removeItem('admin_data_enabled');
    localStorage.removeItem('admin_projects');
    localStorage.removeItem('admin_achievements');
  };

  const exportData = () => {
    const data = {
      projects,
      achievements,
      exportDate: new Date().toISOString(),
    };
    return JSON.stringify(data, null, 2);
  };

  const importData = (dataString: string): boolean => {
    try {
      const data = JSON.parse(dataString);
      if (data.projects && Array.isArray(data.projects)) {
        setProjects(data.projects);
      }
      if (data.achievements && Array.isArray(data.achievements)) {
        setAchievements(data.achievements);
      }
      return true;
    } catch (error) {
      console.error('Error importing data:', error);
      return false;
    }
  };

  const value: DataContextType = {
    projects: useAdminData ? projects : ORIGINAL_PROJECTS,
    updateProjects,
    addProject,
    updateProject,
    deleteProject,
    achievements: useAdminData ? achievements : ORIGINAL_ACHIEVEMENTS,
    updateAchievements,
    addAchievement,
    updateAchievement,
    deleteAchievement,
    useAdminData,
    toggleAdminData,
    resetToOriginal,
    exportData,
    importData,
  };

  return (
    <DataContext.Provider value={value}>
      {children}
    </DataContext.Provider>
  );
};

export const useData = () => {
  const context = useContext(DataContext);
  if (context === undefined) {
    throw new Error('useData must be used within a DataProvider');
  }
  return context;
};
