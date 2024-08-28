import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { GitHubService } from '../services/github.service';
import { GithubRepos } from '../models/git-hub-user.model';
import { finalize } from 'rxjs';
import { LoadingComponent } from '../loading/loading.component';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-repos',
  standalone: true,
  imports: [CommonModule, MatCardModule, LoadingComponent, FormsModule],
  templateUrl: './repos.component.html',
  styleUrls: ['./repos.component.scss'],
})
export class UserReposComponent implements OnChanges {
  @Input() userName: string = '';

  repos: GithubRepos[] = [];
  pageNumber: number = 1;
  itemsPerPage: number = 15;
  itemsPerPageOptions: number[] = [15, 20, 30, 40, 50];

  isLoading: boolean = false;

  constructor(private gitHubService: GitHubService) {}

  redirectToRepo(repourl: string) {
    window.open(repourl, '_blank');
  }

  getUserRepos(userName: string, page: number = 1, perPage: number = 15) {
    this.isLoading = true;
    this.gitHubService
      .getUserRepos(userName, page, perPage)
      .pipe(
        finalize(() => {
          this.isLoading = false;
        })
      )
      .subscribe((response) => {
        this.repos = response.map(({ name, size, html_url }: GithubRepos) => ({
          name,
          size,
          html_url,
        }));
      });
  }

  onPrevious() {
    if (this.pageNumber > 1) {
      this.pageNumber--;
      this.getUserRepos(this.userName, this.pageNumber, this.itemsPerPage);
    }
  }

  onNext() {
    this.pageNumber++;
    this.getUserRepos(this.userName, this.pageNumber, this.itemsPerPage);
  }

  onItemsPerPageChange(event: Event) {
    const selectElement = event.target as HTMLSelectElement;
    this.itemsPerPage = parseInt(selectElement.value);
    this.pageNumber = 1;
    this.getUserRepos(this.userName, this.pageNumber, this.itemsPerPage);
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['userName']?.currentValue?.length > 0) {
      this.getUserRepos(
        changes['userName']?.currentValue,
        this.pageNumber,
        this.itemsPerPage
      );
    }
  }
}