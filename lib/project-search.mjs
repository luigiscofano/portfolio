// Busca ignora acentos sem alterar o texto original exibido.
const normalize = (value) =>
  value
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .toLocaleLowerCase()
    .trim();
export function matchesProject(project, category, query) {
  const content = [project.name, project.summary, ...project.technologies].join(
    ' ',
  );
  return (
    (category === 'Todos' || project.category === category) &&
    normalize(content).includes(normalize(query))
  );
}
