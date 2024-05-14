package com.yedam.common;

import java.io.IOException;

import javax.servlet.Filter;
import javax.servlet.FilterChain;
import javax.servlet.FilterConfig;
import javax.servlet.ServletException;
import javax.servlet.ServletRequest;
import javax.servlet.ServletResponse;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.apache.velocity.tools.view.WebappUberspector.SetAttributeExecutor;

public class ResponseFilter implements Filter {

	String resp;

	@Override
	public void init(FilterConfig filterConfig) throws ServletException {
		resp = filterConfig.getInitParameter("response"); // /main.do /addForm.do
	}

	@Override
	public void doFilter(ServletRequest request, ServletResponse response, FilterChain chain)
			throws IOException, ServletException {

		System.out.println(resp);
		
		HttpServletRequest hrequest = (HttpServletRequest)request;
		String uri = hrequest.getRequestURI();
		String context = hrequest.getContextPath();
		String path = uri.substring(context.length());
		
		int a = resp.indexOf(path);
		System.out.println(a);
		
		if(a != -1) {
			// 권한체크를 해야하는 대상입니다.
			request.setAttribute("logPath", "/logForm.do");
//			((HttpServletResponse)response).sendRedirect("logForm.do");
		}
		
		chain.doFilter(request, response);
		

	}

}





