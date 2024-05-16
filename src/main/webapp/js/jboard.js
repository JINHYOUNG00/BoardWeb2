/**
 * jboard.js 
 */

$('#modBtn').on('click', function() {
	document.forms.myFrm.action = "modBoardForm.do"; // 수정화면을 열어주기위한 컨트롤
	document.forms.myFrm.submit(); // submit 이벤트 호출
})
$('#btn-danger').on('click', function() {
	document.forms.myFrm.action = "removeBoardForm.do"; // 삭제화면을 열어주기위한 컨트롤	
	document.forms.myFrm.submit(); // submit 이벤트 호출
})

let page = 1;
showList();

function showList() {
	$('div.content ul li:gt(2)').remove();

	svc.replyList(
		{ bno: bno, page: page },
		result => {
			result.forEach(reply => {
				const row = makeRow(reply);
				$('div.reply ul').append(row);
			})
			makePageInfo(); // createPageList();
			moveEndPage();
		},
		err => console.log(err)
	);
};
function showList2() {
	$('div.content ul li:gt(2)').remove();

	svc.replyList(
		{ bno: bno, page: page },
		result => {
			result.forEach(reply => {
				const row = makeRow(reply);
				$('div.reply ul').append(row);
			})
			makePageInfo(); // createPageList();
			
		},
		err => console.log(err)
	);
};

function deleteRow(e) {
	console.log(e.target.parentElement.parentElement.children[2].innerHTML);
	console.log(e.target.parentElement.parentElement);
	let id = e.target.parentElement.parentElement.children[2].innerHTML;
	console.log($(e.target).parent().parent());
	console.log(id);
	const rno = $(e.target).parent().parent().data('rno');

	if (writer == id) {
		svc.removeReply(
			rno,
			result => {
				if (result.retCode == 'OK') {
					alert('삭제완료');
					//e.target.parentElement.parentElement.remove();
					//location.reload();
					showList();
					emoveEndPage();
				} else if (result.retCode == 'NG') {
					alert('삭제를 완료할 수 없습니다');

				} else {
					alert('알 수 없는 반환값');
				}
			},
			err => console.log(err)
		)// end of removeReply
	} else {
		alert("댓글을 삭제할 권한이 없습니다.")
	}
}

$('#addReply').on('click', function(e) {
	let reply = $('#reply').val();
	if (reply == "") {
		alert("댓글을 입력해주세요");
	} else if (writer == "") {
		alert("로그인후 이용해주세요.")
	} else {

		svc.addReply(
			{ bno: bno, writer: writer, reply: reply },
			result => {
				if (result.retCode == 'OK') {
					const row = makeRow(result.retVal);
					let max = 0;
					$('div.content ul li').each((idx) => {
						if (idx > max) {
							max = idx;
						}
					});
					if (max <= 6) {
						$('div.reply ul').append(row);
					}
					showList();

					//					alert('등록완료');
				} else if (result.retCode == 'NG') {
					alert('등록실패');
				} else {
					alert('알수없는 반환값');
				}
				$('#reply').value = "";
			},
			err => console.log(err)
		) // end of addReply
	}
})



function makeRow(reply = {}) {
	let tmpl = $('div.reply li:nth-of-type(3)').clone(true);
	tmpl.css('display', 'block');
	tmpl.on('dblclick', function(e) {
		console.log(e.target);
		console.log($(e.target).parent().children().eq(0).text());

		console.log($('.modal-content').eq(1).text('ddd'));
		let replyNo = $(e.target).parent().children().eq(0).text();
		let reply = $(e.target).parent().children().eq(1).text();
		$('.modal-content p:eq(0)').text(replyNo).attr('data-rno', replyNo);
		$('.modal-content p input').val(reply);

		$('#myModal').css('display', 'block');

	})
	tmpl.attr('data-rno', reply.replyNo);
	tmpl.find('span:eq(0)').text(reply.replyNo);
	tmpl.find('span:eq(1)').text(reply.reply);
	tmpl.find('span:eq(2)').text(reply.replier);
	return tmpl;
};



let pagination = $('div.pagination');

function moveEndPage() {
	svc.getTotalCount(bno, //
		(result) => {
			let totalCnt = result.totalCount;
			let endPage, realEnd;

			realEnd = Math.ceil(totalCnt / 5);
			endPage = Math.ceil(page / 5) * 5;
			endPage = endPage > realEnd ? realEnd : endPage;

			if (totalCnt % 5 == 0) {
				console.log(totalCnt);
				page = realEnd + 1;
			} else {
				page = realEnd;
			}
		},
		err => console.log(err)
	)
}

function makePageInfo() {
	svc.getTotalCount(bno, createPageList, err => console.log(err));
}

function createPageList(result) {
	console.log(result);

	let totalCnt = result.totalCount;
	let startPage, endPage, realEnd;
	let prev, next;

	realEnd = Math.ceil(totalCnt / 5);
	endPage = Math.ceil(page / 5) * 5;
	startPage = endPage - 4;
	endPage = endPage > realEnd ? realEnd : endPage;
	prev = startPage > 1;
	next = endPage < realEnd;

	pagination.html("");

	if (prev) {
		let aTag = $('<a />').attr('data-page', startPage - 1).attr('href', '#').html('&laquo;').on('click', function(e) {
			e.preventDefault();
			page = $(e.target).data('page');
			showList();
		});
		aTag.appendTo(pagination);
	}
	for (let pg = startPage; pg <= endPage; pg++) {
		let aTag = $('<a />').attr('data-page', pg).attr('href', pg);
		if (pg == page) {
			//			aTag.attr('class', 'active');
			aTag.addClass('active');
		}
		aTag.html(pg);
		aTag.on('click', function(e) {
			e.preventDefault();
			page = $(e.target).data('page');
			showList();
		})
		aTag.appendTo(pagination);
	}

	if (next) {
		let aTag = $('<a />').attr('data-page', endPage + 1).attr('href', '#').html('&raquo;').on('click', function(e) {
			e.preventDefault();
			page = $(e.target).data('page');
			showList();
		});
		aTag.appendTo(pagination);
	}
} // end of createPageList

// 수정기능 추가
$('.modBtn').on('click', function() {
	let rno = $('#myModal p:eq(0)').data('rno');
	let content = $('#myModal input').val();
	console.log(rno);
	svc.modifyReply({ rno: rno, content: content },
		result => {
			if (result.retCode == "OK") {
				alert('수정성공')
				$('#myModal').css('display', 'none');
				showList2()

			} else {
				alert('수정실패')
			}
		},
		err => console.log(err))
//	showList();
});



