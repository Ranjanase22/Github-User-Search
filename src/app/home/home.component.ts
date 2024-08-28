import { Component , EventEmitter} from '@angular/core';
import { CommonModule } from '@angular/common';
import { SearchComponent } from '../search/search.component';
import { LoadingComponent } from '../loading/loading.component';
import { ProfileComponent } from '../profile/profile.component';
import { GitHubService } from '../services/github.service'; 
import { finalize } from 'rxjs';
import { GithubUser } from '../models/git-hub-user.model';
import { UserReposComponent } from '../repos/repos.component';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
  standalone: true,
  imports: [CommonModule, SearchComponent, LoadingComponent, ProfileComponent,  UserReposComponent],
  providers: [GitHubService],
})
export class HomeComponent {
    user: GithubUser | null = null;
    searchQuery: string = '';
    isLoading: boolean = false;
  constructor(private gitHubService: GitHubService) {}

  getUserDetails(userName: string) {
    if (!!userName) {
      this.isLoading = true;
      this.gitHubService
        .searchUser(userName)
        .pipe(
          finalize(() => {
            this.isLoading = false;
          })
        )
        .subscribe((response) => {
          this.user = {
            userName: response.login,
            name: response.name,
            avatarUrl: response.avatar_url,
            bio: response.bio,
            htmlUrl: response.html_url,
            following: response.following,
            followers: response.followers,
          };
        });
    }
  }
  handleSearch(username: string) {
      this.getUserDetails(username);
      this.searchQuery = username;
    }
     
    }

