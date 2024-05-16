/**
 * jquary1.js
 */
// $(document).ready(function() {} == $(function() {})
$(document).ready(function() {
	
	// 기존의 삭제버튼 기능추가
	$('#list tbody button').on('click', delRow);
	
	$('#addBtn').on('click', function(){
		//2개 값을 td 생성. tr 생성. tbody 하위요소 추가
		let inputName = $('input[name="name"]');
		let inputScore = $('input[name="score"]');
		
		if(!inputName.val() || !inputScore.val()) {
			alert('값을 입력하세요');
			inputName.val('');
			inputScore.val('');
			return;
		}
		
		let tr = $('<tr />').append(
							$('<td />').append($('<input />').attr('type', 'checkbox')),
							$('<td />').text($(inputName).val()),
							$('<td />').text($(inputScore).val()),
							$('<td />').append(
											($('<button />').text('삭제')).on('click', delRow) // $('<button>삭제</button>').on('click', delRow)
											)
							);
							
		$('#list tbody').append(tr);
		inputName.val('');
		inputScore.val('');
	})
});

function delRow(e){
	// e.target == 이벤트를 받는 대상 <- button 태그
	// e.target.parentElement.parentElement.remove();
	$(e.target).parent().parent().remove();
}

// dom요소가 다 로딩된 다음에 initForm함수 실행
// vanilla javascript
//document.addEventListener("DOMContentLoaded", initForm);
//function initForm(){
//	
//	document.querySelector('#list tbody button').addEventListener('click', delRow1);
//	
//	document.querySelector('#addBtn').addEventListener('click', function(){
//		let inputName1 = document.querySelector('input[name="name"]');
//		let inputScore1 = document.querySelector('input[name="score"]');
//		
//		if(document.querySelector('input[name="name"]').value == '' || document.querySelector('input[name="score"]').value == '') {
//			alert('값을 입력하세요');
//			document.querySelector('input[name="name"]').value = '';
//			document.querySelector('input[name="score"]').value = '';
//			return;
//		}
//		let tbody = document.querySelector('tbody');
//		let tr = document.createElement('tr');
//		let td = document.createElement('td');
//		let button = document.createElement('button');
//		
//		td = document.createElement('td');
//		let ckb = document.createElement('input');
//		ckb.type = 'checkbox';
//		td.appendChild(ckb);
//		tr.appendChild(td);
//		
//		td = document.createElement('td');
//		td.innerText = document.querySelector('input[name="name"]').value;
//		tr.appendChild(td);
//		
//		td = document.createElement('td');
//		td.innerText = document.querySelector('input[name="score"]').value;
//		tr.appendChild(td);
//		
//		td = document.createElement('td');
//		button.innerText = '삭제';
//		td.appendChild(button);
//		tr.appendChild(td);
//		
//		tbody.appendChild(tr);
//		document.querySelector('input[name="name"]').value = '';
//		document.querySelector('input[name="score"]').value = '';
//		button.addEventListener('click', delRow1);
//	})
//}
//
//function delRow1(e){
//	e.target.parentElement.parentElement.remove();
//}