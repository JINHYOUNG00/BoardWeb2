package com.yedam.service;

import java.util.List;

import org.apache.ibatis.session.SqlSession;

import com.yedam.common.DataSource;
import com.yedam.common.SearchVO;
import com.yedam.mapper.ReplyMapper;
import com.yedam.vo.CartVO;
import com.yedam.vo.CenterVO;
import com.yedam.vo.ReplyVO;

public class ReplyServiceImpl implements ReplyService {
	SqlSession session = DataSource.getInstance().openSession(true);
	ReplyMapper mapper = session.getMapper(ReplyMapper.class);

	@Override
	public List<ReplyVO> replyList(SearchVO search) {
		return mapper.replyListPaging(search);
	}

	@Override
	public boolean removeReply(int replyNo) {
		return mapper.deleteReply(replyNo) == 1;
	}

	@Override
	public boolean addReply(ReplyVO rvo) {
		return mapper.insertReply(rvo) == 1;
	}

	@Override
	public int totalCount(int boardNo) {
		return mapper.getTotalCnt(boardNo);
	}

	@Override
	public boolean modReply(ReplyVO rvo) {
		return mapper.updateReply(rvo) == 1;
	}

	@Override
	public List<CartVO> cartList() {
		return mapper.selectList();
	}

	@Override
	public boolean modifyCart(CartVO cvo) {
		return mapper.updateCart(cvo) == 1;
	}

	@Override
	public boolean removeCart(int no) {
		return mapper.deleteCart(no) == 1;
	}

	@Override
	public int addCenter(CenterVO[] array) {
		return mapper.insertCenter(array);
	}
	
	
}
