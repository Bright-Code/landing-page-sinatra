jQuery(document).ready(function($) {

    'use-strict';

    //useful var
    var $window = $(window);
    var gsnavfixH = $('#gs-navfix').outerHeight();


    /**
     * Make easing scroll when click a link in page
     */
    var GSeasingMoving = function() {
        $('a[href*=#]:not([href=#])').on('click', function() {
            if (location.pathname.replace(/^\//, '') == this.pathname.replace(/^\//, '') && location.hostname == this.hostname) {
                var target = $(this.hash);
                target = target.length ? target : $('[name=' + this.hash.slice(1) + ']');
                if (target.length) {
                    $('html,body').animate({
                        scrollTop: target.offset().top - gsnavfixH
                    }, 800);
                    return false;
                }
            }
        });
    };

    GSeasingMoving();


    /**
     * Full height element
     */
    $.fn.fullHeight = function(minheight) {
        var $this = $(this);
        var minH = minheight || 480;

        $this.outerHeight($window.height());
        $window.on('resize', $(this), function(event) {
            $this.outerHeight(Math.max($window.height(),minH));
            event.preventDefault();
        });
    };
    $('.gs-main-header-fullheight').fullHeight();


    var GSnavFix = function(){
        $window.on('scroll', function(event) {
            event.preventDefault();

            var mainFirstChildHeight = $('main>header').outerHeight();

            if ($window.scrollTop() >= mainFirstChildHeight - gsnavfixH)
                $('#gs-navfix').addClass('gs-appear');
            else
                $('#gs-navfix').removeClass('gs-appear');
        });
    };

    GSnavFix();

    var GSnavRight = function(){
        $('.gs-hamburger').on('click', function(event) {
            event.preventDefault();
            $('.gs-hamburger').toggleClass('gs-close');
            $('#gs-nav-static-hamburger').toggleClass('gs-nav-right-appear');
            $('main,#gs-navfix,#gs-nav-static').toggleClass('gs-nav-right-appear');
            $('#gs-nav-right').toggleClass('gs-appear');
        });
    };

    GSnavRight();


    /**
     *  Change active status of each pricing table when click
     */
    var GSpricingTableStatus = function() {

        $('#gs-pricing-table-group .gs-pricing-table-item .gs-pricing-table-button').on('click', function(event) {
            var $pricingTableItem = $('.gs-pricing-table-item');
            var $thisParent = $(this).parent().parent('.gs-pricing-table-item');

            $pricingTableItem.removeClass('active');
            $thisParent.addClass('active');

            event.preventDefault();
        });

    };

    GSpricingTableStatus();


    /**
     * Countdowm Clock in underconstruction
     * Use each you put more than one countdown clock in a page with html
     */

    var GScountdown = function(){
        $('.gs-countdown-clock').each(function() {
            var countdownTime = $(this).attr('countdown-time');
            $(this).countdown({
                until     : countdownTime,
                format    : 'ODHMS',
                padZeroes : true
            });
        });
    };
    GScountdown();



    /**
     * Fade home content when scroll down
     *@param fadeStart :position start fade home
     *@param fadeEnd :position end fade home (opcity = 0)
     */
    var GSfadeHome = function(){
        var fadeStart = 100;
        var fadeEnd = 600;
        var fadeRange = fadeEnd - fadeStart;
        $window.on('scroll', function () {
            var posiNow = $window.scrollTop();
            var opa = function(){
                if(posiNow <= fadeStart)
                    return 1;
                else if(posiNow >= fadeEnd)
                    return 0;
                else
                    return 1 - (posiNow - fadeStart) / fadeRange;
            };
            $('#gs-home-content').css('opacity', opa);
        });
    };
    GSfadeHome();

    /**
     * Home slider
     */
    var GShomeSlider = function() {
        //use class vs each make you can use this carousel more than one in a page
        //but performer is reduce

        $('.gs-home-slider').each(function() {
            $(this).owlCarousel({
                autoplay: true,
                mouseDrag: false,
                autoplayTimeout: 5000,
                singleItem: true,
                items: 1,
                dots: $(this).hasClass('has-dots'),
                nav: $(this).hasClass('has-nav'),
                smartSpeed: 600,
                loop: true,
                onInitialized: GShomeSliderCaption,
                onTranslate: GShomeSliderHideCaption,
                onTranslated: GShomeSliderCaption,
                onRefreshed:GShomeSliderCaption
            });
        });
    };

    window.onload = GShomeSlider();

    /**
     * Call back to hide Home slider caption
     */
    function GShomeSliderHideCaption() {

        var $caption = $('.gs-home-slider-item').children('.gs-home-slider-caption');
        $caption.css('animation', 'fadeOutDown 0s 0.4s forwards');
    }

    /**
     * Call back to show slider caption
     */
    function GShomeSliderCaption() {
        var $thisCaption = $('.active .gs-home-slider-item').children('.gs-home-slider-caption');

        $thisCaption.each(function() {
            var delayTime = $(this).index() * 1500 + 600;
            $(this).css('animation', 'fadeInUp 500ms ' + delayTime + 'ms forwards');

        });
    }


    /**
     * Portfolio carousel
     */
    var GSportfolioCarousel = function() {

        //use class vs each make you can use this carousel more than one in a page
        //but performer is reduce
        $('.gs-portfolio-carousel').each(function() {
            $(this).owlCarousel({
                autoplay: true,
                singleItem: true,
                center: true,
                responsive: {
                    0: {
                        margin: 15,
                        items: 1,
                    },
                    992: {
                        margin: 30,
                        items: 2,
                    },
                    1440: {
                        margin: 60,
                        items: 2,
                    }
                },
                dots: $(this).hasClass('has-dots'),
                nav: $(this).hasClass('has-nav'),
                smartSpeed: 800,
                loop: true
            });
        });
    };

    GSportfolioCarousel();


    /**
     * Testimonial carousel
     */
    var GStesimonialCarousel = function() {

        //use class vs each make you can use this carousel more than one in a page
        //but performer is reduce
        $('.gs-testimonial-carousel').each(function() {
            $(this).owlCarousel({
                center: true,
                responsive: {
                    0: {
                        margin: 15,
                        items: 1,
                    },
                    992: {
                        margin: 30,
                        items: 2,
                    },
                    1440: {
                        margin: 60,
                        items: 3,
                    }
                },
                dots: $(this).hasClass('has-dots'),
                nav: $(this).hasClass('has-nav'),
                smartSpeed: 800,
                loop: true
            });
        });
    };

    GStesimonialCarousel();


    /**
     * Image carousel like in one blog
     * @param nxs number img item in xs-screen
     * @param nsm number img item in sm-screen
     * @param nmd number img item in md-screen
     * @param nlg number img item in lg-screen
     * @param nxlg number img item in xlg-screen
     */

    var GSimaggeCarousel = function() {

        $('.gs-images-carousel').each(function() {
            var $this = $(this);
            var nxs = ($this.attr('number-carousel-xs') || 1);
            var nsm = ($this.attr('number-carousel-sm') || nxs);
            var nmd = ($this.attr('number-carousel-md') || nsm);
            var nlg = ($this.attr('number-carousel-lg') || nmd);
            var nxlg = ($this.attr('number-carousel-xlg') || nlg);

            $(this).owlCarousel({
                autoplay: true,
                mouseDrag: $(this).hasClass('mouse-drag'),
                responsive: {

                    0: {
                        items: nxs,
                    },
                    768: {
                        items: nsm,
                    },
                    992: {
                        items: nmd,
                    },
                    1200: {
                        items: nlg,
                    },
                    1440: {
                        items: nxlg,
                    }
                },
                dots: $(this).hasClass('has-dots'),
                nav: $(this).hasClass('has-nav'),
                smartSpeed: 800,
                loop: true
            });
        });
    };

    GSimaggeCarousel();


    /**
     * Section Video
     */
    var GSsectionVideo = function() {
        var sectionVideo = document.getElementById('gs-section-video');
        var stt = 0;
        var $playButton = $('#gs-play-section-video');
        var $overlay = $('#gs-video-overlay');

        var playV = function() {
            sectionVideo.play();
            $playButton.addClass('gs-played');
            $overlay.addClass('gs-video-played');
            stt = 1;
        };

        var pauseV = function() {
            sectionVideo.pause();
            $playButton.removeClass('gs-played');
            $overlay.removeClass('gs-video-played');
            stt = 0;
        };

        $overlay.on('click', function(event) {
            // $(this).css('background', 'red');
            if (stt === 0 && $playButton.hasClass('gs-played')) {
                playV();
            }
            else {
                pauseV();
            }
            event.preventDefault();
        });

        $playButton.on('click', function(event) {
            $(this).addClass('gs-played');
            event.preventDefault();
        });

    };

    GSsectionVideo();


    /**
     * Parallax
     */
    var GSparallax = function(){
        if ($window.width() > 768) {
            $window.stellar({
                scrollProperty: 'scroll',
                positionProperty: 'transform',
                horizontalScrolling: false,
                verticalScrolling: true,
                horizontalOffset: 0,
                verticalOffset: 0,
                responsive: true,
                parallaxBackgrounds: true,
                parallaxElements: true,
                hideDistantElements: true,
                hideElement: function($elem) {
                    $elem.css('opacity', '0');
                },
                showElement: function($elem) {
                    $elem.css('opacity', '1');
                }
            });
        }
    };

    GSparallax();



});