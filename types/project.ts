// Project management types for Agrega Commerce AI Editor

export interface Project {
  id: string;
  name: string;
  description?: string;
  createdAt: number;
  lastModified: number;
  sandboxId?: string;
  sandboxUrl?: string;
  status: 'active' | 'archived' | 'deleted';
  
  // Project metadata
  metadata: {
    category?: 'ecommerce' | 'logistics' | 'fullcommerce' | 'other';
    targetUrl?: string;
    style?: string;
    framework?: 'react' | 'vue' | 'angular' | 'other';
    packages?: string[];
    features?: string[];
  };
  
  // Conversation and development history
  conversation: {
    messages: Array<{
      id: string;
      role: 'user' | 'assistant';
      content: string;
      timestamp: number;
      metadata?: {
        editedFiles?: string[];
        addedPackages?: string[];
        editType?: string;
        sandboxId?: string;
      };
    }>;
    context: {
      scrapedWebsites: Array<{ url: string; content: any; timestamp: number }>;
      generatedComponents: Array<{ name: string; path: string; content: string }>;
      appliedCode: Array<{ files: string[]; timestamp: number }>;
      currentProject: string;
      lastGeneratedCode?: string;
    };
  };
  
  // File structure and content
  files: Record<string, {
    content: string;
    lastModified: number;
    type: 'component' | 'style' | 'config' | 'other';
  }>;
  
  // Project settings
  settings: {
    aiModel: string;
    autoSave: boolean;
    theme: 'light' | 'dark' | 'auto';
  };
}

export interface ProjectList {
  projects: Project[];
  totalCount: number;
  lastSync: number;
}

export interface ProjectFilters {
  status?: 'active' | 'archived' | 'deleted';
  category?: string;
  search?: string;
  sortBy?: 'name' | 'createdAt' | 'lastModified';
  sortOrder?: 'asc' | 'desc';
}

export interface ProjectCreateRequest {
  name: string;
  description?: string;
  category?: string;
  targetUrl?: string;
  style?: string;
}

export interface ProjectUpdateRequest {
  name?: string;
  description?: string;
  status?: 'active' | 'archived' | 'deleted';
  metadata?: Partial<Project['metadata']>;
  settings?: Partial<Project['settings']>;
}
