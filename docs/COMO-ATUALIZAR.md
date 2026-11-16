# Como atualizar o portfólio

Este guia fica apenas no repositório, fora da navegação do site. O conteúdo é separado do design.

## Conteúdo e revisão
- Edite content/portfolio.json e content/portfolio.en.json em conjunto para manter PT e EN consistentes.
- Edite content/ui.en.json para traduções da interface.
- Novos projetos entram em projects com autoria, limites, referências, links e imagens.
- Atualize profile, education e experience para biografia, formação e trajetória.
- Imagens ficam em public/images/. Currículos revisados ficam em public/documents/; confira texto, links, metadados e permissões antes da publicação.
- Preserve fatos comprováveis e indique claramente demonstrações e limitações.

## Fluxo de desenvolvimento
1. Crie uma branch temática.
2. Faça as alterações e execute npm run validate.
3. Teste desktop, mobile, teclado e idiomas.
4. Revise o diff e crie um PR. Integre após as verificações.
5. Execute manualmente Publish portfolio to GitHub Pages na main e confirme a versão ao vivo.

Pushes não publicam automaticamente. O GitHub Pages serve a exportação estática, sem banco de dados ou painel administrativo. A cópia chatgpt.site é independente e não sincroniza automaticamente. Não publique segredos nem documentos privados.

Também é possível pedir uma atualização ao assistente indicando fatos, textos e links; a publicação depende das permissões e do fluxo de revisão.
