/* =========================================================
   Кофейня «Добрый Гусь» — скрипты сайта

   САМОЕ ВАЖНОЕ — В НАЧАЛЕ ФАЙЛА:
   1. CONFIG — название, слоган, адрес, телефон, email, соцсети.
   2. MENU   — все позиции меню и цены.
   3. TIME_SLOTS — время, которое можно выбрать при бронировании.

   Всё, что ниже, — «механика» сайта. Её можно не трогать.
   ========================================================= */


/* ---------- 1. ОСНОВНЫЕ ДАННЫЕ КОФЕЙНИ ----------
   Поменяйте текст в кавычках — и он обновится на всём сайте. */
const CONFIG = {
  name: 'Добрый Гусь',
  slogan: 'Кофе, после которого хочется остаться',
  address: 'ул. Примерная, 12',
  phone: '+7 (900) 000-00-00',
  email: 'hello@example.com',
  hoursWeekdays: 'Пн–Пт: 8:00–21:00',
  hoursWeekend: 'Сб–Вс: 9:00–20:00',
  telegram: 'https://t.me/example',   // ссылка на ваш Telegram
  vk: 'https://vk.com/example',       // ссылка на вашу страницу ВКонтакте
};


/* ---------- 2. МЕНЮ ----------
   Каждая категория — это вкладка.
   Чтобы добавить позицию, скопируйте строку вида
   { name: '...', description: '...', price: 000 },
   и поменяйте текст и цену. Цена — просто число (в рублях).
   Не забывайте запятую в конце строки! */
const MENU = [
  {
    id: 'coffee',
    title: 'Кофе',
    items: [
      { name: 'Эспрессо', description: 'Короткий и крепкий, из зёрен свежей обжарки', price: 150 },
      { name: 'Капучино', description: 'Эспрессо и нежная молочная пена', price: 220 },
      { name: 'Флэт уайт', description: 'Двойной эспрессо и бархатистое молоко', price: 240 },
      { name: 'Латте', description: 'Мягкий, молочный, для неторопливого утра', price: 230 },
      { name: 'Раф «Добрый Гусь»', description: 'Наш фирменный: сливки, карамель и щепотка соли', price: 290 },
      { name: 'Фильтр-кофе', description: 'Сорт дня от небольших обжарщиков', price: 190 },
    ],
  },
  {
    id: 'tea',
    title: 'Чай',
    items: [
      { name: 'Чёрный с чабрецом', description: 'Классика, как у бабушки на даче', price: 180 },
      { name: 'Сенча', description: 'Японский зелёный чай со свежим травяным вкусом', price: 190 },
      { name: 'Облепиховый', description: 'С мёдом и апельсином — согревает лучше пледа', price: 260 },
      { name: 'Масала-чай', description: 'Чёрный чай с молоком и пряностями', price: 250 },
      { name: 'Травяной сбор', description: 'Мята, ромашка и липа — без кофеина', price: 200 },
    ],
  },
  {
    id: 'desserts',
    title: 'Десерты',
    items: [
      { name: 'Чизкейк Нью-Йорк', description: 'Нежный сливочный, на песочной основе', price: 320 },
      { name: 'Круассан с миндалём', description: 'Печём каждое утро, хрустит как надо', price: 240 },
      { name: 'Морковный торт', description: 'С грецким орехом и сливочным кремом', price: 290 },
      { name: 'Медовик', description: 'Тонкие медовые коржи и сметанный крем', price: 280 },
      { name: 'Брауни', description: 'Шоколадный, влажный внутри', price: 210 },
    ],
  },
  {
    id: 'breakfast',
    title: 'Завтраки',
    items: [
      { name: 'Сырники', description: 'Со сметаной и ягодным соусом', price: 380 },
      { name: 'Омлет с сыром', description: 'Пышный, с зеленью и тостом', price: 350 },
      { name: 'Овсяная каша', description: 'На молоке, с ягодами и мёдом', price: 290 },
      { name: 'Авокадо-тост', description: 'Цельнозерновой хлеб, авокадо и яйцо пашот', price: 420 },
      { name: 'Гранола с йогуртом', description: 'Домашняя гранола, йогурт и фрукты', price: 310 },
    ],
  },
];


