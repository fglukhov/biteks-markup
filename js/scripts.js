$(window).resize(function() {
  $("body").css("width","");
});

$(window).load(function() {
  
  $("body").css("width",$("body").width()-1).css("width",$("body").width()+1);
});

$(document).ready(function () {

  $(".main-slider").mainSlider();
  
  if ($(".form-phone").length) {
    $(".form-phone").mask("8 (999) 999-99-99");
  }

  // Tabbed content
  
  $(".tabbed-content .tab").click(function() {
    $(this).parents(".tabs").find(".tab").removeClass("act");
    $(this).addClass("act");
    $(this).parents(".tabbed-content").find(".tab-content").hide()
    $(this).parents(".tabbed-content").find(".tab-content[rel='"+$(this).attr("rel")+"']").show();
    $("body").css("width",$("body").width()-1).css("width",$("body").width()+1);
    $(".tabbed-content .tab-cont").css("position","static").css("position","relative");
    carouselAdaptation();
  });

  $(".home-idea .steps-row").each(function() {
    $(this).css("height",$(this).height())
  });

  $(".expandable .trigger").click(function() {
    $(this).parents(".expandable").find(".cont").slideToggle(250);
    var text = $(this).find("span").html();
    $(this).html(text == "подробнее" ? "<span>свернуть</span> &uarr;" : "<span>подробнее</span> >>");
  });

  // Separating news items by rows
  
  if ($(".objects-list").length) {
    $(".objects-list").not(".objects-list-2").not(".objects-list-3").each(function() {
      var list = $(this);
      
      var items = list.children(".objects-list-item");
      
      for(var i = 0; i < items.length; i+=2) {
        items.slice(i, i+2)
           .wrapAll("<div class='objects-row fc' />");
      }
      
      list.find(".objects-row").first().addClass("first-row");
      list.find(".objects-row").last().addClass("last-row");
      
    });
  }
  
  if ($(".objects-list").length) {
    $(".objects-list-3").each(function() {
      var list = $(this);
      
      var items = list.children(".objects-list-item");
      
      for(var i = 0; i < items.length; i+=3) {
        items.slice(i, i+3)
           .wrapAll("<div class='objects-row fc' />");
      }
      
      list.find(".objects-row").first().addClass("first-row");
      list.find(".objects-row").last().addClass("last-row");
      
    });
  }
  
  // Projects carousel
  
  if ($(".projects-carousel-adaptive").length) {
    $(".projects-carousel-adaptive .jcarousel").each(function() {
      $(this).jcarousel({
        animation: 500,
        vertical: true,
        scroll:3,
        initCallback: jcarouselInit
      });
    })
    
  }
  
  if ($(".projects-carousel-1").length) {
    $(".projects-carousel-1 .jcarousel").each(function() {
      $(this).jcarousel({
        animation: 500,
        vertical: true,
        scroll:3
      });
    })
    
  }
  
  if ($(".projects-carousel-2").length) {
    $(".projects-carousel-2 .jcarousel").each(function() {
      $(this).jcarousel({
        animation: 500,
        vertical: true,
        scroll:2
      });
    })
    
  }
  
  makeup();
  
  $(".main-menu li").hover(function() {
    $(this).find(".submenu").fadeIn(150);
  },function() {
    $(this).find(".submenu").fadeOut(150);
  });
  
  // Fancyboxes
  
  if ($(".fancybox").length) {
    
      
    $(".fancybox").each(function() {
      $(this).fancybox();
    })
    

  }
  
  validateForms();
  
  $(".common-form select").customSelect();
  
  // custom input
  
  if ($(".common-form input:file").length) {
    $(".common-form input:file").nicefileinput({ 
      label : 'Выбрать файл'
    });
  }
  
});

