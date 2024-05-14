package com.yedam.web;

import java.io.IOException;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;

import com.yedam.common.Control;
import com.yedam.service.BoardService;
import com.yedam.service.BoardServiceImpl;
import com.yedam.vo.MemberVO;

public class LoginControl implements Control{
@Override
public void exec(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {
		// id,pw 파라미터로 받아온다.
		String id = req.getParameter("id");
		String pw = req.getParameter("pw");
		BoardService svc = new BoardServiceImpl();
		MemberVO mvo = svc.login(id, pw);
		
		if(mvo!=null) {
			HttpSession session = req.getSession();
			session.setAttribute("logId", mvo.getUserId());
			
			if(mvo.getUserResp().equals("Admin")) {
				resp.sendRedirect("memberList.do");
			} else {
				resp.sendRedirect("main.do");
			}
		}else {
			resp.sendRedirect("logForm.do");
		}
}
}
