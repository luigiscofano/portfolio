# Maré Miúda no portfólio

Vitrine pública de **Maré Miúda: Entre Ilhas / Tiny Tide: Between Islands**, projeto de Luigi Scofano de Araujo. O jogo completo não é hospedado no portfólio; esta entrada não oferece demonstração ou download direto. O [repositório público de Maré Miúda](https://github.com/luigiscofano/mare-miuda-entre-ilhas) reúne o código e a documentação. A publicação limita-se ao resumo, à marca aprovada e a cinco imagens de divulgação. Todos os direitos reservados.

## Conteúdo e origem

Dados conferidos na documentação do autor em 24/11/2026: 8 mundos, 231 fases (200 regulares, 16 chefes opcionais, 15 bônus), edição offline, teclado/toque e mudança PT/EN local sem reinício da partida. Na abertura/recarga normal o jogo começa em português. A tradução espanhola é do portfólio, não uma edição espanhola do jogo.

Os seis PNGs originais foram preservados byte a byte, sem redesenho. A marca tem 180 × 94 pixels. `porto.png` é um quadro de divulgação recomposto a partir da arte e do estado real da interface, não uma captura de execução. `mundo-01-baixa.png` foi produzido pelo motor e pela câmera oficiais. O cartão aproxima a área de botões do Porto por CSS, sem alterar os pixels do arquivo ou redesenhar as letras. O link Abrir PNG completo preserva a cena inteira. A procedência aparece nas legendas PT/EN/ES. As fontes públicas apontam exclusivamente para os próprios ativos autorizados deste portfólio.

Nenhum HTML executável do jogo, código-fonte, trilha sonora, vídeo ou catálogo completo foi copiado para o portfólio. Os quatro quadros de travessia mostram os mundos 1, 4 e 8. A Praia das Conchas aparece nas duas marés para comparar o efeito da água. Não se deve ampliar esse escopo sem nova autorização.

## Estudo de caso

O desafio foi fazer a água alterar rotas sem introduzir pressão de tempo. O jogo só avança em passos válidos; a cada três, a maré troca de estado. JavaScript valida os comandos e Canvas 2D desenha o resultado. A campanha usa teclado ou toque e evolui de uma travessia simples para situações com outros obstáculos e objetivos. A documentação do jogo registra a execução das soluções das 231 fases; a vitrine não é uma distribuição do jogo.

## Manutenção

Atualize os três catálogos `content/portfolio*.json` em conjunto. O campo `url` liga o título e o botão Repositório ao GitHub do jogo. `demo` fica vazio porque o portfólio não oferece a edição jogável. A âncora estável é `#projeto-mare-miuda`; para inglês use `?lang=en#projeto-mare-miuda`. As imagens permanecem em galeria expansível e com carregamento preguiçoso.

Execute `npm run validate`. Confira os idiomas, busca por Maré/Tiny Tide, filtro Software, abertura da galeria, destino público do botão Repositório e layout desktop/móvel. O README principal e esta página são os documentos afetados.