function makeup() {

  $("input:text, textarea").each(function() {
    if (!$(this).prev("label").length && $(this).attr("phvalue")) {
      $(this).before("<label for='"+$(this).attr("id")+"' class='placeholder'>"+$(this).attr("phvalue")+"</label>");
      $(this).addClass("initial");
      
      if ($(this).prop("tagName") == "INPUT") {
        // if (!$(this).parents(".input-wrapper").length) $(this).wrap("<div class='input-wrapper'></div>");
        $(this).focus(function() {
          $(this).removeClass("initial");
          $(this).parents(".form-item").find(".placeholder").hide();
        });
        $(this).blur(function() {
          $(this).prev().prev(".placeholder").hide();
          if (!$(this).val()) {
            $(this).addClass("initial");
            $(this).parents(".form-item").find(".placeholder").show();
          }
        });
      } else {
        $(this).focus(function() {
          $(this).removeClass("initial");
          $(this).parents(".form-item").find(".placeholder").hide();
        });
        $(this).blur(function() {
          if (!$(this).val()) {
            $(this).addClass("initial");
            $(this).parents(".form-item").find(".placeholder").show();
          }
        });
      }
      
      
      $(this).parents(".form-item").find(".placeholder").click(function() {
        $(this).focus();
      });
    } else if ($(this).prop("tagName") == "INPUT") {
      // $(this).wrap("<div class='input-wrapper' />")
    }
  });

  $("ul,ol").each(function() {
    if (!$(this).children("li").first().hasClass("first")) {
      $(this).children("li").last().addClass("last");
      $(this).children("li").first().addClass("first");
    }
  });

  $("ol li").each(function() {
    if (!$(this).find(".li-cont").length) {
      $(this).html("<span class='li-cont'>"+$(this).html()+"</span>")
    }
  });
  
  $("table").each(function() {
    if (!$(this).find("tr").first().hasClass("first")) {
      $(this).find("tr").last().addClass("last");
      $(this).find("tr").first().addClass("first");
    }
  });
  
  $("input.button").each(function () {
    if ($(this)[0].tagName == "INPUT" && !$(this).next("div.form-submit").length) {
      var divBtn = $("<div></div>");
      var submit = $(this);
      divBtn.attr("class",$(this).attr("class")).attr("id",$(this).attr("id")).html("<span>" + $(this).val() + "</span>");
      $(this).after(divBtn);
      $(this).hide();
      divBtn.on("click",function () {
        submit.click();
      });
    }
    
  });
  
}

function validateForms() {
  
  var validatorQuick = $("#quickForm").bind("invalid-form.validate", function() {
  	    
  	  }).validate({
  	  focusInvalid: false,
  	  sendForm : false,
      rules: {
        calc_email: {
          required: true,
          email: true
        }
      },
  	  messages: {
  	    calc_fio: "Поле не заполнено!",
  	    calc_company: "Поле не заполнено!",
  	    calc_phone: "Поле не заполнено!",
        calc_email: "Введите правильный адрес!"
  	  },
  	  errorPlacement: function(error, element) {
  	    // element.parents(".input-wrapper").addClass("input-wrapper-error");
        error.insertAfter(element);
  	  },
  	  unhighlight: function(element, errorClass, validClass) {
  	    // $(element).parents(".input-wrapper").removeClass("input-wrapper-error");
  	    $(element).removeClass(errorClass);
        $(element).next("label.error").remove();
  	  },
  	  invalidHandler: function(form, validatorcalc) {
  	      var errors = validatorcalc.numberOfInvalids();
  	      if (errors) {                    
  	          validatorcalc.errorList[0].element.focus();
  	      }
  	  } 
  	});
    
    var validatorTech = $("#techForm").bind("invalid-form.validate", function() {
  	    
  	  }).validate({
  	  focusInvalid: false,
  	  sendForm : false,
      rules: {
        calc_email2: {
          required: true,
          email: true
        }
      },
  	  messages: {
  	    calc_client: "Поле не заполнено!",
  	    calc_manager: "Поле не заполнено!",
  	    calc_phone2: "Поле не заполнено!",
        calc_email2: "Введите правильный адрес!"
  	  },
  	  errorPlacement: function(error, element) {
  	    // element.parents(".input-wrapper").addClass("input-wrapper-error");
        error.insertAfter(element);
  	  },
  	  unhighlight: function(element, errorClass, validClass) {
  	    // $(element).parents(".input-wrapper").removeClass("input-wrapper-error");
  	    $(element).removeClass(errorClass);
        $(element).next("label.error").remove();
  	  },
  	  invalidHandler: function(form, validatorcalc) {
  	      var errors = validatorcalc.numberOfInvalids();
  	      if (errors) {                    
  	          validatorcalc.errorList[0].element.focus();
  	      }
  	  } 
  	});
  
}

