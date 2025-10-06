const getPositionOfCard=(card,element)=>{
    return card.indexOf(element);
}

const doesStackIncludeCard=(stack,card)=>{
    return stack.includes(card);
}

const ifEachCardIsEven=(stack)=>{
    return stack.every(card=>card%2===0);
}

const doesStackIncludeOddCard=(stack)=>{
    return stack.some(card=>card%2!==0);
}

const getFirstOddCard=(stack)=>{
    return stack.find(card=>card%2!==0);
}

const getFirstEvenCardPosition=(stack)=>{
    stack.forEach((stacks) => console.log(stacks));
}

// console.log(getPositionOfCard(['A','K','Q','J'],'Q')); //2
// console.log(doesStackIncludeCard(['A','K','Q','J'],'A')?'it does':'it doesnt'); //false
// console.log(ifEachCardIsEven([1,2,4,6,8])?'all are even':'not all are even'); //true
// console.log(doesStackIncludeOddCard([1,4,6,8])?'it does':'it doesnt'); //false
// console.log(getFirstOddCard([2,4,3,6,7,8])); //7
// console.log(getFirstEvenCardPosition([1,3,5,6,7])); //3

// const funnyQuote =
//   'If you see someone crying, ask if it is because of their haircut.';
// const regex1 = /someone/;
// const regex2 = /happy/;
// const regex3 = /if/gi;

// console.log(funnyQuote.match(regex3));

let text = 'Say hello to the chatbot.';
let result = text.replace(/chatbot|hello/gi, function (word) {
  console.log(word.toUpperCase());
});
console.log(result);