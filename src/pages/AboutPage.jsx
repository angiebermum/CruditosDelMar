import logo from '../assets/logo-cruditos-del-mar.jpg'

function AboutPage() {
  return (
    <main className="about-page">
      <section className="page-section about" aria-labelledby="about-title">
        <div className="content-width">
          <header className="about__intro">
            <h2 id="about-title">Quiénes somos</h2>
            <p>Conoce un poco más de Cruditos del Mar</p>
          </header>

          <div className="about__story-layout">
            <div className="about__logo-panel">
              <img className="about__logo" src={logo} alt="Logo oficial de Cruditos del Mar" />
            </div>

            <article className="about__story">
              <h3>Nuestra historia</h3>
              <p>Cruditos del Mar inició operaciones el 6 de junio de 2025 en Santiago de Puriscal, San José. El emprendimiento fue creado por Vinicio Bonilla Fuentes como parte de su objetivo de desarrollar un negocio propio dedicado a la preparación y comercialización de alimentos y bebidas.</p>
              <p>Durante sus inicios, el negocio se enfocó principalmente en la venta de caldosas, ceviches y otros productos relacionados con alimentos del mar. Posteriormente amplió su oferta con nuevas opciones para responder a las preferencias de sus clientes.</p>
            </article>
          </div>

          <div className="about__principles">
            <article className="about__principle">
              <span className="about__principle-mark" aria-hidden="true" />
              <h3>Misión</h3>
              <p>Brindar a los clientes productos gastronómicos con altos estándares de calidad, destacando el sabor único del local y promover el bienestar a través de ingredientes frescos y nutritivos.</p>
            </article>

            <article className="about__principle">
              <span className="about__principle-mark" aria-hidden="true" />
              <h3>Visión</h3>
              <p>Ser reconocidos a nivel nacional como una de las mejores opciones de soda y cevichería, con proyección de crecimiento y expansión, manteniendo siempre el compromiso con la calidad y satisfacción del cliente.</p>
            </article>
          </div>
        </div>
      </section>
    </main>
  )
}

export default AboutPage
