import React from 'react';
import { Card, CardContent, CardMedia, Typography, Button, Box } from '@mui/material';
import { GitHub as GitHubIcon, Launch as LaunchIcon } from '@mui/icons-material';

interface Project {
  id: number;
  title: string;
  category: string;
  description: string;
  image: string | null;
  url: string;
  github: string;
  featured: boolean;
  recentDeploy: boolean;
}

interface ProjectCardProps {
  project: Project;
  viewMode: 'grid' | 'list';
}

const ProjectCard: React.FC<ProjectCardProps> = ({ project, viewMode }) => {
  return (
    <Card sx={{ display: viewMode === 'list' ? 'flex' : 'block', height: '100%' }}>
      {project.image && (
        <CardMedia
          component="img"
          image={project.image}
          alt={project.title}
          sx={{
            width: viewMode === 'list' ? 200 : '100%',
            height: viewMode === 'list' ? '100%' : 200,
            objectFit: 'cover'
          }}
        />
      )}
      <Box sx={{ display: 'flex', flexDirection: 'column', flexGrow: 1 }}>
        <CardContent>
          <Typography gutterBottom variant="h5" component="div">
            {project.title}
          </Typography>
          <Typography variant="body2" color="text.secondary" gutterBottom>
            {project.category}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {project.description}
          </Typography>
        </CardContent>
        <Box sx={{ mt: 'auto', p: 2, display: 'flex', justifyContent: 'space-between' }}>
          <Button
            size="small"
            startIcon={<GitHubIcon />}
            href={project.github}
            target="_blank"
            rel="noopener noreferrer"
          >
            GitHub
          </Button>
          <Button
            size="small"
            endIcon={<LaunchIcon />}
            href={project.url}
            target="_blank"
            rel="noopener noreferrer"
          >
            Visit
          </Button>
        </Box>
      </Box>
    </Card>
  );
};

export default ProjectCard;
