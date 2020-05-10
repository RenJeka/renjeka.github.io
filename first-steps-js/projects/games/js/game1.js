window.onload = function () {
    var input1 = document.getElementById("inp_1");
    var button1 = document.getElementById("btn_1");
    var paragraph1 = document.getElementById("paragraph_1");
    var tries = 0;

    var guessNumber = Math.floor(Math.random()*(101-1))+ 1;

    function guessHandler() {

        if (input1.value === "") {
            paragraph1.innerHTML = "Вы не ввели число"
            return false;
        }

        tries ++;
        if (input1.value ==guessNumber) {
            paragraph1.innerHTML = "Вы угадали! Это было число " + guessNumber + "! Вы использовали "+tries + " попыток";
        }else if(input1.value < guessNumber){
            paragraph1.innerHTML = "Вы не угадали. Загаданное число больше вашего." + " Использована "+tries+" попытка.";
        }else if(input1.value > guessNumber){
            paragraph1.innerHTML = "Вы не угадали. Загаданное число меньше вашего. " + " Использована "+tries+" попытка.";
        }
    }
    
    button1.onclick = guessHandler;

}