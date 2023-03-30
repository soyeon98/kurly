(function($,window,document){
    const wedding={
        init(){
            this.header();
            this.section1();
            this.section2();
            this.section3();
        },
        header(){

            //페럴록스 구현
            //스크롤 탑값이 아래로 내려가면 헤더에 on 클래스를 추가한다.
            //스크롤 탑값이 위로 올라가면 헤더에 on 클래스를 삭제한다.

            console.log(`윈도우 스크롤 이벤트 $(window).scrollTop()=${$(window).scrollTop()}`); //스크롤 탑값은 스크롤이벤트가 발생되어야만 작동됨.

            //$(window).resize();//창크기 높이 너비가 변하면 동작
            $(window).scroll(function(e){
                // console.log($(this).scrollTop());
            });//스크롤 값이 변경되면 동작

            //로딩 시 바로가기 메뉴의 포지션 탑 값 가져오기
            // console.log($('#section6').offset().top);

            let newScroll = $(window).scrollTop();  //새로운 스크롤값
            let oldScroll = newScroll;              //이전 스크롤값

            $(window).scroll(function(){
                newScroll = $(window).scrollTop();
                // console.log(newScroll);
                // console.log(`newScroll-oldScroll ${newScroll-oldScroll}`);
                if(newScroll-oldScroll>0){
                    // console.log('아래로');
                    $('#header').addClass('on');
                    $('#header').removeClass('off');
                }
                if(newScroll-oldScroll<0){
                    // console.log('위로');
                    $('#header').removeClass('on');
                    $('#header').addClass('off');
                }


                oldScroll=newScroll;
                // console.log(oldScroll);
            })


            //메인버튼 클릭 이벤트 스무스 스크롤링 이벤트 구현//////////////////////////////////////////////////////////
            $('.main-btn').on({
                click(){
                    console.log($(this).attr('href')); // attribute 어트리뷰트 속성
                    let pos= $(this).attr('href'); 
                    $('html,body').animate({scrollTop:$(pos).offset().top}, 600);
                    // $('html,body').animate({scrollTop:$(pos).offset().left}, 600); top left 두가지만 있음
                }
            });

            //모바일 버튼 이벤트 
            //클릭 시 자식요소에서 line 클래스를 찾아서 find('.line')
            //  on 클래스를 추가(addClass('on'))
            // $('.mobile-btn').on({
            //     click(){              
            //       $(this).find('.line').toggleClass('on');                
            //     }
            let t=false; //토글 구현:스위칭,교환
            $('.mobile-btn').on({
                click(e){
                    e.preventDefault();//a 새로고침 기능 막기
                    if(t===false){
                        t=true;
                        $(this).find('.line').addClass('on');
                    }
                    else{
                        t=false;
                        $(this).find('.line').removeClass('on');
                    }
                    
                    
                }
            });
            
        },
        section1(){
            const $slide= $('#section1 .slide');
            const $arrowNextBtn= $('#section1 .arrow-next-btn');
            const $arrowPrevBtn= $('#section1 .arrow-prev-btn');
            const $pageBtn= $('#section1 .page-btn');

            let cnt = 0;
            let setId = 0;
            let imsi = null;
            

            // 1-1.메인 다음슬라이드 함수 : 페이드 인
            function mainNextSlide(){ // 1 2 0
                //슬라이드 모두 초기화               
                $slide                    .css({zIndex:1,opacity:1});
                // 첫번째 슬라이드
                $slide.eq(imsi!==null?imsi:(cnt===0?2:cnt-1)).css({zIndex:2}); //현재슬라이드
                //두번째 슬라이드
                $slide.eq(cnt)            .css({zIndex:3}).stop().animate({opacity:0},0).animate({opacity:1},600); //다음슬라이드
                pageBtn();
            }
            //1-2 메인 이전슬라이드 함수 : 페이드아웃
            function mainPrevSlide(){ // 1 2 0
                console.log(cnt);
                $slide                    .css({zIndex:1,opacity:1});
                $slide.eq(cnt)            .css({zIndex:2}); //이전슬라이드
                 $slide.eq(imsi!==null?imsi:(cnt===2?0:cnt+1)).css({zIndex:3}).stop().animate({opacity:1},0).animate({opacity:0},600); //현재슬라이드
                pageBtn();
            }
            // 2-1. 다음 카운트 함수
            function nextCount(){
                cnt++;
                if (cnt>2){ //마지막 슬라이드면 처음으로 리턴-0으로 초기화(페이드 인 아웃은 넥스트카운츠함수에서 초기화 시켜줌)
                    cnt=0; // 1 2 0 1 2 0 1 2 ...
                }
                mainNextSlide(); //증가된 숫자 메인함수에 전달
            }
            // 2-2. 이전 카운트 함수
            function prevCount(){
                cnt--;
                if (cnt<0){ //마지막 슬라이드면 처음으로 리턴-0으로 초기화(페이드 인 아웃은 넥스트카운츠함수에서 초기화 시켜줌)
                    cnt=2; // 1 2 0 1 2 0 1 2 ...
                }
                mainPrevSlide(); //증가된 숫자 메인함수에 전달
            }
            // 3.자동타이머 함수
            function autoTimer(){
            setId=setInterval(nextCount, 3000); //3초 후 다음카운트 함수 호출
        // setId=setInterval(prevCount, 3000); //3초 후 이전카운트 함수 호출
            }         
            autoTimer();
              //4-1.다음 화살 버튼 클릭 이벤트
            $arrowNextBtn.on({
                click(e){
                    e.preventDefault();
                    if(!$slide.is(':animated')){
                        nextCount();
                        clearInterval(setId);
                    }
                }
            });
              //4-2.이전 화살 버튼 클릭 이벤트
              $arrowPrevBtn.on({
                click(e){
                    e.preventDefault();
                    if(!$slide.is(':animated')){
                        prevCount();
                        clearInterval(setId);
                    }
                }
            });

            
            function pageBtn(){
                $pageBtn.removeClass('on');
                $pageBtn.eq(cnt > 2?0:cnt).addClass('on');
            }

            //6.페이지버튼 클릭이벤트
            $pageBtn.each(function(idx){
                $(this).on({
                    click(e){
                        e.preventDefault();
                        clearInterval(setId);                        
                        if(cnt<idx){
                            if(Math.abs(idx-cnt)>=2){
                                imsi=cnt;
                                cnt=idx;
                            }
                            else{
                                imsi=null;
                                cnt=idx;
                                
                            }
                            mainNextSlide();
                            console.log(imsi);

                        }
                        if(cnt>idx){
                            if(Math.abs(idx-cnt)>=2){
                                imsi=cnt;
                                cnt=idx;
                            }
                            else{
                                imsi=null;
                                cnt=idx;                               
                            }
                            mainPrevSlide();
                            console.log(imsi);
                        }
                    }
                });
            }); 
            
        },
        section2(){
            //패럴럭스 구현
            //섹션1의 탑값이 300px 아래로 이동시 애니메이션 동작
            const sec1Top = $('#section1').offset().top + 250;

            $(window).scroll(function(){
                if($(window).scrollTop()===0){
                    $('#section2 .left-image,#section2 .left-text,#section2 .icon-box').removeClass('on');
                }
                if($(window).scrollTop()>= sec1Top){
                    $('#section2 .left-image,#section2 .left-text,#section2 .icon-box').addClass('on');
                }

            });
        },
        section3(){}
    }
    wedding.init();


})(jQuery, window, document);