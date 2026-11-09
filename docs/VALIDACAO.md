# Validação da revisão acadêmica

6 de novembro de 2026.

- Sete testes de conteúdo: estrutura, IDs, imagens locais, protocolos de links, limites factuais, fontes/licenças e controles acessíveis.
- TypeScript e build Vinext verificados no pacote final.
- Navegador: apresentação, navegação lateral, âncoras, filtro de IA (3 projetos), Todos (6 projetos), detalhes expansíveis e páginas `/atualizar` e `/creditos` verificados.
- Acordeões de formação abrem e fecham individualmente; ativação de CS50 pelo teclado verificada. ARIA reflete o painel expandido.
- Menu móvel abre, navega, fecha após a seleção e fecha com Escape, devolvendo o foco ao botão.
- Layout desktop revisado visualmente. Computed styles confirmaram Quicksand no corpo e Playfair Display nos títulos. Larguras útil/conteúdo de 1165/1165 px.
- Layouts móveis revisados em frames de 390 e 320 px. Larguras útil/conteúdo coincidentes (373/373 e 303/303), sem rolagem horizontal.
- A barra lateral fechada fica fora da árvore de acessibilidade no celular. Imagens possuem texto alternativo. Há link para pular ao conteúdo e suporte a preferência de movimento reduzido.
- Botão de copiar e-mail exibiu confirmação de cópia; o fallback textual está implementado. Nenhum e-mail foi enviado.
- Fontes e ícones hospedados localmente, com licenças e créditos acessíveis. Sem reutilização de código ou ativos do site de referência.
- Verificação HTTP de links registrada em `link-checks.json`; autenticação de Sites privados não é tratada como link público quebrado.
- Nenhum envio de e-mail, publicação em rede social, alteração de contato ou mudança de repositório público foi efetuado. A publicação continua no mesmo Site privado.

Limites: não constitui auditoria WCAG completa nem teste em aparelhos físicos. Conteúdo de formação e trajetória deriva do perfil público do titular. Não há CMS, sincronização com redes sociais ou formulário de contato servidor. O botão de contato abre o cliente de e-mail; copiar o endereço tem fallback textual quando a permissão do navegador não estiver disponível.

## Revisão de imagens e assinatura

- Dez testes de conteúdo/estrutura, TypeScript e build verificados no pacote final.
- Capturas de Intuição e Pokédex promovidas aos cards; imagens carregadas no navegador com dimensões naturais de 1154 × 1000 e 1165 × 747 px. Os JPEGs de origem correspondem byte a byte aos blobs Git dos repositórios; imagens entregues em WebP.
- Links de origem conferidos em `image-link-checks.json`.
- Ordem de menu e seções: Sobre, Projetos, Pesquisa, Formação, Trajetória, Contato.
- Assinatura original de bem-te-vi com folhas conferida na lateral e no rodapé, com texto alternativo e sem animação.
- Revisão visual desktop e em frames de 390/320 px. Larguras útil/conteúdo 373/373 e 303/303, sem overflow horizontal. Menu móvel, navegação para Formação, acordeão e filtro Software (Pokédex) verificados.
- As regras de estilo anteriores foram preservadas integralmente; apenas regras das novas capturas e da assinatura foram acrescentadas. Fontes, paleta, títulos e cards de links não foram redesenhados.
- Conteúdo permanece centralizado em JSON; flags de prévia e assinatura documentadas no README.

## Sprite autêntico junto ao nome — 7 de novembro de 2026

- Onze testes, TypeScript e build do pacote final verificados. Teste de SHA-256 garante o uso do atlas original de SINTONIA sem alterações.
- Frame e enquadramento conferidos com animal-roster.mjs e spriteMarkup de ui.mjs do jogo.
- Sprite visualmente conferido junto ao nome na lateral desktop, no cabeçalho móvel e no menu móvel aberto.
- Larguras de 390/320 px revisadas em frames; conteúdo de 373/303 px respectivamente, sem rolagem horizontal, sobreposição ou quebra do nome.
- Nova configuração centralizada em profile.nameSprite. Fontes, cores, cards, projetos e assinatura anterior preservados. Créditos e direitos reservados do titular registrados.

## Nome completo e linha de base — 7 de novembro de 2026

- Nome do topo alterado para o texto exato de `profile.name`: Luigi Scofano de Araujo, também em rótulos acessíveis.
- Sprite original preservado. Compensação proporcional da margem transparente inferior: 15,5/313,5 do tamanho mostrado; pés alinhados à linha de base, não ao centro da caixa.
- Nome e sprite usam layout de texto em linha; sobrenome final e sprite ficam juntos na quebra.
- Revisão visual desktop: nome em duas linhas e sprite junto de “de Araujo”. Mobile 390 px: uma linha; mobile 320 px: duas linhas, sem truncamento ou sobreposição do botão de menu. Menu móvel aberto também conferido.
- Largura útil e de conteúdo: 373/373 e 303/303 px, sem overflow horizontal. Menu abre e fecha com Escape.
- Doze testes de conteúdo e estrutura, TypeScript e build aprovados no pacote final.


## Exportação para GitHub: 9 de novembro de 2026

- Código e ativos exportados da versão 5 do Site, sem transportar o histórico Git nem credenciais.
- Doze testes de conteúdo e estrutura, TypeScript (`tsc --noEmit`) e build Vinext aprovados no código exportado.
- Site tornado público por autorização do titular. Link aberto sem tela de autenticação.
- Licenças, créditos e direitos reservados dos ativos preservados.
- A publicação do GitHub não configura sincronização automática com o Site.

## Direitos autorais: 9 de novembro de 2026

- Aviso © 2026 Luigi Scofano de Araujo no rodapé, página de créditos, README e COPYRIGHT.md.
- Atribuições e licenças de terceiros preservadas; nenhuma nova licença geral imposta ao projeto.

## Publicação no GitHub Pages: 9 de novembro de 2026

- Exportação estática Next.js publicada em https://luigiscofano.github.io/portfolio/.
- 15 testes, build e TypeScript aprovados localmente e no GitHub Actions. Saída sem servidor de aplicação, com as rotas /portfolio/, /portfolio/atualizar/ e /portfolio/creditos/.
- Navegador desktop: layout, filtro IA (3 projetos) e retorno a Todos (6 projetos), acordeão CS50, links internos e recarga direta das páginas auxiliares conferidos; sem overflow horizontal observado.
- Créditos, imagens originais e aviso © 2026 preservados. Perfil e metadados do repositório apontam para o Pages.
- Publicação é manual pelo workflow Publish portfolio to GitHub Pages. A versão no Sites permanece independente. Verificação específica de viewport móvel não refeita nesta publicação.
- Execução validada: https://github.com/luigiscofano/portfolio/actions/runs/42633298293.
