import { createToast } from '../toast/script.js'
import { supabase } from './supa.js'
localStorage.setItem("user1score", 0)

const quiz = document.getElementById("quiz");
// const video = document.getElementById("myVideo");
const score = document.getElementById("score");
const u1 = document.getElementById("u1");
const container = document.getElementById("container");
let c1,c2,c3,c4,cc;

document.body.onkeyup = function(e) {
  if (e.key == "H" ||
      e.key == "h" 
      // e.keyCode == 32      
  ) {
    if(document.getElementById("toast").classList.contains("open")) {
      document.getElementById("toast").classList.remove("open")
    } 
    else  {
      let a  = `
                  
                `
      document.getElementById("toast").classList.add("open")
    }
  }
}

const ques = async () => {
  let uuid = Math.floor(Math.random()*10)+1;
  const { data, error } = await supabase
  .from('ekadikenapurvena')
  .select('*')
  .match({id: uuid})
  quiz.innerHTML = '';
  c1 = Number(data[0]['c1']);
  c2 = Number(data[0]['c2']);
  c3 = Number(data[0]['c3']);
  c4 = Number(data[0]['c4']);
  cc = Number(data[0]['correct']);
  let changeques =` <p class="ques">${data[0]['question']}</p>
                    <form action="" class="answer">
                        <div class="val" id="b1" > ${c1} </div>
                        <div class="val" id="b2" > ${c2} </div>
                        <div class="val" id="b3" > ${c3} </div>
                        <div class="val" id="b4" > ${c4} </div>
                    </form>
                  `
  quiz.innerHTML = changeques;
  checkans();
  if(error) console.log(error);
}

const checkans = () => {
  document.getElementById('b1').addEventListener('click', () => {
    if(cc === c1) updateScore(); 
    else delscore();
  });
  document.getElementById('b2').addEventListener('click', () => {
    if(cc === c2) updateScore();
    else delscore();
  });
  document.getElementById('b3').addEventListener('click', () => {
    if(cc === c3) updateScore();
    else delscore();
  });
  document.getElementById('b4').addEventListener('click', () => {
    if(cc === c4) updateScore();
    else delscore();
    });
} 

const updateScore = () => {
  quiz.style.display = `none`;
  document.getElementById("toast").classList.add("open");
  document.getElementById("correct").classList.add("open");
  let user1score = localStorage.getItem("user1score");
  let topval = 80 - 10*(Number(user1score)+1);
  let sideval = 20 + 10*(Number(user1score)+1);
  let rotate = 0 + 15*(Number(user1score)+1);
  user1score++;
  if(topval==10) winscr(1);
  else {u1.style.top = `${topval}%`; u1.style.left = `${sideval}%`; u1.style.rotate = `${rotate}deg` };
  localStorage.setItem("user1score", user1score);
  score.innerHTML = `Score: ${user1score}`;
  setTimeout(() => {
    
    document.getElementById("toast").classList.remove("open");
    document.getElementById("correct").classList.remove("open");
    quiz.style.display = `block`;
    ques();
  }, 1000);
}

const delscore = () => {
  document.getElementById("toast").classList.add("open");
  document.getElementById("wrong").classList.add("open");
setTimeout(() => {
  document.getElementById("toast").classList.remove("open");
  document.getElementById("wrong").classList.remove("open");
}, 2000);  
}
const upd = async () => {
  let email = localStorage.getItem("email");
  const {data, error} = await supabase
  .from('userscore')
  .select('*')
  .match({email: email});
  let score = data[0]["score"];
  score +=6;
  console.log(data);
  if(error) console.log(error);

  const { error1 } = await supabase
  .from('userscore')
  .update({score: score, progress: 1})
  .eq('email', email)

  if(error1) console.log(error1);
}
const winscr = async () => {
  let asd = `
              <video autoplay muted loop id="myVideo">
                <source src="../assets/bgvid.mp4">
              </video>
              <h1 id="win">Mission Completed!</h1>
            `
  container.innerHTML = '';
  container.innerHTML = asd;
  upd();
}
ques();
