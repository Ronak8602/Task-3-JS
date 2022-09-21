var realButton = document.getElementById("realFile");
var browse = document.getElementById("browse");
var customTxt = document.querySelector("#customText");

browse.addEventListener("click", function () {
    realButton.click();
});

realButton.onchange = function (e) {
    console.log("ABCS");
    customTxt.innerHTML = realButton.value.match(
        /[\/\\]([\w\d\s\.\-\(\)]+)$/
    )[1];
};

