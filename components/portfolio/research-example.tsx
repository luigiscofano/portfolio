import { externalLink } from '@/lib/portfolio';

// A simulação explica o processo; não representa uma execução do OCR ou um verbete real.
export function ResearchExample({
  language,
}: {
  language: 'pt' | 'en' | 'es';
}) {
  const en = language === 'en';
  const steps =
    language === 'es'
      ? [
          [
            '1. Fuente de demostración',
            'Documento ficticio, página 01, línea 03: “casa”.',
          ],
          [
            '2. Extracción por OCR',
            'Salida simulada: “c8sa”. El texto extraído se conserva para compararlo.',
          ],
          [
            '3. Revisión humana',
            'Texto revisado: “casa”. Decisión ilustrativa: sustituir “8” por “a” tras comprobar la fuente.',
          ],
          [
            'Trazabilidad propuesta',
            'Registro demo-001 · fuente ficticia · página 01, línea 03 · extracción c8sa · revisión casa · estado revisado. El motivo del cambio queda vinculado al registro.',
          ],
          [
            'Qué documenta el proyecto público',
            'Importación TSV, campo normalizado en NFC separado, preservación del original, fuente/página/línea, revisión pendiente, auditoría y exportación CSV/JSONL. Se documentan OCR opcional mediante Tesseract y métricas CER/WER, pero este ejemplo no presenta resultados medidos. Estas herramientas pertenecen a la edición de portafolio; no implican que se utilizara todo el pipeline en la etapa original de la investigación.',
          ],
        ]
      : en
        ? [
            [
              '1. Demonstration source',
              'Fictional document, page 01, line 03: “casa”.',
            ],
            [
              '2. OCR extraction',
              'Simulated output: “c8sa”. The extracted text is retained for comparison.',
            ],
            [
              '3. Human review',
              'Reviewed text: “casa”. Illustrative decision: replace “8” with “a” after checking the source.',
            ],
            [
              'Proposed traceability',
              'Record demo-001 · fictional source · page 01, line 03 · extraction c8sa · revision casa · status reviewed. The reason for the change stays linked to the record.',
            ],
            [
              'What the public project documents',
              'TSV import, a separate NFC-normalized field, preservation of the original, source/page/line, pending-review status, auditing and CSV/JSONL export. Optional Tesseract OCR and CER/WER metrics are documented, but this example reports no measured results. These tools belong to the portfolio edition; they do not imply that the entire pipeline was used in the original research.',
            ],
          ]
        : [
            [
              '1. Fonte demonstrativa',
              'Documento fictício, página 01, linha 03: “casa”.',
            ],
            [
              '2. Extração por OCR',
              'Saída simulada: “c8sa”. O texto extraído é preservado para comparação.',
            ],
            [
              '3. Revisão humana',
              'Texto revisado: “casa”. Decisão ilustrativa: substituir “8” por “a” após conferir a fonte.',
            ],
            [
              'Rastreabilidade proposta',
              'Registro demo-001 · fonte fictícia · página 01, linha 03 · extração c8sa · revisão casa · estado revisado. A justificativa da mudança fica vinculada ao registro.',
            ],
            [
              'O que o projeto público documenta',
              'Importação TSV, campo normalizado em NFC separado, preservação do original, fonte/página/linha, revisão pendente, auditoria e exportação CSV/JSONL. OCR opcional via Tesseract e métricas CER/WER estão documentados, mas esta amostra não apresenta resultados medidos. Essas ferramentas pertencem à edição de portfólio; não implicam uso de todo o pipeline na etapa original da pesquisa.',
            ],
          ];
  return (
    <details className="about-details research-example">
      <summary>
        {en
          ? 'Illustrative example: from source to review'
          : language === 'es'
            ? 'Ejemplo ilustrativo: de la fuente a la revisión'
            : 'Exemplo ilustrativo: da fonte à revisão'}
      </summary>
      <div className="about-prose">
        <p>
          <strong>
            {en
              ? 'Fictional example in Portuguese.'
              : language === 'es'
                ? 'Ejemplo ficticio en portugués.'
                : 'Exemplo fictício em português.'}
          </strong>{' '}
          {en
            ? 'Not an Old Tupi entry, research corpus content or an actual OCR result.'
            : language === 'es'
              ? 'No es una entrada en tupí antiguo, contenido del corpus de investigación ni un resultado real de OCR.'
              : 'Não é um verbete em Tupi, conteúdo do corpus de pesquisa nem resultado real de OCR.'}
        </p>
        {steps.map(([title, text]) => (
          <div key={title}>
            <h4>{title}</h4>
            <p>{text}</p>
          </div>
        ))}
        <p>
          <a
            href="https://github.com/luigiscofano/ic-pln-tupi-antigo/blob/main/tupi/pipeline.py"
            {...externalLink}
          >
            {en
              ? 'Inspect the data pipeline'
              : language === 'es'
                ? 'Inspeccionar el pipeline de datos'
                : 'Inspecionar o pipeline de dados'}
          </a>{' '}
          ·{' '}
          <a
            href="https://github.com/luigiscofano/ic-pln-tupi-antigo/blob/main/data/demo.tsv"
            {...externalLink}
          >
            {en
              ? 'Three synthetic records'
              : language === 'es'
                ? 'Tres registros sintéticos'
                : 'Três registros sintéticos'}
          </a>{' '}
          ·{' '}
          <a
            href="https://github.com/luigiscofano/ic-pln-tupi-antigo/blob/main/docs/PROCEDENCIA.md"
            {...externalLink}
          >
            {en
              ? 'Provenance and limits'
              : language === 'es'
                ? 'Procedencia y limitaciones'
                : 'Procedência e limites'}
          </a>
        </p>
      </div>
    </details>
  );
}
