// Formulário da atv1 convertido para JSX.
// Diferenças do HTML: class -> className, for -> htmlFor, value inicial -> defaultValue
function CommentForm() {
  function enviar(evento) {
    evento.preventDefault() // sem back-end, só evita recarregar a página
    alert('Comentário enviado! (simulação)')
    evento.target.reset()
  }

  return (
    <section id="comentarios" className="comments">
      <h2>Deixe seu comentário</h2>

      <form className="comment-form" onSubmit={enviar}>
        <div className="form-row">
          <div className="field">
            <label htmlFor="nome">Nome</label>
            <input type="text" id="nome" name="nome" placeholder="Como quer ser chamado" required minLength={2} maxLength={60} autoComplete="name" />
          </div>
          <div className="field">
            <label htmlFor="email">E-mail</label>
            <input type="email" id="email" name="email" placeholder="voce@exemplo.com" required autoComplete="email" />
          </div>
        </div>

        <div className="form-row">
          <div className="field">
            <label htmlFor="site">Site ou GitHub (opcional)</label>
            <input type="url" id="site" name="site" placeholder="https://github.com/usuario" />
          </div>
          <div className="field">
            <label htmlFor="experiencia">Anos de experiência com Oracle</label>
            <input type="number" id="experiencia" name="experiencia" min={0} max={40} step={1} defaultValue={0} />
          </div>
        </div>

        <div className="field">
          <label htmlFor="versao">Versão do Oracle que você usa</label>
          <select id="versao" name="versao" required defaultValue="">
            <option value="">Selecione uma versão</option>
            <option value="11g">11g</option>
            <option value="12c">12c</option>
            <option value="19c">19c</option>
            <option value="23ai">23ai</option>
          </select>
        </div>

        <fieldset className="field">
          <legend>Este post foi útil?</legend>
          <div className="choices">
            <label><input type="radio" name="util" value="sim" required /> Sim</label>
            <label><input type="radio" name="util" value="parcial" /> Em parte</label>
            <label><input type="radio" name="util" value="nao" /> Não</label>
          </div>
        </fieldset>

        <div className="field">
          <label htmlFor="comentario">Comentário</label>
          <textarea id="comentario" name="comentario" rows={5} placeholder="Conte como você investiga queries lentas" required minLength={10} maxLength={1000}></textarea>
        </div>

        <div className="field checkbox">
          <input type="checkbox" id="newsletter" name="newsletter" value="sim" />
          <label htmlFor="newsletter">Quero receber novos posts por e-mail</label>
        </div>

        <div className="form-actions">
          <button type="reset" className="btn btn-secondary">Limpar</button>
          <button type="submit" className="btn btn-primary">Publicar comentário</button>
        </div>
      </form>
    </section>
  )
}

export default CommentForm
