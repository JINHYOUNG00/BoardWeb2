package com.yedam.service;

import java.util.List;

import com.yedam.common.SearchVO;
import com.yedam.vo.ReplyVO;

public interface ReplyService {
	List<ReplyVO> replyList(SearchVO search);
	
	int totalCount(int boardNo);
	
	boolean removeReply(int replyNo); // 댓글삭제
	boolean addReply(ReplyVO rvo);
	boolean modReply(ReplyVO rvo); //댓글 수정
	
	
}
