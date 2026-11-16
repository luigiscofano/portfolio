# Idiomas do portfólio

A interface oferece português (padrão), inglês e espanhol. A seleção explícita é preservada no navegador e no parâmetro `?lang=pt|en|es`. O atributo HTML `lang` acompanha a escolha. Sem acesso ao armazenamento, a troca continua funcionando e o endereço preserva o idioma.

## Conteúdo e manutenção

- `content/portfolio.json`, `portfolio.en.json` e `portfolio.es.json`: biografia, projetos, formação, trajetória e textos alternativos.
- `content/ui.en.json` e `ui.es.json`: rótulos da interface, com chaves em português.
- `content/project-cases.json`: estudos de caso, com fontes e limitações.
- `content/credits.json`: créditos e licenças nos três idiomas.
- `public/images/sections/*-es.svg`: diagramas informativos localizados, sem modificar imagens documentais originais.
- `hooks/use-portfolio-language.ts`: seleção, endereço, persistência e idioma do documento.

As três versões mantêm os mesmos identificadores, links, recursos e fatos. Marcas, nomes próprios, fontes e imagens originais não são adulterados para tradução. Os PDFs disponíveis continuam em português e inglês, identificados corretamente em espanhol; não há currículo PDF espanhol inventado.

Ao editar uma experiência ou projeto, atualizar os três conteúdos. Executar `node --test tests/*.test.mjs`, TypeScript e build. Conferir o seletor, busca, menus, créditos, recarga com idioma salvo e acesso direto por parâmetro em telas largas e estreitas.

## Verificações

Os testes comparam estrutura, catálogo completo, URLs, ativos, dados não textuais, cobertura dos rótulos, casos e diagramas. Também protegem limites factuais: estudante (não graduado), contribuição front-end no BTG, supervisão acadêmica e ausência de treinamento próprio no GestureLab. A revisão humana de tradução continua necessária quando o conteúdo muda.
