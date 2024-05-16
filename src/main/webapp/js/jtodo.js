/**
 * jtodo.js
 * jquery버전의 todo리스트 기능 구현.
 */

// Create a "close" button and append it to each list item
$('li').each((idx, val)=> {
	val.append($('<span />').text("\u00D7").addClass('close'));
})

// Click on a close button to hide the current list item
$('.close').each((idx, val) => {
	val.on('click', function(){
		let div = $(this).parent();
		div.css('display', 'none');
	})
})

// Add a "checked" symbol when clicking on a list item
$('ul').on('click', function(ev){
	if (ev.target.tagName === 'LI') {
		ev.target.classList.toggle('checked');
	}
}, false);

// Create a new list item when clicking on the "Add" button
function newElement() {
	var inputValue = $('#myInput').val();
	var li = $('<li />').text($('#myInput').val());
	
	if(inputValue === '') {
		alert("You must write something!");
	} else {
		$('#myUL').append(li)
	}
	
	$('#myInput').val("");
	
	li.append($('<span />').text("\u00D7").addClass('close'));
	
	
	
	
	
	
	
}









