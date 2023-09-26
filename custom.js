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

// 여기서 수정하면  리스트가 생성됨
const listPart = document.getElementById('listPart');
const imgData = ["🤷‍♂️","🤷‍♀️","🤦‍♂️","🤦‍♀️","🙌","👍","😁","💕","😘","😒","❤","😊","😂","🤣","🤢","👌","🎁","💖","✔","✌"];
const priceData = [300,3000,400,4000,200,2000,500,5000,600,6000,700,7000,800,8000,900,9000,100,1000,405,40000];



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


  // li안에 넣기
const ulTag = document.getElementById('listPart')
// console.log(ulTag);
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
ulTag.children[0].children[0].innerText = _sellData[0].img
ulTag.children[0].children[1].innerText = _sellData[0].price
ulTag.children[0].children[2].textContent = _sellData[0].id


for(let i =0; i<_sellData.length; i++){
    ulTag.children[i].children[0].innerText = _sellData[i].img
    ulTag.children[i].children[1].innerText = _sellData[i].price
    ulTag.children[i].children[2].innerText = _sellData[i].id
}
// ? 여기서 더 개선할 수 있을까???




