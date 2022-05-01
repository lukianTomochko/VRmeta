$(document).ready(function () {
    
    $('.burgerBtn').on('click', function(){
        $('.burgerMenuBlock').toggleClass('burgerMenuBlockActive');
        $('#burgerMenuOn').fadeToggle(0);
        $('#burgerMenuOff').fadeToggle(0);
        
    });
    
    $('.owl-carousel').owlCarousel({
        margin: 25,
        nav: true,
        loop:true,
        navText: [
            '<span class="arrow-owl sliderArrowLeft"></span>',
            '<span class="arrow-owl sliderArrowRight"></span>'
        ],
        responsive: {
            0: {
                items: 1
            },
            730: {
                items: 2
            },
            800: {
                items: 2
            },
            1290: {
                items: 2
            },
            1291: {
                items: 3
            }
        }
    })
});
