import React from 'react';
import Head from '@docusaurus/Head';
import Layout from '@theme/Layout';
import {HtmlClassNameProvider} from '@docusaurus/theme-common';
import styles from './index.module.css';

function BrandMark({className}: {className?: string}): React.JSX.Element {
  return (
    <svg
      className={className}
      viewBox="0 0 96 96"
      role="img"
      aria-label="Substratum Labs hexagon and lens mark"
      xmlns="http://www.w3.org/2000/svg">
      <polygon
        className={styles.logoHex}
        points="48 7 83.5 27.5 83.5 68.5 48 89 12.5 68.5 12.5 27.5"
      />
      <circle className={styles.logoRing} cx="48" cy="48" r="25" />
      <circle className={styles.logoCore} cx="48" cy="48" r="8.5" />
      <g className={styles.logoBlades}>
        <path d="M48 23c8.6 0 16.2 4.3 20.7 10.8-7-1.9-13.3-0.8-18.1 3.7" />
        <path d="M68.7 33.8c4.3 7.4 4.5 16.1 0.8 23.1-1.9-7-6-11.8-12.2-13.7" />
        <path d="M69.5 56.9C65.2 64.3 57.5 68.7 49.6 69c5.1-5.1 7.3-11.2 5.9-17.7" />
        <path d="M49.6 69C41 69 33.4 64.7 28.9 58.2c7 1.9 13.3 0.8 18.1-3.7" />
        <path d="M28.9 58.2c-4.3-7.4-4.5-16.1-0.8-23.1 1.9 7 6 11.8 12.2 13.7" />
        <path d="M28.1 35.1C32.4 27.7 40.1 23.3 48 23c-5.1 5.1-7.3 11.2-5.9 17.7" />
      </g>
    </svg>
  );
}

function ScopeIcon({type}: {type: 'Observe' | 'Decide' | 'Act' | 'Audit'}): React.JSX.Element {
  return (
    <svg className={styles.scopeIcon} viewBox="0 0 48 48" aria-hidden="true">
      {type === 'Observe' && (
        <>
          <circle cx="24" cy="24" r="15" />
          <circle cx="24" cy="24" r="4" />
          <path d="M8 24h7M33 24h7M24 8v7M24 33v7" />
        </>
      )}
      {type === 'Decide' && (
        <>
          <path d="M24 8v30M12 18h24M16 18l-7 12h14l-7-12zM32 18l-7 12h14l-7-12z" />
          <path d="M18 40h12" />
        </>
      )}
      {type === 'Act' && (
        <>
          <path d="M12 34V14l24 10-24 10z" />
          <path d="M29 24h11" />
        </>
      )}
      {type === 'Audit' && (
        <>
          <path d="M16 10h14l6 6v22H16z" />
          <path d="M30 10v8h8M21 24h12M21 31h12" />
        </>
      )}
    </svg>
  );
}

function TrustIcon({type}: {type: string}): React.JSX.Element {
  return (
    <svg className={styles.trustIcon} viewBox="0 0 48 48" aria-hidden="true">
      {type === 'Operator Reviewed' && (
        <>
          <path d="M24 7l15 6v10c0 9.8-5.8 15.7-15 19-9.2-3.3-15-9.2-15-19V13z" />
          <path d="M16 24l5 5 11-12" />
        </>
      )}
      {type === 'Auditable Decisions' && (
        <>
          <path d="M24 8v30M12 17h24M16 17L9 30h14zM32 17l-7 13h14zM17 40h14" />
        </>
      )}
      {type === 'Safety by Design' && (
        <>
          <rect x="13" y="21" width="22" height="18" rx="2" />
          <path d="M17 21v-5a7 7 0 0 1 14 0v5M24 28v5" />
        </>
      )}
      {type === 'Data Sovereignty' && (
        <>
          <ellipse cx="24" cy="12" rx="14" ry="5" />
          <path d="M10 12v24c0 2.8 6.3 5 14 5s14-2.2 14-5V12" />
          <path d="M10 24c0 2.8 6.3 5 14 5s14-2.2 14-5" />
        </>
      )}
    </svg>
  );
}

