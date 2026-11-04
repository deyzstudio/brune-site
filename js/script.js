/* Brune — каталог, корзина (LocalStorage), оформление, подбор кофе */
'use strict';
const IMG = 'assets/images/products/';
const CATS = ['Классический кофе', 'Авторские напитки', 'Холодный кофе', 'Десерты'];
// tags: температура / крепость / сладость — используются в подборе кофе
const PRODUCTS = [
  { id: 1, cat: 0, name: 'Эспрессо', img: 'espresso', price: 150, tags: 'hot strong dry', desc: 'Двойная порция плотного эспрессо с карамельным послевкусием.' },
  { id: 2, cat: 0, name: 'Американо', img: 'americano', price: 180, tags: 'hot strong dry', desc: 'Эспрессо с горячей водой: чистый вкус и мягкая горчинка.' },
  { id: 3, cat: 0, name: 'Капучино', img: 'cappuccino', price: 240, tags: 'hot soft dry', desc: 'Эспрессо, тёплое молоко и плотная молочная пена.' },
  { id: 4, cat: 0, name: 'Латте', img: 'latte', price: 260, tags: 'hot soft dry', desc: 'Нежный напиток с большим количеством шелковистого молока.' },
  { id: 5, cat: 0, name: 'Флэт уайт', img: 'flat', price: 270, tags: 'hot strong dry', desc: 'Двойной эспрессо и тонкая молочная микропена.' },
  { id: 6, cat: 1, name: 'Раф лавандовый', img: 'raf', price: 320, tags: 'hot soft caramel', desc: 'Эспрессо со сливками, ванильным сахаром и каплей лаванды.' },
  { id: 7, cat: 1, name: 'Мокко', img: 'mocha', price: 290, tags: 'hot soft choco', desc: 'Эспрессо, горячий шоколад и молоко под сливочной шапкой.' },
  { id: 8, cat: 1, name: 'Карамельный латте', img: 'caramel', price: 300, tags: 'hot soft caramel', desc: 'Латте с домашней солёной карамелью и хрустящей крошкой.' },
  { id: 9, cat: 2, name: 'Айс-латте', img: 'iceL', price: 280, tags: 'cold soft dry', desc: 'Эспрессо, холодное молоко и лёд. Освежает и бодрит.' },
  { id: 10, cat: 2, name: 'Эспрессо-тоник', img: 'tonic', price: 270, tags: 'cold strong dry', desc: 'Эспрессо на тонике с цедрой апельсина. Лёгкая кислинка.' },
  { id: 11, cat: 2, name: 'Колд брю', img: 'cold', price: 290, tags: 'cold strong choco', desc: 'Кофе холодной экстракции 16 часов: мягкий, с нотами шоколада.' },
  { id: 12, cat: 3, name: 'Чизкейк', img: 'cheese', price: 290, tags: '', desc: 'Нью-йоркский чизкейк с ягодным соусом.' },
  { id: 13, cat: 3, name: 'Круассан', img: 'croi', price: 210, tags: '', desc: 'Слоёный круассан на сливочном масле, выпекаем каждое утро.' },
  { id: 14, cat: 3, name: 'Брауни', img: 'brown', price: 230, tags: '', desc: 'Влажный шоколадный брауни с хрустящей корочкой.' },
  { id: 15, cat: 3, name: 'Тирамису', img: 'tira', price: 310, tags: '', desc: 'Маскарпоне, савоярди и крепкий эспрессо.' },
];
const REVIEWS = [
  ['Анна К.', 'Капучино с идеальной пеной, а кофе без лишней горечи. Теперь захожу каждое утро.'],
  ['Михаил Т.', 'Бариста подробно рассказал о зёрнах и подобрал американо под мой вкус. Приятно, когда так внимательны.'],
  ['Елена В.', 'Раф нежный, сладкий в меру. Взяла чизкейк, он оказался таким же вкусным, как напиток.'],
  ['Дмитрий С.', 'Уютное место, чтобы поработать с ноутбуком. Тихо, тепло, кофе горячий и быстро готов.'],
  ['Ольга Р.', 'Эспрессо-тоник удивил: свежий, с цитрусом. Летом буду брать только его.'],
  ['Илья Н.', 'Круассан тёплый, слоёный, с хрустом. К флэт уайту идеально.'],
  ['Мария Л.', 'Команда улыбчивая и знает меню. Мокко напомнил горячий шоколад из детства.'],
  ['Артём Б.', 'Нравится, что напитки подают аккуратно. Колд брю мягкий, без кислоты, а атмосфера располагает остаться.'],
];
const $ = (s, r = document) => r.querySelector(s);
const rub = n => n.toLocaleString('ru-RU') + ' ₽';
const esc = s => s.replace(/[&<>"']/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
const byId = id => PRODUCTS.find(p => p.id === id);

/* ---------- Каталог ---------- */
let activeCat = 0;
function renderTabs() {
  $('#tabs').innerHTML = CATS.map((c, i) => `<button class="tab" role="tab" aria-selected="${i === activeCat}" data-cat="${i}">${c}</button>`).join('');
}
function renderGrid() {
  $('#grid').innerHTML = PRODUCTS.filter(p => p.cat === activeCat).map((p, i) => `
    <article class="card" style="animation-delay:${i * 60}ms">
      <div class="card__img"><img src="${IMG}${p.img}.svg" alt="${p.name}" width="120" height="150" loading="lazy"></div>
      <h3>${p.name}</h3><p>${p.desc}</p>
      <div class="card__foot"><span class="price">${rub(p.price)}</span>
      <button class="add" data-add="${p.id}" aria-label="Добавить в корзину: ${p.name}">+</button></div>
    </article>`).join('');
}
$('#tabs').addEventListener('click', e => {
  const t = e.target.closest('[data-cat]'); if (!t) return;
  activeCat = +t.dataset.cat; renderTabs(); renderGrid();
});
$('#grid').addEventListener('click', e => { const b = e.target.closest('[data-add]'); if (b) addToCart(+b.dataset.add); });

/* ---------- Корзина (хранится в LocalStorage) ---------- */
const KEY = 'brune_cart_v1';
let cart = [];
try { cart = JSON.parse(localStorage.getItem(KEY)) || []; } catch { cart = []; }
cart = cart.filter(i => byId(i.id) && i.qty > 0); // защита от устаревших данных
const save = () => { try { localStorage.setItem(KEY, JSON.stringify(cart)); } catch {} };
const total = () => cart.reduce((s, i) => s + byId(i.id).price * i.qty, 0);

function toast(msg) { const t = $('#toast'); t.textContent = msg; t.classList.add('on'); clearTimeout(toast.t); toast.t = setTimeout(() => t.classList.remove('on'), 1800); }
function addToCart(id) {
  const it = cart.find(i => i.id === id);
  it ? it.qty++ : cart.push({ id, qty: 1 });
  renderCart(); toast(`${byId(id).name} добавлен в корзину`);
}
function renderCart() {
  save();
  const count = cart.reduce((s, i) => s + i.qty, 0);
  $('#cartCount').textContent = count;
  $('#cartTotal').textContent = rub(total());
  $('#checkoutBtn').disabled = !count;
  $('#cartList').innerHTML = count ? cart.map(i => { const p = byId(i.id); return `
    <li class="item"><img src="${IMG}${p.img}.svg" alt="">
      <div><b>${p.name}</b><small>${rub(p.price)}</small>
        <div class="qty"><button data-dec="${p.id}" aria-label="Уменьшить">−</button><span>${i.qty}</span><button data-inc="${p.id}" aria-label="Увеличить">+</button></div></div>
      <div style="text-align:right"><b>${rub(p.price * i.qty)}</b><br><button class="rm" data-rm="${p.id}">Удалить</button></div></li>`; }).join('')
    : '<li class="empty">В корзине пока пусто. Выберите напиток в меню.</li>';
}
$('#cartList').addEventListener('click', e => {
  const b = e.target.closest('button'); if (!b) return;
  const id = +(b.dataset.inc || b.dataset.dec || b.dataset.rm), it = cart.find(i => i.id === id);
  if (b.dataset.inc) it.qty++;
  if (b.dataset.dec && --it.qty < 1) cart = cart.filter(i => i.id !== id);
  if (b.dataset.rm) cart = cart.filter(i => i.id !== id);
  renderCart();
});

/* ---------- Панели и окна ---------- */
const drawer = $('#drawer'), overlay = $('#overlay');
function openDrawer(on) { drawer.classList.toggle('on', on); overlay.classList.toggle('on', on); drawer.setAttribute('aria-hidden', !on); }
function openModal(m, on) { m.hidden = !on; document.body.style.overflow = on ? 'hidden' : ''; if (on) $('input,button:not([data-close])', m)?.focus(); }
$('#cartBtn').onclick = () => openDrawer(true);
overlay.onclick = () => openDrawer(false);
document.addEventListener('click', e => {
  if (e.target.closest('[data-close]')) { openDrawer(false); document.querySelectorAll('.modal').forEach(m => openModal(m, false)); }
  if (e.target.classList.contains('modal')) openModal(e.target, false);
});
document.addEventListener('keydown', e => { if (e.key === 'Escape') { openDrawer(false); document.querySelectorAll('.modal').forEach(m => openModal(m, false)); } });
const burger = $('#burger');
burger.onclick = () => { const on = $('#nav').classList.toggle('on'); burger.setAttribute('aria-expanded', on); };
$('#nav').onclick = e => { if (e.target.tagName === 'A') { $('#nav').classList.remove('on'); burger.setAttribute('aria-expanded', false); } };

/* ---------- Оформление заказа (демо, без сервера) ---------- */
$('#checkoutBtn').onclick = () => {
  openDrawer(false);
  $('#orderForm').hidden = false; $('#orderDone').hidden = true; $('#formError').textContent = '';
  openModal($('#checkoutModal'), true);
};
$('#orderForm').addEventListener('submit', e => {
  e.preventDefault();
  const f = new FormData(e.target), name = f.get('name').trim(), phone = f.get('phone').trim();
  if (name.length < 2) return $('#formError').textContent = 'Введите имя: минимум 2 символа.';
  if (phone.replace(/\D/g, '').length < 10) return $('#formError').textContent = 'Введите телефон, например +7 900 000-00-00.';
  const lines = cart.map(i => `• ${byId(i.id).name} × ${i.qty} = ${rub(byId(i.id).price * i.qty)}`);
  const comment = f.get('comment').trim();
  $('#orderText').value = `Заказ Brune (демо)\nИмя: ${name}\nТелефон: ${phone}\n\n${lines.join('\n')}\n\nИтого: ${rub(total())}${comment ? '\nКомментарий: ' + comment : ''}`;
  $('#orderForm').hidden = true; $('#orderDone').hidden = false;
  cart = []; renderCart(); e.target.reset();
});
$('#copyOrder').onclick = async () => {
  try { await navigator.clipboard.writeText($('#orderText').value); toast('Текст заказа скопирован'); }
  catch { $('#orderText').select(); toast('Выделено: нажмите «Копировать»'); }
};

/* ---------- Подбор кофе ---------- */
const QUIZ = [
  ['Какой напиток хочется?', [['Горячий', 'hot'], ['Холодный', 'cold']]],
  ['Какой вкус ближе?', [['Крепкий и насыщенный', 'strong'], ['Мягкий и молочный', 'soft']]],
  ['Что со сладостью?', [['Без сладкого', 'dry'], ['Карамельная нотка', 'caramel'], ['Шоколадная нотка', 'choco']]],
];
let step = 0, answers = [];
function renderQuiz() {
  const body = $('#quizBody');
  if (step < QUIZ.length) {
    const [q, opts] = QUIZ[step];
    body.innerHTML = `<p class="note">Вопрос ${step + 1} из ${QUIZ.length}</p><h2 id="quizTitle">${q}</h2><div class="opts">${opts.map(o => `<button data-a="${o[1]}">${o[0]}</button>`).join('')}</div>`;
    return;
  }
  // Подбираем напиток с наибольшим числом совпавших ответов
  const best = PRODUCTS.filter(p => p.tags).map(p => ({ p, s: answers.filter(a => p.tags.split(' ').includes(a)).length })).sort((a, b) => b.s - a.s)[0].p;
  body.innerHTML = `<div class="res"><p class="note">Ваш напиток</p><h2 id="quizTitle">${best.name}</h2><img src="${IMG}${best.img}.svg" alt="${best.name}"><p>${best.desc}</p><p class="price">${rub(best.price)}</p><button class="btn" id="quizAdd">Добавить в корзину</button></div>`;
  $('#quizAdd').onclick = () => { addToCart(best.id); openModal($('#quizModal'), false); openDrawer(true); };
}
$('#quizBtn').onclick = () => { step = 0; answers = []; renderQuiz(); openModal($('#quizModal'), true); };
$('#quizBody').addEventListener('click', e => { const b = e.target.closest('[data-a]'); if (b) { answers.push(b.dataset.a); step++; renderQuiz(); } });

/* ---------- Отзывы и запуск ---------- */
$('#reviewList').innerHTML = REVIEWS.map(([n, t]) => `<figure class="review"><div class="stars" aria-label="5 из 5">★★★★★</div><p>${esc(t)}</p><b>${esc(n)}</b></figure>`).join('');
renderTabs(); renderGrid(); renderCart();
