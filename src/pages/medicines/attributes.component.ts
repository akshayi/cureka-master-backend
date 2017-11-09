import {Component, ViewChild, ElementRef, OnInit} from '@angular/core';
import { DataService } from '../../services/services.component';

declare var toastr: any;
declare var swal: any;
declare var $: any;
@Component({
  selector: 'add-attributes',
  templateUrl: 'attributes.component.html'
})

export class Add_AttributesComponent implements OnInit{
  name: string = '';
  _selectedFields ='';
  attributes=[];
  constructor(private apiService: DataService) {

  }

  ngOnInit() {
  this.getAllAttributes();
  $(".chosen-select").select2();
  $('.chosen-select').on(
          'change',
          (e) => this._selectedFields = $(e.target).val()
      );
  $('.dataTables-example').DataTable({
      pageLength: 25,
      responsive: true,
      dom: '<"html5buttons"B>lTfgitp',
      buttons: [
          { extend: 'copy'},
          {extend: 'csv'},
          {extend: 'excel', title: 'ExampleFile'},
          {extend: 'pdf', title: 'ExampleFile'},

          {extend: 'print',
           customize: function (win){
                  $(win.document.body).addClass('white-bg');
                  $(win.document.body).css('font-size', '10px');

                  $(win.document.body).find('table')
                          .addClass('compact')
                          .css('font-size', 'inherit');
          }
          }
      ]

  });
  }

  attrSubmit() {
    toastr.options = {
      closeButton: true,
      progressBar: true,
      showMethod: 'slideDown',
      timeOut: 4000
    };
    if(this.name =='' || this._selectedFields==''){
      toastr.error("All Fields Are Mandatory.!!");
      return 0;
    }
    let data = { name: this.name,type: this._selectedFields };
    this.apiService.addAttributes(data)
      .then(data => {
        if (data.status) {
          this.name ='';
          this._selectedFields='';
          this.attributes=data.data;
          $(".chosen-select").select2("val", "");
          toastr.success(data.message);
        } else {
        this.name ='';
        this._selectedFields='';
        $(".chosen-select").select2("val", "");
          toastr.error(data.message);
        }
      },
      error => { toastr.error("Server Error"); })
  }

  deleteAttribute(id){
  var _this = this;
      swal({
              title: "Are you sure?",
              type: "warning",
              showCancelButton: true,
              confirmButtonColor: "#DD6B55",
              confirmButtonText: "Yes, delete it!",
              cancelButtonText: "No, cancel",
              closeOnConfirm: false,
              closeOnCancel: false },
              function (isConfirm) {
              if (isConfirm) {
              _this.apiService.removeAttributes({id:id})
                .then(data => {
                  if (data.status) {
                  _this.attributes=data.data;
                    swal("Deleted!", "Attribute Successfully Deleted", "success");
                  } else {
                    swal("Error", data.message, "error");
                  }
                },
                error => { swal("Error", "Server Error!!!", "error"); })
              } else {
                  swal("Cancelled", "Your Attribute is safe.", "error");
              }
          });
  }

  getAllAttributes(){
    this.apiService.getAttributes()
    .then(data => {
      if (data.status) {
        this.attributes=data.data;
      }
    });
    }
}
