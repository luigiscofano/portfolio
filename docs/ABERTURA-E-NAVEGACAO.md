# Abertura e navegação

A entrada normal, sem fragmento na URL, começa no topo com todas as seções expansíveis fechadas. Recarregar essa URL também reinicializa os disclosures, evitando a restauração automática do navegador na área de projetos.

Links explícitos como `#pesquisa` e a navegação lateral continuam abrindo e focalizando seu destino. Retornos por Voltar/Avançar preservados pelo cache de navegação mantêm a posição intencional da sessão. Nenhum dado de conteúdo ou preferência de idioma é apagado.

As cinco seções principais usam **+** fechadas e **−** abertas, sem transformar o sinal de mais em X. O indicador é decorativo; o controle continua sendo o `summary` nativo de `details`, acessível por teclado.

Verificação: entrada nova e reload sem hash com scroll zero e nenhum details aberto; abertura por clique mostra menos; link direto pesquisa abre somente pesquisa; largura 390 sem overflow. Testes automatizados de regressão em `tests/entry-navigation.test.mjs`.
