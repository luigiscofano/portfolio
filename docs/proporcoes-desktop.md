# Proporções no computador

A referência aprovada mede 1365 × 638 pixels. Os dois anexos fornecidos são idênticos. A barra lateral ocupa cerca de 282 px (20,66%); a margem interna do conteúdo é 60 px; a fotografia mede 360 × 301 px e mantém a proporção original 467:390. O título principal usa 56 px na largura de referência.

O desktop usa uma unidade de escala equivalente a 1/1365 da largura da viewport. Margens, espaçamento do cabeçalho, fotografia, navegação e títulos acompanham essa unidade. O limite antigo de 1600 px do contêiner foi removido para evitar espaço sobrando em monitores grandes. Não é aplicado zoom nem transformação no documento.

## Exceções deliberadas

A proporção literal não é aplicada abaixo de 769 px: o menu e o layout móvel permanecem separados. No computador, textos e alvos de interação têm pisos de legibilidade. O corpo não cai abaixo de 14 px; a navegação mantém alvos de pelo menos 44 px. Em telas estreitas, textos podem quebrar em mais linhas, portanto a altura não é uma reprodução fotográfica da referência. Também não se força a relação largura/altura da janela: telas com alturas diferentes continuam permitindo rolagem normal.

Bordas, detalhes de ícones, tabelas e conteúdo das galerias preservam suas regras próprias. Isso mantém leitura e acessibilidade em vez de reduzir indiscriminadamente toda a página.

## Verificação

Testes de código verificam o escopo desktop e um modelo de geometria nas larguras 769, 1024, 1180, 1365, 1600, 1920, 2560 e 3840 px. Esses testes não equivalem a capturas reais de navegador em todas as larguras. O build verifica a geração da aplicação; a inspeção visual disponível é registrada separadamente na publicação.
