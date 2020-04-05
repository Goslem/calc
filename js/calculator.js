'use strict';

const form  = document.forms.calc,
    deposit = form.deposit,
    percent = form.percent,
    replenishment = form.replenishment,
    years = form.years,
    months = form.months,
    capitalization = form.capitalization,
    total = form.total;

let checkInput = [false, false, false, false, false];


// Отмена отправки формы
form.onsubmit = (e) => {
    e.preventDefault();
};

// Отмена вставки ифнормации в input (по желанию)
deposit.onpaste = (e) => {
    e.preventDefault();
};


// Форматирование поля для ввода первоначального капитала
deposit.oninput = () => {
    let bufer = deposit.value.replace(/\D/g, '');

    if (bufer) {
        deposit.value = parseInt(bufer).toLocaleString();
        checkInput[0] = true;

        if (checkInput.every(item => item === true)) {
            output();
        }
    } else {
        deposit.value = '';
        checkInput[0] = false;
    }


    // deposit.value = bufer ? parseInt(bufer).toLocaleString() : '';
    // checkInput[0] = bufer ? true : false;
    // if (checkInput.every(item => item === true)) {
    //     output();
    // }
};

// Форматирование поля для ввода процента
percent.oninput = () => {
    let bufer = percent.value.replace(/\D/g, '');
    percent.value = bufer.replace(/(\d\d)(\d+)/, '$1.$2');

    checkInput[1] = bufer ? true : false;
    if (checkInput.every(item => item === true)) {
        output();
    }
};

// Форматирование поля для ввода суммы пополнения
replenishment.oninput = () => {
    let bufer = replenishment.value.replace(/\D/g, '');
    replenishment.value = bufer ? parseInt(bufer).toLocaleString() : '';
    
    checkInput[2] = bufer ? true : false;
    if (checkInput.every(item => item === true)) {
        output();
    }
};

// Форматирование поля для ввода количества лет
years.oninput = () => {
    let bufer = years.value.replace(/\D/g, '');
    years.value = bufer;
    
    checkInput[3] = bufer ? true : false;
    if (checkInput.every(item => item === true)) {
        output();
    }
};

// Форматирование поля для ввода количества месяцев
months.oninput = () => {
    let bufer = months.value.replace(/\D/g, '');

    if (bufer === '') {
        months.value = '';
    } else if (parseInt(bufer) < 12) {
        months.value = bufer;
    } else {
        months.value = bufer[0];
    }

    checkInput[4] = bufer ? true : false;
    if (checkInput.every(item => item === true)) {
        output();
    }
};

// Проверка поля с чекбоксом
capitalization.oninput = () => {
    if (checkInput.every(item => item === true)) {
        output();
    }
};

// Форматирование поля для ввода / вывода результата
total.oninput = () => {
    let bufer = total.value.replace(/\D/g, '');
    total.value = bufer ? parseInt(bufer).toLocaleString() : '';
};


// Вывод информации
function output() {
    let a = parseInt(deposit.value.replace(/\D/g, ''));
    let b = parseFloat(percent.value);
    let c = parseInt(replenishment.value.replace(/\D/g, ''));
    let d = parseInt(years.value);
    let e = parseInt(months.value);

    let perc = 0;
    let n = a;
    let m = d * 12 + e;

    for (let i = 0; i < m; i++) {
        if (capitalization.checked) {
            n += n * b / 1200 + c;
        } else {
            perc += n * b / 1200;
            n += c;
        }
    }

    total.value = (Math.round(n + perc)).toLocaleString();
}