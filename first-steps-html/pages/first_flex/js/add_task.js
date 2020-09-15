window.addEventListener("load", function () {

    //Меняем высоту хедера (блока с классом .header) на высоту изображения, которое задано в качестве фона
    var header = document.querySelector(".header");
    var sourceImage;
    var bgImage = new Image;
    var imgStyles = window.getComputedStyle(header);
    sourceImage = imgStyles.backgroundImage;
    sourceImage = sourceImage.substr(5, sourceImage.length - 7 );
    bgImage.src = sourceImage;
    header.style.height = bgImage.height + "px";
    console.dir(header);
    console.dir(bgImage);


});