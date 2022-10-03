let validName = false;
let validEmail = false;
let validOrg = false;

//* IMPORTANT FIELDS VALIDATION BLOCK AND COMPLETE FORM VALIDATION

// NAME VALIDATION
$("#name").blur(function () {
    let nameFilter = /^[A-Za-z ]+$/;
    if (!$("#name").val()) {
        $("#myname").text("Name is required");
    } else if (!nameFilter.test($("#name").val())) {
        $("#myname").text("Enter valid name");
    } else {
        $("#myname").text("*")
        validName = true;
    }
});

// EMAIL VALIDATION
$("#email").blur(function () {
    let emailFilter =
        /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    if (!$("#email").val()) {
        $("#myemail").text("Email is required");
    } else if (!emailFilter.test($("#email").val())) {
        $("#myemail").text("Enter valid email");
        $("#email").focus();
    } else {
        $("#myemail").text("*");
        validEmail = true;
    }
})

// ORGANIZATION NAME VALIDATION
$("#organizationName").blur(function () {
    if (!$("#organizationName").val()) {
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

    if (!firstValidation || !validName || !validEmail || !validOrg) {
        return;
    }

    alert("Form submitted successfully");

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

    // console.log(dataObject);
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
    $("#send").click(sendForm);
    $("#clear").click(resetForm);
});



