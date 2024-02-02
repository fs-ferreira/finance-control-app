import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-empty-state',
  templateUrl: './empty-state.component.html',
  styleUrls: ['./empty-state.component.css']
})
export class EmptyStateComponent implements OnInit {

  @Input()
  public errorMessage = "A consulta não apresentou dados. Por favor, tente novamente."

  @Input()
  public errorTitle = "404 - Sem resultados"

  constructor() { }

  ngOnInit(): void {
  }

}
