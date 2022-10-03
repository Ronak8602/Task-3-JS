let nameInputField = $("#name");
let emailV = $("#email");
let telephoneV = $("#telephone");
let organizationV = $("#organizationName");
let cityV = $("#city");
let stateV = document.getElementById("stateDropdown");
let promotionCodeV = $("#promotion");
let websiteV = $("#website");
let aboutOrganizationV = $("#aboutOrganization");
let informationV = $("#information");

var ul = $(".responsesContainer");

let sendButton = $("#send");
let clearButton = $("#clear");

validName = Boolean(false);
validEmail = Boolean(false);
validOrg = Boolean(false);

//* IMPORTANT FIELDS VALIDATION BLOCK AND COMPLETE FORM VALIDATION

// NAME VALIDATION
nameInputField.blur(function () {
    let nameFilter = /^[A-Za-z ]+$/;
    if (!nameInputField.val()) {
        $("#myname").text("Name is required");
    } else if (!nameFilter.test(nameInputField.val())) {
        $("#myname").text("Enter valid name");
    } else {
        $("#myname").text("*")
        validName = true;
    }
});

// EMAIL VALIDATION
emailV.blur(function () {
    let emailFilter =
        /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    if (!emailV.val()) {
        $("#myemail").text("Email is required");
    } else if (!emailFilter.test(emailV.val())) {
        $("#myemail").text("Enter valid email");
        emailV.focus();
    } else {
        $("#myemail").text("*");
        validEmail = true;
    }
})

// ORGANIZATION NAME VALIDATION
organizationV.blur(function () {
    if (!organizationV.val()) {
        $("#org").text("Organization name is required");
    } else {
        $("#org").text("*");
        validOrg = true;
    }
})

// COMPLETE FORM VALIDTION
function completeFormValidator() {
    if (
        validName === false || validEmail === false || validOrg === false) {
        $("#topError").text("Please fill all the required fields below");
        return false;
    } else {
        $("#topError").text("");
        return true;
    }
}



//* SET PROMOTION DROPDOWN FUNCTIONING

$("#stateDropdown").change(function () {
    let selectedValue = $("#stateDropdown option:selected").val();
    if (selectedValue != "select") {
        $("#promotion").val(selectedValue + " - PROMO")
    }
    else {
        $("#promotion").val("")
    }
}
);


//* GREETINGS ALERT FUNCTIONING

$("input[name=gender]").click(function () {
    let value = $("input[name=gender]:checked").val();
    alert(`Hello ${value}`);
});


//* SEND AND RESET FORM AND LOCAL STORAGE

// SEND FORM
function sendForm() {
    let firstValidation = completeFormValidator();

    if (!firstValidation && !validName && !validEmail && !validOrg) {
        return;
    }

    alert("Form submitted successfully");

    let dataObject = {
        name: nameInputField.val(),
        email: emailV.val(),
        telephone: telephoneV.val(),
        organization: organizationV.val(),
        city: cityV.val(),
        state: $("#stateDropdown").prop("selectedIndex"),
        contactMe: $("input[name=contactme]:checked").attr("id"),
        gender: $("input[name=gender]:checked").attr("id"),
        promotionCode: promotionCodeV.val(),
        website: websiteV.val(),
        aboutOrganization: aboutOrganizationV.val(),
        information: informationV.val()
    };

    // console.log(dataObject);
    createFormResponseDiv(localStorage.length);
    localStorage.setItem(localStorage.length, JSON.stringify(dataObject));

    nameInputField.val("");
    emailV.val("");
    telephoneV.val("");
    organizationV.val("");
    cityV.val("");
    $("#stateDropdown").prop("selectedIndex", 0);
    let selectedContactMeId = $("input[name=contactme]:checked").attr("id");
    let selectedGenderId = $("input[name=gender]:checked").attr("id");
    $("#" + selectedContactMeId).prop('checked', false);
    $("#" + selectedGenderId).prop('checked', false);
    promotionCodeV.val("");
    websiteV.val("");
    aboutOrganizationV.val("");
    informationV.val("");
}

// RESET FORM
function resetForm() {
    $("#contactForm").trigger("reset");
    alert("Form reset successfull.");
    window.location.reload();
}

sendButton.click(sendForm);
clearButton.click(resetForm);


//* DISPLAY RESPONSES

// CREATES RESPONSE BUTTON
function createFormResponseDiv(id) {
    ul.append(`<button class="responseButton" id=${id}>${nameInputField.val()}</button>`);
}

// RESPONSE BUTTON ONCLICK METHOD
$("body").on("click", ".responseButton", function () {
    displayData(this.id);
});

function displayData(index) {
    let data = JSON.parse(localStorage.getItem(parseInt(index)));
    nameInputField.val(data.name);
    emailV.val(data.email);
    telephoneV.val(data.telephone);
    organizationV.val(data.organization);
    cityV.val(data.city);
    $("#stateDropdown").prop("selectedIndex", data.state);
    $("#" + data.contactMe).prop('checked', true);
    $("#" + data.gender).prop('checked', true);
    promotionCodeV.val(data.promotionCode);
    websiteV.val(data.website);
    aboutOrganizationV.val(data.aboutOrganization);
    informationV.val(data.information);
}


//* INITIAL FETCHING DATA FROM LOCAL STORAGE AND DISPLAYING

function addResponses() {
    for (let i = 0; i < localStorage.length; i++) {
        let data = JSON.parse(localStorage.getItem(i));
        ul.append(`<button class="responseButton" id=${i}>${data.name}</button>`);
    }
}


addResponses();

