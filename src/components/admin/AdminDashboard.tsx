
import React from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { Settings, FolderOpen, Award, LogOut, Home } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useAdmin } from '@/contexts/AdminContext';
import { toast } from '@/components/ui/use-toast';

const AdminDashboard = () => {
  const { logout } = useAdmin();
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
      comingSoon: true
    },
    {
      title: "Manage Achievements",
      description: "Update your certifications and achievements",
      icon: Award,
      color: "from-green-600 to-green-700",
      comingSoon: true
    },
    {
      title: "Settings",
      description: "Configure admin panel preferences",
      icon: Settings,
      color: "from-purple-600 to-purple-700",
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

        {/* Admin Cards */}
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

        {/* Status Card */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="mt-8 bg-white/10 backdrop-blur-lg rounded-2xl p-6 border border-purple-500/20"
        >
          <h3 className="text-lg font-semibold text-white mb-2">📋 Development Status</h3>
          <p className="text-gray-300 mb-4">
            The admin panel is being built in phases. Currently, only the authentication system is ready.
            Project and Achievement management features will be added in the next phases.
          </p>
          <div className="text-sm text-purple-300">
            <p>✅ Phase 1: Admin Authentication & Dashboard</p>
            <p>🔄 Phase 2: Data Management System (Next)</p>
            <p>⏳ Phase 3: Project Management Interface</p>
            <p>⏳ Phase 4: Achievement Management Interface</p>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default AdminDashboard;
