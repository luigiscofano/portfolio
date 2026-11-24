const icons = {
  'mare-miuda': 'diagram-project',
  intuicao: 'diagram-project',
  tupi: 'book-open',
  kaggle: 'database',
  gesturelab: 'flask',
  pokedex: 'code',
  labdig: 'microchip',
};
const colors = {
  'mare-miuda': '#215766',
  intuicao: '#477b58',
  tupi: '#2fa499',
  kaggle: '#d6a42b',
  gesturelab: '#477fba',
  pokedex: '#d55867',
  labdig: '#9168a4',
};

/** Novos projetos funcionam antes de receber uma identidade visual específica. */
export function projectPresentation(id) {
  return {
    icon: Object.hasOwn(icons, id) ? icons[id] : 'code',
    color: Object.hasOwn(colors, id) ? colors[id] : '#477b58',
  };
}
