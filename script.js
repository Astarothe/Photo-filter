"use strict";

const filters = document.querySelector(".filters"),
    resetBtn = document.querySelector(".btn-reset"),
    nextBtn = document.querySelector(".btn-next"),
    loadPicture = document.querySelector("#btnInput"),
    savePicture = document.querySelector(".btn-save"),
    image = document.querySelector("img"),
    allInput = document.querySelectorAll("input[min]"),
    rootStyle = getComputedStyle(image),
    fullscreen = document.querySelector(".fullscreen");


function filter(data, img, name, value) {
    img.style.setProperty(`--${name}`, `${value}${data}`);

}

filters.addEventListener("input", (event) => {
    let nameInput = event.target.name;
    let valueInput = event.target.value;
    let dataSizing = event.target.dataset.sizing;
    let output = event.target.nextElementSibling;

    filter(dataSizing, image, nameInput, valueInput);
    output.textContent = valueInput;
});
resetBtn.addEventListener("click", (e) => {
    image.style = "";
    allInput.forEach(elem => {
        elem.nextElementSibling.textContent = elem.getAttribute("value");
        elem.value = elem.getAttribute("value");
    });
    console.log(getComputedStyle(image).getPropertyValue(`--invert`));
});

loadPicture.addEventListener("change", (e) => {
    const file = loadPicture.files[0];
    if (file) {
        image.src = URL.createObjectURL(file);
    }
});


savePicture.addEventListener("click", (e) => {
    let str = "";
    let canvas = document.createElement("canvas");
    let ctx = canvas.getContext("2d");

    function filters() {
        let arr = ["--blur", "--invert", "--sepia", "--saturate", "--hue",];
        for (let i = 0; i < arr.length; i++) {
            if (arr[i] === "--hue") {
                str += ` hue-rotate(${getComputedStyle(image).getPropertyValue(`${arr[i]}`)})`;
            } else {
                str += ` ${arr[i].substring(2)}(${getComputedStyle(image).getPropertyValue(`${arr[i]}`)})`;
            }
        }
        return str;
    }

    filters();
    const img = new Image();
    img.src = image.src;
    img.onload = function () {
        console.log(1);
        canvas.width = img.width;
        canvas.height = img.height;
        canvas.src = image.src;
        ctx.filter = str;
        ctx.drawImage(image, 0, 0);


        let link = document.createElement("a");
        link.download = "download.png";
        link.href = canvas.toDataURL();
        link.click();
        str = "";
    };
});
fullscreen.addEventListener("click", () => {
    if (!document.fullscreen) {
        document.documentElement.requestFullscreen();
    } else {
        document.exitFullscreen();
    }
});
