package com.yedam.web;

import java.io.IOException;
import java.util.List;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import com.google.gson.Gson;
import com.google.gson.GsonBuilder;
import com.yedam.common.Control;
import com.yedam.service.ReplyService;
import com.yedam.service.ReplyServiceImpl;
import com.yedam.vo.CartVO;

public class CartListControl implements Control {

	@Override
	public void exec(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {
		resp.setContentType("text/json;charset=utf-8");
		
		ReplyService replyService = new ReplyServiceImpl();
		List<CartVO> list = replyService.cartList();
		
		Gson gson = new GsonBuilder().create();
		resp.getWriter().print(gson.toJson(list));
		
	}

	
	
	
	
	
	
	
	
	
}