/* ---------- 3. НАСТРОЙКИ БРОНИРОВАНИЯ ---------- */
const TIME_SLOTS = ['09:00', '10:00', '11:00', '12:00', '13:00', '14:00',
                    '15:00', '16:00', '17:00', '18:00', '19:00', '20:00'];
const MAX_GUESTS = 10;   // максимум гостей
const DEFAULT_GUESTS = 2;


/* =========================================================
   ДАЛЬШЕ — МЕХАНИКА САЙТА
   ========================================================= */

// Проверяем, не отключил ли человек анимации в настройках системы
const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;


/* ---------- Подстановка данных из CONFIG ----------
   Ищем на странице элементы с атрибутом data-config="..."
   и вставляем в них текст из CONFIG. */
function applyConfig() {
  document.querySelectorAll('[data-config]').forEach((element) => {
    const key = element.dataset.config;
    if (CONFIG[key]) {
      element.textContent = CONFIG[key];
    }
  });

  // Ссылки: телефон, почта, соцсети
  const phoneDigits = CONFIG.phone.replace(/\D/g, '');   // оставляем только цифры
  const links = {
    phone: 'tel:+' + phoneDigits,
    email: 'mailto:' + CONFIG.email,
    telegram: CONFIG.telegram,
    vk: CONFIG.vk,
  };
  document.querySelectorAll('[data-link]').forEach((element) => {
    element.href = links[element.dataset.link];
  });

  document.title = CONFIG.name + ' — кофейня';
}


/* ---------- Шапка и кнопка «Наверх» при прокрутке ---------- */
function initScrollEffects() {
  const header = document.getElementById('header');
  const toTop = document.getElementById('toTop');

  function onScroll() {
    const scrolled = window.scrollY;
    header.classList.toggle('scrolled', scrolled > 40);   // шапка с размытием
    toTop.classList.toggle('show', scrolled > 600);       // показать кнопку «Наверх»
  }

  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();

  // Все кнопки с атрибутом data-scroll-top прокручивают страницу наверх
  document.querySelectorAll('[data-scroll-top]').forEach((button) => {
    button.addEventListener('click', () => {
      window.scrollTo({ top: 0, behavior: reduceMotion ? 'auto' : 'smooth' });
    });
  });
}


/* ---------- Бургер-меню на телефоне ---------- */
function initBurger() {
  const burger = document.getElementById('burger');
  const nav = document.getElementById('nav');
  const header = document.getElementById('header');

  function setOpen(isOpen) {
    nav.classList.toggle('open', isOpen);
    burger.classList.toggle('open', isOpen);
    header.classList.toggle('menu-open', isOpen);
    burger.setAttribute('aria-expanded', isOpen);
    burger.setAttribute('aria-label', isOpen ? 'Закрыть меню' : 'Открыть меню');
  }

  burger.addEventListener('click', () => {
    setOpen(!nav.classList.contains('open'));
  });

  // Нажали на пункт меню — закрываем меню
  nav.querySelectorAll('a').forEach((link) => {
    link.addEventListener('click', () => setOpen(false));
  });

  // Закрываем по клавише Esc и если окно стало широким
  document.addEventListener('keydown', (event) => {
    if (event.key === 'Escape') setOpen(false);
  });
  window.addEventListener('resize', () => {
    if (window.innerWidth > 900) setOpen(false);
  });
}


/* ---------- Появление блоков при прокрутке ----------
   IntersectionObserver «следит» за элементами и сообщает,
   когда элемент показался на экране. Тогда добавляем класс .visible. */
function initReveal() {
  // В группах с data-stagger элементы появляются по очереди (каждый на 0.12 с позже)
  document.querySelectorAll('[data-stagger]').forEach((group) => {
    group.querySelectorAll(':scope > .reveal').forEach((element, index) => {
      element.style.transitionDelay = (index * 0.12) + 's';
    });
  });

  const elements = document.querySelectorAll('.reveal');

  // Старые браузеры без IntersectionObserver — просто показываем всё
  if (!('IntersectionObserver' in window)) {
    elements.forEach((element) => element.classList.add('visible'));
    return;
  }

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) return;

      const element = entry.target;
      element.classList.add('visible');
      observer.unobserve(element);   // показали один раз — больше не следим

      // После появления убираем задержку, чтобы эффекты наведения срабатывали сразу
      element.addEventListener('transitionend', () => {
        element.style.transitionDelay = '';
      }, { once: true });
    });
  }, { threshold: 0.15, rootMargin: '0px 0px -40px 0px' });

  elements.forEach((element) => observer.observe(element));
}


