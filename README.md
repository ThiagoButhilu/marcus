# Marcus Thomaz, personal trainer

Landing page feita a partir do perfil [@personal.marcusthomaz](https://www.instagram.com/personal.marcusthomaz/).
Vite + Tailwind CSS v4 + motion, JavaScript puro.

```bash
npm install
npm run dev      # http://localhost:5173
npm run build    # gera a pasta dist
```

## Onde mudar o conteúdo

Tudo fica em `src/data.js`: WhatsApp, Instagram, textos dos treinos, etapas, perguntas e sugestões de semana.
Os textos dos serviços são rascunhos baseados na bio do perfil; confirme com o Marcus antes de publicar.

Para usar a foto dele, coloque o arquivo em `public/` (por exemplo `public/marcus.jpg`) e escreva `photo: 'marcus.jpg'` em `SITE`.
A foto substitui o "MT" no centro da roda de bicicleta.

## GitHub Pages

O workflow em `.github/workflows/deploy.yml` não usa actions de terceiros (só `git` e `npm`).
A cada push na branch `main` ele gera a build e publica na branch `gh-pages`.

1. Suba o projeto para um repositório no GitHub.
2. Espere o workflow terminar na aba **Actions** (ele cria a branch `gh-pages`).
3. Em **Settings → Pages**, escolha **Deploy from a branch**, branch `gh-pages`, pasta `/ (root)`.

O site fica em `https://SEU-USUARIO.github.io/NOME-DO-REPOSITORIO/`. Os caminhos são relativos (`base: './'`), então funciona em qualquer subpasta.
