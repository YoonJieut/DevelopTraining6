console.log('hello');

const root = document.getElementById('root');
const blurDiv = document.getElementById('blur');
const blurH1 = document.querySelector('h1');


// 블러 이벤트 -------
function blurEvent(){
  blurDiv.style.zIndex = "5";
  blurH1.textContent = "asdasd";
}
function blurEventEnd(){
  blurDiv.style.zIndex = "-5";
  blurH1.textContent = "";
}


// li 자동 생성기 ------------------------------------------------
const listPart = document.getElementById('listPart');
const listData =[];
const imgData = ["🤷‍♂️","🤷‍♀️","🤦‍♂️","🤦‍♀️","🙌","👍","😁","💕","😘","😒","❤","😊","😂","🤣","🤢","👌","🎁","💖","✔"];
const priceData = [300,3000,400,4000,200,2000,500,5000,600,6000,700,7000,800,8000,900,9000,100,1000,405];

// class 선언
class testObj {
  constructor (id, img, price ){
    this.id = id,
    this.img = img,
    this.price = price
  }
}

listData.push(new testObj(0,imgData[0],priceData[0]));
console.log(listData);
// console.log(imgData);
// console.log(priceData);

const _sellData = [];
// for(let i = 0; i<imgData.length;i++){
//   _sellData[i].push(new testObj(i, imgData[i],priceData[i]));
// }
// ! push관련 오류 발견

// ! foreach로 데이터 배열 생성 !! ---------
imgData.forEach((i)=>{
  _sellData.push(new testObj(i, imgData[i], priceData[i]))
})
// ? foreach는 왜 잘 작동할까? 동작원리 파악할 필요 있음.
// console.log(_sellData);
// console.log(_sellData[0].id);


  // li안에 넣기
const ulTag = document.getElementById('listPart')
// console.log(ulTag);
for(let i=0; i<_sellData.length; i++){
  let liCreate = document.createElement('li')
  listPart.appendChild(liCreate);
  for(let j=0; j<3; j++){
    ulTag.children[i].appendChild(document.createElement('div'));
  }

  // let liTag = document.querySelectorAll('#listPart li');
  // console.log(liTag);

  // for(let k=0; k<3;k++){
  //   let divCreate = document.createElement('div');
  //   liTag[i].appendChild(divCreate);
  // }
}

  // // li 안에 div 생성기
  // function divCreate(){
  //   for(let k = 0; k<3; k++){
  //     let divCreate = document.createElement('div');
  //     liTag[k].appendChild(divCreate);
  //   }
  // }
