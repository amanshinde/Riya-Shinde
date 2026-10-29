import { useEffect, useState, useRef } from 'react'
import { profile, nav, themes, research, experience, expertise, publications, presentations, education } from './content.js'
import heroImg from '../riyashinde.png'
import resumePdf from '../Riya_Shinde.pdf'
import resumePage1 from './assets/resume_page_1.webp'
import resumePage2 from './assets/resume_page_2.webp'

const id = (s) => s.toLowerCase()

function Section({ name, title, children }) {
  return (
    <section id={id(name)} aria-labelledby={`${id(name)}-h`} className="section">
      <p className="eyebrow">{name}</p>
      <h2 id={`${id(name)}-h`}>{title || name}</h2>
      {children}
    </section>
  )
}

function Header() {
  const [active, setActive] = useState('')
  const [open, setOpen] = useState(false)

  useEffect(() => {
    const obs = new IntersectionObserver(
      (entries) => entries.forEach((e) => e.isIntersecting && setActive(e.target.id)),
      { rootMargin: '-40% 0px -55% 0px' }
    )
    nav.forEach((n) => { const el = document.getElementById(id(n)); el && obs.observe(el) })
    return () => obs.disconnect()
  }, [])

  useEffect(() => {
    const onKey = (e) => e.key === 'Escape' && setOpen(false)
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [])

  return (
    <header className="nav">
      <a className="wordmark" href="#top" aria-label="Riya Shinde, back to top">Riya Shinde</a>
      <button className="menu-btn" aria-expanded={open} aria-controls="nav-links" onClick={() => setOpen(!open)}>
        {open ? 'Close' : 'Menu'}
      </button>
      <nav aria-label="Primary">
        <ul id="nav-links" className={open ? 'open' : ''}>
          {nav.map((n) => (
            <li key={n}>
              <a href={`#${id(n)}`} aria-current={active === id(n) ? 'true' : undefined} onClick={() => setOpen(false)}>{n}</a>
            </li>
          ))}
        </ul>
      </nav>
    </header>
  )
}

function ResumeViewer() {
  const containerRef = useRef(null)

  const scrollToPage = (pageNum) => {
    if (!containerRef.current) return
    const target = containerRef.current.querySelector(`#resume-sheet-${pageNum}`)
    if (target) {
      target.scrollIntoView({ behavior: 'smooth', block: 'start' })
    }
  }

  return (
    <div className="resume-viewer">
      <div className="resume-toolbar">
        <div className="resume-toolbar-nav">
          <span className="resume-window-label">Scroll to view</span>
          <div className="resume-jump-btns">
            <button
              type="button"
              className="resume-tab"
              onClick={() => scrollToPage(1)}
            >
              Page 1
            </button>
            <button
              type="button"
              className="resume-tab"
              onClick={() => scrollToPage(2)}
            >
              Page 2
            </button>
          </div>
        </div>

        <div className="resume-actions-inline">
          <a className="btn btn-sm btn-icon" href={resumePdf} download="Riya_Shinde_Resume.pdf">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
              <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
              <polyline points="7 10 12 15 17 10" />
              <line x1="12" y1="15" x2="12" y2="3" />
            </svg>
            Download PDF
          </a>
          <a className="btn btn-sm btn-icon" href={resumePdf} target="_blank" rel="noopener noreferrer">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
              <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
              <polyline points="15 3 21 3 21 9" />
              <line x1="10" y1="14" x2="21" y2="3" />
            </svg>
            Open in New Tab
          </a>
        </div>
      </div>

      <div className="resume-scroll-window" ref={containerRef}>
        <article id="resume-sheet-1" className="resume-page-sheet">
          <div className="resume-page-tag">Page 1 of 2</div>
          <img
            src={resumePage1}
            alt="Riya Shinde Resume - Page 1"
            className="resume-page-img"
            loading="lazy"
          />
        </article>
        <article id="resume-sheet-2" className="resume-page-sheet">
          <div className="resume-page-tag">Page 2 of 2</div>
          <img
            src={resumePage2}
            alt="Riya Shinde Resume - Page 2"
            className="resume-page-img"
            loading="lazy"
          />
        </article>
      </div>
    </div>
  )
}

export default function App() {
  return (
    <>
      <a className="skip" href="#main">Skip to content</a>
      <Header />
      <main id="main">
        <div className="hero" id="top">
          <div className="hero-inner">
            <div className="hero-heading">
              <p className="eyebrow">{profile.descriptor}</p>
              <h1>{profile.name}</h1>
            </div>
            <div className="hero-photo">
              <img src={heroImg} alt="Riya Shinde" />
            </div>
            <div className="hero-body">
              <p className="lead">{profile.intro}</p>
              <div className="actions">
                <a className="btn" href="#research">Explore Research</a>
                <a className="btn" href="#publications">View Publications</a>
                <a className="btn" href="#resume">View Resume</a>
              </div>
            </div>
          </div>
        </div>

        <Section name="Research" title="Research Areas">
          <div className="grid">
            {themes.map(([t, d]) => (
              <article className="card" key={t}><h3>{t}</h3><p>{d}</p></article>
            ))}
          </div>
          <h3 className="sub">Selected Research Activities</h3>
          <ol className="entries">
            {research.map((r, i) => (
              <li key={r.title}>
                <span className="num" aria-hidden="true">{String(i + 1).padStart(2, '0')}</span>
                <div>
                  <h4>{r.title}</h4>
                  <p>{r.focus}</p>
                  {r.context && <p className="meta">{r.context}</p>}
                  {r.note && <p className="meta">{r.note}</p>}
                </div>
              </li>
            ))}
          </ol>
        </Section>

        <Section name="Experience">
          <ol className="entries">
            {experience.map((e) => (
              <li key={e.role + e.dates} className="job">
                <p className="dates">{e.dates}</p>
                <div>
                  <h3>{e.role}</h3>
                  <p className="meta">{e.org}{e.sub && ` · ${e.sub}`}</p>
                  <ul className="dots">{e.items.map((x) => <li key={x}>{x}</li>)}</ul>
                </div>
              </li>
            ))}
          </ol>
        </Section>

        <Section name="Expertise" title="Technical Expertise">
          <dl className="groups">
            {expertise.map(([k, v]) => (<div key={k}><dt>{k}</dt><dd>{v}</dd></div>))}
          </dl>
        </Section>

        <Section name="Publications" title="Selected Publications — In Preparation">
          <p className="meta">These manuscripts are in preparation and have not been published.</p>
          <ol className="pubs">
            {publications.map(([a, t]) => (<li key={t}><span>{a}</span> “{t}.”</li>))}
          </ol>
          <h3 className="sub">Presentations</h3>
          <ul className="pubs plain">
            {presentations.map(([a, b]) => (<li key={a}><strong>{a}</strong> — {b}</li>))}
          </ul>
        </Section>

        <Section name="Education">
          <ul className="edu">
            {education.map(([deg, school, meta, extra]) => (
              <li key={deg}><h3>{deg}</h3><p>{school}</p><p className="meta">{meta}</p>{extra && <p className="meta">{extra}</p>}</li>
            ))}
          </ul>
        </Section>

        <Section name="Resume" title="Curriculum Vitae / Resume">
          <p className="lead">
            Review my complete academic and professional credentials, research appointments, publications, and technical skill set.
          </p>
          <ResumeViewer />
        </Section>

        <Section name="Contact">
          <p className="lead">I welcome professional inquiries and research collaborations.</p>
          <a className="btn" href={`mailto:${profile.email}`}>Email {profile.name.split(' ')[0]}</a>
        </Section>
      </main>
      <footer className="footer">© {new Date().getFullYear()} {profile.name}</footer>
    </>
  )
}
