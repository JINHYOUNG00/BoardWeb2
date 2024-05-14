package com.yedam.web;

import java.io.IOException;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import com.yedam.common.Control;
import com.yedam.common.HttpUtils;
import com.yedam.service.BoardService;
import com.yedam.service.BoardServiceImpl;
import com.yedam.vo.BoardVO;

public class BoardInfoControl implements Control {

	@Override
	public void exec(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {
		// TODO Auto-generated method stub
		String bno = req.getParameter("bno");
		String page = req.getParameter("page");
		String sc = req.getParameter("searchCondition");
		String kw = req.getParameter("keyword");
		
		req.setAttribute("searchCondition", sc);
		req.setAttribute("keyword", kw);
		
		BoardService svc = new BoardServiceImpl();
		svc.addViewCtn(Integer.parseInt(bno)); // 조회카운트 증가.
		BoardVO vo = svc.getBoard(Integer.parseInt(bno)); // 조회기능

		req.setAttribute("result", vo);
		req.setAttribute("page", page);
		req.setAttribute("searchCondition", sc);
		req.setAttribute("keyword", kw);

		String path = "WEB-INF/view/board/board.jsp";
		path = "board/board.tiles";
//		req.getRequestDispatcher(path).forward(req, resp);
		HttpUtils.forward(req, resp, path);
		
	}

}
