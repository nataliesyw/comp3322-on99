const imageFolder = "images/";
let timeouts = [];
window.addEventListener('DOMContentLoaded', () => {
    for (let i = 0; i < images.length; i++) {
        images[i] = imageFolder + images[i]
    }
    // images.forEach(
    //     item => console.log(item)
    // );
    let canvas = document.getElementById("myCanvas");
    let context = canvas.getContext("2d");
    let imageObjs = [];
    let loadImgCounter = 0;
    let index = 0;
    let fadeInCounter = 0;
    for(let i = 0; i < images.length; i++){
        let image = new Image();
        image.src = images[i];
        image.onload = function () {
            loadImgCounter++;
            if(loadImgCounter === images.length){
                console.log("loaded all");
                timeouts = transitionImage();
            }
        }
        imageObjs[i] = image;
    }
    const transitionImage =() => {
        timeouts[timeouts.length] = setTimeout(function animate() {
            window.requestAnimationFrame(transitionImage);
            let currentImg = imageObjs[index];
            let scale = Math.min(canvas.width / currentImg.width, canvas.height / currentImg.height);
            let x = (canvas.width / 2) - (currentImg.width / 2) * scale * fadeInCounter;
            let y = (canvas.height / 2) - (currentImg.height / 2) * scale;
            let newWidth = currentImg.width * scale;
            let newHeight = currentImg.height * scale;
            context.globalAlpha = fadeInCounter;
            context.clearRect( 0,0,canvas.width,canvas.height);
            context.fillStyle = 'white';
            context.drawImage(currentImg, x, y, newWidth, newHeight);
            fadeInCounter += .01;
            if(fadeInCounter >= 1.00){
                index++;
                fadeInCounter = 0.00;
                if(index > imageObjs.length){
                    index=0;
                }
            }
        }, 3000/60);
        return timeouts;
    };
    function stopCheck(timeouts) {
        for (let i = 0; i < timeouts.length; i++) {
            clearTimeout(timeouts[i]);
        }
    }

    canvas.addEventListener("mouseover", function () {
        // console.log("enter");
        stopCheck(timeouts);
    });
    canvas.addEventListener("mouseleave", function () {
        // console.log("leave");
        stopCheck(timeouts);
        transitionImage();
    });
    canvas.addEventListener("click", function () {
        // console.log("clicked");
        stopCheck(timeouts);
        transitionImage();
    });
});