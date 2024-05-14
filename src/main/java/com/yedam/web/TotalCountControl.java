package com.yedam.web;

import java.io.IOException;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import com.yedam.common.Control;

public class TotalCountControl implements Control {

	@Override
	public void exec(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {
		String bno = req.getParameter("bno");
		
		// Service Mapper 만들어와야함
		
		// JSON 타입으로 반환되게할 예정
		// {"totalCount": 10}
		int cnt = 2;
		resp.getWriter().print("{\"totalCount\":" + cnt + "}");
	}

}
