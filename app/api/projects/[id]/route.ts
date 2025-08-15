import { NextRequest, NextResponse } from 'next/server';
import { Project, ProjectUpdateRequest } from '@/types/project';

// In-memory storage for projects (in production, use a database)
let projects: Project[] = [];

export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const project = projects.find(p => p.id === params.id);
    
    if (!project) {
      return NextResponse.json(
        { error: 'Project not found' },
        { status: 404 }
      );
    }

    return NextResponse.json(project);
  } catch (error) {
    console.error('[projects/[id]] GET Error:', error);
    return NextResponse.json(
      { error: 'Failed to fetch project' },
      { status: 500 }
    );
  }
}

export async function PUT(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const body: ProjectUpdateRequest = await request.json();
    const projectIndex = projects.findIndex(p => p.id === params.id);
    
    if (projectIndex === -1) {
      return NextResponse.json(
        { error: 'Project not found' },
        { status: 404 }
      );
    }

    const updatedProject = {
      ...projects[projectIndex],
      ...body,
      lastModified: Date.now()
    };

    projects[projectIndex] = updatedProject;

    return NextResponse.json(updatedProject);
  } catch (error) {
    console.error('[projects/[id]] PUT Error:', error);
    return NextResponse.json(
      { error: 'Failed to update project' },
      { status: 500 }
    );
  }
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const projectIndex = projects.findIndex(p => p.id === params.id);
    
    if (projectIndex === -1) {
      return NextResponse.json(
        { error: 'Project not found' },
        { status: 404 }
      );
    }

    // Soft delete - mark as deleted instead of removing
    projects[projectIndex].status = 'deleted';
    projects[projectIndex].lastModified = Date.now();

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('[projects/[id]] DELETE Error:', error);
    return NextResponse.json(
      { error: 'Failed to delete project' },
      { status: 500 }
    );
  }
}
