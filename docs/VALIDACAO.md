# Validação e limites de evidência

## Publicação de referência

A publicação de referência informada para esta revisão é o commit `b593df610934cc76b586a117d25848d2dd4551bc`, pela [execução 42668897943](https://github.com/luigiscofano/portfolio/actions/runs/42668897943). O endereço é https://luigiscofano.github.io/portfolio/.

Esse registro identifica uma publicação concluída, não comprova que alterações locais posteriores já foram publicadas ou testadas no navegador. O workflow é manual e publica a exportação `out/` apenas após instalação e `npm run validate`. Consulte o resultado da execução correspondente ao commit que se pretende distribuir.

## Validação reproduzível

Na raiz do repositório, com Node.js 22.13.0 ou superior:

```sh
npm ci
npm run validate
npm start
```

`npm run validate` executa, em sequência, `format:check`, `test`, `lint`, `build`, `typecheck` e `check:export`. A formatação cobre uma seleção explícita de arquivos do código ativo, não todos os arquivos legados. Use `npm run format` para aplicar esse padrão e revise o diff.

A prévia abre em `http://127.0.0.1:4173/portfolio/`. O build antecede o TypeScript para gerar os tipos de rotas do Next.js. Registre comando, resultado e revisão do código ao executar verificações; não transfira um resultado antigo automaticamente para uma revisão nova.

Os testes em `tests/` verificam contratos de conteúdo, IDs e seções, caminhos de ativos, limites factuais, licenças preservadas, flags de sprite/assinatura, paridade entre idiomas, integridade dos currículos, cores selecionadas e configuração da publicação estática. O teste de contraste lê declarações selecionadas do CSS, mas não calcula toda a cascata ou media queries; continua sendo uma verificação parcial. Parte dos testes inspeciona texto do código-fonte: isso ajuda a detectar regressões conhecidas, mas não demonstra interação correta no navegador.

`npm run typecheck` verifica tipos. `npm run build` comprova a geração da exportação quando termina com sucesso. `npm run check:export` confere rotas, referências locais no HTML/CSS exportado e IDs duplicados. Não verifica serviços externos nem interações. Nenhum desses comandos equivale a uma auditoria de segurança, privacidade, acessibilidade ou qualidade visual. O workflow não executa revisão visual manual.

## Roteiro de navegador antes de publicar

- Abrir `/portfolio/`, `/portfolio/atualizar/` e `/portfolio/creditos/` diretamente e recarregar cada rota.
- Conferir imagem original de 1152 × 1536 px, fontes de sistema, ausência de sprite junto ao nome e presença da assinatura independente.
- Alternar Português / English; testar `?lang=en`, `?lang=pt`, recarga e armazenamento bloqueado. Conferir idioma do documento, título, rótulos, textos alternativos e conteúdo biográfico.
- Verificar navegação por âncoras, estado ativo, seis projetos, filtros, detalhes e acordeão de formação. Abrir os estudos de caso de Intuição, Tupi e GestureLab nos dois idiomas; conferir os links de evidência.
- Conferir os botões separados “Experimentar” e “Ver código” de Intuição, e o link “Mais sobre mim”, que deve expandir e focalizar a biografia.
- Conferir o exemplo casa/c8sa, seu aviso de simulação em português, a ausência de alegação de OCR real e os links de pipeline, dados sintéticos e procedência.
- Revisar as prévias de ícones (Intuição), capa (Tupi), ilustração (Kaggle), entrada sintética (GestureLab) e captura real (Pokédex). Conferir também a captura real do README de LabDig (777 × 520 px), com legenda que a distingue de validação de hardware.
- Conferir a contextualização inglesa de Poli-USP e Tupi Antigo.
- Usar teclado: link para pular, foco visível, seletor, abertura/fechamento do menu móvel, Escape, Tab/Shift+Tab e retorno do foco.
- Conferir desktop, largura de 390 px e largura de 320 px, inclusive nome, botões, downloads e textos ingleses; verificar rolagem horizontal e sobreposições. Rever zoom e movimento reduzido.
- Testar separadamente cópia dos dois e-mails e fallback sem permissão. Abrir `mailto:` não significa enviar uma mensagem.
- Baixar os PDFs português e inglês, verificar quatro e duas páginas respectivamente, conferir formato e abertura, a prioridade pelo idioma e o hash do PDF PT registrado na documentação de idiomas, sem inferir equivalência entre seus conteúdos.
- Examinar console, falhas de rede e links externos relevantes. Arquivos de checagem HTTP antigos não garantem disponibilidade atual.

Este roteiro descreve verificações a realizar. Não é uma declaração de que foram executadas nesta revisão documental.

## Atualização editorial local ainda sujeita à QA final

A revisão acrescenta estudos de caso bilíngues, exemplo fictício de OCR/revisão, fontes primárias, links separados para demonstração/código, expansão direta da biografia, contexto internacional e prévias com proveniência. Os dois downloads principais passam a ser PDFs, priorizados pelo idioma; o DOCX português sanitizado é preservado. A captura real do README de LabDig está integrada; a validação física das revisões do projeto continua pendente.

Essas alterações foram documentadas por inspeção do código e dos arquivos. Não se declara aqui nova execução da suíte, build, publicação ou aprovação visual; o resultado da QA final deve ser registrado separadamente.

## Histórico preservado como contexto

- **6 de novembro de 2026:** os registros da revisão acadêmica relatam testes de conteúdo, TypeScript, build Vinext e navegação em desktop e frames móveis. A composição usava Quicksand, Playfair Display e retrato circular. Essas observações pertencem ao layout antigo.
- **7 de novembro:** os registros relatam conferência de atlas, frame e alinhamento do sprite de SINTONIA junto ao nome. O sprite foi posteriormente desativado; seu atlas e créditos permanecem preservados.
- **9 de novembro:** o código foi exportado do Site e adaptado a Next.js com saída estática para GitHub Pages. A [primeira execução documentada do Pages](https://github.com/luigiscofano/portfolio/actions/runs/42633298293) antecede a publicação de referência indicada acima. Sites e Pages continuam independentes.
- A revisão editorial posterior passou a usar foto original retangular, fontes de sistema, seleção de idioma e dois documentos de currículo. Os registros de preparação dos currículos estão resumidos em [IDIOMAS-E-ACESSIBILIDADE.md](IDIOMAS-E-ACESSIBILIDADE.md).

`link-checks.json` e `image-link-checks.json` são registros históricos de respostas HTTP, não monitores ativos. A existência de arquivos legados de Sites, Cloudflare ou banco de dados no repositório não indica que esses serviços estejam em execução no Pages.

## Limites

Não há certificação WCAG, auditoria completa com leitores de tela ou garantia de comportamento em todos os aparelhos. As autodescrições de formação e trajetória não equivalem à verificação institucional independente. Não há CMS, autenticação, sincronização automática com redes sociais ou formulário com serviço de envio. Mudanças documentadas localmente só aparecem no endereço público após uma publicação autorizada e concluída.

## Revisão de manutenção — 9 de novembro de 2026

Verificações executadas após a separação dos componentes e hooks, em Node.js 24.22.1:

- Instalação limpa com `npm ci`: concluída, com lockfile consistente.
- `npm run validate`: concluído; formatação, 26 testes, lint, build estático, TypeScript e verificação da exportação aprovados.
- Lint: zero erros e seis avisos da regra `no-img-element`, mantidos visíveis. A exportação usa imagens locais sem serviço de transformação do Next.js; os avisos não são medições de lentidão.
- Exportação: três páginas, IDs únicos e 22 recursos/rotas locais encontrados.
- Hashes dos dois currículos sanitizados preservados.
- Revisão independente do código: sem bloqueador identificado; cobriu fallbacks de projetos, destaques opcionais, temporizadores de cópia e limpeza de eventos/animações.

Essas verificações não substituem o teste do commit publicado. O workflow usa Node.js 22 e executa a mesma validação antes do deploy. O comportamento visual e as interações devem ser reconferidos no site após essa publicação.

### Verificação local das oito melhorias (9 de novembro de 2026)

`npm run validate` terminou com código 0: 29 testes passaram, formatação correta,
lint sem erros (seis avisos existentes `no-img-element`), compilação estática,
TypeScript e verificação de 24 recursos/rotas locais. O PDF português e o DOCX
saneado preservado têm hashes fixados em testes. O exemplo de OCR é fictício;
essa validação não executou OCR nem mediu qualidade dos projetos apresentados.
A verificação visual e funcional da publicação permanece uma etapa separada.
