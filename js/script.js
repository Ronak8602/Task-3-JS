//* GLOBAL VALIDATOR

function globalValidator(expression, value) {
    switch (expression) {
        case 'name': {
            let nameFilter = /^[A-Za-z ]+$/;
            if (!value) {
                $("#nameAsterisk").text("Name is required");
                return false;
            } else if (!nameFilter.test(value)) {
                $("#nameAsterisk").text("Enter valid name");
                return false;
            } else {
                $("#nameAsterisk").text("*")
                return true;
            }
            break;
        }
        case 'email': {
            let emailFilter =
                /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
            if (!value) {
                $("#emailAsterisk").text("Email is required");
                return false;
            } else if (!emailFilter.test(value)) {
                $("#emailAsterisk").text("Enter valid email");
                $("#email").focus();
                return false;
            } else {
                $("#emailAsterisk").text("*");
                return true;
            }
            break;
        }
        case 'org': {
            if (!value) {
                $("#orgAsterisk").text("Organization name is required");
            } else {
                $("#orgAsterisk").text("*");
            }
            break;
        }
        default:
            return false;
    }
}

//* IMPORTANT FIELDS VALIDATION BLOCK AND COMPLETE FORM VALIDATION

// NAME VALIDATION
function nameValidator() {
    let nameFilter = /^[A-Za-z ]+$/;
    if (!$("#name").val()) {
        $("#nameAsterisk").text("Name is required");
        return false;
    } else if (!nameFilter.test($("#name").val())) {
        $("#nameAsterisk").text("Enter valid name");
        return false;
    } else {
        $("#nameAsterisk").text("*")
        return true;
    }
}

// EMAIL VALIDATION
function emailValidator() {
    let emailFilter =
        /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    if (!$("#email").val()) {
        $("#emailAsterisk").text("Email is required");
        return false;
    } else if (!emailFilter.test($("#email").val())) {
        $("#emailAsterisk").text("Enter valid email");
        $("#email").focus();
        return false;
    } else {
        $("#emailAsterisk").text("*");
        return true;
    }
}

// ORGANIZATION NAME VALIDATION
function organizationValidator() {
    if (!$("#organizationName").val()) {
        $("#orgAsterisk").text("Organization name is required");
    } else {
        $("#orgAsterisk").text("*");
    }
}

// COMPLETE FORM VALIDTION
function completeFormValidator() {
    if (
        $("#name").val() == '' || $("#email").val() == '' || $("#organizationName").val() == '') {
        $("#topError").text("Please fill all the required fields below");

        return false;
    } else {
        $("#topError").text("");
        return true;
    }
}

//* SET PROMOTION DROPDOWN FUNCTIONING

function promotionCodeInput() {
    let selectedValue = $("#stateDropdown option:selected").val();
    if (selectedValue != "select") {
        $("#promotion").val(selectedValue + " - PROMO")
    }
    else {
        $("#promotion").val("")
    }
}

//* GREETINGS ALERT FUNCTIONING

function greetings() {
    let value = $("input[name=gender]:checked").val();
    alert(`Hello ${value}`);
}

//* SEND AND RESET FORM AND LOCAL STORAGE

// SEND FORM
function sendForm() {

    let dataObject = {
        name: $("#name").val(),
        email: $("#email").val(),
        telephone: $("#telephone").val(),
        organization: $("#organizationName").val(),
        city: $("#city").val(),
        state: $("#stateDropdown").prop("selectedIndex"),
        contactMe: $("input[name=contactme]:checked").attr("id"),
        gender: $("input[name=gender]:checked").attr("id"),
        promotionCode: $("#promotion").val(),
        website: $("#website").val(),
        aboutOrganization: $("#aboutOrganization").val(),
        information: $("#information").val()
    };

    let firstValidation = completeFormValidator();

    /*
        Index 'name' : Name
        Index 'email' : Email
        Index 'org' : Organization
    */

    let validateName = globalValidator('name', dataObject.name);
    let validateEmail = globalValidator('email', dataObject.email);
    let validateOrganization = globalValidator('org', dataObject.organization);

    if (!firstValidation || !validateName || !validateEmail || validateOrganization) {
        return;
    }

    alert("Form submitted successfully");

    createFormResponseDiv(localStorage.length);
    localStorage.setItem(localStorage.length, JSON.stringify(dataObject));

    $("#name").val("");
    $("#email").val("");
    $("#telephone").val("");
    $("#organizationName").val("");
    $("#city").val("");
    $("#stateDropdown").prop("selectedIndex", 0);
    let selectedContactMeId = $("input[name=contactme]:checked").attr("id");
    let selectedGenderId = $("input[name=gender]:checked").attr("id");
    $("#" + selectedContactMeId).prop('checked', false);
    $("#" + selectedGenderId).prop('checked', false);
    $("#promotion").val("");
    $("#website").val("");
    $("#aboutOrganization").val("");
    $("#information").val("");
}

// RESET FORM
function resetForm() {
    $("#contactForm").trigger("reset");
    alert("Form reset successfull.");
    window.location.reload();
}

//* DISPLAY RESPONSES

// CREATES RESPONSE BUTTON
function createFormResponseDiv(id) {
    $(".responsesContainer").append(`<button class="responseButton" id=${id}>${$("#name").val()}</button>`);
}

// RESPONSE BUTTON ONCLICK METHOD
$("body").on("click", ".responseButton", function () {
    displayData(this.id);
});

function displayData(index) {
    let data = JSON.parse(localStorage.getItem(parseInt(index)));
    $("#name").val(data.name);
    $("#email").val(data.email);
    $("#telephone").val(data.telephone);
    $("#organizationName").val(data.organization);
    $("#city").val(data.city);
    $("#stateDropdown").prop("selectedIndex", data.state);
    $("#" + data.contactMe).prop('checked', true);
    $("#" + data.gender).prop('checked', true);
    $("#promotion").val(data.promotionCode);
    $("#website").val(data.website);
    $("#aboutOrganization").val(data.aboutOrganization);
    $("#information").val(data.information);
    nameValidator();
    emailValidator();
    organizationValidator();
    completeFormValidator();
}


//* INITIAL FETCHING DATA FROM LOCAL STORAGE AND DISPLAYING

function addResponses() {
    for (let i = 0; i < localStorage.length; i++) {
        let data = JSON.parse(localStorage.getItem(i));
        $(".responsesContainer").append(`<button class="responseButton" id=${i}>${data.name}</button>`);
    }
}

$(document).ready(function () {
    addResponses();
    $("#name").blur(nameValidator);
    $("#email").blur(emailValidator);
    $("#organizationName").blur(organizationValidator);
    $("#stateDropdown").change(
        promotionCodeInput
    );
    $("input[name=gender]").click(greetings);
    $("#send").click(sendForm);
    $("#clear").click(resetForm);
});



