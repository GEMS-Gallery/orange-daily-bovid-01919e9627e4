import React, { useState, useEffect } from 'react';
import { Container, Grid, Typography, TextField, Button, AppBar, Toolbar, IconButton, Box } from '@mui/material';
import { Search as SearchIcon, ViewModule as GridViewIcon, ViewList as ListViewIcon } from '@mui/icons-material';
import ProjectCard from './components/ProjectCard';
import CategoryList from './components/CategoryList';
import { backend } from 'declarations/backend';

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

const App: React.FC = () => {
  const [projects, setProjects] = useState<Project[]>([]);
  const [categories, setCategories] = useState<string[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [showFeatured, setShowFeatured] = useState<boolean>(true);

  useEffect(() => {
    fetchProjects();
    fetchCategories();
  }, []);

  const fetchProjects = async () => {
    try {
      const result = await backend.getProjects();
      setProjects(result);
    } catch (error) {
      console.error('Error fetching projects:', error);
    }
  };

  const fetchCategories = async () => {
    try {
      const result = await backend.getCategories();
      setCategories(['All', ...result]);
    } catch (error) {
      console.error('Error fetching categories:', error);
    }
  };

  const handleCategorySelect = (category: string) => {
    setSelectedCategory(category);
  };

  const handleSearch = async () => {
    if (searchQuery.trim() === '') {
      fetchProjects();
    } else {
      try {
        const result = await backend.searchProjects(searchQuery);
        setProjects(result);
      } catch (error) {
        console.error('Error searching projects:', error);
      }
    }
  };

  const handleViewModeToggle = () => {
    setViewMode(viewMode === 'grid' ? 'list' : 'grid');
  };

  const handleFeaturedToggle = async () => {
    setShowFeatured(!showFeatured);
    try {
      const result = showFeatured
        ? await backend.getRecentProjects()
        : await backend.getFeaturedProjects();
      setProjects(result);
    } catch (error) {
      console.error('Error fetching projects:', error);
    }
  };

  const filteredProjects = selectedCategory === 'All'
    ? projects
    : projects.filter(project => project.category === selectedCategory);

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            GEM's Showcase
          </Typography>
          <TextField
            variant="outlined"
            size="small"
            placeholder="Search projects"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            sx={{ mr: 2, backgroundColor: 'white' }}
          />
          <Button variant="contained" onClick={handleSearch} startIcon={<SearchIcon />}>
            Search
          </Button>
        </Toolbar>
      </AppBar>
      <Container maxWidth="lg" sx={{ mt: 4 }}>
        <Grid container spacing={3}>
          <Grid item xs={12} md={3}>
            <CategoryList
              categories={categories}
              selectedCategory={selectedCategory}
              onSelectCategory={handleCategorySelect}
            />
          </Grid>
          <Grid item xs={12} md={9}>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 2 }}>
              <Button
                variant="outlined"
                onClick={handleFeaturedToggle}
              >
                {showFeatured ? 'Show Recent' : 'Show Featured'}
              </Button>
              <IconButton onClick={handleViewModeToggle}>
                {viewMode === 'grid' ? <ListViewIcon /> : <GridViewIcon />}
              </IconButton>
            </Box>
            <Grid container spacing={3}>
              {filteredProjects.map((project) => (
                <Grid item xs={12} sm={viewMode === 'grid' ? 6 : 12} md={viewMode === 'grid' ? 4 : 12} key={project.id}>
                  <ProjectCard project={project} viewMode={viewMode} />
                </Grid>
              ))}
            </Grid>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
};

export default App;
