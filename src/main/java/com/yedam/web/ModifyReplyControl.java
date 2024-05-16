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

public class ModifyReplyControl implements Control {

	@Override
	public void exec(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {
		String rno = req.getParameter("rno");
		String content = req.getParameter("content");
		
		ReplyVO reply = new ReplyVO();
		
		reply.setReplyNo(Integer.parseInt(rno));
		reply.setReply(content);
		
		Map<String,Object> result = new HashMap<>();
		
		ReplyService replyService = new ReplyServiceImpl();
		if(replyService.modReply(reply)) {
			System.out.println("수정성공");
			result.put("retCode", "OK");
			result.put("retVal", reply);
		} else {
			System.out.println("수정실패");
			result.put("retCode", null);
		}
		
		Gson gson = new GsonBuilder().create();
		String json = gson.toJson(result);
		
		resp.getWriter().print(json);

	}

}
