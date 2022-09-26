var sendButton = document.querySelector("#send");
var clearButton = document.querySelector("#clear");

var input = document.getElementById("name");

var ul = document.querySelector(".responsesContainer");

var responseArray = new Array();

var nameV = document.getElementById("name");
var emailV = document.getElementById("email");
var telephoneV = document.getElementById("telephone");
var organizationV = document.getElementById("organizationName");
var cityV = document.getElementById("city");
var stateV = document.getElementById("stateDropdown");
var c1 = document.getElementById("c1");
var c2 = document.getElementById("c2");
var c3 = document.getElementById("c3");
var g1 = document.getElementById("g1");
var g2 = document.getElementById("g2");
var promotionCodeV = document.getElementById("promotion");
var websiteV = document.getElementById("website");
var aboutOrganizationV = document.getElementById("aboutOrganization");
var informationV = document.getElementById("information");


function inputLength() {
    return input.value.length;
}

function setPromotion(value) {
    if (value != "select") {
        document.getElementById("promotion").value = value.substring(0, value.length - 1) + " - PROMO";
    } else {
        document.getElementById("promotion").value = "";
    }
}

function validator() {
    if (
        document.getElementById("name").value == "" ||
        document.getElementById("email").value == "" ||
        document.getElementById("organizationName").value == ""
    ) {
        document.getElementById("topError").innerHTML =
            "Please fill all the required fields below";
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

    var emailFilter =
        /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    var nameFilter = /^[A-Za-z ]+$/;

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
    } else if (!emailFilter.test(email)) {
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

    if (firstValidation == false || secondValidation == false) {
        return;
    }

    if (firstValidation && secondValidation) {
        alert("Form submitted successfully");

        // Below line takes page to home page

        // window.location.replace("index.html");
    }

    // Starting response logic from here

    var contactMe = "none";
    var gender = "none";

    if (c1.checked) {
        contactMe = "c1";
    } else if (c2.checked) {
        contactMe = "c2";
    } else if (c3.checked) {
        contactMe = "c3";
    }

    if (g1.checked) {
        gender = "g1";
    } else if (g2.checked) {
        gender = "g2";
    }

    var dataObject = {
        name: nameV.value,
        email: emailV.value,
        telephone: telephoneV.value,
        organization: organizationV.value,
        city: cityV.value,
        state: stateV.selectedIndex,
        contactMe: contactMe,
        gender: gender,
        promotionCode: promotionCodeV.value,
        website: websiteV.value,
        aboutOrganization: aboutOrganizationV.value,
        information: informationV.value
    };

    responseArray.push(dataObject);

    createFormResponseDiv(responseArray.length);

    nameV.value = "";
    emailV.value = "";
    telephoneV.value = "";
    organizationV.value = "";
    cityV.value = "";
    stateV.selectedIndex = 0;
    c1.checked = false;
    c2.checked = false;
    c3.checked = false;
    g1.checked = false;
    g2.checked = false;
    promotionCodeV.value = "";
    websiteV.value = "";
    aboutOrganizationV.value = "";
    informationV.value = "";
}

function resetForm() {
    document.querySelector("#contactForm").reset();
    alert("Form reset successfull.");
    window.location.reload();
}

function removeParent(evt) {
    evt.target.removeEventListener("click", removeParent, false);
    evt.target.parentNode.remove();
}

function createFormResponseDiv(id) {
    // var btn1 = document.createElement("button");
    // btn1.innerHTML = "Delete";
    // btn1.onclick = removeParent;

    // var btn2 = document.createElement("button");
    // btn2.innerHTML = "Show";
    // btn2.onclick = addData;

    // var li = document.createElement("li");
    // li.classList.add("response");
    // li.appendChild(document.createTextNode(input.value));
    // li.innerHTML = li.innerHTML + " ";
    // li.appendChild(btn2);
    // li.appendChild(btn1);

    // ul.appendChild(li);
    // input.value = "";

    /// creating new logic to add button

    var btn = document.createElement("button");
    btn.setAttribute('id', id.toString());
    btn.innerHTML = nameV.value;
    btn.onclick = displayData;
    btn.classList.add("responseButton");

    ul.appendChild(btn);
    input.value = "";
}

function displayData() {
    var index = parseInt(this.id);
    nameV.value = responseArray[index - 1].name;
    emailV.value = responseArray[index - 1].email
    telephoneV.value = responseArray[index - 1].telephone
    organizationV.value = responseArray[index - 1].organization
    cityV.value = responseArray[index - 1].city
    stateV.selectedIndex = responseArray[index - 1].state
    document.getElementById(responseArray[index - 1].contactMe).checked = true;
    document.getElementById(responseArray[index - 1].gender).checked = true;
    promotionCodeV.value = responseArray[index - 1].promotionCode
    websiteV.value = responseArray[index - 1].website
    aboutOrganizationV.value = responseArray[index - 1].aboutOrganization
    informationV.value = responseArray[index - 1].information
}

sendButton.addEventListener("click", sendForm);
clearButton.addEventListener("click", resetForm);
