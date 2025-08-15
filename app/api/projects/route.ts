import { NextRequest, NextResponse } from 'next/server';
import { Project, ProjectList, ProjectCreateRequest } from '@/types/project';

// In-memory storage for projects (in production, use a database)
let projects: Project[] = [];

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const status = searchParams.get('status') as 'active' | 'archived' | 'deleted';
    const category = searchParams.get('category');
    const search = searchParams.get('search');
    const sortBy = searchParams.get('sortBy') as 'name' | 'createdAt' | 'lastModified' || 'lastModified';
    const sortOrder = searchParams.get('sortOrder') as 'asc' | 'desc' || 'desc';

    // Filter projects
    let filteredProjects = projects.filter(project => {
      if (status && project.status !== status) return false;
      if (category && project.metadata.category !== category) return false;
      if (search) {
        const searchLower = search.toLowerCase();
        return project.name.toLowerCase().includes(searchLower) ||
               project.description?.toLowerCase().includes(searchLower) ||
               project.metadata.targetUrl?.toLowerCase().includes(searchLower);
      }
      return true;
    });

    // Sort projects
    filteredProjects.sort((a, b) => {
      let aValue: any, bValue: any;
      
      switch (sortBy) {
        case 'name':
          aValue = a.name.toLowerCase();
          bValue = b.name.toLowerCase();
          break;
        case 'createdAt':
          aValue = a.createdAt;
          bValue = b.createdAt;
          break;
        case 'lastModified':
        default:
          aValue = a.lastModified;
          bValue = b.lastModified;
          break;
      }

      if (sortOrder === 'asc') {
        return aValue > bValue ? 1 : -1;
      } else {
        return aValue < bValue ? 1 : -1;
      }
    });

    const projectList: ProjectList = {
      projects: filteredProjects,
      totalCount: filteredProjects.length,
      lastSync: Date.now()
    };

    return NextResponse.json(projectList);
  } catch (error) {
    console.error('[projects] GET Error:', error);
    return NextResponse.json(
      { error: 'Failed to fetch projects' },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const body: ProjectCreateRequest = await request.json();
    
    if (!body.name) {
      return NextResponse.json(
        { error: 'Project name is required' },
        { status: 400 }
      );
    }

    const newProject: Project = {
      id: `project_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
      name: body.name,
      description: body.description || '',
      createdAt: Date.now(),
      lastModified: Date.now(),
      status: 'active',
      metadata: {
        category: body.category as any || 'other',
        targetUrl: body.targetUrl,
        style: body.style,
        framework: 'react',
        packages: [],
        features: []
      },
      conversation: {
        messages: [],
        context: {
          scrapedWebsites: [],
          generatedComponents: [],
          appliedCode: [],
          currentProject: body.name
        }
      },
      files: {},
      settings: {
        aiModel: 'moonshotai/kimi-k2-instruct',
        autoSave: true,
        theme: 'auto'
      }
    };

    projects.push(newProject);

    return NextResponse.json(newProject, { status: 201 });
  } catch (error) {
    console.error('[projects] POST Error:', error);
    return NextResponse.json(
      { error: 'Failed to create project' },
      { status: 500 }
    );
  }
}
