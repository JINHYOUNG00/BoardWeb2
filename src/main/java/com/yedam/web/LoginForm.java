package com.yedam.web;

import java.io.IOException;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import com.yedam.common.Control;

public class LoginForm implements Control {

	@Override
	public void exec(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {
		String path = "WEB-INF/view/member/loginForm.jsp";
		path = "member/loginForm.tiles";
		req.getRequestDispatcher(path).forward(req, resp);
	}

}