(function( $ ) {
  $.fn.customSelect = function() {
    var selects = $(this);
    selects.each(function () {
      var select = $(this);
      
      if (!$(this).next(".param-selector").length) {
        select.css("visibility","hidden").css("position","absolute").css("z-index","-1");
        select.after("<div class='param-selector' id='" + select.attr("id") + "-selector'>");
        var selector = select.next(".param-selector");
        
        if (select.is(":disabled")) {
          selector.addClass("selector-disabled")
        }
        
        
        selector.append("<div class='param-sel' />").append("<div class='dropdown' />");
        var dropdown = selector.find(".dropdown");
        // dropdown.append("<div class='top-border' />");
        var paramSel = selector.find(".param-sel");
        paramSel.addClass("initial");
        paramSel.append("<div class='arr' />");
        paramSel.append("<div class='sel-value' />");
        
        if (select.find("option[value=" + select.val() + "]").attr("flag")) {
          paramSel.find(".sel-value").html("<img src='" + select.find("option[value=" + select.val() + "]").attr("flag") + "' />" + select.find("option[value=" + select.val() + "]").html());
        } else {
          paramSel.find(".sel-value").html(select.find("option[value=" + select.val() + "]").html());
        }
        
        select.find("option").each(function () {
          if ($(this).attr("flag")) {
            var flag = "<img src=" + $(this).attr("flag") + " />";
          } else {
            flag = "";
          }
          if ($(this).val() != select.val()/* || select.attr("ttl")*/) {
            dropdown.append("<div val='" + $(this).attr("value") + "'>" + flag + $(this).html() + "</div>");
          } else {
            dropdown.append("<div style='display:none' val='" + $(this).attr("value") + "'>" + flag + $(this).html() + "</div>");
          }
        });
      
      
        paramSel.click(function() {
          if (!select.is(":disabled")) {
            if (dropdown.css("display") != "block") {
              $(".dropdown").fadeOut(150);
              $(".param-open").removeClass("param-open");
              dropdown.fadeIn(150);
              selector.addClass("param-open");
              var maxWidth = 0;
              
              $(this).parents(".form-item").prevAll(".form-item").css("z-index","100");
              $(this).parents(".form-item").css("z-index","1000");
              $(this).parents(".form-item").nextAll(".form-item").css("z-index","100");
              
              dropdown.find("div").each(function () {
                if ($(this).width() >= maxWidth) {
                  maxWidth = $(this).width();
                }
                if (paramSel.width() >= maxWidth) {
                  maxWidth = paramSel.width() + 1;
                }
              });
              
              //paramSel.css("width", maxWidth + "px");
              // dropdown.find("div").css("width", maxWidth + "px");
              // dropdown.css("width", maxWidth);
              
              // ddOverflow = $("html").height() - (dropdown.offset().top + dropdown.height());
              // if (ddOverflow < 0) {
                // dropdown.css("margin-top", -30 - dropdown.height());
              // }
              
              //dropdown.css("top",paramSel.position().top + paramSel.height());
              
            } else {
              dropdown.fadeOut(150);
              selector.removeClass("param-open");
            }
          }
        });
        
        dropdown.find("div").click(function () {
          selector.removeClass("param-sel-error");
          paramSel.removeClass("initial");
          var div = $(this);
          paramSel.find(".sel-value").html($(this).html());
          if ($(this).attr("flag")) {
            paramSel.find(".sel-value").attr("flag",$(this).attr("flag"));
          }
          select.val($(this).attr("val")).change();
          if (select.hasClass("hide-ttl")) {
            //select.find("option[value='']").remove();
            dropdown.find("div[val='']").remove();
          }
          dropdown.fadeOut(150, function () {
            dropdown.find("div").show().removeClass("selected");
            div.addClass("selected");
            div.parents(".param-open").removeClass("param-open");
          });
        });
      
      }
    });
    
  };
})( jQuery );


function jcarouselInit(carousel, state) {
  carouselAdaptation()
};

function carouselAdaptation() {
  if ($(".projects-carousel-adaptive").length) {

    var carCont = $(".projects-carousel-adaptive");
    
    var prevHeight = 0;

    carCont.prevAll().each(function() {
      prevHeight += $(this).outerHeight(true);
    });
    
    var nextHeight = 0;

    carCont.nextAll().each(function() {
      nextHeight += $(this).outerHeight(true);
    });

    var carHeight = $(".l-col").height() - prevHeight - nextHeight - 112;

    carHeight = carHeight - carHeight%193;
    
    if (carHeight < 579) carHeight = 579;

    $(".projects-carousel-adaptive .projects-carousel").css("height",carHeight);
  }
}

(function( jQuery ) {
  jQuery.fn.mainSlider = function() {
    var slider = $(this);
    var slides = slider.children(".slide");
    var sliderSize = slides.size();
    
    slider.append("<div class='lister'></div>");
    
    var lister = slider.children(".lister");
    
    slides.hide();
    slides.eq(0).show().addClass("slide-act");
    
    //sliderMakeup();
    
    if (sliderSize > 1) {
    
      for (i=1;i<=sliderSize;i++) {
        lister.append("<div class='item'></div>")
      }
      
      var listerItems = lister.children(".item");
      
      listerItems.eq(0).addClass("act");
      
      
      
      listerItems.on("click",function () {
        if (!$(this).hasClass("act")) {
          listerItems.removeClass("act");
          $(this).addClass("act");
          slides.fadeOut(250).removeClass("slide-act");
          slides.eq($(this).index()).fadeIn(250).addClass("slide-act");
          //sliderMakeup();
        }
      });
      
      listerItems.bind("mouseover",function () {
        $(this).click();
      });
      
      var play = 1;
      
      slider.bind("mouseover",function () {
        play = 0;
      });
      slider.bind("mouseout",function () {
        play = 1;
      });
      
      if (play) {
        var t = setInterval(function () {
          if (play) {
            if (lister.find(".act").index() < sliderSize-1) {
              lister.find(".act").next(".item").click();
            } else {
              listerItems.eq(0).click();
            }
          }
        },5000);
      }
    }
  }
})( jQuery );