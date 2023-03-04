let b=[];

/*Show data*/
const showData= (id, name, image,features,published_in,div )=>{
    div.classList.add('col');
let l='';
const items=features.map(p=>{
    l+= '<li class="list-group-item">'+p+'</li>';
    
});
div.innerHTML+=`<div class="card h-50">

<div>
<img src="${image}" class="img-fluid h-75" alt="Ai Image">
 
  <p>Features</p>
  <ol id="list-container" class="list-group list-group-numbered">`
  div.innerHTML+=l;
  div.innerHTML+=`
  </ol>
  <hr style="width:97%;" style="margin:0 auto;">

  
</div>

<div class="d-flex justify-content-between align-items-center p-5">
<div>
<h4>${name}</h4>
<small class="text-muted"><i class="fa-regular fa-calendar-days m-3"></i>${published_in}</small>
</div>
<div>
<a class="text-danger" data-bs-toggle="modal" data-bs-target="#aiModal" onclick="loadAiDetails('${id}')"><i style="font-size:30px;" class="fa-solid fa-circle-arrow-right"></i></a>
</div>
</div>
</div>

`
}

/*  Display Ai details* */
const displayAiDetails = data=>{
    console.log(data);
    const { id,description,features,image_link,integrations,input_output_examples,pricing,accuracy } = data;
    //console.log(pricing);
    
    document.getElementById('modal-container').textContent='';
    document.getElementById('modal-container').innerHTML+=`
        <div class="w-100 bg-danger-subtle border-danger p-4">
            <div>
                <p id="description-id">${description}</p>
            </div>
            <div class="d-flex  justify-content-between g-4 mt-3">
                <div class="card p-2" style"width:70px;">
                    <div>
                      <p">${(pricing===null)||(pricing[0].price==='0') ?'Free of cost':pricing[0].price}   ${pricing===null?'Free of cost':pricing[0].plan}</p>
                      
                    </div>
                </div>
                <div class="card p-2" style"width:43px;">
                    <div>
                    
                    <p">${pricing===null?'Free of cost':pricing[1].price}   ${pricing===null?'Free of cost':pricing[1].plan}</p>
                    </div>
                </div>
                <div class="card p-2" style"width:43px;">
                    <div>
                    <p">${pricing===null ?'Free of cost':pricing[2].price}   ${pricing===null ?'Free of cost':pricing[2].plan}</p>
                    </div>
                </div>
            </div>
            <div class="d-flex justify-content-between mt-3">
                <div>
                    <h3>Features</h3>
                    
                        <p>${features[1]?features[1].feature_name:''}</p>
                        <p>${features[2]?features[2].feature_name:''}</p>
                        <p>${features[3]?features[3].feature_name:''}</p>
                        <p>${features[4]?features[4].feature_name:''}</p>
                    
                </div>
                <div>
                    <h3>Integrations</h3>
                       <p>${integrations===null||(integrations[0]===undefined)?'No data found':integrations[0]}</p>
                        <p>${(integrations===null)||(integrations[1]===undefined)?'':integrations[1]}</p>
                        <p>${(integrations===null)||(integrations[2]===undefined)?'':integrations[2]}</p>
                </div>
            </div>
        </div>
        <div class="w-100 p-4">
            <div>
            <img class="img-fluid rounded-3 position-relative" src="${image_link[0]}" id="image-id" alt="">
            <span class="badge text-bg-danger position-absolute top-0 end-0 mt-5 me-5">${accuracy.score?accuracy.score*100+'% accuracy':''}</span>
            </div>
            <h5 class="text-center">${input_output_examples===null ? 'can you give me any example':input_output_examples[0].input}</h5>
            <p class="text-center">${input_output_examples===null ?'No! Not Yet! Take a break!!!':input_output_examples[0].output}</p>
        </div>
    `
}
/*..................Display Ai Details End.....................*/
let aiData;

/*.................Load Ai Details Data.......................*/
const loadAiDetails = async id =>{
    const URL=`https://openapi.programming-hero.com/api/ai/tool/${id}`
    const res = await fetch(URL);
    const data= await res.json();
    displayAiDetails(data.data);
}

/*......display 6 data.....*/
const loadAiData =async ()=>{
    document.getElementById('loader').classList.remove('d-none');
    const URL ="https://openapi.programming-hero.com/api/ai/tools";
    const res = await fetch(URL);
    const data= await res.json();
    aiData=data.data.tools;
    
    displayData(aiData,6);
}

const displayData = (data,dataLimit)=>{
    b=[];
   
   const cardContainer = document.getElementById('card-container');
   cardContainer.textContent='';
   let sliceData=data;
   if(dataLimit===6){
        
    sliceData = sliceData.slice(0,6);
   // showAll.classList.remove('d-none');
}
//    let sliceData=data.slice(0,6);
   sliceData.forEach(element => {
        const { id, name, image,features,published_in } = element;
/*.......................date format start........................*/
function dateSort(text,idNumber){
  const myArray = text.split("/");
  let newDate=myArray[2]+'-0'+myArray[1]+'-'+myArray[0];
  const a1={};
  a1.id=idNumber;
  a1.date=newDate;
  a1.image=image;
  a1.features=features;
  a1.published_in=published_in;
  a1.name=name;
  b.push(a1);
}

dateSort(published_in,id);

/*.......................date format end........................*/
let div= document.createElement('div');
document.getElementById('loader').classList.add('d-none');
showData(id, name, image,features,published_in ,div);
        cardContainer.appendChild(div);   
    });
}

/*.......................Show All Button........................*/
document.getElementById('show-all').addEventListener('click',function(){
    document.getElementById('btn-section').classList.add('d-none');
    document.getElementById('loader').classList.remove('d-none');
    displayData(aiData,7);
})   

/*.......................Call Load Ai Data........................*/
loadAiData();
console.log(b);

/*..............Sort By Date.................*/
document.getElementById('sort-date-id').addEventListener('click',function(){
    const my = b.map(obj => {
        return {...obj, date: new Date(obj.date)};
      });
     // console.log(my);
     const sortedDesc = my.sort(
    (objA, objB) => Number(objB.date) - Number(objA.date),
      );
    console.log(sortedDesc);
    const cardContainer = document.getElementById('card-container');
   cardContainer.textContent='';
    sortedDesc.forEach(element=>{
        const { id, name, image,features,published_in } = element;
         
   let div= document.createElement('div');
   /*.............Call Show sort data..................*/
   showData(id, name, image,features,published_in,div );
   
        cardContainer.appendChild(div);
    });
   /*...............................*/
})