/**
 * select.js
 */

$(document).ready(function() {
//	let option;
//	$('option').on('click', function(e) {
//		option = e.target;
//		console.log(e.target);
//	})
//	$('button:contains("+")').on('click', function() {
//		$(`select:eq(0) option:contains("${option.innerText}")`).remove();
//		$('select:eq(1)').append(option)
//	})
//	$('button:contains("-")').on('click', function() {
//		$(`select:eq(1) option:contains("${option.innerText}")`).remove();
//		$('select:eq(0)').append(option)
//	})

	$('button:eq(0)').on('click', function(){
		$('select:eq(0) option:selected').appendTo('select:eq(1)');
	});
	$('button:eq(1)').on('click', function(){
		$('select:eq(1) option:selected').appendTo('select:eq(0)');
	});
})