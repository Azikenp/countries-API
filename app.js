'use strict';

const btn = document.querySelector('.btn-country');
const countriesContainer = document.querySelector('.countries');

///////////////////////////////////////


// const getCountryData = function(country){

//     const request = new XMLHttpRequest();
//     request.open('GET', `https://restcountries.com/v3.1/name/${country}`);
//     request.send();

//     request.addEventListener('load', function(){
//         const [data] = JSON.parse(this.responseText)
//         console.log(data);
//         // console.log(Object.values(data.languages));

//         const html = `
//         <article class="country">
//             <img class="country__img" src="${data.flags.svg}" />
//             <div class="country__data">
//                 <h3 class="country__name">${data.name.common}</h3>
//                 <h4 class="country__region">${data.region}</h4>
//                 <p class="country__row"><span>👫</span>${(Number(data.population) / 1000000).toFixed(1) }  people</p>
//                 <p class="country__row"><span>🗣️</span>${Object.values(data.languages)}</p>
//                 <p class="country__row"><span>💰</span>${Object.values(data.currencies)[0].name}</p>
//             </div>
//         </article>
//         `;

//         countriesContainer.insertAdjacentHTML('beforeend', html);
//         countriesContainer.style.opacity = 1;
//     })
// };

// getCountryData('portugal');
// getCountryData('usa');
// getCountryData('germany');



const renderCountry = function(data, className = ''){
    const html = `
        <article class="country ${className}">
            <img class="country__img" src="${data.flags.svg}" />
            <div class="country__data">
                <h3 class="country__name">${data.name.common}</h3>
                <h4 class="country__region">${data.region}</h4>
                <p class="country__row"><span>👫</span>${(Number(data.population) / 1000000).toFixed(1) } million  people</p>
                <p class="country__row"><span>🗣️</span>${Object.values(data.languages)}</p>
                <p class="country__row"><span>💰</span>${Object.values(data.currencies)[0].name}</p>
            </div>
        </article>
        `;

        countriesContainer.insertAdjacentHTML('beforeend', html);
        countriesContainer.style.opacity = 1;
}




///////////////////////////////////////////////////////////////Using AJAX calls
// const getCountryAndNeighbour = function(country){

//     //AJAX call country 1
//     const request = new XMLHttpRequest();
//     request.open('GET', `https://restcountries.com/v3.1/name/${country}`);
//     request.send();

//     request.addEventListener('load', function(){
//         const [data] = JSON.parse(this.responseText);
//         console.log(data);
//         // console.log(Object.values(data.languages));

//         //Render country 1
//         renderCountry(data)

//         //Get neighbour country 2
//         const [neighbour] = data.borders;

//         if(!neighbour) return;

//          //AJAX call country 2
//         const request2 = new XMLHttpRequest();
//         request2.open('GET', `https://restcountries.com/v3.1/alpha/${neighbour}`);
//         request2.send();
//         request2.addEventListener('load', function(){
//             const [data2] = JSON.parse(this.responseText);
//             console.log(data2);
//             renderCountry(data2, 'neighbour')
//         })
//     });
// };

// getCountryAndNeighbour('usa');










/////////////////////////////////////////////////////////////// Using Promises
const getCountryData = function(country){
    fetch(`https://restcountries.com/v3.1/name/${country}`)
    .then(response => response.json())
    .then(data => {
        renderCountry(data[0]);
        console.log(data[0].borders[0]);
        const neighbour = data[0].borders[0];

        if (!neighbour){ 
            return
        };

        //Country 2
        return  fetch(`https://restcountries.com/v3.1/alpha/${neighbour}`);

    })
    .then(response => response.json())
    .then(data => {
        console.log(data);
        renderCountry(data[0], 'neighbour')
    })
};

getCountryData('usa');






