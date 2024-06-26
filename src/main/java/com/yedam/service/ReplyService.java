package com.yedam.service;

import java.util.List;

import com.yedam.common.SearchVO;
import com.yedam.vo.CartVO;
import com.yedam.vo.CenterVO;
import com.yedam.vo.ReplyVO;

public interface ReplyService {
	List<ReplyVO> replyList(SearchVO search);
	
	int totalCount(int boardNo);
	
	boolean removeReply(int replyNo); // 댓글삭제
	boolean addReply(ReplyVO rvo);
	boolean modReply(ReplyVO rvo); //댓글 수정
	
	// cart... 목록, 수정, 삭제
	List<CartVO> cartList();
	boolean modifyCart(CartVO cvo);
	boolean removeCart(int no);
	
	int addCenter(CenterVO[] array);
	
	
}