/* ---------- Параллакс ----------
   Картинки с атрибутом data-parallax при прокрутке сдвигаются
   чуть медленнее остальной страницы. Число — сила эффекта. */
function initParallax() {
  if (reduceMotion) return;   // если анимации отключены — ничего не делаем

  const layers = document.querySelectorAll('[data-parallax]');
  let waiting = false;

  function update() {
    const viewportHeight = window.innerHeight;

    layers.forEach((layer) => {
      const speed = parseFloat(layer.dataset.parallax);
      const frame = layer.parentElement.getBoundingClientRect();

      // Картинка далеко за пределами экрана — пропускаем
      if (frame.bottom < -100 || frame.top > viewportHeight + 100) return;

      // Насколько центр блока отстоит от центра экрана
      const distance = frame.top + frame.height / 2 - viewportHeight / 2;
      layer.style.transform = `translate3d(0, ${-distance * speed}px, 0)`;
    });

    waiting = false;
  }

  // requestAnimationFrame — пересчитываем не чаще, чем браузер рисует кадры
  window.addEventListener('scroll', () => {
    if (!waiting) {
      requestAnimationFrame(update);
      waiting = true;
    }
  }, { passive: true });
  window.addEventListener('resize', update);
  update();
}


/* ---------- Меню с вкладками ---------- */
function initMenu() {
  const tabs = document.getElementById('menuTabs');
  const list = document.getElementById('menuList');

  // Создаём кнопку-вкладку для каждой категории из MENU
  MENU.forEach((category) => {
    const button = document.createElement('button');
    button.type = 'button';
    button.className = 'menu-tab';
    button.textContent = category.title;
    button.dataset.id = category.id;
    button.setAttribute('role', 'tab');
    button.addEventListener('click', () => showCategory(category.id));
    tabs.appendChild(button);
  });

  // Показываем позиции выбранной категории
  function showCategory(id) {
    const category = MENU.find((item) => item.id === id);

    // Подсвечиваем активную вкладку
    tabs.querySelectorAll('.menu-tab').forEach((button) => {
      const isActive = button.dataset.id === id;
      button.classList.toggle('active', isActive);
      button.setAttribute('aria-selected', isActive);
    });

    // Очищаем список и заполняем заново
    list.innerHTML = '';
    category.items.forEach((item, index) => {
      const li = document.createElement('li');
      li.className = 'menu-item';
      li.style.animationDelay = (index * 0.08) + 's';   // появляются по очереди
      li.innerHTML = `
        <div class="menu-item__top">
          <span class="menu-item__name">${item.name}</span>
          <span class="menu-item__dots"></span>
          <span class="menu-item__price">${item.price} ₽</span>
        </div>
        <p class="menu-item__desc">${item.description}</p>
      `;
      list.appendChild(li);
    });
  }

  // При загрузке показываем первую категорию
  showCategory(MENU[0].id);
}


/* ---------- Всплывающее окно «Спасибо!» ---------- */
const modal = document.getElementById('modal');
let focusBeforeModal = null;   // куда вернуть фокус после закрытия

function openModal(text) {
  document.getElementById('modalText').textContent = text;
  focusBeforeModal = document.activeElement;
  modal.classList.add('open');
  modal.setAttribute('aria-hidden', 'false');
  document.body.style.overflow = 'hidden';   // запрещаем прокрутку страницы под окном
  modal.querySelector('.modal__close').focus();
}

function closeModal() {
  modal.classList.remove('open');
  modal.setAttribute('aria-hidden', 'true');
  document.body.style.overflow = '';
  if (focusBeforeModal) focusBeforeModal.focus();
}

function initModal() {
  // Закрыть можно крестиком, кнопкой «Отлично» или кликом по тёмному фону
  modal.querySelectorAll('[data-close]').forEach((element) => {
    element.addEventListener('click', closeModal);
  });
  document.addEventListener('keydown', (event) => {
    if (event.key === 'Escape' && modal.classList.contains('open')) closeModal();
  });
}


/* ---------- Бронирование ---------- */

