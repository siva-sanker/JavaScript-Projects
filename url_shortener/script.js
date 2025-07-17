const ACCESS_TOKEN = "your-access-token"; 

async function shortenUrl() {
    const longUrl = document.getElementById("longUrl").value;
    const apiUrl = "https://api-ssl.bitly.com/v4/shorten";

    if (!longUrl) {
        alert("Please enter a URL");
        return;
    }

    const headers = {
        "Authorization": `Bearer ${ACCESS_TOKEN}`,
        "Content-Type": "application/json"
    };

    const data = {
        long_url: longUrl 
    };

    try {
        const response = await fetch(apiUrl, {
            method: "POST",
            headers: headers,
            body: JSON.stringify(data)
        });

        if (!response.ok) {
            const errorData = await response.json();
            throw new Error(errorData.message || "Failed to shorten URL");
        }

        const result = await response.json();
        document.getElementById('shortUrl').value = result.link;
    } catch (error) {
        alert("Error: " + error.message);
    }
}


function copyToClipboard(){
    const shortenUrlInput=document.getElementById("shortUrl");

    if(!shortenUrlInput.value){
        alert("No shortened URl to copy");
        return;
    }

    shortenUrlInput.select();
    document.execCommand("copy");
    document.getElementById('messageP').innerText = "Shortened URL copied to Clipboard";
    setTimeout(function() {
        document.getElementById('messageP').innerText = "";
    }, 2000);

}