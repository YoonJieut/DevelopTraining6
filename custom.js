const root = document.getElementById('root');
const blurDiv = document.getElementById('blur');
const blurH1 = document.querySelector('h1');
const listPart = document.getElementById('listPart');
const darkBtn = document.getElementById('darkMode');
const submitBtn = document.getElementsByClassName('submitBtn');
const userInput = document.getElementById('userInput');
const body = window.document.body;


// !! 원본 데이터 수정파트 --------------
//* 여기서 수정하면  리스트가 생성됨
const imgData = ["🤷‍♂️","🤷‍♀️","🤦‍♂️","🤦‍♀️","🙌","👍","😁","💕","😘","😒","❤","😊","😂","🤣","🤢","👌","🎁","💖","✔","✌"];
const priceData = [300,3000,400,4000,200,2000,500,5000,600,6000,700,7000,800,8000,900,9000,100,1000,405,40000];

// !li 자동 생성기 -----------------------------------
// * class 선언---------------------------
class testObj {
  constructor (id, img, price ){
    this.id = id;
    this.img = img;
    this.price = price;
  }
}

// * 원본데이터를 토대로 객체 자동 생성하기 ---------------
const _sellData = [];

for(let i = 0; i<imgData.length;i++){
  _sellData.push(new testObj(i+1, imgData[i],priceData[i]));
}

//* li안에 넣기
const ulTag = document.getElementById('listPart')
for(let i=0; i<_sellData.length; i++){
  let liCreate = document.createElement('li')
  listPart.appendChild(liCreate);
  for(let j=0; j<3; j++){
    ulTag.children[i].appendChild(document.createElement('div'));
  }
}

//* _sellData 배열의 정보를 li안의 div에 넣기-----------------
//  * 1번 div는 img
//  * 2번 div는 price
//  * 3번 div는 id
for(let i =0; i<_sellData.length; i++){
    ulTag.children[i].children[0].innerText = _sellData[i].img
    ulTag.children[i].children[1].innerText = _sellData[i].price
    ulTag.children[i].children[2].innerText = _sellData[i].id
}
// * 개선 가능성? : object.keys로 접근 하려면, key의 순서와 div의 순서도 고려해야 한다.


//!!--------- li클릭 시 배경 변경 -----------------
ulTag.addEventListener('click',function(event){
  console.dir(event)
  if(event.target.nodeName === "LI"){
    targetBgColor(event); 
  }
  if(event.target.nodeName === "DIV"){
    pTargetBgColor(event); 
  }
  else {
    console.error('올바른 아이템을 선택해주세요');
  }
});

  //* 타겟의 부모 스타일 조건문
  function pTargetBgColor(event){
    if(event.target.parentElement.style.backgroundColor === ""){
      event.target.parentElement.style.backgroundColor = "gray";
    }else {
      event.target.parentElement.style.backgroundColor = "";
    }
  }
  //* 타겟의 스타일 조건문
  function targetBgColor(event){
    if(event.target.style.backgroundColor === ""){
      event.target.style.backgroundColor = "gray";
    }else {
      event.target.style.backgroundColor = "";
    }
  }



// !--------버튼 로직-------------------------

// * 배경색이 "gray"라면 string으로 currentPrice에 값을 넣고 각 값음 함침
// * return값은 number
function pushCPrice(){
  let currentPrice = [];
  let result = 0;
  
  // * 다중 선택된 것의 price를 가져오기
  for(let i=0; i<listPart.children.length; i++){
    if(listPart.children[i].style.backgroundColor === "gray"){
      currentPrice.push(parseInt(listPart.children[i].children[1].textContent));
    }
  }
  
  // *currentPrice에 값들을 합치기
  for(let i=0; i<currentPrice.length; i++){
    result += currentPrice[i];
  };
  return result;
}


//* 선택된 것의 img.value를 가져옵니다.
// ! return은 문자열 타입입니다.
function nowImg(){
  let nowLi = [];
  let newImg = "";

  for(let i=0; i<listPart.children.length; i++){
    if(listPart.children[i].style.backgroundColor === "gray"){
      nowLi.push(listPart.children[i].children[0].textContent);
    }
  }
  newImg = nowLi.join();
  console.log(nowLi);
  console.log(newImg);
  return newImg;
}


