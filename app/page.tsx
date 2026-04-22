// app/page.tsx
import { client } from "@/sanity/lib/client";
import ContactForm from "./ContactForm";
export const dynamic = "force-dynamic";
// ─── Types ────────────────────────────────────────────────────────────────────
interface Hero {
  titulo: string;
  descripcion: string;
}

interface Servicio {
  _id: string;
  titulo: string;
  descripcion: string;
}

// ─── Queries GROQ ─────────────────────────────────────────────────────────────
const heroQuery = `*[_type == "hero"][0]{ titulo, descripcion }`;
const serviciosQuery = `*[_type == "servicio"]{ _id, titulo, descripcion }`;

// ─── Page (Server Component) ──────────────────────────────────────────────────
export default async function Home() {
  const hero: Hero = await client.fetch(heroQuery);
  const servicios: Servicio[] = await client.fetch(serviciosQuery);

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Bebas+Neue&family=Libre+Baskerville:ital,wght@0,400;0,700;1,400&family=Space+Mono:wght@400;700&display=swap');

        :root {
          --negro: #0a0008;
          --blanco: #f5f0fa;
          --naranja: #ff6a00;
          --morado: #7c3aed;
          --gris: #160d1f;
        }

        * { margin: 0; padding: 0; box-sizing: border-box; }
        html { scroll-behavior: smooth; }

        body {
          background: var(--negro);
          color: var(--blanco);
          font-family: 'Libre Baskerville', serif;
          overflow-x: hidden;
          cursor: none;
        }

        /* CURSOR */
        .cursor {
          width: 12px; height: 12px;
          background: var(--naranja);
          border-radius: 50%;
          position: fixed;
          pointer-events: none;
          z-index: 9999;
          transition: transform 0.15s ease;
          mix-blend-mode: difference;
        }
        .cursor-ring {
          width: 40px; height: 40px;
          border: 1px solid var(--blanco);
          border-radius: 50%;
          position: fixed;
          pointer-events: none;
          z-index: 9998;
          transition: all 0.25s ease;
          mix-blend-mode: difference;
        }

        /* NAV */
        nav {
          position: fixed; top: 0; left: 0; right: 0;
          z-index: 100;
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 1.5rem 3rem;
          mix-blend-mode: difference;
        }
        .logo {
          font-family: 'Bebas Neue', sans-serif;
          font-size: 1.8rem;
          letter-spacing: 0.15em;
          color: var(--blanco);
          text-decoration: none;
        }
        .nav-links { display: flex; gap: 2.5rem; list-style: none; }
        .nav-links a {
          font-family: 'Space Mono', monospace;
          font-size: 0.7rem;
          letter-spacing: 0.2em;
          text-transform: uppercase;
          color: var(--blanco);
          text-decoration: none;
          transition: color 0.2s;
        }
        .nav-links a:hover { color: var(--naranja); }

        /* HERO */
        .hero {
          min-height: 100vh;
          display: grid;
          grid-template-columns: 1fr 1fr;
          position: relative;
          overflow: hidden;
        }
        .hero-left {
          background: var(--negro);
          display: flex;
          flex-direction: column;
          justify-content: flex-end;
          padding: 6rem 3rem 5rem;
          position: relative;
          z-index: 2;
        }
        .hero-tag {
          font-family: 'Space Mono', monospace;
          font-size: 0.65rem;
          letter-spacing: 0.3em;
          color: var(--naranja);
          text-transform: uppercase;
          margin-bottom: 2rem;
          opacity: 0;
          animation: fadeUp 0.8s 0.3s forwards;
        }
        .hero-titulo {
          font-family: 'Bebas Neue', sans-serif;
          font-size: clamp(4rem, 8vw, 9rem);
          line-height: 0.9;
          letter-spacing: -0.02em;
          margin-bottom: 2rem;
          opacity: 0;
          animation: fadeUp 0.8s 0.5s forwards;
        }
        .hero-titulo span { color: var(--naranja); display: block; }
        .hero-desc {
          font-size: 1rem;
          line-height: 1.7;
          color: #aaa;
          max-width: 360px;
          opacity: 0;
          animation: fadeUp 0.8s 0.7s forwards;
        }
        .hero-right {
          background: var(--morado);
          position: relative;
          overflow: hidden;
        }
        .hero-right::before {
          content: '';
          position: absolute;
          inset: 0;
          background: repeating-linear-gradient(
            45deg, transparent, transparent 40px,
            rgba(0,0,0,0.07) 40px, rgba(0,0,0,0.07) 80px
          );
        }
        .hero-numero {
          position: absolute;
          bottom: 3rem; right: 3rem;
          font-family: 'Bebas Neue', sans-serif;
          font-size: 18rem;
          line-height: 1;
          color: rgba(0,0,0,0.15);
          pointer-events: none;
        }
        .hero-cta {
          position: absolute;
          bottom: 5rem; left: 3rem;
          opacity: 0;
          animation: fadeUp 0.8s 0.9s forwards;
        }
        .btn-primary {
          display: inline-flex;
          align-items: center;
          gap: 1rem;
          background: var(--negro);
          color: var(--blanco);
          font-family: 'Space Mono', monospace;
          font-size: 0.75rem;
          letter-spacing: 0.2em;
          text-transform: uppercase;
          padding: 1.2rem 2rem;
          text-decoration: none;
          transition: all 0.3s;
          border: 2px solid transparent;
        }
        .btn-primary:hover {
          background: transparent;
          border-color: var(--negro);
          color: var(--negro);
        }
        .btn-primary .arrow { display: inline-block; transition: transform 0.3s; }
        .btn-primary:hover .arrow { transform: translateX(6px); }

        /* MARQUEE */
        .marquee-wrap {
          background: var(--naranja);
          padding: 1rem 0;
          overflow: hidden;
          white-space: nowrap;
        }
        .marquee-inner {
          display: inline-flex;
          animation: marquee 20s linear infinite;
        }
        .marquee-item {
          font-family: 'Bebas Neue', sans-serif;
          font-size: 1.2rem;
          letter-spacing: 0.3em;
          color: var(--blanco);
          padding: 0 3rem;
        }
        @keyframes marquee {
          from { transform: translateX(0); }
          to { transform: translateX(-50%); }
        }

        /* SERVICIOS */
        .servicios { padding: 8rem 3rem; }
        .section-label {
          font-family: 'Space Mono', monospace;
          font-size: 0.65rem;
          letter-spacing: 0.3em;
          color: var(--naranja);
          text-transform: uppercase;
          margin-bottom: 1rem;
        }
        .section-titulo {
          font-family: 'Bebas Neue', sans-serif;
          font-size: clamp(3rem, 6vw, 5.5rem);
          line-height: 0.95;
          margin-bottom: 5rem;
        }
        .servicios-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 0;
          border: 1px solid #2a1840;
        }
        .servicio-item {
          padding: 3rem 2.5rem;
          border-right: 1px solid #2a1840;
          border-bottom: 1px solid #2a1840;
          position: relative;
          overflow: hidden;
          transition: background 0.4s;
        }
        .servicio-item:hover { background: var(--gris); }
        .servicio-item::after {
          content: '';
          position: absolute;
          bottom: 0; left: 0;
          width: 0; height: 3px;
          background: var(--naranja);
          transition: width 0.4s;
        }
        .servicio-item:hover::after { width: 100%; }
        .servicio-num {
          font-family: 'Bebas Neue', sans-serif;
          font-size: 4rem;
          color: #2a1840;
          line-height: 1;
          margin-bottom: 1.5rem;
        }
        .servicio-nombre {
          font-family: 'Bebas Neue', sans-serif;
          font-size: 1.8rem;
          letter-spacing: 0.05em;
          margin-bottom: 1rem;
        }
        .servicio-desc { font-size: 0.85rem; line-height: 1.7; color: #888; }

        /* NÚMEROS */
        .numeros {
          background: var(--morado);
          padding: 6rem 3rem;
          display: grid;
          grid-template-columns: repeat(4, 1fr);
        }
        .numero-item {
          text-align: center;
          padding: 2rem;
          border-right: 1px solid rgba(255,255,255,0.2);
        }
        .numero-item:last-child { border-right: none; }
        .numero-val {
          font-family: 'Bebas Neue', sans-serif;
          font-size: 5rem;
          line-height: 1;
          color: var(--negro);
        }
        .numero-label {
          font-family: 'Space Mono', monospace;
          font-size: 0.65rem;
          letter-spacing: 0.2em;
          color: rgba(0,0,0,0.6);
          text-transform: uppercase;
          margin-top: 0.5rem;
        }

        /* PROCESO */
        .proceso { background: var(--gris); padding: 8rem 3rem; }
        .proceso-pasos {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          gap: 3rem;
          margin-top: 5rem;
          position: relative;
        }
        .proceso-pasos::before {
          content: '';
          position: absolute;
          top: 2.5rem; left: 12%; right: 12%;
          height: 1px;
          background: linear-gradient(to right, transparent, var(--naranja), transparent);
        }
        .paso { text-align: center; position: relative; }
        .paso-num {
          width: 5rem; height: 5rem;
          border: 1px solid var(--naranja);
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          margin: 0 auto 1.5rem;
          font-family: 'Bebas Neue', sans-serif;
          font-size: 1.5rem;
          color: var(--naranja);
          background: var(--gris);
          position: relative; z-index: 2;
          transition: all 0.3s;
        }
        .paso:hover .paso-num { background: var(--naranja); color: var(--blanco); }
        .paso-titulo {
          font-family: 'Bebas Neue', sans-serif;
          font-size: 1.4rem;
          letter-spacing: 0.05em;
          margin-bottom: 0.75rem;
        }
        .paso-desc { font-size: 0.82rem; color: #888; line-height: 1.6; }

        /* CTA CONTACTO */
        .cta-final {
          padding: 10rem 3rem;
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 5rem;
          align-items: center;
          position: relative;
          overflow: hidden;
        }
        .cta-final::before {
          content: 'BTL';
          position: absolute;
          right: -5%; top: 50%;
          transform: translateY(-50%);
          font-family: 'Bebas Neue', sans-serif;
          font-size: 25vw;
          color: rgba(255,255,255,0.02);
          pointer-events: none;
        }
        .cta-titulo {
          font-family: 'Bebas Neue', sans-serif;
          font-size: clamp(4rem, 7vw, 7rem);
          line-height: 0.9;
        }
        .cta-titulo em {
          font-style: italic;
          color: var(--naranja);
          font-family: 'Libre Baskerville', serif;
        }
        .cta-form { display: flex; flex-direction: column; gap: 1.5rem; }
        .form-row { display: grid; grid-template-columns: 1fr 1fr; gap: 1rem; }
        .form-group { display: flex; flex-direction: column; gap: 0.5rem; }
        .form-group label {
          font-family: 'Space Mono', monospace;
          font-size: 0.6rem;
          letter-spacing: 0.25em;
          color: #666;
          text-transform: uppercase;
        }
        .form-group input, .form-group select, .form-group textarea {
          background: var(--gris);
          border: 1px solid #2a1840;
          color: var(--blanco);
          padding: 0.9rem 1.1rem;
          font-family: 'Libre Baskerville', serif;
          font-size: 0.9rem;
          outline: none;
          transition: border-color 0.2s;
          -webkit-appearance: none;
        }
        .form-group input:focus, .form-group select:focus, .form-group textarea:focus {
          border-color: var(--naranja);
        }
        .form-group textarea { resize: none; height: 120px; }
        .btn-enviar {
          background: var(--naranja);
          color: var(--blanco);
          border: none;
          font-family: 'Bebas Neue', sans-serif;
          font-size: 1.3rem;
          letter-spacing: 0.15em;
          padding: 1.2rem 2rem;
          cursor: pointer;
          transition: opacity 0.3s;
        }
        .btn-enviar:hover { opacity: 0.85; }

        /* FOOTER */
        footer {
          background: var(--negro);
          border-top: 1px solid #1f0f2e;
          padding: 4rem 3rem 2rem;
        }
        .footer-grid {
          display: grid;
          grid-template-columns: 2fr 1fr 1fr 1fr;
          gap: 4rem;
          margin-bottom: 4rem;
        }
        .footer-logo {
          font-family: 'Bebas Neue', sans-serif;
          font-size: 3rem;
          letter-spacing: 0.1em;
          line-height: 1;
          margin-bottom: 1rem;
        }
        .footer-tagline { font-size: 0.85rem; color: #666; line-height: 1.6; max-width: 280px; }
        .footer-col-title {
          font-family: 'Space Mono', monospace;
          font-size: 0.6rem;
          letter-spacing: 0.25em;
          color: var(--naranja);
          text-transform: uppercase;
          margin-bottom: 1.5rem;
        }
        .footer-links { list-style: none; display: flex; flex-direction: column; gap: 0.8rem; }
        .footer-links a { font-size: 0.85rem; color: #666; text-decoration: none; transition: color 0.2s; }
        .footer-links a:hover { color: var(--blanco); }
        .footer-bottom {
          border-top: 1px solid #1f0f2e;
          padding-top: 2rem;
          display: flex;
          justify-content: space-between;
          align-items: center;
        }
        .footer-copy {
          font-family: 'Space Mono', monospace;
          font-size: 0.6rem;
          letter-spacing: 0.15em;
          color: #444;
        }
        .footer-social { display: flex; gap: 2rem; }
        .footer-social a {
          font-family: 'Space Mono', monospace;
          font-size: 0.6rem;
          letter-spacing: 0.15em;
          color: #444;
          text-decoration: none;
          transition: color 0.2s;
        }
        .footer-social a:hover { color: var(--naranja); }

        /* SCROLL REVEAL */
        .reveal {
          opacity: 0;
          transform: translateY(40px);
          transition: opacity 0.7s ease, transform 0.7s ease;
        }
        .reveal.visible { opacity: 1; transform: translateY(0); }

        /* SCROLL HINT */
        .scroll-hint {
          position: absolute;
          bottom: 2rem; left: 50%;
          transform: translateX(-50%);
          font-family: 'Space Mono', monospace;
          font-size: 0.6rem;
          letter-spacing: 0.25em;
          color: #555;
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 0.5rem;
          z-index: 10;
        }
        .scroll-line {
          width: 1px; height: 50px;
          background: linear-gradient(to bottom, #555, transparent);
          animation: scrollAnim 1.5s infinite;
        }

        @keyframes fadeUp {
          from { opacity: 0; transform: translateY(30px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes scrollAnim {
          0%  { transform: scaleY(0); transform-origin: top; }
          50% { transform: scaleY(1); transform-origin: top; }
          51% { transform: scaleY(1); transform-origin: bottom; }
          100%{ transform: scaleY(0); transform-origin: bottom; }
        }

        /* RESPONSIVE */
        @media (max-width: 900px) {
          .hero { grid-template-columns: 1fr; }
          .hero-right { height: 300px; }
          .servicios-grid { grid-template-columns: 1fr; }
          .numeros { grid-template-columns: 1fr 1fr; }
          .proceso-pasos { grid-template-columns: 1fr 1fr; }
          .proceso-pasos::before { display: none; }
          .cta-final { grid-template-columns: 1fr; }
          .footer-grid { grid-template-columns: 1fr 1fr; gap: 2rem; }
          .form-row { grid-template-columns: 1fr; }
          nav { padding: 1.2rem 1.5rem; }
        }
      `}</style>

      {/* CURSOR */}
      <div className="cursor" id="cursor" />
      <div className="cursor-ring" id="cursorRing" />

      {/* NAV */}
      <nav>
        <a href="#" className="logo">FIERA LAB</a>
        <ul className="nav-links">
          <li><a href="#servicios">Servicios</a></li>
          <li><a href="#proceso">Proceso</a></li>
          <li><a href="#contacto">Contacto</a></li>
        </ul>
      </nav>

      {/* HERO — datos desde Sanity */}
      <section className="hero">
        <div className="hero-left">
          <p className="hero-tag">↗ Agencia de Marketing BTL</p>
          <h1 className="hero-titulo">
            {hero?.titulo
              ? hero.titulo.split(" ").map((word: string, i: number) =>
                  i === Math.floor(hero.titulo.split(" ").length / 2)
                    ? <span key={i}>{word} </span>
                    : <span key={i}>{word} </span>
                )
              : (
                <>
                  DONDE<br />
                  <span>LA FIERA</span>
                  RUGE
                </>
              )
            }
          </h1>
          <p className="hero-desc">
            {hero?.descripcion ?? "Diseñamos y ejecutamos activaciones, eventos y experiencias de marca que generan impacto real."}
          </p>
        </div>
        <div className="hero-right">
          <div className="hero-numero">01</div>
          <div className="hero-cta">
            <a href="#contacto" className="btn-primary">
              Hablemos de tu proyecto <span className="arrow">→</span>
            </a>
          </div>
        </div>
        <div className="scroll-hint">
          <span>SCROLL</span>
          <div className="scroll-line" />
        </div>
      </section>

      {/* MARQUEE */}
      <div className="marquee-wrap">
        <div className="marquee-inner">
          {["ACTIVACIONES","✦","EVENTOS EN VIVO","✦","EXPERIENCIAS DE MARCA","✦","SAMPLING","✦","STREET MARKETING","✦","MERCHANDISING","✦",
            "ACTIVACIONES","✦","EVENTOS EN VIVO","✦","EXPERIENCIAS DE MARCA","✦","SAMPLING","✦","STREET MARKETING","✦","MERCHANDISING","✦"].map((item, i) => (
            <span className="marquee-item" key={i}>{item}</span>
          ))}
        </div>
      </div>

      {/* SERVICIOS — datos desde Sanity */}
      <section className="servicios" id="servicios">
        <p className="section-label reveal">— Lo que hacemos</p>
        <h2 className="section-titulo reveal">NUESTROS<br />SERVICIOS</h2>
        <div className="servicios-grid">
          {servicios && servicios.length > 0
            ? servicios.map((servicio, i) => (
                <div className="servicio-item reveal" key={servicio._id}>
                  <div className="servicio-num">0{i + 1}</div>
                  <h3 className="servicio-nombre">{servicio.titulo}</h3>
                  <p className="servicio-desc">{servicio.descripcion}</p>
                </div>
              ))
            : (
              // Fallback si Sanity no devuelve datos aún
              [
                { n: "01", t: "Activaciones de Marca", d: "Generamos puntos de contacto únicos entre tu marca y el consumidor." },
                { n: "02", t: "Eventos & Lanzamientos", d: "Producción integral de eventos corporativos y lanzamientos de producto." },
                { n: "03", t: "Street Marketing", d: "Tomamos las calles para llevar tu mensaje directamente al consumidor." },
              ].map((s) => (
                <div className="servicio-item reveal" key={s.n}>
                  <div className="servicio-num">{s.n}</div>
                  <h3 className="servicio-nombre">{s.t}</h3>
                  <p className="servicio-desc">{s.d}</p>
                </div>
              ))
            )
          }
        </div>
      </section>

      {/* NÚMEROS */}
      <div className="numeros">
        {[
          { val: "+200", label: "Campañas ejecutadas" },
          { val: "12",   label: "Años de experiencia" },
          { val: "+80",  label: "Marcas aliadas" },
          { val: "6M",   label: "Personas impactadas" },
        ].map((n) => (
          <div className="numero-item reveal" key={n.label}>
            <div className="numero-val">{n.val}</div>
            <div className="numero-label">{n.label}</div>
          </div>
        ))}
      </div>

      {/* PROCESO */}
      <section className="proceso" id="proceso">
        <p className="section-label reveal">— Cómo trabajamos</p>
        <h2 className="section-titulo reveal">NUESTRO<br />PROCESO</h2>
        <div className="proceso-pasos">
          {[
            { n: "01", t: "Diagnóstico",  d: "Analizamos tu marca, audiencia y objetivos para entender las oportunidades reales." },
            { n: "02", t: "Estrategia",   d: "Diseñamos el concepto, canales, timing y métricas de éxito alineadas a tu presupuesto." },
            { n: "03", t: "Producción",   d: "Ejecutamos con precisión. Coordinamos equipo, materiales y logística." },
            { n: "04", t: "Resultados",   d: "Medimos, reportamos y optimizamos. Cada campaña genera aprendizajes." },
          ].map((p) => (
            <div className="paso reveal" key={p.n}>
              <div className="paso-num">{p.n}</div>
              <h3 className="paso-titulo">{p.t}</h3>
              <p className="paso-desc">{p.d}</p>
            </div>
          ))}
        </div>
      </section>

      {/* CONTACTO */}
      <section className="cta-final" id="contacto">
        <div>
          <p className="section-label reveal">— Comencemos</p>
          <h2 className="cta-titulo reveal">TU MARCA<br />MERECE<br /><em>ESTAR</em><br />EN TODAS<br />PARTES</h2>
        </div>
        <ContactForm servicios={servicios ?? []} />
      </section>

      {/* FOOTER */}
      <footer>
        <div className="footer-grid">
          <div>
            <div className="footer-logo">FIERA LAB</div>
            <p className="footer-tagline">Agencia BTL especializada en crear experiencias que conectan marcas con personas en el mundo real.</p>
          </div>
          <div>
            <p className="footer-col-title">Servicios</p>
            <ul className="footer-links">
              {servicios?.map((s) => (
                <li key={s._id}><a href="#servicios">{s.titulo}</a></li>
              ))}
            </ul>
          </div>
          <div>
            <p className="footer-col-title">Empresa</p>
            <ul className="footer-links">
              <li><a href="#">Nosotros</a></li>
              <li><a href="#">Blog</a></li>
              <li><a href="#">Trabaja con nosotros</a></li>
            </ul>
          </div>
          <div>
            <p className="footer-col-title">Contacto</p>
            <ul className="footer-links">
              <li><a href="#">hola@fieralab.com</a></li>
              <li><a href="#">Lima, Perú</a></li>
            </ul>
          </div>
        </div>
        <div className="footer-bottom">
          <span className="footer-copy">© 2025 FIERA LAB — Todos los derechos reservados</span>
          <div className="footer-social">
            <a href="#">Instagram</a>
            <a href="#">LinkedIn</a>
            <a href="#">TikTok</a>
          </div>
        </div>
      </footer>

      {/* SCRIPTS — cursor + scroll reveal + contadores */}
      <script dangerouslySetInnerHTML={{ __html: `
        // Cursor
        const cursor = document.getElementById('cursor');
        const ring = document.getElementById('cursorRing');
        let mx = 0, my = 0, rx = 0, ry = 0;
        document.addEventListener('mousemove', e => {
          mx = e.clientX; my = e.clientY;
          cursor.style.left = mx - 6 + 'px';
          cursor.style.top  = my - 6 + 'px';
        });
        (function animRing() {
          rx += (mx - rx - 20) * 0.12;
          ry += (my - ry - 20) * 0.12;
          ring.style.left = rx + 'px';
          ring.style.top  = ry + 'px';
          requestAnimationFrame(animRing);
        })();
        document.querySelectorAll('a, button, input, select, textarea').forEach(el => {
          el.addEventListener('mouseenter', () => { cursor.style.transform = 'scale(2)'; ring.style.transform = 'scale(1.5)'; });
          el.addEventListener('mouseleave', () => { cursor.style.transform = 'scale(1)'; ring.style.transform = 'scale(1)'; });
        });

        // Scroll reveal
        const observer = new IntersectionObserver(entries => {
          entries.forEach((e, i) => {
            if (e.isIntersecting) {
              setTimeout(() => e.target.classList.add('visible'), i * 80);
              observer.unobserve(e.target);
            }
          });
        }, { threshold: 0.1 });
        document.querySelectorAll('.reveal').forEach(el => observer.observe(el));

        // Contadores
        const animateCounters = () => {
          document.querySelectorAll('.numero-val').forEach(el => {
            const text = el.textContent;
            const match = text.match(/[\\d.]+/);
            if (!match) return;
            const target = parseFloat(match[0]);
            const suffix = text.includes('+') ? '+' : (text.includes('M') ? 'M' : '');
            let start = 0;
            const inc = target / 60;
            const timer = setInterval(() => {
              start = Math.min(start + inc, target);
              el.textContent = (suffix === '+' ? '+' : '') + Math.round(start) + (suffix === 'M' ? 'M' : '');
              if (start >= target) clearInterval(timer);
            }, 25);
          });
        };
        const numObs = new IntersectionObserver(entries => {
          if (entries[0].isIntersecting) { animateCounters(); numObs.disconnect(); }
        });
        const numSection = document.querySelector('.numeros');
        if (numSection) numObs.observe(numSection);

        // Botón enviar
        const btnEnviar = document.querySelector('.btn-enviar');
        if (btnEnviar) {
          btnEnviar.addEventListener('click', function() {
            this.textContent = '✓ MENSAJE ENVIADO';
            this.style.background = '#5b21b6';
            setTimeout(() => {
              this.textContent = 'ENVIAR MENSAJE →';
              this.style.background = '';
            }, 3000);
          });
        }
      `}} />
    </>
  );
}