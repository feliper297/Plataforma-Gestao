import logo from './assets/logo.svg'
import './App.css'

function App() {
  return (
    <>
      <section id="center">
        <div style={{ padding: '40px 0 24px' }}>
          <img src={logo} alt="PeopleHub" style={{ height: 48, width: 'auto' }} />
        </div>
        <div>
          <h1>PeopleHub Design System</h1>
          <p>Biblioteca de componentes e tokens visuais do PeopleHub</p>
        </div>
      </section>

      <div className="ticks"></div>

      <section id="next-steps">
        <div id="docs" style={{ gridColumn: '1 / -1' }}>
          <h2>Brand</h2>
          <p>Logo e identidade visual</p>
          <ul>
            <li style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
              <span style={{ fontWeight: 500 }}>Logo — fundo claro</span>
              <div style={{ background: '#f8f8f8', borderRadius: 8, padding: '12px 24px', display: 'inline-flex' }}>
                <img src={logo} alt="PeopleHub" style={{ height: 36 }} />
              </div>
            </li>
            <li style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
              <span style={{ fontWeight: 500 }}>Logo — fundo escuro</span>
              <div style={{ background: '#1a1a2e', borderRadius: 8, padding: '12px 24px', display: 'inline-flex' }}>
                <img src={logo} alt="PeopleHub" style={{ height: 36 }} />
              </div>
            </li>
          </ul>
        </div>
      </section>

      <div className="ticks"></div>
      <section id="spacer"></section>
    </>
  )
}

export default App
