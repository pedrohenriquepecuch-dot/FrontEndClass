// Recebe o texto "sobre o autor" e a lista de posts relacionados
function Sidebar({ sobreAutor, posts }) {
  return (
    <aside className="sidebar">
      <section className="author">
        <h2>Sobre o autor</h2>
        <p>{sobreAutor}</p>
      </section>

      <section className="related">
        <h2>Leia também</h2>
        <ul>
          {posts.map((post) => (
            <li key={post.id}>
              <a href={post.href}>{post.titulo}</a>
            </li>
          ))}
        </ul>
      </section>
    </aside>
  )
}

export default Sidebar
