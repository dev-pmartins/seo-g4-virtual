	$(document).ready(function() {
  			$(window).scroll(function (event) {
			    var scroll = $(window).scrollTop();
			    if (scroll > 0) {
			    	$('.header').addClass('header-scrolling');
			    	console.log(scroll);
			    }else if(scroll == 0){
			    	$('.header').removeClass('header-scrolling');
			    }
			});


  			// evento click imagens
  			$('.click-event').click(function(event) {
  				$('.nav-tabs li:nth-child(3) a').trigger('click');
  			});

			// bxslider

			$(document).ready(function(){
			  $('.bxslider').bxSlider(
			  	{
			  		auto: true,
			  		speed: 500,     
			  		default: false,
			  	});
			});


			
		});