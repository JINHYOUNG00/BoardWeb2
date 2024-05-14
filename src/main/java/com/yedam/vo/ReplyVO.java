package com.yedam.vo;

import java.util.Date;

import lombok.Data;

@Data
public class ReplyVO {
	private int replyNo;
	private String reply; // 댓글내용
	private String replier; // 댓글작성자
	private Date repltDate; // 작성일시	
	private int boardNo; // 원본 글번호
}
