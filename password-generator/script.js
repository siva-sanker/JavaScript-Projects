function generatePassword(){
    const length=10;
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
    navigator.clipboard.writeText(passwordField.value)
        .then(() => {
            document.getElementById('success').innerText='Copied to clipboard';
        })
        .catch(err => {
            console.error("Failed to copy password:", err);
        });
}