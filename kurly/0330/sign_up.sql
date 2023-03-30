-- phpMyAdmin SQL Dump
-- version 5.1.1
-- https://www.phpmyadmin.net/
--
-- Host: localhost
-- 생성 시간: 23-03-27 16:03
-- 서버 버전: 8.0.32
-- PHP 버전: 7.4.33

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- 데이터베이스: `qkrthdus98`
--

-- --------------------------------------------------------

--
-- 테이블 구조 `sign_up`
--

CREATE TABLE `sign_up` (
  `idx` int NOT NULL COMMENT '자동증가번호',
  `id` varchar(16) COLLATE utf8mb4_general_ci NOT NULL COMMENT '아이디',
  `pw` varchar(16) COLLATE utf8mb4_general_ci NOT NULL COMMENT '비밀번호',
  `name` varchar(100) COLLATE utf8mb4_general_ci NOT NULL COMMENT '이름',
  `email` varchar(250) COLLATE utf8mb4_general_ci NOT NULL COMMENT '이메일',
  `ph` varchar(13) COLLATE utf8mb4_general_ci NOT NULL COMMENT '휴대폰',
  `address` varchar(500) COLLATE utf8mb4_general_ci NOT NULL COMMENT '주소',
  `gender` varchar(4) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci DEFAULT NULL COMMENT '성별',
  `birth` varchar(10) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci DEFAULT NULL COMMENT '생년월일',
  `chooga` varchar(250) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci DEFAULT NULL COMMENT '추가입력사항',
  `service` varchar(1000) COLLATE utf8mb4_general_ci NOT NULL COMMENT '이용약관동의',
  `gaib_date` varchar(10) COLLATE utf8mb4_general_ci NOT NULL COMMENT '가입일자'
) ENGINE=MyISAM DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci COMMENT='마켓컬리_회원가입폼';

--
-- 테이블의 덤프 데이터 `sign_up`
--

INSERT INTO `sign_up` (`idx`, `id`, `pw`, `name`, `email`, `ph`, `address`, `gender`, `birth`, `chooga`, `service`, `gaib_date`) VALUES
(1, 'aaaaaa', 'aaaaaa', 'aaa', 'aaa@naver.com', '010-2701-8808', '파주', '여성', '989898', '마켓컬리 일일세일', '이용약관 동의필수', '2023-03-16'),
(2, 'bbbbbb', 'aaaaaa', 'bbb', 'bbb@naver.com', '010-2701-8808', '파주', '여성', '989898', '마켓컬리 일일세일', '이용약관 동의필수', '2023-03-16'),
(3, 'cccccc', 'aaaaaa', 'ccc', 'ccc@naver.com', '010-2701-8808', '파주', '여성', '989898', '마켓컬리 일일세일', '이용약관 동의필수', '2023-03-16'),
(4, 'dddddd', 'aaaaaa', 'ddd', 'ddd@naver.com', '010-2701-8808', '파주', '여성', '989898', '마켓컬리 일일세일', '이용약관 동의필수', '2023-03-16'),
(5, 'eeeeee', 'aaaaaa', 'eee', 'eee@naver.com', '010-2701-8808', '파주', '여성', '989898', '마켓컬리 일일세일', '이용약관 동의필수', '2023-03-16');

--
-- 덤프된 테이블의 인덱스
--

--
-- 테이블의 인덱스 `sign_up`
--
ALTER TABLE `sign_up`
  ADD PRIMARY KEY (`idx`);

--
-- 덤프된 테이블의 AUTO_INCREMENT
--

--
-- 테이블의 AUTO_INCREMENT `sign_up`
--
ALTER TABLE `sign_up`
  MODIFY `idx` int NOT NULL AUTO_INCREMENT COMMENT '자동증가번호', AUTO_INCREMENT=26;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
