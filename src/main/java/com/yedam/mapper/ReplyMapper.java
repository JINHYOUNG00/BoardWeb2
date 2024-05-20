package com.yedam.mapper;

import java.util.List;

import com.yedam.common.SearchVO;
import com.yedam.vo.CartVO;
import com.yedam.vo.CenterVO;
import com.yedam.vo.ReplyVO;

public interface ReplyMapper {
	// 댓글목록.
	List<ReplyVO> replyList(int boardNo);
	List<ReplyVO> replyListPaging(SearchVO search);
	
	// 전체 댓글 수 가져오기
	int getTotalCnt(int boardNo);
	
	// 댓글삭제
	int deleteReply(int replyNo);
	// 댓글등록
	int insertReply(ReplyVO rvo);
	
	// 댓글 수정
	int updateReply(ReplyVO rvo);
	
	// cart... 목록, 수정, 삭제
	List<CartVO> selectList();
	int updateCart(CartVO cvo);
	int deleteCart(int no);
	
	int insertCenter(CenterVO[] array);
	
}
