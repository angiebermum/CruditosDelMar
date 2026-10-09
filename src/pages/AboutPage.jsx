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
              <p>Ofrecer alimentos y bebidas de calidad, con una atención amable, ágil y personalizada, brindando a los clientes diferentes opciones de productos y facilitando el proceso de consulta y solicitud de pedidos.</p>
            </article>

            <article className="about__principle">
              <span className="about__principle-mark" aria-hidden="true" />
              <h3>Visión</h3>
              <p>Ser un emprendimiento reconocido en Puriscal y sus alrededores por la calidad y variedad de sus productos, la atención cercana a sus clientes y la incorporación de herramientas tecnológicas que apoyen su crecimiento.</p>
            </article>
          </div>
        </div>
      </section>
    </main>
  )
}

export default AboutPage
