let transaction=[];

function addTransaction(){
    const description=document.getElementById("description").value;
    const amount=parseFloat(document.getElementById("amount").value);
    const type=document.getElementById("type").value;

    if(description === "" || isNaN(amount)){
        alert('please enter valid amount');
        return;
    }

    const txn={description,amount,type};
    transaction.push(txn);

    updateUI();
    updateChart();
}

function updateUI(){
    const transactionList=document.getElementById('transaction-list');
    const balance=document.getElementById('balance');

    transactionList.innerHTML="";
    let totalBalance=0;
    transaction.forEach((txn,index)=>{
        const li=document.createElement("li");
        li.innerHTML=`${txn.description} - $${txn.amount} <button onclick="removeTransaction(${index})">X</button>`;

        if(txn.type==="income"){
            totalBalance+=txn.amount;
            li.style.color="green";
        }
        else{
            totalBalance-=txn.amount;
            li.style.color="red";
        }

        transactionList.appendChild(li);
    });
}

function removeTransaction(index){
    transaction.splice(index,1);
    updateUI();
    updateChart();
}    

const ctx=document.getElementById("expenseChart") .getContext("2d");
let chart=new Chart(ctx,{
    type:"doughnut",
    data:{
        labels:["Income","Expense"],
        datasets:[{
            label:"Financial Overview",
            data:[0,0],
            backgroundColor:['green','blue']
        }]
    },
});

function updateChart(){
    let income=transaction
    .filter(t=>t.type==='income')
    .reduce((sum,t)=>sum+t.amount,0);

    let expense=transaction
    .filter(t=>t.type === "expense")
    .reduce((sum,t)=>sum+t.amount,0)

    chart.data.datasets[0].data=[income,expense];
    chart.update();
}