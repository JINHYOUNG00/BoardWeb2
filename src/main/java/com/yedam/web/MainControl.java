package com.yedam.web;

import java.io.IOException;
import java.util.List;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import com.yedam.common.Control;
import com.yedam.common.HttpUtils;
import com.yedam.common.PageDTO;
import com.yedam.common.SearchVO;
import com.yedam.service.BoardService;
import com.yedam.service.BoardServiceImpl;
import com.yedam.vo.BoardVO;

public class MainControl implements Control {

	@Override
	public void exec(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {
		// TODO Auto-generated method stub
		String path = "WEB-INF/board/boardList.jsp";
		path = "board/boardList.tiles";
		
		String page = req.getParameter("page");
		String sc = req.getParameter("searchCondition");
		String kw = req.getParameter("keyword");
		page = page == null ? "1" : page; // page 파라미터가 없으면 1 페이지로 하겠다.
		
		SearchVO search = new SearchVO();
		
		
		search.setPage(Integer.parseInt(page));
		search.setSearchCondition(sc);
		search.setKeyword(kw);
		BoardService svc = new BoardServiceImpl();
		
		List<BoardVO> list = svc.boardList(search); // 목록
		PageDTO pageDTO = new PageDTO(Integer.parseInt(page),svc.getTotal(search)); // 건수
		
		// jsp 페이지에 정보를 전달.(같은객체 참조)
		req.setAttribute("boardList", list);
		req.setAttribute("paging", pageDTO);
		req.setAttribute("searchCondition", sc);
		req.setAttribute("keyword", kw);

//		req.getRequestDispatcher(path).forward(req, resp);
		HttpUtils.forward(req, resp, path);

	}

}
