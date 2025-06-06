
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Plus, Edit2, Trash2, ExternalLink, ArrowLeft, Award } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useData } from '@/contexts/DataContext';
import { toast } from '@/components/ui/use-toast';
import { Achievement } from '@/contexts/DataContext';
import AchievementForm from './AchievementForm';

const AchievementManager = () => {
  const { achievements, deleteAchievement } = useData();
  const [showForm, setShowForm] = useState(false);
  const [editingAchievement, setEditingAchievement] = useState<Achievement | null>(null);

  const handleEdit = (achievement: Achievement) => {
    setEditingAchievement(achievement);
    setShowForm(true);
  };

  const handleDelete = (id: string, title: string) => {
    if (window.confirm(`Are you sure you want to delete "${title}"?`)) {
      deleteAchievement(id);
      toast({
        title: "Achievement Deleted",
        description: `"${title}" has been removed.`,
      });
    }
  };

  const handleFormClose = () => {
    setShowForm(false);
    setEditingAchievement(null);
  };

  if (showForm) {
    return (
      <AchievementForm 
        achievement={editingAchievement} 
        onClose={handleFormClose}
      />
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 p-6">
      <div className="container mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex justify-between items-center mb-8"
        >
          <div>
            <h1 className="text-3xl font-bold text-white mb-2">Manage Achievements</h1>
            <p className="text-gray-300">Add, edit, and organize your certifications and achievements</p>
          </div>
          
          <div className="flex gap-4">
            <Button
              onClick={() => window.history.back()}
              variant="outline"
              className="border-purple-500/30 text-white hover:bg-purple-500/20"
            >
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back
            </Button>
            <Button
              onClick={() => setShowForm(true)}
              className="bg-gradient-to-r from-green-600 to-green-700 hover:from-green-700 hover:to-green-800"
            >
              <Plus className="h-4 w-4 mr-2" />
              Add Achievement
            </Button>
          </div>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {achievements.map((achievement, index) => (
            <motion.div
              key={achievement.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              <Card className="bg-white/10 backdrop-blur-lg border-purple-500/20 hover:border-purple-400/50 transition-all duration-300">
                <CardHeader>
                  <CardTitle className="text-white text-lg flex items-center gap-2">
                    <Award className="h-5 w-5 text-yellow-400" />
                    {achievement.title}
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <p className="text-gray-300 text-sm">{achievement.description}</p>
                  
                  {achievement.certificateUrl && (
                    <Button size="sm" variant="outline" className="w-full">
                      <ExternalLink className="h-3 w-3 mr-1" />
                      View Certificate
                    </Button>
                  )}

                  <div className="flex gap-2 pt-2">
                    <Button
                      onClick={() => handleEdit(achievement)}
                      size="sm"
                      variant="outline"
                      className="flex-1 border-green-500/30 text-green-400 hover:bg-green-500/20"
                    >
                      <Edit2 className="h-3 w-3 mr-1" />
                      Edit
                    </Button>
                    <Button
                      onClick={() => handleDelete(achievement.id, achievement.title)}
                      size="sm"
                      variant="outline"
                      className="flex-1 border-red-500/30 text-red-400 hover:bg-red-500/20"
                    >
                      <Trash2 className="h-3 w-3 mr-1" />
                      Delete
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>

        {achievements.length === 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-12"
          >
            <p className="text-gray-400 text-lg mb-4">No achievements yet</p>
            <Button
              onClick={() => setShowForm(true)}
              className="bg-gradient-to-r from-green-600 to-green-700"
            >
              <Plus className="h-4 w-4 mr-2" />
              Add Your First Achievement
            </Button>
          </motion.div>
        )}
      </div>
    </div>
  );
};

export default AchievementManager;
