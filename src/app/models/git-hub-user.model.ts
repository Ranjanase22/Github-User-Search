export interface GithubUser {
    userName: string;
    name: string;
    avatarUrl: string;
    bio: string;
    following: number;
    followers: number;
    htmlUrl: string;
  }
  
  export interface GithubRepos {
    name: string;
    size: number;
    html_url: string;
  }