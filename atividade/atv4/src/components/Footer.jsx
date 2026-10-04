function Footer({ ano, nomeBlog, email }) {
  return (
    <footer className="site-footer">
      <p>&copy; {ano} {nomeBlog}. Feito para a disciplina de Front-End.</p>
      <address>
        Contato: <a href={`mailto:${email}`}>{email}</a>
      </address>
    </footer>
  )
}

export default Footer
