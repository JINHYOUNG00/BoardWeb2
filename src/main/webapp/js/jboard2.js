/**
 * jboard.js
 */

// 수정버튼.
$('#modBtn').on('click', function() {
	document.forms.myFrm.action = "modBoardForm.do"; //수정화면 호출.
	document.forms.myFrm.submit(); // submit이벤트 호출.
})

// 삭제버튼.
$('.btn-danger').on('click', function() {
	document.forms.myFrm.action = "removeBoardForm.do"; //삭제화면 호출.
	document.forms.myFrm.submit(); // submit이벤트 호출.
})

let page = 1;
showList();
function showList() {
	// 새로운 목록을 출력할 경우에 기존 목록 지우기.
	$('div.content ul li:gt(2)').remove();

	svc.replyList({ bno: bno, page: page }, //
		result => {
			result.forEach(reply => {
				const row = makeRow(reply);
				row.appendTo('div.reply ul');
			})
			makePageInfo();
		},
		err => { console.log(err) });

}

function makeRow(reply = {}) {
	let tmpl = $('div.reply li:nth-of-type(3)').clone();
	tmpl.css('display', 'block');
	tmpl.attr('data-rno', reply.replyNo);
	tmpl.find('span:eq(0)').text(reply.replyNo);
	tmpl.find('span:eq(1)').text(reply.reply);
	tmpl.find('span:eq(2)').text(reply.replyer);
	return tmpl;
}// end of makeRow()

function deleteRow(e) {
	const rno = e.target.parentElement.parentElement.dataset.rno;
	// fetch 삭제 기능 구현.
	svc.removeReply(rno // param1
		, result => {
			if (result.retCode == 'OK') {
				alert('삭제완료.');
				showList();

			} else if (result.retCode == 'NG') {
				alert('삭제를 완료할 수 없습니다.');
			} else {
				alert('알수없는 반환값.')
			}
		} // param2
		, err => console.log(err) // param3
	)
} // end of deleteRow

// 등록버튼.
$('#addReply').on('click', function() {
	let reply = $('#reply').val();
	if (!reply) {
		alert('댓글입력하세요.');
		return;
	}
	if (!writer) {
		alert('로그인하세요.');
		return;
	}
	svc.addReply({ bno, writer, reply }// param1
		, result => {
			if (result.retCode == 'OK') {
				page = 1; // 최신글 순 일 경우.
				showList();
				// 댓글초기화.
				$('#reply').val("");
			}
		}// param2
		, err => console.log(err)// param3
	);
})

// 페이징 생성.
let pagination = $('div.pagination');

function makePageInfo() {
	svc.getTotalCount(bno// param1
		, createPageList // param2
		, err => console.log(err))
}

function createPageList(result) {

	// 페이지 속성 지정.
	let totalCnt = result.totalCount;// 127;
	let startPage, endPage, realEnd;
	let prev, next;

	realEnd = Math.ceil(totalCnt / 5);
	endPage = Math.ceil(page / 5) * 5;
	startPage = endPage - 4;
	endPage = endPage > realEnd ? realEnd : endPage;
	prev = startPage > 1;
	next = endPage < realEnd;

	// a 태그 생성.
	pagination.html('');
	// 이전페이지 여부.
	if (prev) {
		let aTag = $('<a>&laquo;</a>')//
			.attr('href', '#')//
			.attr('data-page', startPage - 1);
		aTag.on('click', function(e) {
			e.preventDefault(); // a 태그는 페이지이동.
			page = e.target.dataset.page; // 
			showList();
		})
		pagination.append(aTag);
	}
	for (let pg = startPage; pg <= endPage; pg++) {
		let aTag = $('<a />').html(pg) //
			.attr('data-page', pg)//
			.attr('href', pg);
		if (pg == page) {
			aTag.attr('class', 'active');
		}
		aTag.on('click', function(e) {
			e.preventDefault(); // a 태그는 페이지이동.
			page = e.target.dataset.page; // 
			showList();
		})
		pagination.append(aTag);
	}
	// 이후페이지 여부.
	if (next) {
		let aTag = $('<a>&raquo;</a>')//
			.attr('href', '#')//
			.attr('data-page', endPage + 1);
		aTag.on('click', function(e) {
			e.preventDefault(); // a 태그는 페이지이동.
			page = e.target.dataset.page; // 
			showList();
		})
		pagination.append(aTag);
	}

} // end of createPageList
