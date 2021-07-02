import { Component, EventEmitter, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-prompt-modal',
  templateUrl: './prompt-modal.component.html',
  styleUrls: ['./prompt-modal.component.scss']
})
export class PromptModalComponent implements OnInit {
  @Output() acceptEvent = new EventEmitter<number>();
  constructor() { }

  ngOnInit(): void {
  }

  close = (type: number) => {
    this.acceptEvent.emit(type);
  }

}
