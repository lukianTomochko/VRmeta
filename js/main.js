$(document).ready(function () {

    //    working burger menu

    burgerMenuShow = false;

    $('.burgerBtn').on('click', function () {
        $('.burgerMenuBlock').toggleClass('burgerMenuBlockActive');
        $('#burgerMenuOn').fadeToggle(0);
        $('#burgerMenuOff').fadeToggle(0);

        if($(window).width() > 700){
            $(".cartBlock").toggleClass("cartBlockBurger");
            burgerMenuShow = !burgerMenuShow;
        }

    });

    //    menu scroll animation

    $(".Home").on("click", function () {
        var top = $("#headerWrapper").offset().top;
        $('body,html').animate({
            scrollTop: top
        }, 1000);
    });
    $(".Products").on("click", function () {
        var top = $("#shopBlockWrapper").offset().top;
        $('body,html').animate({
            scrollTop: top
        }, 1000);
    });
    $(".Gallary").on("click", function () {
        var top = $("#gallaryBlockWrapper").offset().top;
        $('body,html').animate({
            scrollTop: top
        }, 1000);
    });
    $(".Contacts").on("click", function () {
        var top = $("#messageFormWrapper").offset().top;
        $('body,html').animate({
            scrollTop: top
        }, 1000);
    });
    $(".About").on("click", function () {
        var top = $("#aboutusBlockWrapper").offset().top;
        $('body,html').animate({
            scrollTop: top
        }, 1000);
    });

    // Slick slider 
    
    $(".shopBlockCataloge").slick({
        infinite: false,
        arrows: true,
        slidesToShow: 3,
        slidesToScroll: 3,
        variableWidth: false,
        draggable: true,
        swipe: true,
        touchThreshold: 20,
        touchMove: false,
        responsive:[
            {
                breakpoint: 1280,
                settings: {
                    slidesToShow: 2,
                    slidesToScroll: 2,
                }
            },
            {
                breakpoint: 870,
                settings: {
                    slidesToShow: 1,
                    slidesToScroll: 1,
                }
            }
        ],
    });
    
     $(".shopBlockMenuItems").on("click", function(){
         var filter = $(this).data('filter');
         $(".shopBlockCataloge").slick('slickUnfilter');
         
         if(filter == "all"){
            $(".shopBlockCataloge").slick('slickFilter', '.shopCatalogeItems_wrapper');
         } 
         else if(filter == "headsets"){
            $(".shopBlockCataloge").slick('slickFilter', '.classHeadsets');
         }  
         else if(filter == "controllers"){
            $(".shopBlockCataloge").slick('slickFilter', '.classControllers');
         }  
         else if(filter == "consoles"){
            $(".shopBlockCataloge").slick('slickFilter', '.classConsoles');
         }  
         else if(filter == "others"){
            $(".shopBlockCataloge").slick('slickFilter', '.classOthers');
         } 
         
            
         
     });


    //    btn "about us" show text 

    $(".btnReadMore").on("click", function () {
        $("#aboutusExtraText").fadeIn(200);
        $(".btnReadMore").fadeOut(0);

    });

    // all buy event

    var countOfBuy = 1;

    var countOfDifferentProducts = 0;
    var countOfAllProducts = $('.shopBlockCatalogeItems').length;

    var allProductsArray = [];

    var allPrice = 0;

    $(".btnBuyNonActive").on("click", function () {
        $(this).fadeOut(0);
        $(this).next().css("display", "flex");

        var productsName = $(this).parent().parent().prev().prev().text();
        var productsPrice = $(this).parent().parent().parent().prev().prev().prev().children().text();

        allPrice += parseInt(productsPrice);
        $(".cartBlock_Price").text(allPrice);
        if (allPrice >= 1000) {
            $(".cartBlock").css("width", "130px")
        } else {
            $(".cartBlock").css("width", "125px")
        }

        countOfDifferentProducts += 1;

        if (countOfDifferentProducts == 1) {
            $(".BoughtProducts_Items").css("display", "flex");
        } else {
            $(".BoughtProducts_Items:nth-child(1)").clone().appendTo(".AddedProducts");
        }

        if (countOfDifferentProducts > 3) {
            $(".AddedProducts").addClass("AddedProductsScroll");
            $(".BoughtProducts_Items").addClass("BoughtProducts_ItemsScroll");
        } else {
            $(".AddedProducts").removeClass("AddedProductsScroll");
            $(".BoughtProducts_Items").removeClass("BoughtProducts_ItemsScroll");
        }

        countOfBuy = 1;

        $(".BoughtProducts_Items:nth-child(" + countOfDifferentProducts + ")").
        children().prev().text(productsName);

        $(".BoughtProducts_Items:nth-child(" + countOfDifferentProducts + ")").
        children().next().children().prev().text(productsPrice);

        $(".BoughtProducts_Items:nth-child(" + countOfDifferentProducts + ")").
        children().next().children().next().children().prev().prev().next().text(countOfBuy); // For test

        if (countOfDifferentProducts <= 0) {
            $("#nextBtnOrder").fadeOut(0);
            $(".BoughtProducts_textAlert").fadeIn(0);
        } else {
            $("#nextBtnOrder").fadeIn(0);
            $(".BoughtProducts_textAlert").fadeOut(0);
        }

        if (nextBtnShow == 1) {
            $(".AddedProducts").fadeIn(0);
        } else {
            $("#nextBtnOrder").fadeOut(0);
            $(".AddedProducts").fadeOut(0);
        }

    });

    $(".btnBuyMinuse").on("click", function () {
        countOfBuy = parseInt($(this).next().text());

        var productsName = $(this).parent().prev().parent().prev().parent().prev().prev().text();
        var productsPrice = $(this).parent().prev().parent().prev().parent().prev().prev().parent().
        prev().prev().prev().children().next().prev().text();

        allPrice -= parseInt(productsPrice);
        $(".cartBlock_Price").text(allPrice);
        $(".cartBlock_Price").text(allPrice);
        if (allPrice >= 1000) {
            $(".cartBlock").css("width", "130px")
        } else {
            $(".cartBlock").css("width", "125px")
        }

        if (countOfBuy == 1) {
            $(this).parent().prev().fadeIn(0);
            $(this).parent().css("display", "none");

            for (var i = 1; i <= countOfDifferentProducts; i++) {
                if (productsName == $(".BoughtProducts_Items:nth-child(" + i + ")").children().prev().text()) {

                    if (countOfDifferentProducts < 2) {
                        $(".BoughtProducts_Items").css("display", "none");

                    } else {
                        $(".BoughtProducts_Items:nth-child(" + i + ")").fadeOut(0).remove();
                    }

                }
            }

            countOfDifferentProducts -= 1;

            if (countOfDifferentProducts <= 0) {
                $("#nextBtnOrder").fadeOut(0);
                $("#buyBtnOrder").fadeOut(0);
                $(".nextStepOfOrdering").fadeOut(0);
                $(".BoughtProducts_textAlert").fadeIn(0);

                nextBtnShow = 1;

            } else {
                $("#nextBtnOrder").fadeIn(0);
                $(".BoughtProducts_textAlert").fadeOut(0);
            }

            if (countOfDifferentProducts <= 3) {
                $(".AddedProducts").removeClass("AddedProductsScroll");
                $(".BoughtProducts_Items").removeClass("BoughtProducts_ItemsScroll");
            }

            if (nextBtnShow == 0) {
                $("#nextBtnOrder").fadeOut(0);
            }


        } else {
            countOfBuy -= 1;
            $(this).next().text(countOfBuy);

            for (var i = 1; i < countOfDifferentProducts + 1; i++) {
                if (productsName == $(".BoughtProducts_Items:nth-child(" + i + ")").children().prev().text()) {
                    $(".BoughtProducts_Items:nth-child(" + i + ")").
                    children().next().children().next().children().prev().prev().next().text(countOfBuy);
                }
            }
        }

    });

    $(".btnBuyPlus").on("click", function () {
        countOfBuy = parseInt($(this).prev().text());
        countOfBuy += 1;

        var productsName = $(this).prev().prev().parent().prev().parent().prev().parent().prev().prev().text();
        var productsPrice = $(this).prev().prev().parent().prev().parent().prev().parent().prev().prev().parent().
        prev().prev().prev().children().next().prev().text();

        allPrice += parseInt(productsPrice);
        $(".cartBlock_Price").text(allPrice);
        $(".cartBlock_Price").text(allPrice);
        if (allPrice >= 1000) {
            $(".cartBlock").css("width", "130px")
        } else {
            $(".cartBlock").css("width", "125px")
        }

        for (var i = 1; i < countOfDifferentProducts + 1; i++) {
            if (productsName == $(".BoughtProducts_Items:nth-child(" + i + ")").children().prev().text()) {
                $(".BoughtProducts_Items:nth-child(" + i + ")").
                children().next().children().next().children().prev().prev().next().text(countOfBuy);
            }
        }

        $(this).prev().text(countOfBuy);
    });

    $(document).on('click', '.BoughtProductsPlus', function () {
        countOfBuy = parseInt($(this).prev().text());
        countOfBuy += 1;

        var productsName = $(this).prev().prev().parent().prev().parent().prev().text();
        var productsPrice = $(this).prev().prev().parent().prev().text();

        allPrice += parseInt(productsPrice);
        $(".cartBlock_Price").text(allPrice);
        $(".cartBlock_Price").text(allPrice);
        if (allPrice >= 1000) {
            $(".cartBlock").css("width", "130px")
        } else {
            $(".cartBlock").css("width", "125px")
        }

        for (var i = 1; i <= countOfAllProducts; i++) {

            var productsNameCataloge = $(".shopCatalogeItems_wrapper:nth-child(" + i + ")").children().children().next().next().next().children().next().prev().prev().text();

            if (productsName == productsNameCataloge) {
                $(".shopCatalogeItems_wrapper:nth-child(" + i + ")").children().children().next().
                next().next().children().next().prev().prev().
                next().next().children().next().children().next().
                prev().next().children().next().next().prev().text(countOfBuy);
            }

        }

        $(this).prev().text(countOfBuy);

    });

    $(document).on('click', '.BoughtProductsMinuse', function () {

        countOfBuy = parseInt($(this).next().text());

        var productsName = $(this).parent().prev().parent().prev().text();
        var productsPrice = $(this).parent().prev().text();

        allPrice -= parseInt(productsPrice);
        $(".cartBlock_Price").text(allPrice);
        $(".cartBlock_Price").text(allPrice);
        if (allPrice >= 1000) {
            $(".cartBlock").css("width", "130px")
        } else {
            $(".cartBlock").css("width", "125px")
        }

        if (countOfBuy == 1) {

            if (countOfDifferentProducts < 2) {
                $(".BoughtProducts_Items").css("display", "none");

            } else {
                $(this).parent().prev().parent().prev().parent().fadeOut(0).remove();
            }


            for (var i = 1; i <= countOfAllProducts; i++) {

                var productsNameCaraloge = $(".shopCatalogeItems_wrapper:nth-child(" + i + ")").children().
                children().next().next().next().children().next().prev().prev().text()

                if (productsName == productsNameCaraloge) {

                    $(".shopCatalogeItems_wrapper:nth-child(" + i + ")").children().children().next().next().
                    next().children().next().prev().prev().next().next().children().next().children().next().
                    prev().fadeIn(0);

                    $(".shopCatalogeItems_wrapper:nth-child(" + i + ")").children().children().next().
                    next().next().children().next().prev().prev().next().next().children().
                    next().children().next().prev().next().css("display", "none");

                }
            }

            countOfDifferentProducts -= 1;

            if (countOfDifferentProducts <= 0) {
                $("#nextBtnOrder").fadeOut(0);
                $(".BoughtProducts_textAlert").fadeIn(0);

            } else {
                $("#nextBtnOrder").fadeIn(0);
                $(".BoughtProducts_textAlert").fadeOut(0);
            }

            if (countOfDifferentProducts <= 3) {
                $(".AddedProducts").removeClass("AddedProductsScroll");
                $(".BoughtProducts_Items").removeClass("BoughtProducts_ItemsScroll");
            }


        } else {
            countOfBuy -= 1;
            $(this).next().text(countOfBuy);

            for (var i = 1; i < countOfAllProducts; i++) {

                var productsNameCaraloge = $(".shopCatalogeItems_wrapper:nth-child(" + i + ")").children().
                children().next().next().next().children().next().prev().prev().text()

                if (productsName == productsNameCaraloge) {

                    $(".shopCatalogeItems_wrapper:nth-child(" + i + ")").children().children().next().
                    next().next().children().next().prev().prev().
                    next().next().children().next().children().next().
                    prev().next().children().next().next().prev().text(countOfBuy);
                }
            }
        }

        $(this).prev().text(countOfBuy);

    });

    var nextBtnShow = 1;

    $(".cartBlock").on("click", function () {
        if (countOfDifferentProducts <= 0) {
            $("#nextBtnOrder").fadeOut(0);
            $(".BoughtProducts_textAlert").fadeIn(0);

        }
        if (countOfDifferentProducts > 0 && nextBtnShow == 1) {
            $("#nextBtnOrder").fadeIn(0);
            $(".BoughtProducts_textAlert").fadeOut(0);
        }

        $(".BoughtProductsBlock").toggleClass("BoughtProductsBlockActive");

    });

    $(document).on("click", function () {
        if (countOfDifferentProducts <= 0) {
            $("#nextBtnOrder").fadeOut(0);
            $(".BoughtProducts_textAlert").fadeIn(0);

        }
        if (countOfDifferentProducts > 0 && nextBtnShow == 1) {
            $("#nextBtnOrder").fadeIn(0);
            $(".BoughtProducts_textAlert").fadeOut(0);
        }

        $(".BoughtProductsBlock").removeClass("BoughtProductsBlockActive");
    });

    $(document).on("click", ".cartBlock", function (e) {
        e.stopPropagation();
    });
    $(document).on("click", ".BoughtProductsBlock", function (e) {
        e.stopPropagation();
    });
    $(document).on("click", ".btnBuyNonActive", function (e) {
        e.stopPropagation();
    });
    $(document).on("click", ".btnBuyPlus", function (e) {
        e.stopPropagation();
    });
    $(document).on("click", ".btnBuyMinuse", function (e) {
        e.stopPropagation();
    });
    $(document).on("click", ".shopBlockCataloge .slick-arrow", function (e) {
        e.stopPropagation();
    });

    $("#nextBtnOrder").on("click", function () {

        nextBtnShow = 0;

        $("#nextBtnOrder").fadeOut(0);
        $("#buyBtnOrder").fadeIn(0);

        $(".AddedProducts").fadeOut(0);
        $(".nextStepOfOrdering").fadeIn(0);

    });

    $("#buyBtnOrder").on("click", function () {

        for (var i = 1; i < countOfDifferentProducts + 1; i++) {

            var productsName = $(".BoughtProducts_Items:nth-child(" + i + ")").children().prev().text();
            var productsPrice = $(".BoughtProducts_Items:nth-child(" + i + ")").children().next().children().
            prev().text();
            var productsCount = $(".BoughtProducts_Items:nth-child(" + i + ")").children().next().children().
            next().children().prev().prev().next().text();

            allProductsArray.push(productsName + " - " + productsPrice + "  Quantity - " + productsCount);

        }

        allProductsArray.push("\n" + "Totally - " + allPrice + " $");

        jsonArray = JSON.stringify(allProductsArray);

        jsonYourName = JSON.stringify($("#yourName").val());
        jsonYourPhone = JSON.stringify($("#yourPhone").val());
        jsonYourAddress = JSON.stringify($("#yourAddress").val());


    });

    // Ajax form for Order List

    var formOrder = $("#form-order");
    formOrder.on("submit", function (e) {
        e.preventDefault();
        $.ajax({
            method: "POST",
            url: "../php/sendProducts.php",
            data: {
                yourName: jsonYourName,
                yourPhone: jsonYourPhone,
                yourAddress: jsonYourAddress,
                orderArray: jsonArray
            }

        }).done(function (response2) {
            $(".nextStepOfOrdering").fadeOut(0);
            $("#buyBtnOrder").fadeOut(0);

            $(".alertFormBuy").fadeIn(0);
            $(".alertFormBuy").text(response2);
        });

    });

    // nav scroll effect

    $(window).scroll(function () {
        var scrollTop = $(window).scrollTop()
        if (scrollTop > 70 && $(window).width() > 700) {
            $(".cartBlock").addClass("cartBlockScroll");
        }
        if (scrollTop < 70 && $(window).width() > 700) {
            $(".cartBlock").removeClass("cartBlockScroll");
        }


        if (scrollTop > 450 && burgerMenuShow == true && $(window).width() > 700) {
            $(".cartBlock").removeClass("cartBlockBurger");
        }
        if (scrollTop < 450 && burgerMenuShow == true && $(window).width() > 700) {
            $(".cartBlock").addClass("cartBlockBurger");

            if (countOfDifferentProducts <= 0) {
                $("#nextBtnOrder").fadeOut(0);
                $(".BoughtProducts_textAlert").fadeIn(0);

            }
            if (countOfDifferentProducts > 0 && nextBtnShow == 1) {
                $("#nextBtnOrder").fadeIn(0);
                $(".BoughtProducts_textAlert").fadeOut(0);
            }

            $(".BoughtProductsBlock").removeClass("BoughtProductsBlockActive");

        }
    });

    // Ajax form

    var form = $("#form-enquiry");
    form.on("submit", function (e) {
        e.preventDefault();
        $.ajax({
            method: "POST",
            url: "../php/send.php",
            data: form.serialize()
        }).done(function (response) {
            $(".responeseOnform").text(response);

            $("#name").val("");
            $("#phone").val("");
            $("#email").val("");
            $("#theme").val("");
            $("#message").val("");
        });

    });



});
