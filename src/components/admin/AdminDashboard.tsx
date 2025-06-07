
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { Settings, FolderOpen, Award, LogOut, Home, Database, Download, Upload, RotateCcw } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useAdmin } from '@/contexts/AdminContext';
import { useData } from '@/contexts/DataContext';
import { toast } from '@/components/ui/use-toast';
import ProjectManager from './ProjectManager';

const AdminDashboard = () => {
  const { logout } = useAdmin();
  const { useAdminData, toggleAdminData, resetToOriginal, exportData, importData } = useData();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('overview');

  const handleLogout = () => {
    logout();
    toast({
      title: "Logged Out",
      description: "You have been successfully logged out.",
    });
    navigate('/');
  };

  const handleExportData = () => {
    const data = exportData();
    const blob = new Blob([data], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `portfolio-data-${new Date().toISOString().split('T')[0]}.json`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
    
    toast({
      title: "Data Exported",
      description: "Your portfolio data has been exported successfully.",
    });
  };

  const handleImportData = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (e) => {
      const content = e.target?.result as string;
      if (importData(content)) {
        toast({
          title: "Data Imported",
          description: "Your portfolio data has been imported successfully.",
        });
      } else {
        toast({
          title: "Import Failed",
          description: "Failed to import data. Please check the file format.",
          variant: "destructive",
        });
      }
    };
    reader.readAsText(file);
    event.target.value = '';
  };

  const handleResetData = () => {
    if (confirm('Are you sure you want to reset all data to original? This cannot be undone.')) {
      resetToOriginal();
      toast({
        title: "Data Reset",
        description: "All data has been reset to original state.",
      });
    }
  };

  const adminCards = [
    {
      id: 'projects',
      title: "Manage Projects",
      description: "Add, edit, and organize your portfolio projects",
      icon: FolderOpen,
      color: "from-blue-600 to-blue-700",
      active: true
    },
    {
      id: 'achievements',
      title: "Manage Achievements",
      description: "Update your certifications and achievements",
      icon: Award,
      color: "from-green-600 to-green-700",
      comingSoon: true
    },
    {
      id: 'settings',
      title: "Settings",
      description: "Configure admin panel preferences",
      icon: Settings,
      color: "from-purple-600 to-purple-700",
      comingSoon: true
    }
  ];

  const renderContent = () => {
    switch (activeTab) {
      case 'projects':
        return <ProjectManager />;
      case 'achievements':
        return (
          <div className="text-center py-8">
            <Award className="h-16 w-16 text-yellow-400 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-white mb-2">Achievement Manager</h3>
            <p className="text-gray-300">Coming soon in the next update!</p>
          </div>
        );
      case 'settings':
        return (
          <div className="text-center py-8">
            <Settings className="h-16 w-16 text-purple-400 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-white mb-2">Settings Panel</h3>
            <p className="text-gray-300">Coming soon in the next update!</p>
          </div>
        );
      default:
        return (
          <div className="space-y-6">
            {/* Data Control Panel */}
            <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-6 border border-purple-500/20">
              <h3 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
                <Database className="h-5 w-5" />
                Data Management
              </h3>
              
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-white font-medium">Admin Data Mode</p>
                    <p className="text-sm text-gray-300">
                      {useAdminData ? 'Using admin-managed data' : 'Using original hardcoded data'}
                    </p>
                  </div>
                  <Button
                    onClick={toggleAdminData}
                    variant={useAdminData ? "default" : "outline"}
                    className={useAdminData ? "bg-green-600 hover:bg-green-700" : "border-purple-500/30"}
                  >
                    {useAdminData ? 'Enabled' : 'Disabled'}
                  </Button>
                </div>
                
                <div className="flex gap-4">
                  <Button onClick={handleExportData} variant="outline" className="flex-1 border-blue-500/30 text-blue-300">
                    <Download className="h-4 w-4 mr-2" />
                    Export Data
                  </Button>
                  
                  <Button asChild variant="outline" className="flex-1 border-green-500/30 text-green-300">
                    <label>
                      <Upload className="h-4 w-4 mr-2" />
                      Import Data
                      <input
                        type="file"
                        accept=".json"
                        onChange={handleImportData}
                        className="hidden"
                      />
                    </label>
                  </Button>
                  
                  <Button onClick={handleResetData} variant="outline" className="flex-1 border-red-500/30 text-red-300">
                    <RotateCcw className="h-4 w-4 mr-2" />
                    Reset to Original
                  </Button>
                </div>
              </div>
            </div>

            {/* Management Cards */}
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {adminCards.map((card, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="relative group"
                >
                  <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-6 border border-purple-500/20 hover:border-purple-400/50 transition-all duration-300 h-full">
                    <div className={`w-12 h-12 rounded-xl bg-gradient-to-r ${card.color} flex items-center justify-center mb-4`}>
                      <card.icon className="h-6 w-6 text-white" />
                    </div>
                    
                    <h3 className="text-xl font-semibold text-white mb-2 flex items-center gap-2">
                      {card.title}
                      {card.comingSoon && (
                        <span className="text-xs bg-yellow-500/20 text-yellow-400 px-2 py-1 rounded-full">
                          Coming Soon
                        </span>
                      )}
                    </h3>
                    
                    <p className="text-gray-300 mb-4">{card.description}</p>
                    
                    <Button
                      disabled={card.comingSoon}
                      onClick={() => !card.comingSoon && setActiveTab(card.id)}
                      className={`w-full bg-gradient-to-r ${card.color} hover:opacity-90 transition-opacity ${
                        card.comingSoon ? 'opacity-50 cursor-not-allowed' : ''
                      }`}
                    >
                      {card.comingSoon ? 'Coming Soon' : 'Open'}
                    </Button>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        );
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 p-6">
      <div className="container mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex justify-between items-center mb-8"
        >
          <div>
            <h1 className="text-3xl font-bold text-white mb-2">Admin Dashboard</h1>
            <p className="text-gray-300">Manage your portfolio content</p>
          </div>
          
          <div className="flex gap-4">
            {activeTab !== 'overview' && (
              <Button
                onClick={() => setActiveTab('overview')}
                variant="outline"
                className="border-purple-500/30 text-white hover:bg-purple-500/20"
              >
                ← Back to Overview
              </Button>
            )}
            <Button
              onClick={() => navigate('/')}
              variant="outline"
              className="border-purple-500/30 text-white hover:bg-purple-500/20"
            >
              <Home className="h-4 w-4 mr-2" />
              View Portfolio
            </Button>
            <Button
              onClick={handleLogout}
              variant="outline"
              className="border-red-500/30 text-red-400 hover:bg-red-500/20"
            >
              <LogOut className="h-4 w-4 mr-2" />
              Logout
            </Button>
          </div>
        </motion.div>

        {/* Content */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          {renderContent()}
        </motion.div>
      </div>
    </div>
  );
};

export default AdminDashboard;
