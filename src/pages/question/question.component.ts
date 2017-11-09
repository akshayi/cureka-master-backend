import {Component, ViewChild, ElementRef, OnInit} from '@angular/core';
import { DataService } from '../../services/services.component';

declare var toastr: any;
declare var swal: any;
declare var $: any;
@Component({
  selector: 'add-question',
  templateUrl: 'question.component.html'
})

export class Add_QuestionComponent implements OnInit{

  constructor(private apiService: DataService) {

  }
  ngOnInit() {

  }


}
