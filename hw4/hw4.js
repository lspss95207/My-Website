$(function () {
    var imagesName = ['1.jpg', '2.jpg', '3.jpg', '4.jpg', '5.jpg', '6.jpg', '7.jpg', '8.jpg'];
    var length = imagesName.length;
    var current = 0;
    var img = $('img');
    $('#previous').on('click', function () {
        current = (current - 1 + length) % length;
        img.fadeTo(400,0.1, function () {
            img.attr("src", `images/${imagesName[current]}`).fadeTo(400,1);
        })
    })
    $('#next').on('click', function () {
        current = (current + 1 + length) % length;
        img.fadeTo(400,0.1, function () {
            img.attr("src", `images/${imagesName[current]}`).fadeTo(400,1);
        })
    })
})