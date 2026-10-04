// Recebe a lista de links por props e gera um <li> para cada um com map()
function Navigation({ links }) {
  return (
    <nav aria-label="Navegação principal">
      <ul>
        {links.map((link) => (
          <li key={link.id}>
            <a href={link.href} aria-current={link.atual ? 'page' : undefined}>
              {link.texto}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  )
}

export default Navigation
