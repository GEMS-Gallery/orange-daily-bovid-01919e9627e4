import React from 'react';
import { List, ListItem, ListItemButton, ListItemText } from '@mui/material';

interface CategoryListProps {
  categories: string[];
  selectedCategory: string;
  onSelectCategory: (category: string) => void;
}

const CategoryList: React.FC<CategoryListProps> = ({ categories, selectedCategory, onSelectCategory }) => {
  return (
    <List>
      {categories.map((category) => (
        <ListItem key={category} disablePadding>
          <ListItemButton
            selected={category === selectedCategory}
            onClick={() => onSelectCategory(category)}
          >
            <ListItemText primary={category} />
          </ListItemButton>
        </ListItem>
      ))}
    </List>
  );
};

export default CategoryList;
