var form = document.getElementById("contactForm")
var container = document.getElementById("container");

var name = document.getElementById("name");
var email = document.getElementById("email");
var organizationName = document.getElementById("organizationName");

var stateDropdown = document.getElementById("stateDropdown");

var genderRadioButton = document.getElementById("gender");

var sendButton = document.getElementById("send");
var clearButton = document.getElementById("clear");

var input = document.getElementById("name");

function createDiv() {
    var div = document.createElement("div");
    var label = document.createElement("label");
    div.classList.add("formElement");
    label.classList.add("asterisk");
    container.append(div);
    div.appendChild(label);
    label.appendChild(document.createTextNode("Please fill all the required fields below"));
    // label.innerHTML = "Please fill all the required fields below";

}

function inputLength() {
    return input.value.length;
}

function setPromotion(value) {
    document.getElementById("promotion").value = value + " - PROMO";
}

function displayGreetings() {
    var ele = document.getElementsByName('gender');

    if (ele[0].checked) {
        alert("Hello Sir");
    } else if (ele[1].checked) {
        alert("Hello Lady");
    }
}

function checkEmail() {
    var filter = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    if (!filter.test(email.value)) {
        alert('Please provide a valid email address');
        email.focus;
        return false;
    }
    return true;
}

function validator() {
    var inCompleteError = document.getElementById("error");
    if (name.value == "" || email.value == "" || organizationName.value == "") {
        inCompleteError.innerHTML = "Please enter a valid number";
        inCompleteError.style.color = "red";
    } else {
        inCompleteError.textContent = "";
    }
}

function astrickField() {

    if (name.value == "") {
        var nameError = document.getElementsByClassName("nameError");
        nameError.innerHTML = "This field is required";
        nameError.style.color = "red";
        name.focus();
        return;
    }

    if (email.value == "") {
        var emailError = document.getElementsByClassName("emailError");
        emailError.innerHTML = "This field is required";
        emailError.style.color = "red";
        email.focus();
        return;
    }

    if (organizationName.value == "") {
        var organizationError = document.getElementsByClassName("organizationError");
        organizationError.innerHTML = "This field is required";
        organizationError.style.color = "red";
        organizationName.focus();
        return;
    }

}

function sendForm() {
    if (email.value === "" || organizationName.value === "") {
        document.getElementById("error").innerHTML = "Please fill all the required fields below";
    }
}

function resetForm() {
    form.reset();
    alert("Form reset successfull.");
}

genderRadioButton.addEventListener("click", displayGreetings);

sendButton.addEventListener("click", sendForm);
clearButton.addEventListener("click", resetForm);