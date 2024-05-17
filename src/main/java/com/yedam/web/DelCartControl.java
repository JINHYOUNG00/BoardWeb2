package com.yedam.web;

import java.io.IOException;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import com.yedam.common.Control;
import com.yedam.service.ReplyService;
import com.yedam.service.ReplyServiceImpl;

public class DelCartControl implements Control {

	@Override
	public void exec(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {
		String no = req.getParameter("no");
		
		
		ReplyService replyService = new ReplyServiceImpl();
		
		if(replyService.removeCart(Integer.parseInt(no))) {
			// {"retCode": "OK"}
			resp.getWriter().print("{\"retCode\": \"OK\"}");
		} else {
			// {"retCode": "NG"}
			resp.getWriter().print("{\"retCode\": \"NG\"}");
		}
	}

}
