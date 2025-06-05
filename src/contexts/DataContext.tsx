
import React, { createContext, useContext, useState, useEffect } from 'react';

export interface Project {
  id: string;
  title: string;
  description: string;
  tags: string[];
  liveUrl?: string;
  githubUrl?: string;
  imageUrl?: string;
  status: 'completed' | 'in-progress' | 'planned';
  order: number;
  createdAt: string;
}

export interface Achievement {
  id: string;
  title: string;
  description: string;
  certificateUrl?: string;
  badgeUrl?: string;
  order: number;
  createdAt: string;
}

interface DataContextType {
  projects: Project[];
  achievements: Achievement[];
  addProject: (project: Omit<Project, 'id' | 'createdAt' | 'order'>) => void;
  updateProject: (id: string, project: Partial<Project>) => void;
  deleteProject: (id: string) => void;
  reorderProjects: (projects: Project[]) => void;
  addAchievement: (achievement: Omit<Achievement, 'id' | 'createdAt' | 'order'>) => void;
  updateAchievement: (id: string, achievement: Partial<Achievement>) => void;
  deleteAchievement: (id: string) => void;
  reorderAchievements: (achievements: Achievement[]) => void;
  exportData: () => string;
  importData: (data: string) => boolean;
}

const DataContext = createContext<DataContextType | undefined>(undefined);

// Default data (fallback to current hardcoded data)
const defaultProjects: Project[] = [
  {
    id: '1',
    title: 'E-Commerce Platform',
    description: 'A full-stack e-commerce solution built with React, Node.js, and MongoDB. Features include user authentication, payment integration, and admin dashboard.',
    tags: ['React', 'Node.js', 'MongoDB', 'Stripe'],
    liveUrl: 'https://example.com',
    githubUrl: 'https://github.com',
    status: 'completed',
    order: 1,
    createdAt: new Date().toISOString()
  },
  {
    id: '2',
    title: 'Task Management App',
    description: 'A collaborative task management application with real-time updates, built using React and Firebase.',
    tags: ['React', 'Firebase', 'Material-UI'],
    liveUrl: 'https://example.com',
    githubUrl: 'https://github.com',
    status: 'completed',
    order: 2,
    createdAt: new Date().toISOString()
  },
  {
    id: '3',
    title: 'Weather Dashboard',
    description: 'A responsive weather dashboard that displays current weather and forecasts using OpenWeatherMap API.',
    tags: ['JavaScript', 'API', 'CSS3', 'HTML5'],
    liveUrl: 'https://example.com',
    githubUrl: 'https://github.com',
    status: 'completed',
    order: 3,
    createdAt: new Date().toISOString()
  }
];

const defaultAchievements: Achievement[] = [
  {
    id: '1',
    title: 'AWS Certified Solutions Architect',
    description: 'Professional certification demonstrating expertise in designing distributed systems on AWS.',
    certificateUrl: 'https://example.com/cert1',
    order: 1,
    createdAt: new Date().toISOString()
  },
  {
    id: '2',
    title: 'React Developer Certification',
    description: 'Advanced certification in React development and best practices.',
    certificateUrl: 'https://example.com/cert2',
    order: 2,
    createdAt: new Date().toISOString()
  },
  {
    id: '3',
    title: 'Google Cloud Professional',
    description: 'Certification in Google Cloud Platform services and architecture.',
    certificateUrl: 'https://example.com/cert3',
    order: 3,
    createdAt: new Date().toISOString()
  }
];

export const DataProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [projects, setProjects] = useState<Project[]>([]);
  const [achievements, setAchievements] = useState<Achievement[]>([]);

  // Load data from localStorage on mount
  useEffect(() => {
    const savedProjects = localStorage.getItem('portfolio_projects');
    const savedAchievements = localStorage.getItem('portfolio_achievements');

    if (savedProjects) {
      try {
        setProjects(JSON.parse(savedProjects));
      } catch {
        setProjects(defaultProjects);
      }
    } else {
      setProjects(defaultProjects);
    }

    if (savedAchievements) {
      try {
        setAchievements(JSON.parse(savedAchievements));
      } catch {
        setAchievements(defaultAchievements);
      }
    } else {
      setAchievements(defaultAchievements);
    }
  }, []);

  // Save to localStorage whenever data changes
  useEffect(() => {
    localStorage.setItem('portfolio_projects', JSON.stringify(projects));
  }, [projects]);

  useEffect(() => {
    localStorage.setItem('portfolio_achievements', JSON.stringify(achievements));
  }, [achievements]);

  const addProject = (projectData: Omit<Project, 'id' | 'createdAt' | 'order'>) => {
    const newProject: Project = {
      ...projectData,
      id: Date.now().toString(),
      createdAt: new Date().toISOString(),
      order: projects.length + 1
    };
    setProjects(prev => [...prev, newProject]);
  };

  const updateProject = (id: string, updates: Partial<Project>) => {
    setProjects(prev => prev.map(project => 
      project.id === id ? { ...project, ...updates } : project
    ));
  };

  const deleteProject = (id: string) => {
    setProjects(prev => prev.filter(project => project.id !== id));
  };

  const reorderProjects = (newProjects: Project[]) => {
    setProjects(newProjects);
  };

  const addAchievement = (achievementData: Omit<Achievement, 'id' | 'createdAt' | 'order'>) => {
    const newAchievement: Achievement = {
      ...achievementData,
      id: Date.now().toString(),
      createdAt: new Date().toISOString(),
      order: achievements.length + 1
    };
    setAchievements(prev => [...prev, newAchievement]);
  };

  const updateAchievement = (id: string, updates: Partial<Achievement>) => {
    setAchievements(prev => prev.map(achievement => 
      achievement.id === id ? { ...achievement, ...updates } : achievement
    ));
  };

  const deleteAchievement = (id: string) => {
    setAchievements(prev => prev.filter(achievement => achievement.id !== id));
  };

  const reorderAchievements = (newAchievements: Achievement[]) => {
    setAchievements(newAchievements);
  };

  const exportData = () => {
    const data = { projects, achievements };
    return JSON.stringify(data, null, 2);
  };

  const importData = (dataString: string) => {
    try {
      const data = JSON.parse(dataString);
      if (data.projects && Array.isArray(data.projects)) {
        setProjects(data.projects);
      }
      if (data.achievements && Array.isArray(data.achievements)) {
        setAchievements(data.achievements);
      }
      return true;
    } catch {
      return false;
    }
  };

  return (
    <DataContext.Provider value={{
      projects,
      achievements,
      addProject,
      updateProject,
      deleteProject,
      reorderProjects,
      addAchievement,
      updateAchievement,
      deleteAchievement,
      reorderAchievements,
      exportData,
      importData
    }}>
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
