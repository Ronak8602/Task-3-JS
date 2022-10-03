const actualBtn = document.getElementById('actual-btn');
const submitButton = document.getElementById('submit');

actualBtn.addEventListener('change', function () {
    document.getElementById("resume").value = this.files[0].name
})

submitButton.addEventListener('click', function () {
    alert("Form submitted successfully");
    window.location.replace("index.html");
})

