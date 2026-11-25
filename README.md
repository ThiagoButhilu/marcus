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

## Calculadoras de treino

A seção "Quanto você treina de verdade?" (`src/calculator.js`) tem cinco abas.
As três primeiras seguem o post do Marcus sobre volume para hipertrofia: séries por músculo (comparadas com uma faixa de referência),
volume da sessão (séries × repetições × carga de cada exercício, somados) e volume da semana
(séries × repetições × carga × número de exercícios × treinos por semana).
A faixa de cada músculo fica em `MUSCLES`, em `src/data.js`. Hoje todas usam a referência geral de 10 a 20 séries semanais;
troque pelos números do Marcus quando ele mandar.

As duas últimas seguem a planilha do Marcus (aba "Teste de TLim; iVVO2 Máx; 2400"):
- Teste de 2400 m: ritmo, velocidade e tempo-alvo dos tiros de 400, 800 e 1200 m (`RUN_SPLITS` em `src/data.js`).
  Três células da planilha usam B57 no lugar de B47 (os segundos) e erram o ritmo, a velocidade e a base do 800 m; o site usa a conta certa.
- HIIT: tempo total de tiros = 3 × Tempo Limite (`HIIT_EFFORT_X`), dividido pela duração do tiro e arredondado;
  o descanso sai da relação recuperação:esforço (`HIIT_RATIOS`, a lista da planilha).

Os nomes dos músculos e os textos ficam em `src/content/`.

## Página de planos

`planos.html` (script em `src/planos.js`) mostra os planos do "Programa de Condicionamento Físico e Nutricional" (versão 2026):
montador de plano com valor na hora e botão que abre o WhatsApp com o plano escolhido, tabela completa, fases do programa,
parceiros, locais e regras. Valores em `PLANS` (`src/data.js`); textos em `src/content/planos.pt.js` e `planos.en.js`.
O `vite.config.js` gera as duas páginas na build. A landing leva para ela pelo menu, pela pergunta "Quanto custa?" e pela seção de contato.

## Pagamento (Asaas)

O site não processa pagamento: o botão "Pagar agora" da página de planos abre o Link de Pagamento do Asaas do plano escolhido.
Os links ficam em `PAY_LINKS`, em `src/data.js`, um por formato e opção. Opção sem link continua com o botão do WhatsApp,
então dá para ligar os links aos poucos. Small Group e treino em dupla vão sempre para o WhatsApp (turma e valor do segundo aluno são combinados antes).

Links a criar no painel do Asaas (Cobranças → Link de pagamento), com o nome do código para identificar o plano:

| Chave em `PAY_LINKS` | Plano | Valor |
|---|---|---|
| `A.2:8`, `A.2:10`, `A.2:12` | Personal Trainer por videoconferência, 8/10/12 sessões | R$ 920 / 1.150 / 1.380 |
| `A.1:8`, `A.1:10`, `A.1:12` | Personal Trainer presencial, 8/10/12 sessões | R$ 920 / 1.150 / 1.380 |
| `C.1:mensal`, `C.1:trimestral`, `C.1:anual` | Consultoria Personal Trainer | R$ 345 / 316 / 290 por mês |
| `D.1:mensal`, `D.1:trimestral`, `D.1:anual` | Consultoria Físico + Nutricional | R$ 845 / 716 / 690 por mês |

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

O fundo do herói é o vídeo do Marcus subindo a estrada ("Santa Leopoldina - Filme Lento"), que anda quadro a quadro com a rolagem (`src/hero.js`).
São duas versões em `src/assets/`: `hero-marcus-mobile.mp4` (vertical, inteira) e `hero-marcus-desktop.mp4` (recorte quadrado; o enquadramento sobe junto com ele na rolagem), cada uma com o seu pôster `.jpg`.
Ambas foram cortadas em 23,5 s, a 15 quadros por segundo, sem áudio, com duotone preto/petróleo e um keyframe a cada 3 quadros para a rolagem responder rápido.
Com movimento reduzido ou economia de dados ativada, fica só o pôster.

Os pilares usam fotos do Marcus (`src/assets/pilar-*.webp`); o ponto da foto que fica sempre à vista é o `pos` de cada pilar em `src/data.js`.
Os cartões de reel do baralho levam para os vídeos no Instagram (links em `REELS`, em `src/data.js`).
O baralho do Instagram tem também o vídeo "Força na ladeira" (`reel-ladeira.mp4`, mudo, em loop enquanto está na tela) e as fotos `foto-pb.webp` e `foto-costas.webp`.
A fonte de corpo é Glacial Indifference; como ela não está no Google Fonts, o site usa Jost quando ela não está instalada.

## GitHub Pages

O workflow em `.github/workflows/deploy.yml` não usa actions de terceiros (só `git` e `npm`).
A cada push na branch `main` ele gera a build e publica na branch `gh-pages`.

1. Suba o projeto para um repositório no GitHub.
2. Espere o workflow terminar na aba **Actions** (ele cria a branch `gh-pages`).
3. Em **Settings → Pages**, escolha **Deploy from a branch**, branch `gh-pages`, pasta `/ (root)`.

O site fica em `https://SEU-USUARIO.github.io/NOME-DO-REPOSITORIO/`. Os caminhos são relativos (`base: './'`), então funciona em qualquer subpasta.
