console.log('hello');

const root = document.getElementById('root');
const blurDiv = document.getElementById('blur');


// 블러 이벤트 -------
function blurEvent(){
  blurDiv.style.width = "100vw";
  blurDiv.style.height = "100vh";
  blurDiv.style.zIndex = "5";
}
blurEvent();

const blurH1 = document.querySelector('h1');
console.log(blurH1);
blurH1.textContent = "asdasd";
