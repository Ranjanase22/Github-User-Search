import { GitHubUser } from './git-hub-user.model';

describe('GitHubUser', () => {
  it('should create an instance', () => {
    expect(new GitHubUser()).toBeTruthy();
  });
});
