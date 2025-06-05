
import { useData } from '@/contexts/DataContext';

export const useProjects = () => {
  const { projects, addProject, updateProject, deleteProject, reorderProjects } = useData();
  
  return {
    projects: projects.sort((a, b) => a.order - b.order),
    addProject,
    updateProject,
    deleteProject,
    reorderProjects
  };
};
