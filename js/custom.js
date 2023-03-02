function masum(id){
    console.log(id);
}
const URL ="https://openapi.programming-hero.com/api/ai/tools";
fetch(URL)
.then(res=>res.json())
.then(data=>displayData(data.data.tools));

const displayData = data=>{
   const cardContainer = document.getElementById('card-conatiner');
    data.slice(0,6).forEach(element => {
        const { id, name, description, image,features,published_in } = element;
        console.log(element);
        const div= document.createElement('div');
        div.classList.add('col');
        div.innerHTML=`<div class="card h-100">
        <img src="${image}" class="card-img-top img-fluid h-100 rounded-start" alt="...">
        <div class="card-body">
          <h5 class="card-title">Features</h5>
          <ol id="list-container">
            
          </ol>
        </div>
        <hr class="w-100 text-center">
        <div class="d-flex justify-content-between">
        <div>
        <h2 class="m-3">${name}</h2>
        <small class="text-muted"><i class="fa-regular fa-calendar-days m-3"></i>${published_in}</small>
        </div>
        <div>
        <button class="btn btn-danger me-4 mt-4" onclick="masum('${id}')"><i class="fa-solid fa-circle-arrow-right w-50"></i></button>
        </div>
        </div>
        
        
        </div>
      </div>
        `
        cardContainer.appendChild(div);
        let listContainer=document.getElementById('list-container');
        features.forEach(feature=>{
            // const li= document.createElement('li');
            // li.innerHTML=`${feature?feature:'mm'}`;
            // listContainer.appendChild(li);
            console.log(feature)
            listContainer+=`<li>${feature}</li>`;
        })
        
    });
    
    // console.log(data[0]);
    //     data.features.forEach(feature=>{
    //         console.log(feature);
    //         
    //         li.innerHTML='nn';
    //         listContainer.appendChild(li);
    //     })
        
        
}