window.addEventListener("load", () => {
	document.forms[0].addEventListener("submit", (e) => {
		let inp_str = document.querySelector("#inp_str"),
			result = document.querySelector("#result");
		let resultPalinbrome = isPalindrome(inp_str.value);
		
		e.preventDefault();
		if (resultPalinbrome) {
			result.value = "Это палиндром!";
		}else {
			result.value = "Это не палиндром =(";
		}
	})

	function isPalindrome(numberAsString) {
		let isPalindrome = false;
		const arrayOfNumbers = numberAsString.split("");

		if (arrayOfNumbers.length <= 1) {
		  return yesAnswer;
		}
	  
		isPalindrome = arrayOfNumbers.some(
		  (element, index, array) => element !== array[array.length - 1 - index]
		);
	  
		return !isPalindrome;
	  }
})