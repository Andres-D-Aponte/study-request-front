import {
  Component,
  EventEmitter,
  inject,
  Input,
  OnInit,
  Output,
  ViewChild,
} from '@angular/core';
import { PrimeModule } from '../../../../shared/lib/prime-module';
import { CommonModule, UpperCasePipe } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Table } from 'primeng/table';
import { Router } from '@angular/router';

export interface Column {
  field: string;
  header: string;
  sortable?: boolean;
  type?: 'status' | 'image' | 'rating' | 'text' | 'date';
}

@Component({
  selector: 'app-table',
  standalone: true,
  imports: [PrimeModule, CommonModule, FormsModule, UpperCasePipe],
  templateUrl: './table.component.html',
  styles: [
    `
      :host ::ng-deep .p-dialog .product-image {
        width: 150px;
        margin: 0 auto 2rem auto;
        display: block;
      }
    `,
  ],
})
export class TableComponent<T> implements OnInit {
  @ViewChild('dt') dt!: Table;
  @Input() title: string = 'Tabla';
  @Input() columns: Column[] = [];
  @Input() data: T[] = [];
  @Input() selectionMode: 'single' | 'multiple' = 'single';
  @Input() selectedItems: T[] = [];
  @Input() rowHover: boolean = true;
  @Input() buttonLabel: string = 'Nuevo';
  @Input() buttonRoute!: string;
  @Output() edit = new EventEmitter<T>();
  @Output() delete = new EventEmitter<T>();

  router = inject(Router);

  columnFields: string[] = [];

  ngOnInit(): void {
    this.columnFields = this.columns.map((col) => col.field);
  }

  onFilter(event: Event) {
    const inputElement = event.target as HTMLInputElement;
    if (inputElement) {
      this.dt.filterGlobal(inputElement.value, 'contains');
    }
  }

  getSeverity(
    status: string | undefined
  ): 'success' | 'secondary' | 'info' | 'warning' | 'danger' | 'contrast' {
    if (!status) return 'info';

    const severityMap: Record<
      string,
      'success' | 'secondary' | 'info' | 'warning' | 'danger' | 'contrast'
    > = {
      completado: 'success',
      pendiente: 'warning',
      inactiva: 'danger',
    };

    return severityMap[status.toLowerCase()] || 'info';
  }

  onEdit(item: T): void {
    this.edit.emit(item);
  }

  onDelete(item: T): void {
    this.delete.emit(item);
  }

  goToNewPage() {
    if (this.buttonRoute) {
      this.router.navigate([this.buttonRoute]);
    }
  }
}
