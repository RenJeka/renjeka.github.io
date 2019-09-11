window.addEventListener("load", function () {
        var btnTop = document.querySelector(".btn-top");
        var btnBottom = document.querySelector(".btn-bottom");
        var message = document.querySelector(".message");
        var messageFlag = false;
        var delayAnimation = parseFloat(message.dataset.delay)*1000;
        console.log(delayAnimation);
        
        btnTop.addEventListener("click", function () {
            window.location.href = "#here";
        });
        btnBottom.addEventListener("click", function () {
            var timer;
            if (messageFlag == false) {
                message.style.display = "block";
                message.innerHTML = "Мы с Вами свяжемся в ближайшее время"
                messageFlag = true;
            }else{
                message.style.display = "block";
                message.innerHTML = "Вы уже заказали консультацию!"
                
            }

            timer = window.setTimeout(timeFunc, delayAnimation);

            function timeFunc() {
                message.style.display = "none";
            };

        });
    });