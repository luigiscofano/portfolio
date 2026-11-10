# Design do portfólio

## Estado vigente

A composição editorial de 9 de novembro de 2026 usa barra lateral azul-acinzentada, abertura com título em destaque, retrato retangular de cantos arredondados e acentos em quatro cores. A pesquisa sobre Tupi Antigo aparece em destaque, acompanhada por Intuição e pela trajetória entre pesquisa, desenvolvimento e ensino.

- Tipografia de sistema: Georgia/Times New Roman nos títulos e Arial/Helvetica no corpo. Não depende de download de fontes externas.
- Foto original enviada pelo titular: 1152 × 1536 px, em `public/images/luigi-original.jpg`, sem retoque, regeneração facial ou ampliação artificial. O recorte visual é feito por CSS.
- Nome completo sem sprite: `profile.nameSprite.enabled` é `false` nos dois idiomas. O atlas permanece guardado com sua proveniência.
- Assinatura de bem-te-vi com folhas preservada: `visualSignature.enabled` é `true`. É um SVG separado do sprite de SINTONIA.
- Biografia integral em “Mais sobre mim”, com link no destaque “Além do código” que abre os detalhes e focaliza seu resumo, seis projetos com filtros e detalhes, formação em acordeão, pesquisa e trajetória em linhas do tempo e dois e-mails distintos.
- Downloads dos currículos português e inglês em PDF junto à apresentação, priorizados pelo idioma selecionado, sem supor equivalência de conteúdo entre os arquivos.

A ordem das seções é Sobre, Projetos, Pesquisa, Formação, Trajetória e Contato. No celular, a lateral se transforma em menu e as grades se adaptam. Os estilos incluem foco visível e redução de movimento; a verificação real de teclado e layout continua necessária após mudanças.

## Manutenção

Textos de abertura e dados biográficos ficam nos JSONs português e inglês em `content/`. Rótulos ingleses da interface ficam em `content/ui.en.json`. Os estilos estão em `app/globals.css`; a organização do código está descrita em [ARQUITETURA.md](ARQUITETURA.md).

Preserve distinção entre captura real, diagrama conceitual e imagem com dados sintéticos. Intuição mostra uma página do ícones originais, Tupi usa sua capa documental original, Kaggle uma ilustração didática, GestureLab uma prévia sintética e Pokédex uma captura real. LabDig mostra uma captura real do README, identificada como documentação do acervo e não como validação de hardware. Os avisos de “prévia visual” da maquete não fazem parte da apresentação publicada.

## Aprofundamento sem inventar resultados

Intuição, Tupi e GestureLab têm estudos de caso expansíveis com problema, contribuição, decisões, reprodução e limites, editáveis em `content/project-cases.json`. O destaque de Intuição separa a demonstração jogável do código-fonte.

A pesquisa inclui um exemplo fictício em português: fonte “casa”, saída simulada “c8sa” e revisão “casa”. O aviso deixa explícito que não é Tupi, corpus real ou execução de OCR. Links levam ao pipeline, aos três registros sintéticos e à documentação de procedência. Nenhuma métrica de desempenho é inferida da ilustração.

A introdução inglesa contextualiza Poli-USP como a escola de engenharia da Universidade de São Paulo e Tupi Antigo como língua indígena do Brasil.

## Histórico, não configuração atual

A revisão acadêmica de 6 de novembro usava retrato circular, lateral clara, Quicksand e Playfair Display. Os arquivos dessas fontes e suas licenças continuam preservados por proveniência. As observações de navegador dessa revisão descrevem aquele layout, não comprovam o comportamento do visual atual.

O sprite de SINTONIA junto ao nome foi introduzido em 7 de novembro e depois desativado. Sua desativação não remove a assinatura independente da lateral e do rodapé. Referências e direitos estão em [FONTES.md](FONTES.md).
