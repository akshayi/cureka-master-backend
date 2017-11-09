import {Component , Inject, ViewContainerRef, OnInit } from "@angular/core";
declare var $: any;

@Component({
  selector: 'homepage',
  styleUrls: ['home.scss'],
  templateUrl: 'home.component.html'
})

export class HomepageComponent implements OnInit{


  constructor() {

  }

  ngOnInit() {
    $(".select2_demo_2").select2();
}
}
