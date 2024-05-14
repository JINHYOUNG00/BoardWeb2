package com.yedam.web;

import java.io.IOException;
import java.util.List;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import com.google.gson.Gson;
import com.google.gson.GsonBuilder;
import com.yedam.common.Control;
import com.yedam.common.SearchVO;
import com.yedam.service.ReplyService;
import com.yedam.service.ReplyServiceImpl;
import com.yedam.vo.ReplyVO;

public class ReplyListControl implements Control {

	@Override
	public void exec(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {
		// TODO Auto-generated method stub
		resp.setContentType("text/json;charset=UTF-8");
		String bno = req.getParameter("bno");
		String page = req.getParameter("page");
		page = page == null ? "1":page;
		
		SearchVO svo = new SearchVO();
		svo.setBoardNo(Integer.parseInt(bno));
		svo.setRpage(Integer.parseInt(page));
		// json 포맷의 데이터 변환
		ReplyService svc = new ReplyServiceImpl();
		List<ReplyVO> list = svc.replyList(svo);

		Gson gson = new GsonBuilder().create();
		String json = gson.toJson(list);
		resp.getWriter().print(json);

	}

}
