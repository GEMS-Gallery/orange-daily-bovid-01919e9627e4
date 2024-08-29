import Bool "mo:base/Bool";
import Hash "mo:base/Hash";
import Nat "mo:base/Nat";

import Array "mo:base/Array";
import Text "mo:base/Text";
import HashMap "mo:base/HashMap";
import Iter "mo:base/Iter";
import Debug "mo:base/Debug";

actor {
  // Project type definition
  type Project = {
    id: Nat;
    title: Text;
    category: Text;
    description: Text;
    image: ?Text;
    url: Text;
    github: Text;
    featured: Bool;
    recentDeploy: Bool;
  };

  // Stable variables
  stable var projectsArray: [Project] = [];
  stable var categoriesArray: [Text] = [];

  // Initialize projects
  private func initProjects() {
    projectsArray := [
      {
        id = 1;
        title = "Apple";
        category = "Technology";
        description = "Apple Inc. is a technology company that designs, develops, and sells consumer electronics, computer software, and online services.";
        image = ?"https://fakeimg.pl/600x400?text=Apple";
        url = "https://www.apple.com";
        github = "https://github.com/apple";
        featured = true;
        recentDeploy = false;
      },
      {
        id = 2;
        title = "Nike";
        category = "Retail";
        description = "Nike, Inc. is an American multinational corporation that is engaged in the design, development, manufacturing, and worldwide marketing and sales of footwear, apparel, equipment, accessories, and services.";
        image = ?"https://fakeimg.pl/600x400?text=Nike";
        url = "https://www.nike.com";
        github = "https://github.com/nike";
        featured = false;
        recentDeploy = true;
      },
      {
        id = 3;
        title = "Spotify";
        category = "Entertainment";
        description = "Spotify is a Swedish audio streaming and media services provider founded in 2006.";
        image = ?"https://fakeimg.pl/600x400?text=Spotify";
        url = "https://www.spotify.com";
        github = "https://github.com/spotify";
        featured = true;
        recentDeploy = true;
      }
    ];

    // Initialize categories
    let categorySet = HashMap.HashMap<Text, Bool>(10, Text.equal, Text.hash);
    for (project in projectsArray.vals()) {
      categorySet.put(project.category, true);
    };
    categoriesArray := Iter.toArray(categorySet.keys());
  };

  // Initialize projects if empty
  if (projectsArray.size() == 0) {
    initProjects();
  };

  // Get all projects
  public query func getProjects() : async [Project] {
    return projectsArray;
  };

  // Get projects by category
  public query func getProjectsByCategory(category: Text) : async [Project] {
    return Array.filter(projectsArray, func (p: Project) : Bool {
      return p.category == category;
    });
  };

  // Get featured projects
  public query func getFeaturedProjects() : async [Project] {
    return Array.filter(projectsArray, func (p: Project) : Bool {
      return p.featured;
    });
  };

  // Get recent projects
  public query func getRecentProjects() : async [Project] {
    return Array.filter(projectsArray, func (p: Project) : Bool {
      return p.recentDeploy;
    });
  };

  // Search projects
  public query func searchProjects(searchTerm: Text) : async [Project] {
    let lowercaseSearchTerm = Text.toLowercase(searchTerm);
    return Array.filter(projectsArray, func (p: Project) : Bool {
      let lowercaseTitle = Text.toLowercase(p.title);
      let lowercaseDescription = Text.toLowercase(p.description);
      return Text.contains(lowercaseTitle, #text lowercaseSearchTerm) or
             Text.contains(lowercaseDescription, #text lowercaseSearchTerm);
    });
  };

  // Get all categories
  public query func getCategories() : async [Text] {
    return categoriesArray;
  };
}
