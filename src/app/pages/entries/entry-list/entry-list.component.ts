import { Component, OnInit } from '@angular/core';
import { ConfirmationService } from 'primeng/api';
import { Entry, EntryType } from 'src/app/core/models/entry.model';
import { EntryService } from 'src/app/core/services/entry.service';

@Component({
  selector: 'app-entry-list',
  templateUrl: './entry-list.component.html',
  styleUrls: ['./entry-list.component.css'],
})
export class EntryListComponent implements OnInit {
  public entries: Entry[];

  constructor(
    private _service: EntryService,
    private _confirmationService: ConfirmationService
  ) {}

  ngOnInit(): void {
    this._service.getAll().subscribe(
      (data) => (this.entries = data),
      (error) => alert('Erro ao carregar a listagem')
    );
  }

  public checkEntryType(row: Entry){
    return row.type === EntryType.expense ? 'text-danger' : 'text-success'
  }

  public deleteEntry(id: number) {
    this._confirmationService.confirm({
      message: 'Deseja realmente excluir esse item?',
      acceptLabel: 'Sim',
      rejectLabel: 'Não',
      accept: () => {
        this._service
          .delete(id)
          .subscribe(
            () => (this.entries = this.entries.filter((el) => el.id != id))
          );
      },
    });
  }
}
