package com.yedam.service;

import java.util.List;

import com.yedam.common.SearchVO;
import com.yedam.vo.BoardVO;
import com.yedam.vo.MemberVO;

public interface BoardService {
	List<BoardVO> boardList(SearchVO search);
	int getTotal(SearchVO search); // 전체건수.
	boolean addBoard(BoardVO board);
	BoardVO getBoard(int boardNo);
	int addViewCtn(int boardNo);
	// 수정.
	boolean modifyBoard(BoardVO board);
	// 삭제
	boolean removeBoard(int boardNo);
	
	// 로그인
	MemberVO login(String id, String pw);
	MemberVO checkMember(String id);
}
