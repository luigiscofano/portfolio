# Idiomas, acessibilidade e currículos

## Conteúdo e seleção de idioma

- `content/portfolio.json`: português, padrão inicial.
- `content/portfolio.en.json`: conteúdo inglês com a mesma estrutura. Atualize ambos quando um fato mudar, preservando IDs, URLs, categorias internas e referências de arquivos.
- `content/ui.en.json`: rótulos ingleses da interface, indexados pelo texto português. Rótulos ausentes recaem no português; revise o dicionário ao mudar um controle.

O seletor Português / English aparece antes da apresentação, inclusive no celular. Um parâmetro válido `?lang=en` ou `?lang=pt` prevalece ao abrir a página; sem parâmetro, a aplicação consulta a preferência local. A troca atualiza o parâmetro da URL e tenta salvar `portfolio-language` no armazenamento local. Se esse armazenamento estiver bloqueado, a seleção continua funcionando na página aberta.

A exportação é pré-renderizada em português. A seleção inglesa é aplicada após carregar o JavaScript; pode haver uma breve apresentação em português. O atributo de idioma do documento e o título da página acompanham o estado selecionado. Não existe rota inglesa separada, nem tradução completa dos metadados estáticos para indexação.

As páginas auxiliares `/atualizar/` e `/creditos/` permanecem em português, assim como os conteúdos externos que não ofereçam tradução própria. O idioma da interface não modifica o idioma dos documentos baixados: os dois currículos ficam disponíveis em ambas as seleções.

## Recursos implementados e limites

O código inclui link para pular ao conteúdo, seções focalizáveis na navegação, seletor com rótulo, foco visível, estado ativo indicado além da cor, filtros com `aria-pressed`, detalhes nativos e acordeão de formação com estado expandido e relação entre botão/painel.

O menu móvel inclui Escape, contenção de Tab/Shift+Tab, devolução de foco ao fechar por Escape e bloqueio do conteúdo de fundo enquanto aberto. Feedback de cópia e contagem de projetos usam anúncios discretos. Imagens informativas têm texto alternativo; elementos decorativos são ocultados da árvore de acessibilidade. Os estilos incluem suporte a movimento reduzido.

Os testes automatizados calculam contraste de combinações de cores selecionadas: 4,5:1 para texto normal e 3:1 para texto grande e alguns elementos gráficos. Isso não mede todas as combinações efetivamente renderizadas, nem garante a acessibilidade de todos os estados.

Essas medidas não constituem certificação WCAG. Faltam uma auditoria completa, avaliação abrangente com leitores de tela e testes em aparelhos físicos. Mudanças precisam de revisão manual em ambos os idiomas, incluindo zoom, teclado, menu móvel e downloads. Veja [VALIDACAO.md](VALIDACAO.md).

## Currículo português: DOCX

`public/documents/luigi-scofano-curriculo-pt.docx` é a versão portuguesa em formato nativo. Endereço residencial e telefone foram substituídos por espaços, sem atualizar datas ou reescrever informações profissionais. O registro da preparação informa comparação no mesmo renderizador, com quatro páginas preservadas fora da região removida. Isso é evidência daquela preparação, não uma nova renderização nesta revisão de documentação.

Word e outros renderizadores podem produzir diferenças de paginação entre versões. Não se afirma identidade de layout entre aplicativos nem auditoria de acessibilidade estrutural do DOCX.

## Currículo inglês: PDF

`public/documents/luigi-scofano-resume-en.pdf` é a versão inglesa aprovada. O registro da preparação informa telefone removido por redação definitiva, limpeza de metadados e verificação do texto extraível. E-mail, LinkedIn e conteúdo profissional foram preservados.

O PDF tem duas páginas e texto extraível, mas não possui marcação estrutural de acessibilidade. Biografia e trajetória em HTML continuam disponíveis como alternativa de consulta, sem pretender reproduzir integralmente o documento.

## Substituição segura

Os currículos são documentos de épocas diferentes, não traduções sincronizadas. A página e os arquivos podem ter níveis de atualização distintos. Não “corrija” datas, formação ou experiência em um arquivo para igualá-lo ao outro sem orientação do titular.

Para substituir um currículo:

1. Use o arquivo aprovado para distribuição pública e revise dados pessoais, metadados e conteúdo oculto.
2. Preserve o original de trabalho fora da pasta pública; inclua em `public/documents/` somente a versão sanitizada aprovada.
3. Atualize `profile.resumePt` ou `profile.resume` nos dois JSONs, incluindo URL, nome de download e rótulos aplicáveis.
4. Atualize as verificações de integridade dos testes somente depois da revisão do novo documento.
5. Teste os dois links na exportação estática e confirme que o download abre no formato esperado.

A conferência de hash nos testes protege os arquivos revisados contra mudanças acidentais. Não substitui uma nova revisão de privacidade quando o documento é trocado.
