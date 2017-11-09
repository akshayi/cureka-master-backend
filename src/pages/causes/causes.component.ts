import {Component, ViewChild, ElementRef, OnInit} from '@angular/core';
import { DataService } from '../../services/services.component';

declare var toastr: any;
declare var swal: any;
declare var $: any;

@Component({
  selector: 'add-causes',
  templateUrl: 'causes.component.html'
})

export class Add_CausesComponent implements OnInit {
  name: string = '';
  causes = [];
  radioVal = "No";
  medicines = [];
  constructor(private apiService: DataService) {

  }

  ngOnInit() {
    this.getAllCauses();
    this.getAllMedicines();
    $(".select2_demo_2").select2();
    $('.dataTables-example').DataTable({
      pageLength: 25,
      responsive: true,
      dom: '<"html5buttons"B>lTfgitp',
      buttons: [
        { extend: 'copy' },
        { extend: 'csv' },
        { extend: 'excel', title: 'ExampleFile' },
        { extend: 'pdf', title: 'ExampleFile' },

        {
          extend: 'print',
          customize: function(win) {
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

  radioImg(val) {
    this.radioVal = val;
  }

  causeSubmit() {
    toastr.options = {
      closeButton: true,
      progressBar: true,
      showMethod: 'slideDown',
      timeOut: 4000
    };
    if (this.name == '') {
      toastr.error("Please Enter Cause Name!!");
      return 0;
    }
    let data = { name: this.name, is_image: this.radioVal };
    this.apiService.addCauses(data)
      .then(data => {
        if (data.status) {
          this.name = '';
          this.causes = data.data;
          toastr.success(data.message);
        } else {
          this.name = '';
          toastr.error(data.message);
        }
      },
      error => { toastr.error("Server Error"); })
  }

  deleteCause(id) {
    var _this = this;
    swal({
      title: "Are you sure?",
      type: "warning",
      showCancelButton: true,
      confirmButtonColor: "#DD6B55",
      confirmButtonText: "Yes, delete it!",
      cancelButtonText: "No, cancel",
      closeOnConfirm: false,
      closeOnCancel: false
    },
      function(isConfirm) {
        if (isConfirm) {
          _this.apiService.removeCauses({ id: id })
            .then(data => {
              if (data.status) {
                _this.causes = data.data;
                swal("Deleted!", "Cause Successfully Deleted", "success");
              } else {
                swal("Error", data.message, "error");
              }
            },
            error => { swal("Error", "Server Error!!!", "error"); })
        } else {
          swal("Cancelled", "Your Cause is safe.", "error");
        }
      });
  }

  getAllCauses() {
    this.apiService.getCauses()
      .then(data => {
        if (data.status) {
          this.causes = data.data;
        }
      });
  }

  getAllMedicines() {
    this.apiService.getMedicines()
      .then(data => {
        if (data.status) {
          this.medicines = data.data;
        }
      });
  }

  addQuestion() {
    var html = '<div class="form-group qustAttr"><label class="col-sm-2 control-label">Question</label><div class="col-sm-7">' +
      '<input type="text" name="name" class="form-control inputMain" placeholder="Question" value="" required="">' +
      '</div><div class="col-sm-2"><div class="btn-group">' +
      '<button data-toggle="dropdown" class="btn btn-primary dropdown-toggle" aria-expanded="false">Action <span class="caret"></span></button>' +
      '<ul class="dropdown-menu addInp">' +
      '<li attr="text/TextBox"><a>TextBox</a></li>' +
      '<li attr="radio/Radio Button"><a>Radio Button</a></li>' +
      '<li attr="date/Date Picker"><a>Options</a></li>' +
      '</ul>' +
      '</div>&nbsp<button class="btn btn-danger btn-circle deleteQues" type="button"><i class="fa fa-times"></i>' +
      '</button></div><div class="addHtm"></div></div>';
    $('.htmlAdd').append(html);
    $('.deleteQues').click(function(e) {
      $(e.currentTarget).parents('.qustAttr').remove();
    })
    var htmChild = '';
    $('.addInp li').click(function(e) {
      $(e.currentTarget).parents('.qustAttr').children('.addHtm').html('');
      $(e.currentTarget).parents('.inputMain').attr("btnVal", $(e.currentTarget).attr('attr'));
      var type = $(e.currentTarget).attr('attr');
      type = type.split('/');
      if (type[0] == 'text') {
        htmChild = '<label class="col-sm-2 control-label">Related Question</label><div class="col-sm-7">' +
          '<input type="text" name="name" class="form-control" placeholder="Related Question" value="" required="">' +
          '</div>';
      } else if (type[0] == 'date') {
        htmChild = '<div class="col-sm-7 col-sm-offset-2 ">' +
          '<input type="text" name="name" class="form-control" placeholder="Option Value" value="" required="">' +
          '</div><div class="col-sm-2"><button class="btn btn-success btn-circle addOption" type="button"><i class="fa fa-plus"></i>' +
          '</button>&nbsp <button class="btn btn-warning btn-md addOptionQues" type="button">Add Question' +
          '</button></div>';
      } else {
        htmChild = '<div class="col-sm-7 col-sm-offset-2">' +
          '<input type="text" name="name" class="form-control" placeholder="Radio Value" value="" required="">' +
          '</div><div class="col-sm-2"><button class="btn btn-success btn-circle addRadio" type="button"><i class="fa fa-plus"></i>' +
          '</button>&nbsp; <button class="btn btn-warning btn-md addRadioQues" type="button">Add Question' +
          '</button></div>';
      }
      $(e.currentTarget).parents('.qustAttr').children('.addHtm').html(htmChild);
      $('.addRadio').on('click', function(e) {
        var html = '<div class="col-sm-7 col-sm-offset-2">' +
          '<input type="text" name="name" class="form-control" placeholder="Radio Value" value="" required="">' +
          '</div><div class="col-sm-2"><button class="btn btn-warning btn-md addRadioQues" type="button">Add Question' +
          '</button></div>';
        $(e.currentTarget).parents('.qustAttr').children('.addHtm').append(html);
        $('.addRadioQues').on('click', function(e) {
          var htmChild = '<div class="col-sm-7 col-sm-offset-2">' +
            '<input type="text" name="name" class="form-control" placeholder="Related Question" value="" required="">' +
            '</div><div class="col-sm-3"></div>';
          $(e.currentTarget).parents('.qustAttr').children('.addHtm').append(htmChild);
        })
      })
      $('.addOption').on('click', function(e) {
        var html = '<div class="col-sm-7 col-sm-offset-2">' +
          '<input type="text" name="name" class="form-control" placeholder="Option Value" value="" required="">' +
          '</div>';
        $(e.currentTarget).parents('.qustAttr').children('.addHtm').append(html);
        $('.addOptionQues').on('click', function(e) {
          var htmChild = '<div class="col-sm-7 col-sm-offset-2">' +
            '<input type="text" name="name" class="form-control" placeholder="Related Question" value="" required="">' +
            '</div><div class="col-sm-3"></div>';
          $(e.currentTarget).parents('.qustAttr').children('.addHtm').append(htmChild);
        })
      })

      $('.addRadioQues').on('click', function(e) {
        var htmChild = '<div class="col-sm-7 col-sm-offset-2">' +
          '<input type="text" name="name" class="form-control" placeholder="Related Question" value="" required="">' +
          '</div><div class="col-sm-3"></div>';
        $(e.currentTarget).parents('.qustAttr').children('.addHtm').append(htmChild);
      })
      $('.addOptionQues').on('click', function(e) {
        var htmChild = '<div class="col-sm-7 col-sm-offset-2">' +
          '<input type="text" name="name" class="form-control" placeholder="Related Question" value="" required="">' +
          '</div><div class="col-sm-3"></div>';
        $(e.currentTarget).parents('.qustAttr').children('.addHtm').append(htmChild);
      })


    })


  }

  deleteQuestion() {
    console.log('yesss')
  }
}
