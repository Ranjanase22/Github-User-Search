import { Component, EventEmitter, Output } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss'],
  standalone: true,
  imports: [CommonModule],
})
export class SearchComponent {
  @Output() searchEvent = new EventEmitter<string>();

  emitSearch(username: string) {
    this.searchEvent.emit(username);
  }
}
