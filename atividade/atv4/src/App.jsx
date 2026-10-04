import Header from './components/Header.jsx'
import Navigation from './components/Navigation.jsx'
import Article from './components/Article.jsx'
import Sidebar from './components/Sidebar.jsx'
import CommentForm from './components/CommentForm.jsx'
import Footer from './components/Footer.jsx'

// ---------------------------------------------------------------
// DADOS: ficam no App e descem para os componentes via props
// ---------------------------------------------------------------

const links = [
  { id: 1, texto: 'Artigos', href: '#', atual: true },
  { id: 2, texto: 'PL/SQL', href: '#' },
  { id: 3, texto: 'Performance', href: '#' },
  { id: 4, texto: 'Comentar', href: '#comentarios' },
]

const post = {
  titulo: 'Por que sua query está lenta? Lendo um plano de execução no Oracle',
  autor: 'Pedro',
  data: '27 de setembro de 2026',
  dataISO: '2026-09-27',
  tempoLeitura: 7,
  videoId: 'NkXxRodAFUY',

  plano: {
    linhas: [
      '| Id | Operation                     | Name          | Rows | Cost |',
      '|----|-------------------------------|---------------|------|------|',
      '|  0 | SELECT STATEMENT              |               |   12 | 4821 |',
      '|  1 |  HASH JOIN                    |               |   12 | 4821 |',
      '|  2 |   TABLE ACCESS BY INDEX ROWID | CLIENTE       |    1 |    3 |',
      '|  3 |    INDEX UNIQUE SCAN          | PK_CLIENTE    |    1 |    2 |',
      '|  4 |   TABLE ACCESS FULL           | FATURA        | 2.1M | 4817 |',
    ],
    destaque: 6, // índice da linha que recebe <mark>
    legenda:
      'A linha 4 concentra quase todo o custo: o Oracle está lendo a tabela FATURA inteira para devolver 12 linhas.',
  },

  secoes: [
    {
      id: 'introducao',
      titulo: 'A query que funcionava ontem',
      paragrafos: [
        'Todo desenvolvedor de banco já viveu isso: uma consulta que rodava em segundos passa a levar minutos, e ninguém mudou uma vírgula no código. Antes de sair criando índice em tudo, existe uma ferramenta que mostra exatamente o que o banco está fazendo: o plano de execução.',
        'Neste post você vai aprender a gerar esse plano, a ler cada coluna e a reconhecer os sinais mais comuns de problema.',
      ],
    },
    {
      id: 'gerando',
      titulo: 'Como gerar o plano',
      paragrafos: [
        'O caminho mais simples é pedir ao otimizador que explique a query sem executá-la, e depois exibir o resultado com o pacote DBMS_XPLAN:',
      ],
      codigo: `EXPLAIN PLAN FOR
SELECT c.nome, f.valor
  FROM cliente c
  JOIN fatura  f ON f.id_cliente = c.id
 WHERE c.id = :id_cliente;

SELECT * FROM TABLE(DBMS_XPLAN.DISPLAY);`,
      depoisDoCodigo:
        'O plano é lido de dentro para fora: as operações mais indentadas acontecem primeiro e entregam as linhas para a operação "pai".',
    },
    {
      id: 'colunas',
      titulo: 'O que cada coluna quer dizer',
      glossario: [
        { termo: 'Operation', definicao: 'O que o banco faz naquele passo: ler a tabela inteira, usar um índice, juntar dois conjuntos.' },
        { termo: 'Rows', definicao: 'Quantas linhas o otimizador acha que vão sair dali. Estimativa errada costuma significar estatísticas desatualizadas.' },
        { termo: 'Cost', definicao: 'Um número relativo de esforço. Serve para comparar passos do mesmo plano, não planos de bancos diferentes.' },
      ],
    },
    {
      id: 'video',
      titulo: 'Veja na prática',
      paragrafos: ['Se preferir aprender vendo, este vídeo mostra a leitura de um plano passo a passo:'],
      mostrarVideo: true,
    },
    {
      id: 'sinais',
      titulo: 'Três sinais de alerta',
      alertas: [
        { titulo: 'TABLE ACCESS FULL em tabela grande', texto: 'Nem sempre é ruim, mas se o filtro devolve poucas linhas, provavelmente falta um índice ou a condição impede o uso dele.' },
        { titulo: 'Função na coluna indexada', texto: 'WHERE TRUNC(data_venc) = ... faz o índice de data_venc ser ignorado. Prefira comparar por intervalo.' },
        { titulo: 'Rows muito diferente da realidade', texto: 'Se o plano diz 1 linha e voltam 2 milhões, atualize as estatísticas com DBMS_STATS antes de qualquer outra coisa.' },
      ],
    },
    {
      id: 'conclusao',
      titulo: 'Conclusão',
      paragrafos: [
        'O plano de execução transforma "a query está lenta" em "o passo 4 lê 2 milhões de linhas sem precisar". Com esse diagnóstico em mãos, a correção deixa de ser tentativa e erro.',
      ],
    },
  ],
}

const autorInfo =
  'Desenvolvedor backend que passa boa parte do dia entre PL/SQL, Oracle Forms e planos de execução.'

const postsRelacionados = [
  { id: 1, titulo: 'BULK COLLECT e FORALL sem mistério', href: '#' },
  { id: 2, titulo: 'Quando um índice atrapalha', href: '#' },
  { id: 3, titulo: 'Estatísticas: o que o otimizador sabe da sua tabela', href: '#' },
]

// ---------------------------------------------------------------
// COMPONENTE PRINCIPAL
// ---------------------------------------------------------------

function App() {
  return (
    <>
      {/* Navigation vai como "children" do Header, para ficar dentro do <header> */}
      <Header titulo="plano_de_execução">
        <Navigation links={links} />
      </Header>

      <main className="layout">
        <Article
          titulo={post.titulo}
          autor={post.autor}
          data={post.data}
          dataISO={post.dataISO}
          tempoLeitura={post.tempoLeitura}
          plano={post.plano}
          secoes={post.secoes}
          videoId={post.videoId}
        />

        <Sidebar sobreAutor={autorInfo} posts={postsRelacionados} />

        <CommentForm />
      </main>

      <Footer ano={2026} nomeBlog="plano_de_execução" email="contato@exemplo.com" />
    </>
  )
}

export default App
