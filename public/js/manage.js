
function checkInputs() {
	var emptyElems = document.getElementsByClassName('is-empty');
	var errorElems = document.getElementsByClassName('has-error');
	if ((emptyElems.length != 0) || (errorElems.length != 0)) {
		document.getElementById('postLIBOR').disabled = true;
	} else {
		document.getElementById('postLIBOR').disabled = false;
	}
}

if (document.getElementById('tenor')) {
	var checkInput = function () {
		if (document.getElementById('tenor').value != '') {
			document.getElementById('tenorInput').className = 'col-sm-10 has-success';
			checkInputs();
			return;
		}
		document.getElementById('tenorInput').className = 'col-sm-10 is-empty';
		checkInputs();
	}
	document.getElementById('tenor').addEventListener('change', checkInput);
	setInterval(checkInput, 1000);
}

if (document.getElementById('date')) {
	var checkInput = function () {
		var val = document.getElementById('date').value;
		if (val == "") {
			document.getElementById('dateInput').className = 'col-sm-10 is-empty';
			checkInputs();
			return;
		} else if (val.length == 10) {
			var month = parseInt(val.substring(0, 2));
			var day = parseInt(val.substring(3, 5));
			var year = parseInt(val.substring(6, 10));
			if (!isNaN(month) && !isNaN(day) && !isNaN(year)) {
				if ((month >= 1) && (month <= 12) && (day >= 0) && (year >= 0)) {
					if (
						(((month == 1) || (month == 3) || (month == 5) || (month == 7) || (month == 8) || (month == 10) || (month == 12)) && (day <= 31)) ||
						(((month == 4) || (month == 6) || (month == 9) || (month == 11)) && (day <= 30)) ||
						((month == 2) && (day <= (((year % 4 == 0) && (((year % 100 != 0) || (year % 400 == 0)))) ? 29 : 28)))
					) {
						document.getElementById('dateInput').className = 'col-sm-10 has-success';
						checkInputs();
						return;
					}
				}
			}
		}
		document.getElementById('dateInput').className = 'col-sm-10 has-error';
		checkInputs();
	}
	document.getElementById('date').addEventListener('change', checkInput);
	setInterval(checkInput, 1000);
}

if (document.getElementById('LIBORValue')) {
	var checkInput = function () {
		var val = document.getElementById('LIBORValue').value;
		if (val == "") {
			document.getElementById('LIBORValueInput').className = 'col-sm-10 is-empty';
			checkInputs();
			return;
		}
		val = parseFloat(val);
		if (!isNaN(val) && (val > 0)) {
			document.getElementById('LIBORValueInput').className = 'col-sm-10 has-success';
			checkInputs();
			return;
		}
		document.getElementById('LIBORValueInput').className = 'col-sm-10 has-error';
		checkInputs();
	}
	document.getElementById('LIBORValue').addEventListener('change', checkInput);
	setInterval(checkInput, 1000);
}