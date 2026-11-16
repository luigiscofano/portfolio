# Portfólio de Luigi Scofano de Araujo

Portfólio pessoal com página principal em português, inglês e espanhol, desenvolvido em React, TypeScript e Next.js. A exportação estática é publicada no [GitHub Pages](https://luigiscofano.github.io/portfolio/), sob `/portfolio/`.

Não há autenticação, banco de dados, analytics ou serviço de envio de mensagens em execução no site. O contato usa `mailto:` e cópia de endereço. A [versão no Sites](https://luigi-scofano-portfolio.luigiscofano.chatgpt.site/) é independente: nenhuma das duas publicações sincroniza a outra.

## Desenvolvimento

Requisitos: Node.js 22.13.0 ou superior e npm. O workflow usa Node.js 22.

```sh
git clone https://github.com/luigiscofano/portfolio.git
cd portfolio
npm ci
npm run dev
```

Antes de propor uma publicação:

```sh
npm run validate
npm start
```

`npm run validate` reúne formatação, testes, lint, build, TypeScript e checagem dos arquivos exportados. `npm run format` formata o código ativo selecionado; revise o diff antes de publicar. O build gera `out/`. A prévia estática abre em `http://127.0.0.1:4173/portfolio/`. `typecheck` vem depois do build para incluir os tipos gerados pelo Next.js. Os testes automatizados não substituem revisão de teclado, leitura, downloads e layout no navegador. Consulte [validação](docs/VALIDACAO.md).

## Editar conteúdo

- `content/portfolio.json`: conteúdo em português, incluindo perfil, abertura em `profile.hero`, projetos, pesquisa, formação, trajetória, contato, navegação e data editorial `updated`.
- `content/portfolio.en.json` e `content/portfolio.es.json`: versões inglesa e espanhola com a mesma estrutura. Atualize os três arquivos quando um fato mudar.
- `content/ui.en.json` e `content/ui.es.json`: traduções de rótulos da interface, usando o texto português como chave. Um rótulo sem tradução recai no português.
- `content/project-cases.json`: estudos de caso de Intuição, Tupi e GestureLab, em português, inglês e espanhol, com problema, contribuição, decisões técnicas, reprodução, limites e links de evidência.
- `content/credits.json`: créditos e licenças nos três idiomas.
- `public/images/`: imagens locais. Os JSONs usam caminhos como `/images/foto.jpg`; a aplicação acrescenta o prefixo `/portfolio`.
- `public/documents/`: currículos português e inglês em PDF. O DOCX português sanitizado permanece preservado no repositório, sem ser o download principal. O PDF inglês é uma tradução da edição portuguesa de novembro de 2026. Não atualize datas ou conteúdos por inferência.

Ao incluir um projeto, mantenha um `id` único, autoria e limitações explícitas, links verificáveis e uma das categorias internas `IA`, `Dados`, `Software` ou `Hardware`. Revise também a apresentação de ícones/cores e os destaques quando necessário. O catálogo atual reúne 14 projetos públicos, com busca sem distinção de acentos e filtros por área. Imagens, autoria e limites são acessíveis em detalhes expansíveis. Veja a [reformulação editorial e suas fontes](docs/REFORMULACAO-EDITORIAL.md).

`showImagePreview` permanece desativado nos cartões: não mostramos mockups de interfaces. A pedido do autor, capturas reais e resultados verificáveis ficam em uma galeria expansível separada (`content/project-gallery.json`), com origem e legendas PT/EN/ES. Veja [galeria real e limites](docs/GALERIA-REAL.md). Logos próprias verificadas (Intuição, Pokédex, GestureLab e Trilha Viva) aparecem primeiro nos cartões; gráficos, capas e diagramas documentais permanecem nos detalhes. `imageKind` distingue `logo`, `document` e `none`. Quando não há arte adequada, `imageOmissionReason` registra o motivo, sem inventar uma marca. A logo B/Páginas do Trilha Viva usa o mesmo recorte CSS do projeto de origem.

A foto atual é `public/images/luigi-original.jpg`, original de 1152 × 1536 px, enquadrado por CSS. `profile.nameSprite.enabled` está desativado nos três idiomas: o bem-te-vi não aparece junto ao nome. A assinatura independente com folhas permanece habilitada por `visualSignature`, na lateral e no rodapé. Ativos e créditos históricos foram preservados.

O seletor de idioma aceita `?lang=pt`, `?lang=en` e `?lang=es` e salva uma preferência local quando disponível. Os currículos disponíveis são português e inglês: PT e ES exibem o PDF português primeiro; EN prioriza o inglês. Não há PDF espanhol. A introdução inglesa explica Poli-USP e Tupi Antigo para leitores internacionais. A página `/creditos/` acompanha o idioma selecionado e preserva essa escolha no link de retorno. O [guia de manutenção](docs/COMO-ATUALIZAR.md) fica apenas no repositório. Consulte [idiomas e acessibilidade](docs/IDIOMAS-E-ACESSIBILIDADE.md) para detalhes e cuidados com os currículos.

O destaque de Intuição separa “Experimentar” e “Ver código”. O link “Mais sobre mim” abre os detalhes da biografia. O exemplo de pesquisa em `components/portfolio/research-example.tsx` usa “casa” → “c8sa” → “casa” para explicar extração e revisão: é uma simulação em português, não um verbete Tupi nem um resultado real de OCR. Preserve esse aviso e os links às fontes primárias ao editar.

## Publicação manual

1. Revise código, conteúdo, privacidade dos documentos e resultados dos testes. Obtenha autorização antes de enviar/publicar alterações em nome do titular.
2. No repositório `luigiscofano/portfolio`, configure Settings → Pages → **GitHub Actions**.
3. Execute manualmente **Publish portfolio to GitHub Pages**, na aba Actions.
4. O workflow instala dependências, executa `npm run validate` e publica somente `out/`.
5. Confira a execução e teste a URL pública, inclusive recarga direta das páginas auxiliares e os dois downloads.

Pushes não disparam o workflow. O build não exige servidor Node.js, Cloudflare ou banco de dados em produção. As rotas são `/portfolio/` e `/portfolio/creditos/`. Não salve tokens ou outros segredos no repositório.

## Documentação

- [Arquitetura e estrutura](docs/ARQUITETURA.md)
- [Design vigente e histórico visual](docs/DESIGN.md)
- [Fontes, imagens e limites editoriais](docs/FONTES.md)
- [Idiomas, acessibilidade e currículos](docs/IDIOMAS-E-ACESSIBILIDADE.md)
- [Arquivos e manutenção das três traduções](docs/IDIOMAS.md)
- [Validação e roteiro de revisão](docs/VALIDACAO.md)

O visual atual usa Quicksand nos textos e Playfair Display nos títulos, hospedadas localmente com suas licenças. A direção editorial combina branco, cinza claro e azul, aproximando-se da referência de Artur Jordão sem copiar seu conteúdo. Os ícones locais de Font Awesome Free 6 têm atribuições em `/creditos/` e licenças em `public/licenses/`.

© 2026 Luigi Scofano de Araujo, quanto ao conteúdo original de sua autoria. Recursos de terceiros conservam seus próprios direitos e licenças. Consulte [COPYRIGHT.md](COPYRIGHT.md).

## Imagens e mapas visuais

As logos verificadas abrem os cartões; outras imagens documentais ficam nos detalhes para manter a entrada leve. As origens e classificações estão em [Imagens dos projetos](docs/IMAGENS-DOS-PROJETOS.md). Pesquisa, formação e trajetória possuem mapas informativos opcionais, não fotografias ou endossos institucionais. Para regenerar as versões PT/EN depois de editar seus dados, execute `node scripts/generate-section-visuals.mjs`. O script ainda gera somente português e inglês. Os mapas espanhóis `public/images/sections/*-es.svg` foram traduzidos manualmente, mantendo a mesma composição; atualize-os e revise seus textos separadamente quando as informações mudarem.

## Assinatura visual pessoal

![Bem-te-vi em pixel art sobre um ramo com folhas](public/images/assinatura-bem-te-vi.svg)

A assinatura reúne um bem-te-vi em pixel art e um ramo de folhas em verde discreto. Ela acompanha o perfil na barra lateral e reaparece na área de contato, sem substituir o nome ou servir como controle de navegação. O pássaro, suas cores, proporções e o desenho do ramo são preservados. As patas do pássaro são preservadas integralmente. Apenas as hastes verdes das folhas são limitadas à curva do galho de apoio, sem atravessá-lo.

O [SVG da assinatura](public/images/assinatura-bem-te-vi.svg) é local, leve e sem scripts. As instâncias no site mantêm texto alternativo e dimensões responsivas. Essa composição é distinta do atlas original do jogo Sintonia, preservado separadamente em `public/images/sintonia/`.

### Marcas institucionais nos projetos

Projetos acadêmicos sem marca própria apresentam as marcas oficiais da unidade correspondente e da USP, apenas quando o vínculo está documentado. Essa identificação indica contexto acadêmico, não autoria institucional ou endosso. Logos próprias continuam prioritárias. Consulte [fontes, critérios e arquivos](docs/MARCAS-INSTITUCIONAIS.md).

### Conteúdo e microinterações

Formação e trajetória descrevem contribuições verificadas no perfil público, sem métricas inventadas nem divulgação de materiais internos. Detalhes acadêmicos permanecem nos painéis expansíveis. Os controles possuem respostas discretas a hover, foco e pressionamento, sem animações contínuas. A preferência por movimento reduzido elimina transformações e transições; foco e rótulos continuam disponíveis no teclado e no toque.

A [biblioteca visual do Intuição](docs/ARTE-DOS-PROJETOS.md) apresenta a capa real do manual, AIIJs e mascotes originais, dentro de uma seção expansível. Logos próprias continuam prioritárias. Não são capturas de interface. Controles desktop usam espaçamento mais compacto somente com ponteiro fino; alvos de toque permanecem preservados.

### Galerias reais e acesso ao currículo

Todos os projetos têm uma seção **Imagens reais do projeto**, aberta sob demanda. Intuição tem cinco imagens e Pokédex tem quatro; registros históricos da Pokédex são identificados, sem confundi-los com a interface atual. As lacunas de outros projetos são documentadas, sem usar prévias como se fossem execução real. Consulte [cobertura, fontes e pendências das galerias](docs/galerias-reais.md). Os PDFs do currículo permanecem acessíveis fora de “Mais sobre mim”.

## Marca da Pokédex: Rota 001

![Insígnia aprovada Rota 001, com grama alta e trilha dourada](public/images/projects/pokedex-rota-001.png)

A identidade aprovada em 16/11/2026 substitui o ícone anterior na apresentação da Pokédex no portfólio. A insígnia combina grama alta em pixel art, uma trilha dourada e uma placa vermelha. A arte original, com transparência, foi preservada sem redesenho ou alteração de proporções. É uma marca do projeto de fã, não uma marca oficial de Pokémon.

O catálogo em português, inglês e espanhol usa a mesma arte e identifica o projeto como **Pokédex · Rota 001**. A troca não modifica o favicon bem-te-vi, a assinatura visual do portfólio, as galerias históricas nem as funcionalidades dos projetos. Veja a [documentação da marca](docs/MARCA-ROTA-001.md) e o [repositório da Pokédex](https://github.com/luigiscofano/Pokedex).

## Imagens técnicas do LabDig

A [galeria documental do LabDig](docs/labdig-galeria.md) reúne as três capturas de apresentação e quatro novas imagens distintas: Verilog UART, quadro serial, telemetria e máquina de estados do sonar. Cada imagem tem fonte versionada e legenda em três idiomas; diagramas não são apresentados como medições ou fotos de hardware.
