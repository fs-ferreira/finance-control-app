import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-loading-state',
  templateUrl: './loading-state.component.html',
  styleUrls: ['./loading-state.component.css'],
})
export class LoadingStateComponent {
  @Input()
  isLoading: boolean;
}
