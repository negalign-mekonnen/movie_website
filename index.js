$(function(){
    $("#menu").click(function(){
        $(this).toggleClass("fa-times")
        $(".container .barlinks ul").slideToggle('slow')
    })
       window.onresize = function(){
        const mq = window.matchMedia('(max-width:800px)')
        if(mq.matches){
            return true
        }else{
            window.location.reload()
        }
       }
       $('a[href*="#"]').on('click', function(e){
        e.preventDefault();
    
        $('html, body').animate({
            scrollTop : $($(this).attr('href')).offset().top,
        },
        500, 
        'linear'
        );
    });


    $('#myInp').on("keyup", function(){
        $('.main').addClass('overflow')
        $('.box ').addClass("oactive")
        if($(this).val() == ""){
            $('.box ').removeClass("oactive")
            $('.main').removeClass('overflow')
        }
        var value = $(this).val().toLowerCase();
        var total =  $('#box div').filter(function(){
        $(this).toggle($(this).text().toLowerCase().indexOf(value)>-1)
        })
       
    })
      
   
})

    interval = setInterval(function(){
            changeSlide('nextB')
    }, 4000)

function changeSlide(direction){
    currentImg = $('.iactive')
    nextImg = currentImg.next()
    prevImg = currentImg.prev()
    if(direction == 'nextB'){
        if(nextImg.length){
            nextImg.addClass('iactive')
        }else{
            $(".home  .slides img").first().addClass("iactive")
        }
        currentImg.removeClass('iactive')
    }
    if(direction == 'prevB'){
        if(prevImg.length){
            prevImg.addClass('iactive')
        }else{
            $(".home  .slides img").last().addClass("iactive")
        }
        currentImg.removeClass('iactive')
    }

   }
   function getPageList(totalPages, page, maxLength){
    function range(start, end){
      return Array.from(Array(end - start + 1), (_, i) => i + start);
    }
  
    var sideWidth = maxLength < 9 ? 1 : 2;
    var leftWidth = (maxLength - sideWidth * 2 - 3) >> 1;
    var rightWidth = (maxLength - sideWidth * 2 - 3) >> 1;
  
    if(totalPages <= maxLength){
      return range(1, totalPages);
    }
  
    if(page <= maxLength - sideWidth - 1 - rightWidth){
      return range(1, maxLength - sideWidth - 1).concat(0, range(totalPages - sideWidth + 1, totalPages));
    }
  
    if(page >= totalPages - sideWidth - 1 - rightWidth){
      return range(1, sideWidth).concat(0, range(totalPages- sideWidth - 1 - rightWidth - leftWidth, totalPages));
    }
  
    return range(1, sideWidth).concat(0, range(page - leftWidth, page + rightWidth), 0, range(totalPages - sideWidth + 1, totalPages));
  }
  
  $(function(){
    var numberOfItems = $(".card-content .card").length;
    var limitPerPage = 8; //How many card items visible per a page
    var totalPages = Math.ceil(numberOfItems / limitPerPage);
    var paginationSize = 7; //How many page elements visible in the pagination
    var currentPage;
  
    function showPage(whichPage){
      if(whichPage < 1 || whichPage > totalPages) return false;
  
      currentPage = whichPage;
  
      $(".card-content .card").hide().slice((currentPage - 1) * limitPerPage, currentPage * limitPerPage).show();
  
      $(".pagination li").slice(1, -1).remove();
  
      getPageList(totalPages, currentPage, paginationSize).forEach(item => {
        $("<li>").addClass("page-item").addClass(item ? "current-page" : "dots")
        .toggleClass("active", item === currentPage).append($("<a>").addClass("page-link")
        .attr({href: "javascript:void(0)"}).text(item || "...")).insertBefore(".next-page");
      });
  
      $(".prev-page").toggleClass("disable", currentPage === 1);
      $(".next-page").toggleClass("disable", currentPage === totalPages);
      return true;
    }
  
    $(".pagination").append(
      $("<li>").addClass("page-item").addClass("prev-page").append($("<a>").addClass("page-link").attr({href: "javascript:void(0)"}).text("Prev")),
      $("<li>").addClass("page-item").addClass("next-page").append($("<a>").addClass("page-link").attr({href: "javascript:void(0)"}).text("Next"))
    );
  
    $(".card-content").show();
    showPage(1);
  
    $(document).on("click", ".pagination li.current-page:not(.active)", function(){
      return showPage(+$(this).text());
    });
  
    $(".next-page").on("click", function(){
      return showPage(currentPage + 1);
    });
  
    $(".prev-page").on("click", function(){
      return showPage(currentPage - 1);
    });
  });