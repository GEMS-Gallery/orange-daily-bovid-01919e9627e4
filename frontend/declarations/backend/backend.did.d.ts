import type { Principal } from '@dfinity/principal';
import type { ActorMethod } from '@dfinity/agent';
import type { IDL } from '@dfinity/candid';

export interface Project {
  'id' : bigint,
  'url' : string,
  'title' : string,
  'featured' : boolean,
  'description' : string,
  'category' : string,
  'image' : [] | [string],
  'recentDeploy' : boolean,
  'github' : string,
}
export interface _SERVICE {
  'getCategories' : ActorMethod<[], Array<string>>,
  'getFeaturedProjects' : ActorMethod<[], Array<Project>>,
  'getProjects' : ActorMethod<[], Array<Project>>,
  'getProjectsByCategory' : ActorMethod<[string], Array<Project>>,
  'getRecentProjects' : ActorMethod<[], Array<Project>>,
  'searchProjects' : ActorMethod<[string], Array<Project>>,
}
export declare const idlFactory: IDL.InterfaceFactory;
export declare const init: (args: { IDL: typeof IDL }) => IDL.Type[];
