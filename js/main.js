;(function () {
	
	'use strict';

	// iPad and iPod detection	
	var isiPad = function(){
		return (navigator.platform.indexOf("iPad") != -1);
	};

	var isiPhone = function(){
	    return (
			(navigator.platform.indexOf("iPhone") != -1) || 
			(navigator.platform.indexOf("iPod") != -1)
	    );
	};

	var dropDownMenu = function() {
		
	 	$(".drop-down-menu").hover(function(){
         $(this).addClass('active');
    	},
    	function(){
        	$(this).removeClass('active');
    	});

	};

	var loaderPage = function() {
		$(".fh5co-loader").fadeOut("slow");
	};

	var goToTop = function() {

		$('.js-gotop').on('click', function(event){
			
			event.preventDefault();

			$('html, body').animate({
				scrollTop: $('html').offset().top
			}, 500, 'easeInOutExpo');
			
			return false;
		});

		$(window).scroll(function(){

			var $win = $(window);
			if ($win.scrollTop() > 200) {
				$('.js-top').addClass('active');
			} else {
				$('.js-top').removeClass('active');
			}

		});
	
	};


	var owlCarouselMain = function() {
		var owl = $('.owl-carousel-main');

		owl.owlCarousel({
			items:1,
			mouseDrag: true,
			loop: true,
			margin: 0,
			responsiveClass: true,
			nav: true,
			dots: true,
			autoHeight: true,
			smartSpeed: 500,
			autoplay: true,
			autoplayHoverPause: true,
			navText: [	
				"<i class='icon-chevron-left owl-direction'></i>",
				"<i class='icon-chevron-right owl-direction'></i>"
			]
		});

		$(window).resize(function(){
			 owl.trigger('refresh.owl.carousel');
		});
	};

	var offcanvasMenu = function() {
		$('#wrap').prepend('<div id="fh5co-offcanvas" />');
		$('#fh5co-offcanvas').append( $('#fh5co-main-nav').clone() );
	};


	var burgerMenu = function() {

		$('body').on('click', '.js-fh5co-nav-toggle', function(event){
			var $this = $(this);

			if ( $('body').hasClass('offcanvas-visible') )  {
				$('body').removeClass('fh5co-overflow offcanvas-visible');
				$this.removeClass('active');
			} else {
				$('body').addClass('fh5co-overflow offcanvas-visible');
				$this.addClass('active');
			}

			event.preventDefault();

		});

		$('#fh5co-offcanvas').css('height', $(window).height());

		$(window).resize(function() {
			$('#fh5co-offcanvas').css('height', $(window).height());
			if ( $('body').hasClass('offcanvas-visible') ) {
		   	$('body').removeClass('offcanvas-visible');
		   	$('.js-fh5co-nav-toggle').removeClass('active');
		   }
		});

		$(window).scroll(function(){
			if ( $('body').hasClass('offcanvas-visible') ) {
		   	$('body').removeClass('offcanvas-visible');
		   	$('.js-fh5co-nav-toggle').removeClass('active');
		   }
		});

	};

	

	
	// Document on load.
	$(function(){

		dropDownMenu();
		owlCarouselMain();
		offcanvasMenu();
		burgerMenu();
		loaderPage();
		goToTop();

	});


}());
/*
==========================================================================
       Contact Form
       ========================================================================== */
    
    
    $('#contact-form').validate({
        rules: {
            name: {
                required: true,
                minlength: 2
            },
            email: {
                required: true,
                email: true
            },
            
            message: {
                required: true,
                minlength: 10
            }
        },
        messages: {
            name: "<i class='fa fa-exclamation-triangle'></i>Please enter your name.",
            email: {
                required: "<i class='fa fa-exclamation-triangle'></i>Please Enter your email address.",
                email: "<i class='fa fa-exclamation-triangle'></i>Please enter a valid email address."
            },
            message: "<i class='fa fa-exclamation-triangle'></i>Please enter your message."
        },
        submitHandler: function(form) {
            $(form).ajaxSubmit({
                type: "POST",
                data: $(form).serialize(),
                url: "php/contact.php",
                success: function() {
                    $('#contact-form :input').attr('disabled', 'disabled');
                    $('#contact-form').fadeTo("slow", 0.15, function() {
                        $(this).find(':input').attr('disabled', 'disabled');
                        $(this).find('label').css('cursor', 'default');
                        $('.success-cf').fadeIn();
                    });
                },
                error: function() {
                    $('#contact-form').fadeTo("slow", 0.15, function() {
                        $('.error-cf').fadeIn();
                    });
                }
            });
        }
    });