
import React from 'react';
import { motion } from 'framer-motion';
import { ArrowLeft, Save } from 'lucide-react';
import { useForm } from 'react-hook-form';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { useData, Achievement } from '@/contexts/DataContext';
import { toast } from '@/components/ui/use-toast';

interface AchievementFormProps {
  achievement?: Achievement | null;
  onClose: () => void;
}

interface AchievementFormData {
  title: string;
  description: string;
  certificateUrl: string;
  badgeUrl: string;
}

const AchievementForm: React.FC<AchievementFormProps> = ({ achievement, onClose }) => {
  const { addAchievement, updateAchievement } = useData();
  const isEditing = !!achievement;

  const form = useForm<AchievementFormData>({
    defaultValues: {
      title: achievement?.title || '',
      description: achievement?.description || '',
      certificateUrl: achievement?.certificateUrl || '',
      badgeUrl: achievement?.badgeUrl || '',
    },
  });

  const onSubmit = (data: AchievementFormData) => {
    const achievementData = {
      title: data.title,
      description: data.description,
      certificateUrl: data.certificateUrl || undefined,
      badgeUrl: data.badgeUrl || undefined,
    };

    if (isEditing && achievement) {
      updateAchievement(achievement.id, achievementData);
      toast({
        title: "Achievement Updated",
        description: `"${data.title}" has been updated successfully.`,
      });
    } else {
      addAchievement(achievementData);
      toast({
        title: "Achievement Added",
        description: `"${data.title}" has been added to your portfolio.`,
      });
    }

    onClose();
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 p-6">
      <div className="container mx-auto max-w-2xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex justify-between items-center mb-8"
        >
          <div>
            <h1 className="text-3xl font-bold text-white mb-2">
              {isEditing ? 'Edit Achievement' : 'Add New Achievement'}
            </h1>
            <p className="text-gray-300">
              {isEditing ? 'Update your achievement details' : 'Add a new achievement to your portfolio'}
            </p>
          </div>
          
          <Button
            onClick={onClose}
            variant="outline"
            className="border-purple-500/30 text-white hover:bg-purple-500/20"
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back
          </Button>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="bg-white/10 backdrop-blur-lg rounded-2xl p-6 border border-purple-500/20"
        >
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              <FormField
                control={form.control}
                name="title"
                rules={{ required: "Title is required" }}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-white">Achievement Title</FormLabel>
                    <FormControl>
                      <Input
                        {...field}
                        placeholder="Enter achievement title"
                        className="bg-white/5 border-purple-500/30 text-white placeholder:text-gray-400"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="description"
                rules={{ required: "Description is required" }}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-white">Description</FormLabel>
                    <FormControl>
                      <Textarea
                        {...field}
                        placeholder="Describe your achievement"
                        rows={4}
                        className="bg-white/5 border-purple-500/30 text-white placeholder:text-gray-400"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="certificateUrl"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-white">Certificate URL (optional)</FormLabel>
                    <FormControl>
                      <Input
                        {...field}
                        placeholder="https://certificate-url.com"
                        className="bg-white/5 border-purple-500/30 text-white placeholder:text-gray-400"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="badgeUrl"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-white">Badge URL (optional)</FormLabel>
                    <FormControl>
                      <Input
                        {...field}
                        placeholder="https://badge-url.com"
                        className="bg-white/5 border-purple-500/30 text-white placeholder:text-gray-400"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <div className="flex gap-4 pt-4">
                <Button
                  type="button"
                  onClick={onClose}
                  variant="outline"
                  className="flex-1 border-gray-500/30 text-gray-400 hover:bg-gray-500/20"
                >
                  Cancel
                </Button>
                <Button
                  type="submit"
                  className="flex-1 bg-gradient-to-r from-green-600 to-green-700 hover:from-green-700 hover:to-green-800"
                >
                  <Save className="h-4 w-4 mr-2" />
                  {isEditing ? 'Update Achievement' : 'Add Achievement'}
                </Button>
              </div>
            </form>
          </Form>
        </motion.div>
      </div>
    </div>
  );
};

export default AchievementForm;
