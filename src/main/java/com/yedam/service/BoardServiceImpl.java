package com.yedam.service;

import java.util.List;

import org.apache.ibatis.session.SqlSession;

import com.yedam.common.DataSource;
import com.yedam.common.SearchVO;
import com.yedam.mapper.BoardMapper;
import com.yedam.vo.BoardVO;
import com.yedam.vo.MemberVO;

public class BoardServiceImpl implements BoardService {

	SqlSession session = DataSource.getInstance().openSession(true);
	BoardMapper mapper = session.getMapper(BoardMapper.class);

	@Override
	public List<BoardVO> boardList(SearchVO search) {
		return mapper.boardListPaging(search);

	}
	@Override
	public int getTotal(SearchVO search) {
		return mapper.getTotalCnt(search);
	}

	@Override
	public boolean addBoard(BoardVO board) {

		return mapper.insertBoard(board) == 1;
	}

	@Override
	public BoardVO getBoard(int boardNo) {
		return mapper.selectBoard(boardNo);
	}

	@Override
	public int addViewCtn(int boardNo) {
		return mapper.updateViewCnt(boardNo);
	}

	@Override
	public boolean modifyBoard(BoardVO board) {
		return mapper.updateBoard(board) == 1;
	}

	@Override
	public boolean removeBoard(int boardNo) {
		return mapper.deleteBoard(boardNo) == 1;
	}

	@Override
	public MemberVO login(String id, String pw) {
		return mapper.selectMember(id, pw);
	}

	@Override
	public MemberVO checkMember(String id) {
		return mapper.selectMember2(id);
	}
}
