const root = document.getElementById('root');
const blurDiv = document.getElementById('blur');
const blurH1 = document.querySelector('h1');
const listPart = document.getElementById('listPart');



// !! 원본 데이터 수정파트 --------------
//* 여기서 수정하면  리스트가 생성됨
const imgData = ["🤷‍♂️","🤷‍♀️","🤦‍♂️","🤦‍♀️","🙌","👍","😁","💕","😘","😒","❤","😊","😂","🤣","🤢","👌","🎁","💖","✔","✌"];
const priceData = [300,3000,400,4000,200,2000,500,5000,600,6000,700,7000,800,8000,900,9000,100,1000,405,40000];

// !li 자동 생성기 ------------------------------------------------
// * class 선언---------------------------
class testObj {
  constructor (id, img, price ){
    this.id = id;
    this.img = img;
    this.price = price;
  }
}

// listData.push(new testObj(0,imgData[0],priceData[0]));
// console.log(listData);
// console.log(imgData);
// console.log(priceData);

// * 원본데이터를 토대로 객체 자동 생성하기 ---------------
const _sellData = [];

for(let i = 0; i<imgData.length;i++){
  _sellData.push(new testObj(i+1, imgData[i],priceData[i]));
}
// ! push관련 오류 발견
// * 해결! : 배열.push => 작성법 오류

// ! foreach로 데이터 배열 생성 !! ---------
// imgData.forEach((i)=>{
//   _sellData.push(new testObj(i, imgData[i], priceData[i]))
// })
// ? foreach는 어떻게 동작원리 파악할 필요 있음.
// console.log(_sellData);
// console.log(_sellData[0].id);


//* li안에 넣기
const ulTag = document.getElementById('listPart')
for(let i=0; i<_sellData.length; i++){
  let liCreate = document.createElement('li')
  listPart.appendChild(liCreate);
  for(let j=0; j<3; j++){
    ulTag.children[i].appendChild(document.createElement('div'));
  }
}
  // ? queryselector가 잘 안됐다. 흠..
// console.log(_sellData);
// console.log(_sellData[0]);
// console.log(_sellData[0].id);


//* _sellData 배열의 정보를 li안의 div에 넣기-----------------
//  * 1번 div는 img
//  * 2번 div는 price
//  * 3번 div는 id
// console.dir(ulTag.children[0])
// console.log(ulTag.children[0].children[0])
// console.log(ulTag.children[0].children[1])
// console.log(ulTag.children[0].children[2])
// ulTag.children[0].children[0].innerText = _sellData[0].img
// ulTag.children[0].children[1].innerText = _sellData[0].price
// ulTag.children[0].children[2].textContent = _sellData[0]
for(let i =0; i<_sellData.length; i++){
    ulTag.children[i].children[0].innerText = _sellData[i].img
    ulTag.children[i].children[1].innerText = _sellData[i].price
    ulTag.children[i].children[2].innerText = _sellData[i].id
}
// ? 여기서 더 개선할 수 있을까???

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

  // 타겟의 부모 스타일 조건문
  function pTargetBgColor(event){
    if(event.target.parentElement.style.backgroundColor === ""){
      event.target.parentElement.style.backgroundColor = "gray";
    }else {
      event.target.parentElement.style.backgroundColor = "";
    }
  }
  // 타겟의 스타일 조건문
  function targetBgColor(event){
    if(event.target.style.backgroundColor === ""){
      event.target.style.backgroundColor = "gray";
    }else {
      event.target.style.backgroundColor = "";
    }
  }


// !--------버튼 로직-------------------------

const submitBtn = document.getElementsByClassName('submitBtn');
const userInput = document.getElementById('userInput');
// console.log(submitBtn, userInput);

//? currentTarget 과 target의 차이는?
//* currentTarget = 이벤트리스터가 달린 요소
//* target = 실제 이벤트 발생 요소



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
  // for(let j=0; j<nowImg.length; j++){
  //   if(j === nowImg.length-1){
  //     newImg += `${nowLi[j]}`
  //   }
  //   else{
  //     newImg += `${nowLi[j]}, `
  //   }
  // }
  newImg = nowLi.join();
  console.log(nowLi);
  console.log(newImg);
  return newImg;
}
// !newImg 문자열 return에서 오류를 보여 보이지 않는 현상(해결)
// * 로직을 긁어올 때 parseInt() 메소드를 빼지 않았음.


