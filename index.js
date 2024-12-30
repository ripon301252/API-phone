
const loadAllPhones = async(status, searchText) => { // 2nd
    
    document.getElementById('spinner').style.display = 'none';

    const res = await fetch(`https://openapi.programming-hero.com/api/phones?search=${searchText ? searchText: 'iphone'}`);
    const data = await res.json();
    // displayAllPhone(data.data.slice(0,6))

   
    if(status === true){
        displayAllPhone(data.data)
    }
    else{
        displayAllPhone(data.data.slice(0,6))
    }
    
    // fetch('https://openapi.programming-hero.com/api/phones?search=iphone')
    //     .then(res => res.json())
    //     .then (data => displayAllPhone(data.data.slice(0,6)))
    //     .catch(err => console.log(err))
}

const displayAllPhone = (phones) => { // 4th
    // if(status === true){
    //     displayAllPhone(data.data)
    // }
    // else{
    //     displayAllPhone(data.data.slice(0,6))
    // }

    // document.getElementById('phones-container').innerHTML = '';

    const phonesContainer = document.getElementById('phones-container');
    phones.forEach(phone => {
        const {slug, image, brand, phone_name} = phone
        const div = document.createElement('div');
        div.innerHTML = `
        <div class="card bg-base-100 w-96 shadow-xl mb-5 mt-5">
        <figure class="px-10 pt-10">
            <img
            src="${image}"
            class="rounded-xl" />
        </figure>
        <div class="card-body items-center text-center">
            <h2 class="card-title">${brand}</h2>
            <p>${slug}</p>
            <p>${phone_name}</p>
            <div class="card-actions">
            <button onclick = "phoneDetails('${slug}')" class="btn btn-primary">Show Details</button>
            </div>
        </div>
        </div>
        `
        phonesContainer.append(div);
    });
}

const handleShowAll = () => { // 3rd
    loadAllPhones(true)
}

const handleSearch = () =>{  // 1st
    document.getElementById('spinner').style.display = 'block';
    const searchText = document.getElementById('search-box').value

    setTimeout(function (){
        loadAllPhones(false, searchText)
    }, 2000)
}



// modal
const phoneDetails = async(slugs) => {
    const res = await fetch(` https://openapi.programming-hero.com/api/phone/${slugs}`);
    const data = await res.json();
    console.log(data.data);

    const {slug, image, brand, name} = data.data

    const modalContainer = document.getElementById('modal-container');
    modalContainer.innerHTML=`
     <dialog id="my_modal_1" class="modal">
        <div class="modal-box">
        <figure class="px-10 pt-10">
            <img
            src="${image}"
            class="rounded-xl mx-auto" />
        </figure>
            <h3 class="text-lg font-bold text-center mt-5">${brand}</h3>
            <h3 class="text-lg font-bold text-center my-5">${slug}</h3>
            <h3 class="text-lg font-bold text-center">${name}</h3>
        <div class="modal-action flex justify-center">
            <form method="dialog">
                <!-- if there is a button in form, it will close the modal -->
                <button class="btn">Close</button>
            </form>
        </div>
    </dialog>
    `

    my_modal_1.showModal()
}







loadAllPhones(false, 'iphone')




// const phone = {
//     brand : "Apple ",
//     image : "https://fdn2.gsmarena.com/vv/bigpic/apple-iphone-13-mini.jpg",
//     phone_name : "iPhone 13 mini",
//     slug : "apple_iphone_13_mini-11104"
// }

// const {slug, image, brand, phone_name} = phone
// console.log(slug);
// console.log(image);
// console.log(brand);
// console.log(phone_name);