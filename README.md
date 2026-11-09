# Portfólio de Luigi Scofano de Araujo

Portfólio pessoal responsivo em português. Criado com React, TypeScript e Vinext; publicado no Sites com acesso público. Sem banco de dados, formulário de envio, analytics ou integrações com contas externas.

**[Abrir o portfólio](https://luigi-scofano-portfolio.luigiscofano.chatgpt.site/)**

## Atualizar conteúdo

Edite **content/portfolio.json**. O conteúdo está organizado em:

- `profile`: nome, apresentação (em `aboutOverview`), foto, contato e links.
- `navigation`: nomes e IDs das seções.
- `projects`: descrição, tecnologias, autoria, limites, repositório, demonstração e imagem.
- `research`: iniciativas de pesquisa e respectivos links.
- `education`: formação, instituição e estado atual.
- `experience`: experiências e descrições, sem datas ou cargos presumidos.
- `skills`: síntese de áreas de trabalho.
- `updated`: mês e ano da revisão mostrados no rodapé.

Imagens ficam em `public/images/`. Use caminhos como `/images/foto.webp` e texto alternativo descritivo. Registre a fonte em `docs/FONTES.md`. Preserve créditos de terceiros e não publique informação privada.

Para adicionar um projeto, copie uma entrada de `projects`, altere seu `id` único, textos, links e `category` (`IA`, `Dados`, `Software` ou `Hardware`). Imagem, demo e campos relacionados podem ficar vazios quando não houver material real. Não apresente ilustração ou dados sintéticos como evidência experimental.

O guia `/atualizar` também explica como pedir atualizações pela conversa do ChatGPT. Não existe CMS nem editor com salvamento local. Conteúdo alterado precisa de uma nova publicação para aparecer na URL.

## Desenvolvimento e validação

Requisitos: Node.js 22.13.0 ou superior e npm.

```sh
git clone https://github.com/luigiscofano/portfolio.git
cd portfolio
npm ci
npm run dev
node --test tests/content.test.mjs
npx tsc --noEmit
npm run build
```

No ambiente gerenciado de Sites, use os auxiliares de instalação, build e sincronização fornecidos pela plataforma. A configuração de identidade está em `.openai/hosting.json`; reutilize o `project_id` nas próximas versões. Não crie outro Site para atualizar este portfólio. Nunca salve tokens de acesso em arquivos.

## Estrutura

- `app/page.tsx`: página acadêmica, acordeão de formação, filtros e navegação.
- `app/globals.css`: identidade visual e layouts responsivos.
- `app/atualizar/page.tsx`: guia de atualização.
- `content/portfolio.json`: conteúdo centralizado.
- `public/images/`: imagens otimizadas de fontes públicas verificadas.
- `docs/FONTES.md`: proveniência e limites editoriais.
- `tests/content.test.mjs`: verificação de estrutura, fontes e recursos locais.

## Acesso e publicação

O portfólio tem acesso público desde 9 de novembro de 2026. O código deste repositório parte da versão 5 do Site e inclui a atualização de direitos autorais de 9 de novembro de 2026, com documentação adaptada para o GitHub. O código não implementa autenticação própria.

Este repositório e o Site não têm sincronização automática: commits no GitHub não alteram a página publicada. Atualizações do Site precisam ser salvas e publicadas separadamente no mesmo projeto.

## Acessibilidade

HTML semântico, navegação por âncoras, skip link, texto alternativo, foco visível, filtros com `aria-pressed`, menu móvel com estado acessível, detalhes nativos, suporte a movimento reduzido e contato com fallback para copiar manualmente.

## Identidade visual e licenças

A segunda versão aproxima a composição da referência acadêmica solicitada: foto circular, lateral clara, cards com ícones, acordeão de formação e linhas do tempo. O código é próprio. Quicksand e Playfair Display são hospedadas em `public/fonts/`, com licenças SIL OFL em `public/licenses/`. Os ícones SVG são Font Awesome Free 6, sob CC BY 4.0, com caminhos em `content/icons.json`. A página `/creditos` reúne as atribuições.

## Imagens em destaque e assinatura

Em `content/portfolio.json`, `showImagePreview` controla se a imagem de um projeto aparece no card sem abrir os detalhes. Intuição e Pokédex usam capturas reais dos repositórios. Mantenha `image`, `imageAlt`, `caption`, `imageSource`, `imageWidth` e `imageHeight` coerentes. A lista `navigation` acompanha a ordem das seções na página: Sobre, Projetos, Pesquisa, Formação, Trajetória, Contato.

`visualSignature` centraliza o arquivo, texto alternativo, dimensões e opção `enabled` do bem-te-vi com folhas. O SVG original está em `public/images/assinatura-bem-te-vi.svg`. A assinatura é estática, sem rastreamento ou interação.

## Sprite de SINTONIA ao lado do nome

`profile.nameSprite` controla o sprite exibido junto ao nome na lateral desktop e no cabeçalho móvel. O atlas original está em `public/images/sintonia/chibi-user-roster.svg`, sem modificação. O bem-te-vi é o frame 2 do atlas 4 × 4; `backgroundSize` e `backgroundPosition` reproduzem o enquadramento do jogo. Para trocar o ativo, atualize arquivo, posição, fonte e créditos. As artes têm direitos reservados ao titular e não herdam a licença MIT do código.

O nome mostrado no topo usa `profile.name` por extenso. A última parte do sobrenome fica junto ao sprite quando há quebra de linha. O alinhamento considera a margem transparente inferior do frame original (15,5 px em uma célula de 313,5 px) para posicionar os pés na linha de base do texto. `profile.shortName` continua disponível para a assinatura curta do rodapé.

## Direitos autorais

© 2026 Luigi Scofano de Araujo. Aviso relativo ao conteúdo original de sua autoria. Recursos de terceiros conservam seus próprios direitos, créditos e licenças. Consulte [COPYRIGHT.md](COPYRIGHT.md).
