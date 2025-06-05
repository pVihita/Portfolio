
import { useData } from '@/contexts/DataContext';

export const useAchievements = () => {
  const { achievements, addAchievement, updateAchievement, deleteAchievement, reorderAchievements } = useData();
  
  return {
    achievements: achievements.sort((a, b) => a.order - b.order),
    addAchievement,
    updateAchievement,
    deleteAchievement,
    reorderAchievements
  };
};
