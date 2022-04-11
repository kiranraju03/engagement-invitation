/* global toastr */

function stick_toster_message_error(msg, title, behaviour) { //behaviour = success, warning, error
    toastr.options = {
        autoDismiss: false,
        "closeButton": true,
        "debug": false,
        "progressBar": false,
        "positionClass": "toast-top-center",
        "showDuration": "300",
        "hideDuration": "1000",
        "timeOut": "0",
        "extendedTimeOut": "1000",
        "showEasing": "swing",
        "hideEasing": "linear",
        "showMethod": "fadeIn",
        "hideMethod": "fadeOut"
    }
    toastr[behaviour](msg, title)
}

function toster_message_error(msg, title, behaviour) { //behaviour = success, warning, error
    toastr.options = {
        "closeButton": true,
        "debug": false,
        "progressBar": true,
        "positionClass": "toast-top-right",
        "showDuration": "300",
        "hideDuration": "1000",
        "timeOut": "20000",
        "extendedTimeOut": "1000",
        "showEasing": "swing",
        "hideEasing": "linear",
        "showMethod": "fadeIn",
        "hideMethod": "fadeOut"
    }
    toastr[behaviour](msg, title)
}
function toster_message(msg, title, behaviour) { //behaviour = success, warning, error
    toastr.options = {
        "closeButton": true,
        "debug": false,
        "progressBar": true,
        "positionClass": "toast-top-right",
        "showDuration": "300",
        "hideDuration": "1000",
        "timeOut": "5000",
        "extendedTimeOut": "1000",
        "showEasing": "swing",
        "hideEasing": "linear",
        "showMethod": "fadeIn",
        "hideMethod": "fadeOut"
    }
    toastr[behaviour](msg, title)
}


function get_updated_datatable() {

    $('#add_edit_form').slideUp(500, function () {
        $('#display_update_form').html('');
    });

    if ($(".dataTables_paginate li.active a").length > 0)
        $(".dataTables_paginate li.active a").trigger("click");
    else
        $(".dataTable th:eq(0)").trigger("click");
}

