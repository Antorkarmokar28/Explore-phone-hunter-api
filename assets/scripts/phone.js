// get data from backend
const loadPhone = async (searchPhone, isShowData) => {
    const res = await fetch(`https://openapi.programming-hero.com/api/phones?search=${searchPhone}`);
    const data = await res.json();
    const phones = data.data;
    displayFunction(phones, isShowData);
}
// display content dynamicaly in ui
const displayFunction = (phones, isShowData) => {
    const phoneCardContainer = document.getElementById('phone-card-container');
    // get the show all button inner
    const showButtonInner = document.getElementById('show-all-btn-inner');
    // display show all button if there are more than 9 phones
    if (phones.length > 12 && !isShowData) {
        showButtonInner.classList.remove('hidden');
    } else {
        showButtonInner.classList.add('hidden');
    }
    // get search phone name and give the 12 phone if isShowData button not clicked
    if (!isShowData) {
        phones = phones.slice(0, 12);
    };
    // clear the phoneCardContainer value
    phoneCardContainer.textContent = '';
    // phoneCardContainer.innerHTML = '';
    phones.forEach(phone => {
        const phoneCard = document.createElement('div');
        phoneCard.classList = `card bg-white shadow-xl`;
        phoneCard.innerHTML = `
        <figure class="card-img-bg"><img src="${phone.image}" /></figure>
        <div class="card-body text-center">
            <h2 class="phone-card-title text-center mb-4 text-xl md:text-2xl font-bold">${phone.phone_name}</h2>
            <p class="phone-description text-lg leading-8 font-normal">There are many variations of passages of available, but the majority have suffered</p>
            <p class="phone-price text-2xl font-bold mb-5">$999</p>
            <div class="card-actions justify-center">
            <button onclick="showPhoneDetailsModal('${phone.slug}')" class="btn btn-primary text-white text-xl font-semibold">Show Details</button>
            </div>
        </div>
        `;
        phoneCardContainer.appendChild(phoneCard);
    });
    toggoleLoadingSpinner(false);
}
// click search button
const clickSearchBtn = (isShowData) => {
    toggoleLoadingSpinner(true);
    const searchText = document.getElementById('search-phone');
    const searchValue = searchText.value;
    loadPhone(searchValue, isShowData);
}
// loadingSpiner functionality
const toggoleLoadingSpinner = (loadingSpinner) => {
    const loadingSpinnerElement = document.getElementById('spiner-inner');
    if (loadingSpinner) {
        loadingSpinnerElement.classList.remove('hidden');
    } else {
        loadingSpinnerElement.classList.add('hidden');
    }
}
// when show all button click user than do all data show
const showAllData = () => {
    clickSearchBtn(true);
}
// click show details button and show phone details modal
const showPhoneDetailsModal = async (phoneId) => {
    const res = await fetch(`https://openapi.programming-hero.com/api/phone/${phoneId}`);
    const data = await res.json();
    const getPhoneDetails = data.data;
    showPhoneDetails(getPhoneDetails);
}
const showPhoneDetails = (phoneDetails) => {
    console.log(phoneDetails);
    const phoneDetailsContainer = document.getElementById('phone-details-info-container');
    phoneDetailsContainer.innerHTML = `
    <div class="w-full">
        <div class="w-3/4 mx-auto">
            <figure class="card-img-bg rounded-lg">
                <img class="ml-16" src="${phoneDetails.image}" />
            </figure>
        </div>
    </div>
    <div class="card-body">
        <h2 class="phone-card-title mb-4 text-xl md:text-2xl font-bold">${phoneDetails.name}</h2>
        <p class="phone-description text-lg leading-8 font-normal">It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout.</p>
        <p><span class="phone-price text-lg font-bold mb-5">Storage: </span>${phoneDetails?.mainFeatures?.storage}</p>
        <p><span class="phone-price text-lg font-bold mb-5">Display Size: </span>${phoneDetails?.mainFeatures?.displaySize}</p>
        <p><span class="phone-price text-lg font-bold mb-5">chipSet: </span>${phoneDetails?.mainFeatures?.chipSet}</p>
        <p><span class="phone-price text-lg font-bold mb-5">Memory: </span>${phoneDetails?.mainFeatures?.memory}</p>
        <p><span class="phone-price text-lg font-bold mb-5">Slug: </span>${phoneDetails?.slug}</p>
        <p><span class="phone-price text-lg font-bold mb-5">Release data: </span>${phoneDetails?.releaseDate}</p>
        <p><span class="phone-price text-lg font-bold mb-5">Brand: </span>${phoneDetails?.brand}</p>
        <p><span class="phone-price text-lg font-bold mb-5">GPS: </span>${phoneDetails?.others?.GPS}</p>
    </div>
    `;
    // phoneName.innerText = phone.name;
    open_show_phone_modal.showModal()
}
