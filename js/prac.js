
let b=[];
function dateSort(text,idNumber){
  const myArray = text.split("/");
  let newDate=myArray[2]+'-0'+myArray[1]+'-'+myArray[0];
  const a1={};
  a1.id=idNumber;
  a1.date=newDate;
  b.push(a1);
}
let t = "11/1/2022";
let idNum=1;
dateSort(t,idNum);
t="13/4/2027"
idNum=2;
dateSort(t,idNum);
t="13/4/2025"
idNum=3;
dateSort(t,idNum);
console.log(b);

const my = b.map(obj => {
    return {...obj, date: new Date(obj.date)};
  });
  console.log(my);
 const sortedDesc = my.sort(
(objA, objB) => Number(objB.date) - Number(objA.date),
  );
console.log(sortedDesc);

  
  
  
