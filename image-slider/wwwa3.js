const imageFolder = "images/";
const fps = 60;
let timeouts = [];
const scaleToFit = (img, canvas, ctx) => {
    // get the scale
    let scale = Math.min(canvas.width / img.width, canvas.height / img.height);
    // get the top left position of the image
    let x = (canvas.width / 2) - (img.width / 2) * scale;
    let y = (canvas.height / 2) - (img.height / 2) * scale;
    ctx.drawImage(img, x, y, img.width * scale, img.height * scale);
}

window.addEventListener('DOMContentLoaded', () => {

    for (let i = 0; i < images.length; i++) {
        images[i] = imageFolder + images[i]
    }
    images.forEach(
        item => console.log(item)
    );
    let canvas = document.getElementById("myCanvas");
    let context = canvas.getContext("2d");
    // let image = new Image();
    // let transitionCounter = 0;
    // image.src = images[0];
    // image.onload = function () {
    //     scaleToFit(image, canvas, context);
    // };
    console.log("loading");
    let imageObjs = [];
    let imageLoaded = 0;
    let imageIndex = 0;
    let transitionCounter = 0;
    for(let i = 0; i < images.length; i++){
        console.log(i);
        let image = new Image();
        image.src = images[i];
        image.onload = function () {
            console.log(`loaded ${i}th img`);
            imageLoaded++;
            console.log("imageLoaded: ", imageLoaded);
            if(imageLoaded === images.length){
                console.log("loaded all");
                timeouts = transitionImage();
            }
        }
        imageObjs.push(image);
    }
    const transitionImage =() => {
        timeouts[timeouts.length] = setTimeout(function animate() {
            window.requestAnimationFrame(transitionImage);
            let image = imageObjs[imageIndex];
            let scale = Math.min(canvas.width / image.width, canvas.height / image.height);
            let x = (canvas.width / 2) - (image.width / 2) * scale * transitionCounter;
            let y = (canvas.height / 2) - (image.height / 2) * scale;
            context.globalAlpha = transitionCounter;
            context.clearRect( 0,0,canvas.width,canvas.height);
            // context.drawImage(image,x,y);
            context.fillStyle = 'white';
            context.drawImage(image, x, y, image.width * scale, image.height * scale);
            transitionCounter+=.01;
            if(transitionCounter>=1.00){
                transitionCounter=0.00;
                imageIndex++;
                if(imageIndex>=images.length){
                    imageIndex=0;
                }
            }
        }, 3000/fps);
        return timeouts;
    };
    function stopCheck(timeouts) {
        for (let i = 0; i < timeouts.length; i++) {
            clearTimeout(timeouts[i]);
        }
    }

    canvas.addEventListener("mouseenter", function () {
        console.log("enter");
        stopCheck(timeouts);
    });
    canvas.addEventListener("mouseleave", function () {
        console.log("leave");
        transitionImage();
    });
});