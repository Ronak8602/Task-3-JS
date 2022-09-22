var stateDropdown = document.getElementById("stateDropdown");

var genderRadioButton = document.getElementById("gender");

var sendButton = document.querySelector("#send");
var clearButton = document.querySelector("#clear");

var input = document.getElementById("name");

function inputLength() {
    return input.value.length;
}

function setPromotion(value) {
    if (value != 'select') {
        document.getElementById("promotion").value = value + " - PROMO";
    }
    else {
        document.getElementById("promotion").value = "";
    }
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
    validName = Boolean(false);
    validEmail = Boolean(false);
    validOrg = Boolean(false);

    var name = document.getElementById("name").value;
    var email = document.getElementById("email").value;

    var emailFilter = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    var nameFilter = /^[A-Za-z]+$/;

    if (name === "") {
        document.getElementById("myname").innerHTML = "Name is required";
    } else if (!nameFilter.test(name)) {
        document.getElementById("myname").innerHTML = "Enter valid name";
    } else {
        document.getElementById("myname").innerHTML = "*";
        validName = true;
    }

    if (email === "") {
        document.getElementById("myemail").innerHTML = "Email is required";
    }
    else if (!emailFilter.test(email)) {
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
    firstValidation = new Boolean(false);
    secondValidation = new Boolean(false);

    firstValidation = validator();
    secondValidation = astrickField();

    if (firstValidation && secondValidation) {
        alert("Form submitted successfully");
        window.location.replace("index.html");
    }
}

function resetForm() {
    document.querySelector("#contactForm").reset();
    alert("Form reset successfull.");
    window.location.reload();
}

sendButton.addEventListener("click", sendForm);
clearButton.addEventListener("click", resetForm);