const nameAgeForm = document.getElementById("login-form");
const startButton = document.getElementById("login-form-submit");
const loginErrorMsg = document.getElementById("login-error-msg");

startButton.addEventListener("click", (e) => {
    e.preventDefault();
    const name = nameAgeForm.name.value;
    const age = nameAgeForm.age.value;

    if (name == "" || age == "" || parseInt(age) %1 != 0) {
        loginErrorMsg.style.opacity = 1;
    } else {
        loginErrorMsg.style.opacity = 0;
        const link = `StartPage.html?name=${name}&age=${age}`;
        window.location.replace(link)
    }
})