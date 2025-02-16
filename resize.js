function updateImageSize() {
    var img = document.querySelector(".bottom-image");
    var textElem = document.querySelector("p");
    if (!img || !textElem) return;

    var viewportHeight = window.innerHeight;
    var viewportWidth = window.innerWidth;
    var textRect = textElem.getBoundingClientRect();

    if (document.body.scrollHeight <= viewportHeight) {
        // no scrolling: anchor image to bottom
        img.style.position = "fixed";
        img.style.bottom = "0";
        // use the bottom of the text to compute available space so the image doesn't cover it
        var availableSpace = viewportHeight - textRect.bottom;
        // using Math.max() looks more natural than either setting a percentage or a fixed margin
        var desiredHeight = Math.max(availableSpace - 40, 0.9 * availableSpace);

        if (img.naturalWidth && img.naturalHeight) {
            var aspect = img.naturalWidth / img.naturalHeight;
            var desiredWidth = desiredHeight * aspect;
            if (desiredWidth > viewportWidth) {
                desiredWidth = viewportWidth;
                desiredHeight = desiredWidth / aspect;
            }
        }
        img.style.height = desiredHeight + "px";
        img.style.width = "auto";
    } else {
        // scrolling required: match image height to text height
        img.style.position = "relative";
        var textHeight = textRect.height;
        img.style.height = textHeight + "px";
        img.style.width = "auto";
    }
}

window.addEventListener("load", function() {
    var img = document.querySelector(".bottom-image");
    if (img.complete) {
        updateImageSize();
    } else {
        img.addEventListener("load", updateImageSize);
    }
});

window.addEventListener("resize", updateImageSize);
