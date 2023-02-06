// burger-menu
const header = document.querySelector('.header');

window.addEventListener('click', (e) => {
  const { target } = e;
  if (!target.closest('.header__navigation') && !target.closest('.hamburger')) {
    header.classList.remove('open');
  }
  if (target.closest('.header__navigation') && e.target.nodeName === 'A') {
    header.classList.remove('open');
  }
  if (target.closest('.hamburger')) {
    header.classList.toggle('open');
  }
});

// general functions
function isMobileView() {
  const width = document.documentElement.scrollWidth;
  return width <= 700;
}

// accordion
function togglePrice(e) {
  const liHead = e.target.closest('.accordion__li-head');
  if (!liHead) return;
  const accordionList = e.target.closest('.accordion__list');
  const liHeadArr = accordionList.querySelectorAll('.accordion__li-head');
  liHeadArr.forEach((item) => {
    if (item !== liHead) {
      item.parentElement.classList.remove('open-tab');
    }
  });
  liHead.parentElement.classList.toggle('open-tab');
}

const accordion = document.querySelector('.accordion__list');
accordion.addEventListener('click', togglePrice);

// select
function showAdress(cityCur) {
  const allCities = document.querySelectorAll('.city-name');
  allCities.forEach((city) => {
    const adress = city.closest('.adress');
    adress.style.display = 'none';
    if (city.innerText === cityCur) {
      adress.style.display = 'flex';
    }
  });
}

function toggleSelect(e) {
  const head = e.target.closest('.select__head');
  if (!head) return;
  const selectDiv = e.target.closest('.select-city');
  selectDiv.classList.toggle('open-select');
}

function delContactsImg() {
  const sectionContacts = document.querySelector('.contacts');
  const img = sectionContacts.querySelector('.contacts__image');
  if (img) {
    img.remove();
  }
}

function changeSelectMargin(size) {
  const selectParent = document.querySelector('.contacts__select');
  selectParent.style.marginBottom = size;
}

function setCity(e) {
  const selectDiv = e.target.closest('.select-city');
  const curCity = e.target.closest('.select__item').innerText;
  const headSelect = selectDiv.querySelector('.select-city__text');
  headSelect.innerText = curCity;
  selectDiv.classList.remove('open-select');
  selectDiv.classList.add('active-select');
  showAdress(curCity);
  changeSelectMargin('36px');
  if (isMobileView()) {
    delContactsImg();
    changeSelectMargin('43.25px');
  }
}
const select = document.querySelector('.select-city');
const selectList = select.querySelector('.select__list');
select.addEventListener('click', toggleSelect);
selectList.addEventListener('click', setCity);

// I apologize for the following code
// service buttons
let activeBtnCount = 0;
const service = document.querySelector('#service');
const serviceBtns = service.querySelectorAll('button');

function toggleServiceBtn(e) {
  const btn = e.target;
  if (btn.tagName !== 'BUTTON') return;
  const allCards = service.querySelectorAll('.card');
  allCards.forEach((card) => {
    if (!card.classList.contains('btn-card')) {
      card.classList.add('card-blur');
    }
  });
  const selectedCards = service.querySelectorAll(`.${btn.id}`);
  if (!btn.classList.contains('active-btn')) {
    if (activeBtnCount < 2) {
      btn.classList.add('active-btn');
      activeBtnCount += 1;
      selectedCards.forEach((card) => {
        card.classList.remove('card-blur');
        card.classList.add('btn-card');
      });
    }
    if (activeBtnCount === 2) {
      serviceBtns.forEach((item) => {
        if (!item.classList.contains('active-btn')) {
          item.setAttribute('disabled', 'disabled');
        }
      });
    }
  } else {
    btn.classList.remove('active-btn');
    selectedCards.forEach((card) => {
      card.classList.remove('btn-card');
      card.classList.add('card-blur');
    });
    activeBtnCount -= 1;
    if (activeBtnCount < 2) {
      serviceBtns.forEach((item) => {
        item.removeAttribute('disabled');
      });
    }
  }
  if (activeBtnCount === 0) {
    allCards.forEach((card) => {
      card.classList.remove('card-blur');
    });
  }
}
const serviceBtnsBlock = service.querySelector('.service__buttons');
serviceBtnsBlock.addEventListener('click', toggleServiceBtn);

const line1 = '1. При нажатии на кнопки:Gardens,Lawn,Planting происходит смена фокуса на услугах в разделе service +50';
const line2 = '2. Accordion в секции prices реализация 3-х выпадающих списков об услугах и ценах + 50';
const line3 = '3. В разделе contacts реализован select с выбором городов +25';
console.log(`${line1}\n${line2}\n${line3}`);
