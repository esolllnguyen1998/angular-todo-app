import { Component, Output, EventEmitter, Input } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'confirm-modal',
  templateUrl: './confirm-modal.component.html'
})
export class ConfirmModalComponent {
  @Input() todoIndex: number = 0;
  @Output() handleConfirmClick: EventEmitter<any> = new EventEmitter();
  constructor(public activeModal: NgbActiveModal) { }

  onConfirmClick() {
    this.handleConfirmClick.emit(this.todoIndex);
    this.activeModal.close();
  }
}
