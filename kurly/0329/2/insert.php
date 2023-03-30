 <?
    // 1.데이터베이스 접근권한
    //qkrthdus98.dothome.co.kr/signup_db/insert.php
    //http://qkrthdus98.dothome.co.kr/signup_db/select.php
    
    $db_server      = 'localhost';
    $db_user_name      = 'qkrthdus98';
    $db_password  = 'qkrthdus212^!';
    $db_name        = 'qkrthdus98';

    $conn = mysqli_connect($db_server,$db_user_name,$db_password,$db_name);
    mysqli_set_charset($conn,'utf8');

    // if(!$conn){
    //     die('데이터베이스 접근 실패!!!');
    // }
    // else{
    //     echo('데이터접근 성공~~');
    // }


    //필드명(Field == item == attribute = column)
    // id,pw,name,email,ph,address,gender,birth,chooga,service,gaib_date

    //데이터베이스에 회원정보 저장하기
    // $변수 = "INSERT INTO 테이블이름(필드1,필드2,필드3...) VALUES('필드1값','필드2값','필드3값'...)"
    
    $sql = "INSERT INTO sign_up(id, pw, name, email, ph, address, gender, birth, chooga, service, gaib_date) 
            VALUES
            ('aaaaaa', 'aaaaaa', 'aaa', 'aaa@naver.com', '010-2701-8808', '파주', '여성', '989898', '마켓컬리 일일세일', '이용약관 동의필수', '2023-03-16'),
            ('bbbbbb', 'bbbbbb', 'bbb', 'bbb@naver.com', '010-2701-8808', '파주', '여성', '989898', '마켓컬리 일일세일', '이용약관 동의필수', '2023-03-16'),
            ('cccccc', 'cccccc', 'ccc', 'ccc@naver.com', '010-2701-8808', '파주', '여성', '989898', '마켓컬리 일일세일', '이용약관 동의필수', '2023-03-16'),
            ('dddddd', 'dddddd', 'ddd', 'ddd@naver.com', '010-2701-8808', '파주', '여성', '989898', '마켓컬리 일일세일', '이용약관 동의필수', '2023-03-16'),
            ('eeeeee', 'eeeeee', 'eee', 'eee@naver.com', '010-2701-8808', '파주', '여성', '989898', '마켓컬리 일일세일', '이용약관 동의필수', '2023-03-16')";

    $result = mysqli_query($conn,$sql);

    if(!$result){
        echo("데이터베이스테이블에 회원정보 저장 실패");
    }
    else{
        echo("데이터베이스테이블에 회원정보 저장 성공");
    }


 ?>