// Превращает дату в строку вида 2026-10-25 (такой формат понимает поле даты)
function toInputDate(date) {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
}

// Превращает 2026-10-25 в «25 октября»
function formatDateRu(value) {
  const [year, month, day] = value.split('-').map(Number);
  return new Date(year, month - 1, day).toLocaleDateString('ru-RU', { day: 'numeric', month: 'long' });
}

// Достаём из телефона 10 цифр после +7
function getPhoneDigits(value) {
  let digits = value.replace(/\D/g, '');
  if (value.trim().startsWith('+7')) {
    digits = digits.slice(1);                        // убираем «7» из «+7»
  } else if (digits[0] === '7' || digits[0] === '8') {
    digits = digits.slice(1);                        // человек начал с 8 или 7
  }
  return digits.slice(0, 10);
}

// Маска: из цифр 9001234567 делаем +7 (900) 123-45-67
function formatPhone(digits) {
  let result = '+7';
  if (digits.length > 0) result += ' (' + digits.slice(0, 3);
  if (digits.length >= 3) result += ')';
  if (digits.length > 3) result += ' ' + digits.slice(3, 6);
  if (digits.length > 6) result += '-' + digits.slice(6, 8);
  if (digits.length > 8) result += '-' + digits.slice(8, 10);
  return result;
}

