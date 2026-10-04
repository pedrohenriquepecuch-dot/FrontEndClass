// Recebe o título do blog e, como children, o que for colocado entre <Header> e </Header>
function Header({ titulo, children }) {
  // Pinta os "_" do título com a cor de destaque
  const partes = titulo.split('_')

  return (
    <header className="site-header">
      <a href="#" className="logo">
        {partes.map((parte, i) => (
          <span key={i}>
            {i > 0 && <span className="logo-sep">_</span>}
            {parte}
          </span>
        ))}
      </a>
      {children}
    </header>
  )
}

export default Header
