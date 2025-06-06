
import React from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { Settings, FolderOpen, Award, LogOut, Home, Database } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useAdmin } from '@/contexts/AdminContext';
import { useData } from '@/contexts/DataContext';
import { toast } from '@/components/ui/use-toast';

const AdminDashboard = () => {
  const { logout } = useAdmin();
  const { projects, achievements } = useData();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    toast({
      title: "Logged Out",
      description: "You have been successfully logged out.",
    });
    navigate('/');
  };

  const adminCards = [
    {
      title: "Manage Projects",
      description: "Add, edit, and organize your portfolio projects",
      icon: FolderOpen,
      color: "from-blue-600 to-blue-700",
      count: projects.length,
      comingSoon: true
    },
    {
      title: "Manage Achievements",
      description: "Update your certifications and achievements",
      icon: Award,
      color: "from-green-600 to-green-700",
      count: achievements.length,
      comingSoon: true
    },
    {
      title: "Data Management",
      description: "Backup, restore, and manage your portfolio data",
      icon: Database,
      color: "from-purple-600 to-purple-700",
      comingSoon: true
    },
    {
      title: "Settings",
      description: "Configure admin panel preferences",
      icon: Settings,
      color: "from-gray-600 to-gray-700",
      comingSoon: true
    }
  ];

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

        {/* Data Overview */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8"
        >
          <div className="bg-white/10 backdrop-blur-lg rounded-xl p-4 border border-blue-500/20">
            <div className="text-2xl font-bold text-blue-400">{projects.length}</div>
            <div className="text-sm text-gray-300">Projects</div>
          </div>
          <div className="bg-white/10 backdrop-blur-lg rounded-xl p-4 border border-green-500/20">
            <div className="text-2xl font-bold text-green-400">{achievements.length}</div>
            <div className="text-sm text-gray-300">Achievements</div>
          </div>
          <div className="bg-white/10 backdrop-blur-lg rounded-xl p-4 border border-purple-500/20">
            <div className="text-2xl font-bold text-purple-400">100%</div>
            <div className="text-sm text-gray-300">Data Ready</div>
          </div>
          <div className="bg-white/10 backdrop-blur-lg rounded-xl p-4 border border-yellow-500/20">
            <div className="text-2xl font-bold text-yellow-400">Phase 2</div>
            <div className="text-sm text-gray-300">Complete</div>
          </div>
        </motion.div>

        {/* Admin Cards */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {adminCards.map((card, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 + 0.2 }}
              className="relative group"
            >
              <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-6 border border-purple-500/20 hover:border-purple-400/50 transition-all duration-300 h-full">
                <div className={`w-12 h-12 rounded-xl bg-gradient-to-r ${card.color} flex items-center justify-center mb-4`}>
                  <card.icon className="h-6 w-6 text-white" />
                </div>
                
                <h3 className="text-xl font-semibold text-white mb-2 flex items-center gap-2">
                  {card.title}
                  {card.count !== undefined && (
                    <span className="text-xs bg-blue-500/20 text-blue-400 px-2 py-1 rounded-full">
                      {card.count}
                    </span>
                  )}
                  {card.comingSoon && (
                    <span className="text-xs bg-yellow-500/20 text-yellow-400 px-2 py-1 rounded-full">
                      Phase 3
                    </span>
                  )}
                </h3>
                
                <p className="text-gray-300 mb-4">{card.description}</p>
                
                <Button
                  disabled={card.comingSoon}
                  className={`w-full bg-gradient-to-r ${card.color} hover:opacity-90 transition-opacity ${
                    card.comingSoon ? 'opacity-50 cursor-not-allowed' : ''
                  }`}
                >
                  {card.comingSoon ? 'Phase 3' : 'Open'}
                </Button>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Status Card */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="mt-8 bg-white/10 backdrop-blur-lg rounded-2xl p-6 border border-purple-500/20"
        >
          <h3 className="text-lg font-semibold text-white mb-2">📋 Development Status</h3>
          <p className="text-gray-300 mb-4">
            Phase 2 complete! Data management system is now ready. Your portfolio data is safely stored 
            and the admin panel can now manage content dynamically.
          </p>
          <div className="text-sm text-purple-300">
            <p>✅ Phase 1: Admin Authentication & Dashboard</p>
            <p>✅ Phase 2: Data Management System</p>
            <p>🔄 Phase 3: Admin CRUD Interfaces (Next)</p>
            <p>⏳ Phase 4: Integration & Polish</p>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default AdminDashboard;
