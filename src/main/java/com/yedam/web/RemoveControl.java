package com.yedam.web;

import java.io.IOException;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import com.yedam.common.Control;
import com.yedam.service.BoardService;
import com.yedam.service.BoardServiceImpl;
import com.yedam.vo.BoardVO;

public class RemoveControl implements Control {

	@Override
	public void exec(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {
		// 게시글 번호를 파라미터로 받는다
		String bno = req.getParameter("bno");
		String page = req.getParameter("page");
		
		BoardService svc = new BoardServiceImpl();
		
		int vo = Integer.parseInt(bno);
		if(svc.removeBoard(vo)) {
			resp.sendRedirect("main.do?page="+page);
		}else {
			resp.sendRedirect("removeBoardForm.do");
		}
	}

}
