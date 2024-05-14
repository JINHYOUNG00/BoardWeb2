<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c"%>

<form name="myFrm" action="deleteBoard.do">
	<h3>삭제화면</h3>
	<table class="table">
		<tr>
			<th>글번호</th>
			<td>${bno.boardNo}</td>
		</tr>
		<tr>
			<th>제목</th>
			<td>${bno.title}</td>
		</tr>
		<tr>
			<th>내용</th>
			<td>${bno.content}</td>
		</tr>
		<tr>
			<th>작성자</th>
			<td>${bno.writer}</td>
		</tr>
		<tr align="center">
			<td colspan="2"><input type="submit" value="삭제"></td>
		</tr>
	</table>
	<input type="hidden" name="bno" value="${bno.boardNo}">
	<input type="hidden" name="page" value="${page}">
</form>
<script>
	const logid = "${logId}";
	const writer = "${bno.writer}";

	document.forms.myFrm.addEventListener('submit', function(e) {
		e.preventDefault();
		if (logid != writer) {
			alert("권한이 없습니다.")
			return;
		}
		this.submit();
	});
</script>


