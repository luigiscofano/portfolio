# Portfólio de Luigi Scofano de Araujo

Portfólio pessoal com página principal em português e inglês, desenvolvido em React, TypeScript e Next.js. A exportação estática é publicada no [GitHub Pages](https://luigiscofano.github.io/portfolio/), sob `/portfolio/`.

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
- `content/portfolio.en.json`: versão inglesa com a mesma estrutura. Atualize os dois arquivos quando um fato mudar.
- `content/ui.en.json`: traduções de rótulos da interface, usando o texto português como chave. Um rótulo sem tradução recai no português.
- `content/project-cases.json`: estudos de caso de Intuição, Tupi e GestureLab, em português e inglês, com problema, contribuição, decisões técnicas, reprodução, limites e links de evidência.
- `public/images/`: imagens locais. Os JSONs usam caminhos como `/images/foto.jpg`; a aplicação acrescenta o prefixo `/portfolio`.
- `public/documents/`: currículos português e inglês em PDF. O DOCX português sanitizado permanece preservado no repositório, sem ser o download principal. O PDF inglês é uma tradução da edição portuguesa de novembro de 2026. Não atualize datas ou conteúdos por inferência.

Ao incluir um projeto, mantenha um `id` único, autoria e limitações explícitas, links verificáveis e uma das categorias internas `IA`, `Dados`, `Software` ou `Hardware`. Revise também a apresentação de ícones/cores e os destaques quando necessário. O catálogo atual reúne 14 projetos públicos, com busca sem distinção de acentos e filtros por área. Imagens, autoria e limites são acessíveis em detalhes expansíveis. Veja a [reformulação editorial e suas fontes](docs/REFORMULACAO-EDITORIAL.md).

`showImagePreview` controla a captura no card. Mantenha `image`, `imageAlt`, `caption`, `imageSource`, `imageWidth` e `imageHeight` coerentes. Intuição usa uma página do ícones originais; Tupi, a capa documental original; Kaggle, uma ilustração didática; GestureLab, uma prévia sintética; Pokédex, uma captura real. LabDig mostra uma captura real do README, como documentação do acervo, não como validação de hardware. Não apresente ilustrações ou dados sintéticos como resultados experimentais.

A foto atual é `public/images/luigi-original.jpg`, original de 1152 × 1536 px, enquadrado por CSS. `profile.nameSprite.enabled` está desativado nos dois idiomas: o bem-te-vi não aparece junto ao nome. A assinatura independente com folhas permanece habilitada por `visualSignature`, na lateral e no rodapé. Ativos e créditos históricos foram preservados.

O seletor de idioma aceita `?lang=en` e `?lang=pt` e salva uma preferência local quando disponível. A ordem dos currículos prioriza o PDF do idioma selecionado. A introdução inglesa explica Poli-USP e Tupi Antigo para leitores internacionais. A página `/creditos/` permanece em português. O [guia de manutenção](docs/COMO-ATUALIZAR.md) fica apenas no repositório. Consulte [idiomas e acessibilidade](docs/IDIOMAS-E-ACESSIBILIDADE.md) para detalhes e cuidados com os currículos.

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
- [Validação e roteiro de revisão](docs/VALIDACAO.md)

O visual atual usa Quicksand nos textos e Playfair Display nos títulos, hospedadas localmente com suas licenças. A direção editorial combina branco, cinza claro e azul, aproximando-se da referência de Artur Jordão sem copiar seu conteúdo. Os ícones locais de Font Awesome Free 6 têm atribuições em `/creditos/` e licenças em `public/licenses/`.

© 2026 Luigi Scofano de Araujo, quanto ao conteúdo original de sua autoria. Recursos de terceiros conservam seus próprios direitos e licenças. Consulte [COPYRIGHT.md](COPYRIGHT.md).

## Imagens e mapas visuais

As imagens dos projetos ficam nos seus detalhes para manter a entrada leve. As origens e classificações estão em [Imagens dos projetos](docs/IMAGENS-DOS-PROJETOS.md). Pesquisa, formação e trajetória possuem mapas informativos opcionais, não fotografias ou endossos institucionais. Para regenerá-los depois de editar os dados PT/EN, execute `node scripts/generate-section-visuals.mjs`.

## Assinatura visual pessoal

![Bem-te-vi em pixel art sobre um ramo com folhas](public/images/assinatura-bem-te-vi.svg)

A assinatura reúne um bem-te-vi em pixel art e um ramo de folhas em verde discreto. Ela acompanha o perfil na barra lateral e reaparece na área de contato, sem substituir o nome ou servir como controle de navegação. O pássaro, suas cores, proporções e o desenho do ramo são preservados. Um recorte vetorial acompanha a curva do galho somente para impedir que pixels dos pés avancem abaixo dele.

O [SVG da assinatura](public/images/assinatura-bem-te-vi.svg) é local, leve e sem scripts. As instâncias no site mantêm texto alternativo e dimensões responsivas. Essa composição é distinta do atlas original do jogo Sintonia, preservado separadamente em `public/images/sintonia/`.
