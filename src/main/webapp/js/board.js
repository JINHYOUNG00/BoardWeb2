/**
 * board.js
 */
// 수정버튼
document.querySelector('#modBtn').addEventListener('click', function() {
	document.forms.myFrm.action = "modBoardForm.do"; // 수정화면을 열어주기위한 컨트롤
	document.forms.myFrm.submit(); // submit 이벤트 호출
})
document.querySelector('.btn-danger').addEventListener('click', function() {
	document.forms.myFrm.action = "removeBoardForm.do"; // 삭제화면을 열어주기위한 컨트롤	
	document.forms.myFrm.submit(); // submit 이벤트 호출
})

// 댓글 목록 출력.
let page = 1;
showList();
function showList() {
	// 댓글목록을 초기화.
	document.querySelectorAll('div.content ul li').forEach((li, idx) => {
		if (idx >= 3) {
			li.remove();
		}
	})

	svc.replyList(
		{ bno: bno, page: page }, // replyList 첫번째 param 
		result => {
			result.forEach(reply => {
				const row = makeRow(reply);
				document.querySelector('div.reply ul').appendChild(row);
			})
			makePageInfo(); // createPageList();
		}, // replyList 두번째 param
		err => {
			console.log(err);
		} // replyList 세번째 param
	) // end of replyList;
} // end of showList()

// 댓글 삭제버튼 이벤트.
function deleteRow(e) {
	console.log(e.target.parentElement.parentElement.children[2].innerHTML);
	let id = e.target.parentElement.parentElement.children[2].innerHTML;
	const rno = e.target.parentElement.parentElement.dataset.rno;
	//console.log(rno);
	//fetch 삭제 기능 구현
	if (writer == id) {

		svc.removeReply(
			rno,
			result => {
				if (result.retCode == 'OK') {
					alert('삭제완료');
					//e.target.parentElement.parentElement.remove();
					//location.reload();
					showList();
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
}//end of deleteRow(e)

document.getElementById('addReply').addEventListener('click', function(e) {

	let reply = document.getElementById('reply').value;
	if (reply == "") {
		alert("댓글을 입력해주세요");
	} else if (writer == "") {
		alert("로그인후 이용해주세요.")
	} else {

		svc.addReply(
			{ bno: bno, replier: writer, reply: reply },
			result => {
				if (result.retCode == 'OK') {
					//location.reload();
					const row = makeRow(result.retVal);
					document.querySelector('div.reply ul').appendChild(row);
					alert('등록완료');
				} else if (result.retCode == 'NG') {
					alert('등록실패');
				} else {
					alert('알수없는 반환값');
				}
				document.getElementById('reply').value = "";
			},
			err => console.log(err)
		) // end of addReply
	}
})

// row 생성.
function makeRow(reply = {}) {
	let tmpl = document.querySelector('div.reply li:nth-of-type(3)').cloneNode(true);
	tmpl.style.display = 'block';
	tmpl.setAttribute('data-rno', reply.replyNo);
	tmpl.querySelector('span:nth-of-type(1)').innerText = reply.replyNo;
	tmpl.querySelector('span:nth-of-type(2)').innerText = reply.reply;
	tmpl.querySelector('span:nth-of-type(3)').innerText = reply.replier;

	return tmpl;
}

// 댓글 페이징 생성.
let pagination = document.querySelector('div.pagination');


function makePageInfo() {
	svc.getTotalCount(bno, // 첫번째 param
					createPageList, // 두번째 param
					err => console.log(err)	 // 세번째 param
	)
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

	console.log(startPage, endPage, realEnd, prev, next);

	// a 태그 생성.
	pagination.innerHTML = "";
	// 이전페이지 여부
	if (prev) {
		let aTag = document.createElement('a');
		aTag.setAttribute('data-page', startPage - 1);
		aTag.setAttribute('href', '#');
		aTag.innerHTML = "&laquo;";
		aTag.addEventListener('click', function(e) {
			e.preventDefault(); // a 태그는 페이지 이동하는걸 막는다
			page = e.target.dataset.page; // a 태그안에 있는 숫자의 값
			showList();
		})
		pagination.appendChild(aTag);
	}
	for (let pg = startPage; pg <= endPage; pg++) {
		let aTag = document.createElement('a');
		aTag.setAttribute('data-page', pg);
		aTag.setAttribute('href', pg);
		if (pg == page) {
			aTag.className = 'active';
		}
		aTag.innerHTML = pg;
		aTag.addEventListener('click', function(e) {
			e.preventDefault(); // a 태그는 페이지 이동하는걸 막는다
			page = e.target.dataset.page; // a 태그안에 있는 숫자의 값
			showList();
		})
		pagination.appendChild(aTag);
	}
	// 이후페이지 여부
	if (next) {
		let aTag = document.createElement('a');
		aTag.setAttribute('data-page', endPage + 1);
		aTag.setAttribute('href', '#');
		aTag.innerHTML = "&raquo;";
		pagination.appendChild(aTag);
		aTag.addEventListener('click', function(e) {
			e.preventDefault(); // a 태그는 페이지 이동하는걸 막는다
			page = e.target.dataset.page; // a 태그안에 있는 숫자의 값
			showList();
		})
		pagination.appendChild(aTag);
	}
}


