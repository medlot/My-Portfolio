jQuery(document).ready(function($){

	var $active = false;

	$('.work').click(function(e){
		e.preventDefault();

		var $work = $(this);  
		if ($work.hasClass('active')){ 
			return true;
		}
		var $detail = $work.parent().nextAll('.row-detail:first');
		var $work_detail = $('.work-detail', $work).clone(); // $work.find('.work-detail')

		 
		var showWork = function(){
			$detail.append($work_detail); 
			$work_detail.slideDown();

			$('.work').removeClass('active');
			$work.addClass('active');

			$active = $work_detail; 


			//animate content
			for (var i = 1 ; i <= 4; i++) {
				$('.stagger'+i, $work_detail).css({opacity:0, marginLeft: -20}).delay(300 + 200*i).animate({
					 opacity: "1" , 
					 marginLeft: "0"
				})
			};
		}

		var hideWork = function(){
			$el = $active;
			$el.slideUp(500, function(){
				$el.remove();
			});
		}

		var buildSlide = function(){
			$('.work_slideshow', $work_detail).nivoSlider({
				 	effect: 'random',                 // Specify sets like: 'fold,fade,sliceDown'
				    slices: 15,                     // For slice animations
				    boxCols: 8,                     // For box animations
				    boxRows: 4,                     // For box animations
				    animSpeed: 500,                 // Slide transition speed
				    pauseTime: 4000,                 // How long each slide will show
				    startSlide: 0,                     // Set starting Slide (0 index)
				    directionNav: true,             // Next & Prev navigation
				    controlNav: false,                 // 1,2,3... navigation
				    controlNavThumbs: false,         // Use thumbnails for Control Nav
				    pauseOnHover: true,             // Stop animation while hovering
				    manualAdvance: false,             // Force manual transitions
				    prevText:  '<',                 // Prev directionNav text
				    nextText: '>' ,                 // Next directionNav text
				    randomStart: false,             // Start on a random slide
				    beforeChange: function(){},     // Triggers before a slide transition
				    afterChange: function(){},         // Triggers after a slide transition
				    slideshowEnd: function(){},     // Triggers after all slides have been shown
				    lastSlide: function(){},         // Triggers when last slide is shown
				    afterLoad: function(){}         // Triggers when slider has loaded
			});
		}

		if($active){
			hideWork()
		}

		showWork();

		buildSlide();

		window.location.hash = $work.attr('id');

		

	});


		if(window.location.hash){
			var $target = $(window.location.hash);
			if($target.length > 0){
				$target.trigger('click');
				scrollTo($target);
			}
		}

		var scrollTo = function(cible){
			$('html, body').animate({scrollTop: cible.offset().top }, 750);
		} 

});