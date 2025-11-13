:root {
  --bege: #d9c9a3;
  --preto: #111;
  --branco: #fff;
  --cinza: #f4f4f4;
  --cinza-escuro: #444;
}

body {
  font-family: 'Poppins', sans-serif;
  margin: 0;
  background: var(--branco);
  color: var(--preto);
}

header {
  background: var(--preto);
  color: var(--branco);
  padding: 1rem 2rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.logo {
  font-weight: 700;
  font-size: 1.3rem;
  letter-spacing: 1px;
}

nav a {
  color: var(--branco);
  text-decoration: none;
  margin-left: 1.5rem;
  transition: color 0.3s;
}

nav a:hover,
nav a.ativo {
  color: var(--bege);
}

.hero {
  text-align: center;
  padding: 5rem 1rem;
  background: var(--bege);
  color: var(--preto);
}

.hero h1 {
  font-size: 2.5rem;
}

.botao {
  display: inline-block;
  background: var(--preto);
  color: var(--branco);
  padding: 0.75rem 1.5rem;
  margin-top: 1rem;
  border-radius: 5px;
  text-decoration: none;
  transition: 0.3s;
}

.botao:hover {
  background: var(--cinza-escuro);
}

.sobre {
  padding: 3rem 1rem;
  max-width: 800px;
  margin: 0 auto;
  text-align: center;
}

.produtos {
  padding: 3rem 1rem;
  text-align: center;
}

.grade {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
  gap: 2rem;
  max-width: 1000px;
  margin: 2rem auto;
}

.item {
  background: var(--cinza);
  border-radius: 8px;
  padding: 1rem;
  transition: 0.3s;
}

.item:hover {
  transform: translateY(-5px);
}

.item img {
  width: 100%;
  border-radius: 6px;
}

.item h3 {
  margin: 0.5rem 0;
}

.contato {
  max-width: 600px;
  margin: 3rem auto;
  padding: 1rem;
  text-align: center;
}

form {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

input, textarea {
  padding: 0.75rem;
  border: 1px solid var(--cinza-escuro);
  border-radius: 5px;
  font-family: inherit;
}

footer {
  background: var(--preto);
  color: var(--branco);
  text-align: center;
  padding: 1.5rem;
  margin-top: 3rem;
}
