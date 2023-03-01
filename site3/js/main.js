window.addEventListener("load", function () {
        var btnTop = document.querySelector(".btn-top");
        var btnBottom = document.querySelector(".btn-bottom");
        var message = document.querySelector(".message");
        var messageFlag = false;
        var delayAnimation = parseFloat(message.dataset.delay) * 1000;
        console.log(delayAnimation);
        
        btnTop.addEventListener("click", function () {
            window.location.href = "#here";
        });
        btnBottom.addEventListener("click", function () {
            var timer;
            if (messageFlag === false) {
                message.style.display = "block";
                message.innerHTML = "We will contact you shortly";
                messageFlag = true;
            }else{
                message.style.display = "block";
                message.innerHTML = "You have already booked a consultation!"
                
            }

            timer = window.setTimeout(timeFunc, delayAnimation);

            function timeFunc() {
                message.style.display = "none";
            }
        });
    });
