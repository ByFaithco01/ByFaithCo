import { initializeApp } from "https://www.gstatic.com/firebasejs/9.23.0/firebase-app.js";
import { getFirestore, collection, addDoc, getDocs, query, orderBy } from "https://www.gstatic.com/firebasejs/9.23.0/firebase-firestore.js";
import { getStorage, ref as sRef, uploadBytes, getDownloadURL } from "https://www.gstatic.com/firebasejs/9.23.0/firebase-storage.js";
import { getAuth, onAuthStateChanged } from "https://www.gstatic.com/firebasejs/9.23.0/firebase-auth.js";
import { firebaseConfig } from "./firebase-config.js";

let app, db, storage, auth;

export async function fetchAllProducts(){
  app = app || initializeApp(firebaseConfig);
  db = db || getFirestore(app);
  const q = query(collection(db, 'products'), orderBy('createdAt','desc'));
  const snap = await getDocs(q);
  return snap.docs.map(d => ({ id: d.id, ...d.data() }));
}

export async function fetchFeatured(){
  const all = await fetchAllProducts();
  return all;
}

export function initProductsPage(){
  app = app || initializeApp(firebaseConfig);
  db = db || getFirestore(app);

  const grid = document.getElementById('products-grid');
  const search = document.getElementById('search');

  fetchAllProducts().then(list=>{
    renderProducts(list, grid);
    search.addEventListener('input', ()=> {
      const q = search.value.toLowerCase();
      renderProducts(list.filter(p => p.title.toLowerCase().includes(q)), grid);
    });
  });
}

function renderProducts(list, container){
  container.innerHTML = '';
  list.forEach(p=>{
    const card = document.createElement('div');
    card.className = 'card';
    card.innerHTML = `
      <img src="${p.image || 'assets/product_male_back.jpg'}" class="product-img"/>
      <div class="product-title">${p.title}</div>
      <div class="product-price">R$ ${Number(p.price).toFixed(2)}</div>
      <div class="product-stock">${p.stock > 0 ? 'Em estoque: ' + p.stock : '<strong>Sem estoque</strong>'}</div>
      <button class="btn buy-btn" data-id="${p.id}" ${p.stock <= 0 ? 'disabled': ''}>Comprar</button>
    `;
    container.appendChild(card);
  });
}

export function initAdminPage(){
  app = app || initializeApp(firebaseConfig);
  db = db || getFirestore(app);
  storage = storage || getStorage(app);
  auth = auth || getAuth(app);

  onAuthStateChanged(auth, user=>{
    if(!user){
      alert('Acesso apenas para administradores. Faça login.');
      location.href = 'login.html';
    }
  });

  const form = document.getElementById('product-form');
  const msg = document.getElementById('admin-msg');
  form.addEventListener('submit', async (e)=>{
    e.preventDefault();
    try{
      const title = document.getElementById('title').value;
      const description = document.getElementById('description').value;
      const price = Number(document.getElementById('price').value);
      const stock = Number(document.getElementById('stock').value);
      const file = document.getElementById('image').files[0];

      const imgRef = sRef(storage, `products/${Date.now()}_${file.name}`);
      const snap = await uploadBytes(imgRef, file);
      const url = await getDownloadURL(snap.ref);

      await addDoc(collection(db, 'products'), {
        title, description, price, stock, image: url, createdAt: new Date()
      });

      msg.textContent = 'Produto adicionado!';
      form.reset();
    }catch(err){
      msg.textContent = 'Erro: ' + err.message;
    }
  });
}
