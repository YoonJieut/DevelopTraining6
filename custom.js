console.log('hello');

const root = document.getElementById('root');
const blurDiv = document.getElementById('blur');
const blurH1 = document.querySelector('h1');



// !! 원본 데이터 수정파트 --------------
//* 여기서 수정하면  리스트가 생성됨
const listPart = document.getElementById('listPart');
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
//? currentTarget = 이벤트리스터가 달린 요소
//? target = 실제 이벤트 발생 요소



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







//! 잔돈 비교 로직 ----------------------  
 
function submitBtnFunc(){
  let userValue = parseInt(userInput.value);
  if(userValue >= pushCPrice()){
    if(userValue === pushCPrice()){
      blurEvent("잔돈이 없습니다.");
      blurEventEnd();
    }else{
      // 잔돈 로직 시작
      blurEvent(`${userValue - pushCPrice()} 원 잔돈이 있음`);
      blurEventEnd();
    }
  } else {
    blurEvent("돈이 부족합니다.");
    blurEventEnd();
  }
};


// * submitBtn을 누르면 이벤트 발생
submitBtn[0].addEventListener('click',function(){
  submitBtnFunc();
});
// * input + enter 해도, 작동하게 하기
userInput.addEventListener('change',function(){
  submitBtnFunc();
});



// * 블러 이벤트 -------
function blurEvent(text){
  blurDiv.style.zIndex = "5";
  blurH1.textContent = `${text}`;
}
// * blurDiv를 누르면 blurEvent 끝내기
function blurEventEnd(){
  blurDiv.addEventListener('click',function(){
    blurDiv.style.zIndex = " -5";
    blurH1.textContent = "";
  });
}


//??? 해야할 것 : 잔돈 버튼 생성
//??? input 조건 생성 : 만약 값이 없다면 작동하지 않도록

