const numberWords = {
  1:"One",2:"Two",3:"Three",4:"Four",5:"Five",6:"Six",7:"Seven",8:"Eight",9:"Nine",10:"Ten",
  11:"Eleven",12:"Twelve",13:"Thirteen",14:"Fourteen",15:"Fifteen",16:"Sixteen",17:"Seventeen",
  18:"Eighteen",19:"Nineteen",20:"Twenty",30:"Thirty",40:"Forty",50:"Fifty",60:"Sixty",
  70:"Seventy",80:"Eighty",90:"Ninety",100:"One Hundred"
};

function word(num){
  if(num <= 20) return numberWords[num];
  if(num < 100){
    let t = Math.floor(num/10)*10;
    let o = num%10;
    return o ? numberWords[t] + " " + numberWords[o] : numberWords[t];
  }
  return "One Hundred";
}

let minNum=1,maxNum=10,totalQuestions=10;
let score=0,questionCount=0,currentNumber=0;

const bgColors=["#ff9a9e","#a1c4fd","#fbc2eb","#84fab0","#fccb90","#d4fc79"];

function startGame(min,max,q){
  minNum=min; maxNum=max; totalQuestions=q;
  document.getElementById("startPopup").style.display="none";
  restartGame();
}

function customRange(min,max){
  let q=prompt("How many questions? (10–50)");
  q=parseInt(q);
  if(q<10||q>50||isNaN(q)) return alert("Enter 10–50");
  startGame(min,max,q);
}

function speakNumber(n){
  const msg=new SpeechSynthesisUtterance(word(n));
  msg.lang="en-US";
  speechSynthesis.cancel();
  speechSynthesis.speak(msg);
}

function newQuestion(){
  if(questionCount>=totalQuestions){ showResult(); return; }

  questionCount++;
  document.getElementById("counter").innerText=`${questionCount} / ${totalQuestions}`;
  document.body.style.background=bgColors[Math.floor(Math.random()*bgColors.length)];
  document.getElementById("optionsBox").innerHTML="";

  currentNumber=Math.floor(Math.random()*(maxNum-minNum+1))+minNum;
  document.getElementById("numberBox").innerText=currentNumber;
  speakNumber(currentNumber);

  let correct=word(currentNumber);
  let options=[correct];

  while(options.length<4){
    let r=Math.floor(Math.random()*(maxNum-minNum+1))+minNum;
    let w=word(r);
    if(!options.includes(w)) options.push(w);
  }

  options.sort(()=>Math.random()-0.5);

  options.forEach(o=>{
    let b=document.createElement("button");
    b.className="option-btn";
    b.innerText=o;
    b.onclick=()=>checkAnswer(b,o);
    optionsBox.appendChild(b);
  });
}

function checkAnswer(btn,val){
  document.querySelectorAll(".option-btn").forEach(b=>b.disabled=true);
  if(val===word(currentNumber)){
    btn.classList.add("correct");
    correctSound.play(); mascot.innerText="😄🐻"; score++;
  } else {
    btn.classList.add("wrong");
    wrongSound.play(); mascot.innerText="😢🐻";
  }
  setTimeout(()=>{ mascot.innerText="🐻"; newQuestion(); },900);
}

function showResult(){
  let emoji="😢";
  if(score>=totalQuestions*0.8){ emoji="🎉😄"; winSound.play(); confetti(); }
  else if(score>=totalQuestions*0.5) emoji="😊";
  document.getElementById("emoji").innerText=emoji;
  document.getElementById("scoreText").innerText=`Score: ${score} / ${totalQuestions}`;
  resultPopup.style.display="flex";
}

function confetti(){
  for(let i=0;i<40;i++){
    let c=document.createElement("div");
    c.className="confetti";
    c.style.left=Math.random()*100+"vw";
    c.style.background=bgColors[Math.floor(Math.random()*bgColors.length)];
    document.body.appendChild(c);
    setTimeout(()=>c.remove(),3000);
  }
}

function restartGame(){
  score=0; questionCount=0;
  resultPopup.style.display="none";
  newQuestion();
}

function closeTest(){
  resultPopup.style.display="none";
  startPopup.style.display="flex";
}
