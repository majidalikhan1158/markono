import { Component, OnInit, Input, SimpleChange, OnChanges } from '@angular/core';
import { CreateCaseMode } from 'src/app/modules/shared/enums/app-constants';

@Component({
  selector: 'app-summary',
  templateUrl: './summary.component.html',
  styleUrls: ['./summary.component.scss']
})
export class SummaryComponent implements OnInit {
  @Input() createCaseMode: CreateCaseMode;
  constructor() { }

  ngOnInit(): void {
  } 
}
