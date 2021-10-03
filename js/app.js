const dropdown = document.querySelector('#package')
const numberInputs = [...document.querySelectorAll('.calc form input[type=number]')]
const checkboxes = [...document.querySelectorAll('.calc form input[type=checkbox]')]
const productsSummary = document.querySelector('.calc__summary li[data-id=products]')
const total = document.querySelector('.total__price')
const selectLis = [...document.querySelectorAll('.select__dropdown li')]
const package = document.querySelector('.calc__summary li[data-id=package]')
let prices = [...document.querySelectorAll('.item__price')];
let totalPrice = 0;

// Update value of the total
function updateTotal(){
  total.parentElement.classList.add('open');
  prices = [...document.querySelectorAll('.open > .item__price')];
  totalPrice = prices.reduce((acc,price) => acc + parseFloat(price.innerText.substr(1)), 0);
  total.innerText=`$${totalPrice}`
}

// dropdown - show and calculate
dropdown.addEventListener('click', function(){
  this.lastElementChild.classList.toggle('open');
  this.firstElementChild.classList.toggle('arrow');
  selectLis.forEach(li=>li.addEventListener('click', function(){
    let cena = 0;
    document.querySelector('.select__input').innerText = this.innerText;
    package.classList.add('open');
    package.querySelector('span:nth-child(2)').innerText = this.innerText;
    if (this.innerText === 'Basic') cena = 10;
    else if (this.innerText === 'Professional') cena = 50;
    else cena = 100;
    package.querySelector('span:nth-child(3)').innerText = `$${cena}`;
    
    updateTotal()
  }));
})


// NumberInputs - show and calculate
numberInputs.forEach(input => input.addEventListener('change', updateNumberInputs));
numberInputs.forEach(input => input.addEventListener('keyup', updateNumberInputs));
function updateNumberInputs(){
  let currentSummary = document.querySelector(`.calc__summary li[data-id=${this.id}]`);
  if (this.value > 0) {
    currentSummary.classList.add('open');
    currentSummary.querySelector('span:nth-child(2)').innerText = (this.id ==='orders') ? `${this.value} x $0.5` : `${this.value} x $2.5`;
    currentSummary.querySelector('span:nth-child(3)').innerText = (this.id ==='orders') ? `$${(this.value*0.5).toFixed(1)}` :`$${(this.value*2.5).toFixed(1)}`;
    }
  else {
    currentSummary.classList.remove('open');
  }
  updateTotal()
}

// Checkboxes - show and calculate
checkboxes.forEach(input => input.addEventListener('change', updateCheckboxes));
checkboxes.forEach(input => input.addEventListener('keyup', updateCheckboxes));
function updateCheckboxes(){
  let currentSummary = document.querySelector(`.calc__summary li[data-id=${this.id}]`);
  if (this.checked) {
    currentSummary.classList.add('open');
    currentSummary.querySelector('span:nth-child(2)').innerText = (this.id === 'terminal') ? "$20" : "$40" ;
  } else {
    currentSummary.classList.remove('open');
  }
  updateTotal()
}