function ArgoNavisGraphic(): React.JSX.Element {
  return (
    <svg className={styles.productGraphic} viewBox="0 0 520 220" aria-hidden="true">
      <defs>
        <filter id="soft-blue-glow" x="-40%" y="-40%" width="180%" height="180%">
          <feGaussianBlur stdDeviation="2.4" result="blur" />
          <feMerge>
            <feMergeNode in="blur" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
      </defs>
      <rect className={styles.graphFrame} x="1" y="1" width="518" height="218" rx="10" />
      <path className={styles.graphGrid} d="M40 110h440M260 22v176" />
      <circle className={styles.scopeRing} cx="260" cy="110" r="42" />
      <circle className={styles.scopeRingMuted} cx="260" cy="110" r="74" />
      <circle className={styles.scopeRingMuted} cx="260" cy="110" r="105" />
      <path className={styles.coastTrack} d="M70 68c94 32 161 56 232 67 52 8 96 10 158 18" />
      <path className={styles.riskTrack} d="M84 176c90-27 178-61 253-89 42-15 76-28 106-37" />
      <path className={styles.burnArc} d="M164 79c74 54 140 82 223 82 31 0 57-2 79-4" filter="url(#soft-blue-glow)" />
      <circle className={styles.riskNode} cx="219" cy="102" r="9" />
      <circle className={styles.riskPulse} cx="219" cy="102" r="23" />
      <path className={styles.burnVector} d="M186 88l-19-23 28 11z" />
      <path className={styles.assetMarker} d="M118 86l10-10 10 10-10 10z" />
      <path className={styles.assetMarkerBlue} d="M381 161l8-8 8 8-8 8z" />
      <path className={styles.warningMarker} d="M310 78l8-15 8 15z" />
      <text className={styles.graphLabel} x="32" y="34">HUD: RISK TRIAGE</text>
      <text className={styles.graphAlert} x="32" y="54">RISK SCORE: 1.42e-4 [HIGH]</text>
      <text className={styles.graphLabel} x="318" y="34">TCA: T-12m 42s</text>
      <text className={styles.graphBlueLabel} x="168" y="72">DELTA-V BURN</text>
      <text className={styles.graphBlueLabel} x="32" y="196">MANEUVER PLAN: +0.12 m/s</text>
      <text className={styles.graphLabel} x="440" y="196">RANGE: 124m</text>
    </svg>
  );
}

function ArgusOrbGraphic(): React.JSX.Element {
  return (
    <svg className={styles.productGraphic} viewBox="0 0 520 220" aria-hidden="true">
      <rect className={styles.graphFrame} x="1" y="1" width="518" height="218" rx="10" />
      <circle className={styles.orbitalCore} cx="260" cy="112" r="45" />
      <ellipse className={styles.orbitLine} cx="260" cy="112" rx="136" ry="30" transform="rotate(10 260 112)" />
      <ellipse className={styles.orbitLine} cx="260" cy="112" rx="144" ry="34" transform="rotate(-28 260 112)" />
      <ellipse className={styles.orbitLine} cx="260" cy="112" rx="122" ry="28" transform="rotate(46 260 112)" />
      <ellipse className={styles.orbitLineDashed} cx="260" cy="112" rx="96" ry="118" transform="rotate(30 260 112)" />
      <path className={styles.meshLine} d="M160 76l110 71 92-88M174 154l170-3M214 48l30 130M296 51l-73 105" />
      <circle className={styles.satNode} cx="154" cy="78" r="5" />
      <circle className={styles.satNode} cx="250" cy="59" r="4" />
      <circle className={styles.satNode} cx="345" cy="150" r="5" />
      <circle className={styles.satNode} cx="298" cy="166" r="4" />
      <circle className={styles.satNodeWhite} cx="218" cy="164" r="5" />
      <circle className={styles.anomalyNode} cx="318" cy="69" r="9" />
      <text className={styles.graphLabel} x="38" y="34">ORBIT DATABASE: ONLINE</text>
      <text className={styles.graphBlueLabel} x="38" y="54">ACTIVE TRACKS: 10,880 SATS</text>
      <text className={styles.graphLabel} x="412" y="34">EPOCH: UTC-7</text>
      <text className={styles.graphLabel} x="38" y="196">SWEEP STATUS: CONTINUOUS INGESTION</text>
      <text className={styles.graphAlert} x="372" y="196">ANOMALIES: 14,149</text>
    </svg>
  );
}

