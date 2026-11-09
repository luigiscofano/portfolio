# Idiomas e acessibilidade

## Conteúdo editável

- `content/portfolio.json`: português, versão padrão.
- `content/portfolio.en.json`: tradução inglesa, com a mesma estrutura. Atualize ambos ao alterar fatos do currículo ou projetos.
- `content/ui.en.json`: rótulos dos controles. Nomes de projetos, âncoras, URLs, categorias internas e arquivos são preservados.
- O seletor Português / English fica acima da apresentação, também no celular. A preferência é salva localmente; `?lang=en` ou `?lang=pt` prevalece ao abrir um link. Bloqueio de armazenamento não impede a troca durante a sessão.
- O idioma do documento e título da página acompanham a seleção. A página é pré-renderizada em português e troca de idioma após carregar o JavaScript. Não há uma rota inglesa separada para indexação.
- Páginas auxiliares de créditos/instruções e conteúdo dos repositórios externos permanecem em português. A tradução não altera informações, autoria ou limitações dos projetos.

## Revisão de acessibilidade

- Seletor nativo com rótulo e altura mínima de 44 px, foco visível, navegação por teclado.
- Link para pular ao conteúdo, seções focalizáveis ao usar a navegação, estado ativo em negrito e borda contrastante.
- Menu móvel mantém Escape, Tab/Shift+Tab e bloqueio do conteúdo de fundo. O link do título móvel sai da ordem de foco enquanto o menu está aberto.
- Links de projetos e linhas do tempo têm alvo de pelo menos 44 px de altura; links auxiliares da lateral, 24 px.
- Movimento reduzido preservado; imagens continuam com texto alternativo; feedback de cópia e contagem de projetos permanecem anunciados.
- Testes de contraste cobrem as principais combinações de texto: razão mínima 4,5:1. Subtítulo grande e ícones gráficos têm mínimo 3:1. Cores decorativas não são usadas como única indicação do item ativo.

A revisão e os testes locais não constituem certificação de conformidade WCAG nem substituem avaliação com usuários e leitores de tela. Testes reais de navegador devem ser registrados no relatório de publicação.

## Currículo

O botão discreto na apresentação baixa `public/documents/luigi-scofano-resume-en.pdf`, versão em inglês aprovada pelo titular. Telefone removido por redação definitiva do conteúdo, com limpeza de metadados e verificação de texto extraível. E-mail, LinkedIn e conteúdo profissional foram preservados. Para substituir, envie um PDF revisado, atualize o arquivo e os rótulos de tamanho em ambos os JSONs. O PDF tem duas páginas e texto extraível, mas não possui marcação estrutural de acessibilidade; a biografia e a trajetória em HTML continuam disponíveis no site.

O título da página principal é declarado por React junto ao estado do idioma, evitando disputa com metadados estáticos durante a hidratação. As páginas auxiliares têm títulos próprios.
