# Reformulação editorial do portfólio

## Direção
Referência indicada por Luigi: https://arturjordao.github.io/. A aproximação usa fundo branco, barra lateral cinza claro, azul e tipografia Quicksand/Playfair Display, sem copiar textos ou identidade pessoal. A foto continua à direita da apresentação e a navegação lateral permanece. As fontes locais mantêm suas licenças em public/licenses.

## Organização
A abertura apresenta a pessoa e uma seleção curta de trabalhos. O catálogo completo possui busca por nome, assunto e tecnologia, além dos filtros existentes. Imagens, autoria, limites e estudos de caso ficam nos detalhes expansíveis; não foram descartados para simplificar a página. O exemplo didático de OCR fica na seção Pesquisa, sob demanda.

## Conteúdo
Dados públicos conferidos com README e docs/PROJETOS.md do perfil luigiscofano e com correções explícitas do proprietário. Projetos em andamento não são apresentados como sistemas operacionais concluídos. Não são publicados links de código privado, métricas inventadas ou credenciais. Mantidos currículos aprovados sem regeneração.

## Publicação
O GitHub Pages exporta a aplicação Next.js em /portfolio/. O endereço Sites é uma publicação separada e não é atualizado automaticamente pelo GitHub Pages.

## Verificação
31 testes automatizados aprovados; build de produção, TypeScript e validação dos recursos exportados aprovados. ESLint sem erros, com quatro avisos existentes sobre img em exportação estática. Busca, filtros, troca PT/EN e fechamento do menu por Escape conferidos no navegador. Layout conferido em desktop, 390 px e 320 px, sem rolagem horizontal; imagens carregadas.

## Exploração progressiva

A entrada mantém uma única ação principal. Currículos permanecem em Mais sobre mim; os destaques e o catálogo completo estão na seção Projetos. Pesquisa, Formação, Trajetória e Contato abrem sob demanda, sem excluir conteúdo. Links da barra lateral e URLs com fragmentos abrem a seção correspondente. Os controles nativos details/summary funcionam por teclado e não dependem de animação.

## Ícones dos controles

A navegação, os filtros, as seções expansíveis, os detalhes dos projetos e os retornos das páginas auxiliares usam SVGs locais já licenciados. Os textos permanecem como nomes acessíveis; ícones são decorativos e não dependem de fontes externas. Tamanhos de 14–20 px preservam a hierarquia compacta.

## Acentos secundários

O azul continua principal em navegação, CTA e foco. Violeta identifica IA; verde-petróleo, dados e downloads; ocre, hardware. Fundos suaves reforçam seleção junto com sublinhado, texto e aria-pressed. Feedback de cópia usa verde para sucesso e ocre para falha, mantendo mensagens legíveis. Contrastes são verificados nos testes.
