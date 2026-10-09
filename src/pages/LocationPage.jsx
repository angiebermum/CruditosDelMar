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
              <span className="secondary-action location__action" aria-disabled="true">Cómo llegar</span>
            </article>

            <div className="map-placeholder location__map" aria-hidden="true">
              <span className="location__map-point location__map-point--start" />
              <span className="location__map-route" />
              <span className="location__map-point location__map-point--end" />
            </div>
          </div>
        </div>
      </section>
    </main>
  )
}

export default LocationPage
