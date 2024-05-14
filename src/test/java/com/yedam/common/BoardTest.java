package com.yedam.common;

import org.apache.ibatis.session.SqlSession;

import com.yedam.mapper.ReplyMapper;
import com.yedam.vo.ReplyVO;

public class BoardTest {
	public static void main(String[] args) {

		SqlSession session = DataSource.getInstance().openSession(true);
		ReplyMapper mapper = session.getMapper(ReplyMapper.class);

		SearchVO svo = new SearchVO();
		svo.setBoardNo(393);
		svo.setRpage(1);
		
		mapper.replyListPaging(svo).forEach(reply->System.out.println(reply));
		
		ReplyVO rvo = new ReplyVO();
		
	}
}
