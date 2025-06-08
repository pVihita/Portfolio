
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Plus, Edit, Trash2, Save, X, ExternalLink, Github } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useData, ProjectData } from '@/contexts/DataContext';
import { toast } from '@/components/ui/use-toast';

const ProjectManager = () => {
  const { projects, addProject, updateProject, deleteProject } = useData();
  const [editingProject, setEditingProject] = useState<string | null>(null);
  const [showAddForm, setShowAddForm] = useState(false);
  const [formData, setFormData] = useState<Partial<ProjectData>>({
    title: '',
    description: '',
    tech: [],
    image: '',
    liveDemo: '',
    github: '',
    status: 'In Progress'
  });

  const handleEdit = (project: ProjectData) => {
    setEditingProject(project.id);
    setFormData(project);
  };

  const handleSave = () => {
    if (!formData.title || !formData.description) {
      toast({
        title: "Error",
        description: "Title and description are required",
        variant: "destructive",
      });
      return;
    }

    if (editingProject) {
      updateProject(editingProject, formData);
      toast({
        title: "Success",
        description: "Project updated successfully",
      });
    } else {
      addProject(formData as Omit<ProjectData, 'id'>);
      toast({
        title: "Success",
        description: "Project added successfully",
      });
    }

    setEditingProject(null);
    setShowAddForm(false);
    setFormData({
      title: '',
      description: '',
      tech: [],
      image: '',
      liveDemo: '',
      github: '',
      status: 'In Progress'
    });
  };

  const handleCancel = () => {
    setEditingProject(null);
    setShowAddForm(false);
    setFormData({
      title: '',
      description: '',
      tech: [],
      image: '',
      liveDemo: '',
      github: '',
      status: 'In Progress'
    });
  };

  const handleDelete = (id: string) => {
    if (confirm('Are you sure you want to delete this project?')) {
      deleteProject(id);
      toast({
        title: "Success",
        description: "Project deleted successfully",
      });
    }
  };

  const handleTechChange = (techString: string) => {
    const techArray = techString.split(',').map(tech => tech.trim()).filter(tech => tech);
    setFormData(prev => ({ ...prev, tech: techArray }));
  };

  const ProjectForm = ({ isEditing = false }) => (
    <Card className="mb-6">
      <CardHeader>
        <CardTitle>{isEditing ? 'Edit Project' : 'Add New Project'}</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <Input
          placeholder="Project Title"
          value={formData.title || ''}
          onChange={(e) => setFormData(prev => ({ ...prev, title: e.target.value }))}
        />
        
        <textarea
          placeholder="Project Description"
          value={formData.description || ''}
          onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value }))}
          className="w-full p-2 border rounded-md min-h-[100px] resize-none"
        />
        
        <Input
          placeholder="Technologies (comma separated)"
          value={formData.tech?.join(', ') || ''}
          onChange={(e) => handleTechChange(e.target.value)}
        />
        
        <Input
          placeholder="Image URL"
          value={formData.image || ''}
          onChange={(e) => setFormData(prev => ({ ...prev, image: e.target.value }))}
        />
        
        <Input
          placeholder="Live Demo URL"
          value={formData.liveDemo || ''}
          onChange={(e) => setFormData(prev => ({ ...prev, liveDemo: e.target.value }))}
        />
        
        <Input
          placeholder="GitHub URL"
          value={formData.github || ''}
          onChange={(e) => setFormData(prev => ({ ...prev, github: e.target.value }))}
        />
        
        <select
          value={formData.status || 'In Progress'}
          onChange={(e) => setFormData(prev => ({ ...prev, status: e.target.value }))}
          className="w-full p-2 border rounded-md"
        >
          <option value="In Progress">In Progress</option>
          <option value="Completed">Completed</option>
          <option value="On Hold">On Hold</option>
        </select>
        
        <div className="flex gap-2">
          <Button onClick={handleSave} className="flex-1">
            <Save className="h-4 w-4 mr-2" />
            Save
          </Button>
          <Button onClick={handleCancel} variant="outline" className="flex-1">
            <X className="h-4 w-4 mr-2" />
            Cancel
          </Button>
        </div>
      </CardContent>
    </Card>
  );

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold text-white">Project Management</h2>
        <Button onClick={() => setShowAddForm(true)} disabled={showAddForm || !!editingProject}>
          <Plus className="h-4 w-4 mr-2" />
          Add Project
        </Button>
      </div>

      {(showAddForm || editingProject) && <ProjectForm isEditing={!!editingProject} />}

      <div className="grid gap-4">
        {projects.map((project, index) => (
          <motion.div
            key={project.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
          >
            <Card className="bg-white/10 backdrop-blur-lg border-purple-500/20">
              <CardContent className="p-6">
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-2">
                      <h3 className="text-lg font-semibold text-white">{project.title}</h3>
                      <span className="bg-yellow-500/20 text-yellow-400 text-xs px-2 py-1 rounded-full">
                        {project.status}
                      </span>
                    </div>
                    
                    <p className="text-gray-300 mb-3 text-sm">{project.description}</p>
                    
                    <div className="flex flex-wrap gap-1 mb-3">
                      {project.tech.map((tech) => (
                        <span
                          key={tech}
                          className="bg-purple-500/20 text-purple-300 px-2 py-1 rounded text-xs"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                    
                    <div className="flex gap-2">
                      {project.liveDemo && (
                        <a
                          href={project.liveDemo}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-blue-400 hover:text-blue-300 text-sm flex items-center gap-1"
                        >
                          <ExternalLink className="h-3 w-3" />
                          Demo
                        </a>
                      )}
                      {project.github && (
                        <a
                          href={project.github}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-gray-400 hover:text-gray-300 text-sm flex items-center gap-1"
                        >
                          <Github className="h-3 w-3" />
                          Code
                        </a>
                      )}
                    </div>
                  </div>
                  
                  <div className="flex gap-2 ml-4">
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => handleEdit(project)}
                      disabled={editingProject === project.id || showAddForm}
                      className="border-purple-500/30 text-purple-300 hover:bg-purple-500/20"
                    >
                      <Edit className="h-3 w-3" />
                    </Button>
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => handleDelete(project.id)}
                      disabled={editingProject === project.id || showAddForm}
                      className="border-red-500/30 text-red-300 hover:bg-red-500/20"
                    >
                      <Trash2 className="h-3 w-3" />
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>

      {projects.length === 0 && (
        <div className="text-center py-8">
          <p className="text-gray-400">No projects found. Add your first project to get started!</p>
        </div>
      )}
    </div>
  );
};

export default ProjectManager;
