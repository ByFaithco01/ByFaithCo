import { initializeApp } from "https://www.gstatic.com/firebasejs/9.23.0/firebase-app.js";
import { getAuth, signInWithEmailAndPassword, createUserWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/9.23.0/firebase-auth.js";
import { getFirestore, collection, addDoc } from "https://www.gstatic.com/firebasejs/9.23.0/firebase-firestore.js";
import { firebaseConfig } from "./firebase-config.js";

let app, auth, db;

export function initApp(){
  app = initializeApp(firebaseConfig);
  auth = getAuth(app);
  db = getFirestore(app);

  import('./products.js').then(m=>{
    m.fetchFeatured().then(list=> renderFeatured(list));
  });

  document.getElementById('year')?.appendChild(document.createTextNode(new Date().getFullYear()));
  document.getElementById('year2')?.appendChild(document.createTextNode(new Date().getFullYear()));
  document.getElementById('year3')?.appendChild(document.createTextNode(new Date().getFullYear()));
}

function renderFeatured(list){
  const el = document.getElementById('featured-list');
  if(!el) return;
  el.innerHTML = '';
  list.slice(0,4).forEach(p=>{
    const div = document.createElement('div');
    div.className = 'card';
    div.innerHTML = `
      <img src="${p.image || 'assets/product_male_back.jpg'}" class="product-img"/>
      <div class="product-title">${p.title}</div>
      <div class="product-price">R$ ${p.price.toFixed(2)}</div>
    `;
    el.appendChild(div);
  });
}

export function initAuthPage(){
  app = app || initializeApp(firebaseConfig);
  auth = auth || getAuth(app);
  const loginForm = document.getElementById('login-form');
  const msg = document.getElementById('msg');

  loginForm.addEventListener('submit', async (e)=>{
    e.preventDefault();
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    try{
      await signInWithEmailAndPassword(auth, email, password);
      msg.textContent = 'Logado com sucesso!';
      location.href = 'admin.html';
    }catch(err){
      try{
        await createUserWithEmailAndPassword(auth, email, password);
        msg.textContent = 'Conta criada e logado!';
        location.href = 'admin.html';
      }catch(e){
        msg.textContent = e.message;
      }
    }
  });
}

export function initContactPage(){
  app = app || initializeApp(firebaseConfig);
  db = db || getFirestore(app);

  const form = document.getElementById('contact-form');
  const msg = document.getElementById('contact-msg');
  form.addEventListener('submit', async (e)=>{
    e.preventDefault();
    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const message = document.getElementById('message').value;
    try{
      await addDoc(collection(db, 'contacts'), { name, email, message, createdAt: new Date() });
      msg.textContent = 'Mensagem enviada. Obrigado!';
      form.reset();
    }catch(err){
      msg.textContent = 'Erro ao enviar: ' + err.message;
    }
  });
}
