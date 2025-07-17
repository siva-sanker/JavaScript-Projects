const textInput=document.getElementById("text-input");
const wordCountDisplay=document.getElementById("word-count")
const charCountDisplay=document.getElementById("char-count")

function updateCount(){
    let text=textInput.value;

    let charCount=text.length;

    let wordCount=text.trim().length >0 ? text.trim().split(/\s+/).length : 0;

    charCountDisplay.textContent=charCount;
    wordCountDisplay.textContent=wordCount;
}

textInput.addEventListener("input",updateCount);