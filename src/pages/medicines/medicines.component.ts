import {Component, ViewChild, ElementRef, OnInit} from '@angular/core';
import { DataService } from '../../services/services.component';

declare var toastr: any;
declare var swal: any;
declare var $: any;
@Component({
  selector: 'add-medicines',
  templateUrl: 'medicines.component.html'
})

export class Add_MedicinesComponent implements OnInit{
  attributes=[];
  name: string='';
  medicines=[];
  _selectedFields: Array<string> = [];
  imgpath:any;
  constructor(private apiService: DataService) {

  }
  ngOnInit() {
    this.getAllAttributes();
    this.getAllMedicines();
    $(".select2_demo_2").select2();
    $('.select2_demo_2').on(
            'change',
            (e) =>  this.htmlAttribute($(e.target).val())
        );
  }

  getAllAttributes(){
    this.apiService.getAttributes()
    .then(data => {
      if (data.status) {
        this.attributes=data.data;
      }
    });
    }

    fileChange(event) {
    toastr.options = {
      closeButton: true,
      progressBar: true,
      showMethod: 'slideDown',
      timeOut: 4000
    };
    let fileList: FileList = event.target.files;
    if(fileList.length > 0) {
        let file: File = fileList[0];
        let formData:FormData = new FormData();
        formData.append('file', file, file.name);
        this.apiService.uploadImage(formData)
          .then(data => {
            if (data.status) {
              this.imgpath=data.data;
              toastr.success(data.message);
            } else {
              toastr.error(data.message);
            }
          },
          error => { toastr.error("Server Error"); })
    }
}

removeImg(){
  this.imgpath=false;
}

 mediSubmit(){
var attrArr=[];
toastr.options = {
  closeButton: true,
  progressBar: true,
  showMethod: 'slideDown',
  timeOut: 4000
};
  this._selectedFields= this.getAttributeArray()
  if(this.name ==''){
  toastr.error("Please Enter Medicine Name!!");
  return 0;
  }else if(this._selectedFields.length==$('.attrib').length){
  let data = { name: this.name,attributes:this._selectedFields,filepath:this.imgpath };
  this.apiService.addMedicines(data)
    .then(data => {
      if (data.status) {
        this.name='';
        this._selectedFields=[];
        this.imgpath=false;
        this.medicines=data.data;
        toastr.success(data.message);
        $(".fileinput-exists").click();
        $(".select2_demo_2").select2("val", "");
      } else {
        this.name='';
        this._selectedFields=[];
        this.imgpath=false;
        toastr.error(data.message);
        $(".fileinput-exists").click();
        $(".select2_demo_2").select2("val", "");
      }
    },
    error => { toastr.error("Server Error"); })
}else{
toastr.error("You are entering text in number fields !!");
}

}

deleteMedicine(id){
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
            _this.apiService.removeMedicines({id:id})
              .then(data => {
                if (data.status) {
                _this.medicines=data.data;
                  swal("Deleted!", "Medicine Successfully Deleted", "success");
                } else {
                  swal("Error", data.message, "error");
                }
              },
              error => { swal("Error", "Server Error!!!", "error"); })
            } else {
                swal("Cancelled", "Your Medicine is safe.", "error");
            }
        });
}

getAllMedicines(){
  this.apiService.getMedicines()
  .then(data => {
    if (data.status) {
      this.medicines=data.data;
    }
  });
  }

  clearBtn(){
  this.name='';
  this._selectedFields=[];
  this.imgpath=false;
  $(".select2_demo_2").select2("val", "");
    }

    htmlAttribute(data){
    $('.appendHtml').html('');
    data.forEach(function(r){
    var es = r.split('/');
    let name = es[0];
    let type = es[1].toLowerCase();
    let attr =name.replace(/\s/g,'');
    var s='';
    s += '<div class="form-group"><label class="col-sm-2 control-label">'+name+'</label><div class="col-sm-10"><input type="'+type+'" name="name" class="form-control attrib" placeholder="'+name+' ('+type+')" attr="'+attr.toLowerCase()+'"  value="" required=""></div></div><div class="hr-line-dashed"></div>';
    $('.appendHtml').append(s);
    })

    }

    getAttributeArray(){
    var attrArr=[];
      $(".attrib").each(function(e){
          let atrb= $(this).attr('attr');
          let valu = $(this).val();
          if(valu==""){
          toastr.error("Please Fill the Attributes");
          return 0;
          }
          attrArr.push({'key':atrb,'value':valu})
      });
      return attrArr;
    }
}
