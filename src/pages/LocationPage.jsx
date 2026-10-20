import storefrontPhoto from '../assets/local-cruditos-del-mar-completo.jpg'

function LocationPage() {
  return (
    <main className="location-page">
      <section className="page-section location" aria-labelledby="location-title">
        <div className="content-width">
          <header className="location__intro">
            <h2 id="location-title">Ubicación</h2>
            <p>Encuéntranos fácilmente</p>
          </header>

          <div className="location__layout">
            <article className="location__card">
              <span className="location__pin" aria-hidden="true" />
              <div className="location__place">
                <h3>Santiago de Puriscal</h3>
                <p>San José, Costa Rica</p>
              </div>
              <p className="location__reference">50 metros al norte de la Delegación Policial de Puriscal, diagonal a Maxi Palí.</p>
              <a
                className="secondary-action location__action"
                href="https://maps.app.goo.gl/wwxbWZedtMxFAk167?g_st=iw"
                target="_blank"
                rel="noopener noreferrer"
              >
                Cómo llegar
              </a>
            </article>

            <a
              className="location__photo"
              href={storefrontPhoto}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Ver foto completa del local en una pestaña nueva"
            >
              <img src={storefrontPhoto} alt="Frente del local de Cruditos del Mar en Santiago de Puriscal" />
              <span className="location__photo-hint">Ver foto completa</span>
            </a>
          </div>
        </div>
      </section>
    </main>
  )
}

export default LocationPage
