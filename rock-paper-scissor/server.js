const express=require('express');
const http=require('http');
const WebSocket=require('ws');

const app=express();
const server=http.createServer(app);
const wss=new WebSocket.Server({server});

let players={};

wss.on('connection',(ws)=>{
    console.log("New player connected");
    const playerId=Date.now();
    players[playerId]={ws,choice:null};  

    ws.send(JSON.stringify({type:'WAITING',message:'waiting for opponent...'}))
    ws.on('message',(messsage)=>{
        const data= JSON.parse(messsage)
        if(data.type === 'CHOICE'){
            players[playerId].choice=data.choice;
            checkGameResult();
        }
    });

    ws.on('close',()=>{
        delete players[playerId];
        console.log("Player disconnected");
        
    });
});

function checkGameResult(){
    const playerId=Object.keys(players);
    if(playerId.length === 2){
        const [p1,p2]=playerId;
        const choice1=players[p1].choice;
        const choice2=players[p2].choice;

        if(choice1 && choice2){
            let result;
            if(choice1 ===choice2) result='DRAW';
            else if((choice1==='rock' && choice2 ==='scissor') ||
                    (choice1==='paper' && choice2 === 'rock') ||
                    (choice1==='rock' && choice2==='paper')){
                        result='PLAYER 1 WINS';
                    }
                    else{
                        result='PLAYER 2 WINS';
                    }
                    players[p1].ws.send(JSON.stringify({ type:'Result',result }));
                    players[p2].ws.send(JSON.stringify({ type:'Result',result }));
        }
    }
}

app.use(express.static('public'));
server.listen(3000,()=> console.log('server running on http://localhost:3000'));