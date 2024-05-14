package com.yedam.mapper;

import java.util.List;

import org.apache.ibatis.annotations.Param;

import com.yedam.common.SearchVO;
import com.yedam.vo.BoardVO;
import com.yedam.vo.MemberVO;

public interface BoardMapper {
	List<BoardVO> boardList();// 목록
	List<BoardVO> boardListPaging(SearchVO search); // 페이징 목록.
	int getTotalCnt(SearchVO search); // 전체 건수계산.
	int insertBoard(BoardVO board);
	BoardVO selectBoard(int boardNo);
	int updateViewCnt(int boardNo);
	int updateBoard(BoardVO board);
	int deleteBoard(int boardNo);
	
	// 사용자id, pw 확인.
	MemberVO selectMember(@Param("id") String id, @Param("pw") String pw);
	MemberVO selectMember2(String id);
}
