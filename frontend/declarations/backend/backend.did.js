export const idlFactory = ({ IDL }) => {
  const Project = IDL.Record({
    'id' : IDL.Nat,
    'url' : IDL.Text,
    'title' : IDL.Text,
    'featured' : IDL.Bool,
    'description' : IDL.Text,
    'category' : IDL.Text,
    'image' : IDL.Opt(IDL.Text),
    'recentDeploy' : IDL.Bool,
    'github' : IDL.Text,
  });
  return IDL.Service({
    'getCategories' : IDL.Func([], [IDL.Vec(IDL.Text)], ['query']),
    'getFeaturedProjects' : IDL.Func([], [IDL.Vec(Project)], ['query']),
    'getProjects' : IDL.Func([], [IDL.Vec(Project)], ['query']),
    'getProjectsByCategory' : IDL.Func(
        [IDL.Text],
        [IDL.Vec(Project)],
        ['query'],
      ),
    'getRecentProjects' : IDL.Func([], [IDL.Vec(Project)], ['query']),
    'searchProjects' : IDL.Func([IDL.Text], [IDL.Vec(Project)], ['query']),
  });
};
export const init = ({ IDL }) => { return []; };
