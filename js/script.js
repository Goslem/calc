'use strict';

const form = document.querySelector('.calc__form');
const deposit = document.querySelector('#deposit');
const percent = document.querySelector('#percent');
const replenishment = document.querySelector('#replenishment');
const year = document.querySelector('#year');
const month = document.querySelector('#month');
const capitalization = document.querySelector('#capitalization');
const total = document.querySelector('#total');


deposit.onblur = () => {
    deposit.value = deposit.value.replace(/[^\d]/g, '').replace(/\B(?=(?:\d{3})+(?!\d))/g, ' ');
};

replenishment.onblur = () => {
    replenishment.value = replenishment.value.replace(/[^\d]/g, '').replace(/\B(?=(?:\d{3})+(?!\d))/g, ' '); 
};

total.onblur = () => {
    total.value = total.value.replace(/[^\d]/g, '').replace(/\B(?=(?:\d{3})+(?!\d))/g, ' '); 
};


form.oninput = () => {
    let result = +deposit.value.replace(/[^\d]/g, '');

    for (let i = 0; i < year.value * 12 + +month.value; i++) {
        result += ~~(result / 100 * percent.value) + +replenishment.value;
    }
    
    total.value = result.toLocaleString();
    

    // let time = parseInt(year.value) * 12 + parseInt(month.value);
    // let perc = parseInt(percentage.value) / 12;

    // for (let i = 0; i < time; i++) {
    //     result = ~~(result / 100 * perc) + result + replenishment.value;
    // }

    // output.value = result.toLocaleString();
};