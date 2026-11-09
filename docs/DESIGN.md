# Identidade editorial do portfólio

A versão de 9 de novembro de 2026 implementa a prévia visual aprovada por Luigi.

- Barra lateral azul-acinzentada com navegação por seção, indicadores coloridos e seis links com ícones.
- Abertura com título editorial, foto retangular de cantos arredondados, assinatura de quatro cores e links para projetos e trajetória.
- Destaque de pesquisa Tupi Antigo, acompanhado por Intuição e trajetória entre pesquisa, desenvolvimento e ensino.
- Foto, assinatura do bem-te-vi no galho, dois e-mails, projetos, créditos e funcionalidades anteriores preservados. O bem-te-vi junto ao nome permanece desativado.
- Conteúdo biográfico integral acessível em “Mais sobre mim”; os seis projetos continuam no catálogo com filtros e detalhes.

## Manutenção

Os textos de abertura estão em `content/portfolio.json`, em `profile.hero`. Os dados dos projetos continuam centralizados no mesmo arquivo. Estilos e pontos de adaptação ficam em `app/globals.css`.

O layout utiliza fontes de sistema (Georgia/Times New Roman e Arial/Helvetica), aproximando a tipografia da prévia sem downloads externos. Os arquivos anteriores de fontes e seus créditos permanecem no repositório para preservar proveniência.

No celular a barra lateral vira um menu com estado acessível, fechamento por Escape e contenção de foco. As grades passam a uma coluna; o layout respeita redução de movimento. Os avisos “prévia visual” e “imagem de estudo” pertenciam à maquete e não são publicados.