function initBooking() {
  const form = document.getElementById('bookingForm');
  const nameInput = document.getElementById('bookingName');
  const phoneInput = document.getElementById('bookingPhone');
  const dateInput = document.getElementById('bookingDate');
  const commentInput = document.getElementById('bookingComment');
  const slotsBox = document.getElementById('timeSlots');
  const guestsValue = document.getElementById('guestsValue');
  const guestsMinus = document.getElementById('guestsMinus');
  const guestsPlus = document.getElementById('guestsPlus');

  let selectedTime = null;       // выбранное время
  let guests = DEFAULT_GUESTS;   // количество гостей
  let lastPhoneDigits = '';      // цифры телефона до последнего изменения

  /* --- Показ и скрытие ошибок --- */
  function setError(fieldName, message) {
    const field = form.querySelector(`[data-field="${fieldName}"]`);
    field.classList.add('has-error');
    field.querySelector('.field__error').textContent = message;
  }

  function clearError(fieldName) {
    form.querySelector(`[data-field="${fieldName}"]`).classList.remove('has-error');
  }

  nameInput.addEventListener('input', () => clearError('name'));

  /* --- Маска телефона --- */
  phoneInput.addEventListener('focus', () => {
    if (!phoneInput.value) phoneInput.value = '+7 ';
  });

  phoneInput.addEventListener('blur', () => {
    if (getPhoneDigits(phoneInput.value).length === 0) phoneInput.value = '';
  });

  phoneInput.addEventListener('input', (event) => {
    let digits = getPhoneDigits(phoneInput.value);

    // Если стёрли скобку или дефис, цифр столько же — стираем ещё и цифру
    if (event.inputType === 'deleteContentBackward' && digits.length === lastPhoneDigits.length) {
      digits = digits.slice(0, -1);
    }

    lastPhoneDigits = digits;
    phoneInput.value = digits.length ? formatPhone(digits) : '+7 ';
    clearError('phone');
  });

  /* --- Дата: нельзя выбрать прошедший день, максимум на 2 месяца вперёд --- */
  const today = new Date();
  const maxDate = new Date();
  maxDate.setDate(today.getDate() + 60);
  dateInput.min = toInputDate(today);
  dateInput.max = toInputDate(maxDate);

  dateInput.addEventListener('change', () => {
    clearError('date');
    renderSlots();   // для сегодняшнего дня прошедшее время станет недоступно
  });

  /* --- Кнопки-слоты времени --- */
  function renderSlots() {
    slotsBox.innerHTML = '';

    const isToday = dateInput.value === toInputDate(new Date());
    const now = new Date();
    const nowInMinutes = now.getHours() * 60 + now.getMinutes();

    TIME_SLOTS.forEach((time) => {
      const button = document.createElement('button');
      button.type = 'button';
      button.className = 'slot';
      button.textContent = time;

      // Сегодня нельзя забронировать время, которое уже прошло (или наступит меньше чем через 30 минут)
      const [hours, minutes] = time.split(':').map(Number);
      if (isToday && hours * 60 + minutes <= nowInMinutes + 30) {
        button.disabled = true;
      }

      const isSelected = time === selectedTime && !button.disabled;
      button.classList.toggle('active', isSelected);
      button.setAttribute('aria-pressed', isSelected);

      button.addEventListener('click', () => {
        selectedTime = time;
        slotsBox.querySelectorAll('.slot').forEach((slot) => {
          slot.classList.toggle('active', slot === button);
          slot.setAttribute('aria-pressed', slot === button);
        });
        clearError('time');
      });

      slotsBox.appendChild(button);
    });

    // Если выбранное раньше время стало недоступным — сбрасываем выбор
    if (selectedTime && !slotsBox.querySelector('.slot.active')) {
      selectedTime = null;
    }
  }

  /* --- Счётчик гостей --- */
  function updateGuests() {
    guestsValue.textContent = guests;
    guestsMinus.disabled = guests <= 1;
    guestsPlus.disabled = guests >= MAX_GUESTS;

    // Перезапускаем маленькую анимацию «подпрыгивания» числа
    guestsValue.classList.remove('bump');
    void guestsValue.offsetWidth;
    guestsValue.classList.add('bump');
  }

  guestsMinus.addEventListener('click', () => {
    if (guests > 1) guests--;
    updateGuests();
  });

  guestsPlus.addEventListener('click', () => {
    if (guests < MAX_GUESTS) guests++;
    updateGuests();
  });

  /* --- Проверка полей --- */
  function validate() {
    let isValid = true;

    if (nameInput.value.trim().length < 2) {
      setError('name', 'Пожалуйста, напишите, как к вам обращаться');
      isValid = false;
    }

    if (getPhoneDigits(phoneInput.value).length !== 10) {
      setError('phone', 'Введите номер полностью: +7 (900) 000-00-00');
      isValid = false;
    }

    if (!dateInput.value) {
      setError('date', 'Выберите дату');
      isValid = false;
    } else if (dateInput.value < dateInput.min) {
      setError('date', 'Эта дата уже прошла');
      isValid = false;
    } else if (dateInput.value > dateInput.max) {
      setError('date', 'Бронируем не больше чем на 2 месяца вперёд');
      isValid = false;
    }

    if (!selectedTime) {
      setError('time', 'Выберите удобное время');
      isValid = false;
    }

    return isValid;
  }

  /* --- Отправка формы --- */
  form.addEventListener('submit', (event) => {
    event.preventDefault();   // не перезагружаем страницу

    if (!validate()) {
      // Прокручиваем к первому полю с ошибкой
      form.querySelector('.has-error').scrollIntoView({
        behavior: reduceMotion ? 'auto' : 'smooth',
        block: 'center',
      });
      return;
    }

    // Собираем все данные брони в один объект
    const booking = {
      name: nameInput.value.trim(),
      phone: phoneInput.value,
      date: dateInput.value,
      time: selectedTime,
      guests: guests,
      zone: form.querySelector('input[name="zone"]:checked').value,
      comment: commentInput.value.trim(),
    };

    // ВНИМАНИЕ: сейчас заявка никуда не отправляется, а только выводится в консоль браузера (F12).
    // Чтобы получать брони по-настоящему, здесь нужно отправить объект booking
    // на сервер, в Telegram-бота или в сервис форм.
    console.log('Новая бронь:', booking);

    openModal(`${booking.name}, ждём вас ${formatDateRu(booking.date)} в ${booking.time}. ` +
              `Гостей: ${booking.guests}. Скоро позвоним, чтобы подтвердить бронь.`);

    // Очищаем форму
    form.reset();
    selectedTime = null;
    guests = DEFAULT_GUESTS;
    lastPhoneDigits = '';
    guestsValue.textContent = guests;
    guestsMinus.disabled = false;
    guestsPlus.disabled = false;
    renderSlots();
  });

  // Начальное состояние
  renderSlots();
  guestsValue.textContent = guests;
}


/* ---------- Запуск всего ---------- */
applyConfig();
initScrollEffects();
initBurger();
initReveal();
initParallax();
initMenu();
initModal();
initBooking();

// Текущий год в подвале
document.getElementById('year').textContent = new Date().getFullYear();
