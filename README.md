# Marcus Thomaz, personal trainer

Landing page feita a partir do perfil [@personal.marcusthomaz](https://www.instagram.com/personal.marcusthomaz/).
Vite + Tailwind CSS v4 + motion, JavaScript puro.

```bash
npm install
npm run dev      # http://localhost:5173
npm run build    # gera a pasta dist
```

## Onde mudar o conteúdo

Os textos ficam em `src/content/`: `pt.js` (português, padrão) e `en.js` (inglês), com a mesma estrutura.
`src/data.js` guarda o que não muda de idioma: WhatsApp, Instagram, cores dos pilares e números das barras.
Os textos fixos do `index.html` estão em português; a versão em inglês deles fica no `STATIC` de `en.js`, com o texto em português como chave.
Se mudar um texto no HTML, atualize a chave no `STATIC` também, senão ele aparece em português no site em inglês.

## Idiomas

O seletor PT | EN fica no topo. A escolha fica salva no navegador; `?lang=en` (ou `?lang=pt`) na URL força um idioma, bom para mandar o link.
Sem escolha salva, quem usa o navegador em português vê português e os demais veem inglês.
Trocar de idioma recarrega a página. Os posts do Instagram no baralho são imagens com texto em português; o texto alternativo deles avisa isso em inglês.

## Identidade visual

A foto do Marcus no centro da roda de bicicleta é `public/marcus.webp` (`photo: 'marcus.webp'` em `SITE`). Com `photo: ''` volta o logo MT.
As fotos dele pedalando ficam em `src/assets/foto-*.webp` e aparecem no baralho da seção Instagram.

Cores e fontes do mídia kit ficam no topo de `src/style.css` (`@theme`). Logo e posts do Instagram ficam em `src/assets/`:
`marca.png` é o logo sem "Personal Trainer" (usado no topo como máscara, herda a cor da seção), `logo.png` / `logo-claro.png` são o logo completo
e `post-*.webp` são os banners que aparecem no baralho da seção Instagram (`src/deck.js`).

O fundo do herói é `src/assets/hero-subida.mp4` (com o pôster `hero-subida.jpg`): o vídeo anda quadro a quadro com a rolagem (`src/hero.js`).
Fonte: "Cyclist Climbing Mauna Kea in Hawaii", de Tiago Espindola de Oliveira, na Pexels (pexels.com/video/31312083), licença Pexels (uso livre, sem crédito obrigatório).
Ele foi cortado nos 10 primeiros segundos, reduzido para 1280px, sem áudio, com duotone preto/petróleo e um keyframe a cada 3 quadros para a rolagem responder rápido.
Com movimento reduzido ou economia de dados ativada, fica só o pôster.
A fonte de corpo é Glacial Indifference; como ela não está no Google Fonts, o site usa Jost quando ela não está instalada.

## GitHub Pages

O workflow em `.github/workflows/deploy.yml` não usa actions de terceiros (só `git` e `npm`).
A cada push na branch `main` ele gera a build e publica na branch `gh-pages`.

1. Suba o projeto para um repositório no GitHub.
2. Espere o workflow terminar na aba **Actions** (ele cria a branch `gh-pages`).
3. Em **Settings → Pages**, escolha **Deploy from a branch**, branch `gh-pages`, pasta `/ (root)`.

O site fica em `https://SEU-USUARIO.github.io/NOME-DO-REPOSITORIO/`. Os caminhos são relativos (`base: './'`), então funciona em qualquer subpasta.
