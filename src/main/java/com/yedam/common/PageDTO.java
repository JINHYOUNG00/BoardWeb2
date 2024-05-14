package com.yedam.common;

import lombok.*;

@Getter
@ToString
public class PageDTO {
	
	// 페이징 해주기.
	private int page; // 현재 페이지
	private int startPage, endPage; // 시작페이지,마지막페이지.
	private boolean prev, next; // 이전, 이후 페이지 유무체크.

	public PageDTO(int page, int totalCnt) {
		this.page = page;
		int realEnd = (int) Math.ceil(totalCnt / 5.0);

		this.endPage = (int) Math.ceil(page / 5.0) * 5;
		this.startPage = this.endPage - 4;
		this.endPage = this.endPage > realEnd ? realEnd : this.endPage;

		this.prev = this.startPage > 1;
		this.next = this.endPage < realEnd ? true : false;
	}
}
