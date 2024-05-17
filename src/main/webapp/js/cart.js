// 숫자 3자리 콤마찍기
Number.prototype.numberFormat = function () {
	if (this == 0)
		return 0;
	let regex = /(^[+-]?\d+)(\d{3})/;
	let nstr = (this + '');
	while (regex.test(nstr)) {
		nstr = nstr.replace(regex, '$1' + ',' + '$2');
	}
	return nstr;
};

let basket = {
	cartCount: 0, // 전체수량.
	cartTotal: 0, // 전체금액.

	list: function () {
		// 목록.
		svc.cartList(
			result => {
				console.log(result);
				result.forEach((val, idx) => {
					basket.cartCount += val.qty;
					basket.cartTotal += (val.qty * val.price);

					const rowDiv = document.querySelector('div[data-id="0"]').cloneNode(true);
					rowDiv.style.display = 'block';
					rowDiv.setAttribute('data-id', val.no);
					rowDiv.querySelector('div.img>img').setAttribute('src', 'images/' + val.productNm + '.jpg');
					rowDiv.querySelector('div.pname>span').innerText = val.productNm;
					// rowDiv.querySelector('div.basketprice').innerText = val.price.numberFormat() + "원";
					rowDiv.querySelector('div.basketprice').childNodes[2].textContent = val.price.numberFormat() + "원";
					// let children = rowDiv.querySelector('div.basketprice').children.childNodes
					rowDiv.querySelector('div.basketprice input').value = val.price;
					rowDiv.querySelector('div.basketprice input').setAttribute('id', 'p_price' + val.no);
					rowDiv.querySelector('div.updown input').value = val.qty;
					rowDiv.querySelector('div.updown input').setAttribute('id', 'p_num' + val.no);
					// event
					rowDiv.querySelector('div.updown input').onkeyup = () => basket.changePNum(val.no);
					rowDiv.querySelector('div.updown span').onclick = () => basket.changePNum(val.no);
					rowDiv.querySelector('div.updown span:nth-of-type(2)').onclick = () => basket.changePNum(val.no);
					// 개별합계
					rowDiv.querySelector('div.sum').textContent = (val.qty * val.price).numberFormat() + "원";
					rowDiv.querySelector('div.sum').setAttribute('id', 'p_sum' + val.no)
					document.querySelector('#basket').append(rowDiv);
				});
				basket.reCalc();
			},
			err => {
				console.log(err);
			}
		) // end of cartList()

	}, // end of list

	delItem: function () {
		let no = event.target.parentElement.parentElement.parentElement.getAttribute('data-id');
		//		let no = event.target.parentElement.parentElement.parentElement.dataset.id;
		let ee = event.target.parentElement.parentElement.parentElement;
		svc.cartRemove(no, (result) => {

			let price = document.querySelector('#p_price' + no).value; // 단가
			let qty = document.querySelector('#p_num' + no).value; // 현재수량
			// 합계반영
			basket.cartCount -= qty;
			basket.cartTotal -= (price * qty);
			basket.reCalc();

			//			document.querySelector('div[data-id="' + no +'"]').remove(); // 교수님 방법
			ee.remove();
		},
			err => console.log(err));
	},

	reCalc: function () {
		//수량, 금액 합계 계산
		//합계 자리에 출력
		document.querySelector('#sum_p_num span').textContent = basket.cartCount;
		document.querySelector('#sum_p_price span').textContent = basket.cartTotal.numberFormat();

	},

	changePNum: function (no) {
		console.log(event);
		let qty = -1;
		if (event.target.nodeName == "I") {
			if (event.target.className.indexOf("up") != -1) {
				qty = 1;
			}
		} else if (event.target.nodeName == "INPUT") {
			if (event.key == "ArrowUp") {
				qty = 1;
			}
		}

		price = document.querySelector('#p_price' + no).value; // 금액
		qtyElem = document.querySelector('#p_num' + no);
		sumElem = document.querySelector('#p_sum' + no);

		let cvo = { no, qty }
		svc.cartUpdate(cvo, //
			result => {
				console.log(result);
				qtyElem.value = parseInt(qtyElem.value) + qty;// 수량변경
				sumElem.innerText = (price * qtyElem.value).numberFormat() + "원";

				// 전체수량, 금액
				basket.cartCount += qty;
				basket.cartTotal += (price * qty);
				basket.reCalc();
			},
			err => {
				console.log(err);
			}
		)
	},

	delCheckedItem: function () {
		document.querySelectorAll('input[type="checkbox"]').forEach((item, idx) => {
			if (idx > 0 && item.checked == true) {
				console.log(item);
				console.log(item.parentElement.parentElement.parentElement);
				let no = item.parentElement.parentElement.parentElement.getAttribute('data-id');
				svc.cartRemove(no, (result) => {

					let price = document.querySelector('#p_price' + no).value; // 단가
					let qty = document.querySelector('#p_num' + no).value; // 현재수량
					// 합계반영
					basket.cartCount -= qty;
					basket.cartTotal -= (price * qty);
					basket.reCalc();

					document.querySelector('div[data-id="' + no +'"]').remove(); // 교수님 방법
//					item.parentElement.parentElement.parentElement.remove();
				},
					err => console.log(err));



			}
		});
	},

	delAllItem: function () {

	},
};

basket.list();
