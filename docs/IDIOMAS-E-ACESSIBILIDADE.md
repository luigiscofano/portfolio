# Idiomas, acessibilidade e currículos

## Conteúdo e seleção de idioma

- `content/portfolio.json`: português, padrão inicial.
- `content/portfolio.en.json` e `content/portfolio.es.json`: conteúdo inglês e espanhol com a mesma estrutura. Atualize os três arquivos quando um fato mudar, preservando IDs, URLs, categorias internas e referências de arquivos.
- `content/project-cases.json`: estudos de caso de Intuição, Tupi e GestureLab em `pt`, `en` e `es`, preservando contribuição, evidências e limites.
- `content/ui.en.json` e `content/ui.es.json`: rótulos ingleses e espanhóis da interface, indexados pelo texto português. Rótulos ausentes recaem no português; revise o dicionário ao mudar um controle.

- `content/credits.json`: créditos e licenças nos três idiomas.

O seletor Português / English / Español aparece antes da apresentação, inclusive no celular. Um parâmetro válido `?lang=pt`, `?lang=en` ou `?lang=es` prevalece ao abrir a página; sem parâmetro, a aplicação consulta a preferência local. A troca atualiza o parâmetro da URL e tenta salvar `portfolio-language` no armazenamento local. Se esse armazenamento estiver bloqueado, a seleção continua funcionando na página aberta.

A exportação é pré-renderizada em português. As seleções inglesa e espanhola são aplicadas após carregar o JavaScript; pode haver uma breve apresentação em português. O atributo de idioma do documento e o título da página acompanham o estado selecionado. Não existem rotas separadas para inglês e espanhol, nem tradução completa dos metadados estáticos para indexação.

A página auxiliar `/creditos/` acompanha o idioma escolhido, incluindo o título, os textos e o retorno ao portfólio. Conteúdos externos e imagens documentais originais mantêm seu próprio idioma. O idioma da interface não modifica o idioma dos documentos baixados: os dois PDFs ficam disponíveis nas três seleções, com o português primeiro em PT e ES e o inglês primeiro em EN. Não há currículo PDF em espanhol. A introdução inglesa explica Poli-USP e Tupi Antigo sem pressupor familiaridade com os nomes brasileiros.

## Mapas informativos

As três seções possuem SVGs localizados em `public/images/sections/`. O script `node scripts/generate-section-visuals.mjs` gera somente PT/EN. Os arquivos `*-es.svg` foram traduzidos manualmente, preservando a composição; devem ser revisados e atualizados separadamente quando formação, trajetória ou pesquisa mudarem. O script não gera nem atualiza automaticamente esses arquivos espanhóis. Consulte [IDIOMAS.md](IDIOMAS.md) para os demais pontos de tradução.

## Recursos implementados e limites

O código inclui link para pular ao conteúdo, seções focalizáveis na navegação, seletor com rótulo, foco visível, estado ativo indicado além da cor, filtros com `aria-pressed`, detalhes nativos e acordeão de formação com estado expandido e relação entre botão/painel.

O menu móvel inclui Escape, contenção de Tab/Shift+Tab, devolução de foco ao fechar por Escape e bloqueio do conteúdo de fundo enquanto aberto. Feedback de cópia e contagem de projetos usam anúncios discretos. Imagens informativas têm texto alternativo; elementos decorativos são ocultados da árvore de acessibilidade. Os estilos incluem suporte a movimento reduzido.

Os testes automatizados calculam contraste de combinações de cores selecionadas: 4,5:1 para texto normal e 3:1 para texto grande e alguns elementos gráficos. Isso não mede todas as combinações efetivamente renderizadas, nem garante a acessibilidade de todos os estados.

Essas medidas não constituem certificação WCAG. Faltam uma auditoria completa, avaliação abrangente com leitores de tela e testes em aparelhos físicos. Mudanças precisam de revisão manual nos três idiomas, incluindo zoom, teclado, menu móvel e downloads. Veja [VALIDACAO.md](VALIDACAO.md).

## Currículo português

O botão de download abre `public/documents/luigi-scofano-curriculo-pt.pdf`, o PDF de duas páginas fornecido por Luigi em novembro de 2026. O SHA-256 do arquivo é `c5caef25dbe21c9464f04cd5a5fd7a9abf800100b4d3fd98d16666f8d1a1ee36`. O PDF contém texto selecionável e não possui marcação estrutural de acessibilidade.

O DOCX sanitizado da edição anterior continua disponível em `public/documents/luigi-scofano-curriculo-pt.docx` como arquivo histórico. O PDF atual foi fornecido separadamente.

## Currículo inglês: PDF

`public/documents/luigi-scofano-resume-en.pdf` é a tradução do currículo português de novembro de 2026. Preserva o conteúdo, as duas páginas, a tipografia, as divisórias e os links do original. Seu SHA-256 é `c3968bcf50b3d7ca0d87558e7a980b674aa4c3e2876d74c6e5f9c77f9e3de420`.

O PDF tem duas páginas e texto extraível, mas não possui marcação estrutural de acessibilidade. Biografia e trajetória em HTML continuam disponíveis como alternativa de consulta, sem pretender reproduzir integralmente o documento.

## Conteúdo expansível e exemplo simulado

“Mais sobre mim” no destaque abre o detalhe da biografia e focaliza o resumo. Os estudos de caso e o exemplo de pesquisa usam detalhes expansíveis; revise sua operação por teclado nos três idiomas. O exemplo mantém “casa” e “c8sa” em português mesmo nas interfaces inglesa e espanhola e informa explicitamente que é fictício, não conteúdo Tupi nem saída real de OCR.

## Substituição segura

Os PDFs desta edição compartilham o mesmo conteúdo profissional nos dois idiomas. Nas próximas revisões, use as informações fornecidas pelo titular para atualizar cada versão.

Para substituir um currículo:

1. Use o arquivo aprovado para distribuição pública e revise dados pessoais, metadados e conteúdo oculto.
2. Preserve o original de trabalho fora da pasta pública; inclua em `public/documents/` somente a versão sanitizada aprovada.
3. Atualize `profile.resumePt` ou `profile.resume` nos três JSONs, incluindo URL, nome de download e rótulos aplicáveis.
4. Atualize as verificações de integridade dos testes somente depois da revisão do novo documento.
5. Teste os dois PDFs na exportação estática, a prioridade pelo idioma e a abertura dos arquivos. Se preservar um DOCX em `public/`, mantenha apenas sua versão sanitizada, pois também será exportado.

A conferência de hash nos testes protege os arquivos revisados contra mudanças acidentais. Não substitui uma nova revisão de privacidade quando o documento é trocado.
