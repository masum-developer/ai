const displayAiDetails = data=>{
    const { id,description,features,image_link,integrations,input_output_examples,pricing,accuracy } = data;
    //console.log(data);
    // document.getElementById('description-id').innerText=data.data.description;
    document.getElementById('modal-container').innerHTML=`
        <div class="w-100 bg-danger-subtle border-danger p-4">
            <div>
                <p id="description-id">${description}</p>
            </div>
            <div class="d-flex justify-content-between g-4 mt-3">
                <div class="card p-2">
                    <div>
                      <p">${pricing[0].price+' '+ pricing[0].plan}</p>
                    </div>
                </div>
                <div class="card p-2">
                    <div>
                    <p">${pricing[1].price+' '+ pricing[1].plan}</p>
                    </div>
                </div>
                <div class="card p-2">
                    <div>
                    <p">${pricing[2].price+' '+ pricing[2].plan}</p>
                    </div>
                </div>
            </div>
            <div class="d-flex justify-content-between mt-3">
                <div>
                    <h3>Features</h3>
                    <ul>
                        <li>${features[1].feature_name}</li>
                        <li>${features[2].feature_name}</li>
                        <li>${features[3].feature_name}</li>
                    </ul>
                </div>
                <div>
                    <h3>Integrations</h3>
                    <ul>
                        <li>${integrations[0]}</li>
                        <li>${integrations[1]}</li>
                        <li>${integrations[2]}</li>
                    </ul>
                </div>
            </div>
        </div>
        <div class="w-100 p-4">
            <div>
            <img class="img-fluid rounded-3 position-relative" src="${image_link[0]}" id="image-id" alt="">
            <span class="badge text-bg-danger position-absolute top-0 end-0 mt-5 me-5">${accuracy.score?accuracy.score*100+'% accuracy':''}</span>
            </div>
            <h5 class="text-center">${input_output_examples[0].input}</h5>
            <p class="text-center">${input_output_examples[0].output?input_output_examples[0].output:''}</p>
        </div>
    `
}
let aiData;

/*........................................*/
const loadAiDetails = async id =>{
    const URL=`https://openapi.programming-hero.com/api/ai/tool/${id}`
    const res = await fetch(URL);
    const data= await res.json();
    displayAiDetails(data.data);
}



/*......display 6 data.....*/
const loadAiData =async ()=>{
    const URL ="https://openapi.programming-hero.com/api/ai/tools";
    const res = await fetch(URL);
    const data= await res.json();
    aiData=data.data.tools;
  //  console.log(aiData);
    document.getElementById('loader').classList.remove('d-none');
    displayData(aiData,6);
}


const displayData = (data,dataLimit)=>{
   const cardContainer = document.getElementById('card-conatiner');
   cardContainer.textContent='';
   let sliceData=data;
   if(dataLimit===6){
        
    sliceData = sliceData.slice(0,6);
   // showAll.classList.remove('d-none');
}
//    let sliceData=data.slice(0,6);
   sliceData.forEach(element => {
        const { id, name, description, image,features,published_in } = element;
       //  console.log(published_in);
         console.log(features)

        let div= document.createElement('div');
        div.classList.add('col');
        let l='';
        const items=features.map(p=>{
           console.log(p);
            l+= '<li>'+p+'</li>';
           console.log(l);
          console.log('masum');
    
        }
            
            
            );
            
        
        div.innerHTML+=`<div class="card">
        <img src="${image}" class="card-img-top img-fluid h-100  rounded-start" alt="...">
        <div class="card-body">
          <h5 class="card-title">Features</h5>
          <ol id="list-container">`

          div.innerHTML+=l;
            

          div.innerHTML+=`
          </ol>
        </div>
        <hr class="w-100 text-center">
        <div class="d-flex justify-content-between">
        <div>
        <h2 class="m-3">${name}</h2>
        <small class="text-muted"><i class="fa-regular fa-calendar-days m-3"></i>${published_in}</small>
        </div>
        <div>
        <a class="text-danger me-4 mt-5" data-bs-toggle="modal" data-bs-target="#aiModal" onclick="loadAiDetails('${id}')"><i class="fa-solid fa-circle-arrow-right"></i></a>
        </div>
        </div>
        
        
        </div>
      </div>
        `
        cardContainer.appendChild(div);
        
    });
 document.getElementById('loader').classList.add('d-none');
     
}
document.getElementById('show-all').addEventListener('click',function(){
    document.getElementById('btn-section').classList.add('d-none');
    document.getElementById('loader').classList.remove('d-none');
    displayData(aiData,7);
})   
loadAiData();