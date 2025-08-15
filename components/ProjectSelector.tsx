'use client';

import { useState, useEffect } from 'react';
import { Project } from '@/types/project';
import { Button } from '@/components/ui/button';
import { motion, AnimatePresence } from 'framer-motion';

interface ProjectSelectorProps {
  onProjectSelect: (project: Project) => void;
  onNewProject: () => void;
  currentProjectId?: string;
}

export default function ProjectSelector({ 
  onProjectSelect, 
  onNewProject, 
  currentProjectId 
}: ProjectSelectorProps) {
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);
  const [showProjectList, setShowProjectList] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    fetchProjects();
  }, []);

  const fetchProjects = async () => {
    try {
      setLoading(true);
      const response = await fetch('/api/projects?status=active');
      const data = await response.json();
      setProjects(data.projects || []);
    } catch (error) {
      console.error('Failed to fetch projects:', error);
    } finally {
      setLoading(false);
    }
  };

  const filteredProjects = projects.filter(project =>
    project.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    project.description?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const formatDate = (timestamp: number) => {
    const date = new Date(timestamp);
    const now = new Date();
    const diffInHours = (now.getTime() - date.getTime()) / (1000 * 60 * 60);
    
    if (diffInHours < 24) {
      return date.toLocaleTimeString('pt-BR', { 
        hour: '2-digit', 
        minute: '2-digit' 
      });
    } else if (diffInHours < 168) { // 7 days
      return date.toLocaleDateString('pt-BR', { 
        weekday: 'short',
        day: '2-digit',
        month: '2-digit'
      });
    } else {
      return date.toLocaleDateString('pt-BR', { 
        day: '2-digit',
        month: '2-digit',
        year: '2-digit'
      });
    }
  };

  const getCategoryIcon = (category?: string) => {
    switch (category) {
      case 'ecommerce':
        return '🛒';
      case 'logistics':
        return '🚚';
      case 'fullcommerce':
        return '🏪';
      default:
        return '📁';
    }
  };

  const getCategoryColor = (category?: string) => {
    switch (category) {
      case 'ecommerce':
        return 'bg-agrega-orange/10 text-agrega-orange-dark';
      case 'logistics':
        return 'bg-agrega-blue/10 text-agrega-blue';
      case 'fullcommerce':
        return 'bg-agrega-orange/20 text-agrega-orange-dark';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="relative">
      <Button
        onClick={() => setShowProjectList(!showProjectList)}
        className="flex items-center gap-2 bg-white border border-gray-300 hover:bg-gray-50 text-gray-700 px-3 py-2 rounded-lg"
      >
        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
        </svg>
        <span>Projetos</span>
        <svg 
          className={`w-4 h-4 transition-transform ${showProjectList ? 'rotate-180' : ''}`} 
          fill="none" 
          viewBox="0 0 24 24" 
          stroke="currentColor"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
        </svg>
      </Button>

      <AnimatePresence>
        {showProjectList && (
          <motion.div
            initial={{ opacity: 0, y: -10, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -10, scale: 0.95 }}
            transition={{ duration: 0.2 }}
            className="absolute top-full left-0 mt-2 w-80 bg-white border border-gray-200 rounded-lg shadow-lg z-50"
          >
            <div className="p-4 border-b border-gray-200">
              <div className="flex items-center gap-2 mb-3">
                <input
                  type="text"
                  placeholder="Buscar projetos..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="flex-1 px-3 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-agrega-orange"
                />
              </div>
              
              <Button
                onClick={() => {
                  onNewProject();
                  setShowProjectList(false);
                }}
                className="w-full bg-agrega-orange hover:bg-agrega-orange-dark text-white text-sm py-2"
              >
                <svg className="w-4 h-4 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                </svg>
                Novo Projeto
              </Button>
            </div>

            <div className="max-h-64 overflow-y-auto">
              {loading ? (
                <div className="p-4 text-center text-gray-500">
                  <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-agrega-orange mx-auto"></div>
                  <p className="mt-2 text-sm">Carregando projetos...</p>
                </div>
              ) : filteredProjects.length === 0 ? (
                <div className="p-4 text-center text-gray-500">
                  <p className="text-sm">
                    {searchTerm ? 'Nenhum projeto encontrado' : 'Nenhum projeto criado ainda'}
                  </p>
                </div>
              ) : (
                <div className="p-2">
                  {filteredProjects.map((project) => (
                    <motion.div
                      key={project.id}
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      className={`p-3 rounded-lg cursor-pointer transition-all hover:bg-gray-50 ${
                        currentProjectId === project.id ? 'bg-agrega-orange/10 border border-agrega-orange/20' : ''
                      }`}
                      onClick={() => {
                        onProjectSelect(project);
                        setShowProjectList(false);
                      }}
                    >
                      <div className="flex items-start gap-3">
                        <div className="flex-shrink-0">
                          <span className="text-lg">{getCategoryIcon(project.metadata.category)}</span>
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center gap-2 mb-1">
                            <h3 className="font-medium text-gray-900 truncate">
                              {project.name}
                            </h3>
                            {project.metadata.category && (
                              <span className={`px-2 py-1 text-xs rounded-full ${getCategoryColor(project.metadata.category)}`}>
                                {project.metadata.category}
                              </span>
                            )}
                          </div>
                          {project.description && (
                            <p className="text-sm text-gray-600 truncate mb-1">
                              {project.description}
                            </p>
                          )}
                          <div className="flex items-center gap-2 text-xs text-gray-500">
                            <span>Modificado {formatDate(project.lastModified)}</span>
                            {project.metadata.targetUrl && (
                              <>
                                <span>•</span>
                                <span className="truncate max-w-32">
                                  {new URL(project.metadata.targetUrl).hostname}
                                </span>
                              </>
                            )}
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
