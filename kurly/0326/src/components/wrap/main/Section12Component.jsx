import React from 'react';

export default function Section12Component () {
    return (
        <div id='section12'>
            <div className="container">
                <div className="gap">
                    <div className="content">
                        <div className="lt-bx">
                            <div className="top">
                                <h3>공지사항</h3>
                                <p>새로운 소식이 없어요</p><a href="!#">더보기<img src="./img/ico_arrow7x11_2.png" alt="" /></a>
                            </div>
                            <div className="bottom">
                                <div className="col1">
                                    <h3>
                                        고객센터<br />이용안내
                                    </h3>
                                </div>
                                <div className="col2">
                                    <ul>
                                        <li><p>온라인몰 고객센터</p><img src="./img/img_online_tel.png" alt="" /></li>
                                        <li><p>매장 고객센터</p><img src="./img/img_offline_tel.png" alt="" /></li>
                                    </ul>
                                </div>
                                <div className="col3">
                                    <h4>고객센터 운영시간 [평일 09:00 - 18:00]</h4>
                                    <p>
                                        주말 및 공휴일은 1:1문의하기를 이용해주세요. <br />
                                        업무가 시작되면 바로 처리해드립니다.
                                    </p>
                                    <div className="btn-bx">
                                        <button><img className='first' alt="" />1:1문의하기</button>
                                        <button><img className='second' alt="" />자주하는 질문</button>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="rt-bx">
                            <img src="./img/img_mobile_app.png" alt="" />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

