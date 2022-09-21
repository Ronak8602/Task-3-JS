var stateDropdown = document.getElementById("stateDropdown");

var genderRadioButton = document.getElementById("gender");

var sendButton = document.querySelector("#send");
var clearButton = document.querySelector("#clear");

var input = document.getElementById("name");

function inputLength() {
    return input.value.length;
}

function setPromotion(value) {
    document.getElementById("promotion").value = value + " - PROMO";
}

function validator() {
    if (document.getElementById("name").value == "" || document.getElementById("email").value == "" || document.getElementById("organizationName").value == "") {
        document.getElementById("topError").innerHTML = "Please fill all the required fields below";
        return false;
    } else {
        document.getElementById("topError").innerHTML = "";
        return true;
    }
}

function astrickField() {
    var validName = false;
    var validEmail = false;
    var validOrg = false;

    var filter = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

    if (document.getElementById("name").value === "") {
        document.getElementById("myname").innerHTML = "Name is required";
    } else {
        document.getElementById("myname").innerHTML = "*";
        validName = true;
    }

    if (document.getElementById("email").value === "") {
        document.getElementById("myemail").innerHTML = "Email is required";
    }
    else if (!filter.test(document.getElementById("email").value)) {
        document.getElementById("myemail").innerHTML = "Enter valid email";
        email.focus;

    } else {
        document.getElementById("myemail").innerHTML = "*";
        validEmail = true;

    }

    if (document.getElementById("organizationName").value === "") {
        document.getElementById("org").innerHTML = "Organization name is required";
    } else {
        document.getElementById("org").innerHTML = "*";
        validOrg = true;

    }

    return validName && validEmail && validOrg;
}

function sendForm() {
    if (validator() && astrickField()) {
        alert("Form submitted successfully");
        window.location.replace("index.html");
    }
}

function resetForm() {
    document.querySelector("#contactForm").reset();
    alert("Form reset successfull.");
}

sendButton.addEventListener("click", sendForm);
clearButton.addEventListener("click", resetForm);