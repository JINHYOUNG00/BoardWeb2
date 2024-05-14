<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<%@ taglib tagdir="/WEB-INF/tags" prefix="my" %>

<!DOCTYPE html>
<html>
<head>
<meta charset="UTF-8">
<title>첫 시작화면</title>
</head>
<body>
<!-- Expression Language -->
	<p>${3<5}</p>
	<a href="main.do">메인컨트롤 이동</a>
	
	<my:lines/>
</body>
</html>