//! 잔돈 비교 로직 ----------------------  
//* 버튼 누르기 전 input 조건 생성 : 만약 값이 없다면 작동하지 않도록
userInput.addEventListener('change', function(){
  // 입력이 있을 때 이벤트가 발생
  if(userInput.value.length > 0) {
    if(isNaN(userInput.value)===true){
      // 숫자로 변환 가능한지 여부 확인
      userInput.placeholder = "숫자만 입력해주세요";
      return;
    } else {
      userInput.placeholder = "값을 입력하셨습니다.";
      // * submitBtn을 누르면 이벤트 발생
      submitBtn[0].addEventListener('click',function(){
        submitBtnFunc();
      });
      userInput.addEventListener('change',function(){
        submitBtnFunc();
      });
    }
  } else {
    alert("값을 입력해주세요")
  }
})

// * 버튼 눌렀을 때 실행 로직
function submitBtnFunc(e){
  let userValue = parseInt(userInput.value);
  if(userValue >= pushCPrice()){
    if(userValue === pushCPrice()){
      blurEvent("잔돈이 없습니다.");
      blurEventEnd();
    }else{
      // 잔돈 로직 시작
      changeEvent();
    }
  } else {
    blurEvent("돈이 부족합니다.");
    blurEventEnd();
  }
};


// ! 자주 쓰일 블러 이벤트 함수화 -------
function blurEvent(text){
  blurDiv.style.zIndex = "5";
  blurH1.textContent = `${text}`;
}
// * blurDiv를 누르면 blurEvent 끝내기
// *블러 끌 땐 엔터도 가능하게 구성
function blurEventEnd(){
  blurDiv.addEventListener('click',function(){
    blurDiv.style.zIndex = " -5";
    blurH1.textContent = "";
  });
  body.addEventListener('keyup',function blurBehind(){
    blurDiv.style.zIndex = " -5";
    blurH1.textContent = "";
    body.removeEventListener('keyup',blurBehind);
  })
}

// ! 잔돈 이벤트 작성
// * 1. blur event, text수정, 잔돈 버튼 추가
// * 2 버튼 누를 시, 잔돈 표시와btn 삭제, blur이벤트 종료 대기
function changeEvent(){
  let changeBtn = document.createElement('div');

  // *1. blur event, text수정, 잔돈 버튼 추가
  blurEvent();
  blurDiv.children[0].textContent = `${nowImg()}을(를) 얻었습니다.`
  changeBtn.classList.add('btn');
  changeBtn.textContent = "반환 버튼";
  blurDiv.appendChild(changeBtn);
  setTimeout(()=>{changeBtnEvent()}, 500);
}

// * 2. 버튼 누를 시, 함수
function changeBtnEvent(){
  let Btn = blurDiv.children[1];
  console.log(Btn);
  let userInput1 = parseInt(userInput.value);

  Btn.addEventListener('click',function(){
    blurDiv.children[0].textContent = `잔돈 : ${userInput1 - pushCPrice()} 원`;
    blurDiv.removeChild(blurDiv.lastChild);
    setTimeout(()=>{blurEventEnd()}, 700);
  });

}

// ! 다크모드 추가
// class를 조정하는 방식으로 진행
// .darkmode가 없으면 추가, btn에게도 다크모드 추가
darkBtn.addEventListener('click',function(){
  console.dir(body);
  if( body.className === ""){
    body.classList.add("darkMode");
    for(let i=0; i<listPart.children.length; i++){
      for(let j=0; j<3;j++){
        listPart.children[i].children[j].classList.add("darkModeText");
      }
    }
  }else {
    body.classList.remove("darkMode");
    for(let i=0; i<listPart.children.length; i++){
      for(let j=0; j<3;j++){
        listPart.children[i].children[j].classList.remove("darkModeText");
      }
    }
  }
});