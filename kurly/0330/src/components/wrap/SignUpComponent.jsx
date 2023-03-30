import React from 'react';
import axios from 'axios';

export default function SignUpComponent({회원가입,timer,timerCounterFn,mapAddressFn}) { //내부 props와 외부 props가 섞이지 않도록 비구조화해서 넣어준다

    //상위 컴포넌트(WrapComponent)프롭스 
    const {setId,minutes,seconds,msg,isEnd} =timer
    const[state,setState]=React.useState(회원가입);
    const createRef = React.useRef(); //입력상자 휴대폰을 선택함(참조함.reference)



    // 타이머 카운트 점검 유효시간만료
    React.useEffect(()=>{
     
            setState({
                ...state,
                //모달 오픈 변수
                isConfirmModal:isEnd,
                //모달 메시지 변수
                confirmMsg:msg
            })
   
    },[isEnd]); //false => true 시점 실행

    //1. 아이디 입력상자 onChange 이벤트
    const onChangeUserId=(e)=>{
        // 입력제한조건
        // 정규표현식 만들기
        // 1. 특수문자 입력 즉시 삭제 => - ] \ 이스케이프문자 처리-앞에 \쳐주기
        // 2. 6~16자
        // 3. 한글 사용 안됨
        // 4. 영문필수, 숫자선택 => 2가지이상 영문, 숫자 
        // 5. 공백 사용 안됨
        const {value} =e.target //비구조화 === 구조분할할당
        const regExp1= /[`~!@#$%^&*()\-_=+\\|[\]{};:'",<.>/?]/g; 
        const regExp2= /.{6,16}/g; //6자 이상 16자 이하 
        const regExp3= /[가-힣ㄱ-ㅎㅏ-ㅣ]/g; //한글
        const regExp4= /[A-Za-z]+[0-9]*/g; //영문 필수 1자이상 + 숫자 선택 0자 이상 *
        const regExp5= /\s/g; //공백
        let 아이디='';
        let isIdError=false;
        let isIdMsg='';

        // 1. 문자열.replace(정규식,''); //특수문자를 공백으로 치환(삭제)
        아이디 =value.replace(regExp1,'');

        //테스트 정규식.test(문자열) 특수문자면 true 아니면 false 출력
        // console.log(regExp1.test(e.target.value));

        // 2. 정규식.test(문자열) 2거나 3이거나 4거나 5면 문구 뜨게 
        if(regExp2.test(value)===false || regExp3.test(value)===true|| regExp4.test(value)===false || regExp5.test(value)===true ){
            isIdError=true;
            isIdMsg='6자 이상 16자 이하의 영문 혹은 영문과 숫자를 조합';
        }
        else{
            isIdError=false;
            isIdMsg='';
        }


        setState({
            ...state,
            아이디:아이디,
            isIdError:isIdError,
            isIdMsg:isIdMsg
        })
    }

    //2. 아이디 중복확인 onClick 이벤트
    const onClickUserIdOk=(e)=>{
        e.preventDefault();
        const value =state.아이디 // 상태관리값 변수에 대입
        const regExp2= /.{6,16}/g; //6자 이상 16자 이하 
        const regExp3= /[가-힣ㄱ-ㅎㅏ-ㅣ]/g; //한글
        const regExp4= /[A-Za-z]+[0-9]*/g; //영문 필수 1자이상 + 숫자 선택 0자 이상 *
        const regExp5= /\s/g; //공백
       

        if(regExp2.test(value)===false || regExp3.test(value)===true|| regExp4.test(value)===false || regExp5.test(value)===true ){
           setState({
            ...state,
            isConfirmModal:true,
            confirmMsg:'6자 이상 16자 이하의 영문 혹은 영문과 숫자를 조합'
           })
        }
        else{
            //아이디 중복검사 실시
            // 가져오는 방법 REST APT 사용 AJAX 또는 AXIOS JSON 데이터처리에 가장 좋은 패키지
            //서버에서 DB(데이터베이스)에 저장된 아이디 데이터를 가져온다-서버사이드 스크립트언어가 MYSQL SQL 명령문을 이용해 가져온다.
            //입력된 아이디와 비교
            // axios({}).then(()=>{}).catch(()=>{});
            // 정보요청 Request
            axios({
            url:'http://qkrthdus98.dothome.co.kr/signup_db/select.php',
            method:'GET'
            })
            .then((res)=>{
                //맵함수이용 화살표함수 중괄호빼고 사용하면
                //비교 결과 true false배열로 곧바로 리턴
                const result =res.data.map((item)=>item.아이디===state.아이디);
                
            
                //result[false,flase,false,...]
                if(result.includes(true)){
                    setState({
                        ...state,
                        isIdOk:false,
                        isConfirmModal:true,
                        confirmMsg:'사용 불가능한 아이디입니다.'
                    })
                }
                else{
                    setState({
                        ...state,
                        isIdOk:true,
                        isConfirmModal:true,
                        confirmMsg:'사용 가능한 아이디입니다.'
                    })
                }
            })
            .catch((err)=>{
                console.log(`AXIOS 실패! ${err}`)
            })
        }


    }

    // 3. 비밀번호 입력상자 onChange 이벤트
    const onChangeUserPw =(e)=>{
    // 입력제한 조건
    // 1. 10자 이상 16자이하
    // 2. ([영문(1자 이상)]+[숫자(1자 이상)]+)+| 영문+ 특수문자+ +| 숫자+ 특수문자+
    // 3. 한글 사용 안됨
    // 4. 공백 사용 안됨
    // 5. 동일한 숫자 3개 이상 연속 사용 불가
    const {value} =e.target;
    let isPwError=false;
    let isPwMsg='';

    // [] 범위 () 그룹 | 또는 + 반드시 1자 이상 * 0자 이상
    // 특수문자는 \- \] \\ 이 세가지는 반드시 이스케이프 문자 처리
    const regExp1 = /.{10,16}/g; //true면 정상
    const regExp2 = /([0-9]+[A-Za-z]+)+|([A-Za-z]+[0-9]+)+|([`~!@#$%^&*()\-_=+\\|[\]{};:'",<.>/?]+[A-Za-z]+)+|([A-Za-z]+[`~!@#$%^&*()\-_=+\\|[\]{};:'",<.>/?]+)+|([0-9]+[`~!@#$%^&*()\-_=+\\|[\]{};:'",<.>/?]+)+|([`~!@#$%^&*()\-_=+\\|[\]{};:'",<.>/?]+[0-9]+)/g; //true면 정상
    const regExp3 = /[가-힣ㄱ-하-ㅣ]/g; //false면 정상
    const regExp4= /\s/g; //false면 정상
    const regExp5= /(\d)\1\1/g; // false면 정상 => 동일한 숫자 연속 3자 이상 
    // const regExp6= /(.)\1\1/g; 동일한 문자나 숫자 연속 3자 이상
        if(regExp1.test(value)===false){
            isPwError=true;
            isPwMsg='최소 10자 이상 입력';
        }
        else if(regExp5.test(value)===true){
            isPwError=true;
            isPwMsg='동일한 숫자 3개 이상 연속 사용 불가';
        }
        else if(regExp2.test(value)===false||regExp3.test(value)===true ||regExp4.test(value)===true){
            isPwError=true;
            isPwMsg='영문/숫자/특수문자(공백 제외)만 허용하며, 2개 이상 조합';
        }
        else{
            isPwError=false;
            isPwMsg='';
        }
        setState({
            ...state,
            isPwError:isPwError,
            isPwMsg:isPwMsg,
            비밀번호:value
        })

    }

    // 4. 비밀번호 확인 입력상자 onChange 이벤트
    // 공백이면 : 비밀번호를 한번 더 입력해 주세요.
    // 비밀번호와 비밀번호확인 입력상자 입력값 다르면 : 동일한 비밀번호를 입력
    const onChangeUserPw2=(e)=>{
        const {value}=e.target;
        let isPw2Error=false;
        let isPw2Msg='';

        //현재 입력값과 이전에 입력된 비밀번호를 비교한다
        if(value===''){  
            isPw2Error=true;
            isPw2Msg='비밀번호를 한번 더 입력해 주세요.';
        }
        else if(value!==state.비밀번호){
            isPw2Error=true;
            isPw2Msg='동일한 비밀번호를 입력';
        }
        else{
            isPw2Error=false;
            isPw2Msg='';
        }
        setState({
            ...state,
            isPw2Error:isPw2Error,
            isPw2Msg:isPw2Msg,
            비밀번호확인:value
        })
    }

    // 5. 이름 입력상자 onChange 이벤트
    //입력제한조건
    // 1.특수문자 입력과 동시에 삭제
    // 2. 공백이면 : 이름을 입력해 주세요.
    const onChangeUserName=(e)=>{
        const {value} =e.target;
        let isNameError=false;
        let isNameMsg='';
        let 이름 ='';
        const regExp = /[`~!@#$%^&*()\-_=+\\|[\]{};:'",<.>/?]/g; 

        이름= value.replace(regExp,'');
        if(이름===''){
            isNameError=true;
            isNameMsg='이름을 입력해 주세요.';
        }
        else{
            isNameError=false;
            isNameMsg='';
        }


        setState({
            ...state,
            isNameError:isNameError,
            isNameMsg:isNameMsg,
            이름: 이름
        })

        
    }
    // 5. 이메일 입력상자 onChange 이벤트
    //입력제한조건
    //예시
    //212psy@naver.com
    //212psy@naver.co.kr
    //. - _ 특수문자 사용 가능
    // 한글 가능
    // 공백 사용 안됨
    // (영문숫자한글)필수.(영문숫자한글)선택@(영문숫자한글-_.)필수.(영문숫자한글-._) .영문만 {2,3} 맨뒤    => ? (1자 또는 0자)
    const onChangeUserEmail=(e)=>{
        const {value} =e.target;
        let isEmailError=false;
        let isEmailMsg='';
        const regExp=/^[a-z0-9가-힣ㄱ-ㅎㅏ-ㅣ\-_]+(\.)?[a-z0-9가-힣ㄱ-ㅎㅏ-ㅣ\-_]*@[a-z0-9가-힣ㄱ-ㅎㅏ-ㅣ.\-_]+\.[a-z]{2,3}$/gi; // -> ignore = 영문 대소문자 구별없음 ^[]시작,[^ 범위]부정, $끝

        if(value===''){
            isEmailError=true;
            isEmailMsg='이메일을 입력해 주세요.';
        }
        else if(regExp.test(value)===false){
            isEmailError=true;
            isEmailMsg='이메일 형식으로 입력해 주세요.';
        }
        else{
            isEmailError=false;
            isEmailMsg='';
        }

        setState({
            ...state,
            이메일:value,
            isEmailError:isEmailError,
            isEmailMsg:isEmailMsg
        })
    }
    // 5-2 이메일 중복 검사
    const onClickUserEmailOk=(e)=>{
        e.preventDefault();
    
        const value =state.이메일;
        const regExp=/^[a-z0-9가-힣ㄱ-ㅎㅏ-ㅣ\-_]+(\.)?[a-z0-9가-힣ㄱ-ㅎㅏ-ㅣ\-_]*@[a-z0-9가-힣ㄱ-ㅎㅏ-ㅣ.\-_]+\.[a-z]{2,3}$/gi; // -> ignore = 영문 대소문자 구별없음 ^[]시작,[^ 범위]부정, $끝

        if(value===''){
           setState({
            ...state,
            isConfirmModal:true,
            confirmMsg:'이메일을 입력해 주세요.'
           })
        }
        else if(regExp.test(value)===false){
            setState({
                ...state,
                isConfirmModal:true,
                confirmMsg:'이메일 형식으로 입력해 주세요.'
               })
        }
        else{
          axios({
            url:'http://qkrthdus98.dothome.co.kr/signup_db/select.php',
            method:'GET'
          })
          .then((res)=>{

            // 만약에 오류나면 
            //예외처리
            try{
                const result=res.data.map((item)=>item.이메일===state.이메일);
                console.log(result);
                console.log(res.data);
                if(result.includes(true)){
                    setState({
                        ...state,
                        isEmailOk:false,
                        isConfirmModal:true,
                        confirmMsg:'사용 불가능한 이메일 입니다.'
                    });
                }
                else{
                    setState({
                        ...state,
                        isEmailOk:true,
                        isConfirmModal:true,
                        confirmMsg:'사용 가능한 이메일 입니다.'
                    });
                }
            }
            catch(err){
                console.log(`AXIOS 실패 메시지! ${err}`);
            }
            
          })
          .catch((err)=>{
            console.log(`AXIOS 실패 메시지! ${err}`);
          });
        }




    }
    //6 휴대폰 입력상자 onChange 이벤트
    const onChangeUserHp=(e)=>{
        e.preventDefault();
  
        const {value} =e.target
        let 휴대폰='';
        let isHpError=false;
        let isHpMsg='';
        let isHpDisabled=true;
        //숫자가 아닌것
        const regExp = /[^\d]/g;
        휴대폰 = value.replace(regExp,'');
        if(휴대폰===''){
            isHpError=true;
            isHpMsg='휴대폰 번호를 입력해 주세요.';
        }
        else{
            isHpError=false;
            isHpMsg='';
            if(휴대폰.length>1){
                isHpDisabled=false;
            }
            else{
                isHpDisabled=true;
            }
        }

 
        setState({
            ...state,
            휴대폰:휴대폰,
            isHpError:isHpError,
            isHpMsg:isHpMsg,
            isHpDisabled:isHpDisabled
          
        })
    }
    //6-2 휴대폰 발송인증번호 받기 클릭이벤트
    const onClickHpNum=(e)=>{
        e.preventDefault();
        //휴대폰 번호가 정확한지 정규표현식 유효성 검사
        //010-2701-8808
        //(011~019)-2701-8808
        // const regExp= /^01[0|1|2|3|4|5|6|7|8|9]+[0-9]{3,4}[0-9]{4}$/;
        const regExp= /^01[0-9]{1}[0-9]{3,4}[0-9]{4}$/;
        let isConfirmModal=false;
        let confirmMsg='';
        let num =0; //발송인증번호 상태관리변수 등록
        let 발송인증번호 = '';
        let isHpOk=false;
       
        if(regExp.test(state.휴대폰)===false){
            isConfirmModal=true;
            confirmMsg='잘못된 휴대폰 번호 입니다. 확인 후 다시 시도 해 주세요';
            isHpOk=false;
    
        }
        else{
            num=Math.floor(Math.random()*900000+100000); //6자리의 난수 발생

            //상태관리 변수에 인증번호 저장
            발송인증번호=num;
            isConfirmModal=true;        
            confirmMsg=`인증번호가 발송되었습니다. ${num}`;
            isHpOk=true;
            //인증번호 전송 타이밍
          
           

        }
        setState({
            ...state,
            isConfirmModal:isConfirmModal,
            confirmMsg:confirmMsg,
            발송인증번호:발송인증번호,
            isHpOk:isHpOk
           
        })
    }

    // 6-3휴대폰 인증번호 입력상자
    const onChangeUserHp2=(e)=>{
        const {value} = e.target
        let isHpDisabled2=true;
    
        if(value.length>=1){
            isHpDisabled2=false;
        }
        else{
            isHpDisabled2=true;
        }

        setState({
            ...state,
            입력인증번호:value,
            isHpDisabled2:isHpDisabled2

        })

    }
    // 6-4 휴대폰 인증번호 확인 클릭이벤트
    const onClickHpNum2=(e)=>{
        e.preventDefault();
        let isConfirmModal=false;
        let confirmMsg='';
        let isHp3=true;
        let isHpDisabled=true;
        let 발송인증번호 =state.발송인증번호;
        //입력인증번호(문자)와 발송인증번호(숫자) 비교하기
        isConfirmModal=true;
        if (state.발송인증번호!==Number(state.입력인증번호)){          
            confirmMsg='잘못된 인증번호 입니다. 확인 후 다시 시도 해 주세요';
            isHp3=true;
            발송인증번호=state.발송인증번호;
            isHpDisabled=false;
        }
        else{
            confirmMsg='인증에 성공하였습니다.';
            isHp3=false;
            발송인증번호='';
            isHpDisabled=true;
            //타이머 정지
       
            clearInterval(setId);
        }
        setState({
            ...state,
            isConfirmModal:isConfirmModal,
            confirmMsg:confirmMsg,
            isHp3:isHp3,
            발송인증번호:발송인증번호,
            isHpDisabled:isHpDisabled
        })
       
    }

    //6-5 다른 번호 인증
    const onClickHpNum3=(e)=>{
        e.preventDefault();
        setState({
            ...state,
            isHp3:true,
            휴대폰:'',
            입력인증번호:'',
            발송인증번호:''
        })
        // 1. 맨 위 ROOT영역에 ref를 생성하고 createRef에 저장한다
        // 2. createRef 변수를 태그요소인 휴대폰 입력상자에 ref={createRef}에 대입시킨다.
        // 3. 이벤트 수행 시 휴대폰 입력상자에 커서를 포커스 시킨다. createRef.current.focus();
        createRef.current.focus();
    }

    // 7-1.주소검색 API : 팝업창 구현
    // public(정적요소) 
    //popup.html
    const openPopupDaumPostApi=()=>{
        const popupFile='./popup.html';
        const popupName='_popupAddressApi';
        const popupWidth=530;
        const popupHeight=570;
        const popupTop= (window.innerHeight-popupHeight)/2;   //(윈도우높이-팝업창높이)/2;
        const popupLeft= (window.innerWidth-popupWidth)/2;
        window.open(popupFile,popupName,`width=${popupWidth},height=${popupHeight},top=${popupTop},left=${popupLeft}`);
    }
    const onClickAddrPopupOpenApi=(e)=>{
        e.preventDefault();
        openPopupDaumPostApi();      
    }
    // 7-2세션스토리지 가져오기 이벤트
    // 함수는 화면이 마운트되고 난 후 실행한다
    //4. 세션스토리지에서 키("SYADDRESS")를 찾는다
    //5. 만약 있다면 가져오기 getItem()
    //6. 반값이면 리턴
    //7. 값이 있다면 문자형 객체를 JSON.parse() 형식으로 변환한다.
    //8. 속성값 주소1, 주소2를 주소입력창에 바인딩 시킨다.
    const getSessionStogare=()=>{
        const key="SYADDRESS";
        let 주소1='';
        let 주소2='';
        let isAdderss=false;
        // 스토리지 데이터 가져오기 데이터 없으면 null 반환
        let result=sessionStorage.getItem(key)
        if(result!==null){ //데이터가 있다면
            result=JSON.parse(sessionStorage.getItem(key));
            주소1=result.주소1;
            주소2=result.주소2;
            isAdderss=true;
            mapAddressFn(`${result.주소1} ${result.주소2}`,false);
        }
        setState({
            ...state,
            주소1:주소1,
            주소2:주소2,
            isAdderss:isAdderss
        })
    }

    React.useEffect(()=>{
        getSessionStogare();
    },[state.주소1]);

    //7-3 주소1 입력상자 이벤트
    const onChangeaddr1 =(e)=>{
        setState({
            ...state,
            주소1:e.target.value
        })
    }
    //7-4 주소2 입력상자 이벤트
    const onChangeaddr2 =(e)=>{
        setState({
            ...state,
            주소2:e.target.value
        })
    }
    //7-5 주소 재검색
    const onClickResearchBtn=(e)=>{
        openPopupDaumPostApi();    
    }



    // 8.성별 라디오버튼 이벤트
    const onChangeGender=(e)=>{
        setState({
            ...state,
            성별:e.target.value
        })
    }

    //9.생년월일
    //생년월일 입력상자 입력제한조건
    // 0. 숫자만 입력 나머지 모두 제거 => 정규표현식
    // 1. 모든 칸이 빈칸이면 오류없음 초기화
    // 2. 년 채워지면 월입력 요구
    // 2. 년 100세 이하
    // 2. 년 14세 미만 불가
    // 2. 년 미래불가
    // 3. 월(1-12) 채워지면 일 입력 요구
    // 4. 일(1-31) 이 채워지고 오류가 없다면 완료

    //생년월일 입력제한조건 및 이벤트 수행 메인함수

    const birthCheckFn=()=>{
        const newYear = new Date().getFullYear();
        let isBirth=false;
        let isBirthMsg='';
        if(state.생년===''&&state.생월===''&&state.생일===''){
            isBirth=false;
            isBirthMsg='';
        }
        else{
            // 1) 생년 제한조건
                // 0. 년 채워지면 월입력 요구
                // 1. 년 100세 이하
                // 2. 년 14세 미만 불가
                // 3. 년 미래불가
            if(state.생년.length<4){// 1. 생년 4자리
                isBirth=true;
                isBirthMsg='태어난 년도 4자리를 정확하게 입력해주세요.';
            }   
            else if(Number(state.생년)>newYear){// 2. 생년 미래불가  
                isBirth=true;
                isBirthMsg='생년월일이 미래로 입력 되었습니다.';
            } 
            else if(Number(state.생년)>=(newYear-14)){// 3.생년 14세 미만 불가              
                isBirth=true;
                isBirthMsg='만 14세 미만은 가입이 불가합니다.';
            } 
            else if(Number(state.생년)<(newYear-100)){// 4. 생년 100세 이하
                isBirth=true;
                isBirthMsg='생년월일을 다시 확인해주세요.';
            }   
            else{
                //생월체크 (1-12)
                if(Number(state.생월)<1||Number(state.생월)>12){
                    isBirth=true;
                    isBirthMsg='태어난 월을 정확하게 입력해주세요.';
                }
                else{
                    //생일체크(1-31)
                    if(Number(state.생일)<1||Number(state.생일)>31){
                        isBirth=true;
                        isBirthMsg='태어난 일을 정확하게 입력해주세요.';
                    }
                    else{
                        //생년월일 모두 이상 없다. 오류메시지 삭제 - 완료
                        isBirth=false;
                        isBirthMsg='';
                    }
                }
            }
        }
        //상태관리
        setState({
            ...state,
            isBirth:isBirth,
            isBirthMsg:isBirthMsg
        })
    }
    React.useEffect(()=>{
        birthCheckFn();
    },[state.생년,state.생월,state.생일])

    // 1) 생년 onChange() 이벤트 상태관리자 연결 변수 만들기
    const onChangeYear=(e)=>{
        const regExp=/[^\d]/g;
        let 생년=e.target.value.replace(regExp,'');
        setState({
            ...state,
            생년:생년
        })
    }
    // 2) 생월 onChange() 이벤트 상태관리자 연결 변수 만들기
    const onChangeMonth=(e)=>{
        const regExp=/[^\d]/g;
        let 생월=e.target.value.replace(regExp,'');
        setState({
            ...state,
            생월:생월
        })
    }
    // 3) 생일 onChange() 이벤트 상태관리자 연결 변수 만들기
    const onChangeDate=(e)=>{
        const regExp=/[^\d]/g;
        let 생일=e.target.value.replace(regExp,'');
        setState({
            ...state,
            생일:생일
        })
    }


    //10-1.추가입력사항
    const onChangeUserChooga=(e)=>{
        let 추가입력사항='';
        let isChooga1=false;
        let isChooga2=false;

        if(e.target.checked===true){
            추가입력사항=e.target.value;
            if(e.target.id==='userChooga1'){ //선택 라디오1번, 라디오2
                isChooga1=true;
                isChooga2=false;
            }
            else{
                isChooga1=false;
                isChooga2=true;
            }

        }
        else{
            추가입력사항='';
            isChooga1=false;
            isChooga2=false;
        }
        setState({
            ...state,
            추가입력사항:추가입력사항,
            isChooga1:isChooga1,
            isChooga2:isChooga2
        })
    }

    // 10-2 추천인 아이디 입력상자온체인지이벤트
    const onChangeUserChoogaId=(e)=>{
        let isChoogaDisabled =false;
        if(e.target.value.length>1){
            isChoogaDisabled =false;
        }
        else{
            isChoogaDisabled =true;
        }
        setState({
            ...state,
            추천인아이디:e.target.value,
            isChoogaDisabled:isChoogaDisabled
        })
    }
     // 10-3 참여이벤트명 입력상자온체인지이벤트
     const onChangeUserChoogaEvent=(e)=>{
        setState({
            ...state,
            참여이벤트명:e.target.value
            
        })
    }

    //10-4 추천인 아이디 확인 : 데이터베이스 조회
    //서버에서 디비정보와 비교 아이디가 있다면 이벤트 참여 가능 
    // 버튼 클릭 이벤트
  
    const onClickChoogaIdokBtn=(e)=>{
        e.preventDefault();
        let isConfirmModal = false;
        let confirmMsg ='';
        let isChoogaDisabled = false;

        // 웹서버에 접근 해서 데이터베이스 접근 조회 서버사이드스크립트
        axios({
            url:'http://qkrthdus98.dothome.co.kr/signup_db/select.php',
            method:'GET'

        })
        .then((res)=>{ //Success
            const result = res.data.map((item)=>item.아이디===state.추천인아이디);
            if(result.includes(true)){ // 추천인이 있다면 모달창 띄우고 버튼 사용 불가,색상 연하게
                //존재하는 아이디 입니다. 친구초대 이벤트에 참여 가능해요.
                isConfirmModal=true;
                confirmMsg='존재하는 아이디 입니다. 친구초대 이벤트에 참여 가능해요.';
                isChoogaDisabled=true;

            }
            else{
                //존재하지 않는 아이디 입니다.
                isConfirmModal=true;
                confirmMsg='존재하지 않는 아이디 입니다.';
                isChoogaDisabled=false;
            }
            setState({
                ...state,
                isConfirmModal:isConfirmModal,
                confirmMsg:confirmMsg,
                isChoogaDisabled:isChoogaDisabled
            })
        })
        .catch((err)=>{ //Error
            console.log(`AXIOS 실패 ${err}`);
        })
        
   
    }

    // 11.이용약관동의
    //11-1전체동의 체크박스 온체인지이벤트
    // 개별체크해서 이용약관동의 항목이 7개이면 체크한다.
    //7개미만이면 체크해제
    const onChangeUserServiceAll=(e)=>{
        let 이용약관동의 = [];
        if(e.target.checked===true){
            //전체동의에 체크했다면
            // 이용약관 배열 7개의 항목 모두 이용약관동의 배열에 저장한다.
            이용약관동의 = state.이용약관;

        }
        else{
            이용약관동의 = []; //빈배열 삭제
        }
        setState({
            ...state,
            이용약관동의:이용약관동의
        })
    }
    //11-2 체크박스 개별체크 7개
    const onChangeUserService=(e)=>{
  
        if(e.target.checked){ //체크되면 개별 체크 선택항목 value 값을 이용약관동의 배열에 저장한다

            //무료배송, 할인쿠폰 등 혜택/정보 수신 동의(선택) 체크되면 SMS, 이메일도 체크되어야함(이용약관동의배열에 저장된다.)
            if(e.target.value==='무료배송, 할인쿠폰 등 혜택/정보 수신 동의(선택)' && state.이용약관동의.includes('SMS')===false&&state.이용약관동의.includes('이메일')===false){
                    setState({
                                ...state,
                                이용약관동의:[...state.이용약관동의,e.target.value, 'SMS', '이메일']
                            })
            }
            else if(e.target.value==='무료배송, 할인쿠폰 등 혜택/정보 수신 동의(선택)' && state.이용약관동의.includes('SMS')===false){
                    setState({
                                ...state,
                                이용약관동의:[...state.이용약관동의,e.target.value,'SMS']
                            })
            }
            else if(e.target.value==='무료배송, 할인쿠폰 등 혜택/정보 수신 동의(선택)' && state.이용약관동의.includes('이메일')===false){
                    setState({
                                ...state,
                                이용약관동의:[...state.이용약관동의,e.target.value,'이메일']
                            })
            }
            else if(e.target.value==='SMS' && state.이용약관동의.includes('이메일')===true && state.이용약관동의.includes('무료배송, 할인쿠폰 등 혜택/정보 수신 동의(선택)')===false){
                    setState({
                                ...state,
                                이용약관동의:[...state.이용약관동의,e.target.value,'무료배송, 할인쿠폰 등 혜택/정보 수신 동의(선택)']
                            })
            }
            else if(e.target.value==='이메일' && state.이용약관동의.includes('SMS')===true && state.이용약관동의.includes('무료배송, 할인쿠폰 등 혜택/정보 수신 동의(선택)')===false){
                    setState({
                                ...state,
                                이용약관동의:[...state.이용약관동의,e.target.value,'무료배송, 할인쿠폰 등 혜택/정보 수신 동의(선택)']
                            })
            }
            else{
                    setState({
                                ...state,
                                이용약관동의:[...state.이용약관동의,e.target.value]
                            })
            }
        }
        else{ //체크 안되면 개별 체크 선택항목 value 값을 이용약관동의 배열에 삭제시킨다.
            let 이용약관동의 =[]; //임시배열

            //무료배송 해제하면 무료배송,SMS, 이메일 모두 해제한다 : state.이용약관동의 배열값 3개 모두 삭제
                //삭제 1[state.이용약관동의] 무료배송 => state.이용약관동의 제거 후 임시 배열에 저장
                //삭제 2[이용약관동의] SMS
                //삭제 3[이용약관동의] 이메일
            if(e.target.value==='무료배송, 할인쿠폰 등 혜택/정보 수신 동의(선택)'){
                이용약관동의=state.이용약관동의.filter((item)=>item!==e.target.value);
                이용약관동의=이용약관동의.filter((item)=>item!=='SMS');
                이용약관동의=이용약관동의.filter((item)=>item!=='이메일');
                setState({
                    ...state,
                    이용약관동의:이용약관동의
                })
            }
            else if(e.target.value==='SMS' && state.이용약관동의.includes('이메일')){
                이용약관동의 = state.이용약관동의.filter((item)=>item!==e.target.value)
                이용약관동의=이용약관동의.filter((item)=>item!=='무료배송, 할인쿠폰 등 혜택/정보 수신 동의(선택)');
                setState({
                    ...state,
                    이용약관동의:이용약관동의
                })

            }
            else if(e.target.value==='이메일' && state.이용약관동의.includes('SMS')){
                이용약관동의 = state.이용약관동의.filter((item)=>item!==e.target.value)
                이용약관동의=이용약관동의.filter((item)=>item!=='무료배송, 할인쿠폰 등 혜택/정보 수신 동의(선택)');
                setState({
                    ...state,
                    이용약관동의:이용약관동의
                })

            }
            else{
                setState({
                    ...state,
                    이용약관동의:state.이용약관동의.filter((item)=>item!==e.target.value)
                })
            }
    
        }

    }

    //컨펌 모달 닫기 이벤트
    const onClickConfirmModalClose=(e)=>{
        e.preventDefault();

        // console.log(state.confirmMsg.includes('인증번호가 발송되었습니다')); // true or false
        // console.log(state.confirmMsg.indexOf('인증번호가 발송되었습니다'));  // false면 -1 출력 true면 0을 출력
        // console.log(state.confirmMsg.search ('인증번호가 발송되었습니다'));  // false면 -1 출력 true면 0을 출력 .을 못 찾음

        if(state.confirmMsg.includes('인증번호가 발송되었습니다')){
            //타이머 함수 호출
            timerCounterFn();
        }
        setState({
            ...state,
            isConfirmModal:false
        })
    }

        // 가입하기버튼 클릭 이벤트 전송
        const onSubmitSignUpEvent=(e)=>{
            e.preventDefault();
    
    
            //AJAX({});
    
            // const formData = {
            //     아이디:state.아이디,
            //     비밀번호:state.비밀번호
            // }
            // $.ajax({
            //     url:'http://qkrthdus98.dothome.co.kr/signup_db/insert.php',
            //     type:'POST',
            //     data:formData,
            //     success(res){
            //         console.log('AJAX 성공',res);
    
            //     },
            //     error(err){
            //         console.log('AJAX 실패',err);
    
            //     }
            // });
    
            //axios()
            //생성자 생성
            // let newFormData=new FormData();
            // newFormData.append('아이디',state.아이디);
            // newFormData.append('비밀번호',state.비밀번호);
              
            // axios({
            //     url:'http://qkrthdus98.dothome.co.kr/signup_db/insert.php',
            //     method:'POST',
            //     data:newFormData //전송할 폼데이터
            // })
            // .then((res)=>{
            //     console.log(res.data);
            // })
            // .catch((err)=>{
            //     console.log(err);
            // })
    
            //가입하기 버튼 클릭 시
            // 입력폼 화면의 필수 항목과 선택항목, 그리고 중복확인, 인증 등 
            // 항목들의 빠짐없는 항목을 체크하고 가용성있는 폼데이터를 전송한다
            // 1. 아이디 : 빈값이면 입력 요구
            // 2. 아이디 중복확인 : 중복확인검사 isIdOk
            // 3. 비빌번호: 빈값이면 입력요구
            // 4. 비밀번호 확인 : 두개 비밀번호 비교확인 추가 isPw2 =false && 빈값아님
            // 5. 이름 : 빈값이면 입력 요구
            // 6. 이메일: 빈값이면 입력 요구
            // 7. 이메일 중복확인 : 중복확인검사 isEmailOk
            // 8. 휴대폰 : 빈값이면 입력 요구
            // 9. 휴대폰 : 인증번호 성공 여부확인 인증성공 추가 isHpOk true
            // 10. 주소1,주소2 :빈값이면 입력 요구
    
            //11. 성별 : 선택사항이므로 유효성검사 제외
            //12. 생년월일 : 선택사항이므로 유효성검사 제외
            //13. 추가입력사항 : 선택사항이므로 유효성검사 제외    
    
            //14. 이용약관동의 : 필수항목 3개 확인 추가 검증 
            // - 가입하기 클릭하면 이용약관 동의 배열값 내용 중 필수 항목을 카운트한다. 변수에 대입
            // const result =state.이용약관동의.map((item)=>item.includes('필수')?1:0);
    
            // let sum=0;
            // result.map((item)=>{
            //     sum+=item;
            // })
    
            // if(sum<3){
    
            //     setState({
            //         ...state,
            //         isConfirmModal:true,
            //         confirmMsg:'이용약관동의 필수항목 3개를 선택해야 합니다.'
            //     })
            // }
            // else{
            //     setState({
            //         ...state,
            //         isConfirmModal:false,
            //         confirmMsg:''
            //     })
            // }
    
            /////////////search///////////////////////////////////()안에 값을 못 찾으면 -1 출력
            // let cnt2=0;
            // state.이용약관동의.map((item)=>{
            //     if(item.search('필수')!==-1){
            //         cnt2++;
            //     }
      
            // });
            // if(cnt2<3){
             
            // }
            // else{
             
            // }
      
            //////////////indexOf///////////////////////////////////////()안에 값을 못 찾으면 -1 출력
            let cnt=0;
            state.이용약관동의.map((item)=>{
                if(item.indexOf('필수')!==-1){
                    cnt++;
                }
            })
    
            if(state.아이디===''){
                setState({
                    ...state,
                    isConfirmModal:true,
                    confirmMsg:'아이디를 입력하세요'
                })
            }
            else if(state.isIdError===true){
                setState({
                    ...state,
                    isConfirmModal:true,
                    confirmMsg:'아이디를 형식에 맞게 입력하세요'
                })
            }
            else if(state.isIdOk===false){
                setState({
                    ...state,
                    isConfirmModal:true,
                    confirmMsg:'아이디중복확인을 해주세요'
                })
            }
            else if(state.비밀번호===''){
                setState({
                    ...state,
                    isConfirmModal:true,
                    confirmMsg:'비밀번호를 입력하세요'
                })
            }
            else if(state.isPwError===true){
                setState({
                    ...state,
                    isConfirmModal:true,
                    confirmMsg:'비밀번호를 형식에 맞게 입력하세요'
                })
            }
            else if(state.비밀번호확인===''){
                setState({
                    ...state,
                    isConfirmModal:true,
                    confirmMsg:'비밀번호확인을 다시 해주세요'
                })
            }
            else if(state.isPw2Error===true){
                setState({
                    ...state,
                    isConfirmModal:true,
                    confirmMsg:'비밀번호확인을 다시 해주세요'
                })
            }
            else if(state.이름===''){
                setState({
                    ...state,
                    isConfirmModal:true,
                    confirmMsg:'이름을 입력하세요'
                })
            }
            else if(state.이메일===''){
                setState({
                    ...state,
                    isConfirmModal:true,
                    confirmMsg:'이메일를 입력하세요'
                })
            }
            else if(state.isEmailError===true){
                setState({
                    ...state,
                    isConfirmModal:true,
                    confirmMsg:'이메일 형식을 확인하세요'
                })
            }
            else if(state.isEmailOk===false){
                setState({
                    ...state,
                    isConfirmModal:true,
                    confirmMsg:'이메일 중복확인을 해주세요'
                })
            }
            else if(state.휴대폰===''){
                setState({
                    ...state,
                    isConfirmModal:true,
                    confirmMsg:'휴대폰번호를 입력하세요'
                })
            }
            else if(state.isHp3===true){
                setState({
                    ...state,
                    isConfirmModal:true,
                    confirmMsg:'인증번호 확인을 해주세요'
                })
            }
            else if(state.주소1===''){
                setState({
                    ...state,
                    isConfirmModal:true,
                    confirmMsg:'주소를 입력하세요'
                })
            }
            else if(state.주소2===''){
                setState({
                    ...state,
                    isConfirmModal:true,
                    confirmMsg:'나머지 주소를 입력하세요'
                })
            }
            else if(cnt<3){
                setState({
                    ...state,
                    isConfirmModal:true,
                    confirmMsg:'필수 항목을 모두 체크해주셔야합니다.'
                })
            }
            else{
            // 휴대폰 표현형식
            // 시작 숫자 3자리 $1
            // 중간 숫자 3~4자리 $2 
            // 끝 숫자 4자리 $3
            const regExpHp = /^(\d{3})(\d{3,4})(\d{4})$/g;

            // 전송할 폼데이터 생성
            // AXIOS 폼데이터 생성 생성자를 이용 폼데이터 삽입
            let newFormData = new FormData();
            newFormData.append('user_id',state.아이디);
            newFormData.append('user_pw',state.비밀번호);
            newFormData.append('user_name',state.이름);
            newFormData.append('user_email',state.이메일);
            newFormData.append('user_hp',state.휴대폰.replace(regExpHp,'$1-$2-$3'));
            newFormData.append('user_addr',`${state.주소1} ${state.주소2}`);
            newFormData.append('user_gender', state.성별);
            newFormData.append('user_birth', `${state.생년}-${state.생월}-${state.생일}`);
            newFormData.append('user_add_input', `${state.추가입력사항} ${state.참여이벤트명} ${state.추천인아이디}`);
            newFormData.append('user_service', state.이용약관동의);
            newFormData.append('user_gaib_date', `${new Date().getFullYear()}-${new Date().getMonth()+1}-${new Date().getDate()}`);

            // AXIOS API(REST API)
            // CORS (Cross Origin Resource Sharing)
            // Node.js기반에서 리액트가 있는 위치 http://localhost:3000/
            // 프로토콜://도메인:포트번호/경로/index.html
            // 브라우져가 보내는 주소(출처)와 받는 주소가 같은지 검사 SOP RFC 6454 보안정책
            // => 출처가 같은 출처에서만 공유할 수 있다는 정책/규칙
            axios({
                url:'http://qkrthdus98.dothome.co.kr/signup_db/form_data_insert.php', // 닷홈 호스팅 서버 : 서버사이드 스크립트 언어(JSP, PHP, ASP) => SQL => 데이터베이스 저장소
                method:'POST',
                data:newFormData
            })
            .then((res)=>{
                if(res.status===200){
                    console.log(res.data);
                    setState({
                        ...state,
                        isConfirmModal:true,
                        confirmMsg:'가입되었습니다.'
                    })
                }
            })
            .catch((err)=>{
                console.log('AXIOS 실패',err);
            })
   
            }

        }


    return (
        <>
            <main id='signUp'>
                <section id='section1'>
                    <div className="container">
                        <div className="gap">
                            <div className="title">
                                <h2>회원가입</h2>
                                <p><span><i>*</i>필수입력사항</span></p>
                            </div>
                            <div className="content">
                                <form onSubmit={onSubmitSignUpEvent} name='sign_up_form' id='signUpForm' method='post' action="./sign_up.php">
                                    <ul>
                                        <li>
                                            <div>
                                                <label htmlFor="userId">아이디<i>*</i></label>
                                                <div className='center-box'>
                                                    <input 
                                                        type="text" maxLength={16} name='user_id' id='userId' 
                                                        placeholder='아이디를 입력해주세요'
                                                        onChange={onChangeUserId}
                                                        value={state.아이디}
                                                        />
                                                </div>
                                                <button
                                                    type='button'
                                                    onClick={onClickUserIdOk}
                                                >중복확인</button>
                                                <p className={`error-msg ${state.isIdError?' on':''}`}>{state.isIdMsg}</p>
                                            </div>                        
                                        </li>
                                        <li>
                                            <div>
                                                <label htmlFor="userPw">비밀번호<i>*</i></label>
                                                <div className='center-box'>
                                                    <input 
                                                        type="password" maxLength={16} name='user_pw' id='userPw' 
                                                        placeholder='비밀번호를 입력해주세요'
                                                        onChange={onChangeUserPw}
                                                        value={state.비밀번호}
                                                    />
                                                </div>
                                                <p className={`error-msg ${state.isPwError?` on`:''}`}>{state.isPwMsg}</p>
                                            </div>
                                        </li>
                                        <li>
                                            <div>
                                                <label htmlFor="userPw2">비밀번호확인<i>*</i></label>
                                                <div className='center-box'>
                                                    <input 
                                                        type="password" maxLength={16} name='user_pw2' id='userPw2' 
                                                        placeholder='비밀번호를 한번 더 입력해주세요'
                                                        onChange={onChangeUserPw2}
                                                        value={state.비밀번호확인}
                                                    />
                                                </div>
                                                <p className={`error-msg ${state.isPw2Error?' on':''}`}>{state.isPw2Msg}</p>
                                            </div>
                                        </li>
                                        <li>
                                            <div>
                                                <label htmlFor="userName">이름<i>*</i></label>
                                                <div className='center-box'>
                                                    <input 
                                                        type="text" name='user_name' id='userName' 
                                                        placeholder='이름을 입력해주세요'
                                                        onChange={onChangeUserName}
                                                        value={state.이름}
                                                    />
                                                </div>
                                                <p className={`error-msg ${state.isNameError?'on':''}`}>{state.isNameMsg}</p>
                                            </div>
                                        </li>
                                        <li>
                                            <div>
                                                <label htmlFor="userEmail">이메일<i>*</i></label>
                                                <div className='center-box'>
                                                    <input 
                                                        type="email" name='user_email' id='userEmail' 
                                                        placeholder='이메일을 입력해주세요'
                                                        onChange={onChangeUserEmail}
                                                        value={state.이메일}
                                                    />
                                                </div>
                                                <button
                                                    type='button'
                                                    onClick={onClickUserEmailOk}
                                                >중복확인</button>
                                                <p className={`error-msg ${state.isEmailError?' on':''}`}>{state.isEmailMsg}</p>
                                            </div>
                                        </li>
                                        <li>
                                            <div>
                                                <label htmlFor="userHp">휴대폰<i>*</i></label>
                                                <div className='center-box'>
                                                    <input 
                                                        type="text" maxLength={11} name='user_hp' id='userHp' 
                                                        placeholder='숫자만 입력해주세요'
                                                        onChange={onChangeUserHp}
                                                        value={state.휴대폰}
                                                        ref={createRef}
                                                    />
                                                </div>
                                                <button className={`hp-num-btn ${state.isHpDisabled?'':' on'}`} onClick={onClickHpNum} disabled={state.isHpDisabled} type='button'>인증번호 받기</button>
                                                <button className={`hp-num-btn hp-num-btn3 ${state.isHp3?'':' on'}`} onClick={onClickHpNum3} type='button'>다른번호 인증</button>
                                                <p className={`error-msg ${state.isHpError?' on':''}`}>{state.isHpMsg}</p>  
                                            </div>
                                        </li>
                                            {
                                                state.발송인증번호!==''&&(
                                                    <li>
                                                        <div>
                                                            <div className='center-box'>
                                                                <input 
                                                                    type="text" maxLength={6} name='user_hp2' id='userHp2' 
                                                                    placeholder='인증번호를 입력해주세요'
                                                                    onChange={onChangeUserHp2}
                                                                />
                                                                <span className='hp-timer-counter'>{minutes<10?`0${minutes}`:minutes}:{seconds<10?`0${seconds}`:seconds}</span>
                                                            </div>
                                                            <button className={`hp-num-btn ${state.isHpDisabled2?'':' on'}`} onClick={onClickHpNum2} disabled={state.isHpDisabled2} type='button'>인증번호 확인</button> 
                                                        </div>
                                                    </li>
                                                )
                                           
                                            }                                    
                                        <li>
                                            <div>
                                                <label htmlFor="userAddress1">주소<i>*</i></label>
                                                <div className='center-box'>
                                          
                                                    <button className={`addr-search-btn ${state.isAdderss?' on':''}`} onClick={onClickAddrPopupOpenApi} type='button'>주소검색</button>                                            
                                                    <input onChange={onChangeaddr1} onFocus={onChangeaddr1} className={`${state.isAdderss?'on':''}`} type='text' name='user_address1' id='userAddress1' placeholder='검색   주소1' value={state.주소1} />
                                                    <input onChange={onChangeaddr2} onFocus={onChangeaddr2}className={`${state.isAdderss?'on':''}`} type='text' name='user_address2' id='userAddress2' placeholder='나머지 주소2' value={state.주소2} />
                                                    <h5>샛별배송</h5>
                                                                                                    
                                                    <h6>배송지에 따라 상품 정보가 달라질 수 있습니다.</h6>
                                                </div>
                                                
                                                 
                                                    <button onClick={onClickResearchBtn}type='button' className={`addr-research-btn ${state.isAdderss?' on':''}`}>재검색</button>
                                                
                                            
                                            </div>
                                        </li>
                                        <li>
                                            <div>
                                                <label>성별   </label>
                                                <div className="center-box gender">
                                                    <label htmlFor="userMale"> <input onChange={onChangeGender} type="radio" name='user_gender' id='userMale' value={'남자'} checked={state.성별.includes('남자')}/>남자</label>
                                                    <label htmlFor="userFemale"> <input onChange={onChangeGender} type="radio" name='user_gender' id='userFemale' value={'여자'} checked={state.성별.includes('여자')}/>여자</label>
                                                    <label htmlFor="userNone"> <input onChange={onChangeGender} type="radio" name='user_gender' id='userNone' value={'선택안함'} checked={state.성별.includes('선택안함')}/>선택안함</label>
                                                </div>

                                            </div>
                                        </li>
                                        <li>
                                            <div>
                                                <label>생년월일 </label>
                                                <div className="center-box birth">
                                                    <div className="birth-box">
                                                        <ul>
                                                            <li>
                                                                <input 
                                                                    type="text" maxLength={4} name='user_birth_year' 
                                                                    id='userBirthYear' 
                                                                    placeholder='YYYY'
                                                                    onChange={onChangeYear}
                                                                    value={state.생년}
                                                                />
                                                            </li>
                                                            <li><i>/</i></li>
                                                            <li>
                                                                <input 
                                                                    type="text" maxLength={2} name='user_birth_month' 
                                                                    id='userBirthMonth' 
                                                                    placeholder='MM'
                                                                    onChange={onChangeMonth}
                                                                    value={state.생월}
                                                                />
                                                            </li>
                                                            <li><i>/</i></li>
                                                            <li>
                                                                <input
                                                                     type="text" 
                                                                     maxLength={2} name='user_birth_date' 
                                                                     id='userBirthDate' 
                                                                     placeholder='DD' 
                                                                     onChange={onChangeDate}
                                                                     value={state.생일}
                                                                />
                                                            </li>
                                                        </ul>
                                                    </div>
                                                </div>
                                                <p className={`error-msg ${state.isBirth?' on':''}`}>{state.isBirthMsg}</p>
                                            </div>
                                        </li>
                                        <li>
                                            <div>
                                                <label>추가입력 사항 </label>
                                                <div className="center-box chooga">
                                                    <label> 
                                                    <input  
                                                        type="radio" name='user_chooga' 
                                                        id='userChooga1' 
                                                        value={'친구초대 추천인 아이디'}
                                                        onChange={onChangeUserChooga}
                                                        checked={state.추가입력사항.includes('친구초대 추천인 아이디')}
                                                        
                                                    />친구초대 추천인 아이디
                                                    </label>
                                                    <label> 
                                                    <input  
                                                        type="radio" name='user_chooga' 
                                                        id='userChooga2' 
                                                        value={'참여 이벤트명'} 
                                                        onChange={onChangeUserChooga}
                                                        checked={state.추가입력사항.includes('참여 이벤트명')}
                                                    />참여 이벤트명
                                                    </label>
                 
                                                </div>
                                                <div className="chooga-box">
                                                { 
                                                            state.isChooga1&&(
                                                                <>   
                                                                    <input 
                                                                        type="text " name='user_chooga_id' id='userChoogaId' 
                                                                        placeholder='추천인 아이디를 입력해 주세요' 
                                                                        onChange={onChangeUserChoogaId}
                                                                        value={state.추천인아이디}
                                                                    />     
                                                                    <h6>가입 후 7일 내 첫 주문 배송완료 시, 친구초대 이벤트 적립금이 지급됩니다.</h6>
                                                                </>
                                                            )
                                                    }
                                                    {
                                                        state.isChooga2&&(
                                                            <>
                                                                <input 
                                                                    type="text " 
                                                                    name='user_chooga_event' 
                                                                    id='userChoogaEvent' 
                                                                    placeholder='참여 이벤트명을 입력해 주세요.'
                                                                    onChange={onChangeUserChoogaEvent}
                                                                    value={state.참여이벤트명}
                                                                 />     
                                                                <h6>
                                                                추천인 아이디와 참여 이벤트명 중 하나만 선택 가능합니다. <br />
                                                                가입 이후는 수정이 불가능 합니다. <br />
                                                                대소문자 및 띄어쓰기에 유의해주세요.
                                                                </h6>                                                                    
                                                            </>
                                                        )
                                                    }
                                                </div> {/* chooga-box */}
                                                {
                                                    state.isChooga1&&(
                                                        <button 
                                                            className={`chooga-idok-btn ${state.isChoogaDisabled?' on':''}`}
                                                            onClick={onClickChoogaIdokBtn}
                                                            disabled={state.isChoogaDisabled}
                                                        >아이디 확인</button>
                                                    )   
                                                   }
                                            </div>
                                        </li>
                                        <li className='hr'>
                                            <hr />
                                        </li>
                                        <li className='service-box'>
                                            <div>
                                                <label>이용약관동의<i>*</i>  </label>
                                                <div className="center-box service">
                                                    <ul>
                                                        <li>
                                                            <label>
                                                                 <input 
                                                                    onChange={onChangeUserServiceAll} 
                                                                    type="checkbox" name='user_service_all' 
                                                                    id='userServiceAll' 
                                                                    value={'전체 동의합니다.'} 
                                                                    checked={state.이용약관동의.length===7}
                                                                 />전체 동의합니다.</label>
                                                            <h5>선택항목에 동의하지 않은 경우도 회원가입 및 일반적인 서비스를 이용할 수 있습니다.</h5>
                                                        </li>
                                                        <li>
                                                            <label>
                                                                 <input  
                                                                    type="checkbox"
                                                                    name='user_service1' 
                                                                    id='userService1' 
                                                                    value={'이용약관 동의(필수)'} 
                                                                    checked={state.이용약관동의.includes('이용약관 동의(필수)')}
                                                                    onChange={onChangeUserService}
                                                                  />이용약관 동의</label><span>필수</span>
                                                        </li>
                                                        <li>
                                                            <label> 
                                                                <input  
                                                                    type="checkbox" 
                                                                    name='user_service2' 
                                                                    id='userService2' 
                                                                    value={'개인정보 수집∙이용 동의(필수)'} 
                                                                    checked={state.이용약관동의.includes('개인정보 수집∙이용 동의(필수)')}
                                                                    onChange={onChangeUserService}
                                                                />개인정보 수집∙이용 동의</label><span>필수</span>
                                                        </li>
                                                        <li>
                                                            <label> 
                                                                <input  
                                                                    type="checkbox" 
                                                                    name='user_service3' 
                                                                    id='userService3' 
                                                                    value={'개인정보 수집∙이용 동의(선택)'} 
                                                                    checked={state.이용약관동의.includes('개인정보 수집∙이용 동의(선택)')}
                                                                    onChange={onChangeUserService}
                                                                />개인정보 수집∙이용 동의</label><span>선택</span>
                                                        </li>
                                                        <li>
                                                            <label>
                                                                 <input 
                                                                    type="checkbox"
                                                                    name='user_service4' 
                                                                    id='userService4' 
                                                                    value={'무료배송, 할인쿠폰 등 혜택/정보 수신 동의(선택)'} 
                                                                    checked={state.이용약관동의.includes('무료배송, 할인쿠폰 등 혜택/정보 수신 동의(선택)')}
                                                                    onChange={onChangeUserService}
                                                                  />무료배송, 할인쿠폰 등 혜택/정보 수신 동의</label><span>선택</span>
                                                        </li>
                                                        <li className='service56'>
                                                            <label > 
                                                                <input  
                                                                    type="checkbox" 
                                                                    name='user_service5' 
                                                                    id='userService5' 
                                                                    value={'SMS'} 
                                                                    checked={state.이용약관동의.includes('SMS')}
                                                                    onChange={onChangeUserService}
                                                                />SMS</label>
                                                            <label>
                                                                 <input  
                                                                    type="checkbox" 
                                                                    name='user_service6' 
                                                                    id='userService6' 
                                                                    value={'이메일'} 
                                                                    checked={state.이용약관동의.includes('이메일')}
                                                                    onChange={onChangeUserService}
                                                                 />이메일</label>
                                                            <h6>동의 시 한 달간 [5%적립] + [2만원 이상 무료배송] 첫 주문 후 안내</h6>
                                                        </li>
                                                        <li>
                                                            <label> 
                                                                <input 
                                                                    type="checkbox"
                                                                    name='user_service7'
                                                                    id='userService7' 
                                                                    value={'본인은 만 14세 이상입니다.(필수)'}
                                                                    checked={state.이용약관동의.includes('본인은 만 14세 이상입니다.(필수)')}
                                                                    onChange={onChangeUserService}
                                                                />본인은 만 14세 이상입니다.</label><span>필수</span>
                                                        </li>
                                                    </ul>
                                                </div>

                                            </div>
                                        </li>
                                        <li>
                                            <button type='submit'>가입하기</button>
                                        </li>
                                    </ul>
                                </form>
                            </div>
                        </div>
                    </div>
                </section>     
            </main>
            {
                state.isConfirmModal&&(
                    <div id="confirmModal">
                        <div className="wrap">
                            <div className="container">
                                <div className="content">
                                    <div className="title-box">
                                        <h1>{state.confirmMsg}</h1>                                
                                    </div>
                                    <div className="button-box">
                                        <button onClick={onClickConfirmModalClose}>확인</button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                )
            }

        </>
    );
};


SignUpComponent.defaultProps={
    회원가입:{
        //id, pw, name, email, ph, address, gender, birth, chooga, service, gaib_date
        //1.아이디
        아이디:'',        //입력상자 아이디 저장
        isIdError:false, //입력상자 아이디 유효성 검사 오류여부
        isIdMsg:'',
        // 1-2 아이디 중복 확인
        isIdOk:false,

        //2.비밀번호
        비밀번호:'', 
        isPwError:false,
        isPwMsg:'',

        //3.비밀번호 확인
        비밀번호확인:'',
        isPw2Error:false,
        isPw2Msg:'',
        // 4. 이름
        이름:'',
        isNameError:false,
        isNameMsg:'',
        //5.이메일
        이메일:'',
        isEmailError:false,
        isEmailMsg:'',

        //5-2 이메일 중복 확인
        isEmailOk:false,


        //6.휴대폰
        휴대폰:'',
        isHpError:false,
        isHpMsg:'',

        //6-2 휴대폰 발송인증번호 받기버튼 사용불가
        isHpDisabled:true, //사용불가 true
        발송인증번호:'',

        //6-3 휴대폰 입력인증번호 확인 입력상자
        isHpDisabled2:true,
        입력인증번호:'',

        //6-4 인증번호확인버튼 클릭 이벤트

        //6-5 다른 번호 인증
        isHp3:true,
        isHpOk:false,

        //주소
        isAdderss:false,
        isAddress1:true, //Boolean
        isAddress2:false,
        주소1:'',
        주소2:'',

        
        //성별
        성별:'선택안함',

        생년:"",
        생월:'',
        생일:'',
        isBirth:false,
        isBirthMsg:'',

        
        //추가입력사항
        추가입력사항:'',
        isChooga1:false,
        isChooga2:false,
        추천인아이디:'',
        참여이벤트명:'',
        isChoogaDisabled:false,

        //이용약관
        이용약관:[
            "이용약관 동의(필수)",
            "개인정보 수집∙이용 동의(필수)",
            "개인정보 수집∙이용 동의(선택)",
            "무료배송, 할인쿠폰 등 혜택/정보 수신 동의(선택)",
            "SMS",
            "이메일",
            "본인은 만 14세 이상입니다.(필수)"
        ],
        //이용약관동의 : 내용이 체크박스 value 값과 같다면 체크된다.
        이용약관동의:[],



        confirmMsg:'사용 가능한 아이디입니다. 아이디는 16자 이하로 사용 가능합니다.',
        isConfirmModal:false
        
        
    }
    
}