const scopeItems = [
  {
    title: 'Observe',
    copy: 'Track objects, fuse telemetry, estimate uncertainty, detect anomalies.',
  },
  {
    title: 'Decide',
    copy: 'Triage risks, compare maneuver trades, prioritize operator attention.',
  },
  {
    title: 'Act',
    copy: 'Gate commands, preserve operator authority, execute bounded workflows.',
  },
  {
    title: 'Audit',
    copy: 'Record assumptions, decisions, approvals, and safety evidence.',
  },
];

const trustItems = [
  {
    title: 'Operator Reviewed',
    copy: 'AI proposes. Operators approve. Every plan is reviewable before execution.',
  },
  {
    title: 'Auditable Decisions',
    copy: 'Trade studies, gates, and assumptions are preserved as decision records.',
  },
  {
    title: 'Safety by Design',
    copy: 'Risk thresholds, safety gates, and fallback paths are first-class workflow objects.',
  },
  {
    title: 'Data Sovereignty',
    copy: 'Deployable around operator data boundaries with controlled ingestion and export.',
  },
];

export default function Home(): React.JSX.Element {
  return (
    <HtmlClassNameProvider className="homepage-page">
      <Layout noFooter>
        <Head>
          <title>Substratum Labs | Intelligent Infrastructure for Space Operations</title>
          <meta
            name="description"
            content="Intelligent infrastructure for space operations, from satellite fleet safety to autonomous mission operations."
          />
          <link rel="preconnect" href="https://fonts.googleapis.com" />
          <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
          <link
            href="https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,400;0,500;0,600;1,400&family=Inter:wght@300;400;500;600;700&display=swap"
            rel="stylesheet"
          />
        </Head>

        <div className={styles.page}>
          <div className={styles.milkyWay} />
          <div className={styles.gridBackground} />
          <div className={styles.stars} />

          <nav className={styles.nav} aria-label="Primary navigation">
            <a href="/" className={styles.logoContainer} aria-label="Substratum Labs home">
              <BrandMark className={styles.logoSvg} />
              <span className={styles.logoText}>Substratum Labs</span>
            </a>
            <div className={styles.navLinks}>
              <a href="#argonavis" className={styles.navLink}>ArgoNavis</a>
              <a href="#argusorb" className={styles.navLink}>ArgusOrb</a>
              <a href="#research" className={styles.navLink}>Research</a>
              <a href="#about" className={styles.navLink}>About</a>
              <a href="#contact" className={styles.navLink}>Contact</a>
            </div>
          </nav>

          <header className={styles.hero}>
            <svg className={styles.orbitalGraphic} viewBox="0 0 1000 1000" aria-hidden="true">
              <g transform="translate(520, 505) rotate(-19)">
                <line x1="-420" y1="0" x2="420" y2="0" />
                <line x1="0" y1="-420" x2="0" y2="420" />
                <ellipse cx="0" cy="0" rx="360" ry="148" />
                <ellipse cx="0" cy="0" rx="252" ry="104" />
                <ellipse cx="0" cy="0" rx="160" ry="64" className={styles.orbitDashed} />
                <ellipse cx="0" cy="0" rx="282" ry="116" className={styles.heroOrbitOffset} transform="rotate(18)" />
                <path className={styles.heroTransitLine} d="M-430 182C-286 95-118 38 108-32 250-76 365-122 455-178" />
                <circle cx="-258" cy="-83" r="5" />
                <circle cx="257" cy="84" r="3" />
                <circle cx="138" cy="-80" r="6" />
                <circle cx="-160" cy="67" r="4" />
                <circle cx="-44" cy="-50" r="3.5" />
              </g>
            </svg>

            <div className={styles.heroContent}>
              <h1 className={styles.heroTitle}>Intelligent Infrastructure for Space Operations</h1>
              <p className={styles.heroSubtitle}>
                From satellite fleet safety to autonomous mission operations: operator-reviewed AI systems for
                risk triage, maneuver planning, and auditable safety gates.
              </p>
              <a href="#contact" className={styles.btn}>Request demo</a>
            </div>
          </header>

          <main>
            <section className={styles.productsSection} aria-labelledby="products-title">
              <div className={styles.sectionIntro}>
                <h2 id="products-title" className={styles.sectionTitle}>Observe the field. Navigate the response.</h2>
              </div>

              <div className={styles.productsGrid}>
                <article id="argonavis" className={styles.productCard}>
                  <span className={styles.productLabel}>Operations Console</span>
                  <h3>ArgoNavis</h3>
                  <p>Operator-facing workflows for risk triage, maneuver planning, and safety gates.</p>
                  <ArgoNavisGraphic />
                  <a className={styles.exploreLink} href="#contact">Request Demo</a>
                </article>

                <article id="argusorb" className={styles.productCard}>
                  <span className={styles.productLabel}>Orbital Intelligence Foundation</span>
                  <h3>ArgusOrb</h3>
                  <p>Data, models, and algorithms for space traffic, uncertainty, and anomalies.</p>
                  <ArgusOrbGraphic />
                  <a className={styles.exploreLink} href="#research">Explore ArgusOrb</a>
                </article>
              </div>
            </section>

            <section id="research" className={styles.scopeSection} aria-labelledby="scope-title">
              <div className={styles.sectionIntro}>
                <h2 id="scope-title" className={styles.sectionTitle}>A Full Stack for Space Operations</h2>
              </div>
              <div className={styles.scopeGrid}>
                {scopeItems.map((item) => (
                  <article className={styles.scopeItem} key={item.title}>
                    <ScopeIcon type={item.title as 'Observe' | 'Decide' | 'Act' | 'Audit'} />
                    <h3>{item.title}</h3>
                    <p>{item.copy}</p>
                  </article>
                ))}
              </div>
            </section>

            <section id="about" className={styles.trustSection} aria-labelledby="trust-title">
              <div className={styles.sectionIntro}>
                <h2 id="trust-title" className={styles.sectionTitle}>Built for Mission-Critical Operations</h2>
              </div>
              <div className={styles.trustTimeline}>
                {trustItems.map((item, index) => (
                  <article
                    className={`${styles.trustItem} ${index % 2 === 0 ? styles.trustLeft : styles.trustRight}`}
                    key={item.title}>
                    <span className={styles.trustNode} aria-hidden="true" />
                    <div className={styles.trustCopy}>
                      <TrustIcon type={item.title} />
                      <h3>{item.title}</h3>
                      <p>{item.copy}</p>
                    </div>
                  </article>
                ))}
              </div>
            </section>
          </main>

          <footer id="contact" className={styles.footer}>
            <div className={styles.footerBrand}>
              <BrandMark className={styles.footerLogo} />
              <div>
                <span className={styles.footerWordmark}>Substratum Labs</span>
                <p>Intelligent infrastructure for high-consequence space operations.</p>
              </div>
            </div>

            <div className={styles.footerColumns}>
              <div>
                <h3>Products</h3>
                <a href="#argonavis">ArgoNavis</a>
                <a href="#argusorb">ArgusOrb</a>
              </div>
              <div>
                <h3>Research</h3>
                <a href="/blog">Papers</a>
                <a href="#about">Safety Notes</a>
              </div>
              <div>
                <h3>Company</h3>
                <a href="#about">About</a>
                <a href="#contact">Contact</a>
              </div>
            </div>

            <div className={styles.footerBottom}>© 2026 Substratum Labs. All systems nominal.</div>
          </footer>
        </div>
      </Layout>
    </HtmlClassNameProvider>
  );
}
