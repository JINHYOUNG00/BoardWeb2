package com.yedam.web;

import java.io.IOException;
import java.util.HashMap;
import java.util.Map;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import com.google.gson.Gson;
import com.google.gson.GsonBuilder;
import com.yedam.common.Control;
import com.yedam.service.ReplyService;
import com.yedam.service.ReplyServiceImpl;
import com.yedam.vo.ReplyVO;

public class AddReplyControl implements Control {

	@Override
	public void exec(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {
		resp.setContentType("text/json; charset=UTF-8");
		// 원본글, 댓글작성자, 댓글내용
		String bno = req.getParameter("bno");
		String replier = req.getParameter("replier");
		String reply =req.getParameter("reply");
		
		req.setAttribute("replier", replier);
		
		ReplyVO rvo = new ReplyVO();
		rvo.setBoardNo(Integer.parseInt(bno));
		rvo.setReplier(replier);
		rvo.setReply(reply);
		
		Map<String,Object> result = new HashMap<>();
		
		ReplyService svc = new ReplyServiceImpl();
		if(svc.addReply(rvo)) {
			result.put("retCode", "OK");
			result.put("retVal",rvo);
			// resp.getWriter().print("{\"retCode\": \"OK\"}");
		}else {
			result.put("retCode", "NG");
			result.put("retVal",null);
			//resp.getWriter().print("{\"retCode\": \"NG\"}");
		}
		Gson gson = new GsonBuilder().create();
		String json = gson.toJson(result);
		
		resp.getWriter().print(json);

	}

}
