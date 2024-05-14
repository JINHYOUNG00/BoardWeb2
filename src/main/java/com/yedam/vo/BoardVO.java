package com.yedam.vo;

import java.util.Date;

import lombok.Data;
@Data
public class BoardVO {
	private int boardNo;
	private String title;
	private String content;
	private String writer;
	private Date createDate;
	private int viewCnt;
	private String img;
}
