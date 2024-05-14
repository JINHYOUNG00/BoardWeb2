package com.yedam.web;

import java.io.IOException;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import com.yedam.common.Control;
import com.yedam.common.HttpUtils;

public class AddFormControl implements Control {

	@Override
	public void exec(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {
		// TODO Auto-generated method stub
		String path = "WEB-INF/view/board/addBoard.jsp";
		path = "board/addBoard.tiles";
//		req.getRequestDispatcher(path).forward(req, resp);
		
		HttpUtils.forward(req, resp, path);
		
	}

}
