// @copywrite Shafiur Rahman Bhauyan 2022
// this js code will help to build a custom filter with the intensity levels
// the user can modify an image easily using different filters

document.addEventListener("DOMContentLoaded", DomEventHandler);

function DomEventHandler() {

    // this is a nodeList making with the id and the element name(very important)
    const thumbnails = document.querySelectorAll("#thumbBox img"); 

    // since it is a nodeList we can loop through it like an array
    for (let thumbnail of thumbnails) {
        // here thumbnail is every element of the img element present inside the thumbBox id
        thumbnail.addEventListener("click", (e) => {
            console.log(e.target);
            let mainImage = document.querySelector("#imgManipulated img");
            let changedImageSource = thumbnail.getAttribute("src").replace("small", "medium");
            mainImage.setAttribute("src", changedImageSource);

            const alternateName = document.querySelector("figcaption em");
            const title = document.querySelector("figcaption span");

            alternateName.textContent = e.target.alt;
            title.textContent = e.target.title;
            // since we're not resetting the image filters that's why we get the advantage of using the preused filters on the new image
            // and this adds a very unique feature to this image filter pplication
        });
    }

    // Applying event delegation in this line and avoiding rewriting by getting the target with the click from parent
    const sliderBox = document.querySelector("#sliderBox");
    sliderBox.addEventListener('input', editImage);

    // this is a function for setting all the filters in the targeted image
    function editImage(event) {
        let mainImage = document.querySelector("#imgManipulated img");

        let opacity = document.querySelector('#sliderOpacity').value;
        let saturation = document.querySelector('#sliderSaturation').value;
        let brightness = document.querySelector('#sliderBrightness').value;
        let hue = document.querySelector('#sliderHue').value;
        let gray = document.querySelector('#sliderGray').value;
        let blur = document.querySelector('#sliderBlur').value;
        let contrast = document.querySelector('#sliderContrast').value;
        let sepia = document.querySelector('#sliderSepia').value;
        let invert = document.querySelector('#sliderInvert').value;

        let filterName = `opacity(${opacity}%) saturate(${saturation}%) brightness(${brightness}%) hue-rotate(${hue}deg) grayscale(${gray}%) blur(${blur}px) contrast(${contrast}%) sepia(${sepia}%) invert(${invert}%)`;

        mainImage.style.filter = filterName;
    }

    // function to reset all the filters
    function resetFilters() {
        let mainImage = document.querySelector("#imgManipulated img");
        mainImage.style.filter = "none";
        document.querySelector("#sliderBox").reset();
    }

    // reseting all the filters when the reset button is clicked
    let sliderFrom = document.getElementById("sliderBox");
    sliderFrom.addEventListener('reset', function () {
        resetFilters();
    });
    const inputImage = document.querySelector("#uploadImage");
    inputImage.addEventListener("change", (event) => {
        const mainImage = document.querySelector("#imgManipulated img");
        const file = event.target.files[0];

        const img = new Image();
        img.src = URL.createObjectURL(file);

        img.onload = function () {
        const canvas = document.createElement("canvas");

        const MAX_WIDTH = 462;
        const MAX_HEIGHT = 640;
        let width = img.width;
        let height = img.height;

        if (width > height) {
            if (width > MAX_WIDTH) {
                height *= MAX_WIDTH / width;
                width = MAX_WIDTH;
            }
        } else {
            if (height > MAX_HEIGHT) {
                width *= MAX_HEIGHT / height;
                height = MAX_HEIGHT;
            }
        }

        canvas.width = width;
        canvas.height = height;

        const ctx = canvas.getContext("2d");
        ctx.drawImage(img, 0, 0, width, height);

        // setting the src attribute of the main image to the resized image
        mainImage.setAttribute("src", canvas.toDataURL("image/jpeg"));

        // reseting all the filters
        resetFilters();

        // clean up the object URL
        URL.revokeObjectURL(img.src);
        mainImage.setAttribute("title", "Your Image");

        function resetFilters() {
            // reset all the slider values to default
            document.getElementById("sliderOpacity").value = 100;
            document.getElementById("sliderSaturation").value = 100;
            document.getElementById("sliderBrightness").value = 100;
            document.getElementById("sliderHue").value = 0;
            document.getElementById("sliderGray").value = 0;
            document.getElementById("sliderBlur").value = 0;
            document.getElementById("sliderContrast").value = 100;
            document.getElementById("sliderSepia").value = 0;
            document.getElementById("sliderInvert").value = 0;

            // apply the default filter to the main image
            editImage();
        }  
    }})
}