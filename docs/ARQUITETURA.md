# Arquitetura e manutenção

## Aplicação publicada

O portfólio usa Next.js, React e TypeScript, com `output: "export"` em `next.config.ts`. O build produz HTML, CSS, JavaScript e ativos em `out/`. GitHub Pages entrega esses arquivos sob `/portfolio/`, com barras finais nas rotas.

Não há servidor de aplicação, autenticação, banco de dados ou envio de mensagens em execução no Pages. O navegador mantém apenas estados de interface e, quando permitido, a preferência de idioma em armazenamento local. Os contatos abrem `mailto:` ou copiam um endereço; não transmitem uma mensagem pelo site.

A página principal é pré-renderizada em português e hidratada para oferecer filtros, acordeão, menu, cópia de e-mail e seleção de idioma. Créditos e instruções são páginas auxiliares em português. Não existe CMS nem salvamento de conteúdo pelo site.

## Código ativo

- `app/layout.tsx`: estrutura HTML inicial, descrição e metadados gerais, favicon e importação do CSS.
- `app/page.tsx`: composição da página principal e de suas seções, com estados de filtro e acordeão.
- `app/globals.css`: identidade editorial, variáveis de cor e tipografia, componentes visuais, foco e regras responsivas.
- `app/atualizar/page.tsx` e `app/creditos/page.tsx`: páginas auxiliares.
- `components/portfolio/icon.tsx`: renderização dos ícones locais definidos em `content/icons.json`.
- `components/portfolio/profile-name.tsx`: nome completo e suporte ao sprite opcional, atualmente desativado.
- `components/portfolio/project-card.tsx`: card de projeto, captura opcional, links, tecnologias, autoria e limites.
- `hooks/use-portfolio-language.ts`: seleção de conteúdo, tradução dos rótulos, preferência local, parâmetro de URL e idioma do documento.
- `hooks/use-section-navigation.ts`: seção ativa, navegação e comportamento do menu móvel.
- `hooks/use-email-copy.ts`: cópia de e-mail e feedback, incluindo falha de permissão.
- `lib/portfolio.ts`: atributos compartilhados para links externos.
- `lib/project-presentation.mjs`: ícones e cores dos projetos, com apresentação padrão segura para novos IDs.
- `lib/site-path.ts`: prefixo dos caminhos de ativos e links locais.

Os destaques da abertura dependem dos IDs editoriais de projetos, como `tupi` e `intuicao`. Ao alterar o catálogo, revise também a composição dos destaques, ícones, cores e testes. Um fallback de apresentação não substitui essa revisão editorial.

## Conteúdo e ativos

Os JSONs `content/portfolio.json` e `content/portfolio.en.json` compartilham estrutura, IDs e referências de arquivos, mas contêm textos em idiomas diferentes. `content/ui.en.json` traduz rótulos portugueses usados pela interface; chaves ausentes recaem no português.

`public/images/` contém foto original, capturas, diagramas e assinatura. `public/documents/` contém apenas as versões de currículo destinadas à distribuição pública. `public/fonts/` preserva fontes de uma revisão anterior; o CSS vigente usa fontes de sistema. `public/licenses/` guarda atribuições e licenças dos recursos correspondentes.

Dados no JSON usam caminhos a partir de `public/`, como `/images/luigi-original.jpg`, sem o prefixo do repositório. A renderização aplica `sitePath`. Se o nome do repositório mudar, revise `next.config.ts`, `lib/site-path.ts`, metadados/favicon, servidor de prévia, testes e quaisquer caminhos absolutos no CSS. Não substitua caminhos indiscriminadamente dentro de URLs externas.

A foto original tem 1152 × 1536 px e é enquadrada por CSS, sem alteração semântica. O sprite junto ao nome está desativado, mas seu arquivo e os créditos permanecem. A assinatura independente de bem-te-vi com folhas continua habilitada. Currículos português e inglês são documentos de épocas distintas, preservados após remoção dos dados pessoais indicados em [IDIOMAS-E-ACESSIBILIDADE.md](IDIOMAS-E-ACESSIBILIDADE.md).

## Build, testes e publicação

- `package.json` e `package-lock.json`: comandos e dependências reproduzíveis por `npm ci`.
- `tests/`: testes Node.js de conteúdo, contratos de interface, idiomas, integridade de arquivos e exportação estática.
- `scripts/check-export.mjs`: checagem Node.js da saída real, incluindo rotas, arquivos locais referenciados e IDs únicos, executada por `npm run check:export` depois do build. Não exercita interações de navegador.
- `qa/check-export.py`: verificador anterior, preservado; não é o comando usado pelo workflow atual.
- `scripts/serve-static.mjs`: prévia local de `out/`, por padrão em `127.0.0.1:4173/portfolio/`.
- `.github/workflows/pages.yml`: publicação por acionamento manual, com verificações antes de enviar o artefato `out/` ao Pages.

`npm run validate` reúne formatação, testes, lint, build, TypeScript e checagem da exportação. `format` e `format:check` aplicam Prettier a uma seleção explícita de arquivos ativos, preservando arquivos legados fora dessa lista.

Consulte os comandos e limites em [VALIDACAO.md](VALIDACAO.md). A presença de código ou documentação local não comprova publicação. O workflow precisa concluir para que o endereço público receba a revisão.

## Infraestrutura legada preservada

O repositório nasceu de uma exportação de Sites. Por isso ainda contém arquivos de integração, como `vite.config.ts`, `worker/`, `vendor/`, auxiliares de conectores, `app/chatgpt-auth.ts`, configurações Cloudflare, `db/`, `drizzle/` e scripts de instalação/ambiente. Também há componentes genéricos que não são usados pela página principal.

Esses arquivos não constituem autenticação ou banco de dados ativo na publicação estática. Não os trate como um segundo backend em produção. A preservação evita apagar dependências de preparação ou integração sem rastrear seu uso; qualquer remoção futura deve conferir imports, scripts e ambientes, atualizar o lockfile e repetir as validações.

O Site original e o GitHub Pages são destinos independentes. Publicar em um não atualiza o outro.

## Desempenho e limites

A entrega estática dispensa um servidor de aplicação. A página usa fontes de sistema, imagens locais, dimensões declaradas e carregamento tardio em imagens secundárias. Isso não representa uma medição de velocidade nem garantia de uma pontuação de desempenho.

`images.unoptimized` está habilitado: não há serviço de otimização de imagens do Next.js em produção. A foto original e demais arquivos são entregues como preparados no repositório. Os dois idiomas são importados pela aplicação, e a seleção inglesa ocorre após a hidratação. Não há alegação de otimização automática, auditoria completa ou compatibilidade comprovada em todos os dispositivos.
