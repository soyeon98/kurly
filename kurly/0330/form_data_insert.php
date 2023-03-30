<? 

    //관리자서버
    //http://qkrthdus98.dothome.co.kr/myadmin/
    //CORS
    header('Access-Control-Allow-Origin: *');
    header('Access-Control-Allow-Headers: *');

    //DB인증
    $db_server      = 'localhost';
    $db_user_name      = 'qkrthdus98';
    $db_password  = 'qkrthdus212^!';
    $db_name        = 'qkrthdus98';

    $conn = mysqli_connect($db_server,$db_user_name,$db_password,$db_name);
    mysqli_set_charset($conn,'utf8');

    // 리액트 폼데이커 받는다.
    // 변수에 저장한다.
    $user_id        = $_POST['user_id'];
    $user_pw        = $_POST['user_pw'];
    $user_name      = $_POST['user_name'];
    $user_email     = $_POST['user_email'];
    $user_hp        = $_POST['user_hp'];
    $user_addr      = $_POST['user_addr'];
    $user_gender    = $_POST['user_gender'];
    $user_birth     = $_POST['user_birth'];
    $user_add_input = $_POST['user_add_input'];
    $user_service   = $_POST['user_service'];
    $user_gaib_date = $_POST['user_gaib_date'];

    //DB 저장
    $sql = "INSERT INTO sign_up(id, pw, name, email, ph, address, gender, birth, chooga, service, gaib_date)
            VALUES('$user_id','$user_pw','$user_name','$user_email','$user_hp','$user_addr','$user_gender','$user_birth','$user_add_input','$user_service','$user_gaib_date')";
    $result = mysqli_query($conn,$sql); //쿼리 실행

    if(!$result){
        echo("데이터베이스테이블에 회원정보 저장 실패");
    }
    else{
        echo("데이터베이스테이블에 회원정보 저장 성공");
    }
    

?>