<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<form action="login.do" method="post">
	<table class="table">
		<tr>
			<th>아이디</th>
			<td><input type="text" name="id"></td>
		</tr>
		<tr>
			<th>비밀번호</th>
			<td><input type="password" name="pw"></td>
		</tr>
		<tr>
			<td align="center" colspan="2"><input type="submit" value="로그인" class="btn btn-primary">
							<input type="reset" value="취소" class="btn btn-secondary"></td>
		</tr>
	</table>
</form>

