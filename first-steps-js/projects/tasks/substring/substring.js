window.addEventListener("load", ()=>{

	document.forms[0].addEventListener("submit", (e) => {
		let inp_str = document.querySelector("#inp_str").value,
			result = document.querySelector("#result"),
			resultString = document.querySelector("#result-string"),
			resultSubstring;
		e.preventDefault();
		resultSubstring = substring(inp_str);

		inp_str = inp_str.replace(resultSubstring, `<mark>${resultSubstring}</mark>`);

		result.value = resultSubstring;
		resultString.innerHTML = inp_str;
	})


	function substring(str) {


		/**
		 * function bypass array for find substring with 2 unique caracters 
		 * @param {Array} array starting index
		 * @param {number} startIndex starting index
		 * @returns {array} substring of unique caracters as array
		 */
		function findSubstring(array, startIndex){
			let char1, char2,
				resultSubstring = [];

			// char1 initialization 
			if (startIndex <= array.length - 1) {
				char1 = array[startIndex];
				resultSubstring.push(char1);
			}

			for (let j = startIndex + 1; j < array.length; j++) {
		
				//if (j <= array.length - 1) {

					// char2 initialization 
					if ((array[j] !== char1) && char2 === undefined) {
						char2 = array[j];
						resultSubstring.push(char2);
						continue
					}

					// general conditional
					if (array[j] === char1 || array[j] === char2) {
						resultSubstring.push(array[j]);
					}else {
						return resultSubstring
					}
				//}
			}
			return resultSubstring
		}

		let allChars = str.split("");
		let resultSubstring = [];

		allChars.forEach((element, index) => {
			let tempSubstring = findSubstring(allChars, index);
			if (tempSubstring.length > resultSubstring.length) {
				resultSubstring = Array.from(tempSubstring);
			}
		})

		return resultSubstring.join("")

	}
})

  
  // Find the longest substring within a string that contains at most 2 unique characters.
  // substring("a") => "a"
  // substring("aaa") => "aaa"
  // substring("afbfafcdfdd") => "aba"
  // substring("abacddcd") => "cddcd"
  // substring("ceeefageaacceaccacca") => "accacca"
  
  // c,c,e,c,e,e,f,a,g,e,a,a,c,c,e,a,c,c,a,c,c,a
  
  /*
  let char1 = c
  let char2 = e
  let resultStr = [c,c,e,c,e,e];
  
  
  let char1 = c
  let char2 = e
  let resultStr = [c,e,c,e,e];
  
  [[c,c,e,c,e,e], [c,e,c,e,e], [f,a], [a,g], [c,c,e]]
  */