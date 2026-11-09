import { sitePath } from '@/lib/site-path';
import data from '@/content/portfolio.json';
export const metadata = { title: 'Como atualizar | Luigi Scofano' };
export default function UpdatePage() {
  return (
    <article className="update-page">
      <a href={sitePath('/')}>← Voltar ao portfólio</a>
      <p className="eyebrow">UM PORTFÓLIO QUE ACOMPANHA A TRAJETÓRIA</p>
      <h1>Fácil de continuar.</h1>
      <p>
        O conteúdo deste site está separado do design. Novos projetos,
        experiências e mudanças na formação podem entrar sem reconstruir a
        página.
      </p>
      <p className="note">
        Esta cópia estática é publicada no GitHub Pages. As alterações precisam
        ser enviadas ao repositório e o workflow de publicação deve ser
        executado manualmente. A versão no Sites é independente.
      </p>
      <h2>Pelo ChatGPT</h2>
      <ol>
        <li>
          Compartilhe o link deste portfólio na conversa em que ele foi criado.
        </li>
        <li>
          Conte o que mudou e envie os textos, links ou imagens que devem
          entrar. Por exemplo: “Adicione meu novo projeto e atualize minha
          formação”.
        </li>
        <li>
          Peça a revisão do código e, quando desejar, autorize a publicação no
          GitHub Pages. Mudar o conteúdo não muda automaticamente quem pode
          acessá-lo.
        </li>
      </ol>
      <h2>Editando o código</h2>
      <p>
        O arquivo <code>content/portfolio.json</code> centraliza apresentação,
        contatos, projetos, pesquisa, formação e experiências. Os arquivos
        visuais estão em <code>public/images/</code>. A versão inglesa fica em{' '}
        <code>content/portfolio.en.json</code>: atualize os dois arquivos quando
        mudar informações. Os rótulos da interface ficam em{' '}
        <code>content/ui.en.json</code>.
      </p>
      <ul>
        <li>
          <strong>Novo projeto:</strong> adicione uma entrada à lista{' '}
          <code>projects</code> seguindo os campos das demais, incluindo
          autoria, limites e links.
        </li>
        <li>
          <strong>Vida e carreira:</strong> atualize <code>profile</code>,{' '}
          <code>education</code> e <code>experience</code>.
        </li>
        <li>
          <strong>Currículos:</strong> substitua somente arquivos revisados em{' '}
          <code>public/documents/</code> e atualize os links de{' '}
          <code>profile.resume</code> e <code>profile.resumePt</code> nos dois
          idiomas. Confira texto extraível, links e metadados antes de publicar
          dados pessoais.
        </li>
        <li>
          <strong>Conferência:</strong> execute <code>npm run validate</code> e
          siga o README do código-fonte para validar e publicar. A alteração do
          JSON só aparece no site após uma nova publicação.
        </li>
      </ul>
      <p className="note">
        Esta página é um guia, não um painel administrativo. Não existe
        formulário que salve alterações no navegador nem sincronização
        automática com GitHub ou LinkedIn.
      </p>
      <h2>Fontes e manutenção</h2>
      <p>
        Esta versão foi preparada a partir dos{' '}
        <a href={data.profile.github}>repositórios públicos de Luigi</a>. Cada
        projeto tem links para sua documentação e registra o alcance das
        demonstrações. Revise informações e imagens antes de futuras
        publicações.
      </p>
      <p>Última revisão de conteúdo: {data.updated}.</p>
    </article>
  );
}
