import test from 'node:test';
import assert from 'node:assert/strict';
import { matchesProject } from '../lib/project-search.mjs';
const project = {
  name: 'Intuição',
  summary: 'Jogos de raciocínio',
  technologies: ['TypeScript'],
  category: 'Software',
};
test('search combines category with normalized title, summary and technology', () => {
  assert.equal(matchesProject(project, 'Todos', ' intuicao '), true);
  assert.equal(matchesProject(project, 'Software', 'raciocinio'), true);
  assert.equal(matchesProject(project, 'Todos', 'typescript'), true);
  assert.equal(matchesProject(project, 'IA', 'intuicao'), false);
  assert.equal(matchesProject(project, 'Todos', 'inexistente'), false);
  assert.equal(matchesProject(project, 'Todos', ''), true);
});
