'use strict';

const btn = document.querySelector('.btn-country');
const countriesContainer = document.querySelector('.countries');



const renderError = function(msg){
    countriesContainer.insertAdjacentText('beforeend' ,msg);
}


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
}

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
    .then(response => {

        if (!response.ok) {
            throw new Error(`Country not found (${response.status})`)
        }
        return response.json()
    })
    .then(data => {
        renderCountry(data[0]);
        const neighbour = data[0].borders[0];

        if (!neighbour){ 
            return
        };

        //Country 2
        return  fetch(`https://restcountries.com/v3.1/alpha/${neighbour}`);

    })
    .then(response => response.json())
    .then(data => {
        renderCountry(data[0], 'neighbour')
    })
    .catch(err => {
        console.error(`${err} haha`);
        renderError(`something went wrong. . . . ${err.message}`);
    })
    .finally( () => {
        countriesContainer.style.opacity = 1;
    })
};

getCountryData('brazil');



const getJSON = function (url, errorMsg = 'Something went wrong') {
    return fetch(url).then(response => {
      if (!response.ok) throw new Error(`${errorMsg} (${response.status})`);
  
      return response.json();
    });
  };

const get3Countries = async function(c1, c2, c3){
    try{
        // const [data1] = await getJSON( `https://restcountries.com/v3.1/name/${c1}`);
        // const [data2] = await getJSON(`https://restcountries.com/v3.1/name/${c2}`);
        // const [data3] = await getJSON( `https://restcountries.com/v3.1/name/${c3}`);

        const data = Promise.all([
            getJSON(`https://restcountries.com/v3.1/name/${c1}`),
            getJSON(`https://restcountries.com/v3.1/name/${c2}`),
            getJSON(`https://restcountries.com/v3.1/name/${c3}`),
          ]);

          console.log((await data).map(d => d[0].capital));


        // console.log([data1.capital, data2.capital, data3.capital]);
    } catch (err) {
        console.log(err);
    }
};
get3Countries('portugal', 'canada', 'tanzania');


// Promise.race
(async function(){
    const res = await Promise.race([getJSON(`https://restcountries.com/v3.1/name/italy`),
    getJSON(`https://restcountries.com/v3.1/name/egypt`),
    getJSON(`https://restcountries.com/v3.1/name/mexico`)]);
    console.log(res[0]);
})();

const timeout = function(sec){
    return new Promise(function(_, reject){
        setTimeout(function(){
            reject (new Error('Request took too long'));
        }, sec)
    });
};


Promise.race([
    getJSON(`https://restcountries.com/v3.1/name/tanzania`),timeout(1)
])










