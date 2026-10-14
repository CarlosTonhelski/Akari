# AKARI — Asian Culinary Experience

Site estático de culinária oriental: receitas com filtros e busca, países e culturas, galeria de pratos,
ingredientes e técnicas, questionário "Qual sabor oriental combina com você?", página Sobre, contato com
validação e página 404.

Não precisa de instalação nem de build: são arquivos HTML, CSS e JavaScript prontos para servir.

## Rodar na sua máquina

Abra um terminal **dentro desta pasta** e use um destes comandos:

```bash
# Python 3 (já vem no macOS e na maioria dos Linux)
python3 -m http.server 8000

# ou, se você tem Node.js
npx serve .
```

Depois acesse **http://localhost:8000** no navegador.

> Dá para abrir o `index.html` com dois cliques, mas um servidor local é mais fiel ao comportamento online.

## Publicar no GitHub Pages

1. Crie um repositório no GitHub (por exemplo, `akari`).
2. Envie os arquivos desta pasta para a raiz do repositório:
   ```bash
   git init
   git add .
   git commit -m "Site AKARI"
   git branch -M main
   git remote add origin https://github.com/SEU-USUARIO/akari.git
   git push -u origin main
   ```
   (Ou, sem terminal: no repositório, **Add file → Upload files** e arraste o conteúdo da pasta.)
3. No repositório, vá em **Settings → Pages**.
4. Em **Build and deployment → Source**, escolha **Deploy from a branch**, branch **main**, pasta **/ (root)**, e salve.
5. Em um ou dois minutos o site estará em `https://SEU-USUARIO.github.io/akari/`.

O arquivo `.nojekyll` evita que o GitHub processe os arquivos, e o `404.html` manda endereços inexistentes
para a página 404 do próprio site.

## Estrutura

```
index.html                  Cabeçalho, metadados e a estrutura (template) de todas as páginas
404.html                    Redirecionamento de endereços inexistentes (GitHub Pages)
favicon.svg
assets/css/styles.css       Identidade visual, layout responsivo e animações
assets/js/data.js           Conteúdo: 19 receitas, 5 países, 10 ingredientes, 4 técnicas, questionário
assets/js/app.js            Lógica: rotas, filtros, modal de receita, questionário, formulários
assets/js/runtime.js        Mini motor de templates ({{ }}, <sc-if>, <sc-for>) sobre React
assets/js/vendor/           React 18.3.1 + ReactDOM (MIT), incluído localmente — sem CDN
assets/img/                 29 ilustrações originais em SVG (pratos e ingredientes)
```

## Como editar

- **Textos e receitas:** `assets/js/data.js`. Cada receita tem título, país, categoria, tempo, dificuldade,
  ingredientes, passos, dica do chef e sugestão de apresentação. As listas, filtros, contadores e o
  questionário se atualizam sozinhos.
- **Trocar ilustrações por fotos:** coloque a foto em `assets/img/` e troque o nome do arquivo no mapa `IMG`
  no topo de `data.js` (ou no `src` correspondente em `index.html`). Fotos quadradas ou 4:3 funcionam melhor.
- **Cores e fontes:** variáveis no topo de `assets/css/styles.css` (`--ink`, `--red`, `--rice`, `--gold`…).
- **Textos fixos das páginas:** dentro de `<template id="app-template">` em `index.html`.

## Endereços

O site usa rotas com `#`, que funcionam em qualquer hospedagem estática:
`#/receitas`, `#/receitas/pad-thai` (abre a receita), `#/culturas/coreia`, `#/destaques`, `#/ingredientes`,
`#/experiencia`, `#/sobre`, `#/contato`. Qualquer outro endereço mostra a página 404.

## O que é demonstração

- **Formulário de contato e newsletter:** a validação é real, mas não existe servidor, então nada é enviado
  nem armazenado — o próprio site avisa isso. Para envios reais, conecte o formulário a um serviço
  (por exemplo Formspree, Netlify Forms ou uma API própria) na função `submit` em `app.js`.
- **Redes sociais:** os perfis são fictícios e aparecem como demonstrativos.
- **AKARI** é uma marca fictícia. As receitas e informações culturais são reais e testáveis em casa.

## Acessibilidade e desempenho

Navegação por teclado, foco visível, labels nos campos, `aria-*` em abas, modal e menu, textos alternativos
nas imagens e respeito a `prefers-reduced-motion`. Imagens com `loading="lazy"`; animações de rolagem usam
CSS nativo (scroll-driven animations) quando o navegador suporta.