$(document).on("click", ".remove_image", function (event) {
    var data_id = $(this).children("img").attr('data-id');
    $(this).css('opacity', '0.3');
    $('#delete_image').val($('#delete_image').val() + data_id + ',');
    $(this).removeClass('remove_image');
    $(this).addClass('add_image');
});



       
  
       
$(document).ready(function () {
         
//VanillaToasts.create({
//          title: 'test',
//          text: 'Hi, There!',
//          type: 'success',
//          icon: LOGO_URL,
//          timeout: 50000
//        });
//   custom_toaster('test','Hi, There!','sucess');
        
    $(document).on("change", ".state_dropdown", function (event) {
//        $("#SubCategory").html('<option value="">Select Sub Category</option>');
        var StateID = $(this).val();
        $.ajax({
            type: 'POST',
            url: BASE_URL + 'common-ajax/get_city',
            data: {StateID: StateID},
            dataType: 'json',
            success: function (returnData) {
                if (returnData.status == "ok") {
                    $("#City").html('');
                    $('#City').html('<option value=""></option>');
//                    $("#City").select2("val", "");
                    $.each(returnData.data, function (idx, topic) {
                        $("#City").append('<option value="' + idx + '">' + topic + '</option>');
                    });
                }
            },
            error: function (xhr, textStatus, errorThrown) {
                toster_message('There was an unknown error that occurred. You will need to refresh the page to continue working.','error','error');
            },
            complete: function () {
                $('input[type="submit"]').val('Submit').removeAttr('disabled');
            }
        });
        return false;
    });
    // toster_message('hi', 'test', 'success');
    if ($('.common_datatable_live').length > 0) {
//        alert('hi')
//        var add_button = 0;
//        var add_button_title = 'Add New';
//        if (typeof $('.common_datatable_live').attr('data-add-button') != "undefined") {
//            add_button = 1;
//        }
        var $url = BASE_URL + $('.common_datatable_live').attr('data-control') + '/' + $('.common_datatable_live').attr('data-mathod');
        var oTable1 = $('.common_datatable_live').dataTable({
            "bProcessing": true,
            "bServerSide": true,
            "sServerMethod": "POST",
            "sAjaxSource": $url,
            "searching": false,
            "sDom": "<'row'<'col-md-6'l <'toolbar'>><'col-md-6'f>r>t<'row'<'col-md-12'p i>>",
            "bLengthChange": false,
            "fnServerParams": function (aoData, fnCallback) {
                
                if($('#chk_live_bank').is(":checked")) {
                    aoData.push(  {"name": "Bank", "value":  $('#chk_live_bank').val() } );
                 }
                if ($('#chk_live_insurance').is(":checked")) {
                    aoData.push(  {"name": "Insurance", "value":  $('#chk_live_insurance').val() } );
                }
                if ($('#StateNameList').length > 0) {
                    aoData.push(  {"name": "StateName", "value":  $('#StateNameList').val() } );
                }
                if ($('#CityNameList').length > 0) {
                    aoData.push(  {"name": "City_Name", "value":  $('#CityNameList').val() } );
                }
                if ($('#VehicleTypeList').length > 0) {
                    aoData.push(  {"name": "VehicleType", "value":  $('#VehicleTypeList').val() } );
                }
                if ($('#MakeNameList').length > 0) {
                    aoData.push(  {"name": "MakeName", "value":  $('#MakeNameList').val() } );
                }
                
            },
            "fnInitComplete": function () {
                $('.tooltip-top a').tooltip();

//                $('select').select2({
//                    minimumResultsForSearch: -1
//                });
//                if (add_button == 1) {
//                    var $controller = $('.common_datatable_live').attr('data-control');
//                    $(".dataTables_wrapper .toolbar").html('<div class="table-tools-actions"><a class="btn btn-primary open_my_form_form" href="javascript:;" data-control="' + $controller + '">' + add_button_title + ' <i class="fa fa-plus"></i></a></div>');
//                }
                $('.search_mq').on('change', function () {
                    oTable1.fnDraw();
                });
                $('#chk_live_bank').change(function() {
                    oTable1.fnDraw();
                });
                $('#chk_live_insurance').change(function() {
                    oTable1.fnDraw();
                });
                
            },
            "fnDrawCallback": function () {
                $('.tooltip-top a').tooltip();

            },
            "oLanguage": {"sLengthMenu": "_MENU_ ", "sInfo": "Showing <b>_START_ to _END_</b> of _TOTAL_ entries"},
        });

    }
    if ($('.common_datatable_upcoming').length > 0) {
//        alert('hi')
//        var add_button = 0;
//        var add_button_title = 'Add New';
//        if (typeof $('.common_datatable_upcoming').attr('data-add-button') != "undefined") {
//            add_button = 1;
//        }
        var $url = BASE_URL + $('.common_datatable_upcoming').attr('data-control') + '/' + $('.common_datatable_upcoming').attr('data-mathod');
        var oTable = $('.common_datatable_upcoming').dataTable({
            "bProcessing": true,
            "bServerSide": true,
            "sServerMethod": "POST",
            "sAjaxSource": $url,
            "sDom": "<'row'<'col-md-6'l <'toolbar'>><'col-md-6'f>r>t<'row'<'col-md-12'p i>>",
            "bLengthChange": false,
            "fnServerParams": function (aoData, fnCallback) {

                if($('#chk_upcoming_bank').is(":checked")) {
                    aoData.push(  {"name": "Bank1", "value":  $('#chk_upcoming_bank').val() } );
                 }
                if ($('#chk_upcoming_insurance').is(":checked")) {
                    aoData.push(  {"name": "Insurance1", "value":  $('#chk_upcoming_insurance').val() } );
                }
                if ($('#upcomingStateNameList').length > 0) {
                    aoData.push(  {"name": "StateName", "value":  $('#upcomingStateNameList').val() } );
                }
                if ($('#upcomingCityNameList').length > 0) {
                    aoData.push(  {"name": "City_Name", "value":  $('#upcomingCityNameList').val() } );
                }
                if ($('#upcomingVehicleTypeList').length > 0) {
                    aoData.push(  {"name": "VehicleType", "value":  $('#upcomingVehicleTypeList').val() } );
                }
                if ($('#upcomingMakeNameList').length > 0) {
                    aoData.push(  {"name": "MakeName", "value":  $('#upcomingMakeNameList').val() } );
                }
            },
            "fnInitComplete": function () {
                $('.tooltip-top a').tooltip();

//                $('select').select2({
//                    minimumResultsForSearch: -1
//                });
//                if (add_button == 1) {
//                    var $controller = $('.common_datatable_upcoming').attr('data-control');
//                    $(".dataTables_wrapper .toolbar").html('<div class="table-tools-actions"><a class="btn btn-primary open_my_form_form" href="javascript:;" data-control="' + $controller + '">' + add_button_title + ' <i class="fa fa-plus"></i></a></div>');
//                }
                $('.search_mq').on('change', function () {
                    oTable.fnDraw();
                });
                $('#chk_upcoming_bank').change(function() {
                    oTable.fnDraw();
                });
                $('#chk_upcoming_insurance').change(function() {
                    oTable.fnDraw();
                });
            },
            "fnDrawCallback": function () {
                $('.tooltip-top a').tooltip();

            },
            "oLanguage": {"sLengthMenu": "_MENU_ ", "sInfo": "Showing <b>_START_ to _END_</b> of _TOTAL_ entries"},
        });

    }

    $(document).on("click", ".btn.open_my_form_form", function (event) {

        var data_id = $(this).attr('data-id');
        var controller = $(this).attr('data-control');
        var $url = 'add';
        if (data_id > 0) {
            $url = 'edit/' + data_id;
        }
        $.ajax({
            type: 'POST',
            url: controller + '/' + $url,
            async: false,
            data: 'pstdata=1',
            dataType: 'html',
            beforeSend: function () {
                $('#display_update_form').html('<div class="loader_wrapper"><div class="loader"></div></div>');
                $('#add_edit_form').show();
            },
            success: function (returnData) {
                setTimeout(function () {
                    $('#display_update_form').html(returnData);
                    $("select.select2").select2();
                }, 500);

//                if ($("#section_start_time").length > 0) {
//                    $("#section_start_time").timepicker();
//                    $("#section_end_time").timepicker();
//                }

//                $("#display_update_form :file").filestyle({buttonText: "&nbsp; Upload", buttonName: "btn-primary", placeholder: "No file selected", buttonBefore: true});

                $('#display_update_form select').select2();

                $('.load_hide').hide();

//                $('.its_date_field').daterangepicker({
//                    singleDatePicker: true,
//                    format: 'DD-MM-YYYY',
//                    calender_style: "picker_1"
//                }, function (start, end, label) {
//
//                });

//                $('.its_time_field').timepicker({
//                    timeFormat: 'h:mm p',
//                    interval: 05,
//                    minTime: '6',
//                    maxTime: '11:00 PM',
////                    defaultTime: '6',
//                    startTime: '6:00 AM',
//                    dynamic: false,
//                    dropdown: true,
//                    scrollbar: true
//                });



            },
            error: function (xhr, textStatus, errorThrown) {
                $('#add_edit_form').slideUp(500, function () {
                    $('#display_update_form').html('');

                });
                toster_message('There was an unknown error that occurred. You will need to refresh the page to continue working.','error','error');
            },
            complete: function () {
            }
        });

        return false;

    });

    $(document).on("click", ".cancel_button", function (event) {
        $('#add_edit_form').slideUp(500, function () {
            $('#display_update_form').html('');
        });
        return false;
    });

    $(document).on("submit", "form.default_form", function (event) {

        var formData = new FormData($(this)[0]);
        var formID = $(this).attr('id');
        $('.span-error').html('');
        var form = $(this);
        $.ajax({
            type: 'POST',
            url: $(this).attr('action'),
            data: formData,
            dataType: 'json',
            cache: false,
            contentType: false,
            processData: false,
            beforeSend: function () {
                $('.alert.alert-danger').slideUp(500).remove();
                $('input[type="submit"]').val('Please wait..!').attr('disabled', 'disabled');
            },
            success: function (returnData) {

                if (returnData.status == "ok") {
//                    showSuccess(returnData.message);
                    toster_message(returnData.message,'','success');
//                    get_updated_datatable();
                    setTimeout(function () {
                        if (formID == 'login' || formID == 'register_frm') {
                            window.location.href = BASE_URL + 'change-password';
                        } else if (formID == 'add_game') {
                            window.location.href = BASE_URL + 'my-tickets';
                        }else {
                            window.location.reload();
                        }
                    }, 5000);

                } else {
                    var error_html = '';
                    if (typeof returnData.error != "undefined") {
                        $.each(returnData.error, function (idx, topic) {
                            error_html += '<li>' + topic + '</li>';
                        });
                    }
                    if (error_html != '') {
//                        showErrorMessage(error_html);
                        toster_message(error_html,'','error');
                    } else {
                        toster_message(returnData.message,'','error');
                    }
                    var error_html = '';
                    if (typeof returnData.error != "undefined") {
                        // console.log("keys:",Object.keys(returnData.errors)[0]);
                        var key = Object.keys(returnData.error)[0];
                        var ind = key.indexOf("[");
                        console.log("error", key);
                        $.each(returnData.error, function (idx, topic) {
                            console.log("idx", idx);
                            // Object.keys(returnData.errors)[0];
                            var ind = idx.indexOf("[");
                            if (ind != -1) {
                                $(form).find('#span-error-' + idx.substring(0, ind)).html(topic);
                            } else {
                                $(form).find('#span-error-' + idx).html(topic);
                            }
                        });
                        setTimeout(function () {
                            $.each(returnData.error, function (idx, topic) {
                                // Object.keys(returnData.errors)[0];
                                var ind = idx.indexOf("[");
                                if (ind != -1) {
                                    $(form).find('#span-error-' + idx.substring(0, ind)).html('');
                                } else {
                                    $(form).find('#span-error-' + idx).html('');
                                }
                            });
                        }
                        , 10000);
                    }

                }
            },
            error: function (xhr, textStatus, errorThrown) {
                toster_message('There was an unknown error that occurred. You will need to refresh the page to continue working.','error','error');
            },
            complete: function () {
                $('input[type="submit"]').val('Submit').removeAttr('disabled');
            }
        });
        return false;

    });
    
    $(document).on("click", "a.export-live-event", function (event) {
        var $controller = 'live-auctions';
        var data_id = $(this).attr('data-id');
        var $validation_error = '';

//        var $param = 'start_date=' + $('#start_date').val();
//        $param += '&end_date=' + $('#end_date').val();
//        var $url = BASE_URL + $controller + '/loan_request_export/?' + $param;
        
        var $url = BASE_URL + $controller + '/live_event_export/' + data_id;
//            window.location.href = $controller + '/pdf-download/?'+$param;
        window.location.href = $url;
//            window.open($url, '_blank');

    });
    $(document).on("click", "a.export-upcoming-event", function (event) {
        var $controller = 'upcoming-auctions';
        var data_id = $(this).attr('data-id');
        var $validation_error = '';

        var $url = BASE_URL + $controller + '/upcoming_event_export/' + data_id;
//            window.location.href = $controller + '/pdf-download/?'+$param;
        window.location.href = $url;
//            window.open($url, '_blank');

    });
    $(document).on("click", ".edit_invite", function (event) {
        var $controller = 'invitations';
        var data_id = $(this).attr('data-id');
//        var data_theme_id = $(this).attr('data-theme-id');
        var $url = BASE_URL + $controller + '/edit/' + data_id + '/' + 1;
        window.location.href = $url;
    });
    
    $(document).on("submit", ".bid_form", function (event) {
        var formData = new FormData($(this)[0]);
        var formID = $(this).attr('id');
//         alert(formID)
        $.ajax({
            type: 'POST',
            url: $(this).attr('action'),
            data: formData,
            dataType: 'json',
            cache: false,
            contentType: false,
            processData: false,
            beforeSend: function () {
                $('.alert.alert-danger').slideUp(500).remove();
                $('input[type="submit"]').val('Please wait..!').attr('disabled', 'disabled');
            },
            success: function (returnData) {

                if (returnData.status == "ok") {
                    toster_message(returnData.message, returnData.heading, 'success');

                    setTimeout(function () {
                        if (formID == 'bid_form') {
                            window.location.reload();
                        } 
                    }, 5000);
                } else {
                    var error_html = '';
                    if (typeof returnData.error != "undefined") {
                        $.each(returnData.error, function (idx, topic) {
                            error_html += '<li>' + topic + '</li>';
                        });
                    }
                    if (error_html != '') {
                        toster_message_error(error_html, 'Error', 'error');
                    } else {
                        toster_message(returnData.message, returnData.heading, 'error');
                    }
                }
            },
            error: function (xhr, textStatus, errorThrown) {
                toster_message('There was an unknown error that occurred. You will need to refresh the page to continue working.', 'Error', 'error');
            },
            complete: function () {
                $('input[type="submit"]').val('BID NOW').removeAttr('disabled');
            }
        });

        return false;

    });
    
    $(document).on("submit", ".contact-forms", function (event) {
        var formData = new FormData($(this)[0]);
        var formID = $(this).attr('id');
        // alert(formID)
        $.ajax({
            type: 'POST',
            url: $(this).attr('action'),
            data: formData,
            dataType: 'json',
            cache: false,
            contentType: false,
            processData: false,
            beforeSend: function () {
                $('.alert.alert-danger').slideUp(500).remove();
                $('input[type="submit"]').val('Please wait..!').attr('disabled', 'disabled');
            },
            success: function (returnData) {

                if (returnData.status == "ok") {
//                    toster_message(returnData.message, returnData.heading, 'success');
                    $('.contact-forms').find('#span-success').html(returnData.message);
                    setTimeout(function () {
//                        if (formID == 'footer-contact-form' || formID == 'contact-form') {
//                            window.location.reload();
//                        } else if (formID == 'forgot-password-form') {
//                            $('#login-form').show();
//                        } else {
                            window.location.href = BASE_URL;
//                        }
                    }, 5000);
                } else {
//                    var error_html = '';
//                    if (typeof returnData.error != "undefined") {
//                        $.each(returnData.error, function (idx, topic) {
//                            error_html += '<li>' + topic + '</li>';
//                        });
//                    }
//                    if (error_html != '') {
//                        toster_message_error(error_html, 'Error', 'error');
//                    } else {
//                        toster_message(returnData.message, returnData.heading, 'error');
//                    }
                      var error_html = '';
                    if (typeof returnData.error != "undefined") {
                        // console.log("keys:",Object.keys(returnData.errors)[0]);
                        var key = Object.keys(returnData.error)[0];
                        var ind = key.indexOf("[");
                        console.log("error", key);
                        $.each(returnData.error, function (idx, topic) {
                            console.log("idx", idx);
                            // Object.keys(returnData.errors)[0];
                            var ind = idx.indexOf("[");
                            if (ind != -1) {
                                $('.contact-forms').find('#span-error-' + idx.substring(0, ind)).html(topic);
                            } else {
                                $('.contact-forms').find('#span-error-' + idx).html(topic);
                            }
                        });
                        setTimeout(function () {
                            $.each(returnData.error, function (idx, topic) {
                                // Object.keys(returnData.errors)[0];
                                var ind = idx.indexOf("[");
                                if (ind != -1) {
                                    $('.contact-forms').find('#span-error-' + idx.substring(0, ind)).html('');
                                } else {
                                    $('.contact-forms').find('#span-error-' + idx).html('');
                                }
                            });
                        }
                        , 10000);
                    }
                }
            },
            error: function (xhr, textStatus, errorThrown) {
                toster_message('There was an unknown error that occurred. You will need to refresh the page to continue working.', 'Error', 'error');
            },
            complete: function () {
                $('input[type="submit"]').val('Submit').removeAttr('disabled');
            }
        });

        return false;

    });
        $('#coupan_code').keyup(function(event) {
            var coupan_code=$('#coupan_code').val();
            if(coupan_code == ''){
                var formData = new FormData($('.coupan_form')[0]);
        //        alert (formData);
                var formID = $('.coupan_form').attr('id');
                var form = $('.coupan_form');
                // alert(formID)
                $.ajax({
                    type: 'POST',
                    url: $('.coupan_form').attr('action'),
                    data: formData,
                    dataType: 'json',
                    cache: false,
                    contentType: false,
                    processData: false,
                    beforeSend: function () {
                        $('.alert.alert-danger').slideUp(500).remove();
                        $('input[type="submit"]').val('Please wait..!').attr('disabled', 'disabled');
                        $('#pageloder').show();
                    },
                    success: function (returnData) {

                        if (returnData.status == "ok") {   
                            $('.coupon_success').removeClass('d-none');
                            if(returnData.DiscountType == 'Percentage'){
                                $('.coupon_success').html('<span class="success">🎉 Hurray! you got '+returnData.discount+'% discount</span>');
                            }else{
                                $('.coupon_success').html('<span class="success">🎉 Hurray! you got &#8377;'+returnData.discount+' discount</span>');                        
                            }
                            $('.coupon_failed').addClass('d-none');                        
                            $('.coupen_dis_amt').html('-&#8377;'+ returnData.coupan_discount_price);
                            $('.place_order').html('Proceed to pay '+ returnData.total_amount);
                            $('.main_price').html('&#8377;' + returnData.main_price);
                            $('.total_pay').html('&#8377;' + returnData.total_amount);
                            $('.theme_price').val(returnData.total_amount);
                            $('.coupan_code').val(returnData.coupan_code);
                            $('.coupan_id').val(returnData.coupan_id);
                            $('.coupan_discount').val(returnData.coupan_discount_price);
                        } else {
                            var error_html = '';
                            if (typeof returnData.error != "undefined") {
                                $.each(returnData.error, function (idx, topic) {
                                    error_html += '<li>' + topic + '</li>';
                                });
                            }
                            if (error_html != '') {
                                // toster_message_error(error_html, 'Error', 'error');
                            } else {
                                // toster_message(returnData.message, returnData.heading, 'error');
                            }
                            $('.coupon_success').addClass('d-none');
                            $('.coupon_failed').removeClass('d-none');                        
                            $('.coupen_dis_amt').html('-&#8377;'+ returnData.coupan_discount_price);
                            $('.place_order').html('Proceed to pay '+ returnData.total_amount);
                            $('.main_price').html('&#8377;' + returnData.main_price);
                            $('.total_pay').html('&#8377;' + returnData.total_amount);
                            $('.theme_price').val(returnData.total_amount);
                            $('.coupan_code').val(returnData.coupan_code);
                            $('.coupan_id').val(returnData.coupan_id);
                            $('.coupan_discount').val(returnData.coupan_discount_price);

                        }
                    },
                    error: function (xhr, textStatus, errorThrown) {
                        toster_message('There was an unknown error that occurred. You will need to refresh the page to continue working.', 'Error', 'error');
                    },
                    complete: function () {
                        $('input[type="submit"]').val('Submit').removeAttr('disabled');
                        $('#pageloder').hide();
                    }
                });

                return false;
            }
        });
    $(document).on("submit", ".coupan_form", function (event) {
//        alert('hi');
        var formData = new FormData($(this)[0]);
//        alert (formData);
        var formID = $(this).attr('id');
        var form = $(this);
        // alert(formID)
        $.ajax({
            type: 'POST',
            url: $(this).attr('action'),
            data: formData,
            dataType: 'json',
            cache: false,
            contentType: false,
            processData: false,
            beforeSend: function () {
                $('.alert.alert-danger').slideUp(500).remove();
                $('input[type="submit"]').val('Please wait..!').attr('disabled', 'disabled');
                $('#pageloder').show();
            },
            success: function (returnData) {

                if (returnData.status == "ok") {
                    // toster_message(returnData.message, returnData.heading, 'success');
                    $('.coupon_success').removeClass('d-none');
                    if(returnData.DiscountType == 'Percentage'){
                        $('.coupon_success').html('<span class="success">🎉 Hurray! you got '+returnData.discount+'% discount</span>');
                    }else{
                        $('.coupon_success').html('<span class="success">🎉 Hurray! you got &#8377;'+returnData.discount+' discount</span>');                        
                    }
                    $('.coupon_failed').addClass('d-none');
                    setTimeout(function () {
//                            window.location.reload();
                    }, 1000);
                            $('.coupen_dis_amt').html('-&#8377;'+ returnData.coupan_discount_price);
                            $('.place_order').html('Proceed to pay '+ returnData.total_amount);
                            $('.main_price').html('&#8377;' + returnData.main_price);
                            $('.total_pay').html('&#8377;' + returnData.total_amount);
                            $('.theme_price').val(returnData.total_amount);
                            $('.coupan_code').val(returnData.coupan_code);
                            $('.coupan_id').val(returnData.coupan_id);
                            $('.coupan_discount').val(returnData.coupan_discount_price);
                    
//                    $('#bill').html(returnData.html);
//                    $('.place_button').html(returnData.html_container);
                } else {
                    var error_html = '';
                    if (typeof returnData.error != "undefined") {
                        $.each(returnData.error, function (idx, topic) {
                            error_html += '<li>' + topic + '</li>';
                        });
                    }
                    if (error_html != '') {
                        // toster_message_error(error_html, 'Error', 'error');
                    } else {
                        // toster_message(returnData.message, returnData.heading, 'error');
                    }
                    $('.coupon_success').addClass('d-none');
                    
                    $('.coupon_failed').removeClass('d-none');
//                      var error_html = '';
//                    if (typeof returnData.error != "undefined") {
//                        // console.log("keys:",Object.keys(returnData.errors)[0]);
//                        var key = Object.keys(returnData.error)[0];
//                        var ind = key.indexOf("[");
//                        console.log("error", key);
//                        $.each(returnData.error, function (idx, topic) {
//                            console.log("idx", idx);
//                            // Object.keys(returnData.errors)[0];
//                            var ind = idx.indexOf("[");
//                            if (ind != -1) {
//                                $(form).find('#span-error-' + idx.substring(0, ind)).html(topic);
//                            } else {
//                                $(form).find('#span-error-' + idx).html(topic);
//                            }
//                        });
//                        setTimeout(function () {
//                            $.each(returnData.error, function (idx, topic) {
//                                // Object.keys(returnData.errors)[0];
//                                var ind = idx.indexOf("[");
//                                if (ind != -1) {
//                                    $(form).find('#span-error-' + idx.substring(0, ind)).html('');
//                                } else {
//                                    $(form).find('#span-error-' + idx).html('');
//                                }
//                            });
//                        }
//                        , 10000);
//                    }
                }
            },
            error: function (xhr, textStatus, errorThrown) {
                toster_message('There was an unknown error that occurred. You will need to refresh the page to continue working.', 'Error', 'error');
            },
            complete: function () {
                $('input[type="submit"]').val('Submit').removeAttr('disabled');
                $('#pageloder').hide();
            }
        });

        return false;

    });
    $(document).on("submit", ".special_invite", function (event) {
//        alert('hi');
        var formData = new FormData($(this)[0]);
        var formID = $(this).attr('id');
        var form = $(this);
        // alert(formID)
        $.ajax({
            type: 'POST',
            url: $(this).attr('action'),
            data: formData,
            dataType: 'json',
            cache: false,
            contentType: false,
            processData: false,
            beforeSend: function () {
                $('.alert.alert-danger').slideUp(500).remove();
                $('input[type="submit"]').val('Please wait..!').attr('disabled', 'disabled');
                $('#pageloder').show();
            },
            success: function (returnData) {

                if (returnData.status == "ok") {
//                    toster_message(returnData.message, returnData.heading, 'success');

                    setTimeout(function () {
//                        if (formID == 'footer-contact-form' || formID == 'contact-form') {
                            window.location.href = BASE_URL + 'invitations/edit/' +returnData.id ;
//                        } else if (formID == 'forgot-password-form') {
//                            $('#login-form').show();
//                        } else {
//                            window.location.href = BASE_URL;
//                        }
                    }, 1000);
                } else {
//                    var error_html = '';
//                    if (typeof returnData.error != "undefined") {
//                        $.each(returnData.error, function (idx, topic) {
//                            error_html += '<li>' + topic + '</li>';
//                        });
//                    }
//                    if (error_html != '') {
//                        toster_message_error(error_html, 'Error', 'error');
//                    } else {
//                        toster_message(returnData.message, returnData.heading, 'error');
//                    }
                      var error_html = '';
                    if (typeof returnData.error != "undefined") {
                        // console.log("keys:",Object.keys(returnData.errors)[0]);
                        var key = Object.keys(returnData.error)[0];
                        var ind = key.indexOf("[");
                        console.log("error", key);
                        $.each(returnData.error, function (idx, topic) {
                            console.log("idx", idx);
                            // Object.keys(returnData.errors)[0];
                            var ind = idx.indexOf("[");
                            if (ind != -1) {
                                $(form).find('#span-error-' + idx.substring(0, ind)).html(topic);
                            } else {
                                $(form).find('#span-error-' + idx).html(topic);
                            }
                        });
                        setTimeout(function () {
                            $.each(returnData.error, function (idx, topic) {
                                // Object.keys(returnData.errors)[0];
                                var ind = idx.indexOf("[");
                                if (ind != -1) {
                                    $(form).find('#span-error-' + idx.substring(0, ind)).html('');
                                } else {
                                    $(form).find('#span-error-' + idx).html('');
                                }
                            });
                        }
                        , 10000);
                    }
                }
            },
            error: function (xhr, textStatus, errorThrown) {
                toster_message('There was an unknown error that occurred. You will need to refresh the page to continue working.', 'Error', 'error');
            },
            complete: function () {
                $('input[type="submit"]').val('Submit').removeAttr('disabled');
                $('#pageloder').hide();
            }
        });

        return false;

    });
    $(document).on("click", ".search_event", function (event) {
        //alert('chirag');
//        var formData = new FormData($(this)[0]);
        var state_id = $('#StateNameList').val();
        var city_id = $('#CityNameList').val();
        var vehicle_id = $('#VehicleTypeList').val();
        var make_id = $('#MakeNameList').val();
//        var budget_id = $('.budget').val();

        var error_html = '';
//        if (typeof returnData.error != "undefined") {
//            $.each(returnData.error, function (idx, topic) {
//                error_html += '<li>' + topic + '</li>';
//            });
//        }
//        if (error_html != '') {
//            toster_message_error(error_html, 'Error', 'error');
//        } else {
//            toster_message(returnData.message, returnData.heading, 'error');
//        }
        if (state_id == '') {
            error_html += '<li> Select State</li>';
        }
        if (city_id == '') {
            error_html += '<li> Select City</li>';
        }
        if (vehicle_id == '') {
            error_html += '<li> Select Vehicle Type</li>';
        }
        if (make_id == '') {
            error_html += '<li> Select Make</li>';

        }
        if (error_html == '') {

            var url = $('.search_event_form').attr('action');
            var formData = new FormData($('.search_event_form')[0]);
            $('.search_event_form').submit();


        } else {
            toster_message_error(error_html, 'Error', 'error');
        }


        return false;
//
    });

    $(document).on("click", ".btn.delete_btn", function (event) {

        $('a.remove_clicked').removeClass('remove_clicked')
        $(this).addClass('remove_clicked');
        var $ts = $(this);
        $.alert.open('confirm', 'Are you sure you want to delete this?', function (button) {
            if (button == 'yes') {

                $.alert.open({
                    type: 'prompt',
                    title: 'Admin Password',
                    inputtype: 'password',
                    content: 'Please enter the password',
                    callback: function (pass_btn, value) {
                        if (pass_btn == 'ok') {

                            var data_id = $ts.attr('data-id');
                            var method = $ts.attr('data-method');
                            var $url = 'remove/' + method;
                            $.ajax({
                                type: 'POST',
                                url: $url,
                                async: false,
                                data: {id: data_id, pass: value},
                                dataType: 'json',
                                beforeSend: function () {
                                    $('.dataTables_processing').css('visibility', 'visible');
                                },
                                success: function (returnData) {
                                    if (returnData.status == 'ok') {
                                        $.alert.open({type: 'info', content: returnData.message});
                                        $ts.closest("tr").remove();
                                        get_updated_datatable();
                                    } else {
                                        $.alert.open({type: 'error', content: returnData.message});
                                    }
                                },
                                error: function (xhr, textStatus, errorThrown) {
                                    new PNotify({title: 'Error', text: 'There was an unknown error that occurred. You will need to refresh the page to continue working.', type: 'error', styling: 'bootstrap3'});
                                },
                                complete: function () {
                                    $('.dataTables_processing').css('visibility', 'hidden');

                                }
                            });

                        }
                    }
                });


            }
        });
        return false;

    });
    
//    $(document).on("submit", ".subcribe_data", function (event) {
//
//        var formData = new FormData($(this)[0]);
//        $.ajax({
//            type: 'POST',
//            url: $(this).attr('action'),
//            data: formData,
//            dataType: 'json',
//            cache: false,
//            contentType: false,
//            processData: false,
//            beforeSend: function () {
//                $('.alert.alert-danger').slideUp(500).remove();
//                $('.subscribe').val('Please wait..!').attr('disabled', 'disabled');
//            },
//            success: function (returnData) {
//
//                if (returnData.status == "ok") {
//                    toster_message(returnData.message, returnData.heading, 'success');
//                    setTimeout(function () {
//                        window.location.href = BASE_URL;
//                    }, 5000);
//                } else {
//                    var error_html = '';
//                    if (typeof returnData.error != "undefined") {
//                        $.each(returnData.error, function (idx, topic) {
//                            error_html += '<li>' + topic + '</li>';
//                        });
//                    }
//                    if (error_html != '') {
//                        toster_message_error(error_html, 'Error', 'error');
//                    } else {
//                        toster_message(returnData.message, returnData.heading, 'error');
//                    }
//                }
//            },
//            error: function (xhr, textStatus, errorThrown) {
//                toster_message('There was an unknown error that occurred. You will need to refresh the page to continue working.', 'Error', 'error');
//            },
//            complete: function () {
//                $('.subscribe').val('Subscribe').removeAttr('disabled');
//            }
//        });
//
//        return false;
//
//    });
    $(document).on("submit", ".subcribe_data", function (event) {

        var formData = new FormData($('.subcribe_data')[0]);
        $.ajax({
            type: 'POST',
            url: $('.subcribe_data').attr('action'),
            data: formData,
            dataType: 'json',
            cache: false,
            contentType: false,
            processData: false,
            beforeSend: function () {
                $('.alert.alert-danger').slideUp(500).remove();
                $('.subscribe').val('Please wait..!').attr('disabled', 'disabled');
            },
            success: function (returnData) {

                if (returnData.status == "ok") {
                    toster_message(returnData.message, returnData.heading, 'success');
                    setTimeout(function () {
                        window.location.href = BASE_URL;
                    }, 5000);
                } else {
                    var error_html = '';
                    if (typeof returnData.error != "undefined") {
                        $.each(returnData.error, function (idx, topic) {
                            error_html += '<li>' + topic + '</li>';
                        });
                    }
                    if (error_html != '') {
                        toster_message_error(error_html, 'Error', 'error');
                    } else {
                        toster_message(returnData.message, returnData.heading, 'error');
                    }
                }
            },
            error: function (xhr, textStatus, errorThrown) {
                toster_message('There was an unknown error that occurred. You will need to refresh the page to continue working.', 'Error', 'error');
            },
            complete: function () {
//                $('.subscribe').val('Subscribe').removeAttr('disabled');
            }
        });

        return false;

    });


    $(document).on("click", "#getRegisterOTP", function (event) {
        //alert('hi')
        var controller = $('#getRegisterOTP').attr('data-controller');
        var method = $('#getRegisterOTP').attr('data-mathod');
        var formData = new FormData($('#registration-form')[0]);
        $.ajax({
            type: 'POST',
            url: BASE_URL + controller + '/' + method,
            data: formData,
            dataType: 'json',
            cache: false,
            contentType: false,
            processData: false,
            beforeSend: function () {
                $('.alert.alert-danger').slideUp(500).remove();
                $('#getOTP').val('Please wait..!').attr('disabled', 'disabled');
            },
            success: function (returnData) {

                if (returnData.status == "ok") {
                    toster_message(returnData.message, returnData.heading, 'success');
//                        setTimeout(function () {
//                            window.location.href = BASE_URL;
//                        }, 5000);
                } else {
                    var error_html = '';
                    if (typeof returnData.error != "undefined") {
                        $.each(returnData.error, function (idx, topic) {
                            error_html += '<li>' + topic + '</li>';
                        });
                    }
                    if (error_html != '') {
                        toster_message_error(error_html, 'Error', 'error');
                    } else {
                        toster_message(returnData.message, returnData.heading, 'error');
                    }
                }
            },
            error: function (xhr, textStatus, errorThrown) {
                toster_message('There was an unknown error that occurred. You will need to refresh the page to continue working.', 'Error', 'error');
            },
            complete: function () {
                $('#getRegisterOTP').val('Send OTP').removeAttr('disabled');
            }
        });

        return false;

    });

    $(document).on("click", ".login_with_theme_id", function (event) {
        var ThemeID = $(this).data('id');
        var url = BASE_URL + 'login';
        var form = $('<form action="' + url + '" method="post">' +
          '<input type="text" name="theme_id" value="' + ThemeID + '" />' +
          '</form>');
        $('body').append(form);
        form.submit();
    });
    $(document).on("click", ".getOTP", function (event) {
//        alert('hi')
        var formData = new FormData($('#login_frm')[0]);
        var formID = $('#login_frm').attr('id');
        var form = $('#login_frm');
        $.ajax({
            type: 'POST',
            url: $('#login_frm').attr('action'),
            data: formData,
            dataType: 'json',
            cache: false,
            contentType: false,
            processData: false,
            beforeSend: function () {
                $('.alert.alert-danger').slideUp(500).remove();
                $('.getOTP').val('Please wait..!').attr('disabled', 'disabled');
                $('#pageloder').show();
            },
            success: function (returnData) {

                if (returnData.status == "ok") {
//                    toster_message(returnData.message, returnData.heading, 'success');
                        setTimeout(function () {
                            window.location.href = BASE_URL + 'auth/otp?email=' + btoa(returnData.email) + '&theme_id='+btoa(returnData.theme_id) + '&is_first_time='+btoa(returnData.is_first_time);
                        }, 1000);
                } else {
//                    var error_html = '';
//                    if (typeof returnData.error != "undefined") {
//                        $.each(returnData.error, function (idx, topic) {
//                            error_html += '<li>' + topic + '</li>';
//                        });
//                    }
//                    if (error_html != '') {
//                        toster_message_error(error_html, 'Error', 'error');
//                    } else {
//                        toster_message(returnData.message, returnData.heading, 'error');
//                    }
                    var error_html = '';
                    if (typeof returnData.error != "undefined") {
                        // console.log("keys:",Object.keys(returnData.errors)[0]);
                        var key = Object.keys(returnData.error)[0];
                        var ind = key.indexOf("[");
                        console.log("error", key);
                        $.each(returnData.error, function (idx, topic) {
                            console.log("idx", idx);
                            // Object.keys(returnData.errors)[0];
                            var ind = idx.indexOf("[");
                            if (ind != -1) {
                                $(form).find('#span-error-' + idx.substring(0, ind)).html(topic);
                            } else {
                                $(form).find('#span-error-' + idx).html(topic);
                            }
                        });
                        setTimeout(function () {
                            $.each(returnData.error, function (idx, topic) {
                                // Object.keys(returnData.errors)[0];
                                var ind = idx.indexOf("[");
                                if (ind != -1) {
                                    $(form).find('#span-error-' + idx.substring(0, ind)).html('');
                                } else {
                                    $(form).find('#span-error-' + idx).html('');
                                }
                            });
                        }
                        , 10000);
                    }
                }
            },
            error: function (xhr, textStatus, errorThrown) {
                toster_message('There was an unknown error that occurred. You will need to refresh the page to continue working.', 'Error', 'error');
            },
            complete: function () {
                $('.getOTP').val('SignIn').removeAttr('disabled');
                $('#pageloder').hide();
            }
        });

        return false;

    });
    $(document).on("click", ".resendOTP", function (event) {
//        alert('hi')
        var formData = new FormData($('#otp_frm')[0]);
        var formID = $('#otp_frm').attr('id');
        var form = $('#otp_frm');
        $.ajax({
            type: 'POST',
            url: BASE_URL + 'auth/send_otp',
            data: formData,
            dataType: 'json',
            cache: false,
            contentType: false,
            processData: false,
            beforeSend: function () {
                $('.alert.alert-danger').slideUp(500).remove();
                $('.getOTP').val('Please wait..!').attr('disabled', 'disabled');
                $('#pageloder').show();
            },
            success: function (returnData) {

                if (returnData.status == "ok") {
//                    toster_message(returnData.message, returnData.heading, 'success');
//                        setTimeout(function () {
//                            window.location.href = BASE_URL + 'auth/otp?email=' + btoa(returnData.email) + '&theme_id='+btoa(returnData.theme_id);
//                        }, 5000);
                } else {
//                    var error_html = '';
//                    if (typeof returnData.error != "undefined") {
//                        $.each(returnData.error, function (idx, topic) {
//                            error_html += '<li>' + topic + '</li>';
//                        });
//                    }
//                    if (error_html != '') {
//                        toster_message_error(error_html, 'Error', 'error');
//                    } else {
//                        toster_message(returnData.message, returnData.heading, 'error');
//                    }
                    var error_html = '';
                    if (typeof returnData.error != "undefined") {
                        // console.log("keys:",Object.keys(returnData.errors)[0]);
                        var key = Object.keys(returnData.error)[0];
                        var ind = key.indexOf("[");
                        console.log("error", key);
                        $.each(returnData.error, function (idx, topic) {
                            console.log("idx", idx);
                            // Object.keys(returnData.errors)[0];
                            var ind = idx.indexOf("[");
                            if (ind != -1) {
                                $(form).find('#span-error-' + idx.substring(0, ind)).html(topic);
                            } else {
                                $(form).find('#span-error-' + idx).html(topic);
                            }
                        });
                        setTimeout(function () {
                            $.each(returnData.error, function (idx, topic) {
                                // Object.keys(returnData.errors)[0];
                                var ind = idx.indexOf("[");
                                if (ind != -1) {
                                    $(form).find('#span-error-' + idx.substring(0, ind)).html('');
                                } else {
                                    $(form).find('#span-error-' + idx).html('');
                                }
                            });
                        }
                        , 10000);
                    }
                }
            },
            error: function (xhr, textStatus, errorThrown) {
                toster_message('There was an unknown error that occurred. You will need to refresh the page to continue working.', 'Error', 'error');
            },
            complete: function () {
                $('.getOTP').val('SignIn').removeAttr('disabled');
                $('#pageloder').hide();
                $(this).prop("disabled", true);
                $('#send_otp').removeClass("active");
                timer(60);
                $('#timer').show();
            }
        });

        return false;

    });
    
    $(document).on("click", "#verifyOTP", function (event) {
//        alert($('#otp_frm').attr('action'));
        var formData = new FormData($('#otp_frm')[0]);
        var formID = $('#otp_frm').attr('id');
        var form = $('#otp_frm');
        $.ajax({
            type: 'POST',
            url: $('#otp_frm').attr('action'),
            data: formData,
            dataType: 'json',
            cache: false,
            contentType: false,
            processData: false,
            beforeSend: function () {
                $('.alert.alert-danger').slideUp(500).remove();
                $('#verifyOTP').val('Please wait..!').attr('disabled', 'disabled');
                $('#pageloder').show();
            },
            success: function (returnData) {

                if (returnData.status == "ok") {
//                    toster_message(returnData.message, returnData.heading, 'success');
                        setTimeout(function () {
                            if(returnData.theme_id != ''){
                                window.location.href = BASE_URL + 'special-invite/'+returnData.theme_id;
                            }else{
                                if(returnData.is_first_time == 1){
                                    window.location.href = BASE_URL + 'auth/success';
                                }else{
                                  window.location.href = BASE_URL + 'my-invites';
                                }
                                // var cookieshowhide = $.cookie('SOME-COOKIE');
        
                                // if(cookieshowhide == 1) 
                                // {
                                //     window.location.href = BASE_URL + 'my-invites';
                                // }else{
                                //     window.location.href = BASE_URL + 'auth/success';
                                // }
                                
                                
                            }
                        }, 1000);
                } else {
//                    var error_html = '';
//                    if (typeof returnData.error != "undefined") {
//                        $.each(returnData.error, function (idx, topic) {
//                            error_html += '<li>' + topic + '</li>';
//                        });
//                    }
//                    if (error_html != '') {
//                        toster_message_error(error_html, 'Error', 'error');
//                    } else {
//                        toster_message(returnData.message, returnData.heading, 'error');
//                    }
                    var error_html = '';
                    if (typeof returnData.error != "undefined") {
                        // console.log("keys:",Object.keys(returnData.errors)[0]);
                        var key = Object.keys(returnData.error)[0];
                        var ind = key.indexOf("[");
                        console.log("error", key);
                        $.each(returnData.error, function (idx, topic) {
                            console.log("idx", idx);
                            // Object.keys(returnData.errors)[0];
                            var ind = idx.indexOf("[");
                            if (ind != -1) {
                                $('#otp_frm').find('#span-error-' + idx.substring(0, ind)).html(topic);
                            } else {
                                $('#otp_frm').find('#span-error-' + idx).html(topic);
                            }
                        });
                        setTimeout(function () {
                            $.each(returnData.error, function (idx, topic) {
                                // Object.keys(returnData.errors)[0];
                                var ind = idx.indexOf("[");
                                if (ind != -1) {
                                    $('#otp_frm').find('#span-error-' + idx.substring(0, ind)).html('');
                                } else {
                                    $('#otp_frm').find('#span-error-' + idx).html('');
                                }
                            });
                        }
                        , 10000);
                    }
                }
            },
            error: function (xhr, textStatus, errorThrown) {
                toster_message('There was an unknown error that occurred. You will need to refresh the page to continue working.', 'Error', 'error');
            },
            complete: function () {
                $('#verifyOTP').val('Submit OTP').removeAttr('disabled');
                $('#pageloder').hide();
            }
        });

        return false;

    });
    
    $(document).on("click", ".add_card", function (event) {
//        alert('hi');
        var product_id = $(this).attr('data-proid');
        if ($("#quantity").length > 0) {
            var qty = $("#quantity").val();
        } else {
            var qty = 1;
        }

//alert(q);
        $.ajax({
            type: 'POST',
            url: BASE_URL + "cart/add_cart",
            data: {"product_id": product_id, "qty": qty},
            dataType: 'json',
            // cache: false,
            // contentType: false,
            // processData: false,
            beforeSend: function () {

            },
            success: function (returnData) {

                if (returnData.status == "ok") {
                    toster_message(returnData.message, returnData.heading, 'success');
                    //window.location.reload();
                    get_cart_count();
                    if ($('.view_cart').length > 0) {
                        $('.add_card').hide();
                        $('.view_cart').show();
                    }
                    $('.cart_count').html(returnData.total_cart_item);

                } else {
                    var error_html = '';
                    if (typeof returnData.error != "undefined") {
                        $.each(returnData.error, function (idx, topic) {
                            error_html += '<li>' + topic + '</li>';
                        });
                    }
                    if (error_html != '') {
                        toster_message_error(error_html, 'Error', 'error');
                    } else {
                        toster_message(returnData.message, returnData.heading, 'error');
                    }
                }
            },
            error: function (xhr, textStatus, errorThrown) {
                toster_message('There was an unknown error that occurred. You will need to refresh the page to continue working.');
            },
            complete: function () {

            }
        });

        return false;

    });
    
    $(document).on('click', '#remove_cart', function () {
//        alert('hi');
        var rowid = $(this).attr("rowid");
        if (confirm("Are you sure you want to delete this?"))
        {
            $.ajax({
//                url: "<?php echo base_url(); ?>cart/remove/<?php echo $items['rowid']; ?>",
                    url: BASE_URL + "cart/remove/" + rowid,
                    method: "POST",
                    data: {rowid: rowid},
                    dataType: 'json',
                    beforeSend: function () {

                    },
                    success: function (returnData) {

                        if (returnData.status == "ok") {
                             toster_message(returnData.message, returnData.heading, 'success');
                            // reload("#breadcrums"); 
                            get_cart_count();
                            $('.cart_count').html(returnData.total_cart_item);
                            $('.table-outer').html(returnData.html);
//                            window.location.reload();

                        } else {
                            var error_html = '';
                            if (typeof returnData.error != "undefined") {
                                $.each(returnData.error, function (idx, topic) {
                                    error_html += '<li>' + topic + '</li>';
                                });
                            }
                            if (error_html != '') {
                                //  toster_message(error_html);
                            } else {
                                // toster_message(returnData.message);
                            }
                        }
                    },
                    error: function (xhr, textStatus, errorThrown) {
                        toster_message('There was an unknown error that occurred. You will need to refresh the page to continue working.');
                    },
                    complete: function () {

                    }
                });
            } else
            {
                return false;
            }
        });
     
    $(document).on("click", ".checkout_check", function (event) {

        var product_id = $(this).attr('data-proid');

        if ($("#quantity").length > 0) {
            var qty = $("#quantity").val();
        } else {
            var qty = 1;
        }

//alert(q);
        $.ajax({
            type: 'POST',
            url: BASE_URL + "checkout/check_stock",
            data: {},
            dataType: 'json',
            // cache: false,
            // contentType: false,
            // processData: false,
            beforeSend: function () {

            },
            success: function (returnData) {

                if (returnData.status == "ok") {
                    toster_message(returnData.message, returnData.heading, 'success');
                    window.location.href = BASE_URL + 'checkout';
                    

                } else {
                    var error_html = '';
                    if (typeof returnData.error != "undefined") {
                        $.each(returnData.error, function (idx, topic) {
                            error_html += '<li>' + topic + '</li>';
                        });
                    }
                    if (error_html != '') {
                        toster_message_error(error_html, 'Error', 'error');
                    } else {
                        toster_message(returnData.message, returnData.heading, 'error');
                    }
                }
            },
            error: function (xhr, textStatus, errorThrown) {
                toster_message('error','There was an unknown error that occurred. You will need to refresh the page to continue working.', 'error');
            },
            complete: function () {

            }
        });

        return false;

    });
    $(document).on("click", ".wishlist", function (event) {
        var data_value = $(this).attr('data-value');
        var data_id = $(this).attr('data-id');
        var data_product_id = $(this).attr('data-product-id');
        var controller = $(this).attr('data-control');
        var method = $(this).attr('data-method');
//        alert(data_car_id);

        $.ajax({
            type: 'POST',
            url: BASE_URL + controller + '/' + method + '/' + data_product_id,
            data: {service_id:data_id, value:data_value},
            dataType: 'json',
//            cache: false,
//            contentType: false,
//            processData: false,
            beforeSend: function () {
                $('.alert.alert-danger').slideUp(500).remove();
                $('.wishlist').val('Please wait..!').attr('disabled', 'disabled');
            },
            success: function (returnData) {

                if (returnData.status == "ok") {
                    toster_message(returnData.message, returnData.heading, 'success');
//                    $( ".wishlist" ).replaceWith( '<a href=""><i class="fas fa-heart"></i> Wishlist</a>' );
                    setTimeout(function () {
                        window.location.reload();
                    }, 5000);
                } else {
                    var error_html = '';
                    if (typeof returnData.error != "undefined") {
                        $.each(returnData.error, function (idx, topic) {
                            error_html += '<li>' + topic + '</li>';
                        });
                    }
                    if (error_html != '') {
                        toster_message_error(error_html, 'Error', 'error');
                    } else {
                        toster_message(returnData.message, returnData.heading, 'error');
                    }
                }
            },
            error: function (xhr, textStatus, errorThrown) {
                toster_message('There was an unknown error that occurred. You will need to refresh the page to continue working.', 'Error', 'error');
            },
            complete: function () {
//                $( ".wishlist" ).replaceWith( '<a href=""><i class="fa fa-heart"></i> Wishlist</a>' );
//                $('.wishlist').val('Wishlist').removeClass('disabled');
            }
        });

        return false;

    });
    $(document).on("submit", "form#form_profile", function (event) {
        var formData = new FormData($(this)[0]);
        $.ajax({
            type: 'POST',
            url: $(this).attr('action'),
            data: formData,
            dataType: 'json',
            cache: false,
            contentType: false,
            processData: false,
            beforeSend: function () {
                $('.alert.alert-danger').slideUp(500).remove();
                $('input[type="submit"]').val('Please wait..!').attr('disabled', 'disabled');
            },
            success: function (returnData) {

                if (returnData.status == "ok") {
                    toster_message(returnData.message, returnData.heading, 'success');
                    setTimeout(function () {
                        window.location.href = BASE_URL;
                    }, 5000);
                } else {
                    var error_html = '';
                    if (typeof returnData.error != "undefined") {
                        $.each(returnData.error, function (idx, topic) {
                            error_html += '<li>' + topic + '</li>';
                        });
                    }
                    if (error_html != '') {
                        toster_message_error(error_html, 'Error', 'error');
                    } else {
                        toster_message(returnData.message, returnData.heading, 'error');
                    }
                }
            },
            error: function (xhr, textStatus, errorThrown) {
                toster_message('There was an unknown error that occurred. You will need to refresh the page to continue working.', 'Error', 'error');
            },
            complete: function () {
                $('input[type="submit"]').val('Submit').removeAttr('disabled');
            }
        });

        return false;

    });
});
function get_cart_count(){
//    if(product_id > 0){
        $.ajax({
            url: BASE_URL + "cart/refresh_cart",
            data: {},
            dataType: 'json',
            dataType: 'html',
            beforeSend: function () {
//                $('#login-modal').html('');
                $('.shopping-cart').html('');
            },
            success: function (returnData) {
//                alert('2');
                $('.shopping-cart').html(returnData);
                
            },
            error: function (xhr, textStatus, errorThrown) {
            },
            complete: function () {

            }
        });

        return false;
//    }
}


