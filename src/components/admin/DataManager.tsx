
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Download, Upload, ArrowLeft, Database, FileText } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useData } from '@/contexts/DataContext';
import { toast } from '@/components/ui/use-toast';

interface DataManagerProps {
  onBack: () => void;
}

const DataManager = ({ onBack }: DataManagerProps) => {
  const { exportData, importData, projects, achievements } = useData();
  const [isImporting, setIsImporting] = useState(false);

  const handleExport = () => {
    try {
      const data = exportData();
      const blob = new Blob([data], { type: 'application/json' });
      const url = URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.download = `portfolio-data-${new Date().toISOString().split('T')[0]}.json`;
      link.click();
      URL.revokeObjectURL(url);
      
      toast({
        title: "Data Exported",
        description: "Your portfolio data has been downloaded successfully.",
      });
    } catch (error) {
      toast({
        title: "Export Failed",
        description: "There was an error exporting your data.",
        variant: "destructive",
      });
    }
  };

  const handleImport = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    setIsImporting(true);
    const reader = new FileReader();
    
    reader.onload = (e) => {
      try {
        const content = e.target?.result as string;
        const success = importData(content);
        
        if (success) {
          toast({
            title: "Data Imported",
            description: "Your portfolio data has been imported successfully.",
          });
        } else {
          toast({
            title: "Import Failed",
            description: "The file format is invalid or corrupted.",
            variant: "destructive",
          });
        }
      } catch (error) {
        toast({
          title: "Import Failed",
          description: "There was an error reading the file.",
          variant: "destructive",
        });
      } finally {
        setIsImporting(false);
        event.target.value = '';
      }
    };
    
    reader.readAsText(file);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 p-6">
      <div className="container mx-auto max-w-4xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex justify-between items-center mb-8"
        >
          <div>
            <h1 className="text-3xl font-bold text-white mb-2">Data Management</h1>
            <p className="text-gray-300">Backup, restore, and manage your portfolio data</p>
          </div>
          
          <Button
            onClick={onBack}
            variant="outline"
            className="border-purple-500/30 text-white hover:bg-purple-500/20"
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back
          </Button>
        </motion.div>

        {/* Data Overview */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="grid grid-cols-2 gap-4 mb-8"
        >
          <Card className="bg-white/10 backdrop-blur-lg border-blue-500/20">
            <CardContent className="p-4">
              <div className="flex items-center gap-3">
                <Database className="h-8 w-8 text-blue-400" />
                <div>
                  <div className="text-2xl font-bold text-blue-400">{projects.length}</div>
                  <div className="text-sm text-gray-300">Projects</div>
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card className="bg-white/10 backdrop-blur-lg border-green-500/20">
            <CardContent className="p-4">
              <div className="flex items-center gap-3">
                <FileText className="h-8 w-8 text-green-400" />
                <div>
                  <div className="text-2xl font-bold text-green-400">{achievements.length}</div>
                  <div className="text-sm text-gray-300">Achievements</div>
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Export/Import Cards */}
        <div className="grid md:grid-cols-2 gap-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            <Card className="bg-white/10 backdrop-blur-lg border-purple-500/20 hover:border-purple-400/50 transition-all duration-300 h-full">
              <CardHeader>
                <CardTitle className="text-white flex items-center gap-2">
                  <Download className="h-5 w-5 text-green-400" />
                  Export Data
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <p className="text-gray-300 text-sm">
                  Download a backup of all your portfolio data including projects and achievements.
                </p>
                <Button
                  onClick={handleExport}
                  className="w-full bg-gradient-to-r from-green-600 to-green-700 hover:from-green-700 hover:to-green-800"
                >
                  <Download className="h-4 w-4 mr-2" />
                  Export as JSON
                </Button>
              </CardContent>
            </Card>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
          >
            <Card className="bg-white/10 backdrop-blur-lg border-purple-500/20 hover:border-purple-400/50 transition-all duration-300 h-full">
              <CardHeader>
                <CardTitle className="text-white flex items-center gap-2">
                  <Upload className="h-5 w-5 text-blue-400" />
                  Import Data
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <p className="text-gray-300 text-sm">
                  Restore your portfolio data from a previously exported backup file.
                </p>
                <div className="relative">
                  <input
                    type="file"
                    accept=".json"
                    onChange={handleImport}
                    disabled={isImporting}
                    className="absolute inset-0 w-full h-full opacity-0 cursor-pointer disabled:cursor-not-allowed"
                  />
                  <Button
                    disabled={isImporting}
                    className="w-full bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 disabled:opacity-50"
                  >
                    <Upload className="h-4 w-4 mr-2" />
                    {isImporting ? 'Importing...' : 'Import JSON File'}
                  </Button>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </div>

        {/* Warning */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="mt-8 bg-yellow-500/10 border border-yellow-500/20 rounded-lg p-4"
        >
          <div className="flex items-start gap-3">
            <div className="text-yellow-400 mt-1">⚠️</div>
            <div>
              <h3 className="text-yellow-400 font-semibold mb-1">Important</h3>
              <p className="text-gray-300 text-sm">
                Importing data will replace all existing portfolio content. Make sure to export your current data first if you want to keep it as a backup.
              </p>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default DataManager;
