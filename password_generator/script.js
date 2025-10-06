document.addEventListener('DOMContentLoaded', function() {
    const pwdLengthInput = document.getElementById("pwdlength");
    pwdLengthInput.addEventListener("keydown", handleEnterKey);
});

function handleEnterKey(event) {
    if (event.key === "Enter") {
        generatePassword();
    }
}

function generatePassword(){
    const length=parseInt(document.getElementById("pwdlength").value);      
    if (length<5 || length>25){
        alert("Please enter a length between 5 and 25");
        return;
    }
    const characters="ABCDEFGHIJKLMNOPQRSTUVWXYZabcedfghijklmnopqrstuvwxyz0123456789/*-=_)(*&^%$#@!";
    let password="";

    for (let i=0;i<length;i++){
        const randomIndex=Math.floor(Math.random()*characters.length);
        password+=characters[randomIndex]
    }
    document.getElementById("password").value=password;
}

function copyPassword() {
    const passwordField = document.getElementById("password");
    passwordField.select();
    passwordField.setSelectionRange(0, 99999); // Mobile support
    navigator.clipboard.writeText(passwordField.value).then(() => {
      const successMsg = document.getElementById("success");
      successMsg.textContent = "Copied to clipboard!";
      setTimeout(() => {
        successMsg.textContent = "";
      }, 2000);
  });
}