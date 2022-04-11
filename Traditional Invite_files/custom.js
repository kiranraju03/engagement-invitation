$(document).ready(function () 
{
    

    $(window).load(function()
    {
        $('#header .header-block').tmStickUp({});  
    }); 

    /***** responsive menu ********/    
    $("#nav a.menu-icon").click(function(e) 
    {
          e.preventDefault();
          $("#nav").addClass('open');
    });
    
    if($(window).width() <= 768)
    {
         $("#nav ul li a").click(function() 
         {          
           $("#nav").removeClass('open');
         });
    }
  
    $("#menu_cols img").click(function() 
    {          
       $("#nav").removeClass('open');
    });


    $('#slider .scroll_sec a').click(function(e) 
    {
        var url = $(this).attr('dataid');

        var str = url.substring(url.indexOf('#')+1);
        if(str != '' && $('#'+str).length > 0) 
        {
          $('html, body').animate({
              scrollTop: $('#' + url.substring(url.indexOf('#')+1)).offset().top - 0
          }, 900);
        }
    });





    $("#owl_previews").owlCarousel(
     {
        items : 1,
        lazyLoad : true,        
        loop: true,
        autoplay:false,
        autoplayTimeout:3000,
        autoplayHoverPause:false,
        autoHeight: true,
        dots: false,
        animateIn: 'fadeIn',
        animateOut: 'fadeOut',
        mouseDrag: false,
        touchDrag: false,
        nav: true,
        navText: ["<div class='left-navigation offsets'><img src='"+BASE_URL+"assets/images/left_arrow.png'></div>", "<div class='right-navigation offsets'><img src='"+BASE_URL+"assets/images/right_arrow.png'></div>"],
        responsiveClass:true,
        responsive:
        {
            0:{
                items:1
            },
            640:{
                items:1
            },
            641:{
                items:1
            },  
            1024:{
                items:1
            } 
        }      
    });

    $(".owl_banner_img2").owlCarousel(
     {
        items : 1,
        lazyLoad : true,        
        loop: true,
        autoplay:true,
        autoplayTimeout:3000,
        autoplayHoverPause:true,
         onInitialized: startProgressBar,
        onTranslate: resetProgressBar,
        onTranslated: startProgressBar,
        dots: false,
        animateIn: 'fadeIn',
        animateOut: 'fadeOut',
        autoHeight : true,
        nav : false,
        responsiveClass:true,
        responsive:
        {
            0:{
                items:1
            },
            640:{
                items:1
            },
            641:{
                items:1
            },  
            1024:{
                items:1
            } 
        }      
    });

    function startProgressBar() {
      // apply keyframe animation
      $(".slide-progress").css({
        width: "100%",
        transition: "width 5000ms"
      });
    }

    function resetProgressBar() {
      $(".slide-progress").css({
        width: 0,
        transition: "width 0s"
      });
    }


    $(".owl_banner_img").owlCarousel(
     {
        items : 1,
        lazyLoad : true,        
        loop: true,
        autoplay:true,
        autoplayTimeout:3000,
        autoplayHoverPause:true,
        dots: false,
        animateIn: 'fadeIn',
        animateOut: 'fadeOut',
        autoHeight : true,
        nav : false,
        responsiveClass:true,
        responsive:
        {
            0:{
                items:1
            },
            640:{
                items:1
            },
            641:{
                items:1
            },  
            1024:{
                items:1
            } 
        }      
    });

    $(".owl_gallery").owlCarousel(
     {
        items : 1,
        lazyLoad : true,        
        loop: true,
        autoplay:false,
        autoplayTimeout:3000,
        autoplayHoverPause:true,
        dots: false,
        animateIn: 'slideInRight',
        animateOut: 'slideInRight',
        autoHeight : true,
        nav : true,
        navText : ["<div class='left-navigation'><img src='"+BASE_URL+"assets/images/left_arrow.png'></div>", "<div class='right-navigation'><img src='"+BASE_URL+"assets/images/right_arrow.png'></div>"],
        responsiveClass:true,
        responsive:
        {
            0:{
                items:1
            },
            640:{
                items:1
            },
            641:{
                items:1
            },  
            1024:{
                items:1
            } 
        }      
    });


    $(".owl_temp4_slide").owlCarousel(
     {
        items : 1,
        lazyLoad : true,        
        loop: true,
        autoplay:false,
        dots: true,
        animateIn: 'slideInLeft',
        animateOut: 'slideInRight',
        autoHeight : true,
        nav : true,
        navText : ["<div class='left-navigation'><img src='"+BASE_URL+"assets/images/left_arrow.png'></div>", "<div class='right-navigation'><img src='"+BASE_URL+"assets/images/right_arrow.png'></div>"],
        responsiveClass:true,
        responsive:
        {
            0:{
                items:1
            },
            640:{
                items:1
            },
            641:{
                items:1
            },  
            1024:{
                items:1
            } 
        }      
    });




    $(document).on("change",".uploadButton-input",function() 
    {
        if (typeof (FileReader) != "undefined") 
        {
            var par = $(this).parent().parent().find('.selected_img');
            var selectd_img = $(this).parent().parent().find('.selected_img').find('.uploadImagePreview');
            
            var dvPreview = $(par);
            var id = $(this).attr('id');
            //dvPreview.show();  
//            if(this.files[0].size > 2097152){
            if(this.files[0].size > 6000000){
//                toster_message('File Size', 'File Size must be less than 3 MB', 'error');
//                $('#msform').find('#span-error-' + id).html('File Size must be less than 3 MB');
                $('#msform').find('#span-error-' + id).html('File Size must be less than 6 MB');
//                var delinput = $(this).parent().find('.uploadButton-input');
                // var delinput1 = $(this).parent().parent().find('.uploadButton-input');
//                $(delinput).val('');
                // $(delinput1).val('');
                setTimeout(function () {
                    $('#msform').find('#span-error-' + id).html('');
                }
                , 10000);
             }else{
                 $(this).parent().parent().addClass('selected');
                 dvPreview.show(); 
                $($(this)[0].files).each(function () 
                {
                    var file = $(this);                
                    var reader = new FileReader();
                    reader.onload = function (e) 
                    {
                        selectd_img.attr("src", e.target.result);
                    }
                    reader.readAsDataURL(file[0]);                
                });

             }
            
        } else 
        {
            alert("This browser does not support HTML5 FileReader.");
        }
    });


    $(document).on("click",".edit_btn.delete",function() 
    {  
        $(this).parent().parent().find('.selected_img').hide();
        $(this).parent().parent().removeClass('selected');
        var selectd_img = $(this).parent().parent().find('.selected_img').find('.uploadImagePreview');
        selectd_img.attr("src", '');

        var delinput = $(this).parent().find('.uploadButton-input');
        var delinput1 = $(this).parent().parent().find('.uploadButton-input');
        $(delinput).val('');
        $(delinput1).val('');
    });

    $(document).on("click",".owl-nav button",function() 
    {  
//        var video = $("#templates iframe.videos").attr("src");
//        $("#templates iframe.videos").attr("src","");
//        $("#templates iframe.videos").attr("src",video);
    });







    $(document).on("change",".mp3-input",function(e) 
    {
        if (typeof (FileReader) != "undefined") 
        {
            var par = $(this).parent().parent().find('.preview_img3');
            $(this).parent().hide();
            var selectd_name = $(this).parent().parent().find('.preview_img3').find('.file_name');

            $(this).parent().parent().addClass('selected');
        
            var dvPreview = $(par);
            dvPreview.show();    
            var file = $(this)[0].files[0]
            
            if (file)
            {
              selectd_name.html(file.name);
            }   
        } else 
        {
            alert("This browser does not support HTML5 FileReader.");
        }
    });


    $(document).on("click",".delete_selected",function() 
    {  
        $(this).parent().parent().parent().hide();
        $(this).parent().parent().parent().parent().removeClass('selected');
        $(this).parent().parent().parent().parent().find('.mp3upload_content').show();
        var audios = $(this).parent().parent().parent().find('.preview_img3').find('.myAudio');
        audios.attr("src", '');
        $(".mp3-input").val('');
    });

    $(document).on("click",".models-btn",function() 
    {
        var modelId = $(this).attr('dataid');
        $(modelId).removeClass('d-none');
        $("#models-overplay").addClass('open');
    });

    $(document).on("click","#models-overplay",function() 
    {
        $(".models").addClass('d-none');
        $("#models-overplay").removeClass('open');
    });

    $(document).on("click",".close-models",function() 
    {
        $(".models").addClass('d-none');
        $("#models-overplay").removeClass('open');
    });

    $(document).on("keyup",".form-control[maxlength]",function() 
    {
        var data_length = $(this).val().length;
        var data_limit = $(this).attr('maxlength');
        var data_content = $(this).parent().find('span.limits_txt');
        var $input = $(this);
        
        data_content.html('');
        data_content.html(data_length+'/'+data_limit);

        if (data_length > data_limit) 
        {
            $(this).val($(this).val().slice(0, data_limit));
            var data_length = $(this).val().length;
            data_content.html('');
            data_content.html(data_length+'/'+data_limit);
        }
        
    });


    $(document).on("click",".offsets",function() 
    {    
        
        
          $('html, body').animate({
              scrollTop: $("#previews").offset().top - 70
          }, 500);
       
    });




});