import React from 'react';

export default  function HeaderComponent ()  {
    return (
        <header id="header">
          <div className="container">
            <div className="gap">
                <div className="row1">
                    <div className="content">
                        <ul>
                            <li><a href="!#">회원가입</a><i>|</i></li>
                            <li><a href="!#">로그인</a><i>|</i></li>
                            <li><a href="!#">장바구니</a><i>|</i></li>
                            <li><a href="!#">주문배송</a><i>|</i></li>
                            <li><a href="!#">고객센터</a><i>|</i></li>
                            <li><a href="!#">매장안내</a><i>|</i></li>
                            <li><a href="!#">Global</a></li>
                        </ul>
                    </div>
                </div>
                <div className="row2">
                    <div className="content">
                        <div className="left">
                            <a href="!#"><img src="./img/h1_logo.png" alt="" /></a>
                        </div>
                        <div className="center">
                            <input type="text" name='serch_box' id='searchBox' placeholder='향수보다 좋은 섬유향기'/>
                        </div>
                        <div className="right">
                            <ul>
                                <li><a href="!#">오늘드림</a><img src="./img/ico_delivery_flag.png" alt="" /><i>|</i></li>
                                <li><a href="!#">관심 매장소식</a><img  className='up-down' src="./img/ico_arrow11x72.png" alt="" /><i>|</i></li>
                                <li><a href="!#">최근 본 상품</a><img className='up-down' src="./img/ico_arrow11x72.png" alt="" /></li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
          </div>
        </header>
    );
};