//* 선택됐을 때 price(div[1])의 텍스트가 흰색으로 변함

function textChange(){
  for(let i=0; i<listPart.length; i++){
    if(listPart.children[i].style.backgroundColor === "gray"){
      listPart.children[i].children[1].style.color = "white"
    } else {
      listPart.children[i].children[1].style.color = "black"
    }
  }
}



//! 잔돈 비교 로직 ----------------------  

//??? input 조건 생성 : 만약 값이 없다면 작동하지 않도록
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
      // * input + enter작동하게 하기, 중복 이벤트 등록 
      // ? 이벤트 핸들러를 한번만 불러오기위한 조건 : 인수를 똑 같이 만들어준다. 이때,  익명함수는 피하는 것이 좋으며 기명함수로 작성해보았다.
      userInput.addEventListener('change',function(){
        submitBtnFunc();
      });
      userInput.addEventListener('keyup',function enter(e){
        if(e.key === "Enter"){
          submitBtnFunc();
          userInput.removeEventListener('keyup', enter);
        }
      });
    }
  } else {
    alert("값을 입력해주세요")
  }
})


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


// * 블러 이벤트 -------
function blurEvent(text){
  blurDiv.style.zIndex = "5";
  blurH1.textContent = `${text}`;
}
// * blurDiv를 누르면 blurEvent 끝내기
// ! enter 키 이벤트 등록하기 :
//! keyup과 매개변수를 이용한다.
const body = window.document.body;

function blurEventEnd(){
  blurDiv.addEventListener('click',function(){
    blurDiv.style.zIndex = " -5";
    blurH1.textContent = "";
  });
  // ! body에 enter event를 넣었으나 1초만에 바로 사라지는 모습이 관측됨.
  // * setTimeout 0.8초 지연과 해당 이벤트를 한번만 작동하게 하는 것으로 해당 문제를 해결
  body.addEventListener('keypress', function(e){
    if(e.key === "Enter" && blurDiv.style.zIndex === "5"){
      setTimeout(()=>{
      blurDiv.style.zIndex = " -5";
        blurH1.textContent = "";
      }, 500);
    }
  });
}

//??? 해야할 것 : 잔돈 버튼 생성
// function changeBtnEvent(e){
//   let userValue1 = parseInt(userInput.value);
//   blurEvent(`${userValue1 - pushCPrice()}원 잔돈입니다.`);
//   userInput.value = "";
//   blurEventEnd();
// };

// ! 잔돈 이벤트 작성
// *1. blur event, text수정, 잔돈 버튼 추가
// * 2 버튼 누를 시, 잔돈 표시와btn 삭제, blur이벤트 종료 대기


function changeEvent(){
  // *1. blur event, text수정, 잔돈 버튼 추가
  blurEvent();

  
  blurDiv.children[0].textContent = `${nowImg()}을(를) 얻었습니다.`

  let changeBtn = document.createElement('div');
  changeBtn.classList.add('btn');
  changeBtn.textContent = "반환 버튼";
  blurDiv.appendChild(changeBtn);
  setTimeout(()=>{changeBtnEvent()}, 1000);
}
function changeBtnEvent(){
  let Btn = blurDiv.children[1];
  console.log(Btn);
  let userInput1 = parseInt(userInput.value);

  body.addEventListener('keyup',function keyUpEnter(e){
    if(e.key === "Enter"){
      blurDiv.children[0].textContent = `잔돈 : ${userInput1 - pushCPrice()} 원`;

      blurDiv.removeChild(blurDiv.lastChild);
      body.removeEventListener('keyup', keyUpEnter);
      blurEventEnd();
    }
    Btn.addEventListener('click',function(){
      blurDiv.children[0].textContent = `잔돈 : ${userInput1 - pushCPrice()} 원`;
      blurDiv.removeChild(blurDiv.lastChild);
    });
  });
  
}