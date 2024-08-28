import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GithubUser } from '../models/git-hub-user.model';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss'],
  standalone: true,
  imports: [CommonModule],
})
export class ProfileComponent {
  @Input() user: GithubUser | null = null;
}
