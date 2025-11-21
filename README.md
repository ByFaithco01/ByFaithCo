# ByFaithCo - Site (Entrega Final)

Este ZIP contém o projeto completo do site ByFaithCo — loja cristã streetwear.
Ele inclui páginas estáticas, integração com Firebase (Auth, Firestore, Storage),
ícones SVG padrão, imagens que você enviou e arquivos de configuração para deploy.

## Estrutura
```
/
|— index.html
|— products.html
|— login.html
|— contact.html
|— admin.html
|— css/
|     └── styles.css
|— js/
|     ├── app.js
|     ├── products.js
|     └── firebase-config.js  (substituir com sua config)
|— assets/
|     ├── product_male_back.jpg
|     ├── product_female_front_back.jpg
|     └── product_beige_set.jpg
|— icons/
|     ├── search.svg
|     ├── cart.svg
|     ├── user.svg
|     └── mail.svg
|— firebase.json
|— firestore.rules
|— storage.rules
└— README.md
```

## O que você precisa fazer após baixar
1. Substituir `js/firebase-config.js` com os dados do seu projeto Firebase.
2. Revisar as regras em `firestore.rules` e `storage.rules` antes de publicar.
3. Escolher deploy:
   - **GitHub Pages** (bom para site estático) — siga os passos no README original.
   - **Firebase Hosting** (se quiser usar admin protegido e regras de segurança) — use `firebase init` e `firebase deploy`.

## Deploy rápido no Firebase Hosting
1. `npm install -g firebase-tools`
2. `firebase login`
3. `firebase init` → selecionar Hosting (usar project existente)
4. `firebase deploy`

Se quiser, eu já gero os arquivos `index.html`, `css/styles.css`, `js/*.js` e coloco tudo neste ZIP. Caso queira que eu altere algo (ex.: mudar textos, adicionar logo), envie o arquivo e eu atualizo o ZIP.

