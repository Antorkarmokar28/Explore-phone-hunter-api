const loadPhone = async (searchPhone) => {
    const res = await fetch(`https://openapi.programming-hero.com/api/phones?search=${searchPhone}`);
    const data = await res.json();
    const phones = data.data;
    displayFunction(phones);
}
const displayFunction = (phones) => {
    const phoneCardContainer = document.getElementById('phone-card-container');
    // clear the phoneCardContainer value
    phoneCardContainer.textContent = '';
    // phoneCardContainer.innerHTML = '';
    phones.forEach( phone =>{
        const phoneCard = document.createElement('div');
        phoneCard.classList =`card bg-white shadow-xl`;
        phoneCard.innerHTML =`
        <figure class="card-img-bg"><img src="${phone.image}" /></figure>
        <div class="card-body text-center">
            <h2 class="phone-card-title text-center mb-4 text-xl md:text-2xl font-bold">${phone.phone_name}</h2>
            <p class="phone-description text-lg leading-8 font-normal">There are many variations of passages of available, but the majority have suffered</p>
            <p class="phone-price text-2xl font-bold mb-5">$999</p>
            <div class="card-actions justify-center">
            <button class="btn btn-primary text-white text-xl font-semibold">Show Details</button>
            </div>
        </div>
        `;
        phoneCardContainer.appendChild(phoneCard);
    })
}
const clickSearchBtn = searchPhone =>{
    const searchText = document.getElementById('search-phone');
    const searchValue = searchText.value;
    loadPhone(searchValue);
    searchText.value = '';
}
// loadPhone();