
import React from 'react';
import { motion } from 'framer-motion';
import { ArrowLeft, Save } from 'lucide-react';
import { useForm } from 'react-hook-form';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { useData, Project } from '@/contexts/DataContext';
import { toast } from '@/components/ui/use-toast';

interface ProjectFormProps {
  project?: Project | null;
  onClose: () => void;
}

interface ProjectFormData {
  title: string;
  description: string;
  tags: string;
  liveUrl: string;
  githubUrl: string;
  status: 'completed' | 'in-progress' | 'planned';
}

const ProjectForm: React.FC<ProjectFormProps> = ({ project, onClose }) => {
  const { addProject, updateProject } = useData();
  const isEditing = !!project;

  const form = useForm<ProjectFormData>({
    defaultValues: {
      title: project?.title || '',
      description: project?.description || '',
      tags: project?.tags.join(', ') || '',
      liveUrl: project?.liveUrl || '',
      githubUrl: project?.githubUrl || '',
      status: project?.status || 'planned',
    },
  });

  const onSubmit = (data: ProjectFormData) => {
    const projectData = {
      title: data.title,
      description: data.description,
      tags: data.tags.split(',').map(tag => tag.trim()).filter(tag => tag),
      liveUrl: data.liveUrl || undefined,
      githubUrl: data.githubUrl || undefined,
      status: data.status,
    };

    if (isEditing && project) {
      updateProject(project.id, projectData);
      toast({
        title: "Project Updated",
        description: `"${data.title}" has been updated successfully.`,
      });
    } else {
      addProject(projectData);
      toast({
        title: "Project Added",
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
              {isEditing ? 'Edit Project' : 'Add New Project'}
            </h1>
            <p className="text-gray-300">
              {isEditing ? 'Update your project details' : 'Add a new project to your portfolio'}
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
                    <FormLabel className="text-white">Project Title</FormLabel>
                    <FormControl>
                      <Input
                        {...field}
                        placeholder="Enter project title"
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
                        placeholder="Describe your project"
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
                name="tags"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-white">Technologies (comma-separated)</FormLabel>
                    <FormControl>
                      <Input
                        {...field}
                        placeholder="React, Node.js, MongoDB, etc."
                        className="bg-white/5 border-purple-500/30 text-white placeholder:text-gray-400"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="status"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-white">Status</FormLabel>
                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                      <FormControl>
                        <SelectTrigger className="bg-white/5 border-purple-500/30 text-white">
                          <SelectValue placeholder="Select project status" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="planned">Planned</SelectItem>
                        <SelectItem value="in-progress">In Progress</SelectItem>
                        <SelectItem value="completed">Completed</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="liveUrl"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-white">Live URL (optional)</FormLabel>
                    <FormControl>
                      <Input
                        {...field}
                        placeholder="https://your-project.com"
                        className="bg-white/5 border-purple-500/30 text-white placeholder:text-gray-400"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="githubUrl"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-white">GitHub URL (optional)</FormLabel>
                    <FormControl>
                      <Input
                        {...field}
                        placeholder="https://github.com/username/repo"
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
                  className="flex-1 bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800"
                >
                  <Save className="h-4 w-4 mr-2" />
                  {isEditing ? 'Update Project' : 'Add Project'}
                </Button>
              </div>
            </form>
          </Form>
        </motion.div>
      </div>
    </div>
  );
};

export default ProjectForm;
