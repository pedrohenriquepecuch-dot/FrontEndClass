// Exibe o post. Todo o conteúdo chega por props vindas do App.
function Article({ titulo, autor, data, dataISO, tempoLeitura, plano, secoes, videoId }) {
  return (
    <article className="post">
      <header className="post-header">
        <h1>{titulo}</h1>
        <p className="post-meta">
          Por <strong>{autor}</strong>, em <time dateTime={dataISO}>{data}</time> · {tempoLeitura} min de leitura
        </p>
      </header>

      <figure className="plan">
        <pre>
          <code>
            {plano.linhas.map((linha, i) =>
              i === plano.destaque ? <mark key={i}>{linha + '\n'}</mark> : linha + '\n'
            )}
          </code>
        </pre>
        <figcaption>{plano.legenda}</figcaption>
      </figure>

      {/* Cada seção é renderizada a partir dos dados. Só aparece o que a seção tiver. */}
      {secoes.map((secao) => (
        <section key={secao.id} id={secao.id}>
          <h2>{secao.titulo}</h2>

          {secao.paragrafos && secao.paragrafos.map((texto, i) => <p key={i}>{texto}</p>)}

          {secao.codigo && (
            <pre className="code-block">
              <code>{secao.codigo}</code>
            </pre>
          )}

          {secao.depoisDoCodigo && <p>{secao.depoisDoCodigo}</p>}

          {secao.glossario && (
            <dl className="glossary">
              {secao.glossario.map((item) => (
                <div key={item.termo} className="glossary-item">
                  <dt>{item.termo}</dt>
                  <dd>{item.definicao}</dd>
                </div>
              ))}
            </dl>
          )}

          {secao.mostrarVideo && (
            <div className="video-wrapper">
              <iframe
                src={`https://www.youtube.com/embed/${videoId}`}
                title="Como ler um plano de execução no Oracle"
                allow="accelerometer; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                referrerPolicy="strict-origin-when-cross-origin"
                allowFullScreen
                loading="lazy"
              ></iframe>
            </div>
          )}

          {secao.alertas && (
            <ol className="alerts">
              {secao.alertas.map((alerta) => (
                <li key={alerta.titulo}>
                  <h3>{alerta.titulo}</h3>
                  <p>{alerta.texto}</p>
                </li>
              ))}
            </ol>
          )}
        </section>
      ))}
    </article>
  )
}

export default Article
