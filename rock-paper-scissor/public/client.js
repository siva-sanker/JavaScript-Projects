const socket=new WebSocket('ws://localhost:3000');

socket.onmessage=(event)=>{
    const data=JSON.parse(event.data);

    if(data.type==="WAITING"){
        document.getElementById('status').innerText=data.message;
    }

    if(data.type==='Result'){
        document.getElementById('result').innerText=`Game Result:${data.result}`;
        document.getElementById('status').innerText='play again';
    }
};

document.querySelectorAll('.choice').forEach(button=>{
    button.addEventListener('click',()=>{
        const choice=button.dataset.choice;
        socket.send(JSON.stringify({type:'CHOICE',choice}));
        document.getElementById('status').innerText='Waiting for opponent...';
    });
});

document.querySelectorAll('.choice').forEach(button=>{
    button.addEventListener("click",()=>{
        button.computedStyleMap.transform='scale(1.5)';
        setTimeout(()=>
        button.style.transform='scale(1)',3000);
    });
});