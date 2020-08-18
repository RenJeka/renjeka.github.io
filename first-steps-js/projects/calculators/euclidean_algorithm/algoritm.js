window.addEventListener("load", () => {
	document.forms[0].addEventListener("submit", (e) => {
		let num1 = document.querySelector("#num1"),
			num2 = document.querySelector("#num2"),
			result = document.querySelector("#result");
		let resultNOD = calcNOD(+num1.value, +num2.value);
		
		e.preventDefault();
		result.value = resultNOD;
	})

	function calcNOD(x, y) {
		let m = Math.max(x, y);
		let n = Math.min(x, y);
		let z; // temp variable

		while (n !== 0) {
			z = n;
			n = m % n ;
			m = z;
		}
		return m;
	}
})