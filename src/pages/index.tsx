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
    <svg className={styles.productGraphic} viewBox="0 0 680 320" preserveAspectRatio="xMidYMid meet" aria-hidden="true">
      <defs>
        <filter id="argo-blue-glow" x="-40%" y="-40%" width="180%" height="180%">
          <feGaussianBlur stdDeviation="2.8" result="blur" />
          <feMerge>
            <feMergeNode in="blur" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
        <filter id="argo-risk-glow" x="-80%" y="-80%" width="260%" height="260%">
          <feGaussianBlur stdDeviation="4" result="blur" />
          <feMerge>
            <feMergeNode in="blur" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
      </defs>
      <rect className={styles.graphFrame} x="1" y="1" width="678" height="318" rx="10" />
      <g className={styles.graphFineGrid}>
        <path d="M38 92h604M38 178h604M38 244h604" />
        <path d="M170 32v256M340 32v256M510 32v256" />
      </g>
      <path className={styles.graphGrid} d="M38 178h604M340 32v256" />
      <g transform="translate(340 178)">
        <circle className={styles.scopeRing} r="40" />
        <circle className={styles.scopeRingMuted} r="75" />
        <circle className={styles.scopeRingMuted} r="112" />
        <path className={styles.scopeTicks} d="M0-112v12M0 100v12M-112 0h12M100 0h12" />
      </g>
      <path className={styles.coastTrack} d="M84 124C190 146 265 171 340 188c92 21 171 33 255 52" />
      <path className={styles.riskTrack} d="M105 274C209 229 302 183 388 139c70-36 130-63 190-84" />
      <path
        className={styles.burnArc}
        d="M270 146C320 186 385 216 458 226c52 7 103 6 155 0"
        filter="url(#argo-blue-glow)"
      />
      <g filter="url(#argo-risk-glow)">
        <circle className={styles.riskPulseOuter} cx="327" cy="177" r="31" />
        <circle className={styles.riskPulse} cx="327" cy="177" r="20" />
        <circle className={styles.riskNode} cx="327" cy="177" r="9" />
      </g>
      <path className={styles.burnVector} d="M270 146l-31-13 13-16z" />
      <path className={styles.assetMarker} d="M191 145l11-11 11 11-11 11z" />
      <path className={styles.assetMarkerBlue} d="M502 229l10-10 10 10-10 10z" />
      <path className={styles.warningMarker} d="M422 139l10-18 10 18z" />
      <path className={styles.vectorGuide} d="M252 128l-17-15M432 139l-5 24" />
      <text className={styles.graphLabel} x="38" y="36">HUD: CONJUNCTION ASSESSMENT</text>
      <text className={styles.graphAlert} x="38" y="58">COLLISION RISK: 1.42e-4 [HIGH]</text>
      <text className={styles.graphLabel} x="437" y="36">TCA: T-12m 42s</text>
      <text className={styles.graphBlueLabel} x="237" y="108">ΔV BURN</text>
      <text className={styles.graphBlueLabel} x="38" y="291">MANEUVER PLAN: ΔV BURN (+0.12 m/s)</text>
      <text className={styles.graphLabel} x="572" y="291">RANGE: 124m</text>
    </svg>
  );
}

function ArgusOrbGraphic(): React.JSX.Element {
  return (
    <svg className={styles.productGraphic} viewBox="0 0 680 320" preserveAspectRatio="xMidYMid meet" aria-hidden="true">
      <defs>
        <radialGradient id="orb-core-glow" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#355f7a" stopOpacity="0.18" />
          <stop offset="70%" stopColor="#142f45" stopOpacity="0.07" />
          <stop offset="100%" stopColor="#07101b" stopOpacity="0" />
        </radialGradient>
        <radialGradient id="earth-ocean" cx="36%" cy="30%" r="72%">
          <stop offset="0%" stopColor="#26475f" />
          <stop offset="58%" stopColor="#142f46" />
          <stop offset="100%" stopColor="#081522" />
        </radialGradient>
        <clipPath id="earth-clip">
          <circle cx="352" cy="174" r="56" />
        </clipPath>
        <filter id="orb-anomaly-glow" x="-100%" y="-100%" width="300%" height="300%">
          <feGaussianBlur stdDeviation="4" result="blur" />
          <feMerge>
            <feMergeNode in="blur" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
      </defs>
      <rect className={styles.graphFrame} x="1" y="1" width="678" height="318" rx="10" />
      <g>
        <circle cx="352" cy="174" r="112" fill="url(#orb-core-glow)" />
        <ellipse className={styles.orbitLineMuted} cx="352" cy="174" rx="197" ry="58" transform="rotate(8 352 174)" />
        <ellipse className={styles.orbitLine} cx="352" cy="174" rx="181" ry="52" transform="rotate(-27 352 174)" />
        <ellipse className={styles.orbitLine} cx="352" cy="174" rx="170" ry="49" transform="rotate(38 352 174)" />
        <ellipse className={styles.orbitLineDashed} cx="352" cy="174" rx="108" ry="142" transform="rotate(26 352 174)" />
        <path className={styles.meshLine} d="M184 117l109 42M411 139l74-53M209 230l91-35M406 199l111 42" />
        <g transform="translate(70.4 34.8) scale(0.8)">
          <g clipPath="url(#earth-clip)">
            <circle className={styles.earthOcean} cx="352" cy="174" r="56" />
            <path
              className={styles.earthLand}
              d="M321 130l-15 10-8 14 9 8 7 13-5 12 10 8 5 18 10 11 7-9-4-18 7-14-8-9 5-13 10-9-11-7-8-12z"
            />
            <path
              className={styles.earthLand}
              d="M360 132l15-7 22 7 12 11-9 8 8 9-14 6-6 17-11 21-10-3 4-17-9-10-5-14-12-5 4-13z"
            />
            <path className={styles.earthLand} d="M390 200l12 2 7 10-7 8-13-4-5-9z" />
            <ellipse className={styles.earthGrid} cx="352" cy="174" rx="52" ry="19" />
            <path className={styles.earthGrid} d="M352 119c-17 18-24 36-24 55s7 38 24 55" />
            <path className={styles.earthShade} d="M367 115c33 13 50 39 47 72-3 27-18 45-40 55 11-20 15-41 12-63-3-24-9-45-19-64z" />
          </g>
          <circle className={styles.earthOutline} cx="352" cy="174" r="56" />
        </g>
        <g className={styles.trackNode}>
          <circle cx="184" cy="117" r="6" />
          <circle cx="274" cy="77" r="5" />
          <circle cx="485" cy="86" r="5" />
          <circle cx="517" cy="241" r="6" />
          <circle cx="425" cy="276" r="5" />
          <circle cx="226" cy="188" r="5" />
        </g>
        <circle className={styles.satNodeWhite} cx="303" cy="257" r="6" />
        <circle className={styles.anomalyHalo} cx="437" cy="111" r="17" />
        <circle className={styles.anomalyNode} cx="437" cy="111" r="10" filter="url(#orb-anomaly-glow)" />
      </g>
      <text className={styles.graphLabel} x="38" y="36">ORBIT DATABASE: ONLINE</text>
      <text className={styles.graphBlueLabel} x="38" y="58">ACTIVE TRACKS: 10,880 SATS</text>
      <text className={styles.graphLabel} x="562" y="36">EPOCH: UTC-7</text>
      <text className={styles.graphLabel} x="38" y="291">SWEEP STATUS: CONTINUOUS INGESTION</text>
      <text className={styles.graphAlert} x="474" y="291">ANOMALIES LOGGED: 14,149</text>
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
              <a href="/contact" className={styles.navLink}>ArgoNavis</a>
              <a href="https://argusorb.io/" className={styles.navLink}>ArgusOrb</a>
              <a href="/blog" className={styles.navLink}>Research</a>
              <a href="/about" className={styles.navLink}>About</a>
              <a href="/contact" className={styles.navLink}>Contact</a>
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
              <a href="/contact" className={styles.btn}>Request demo</a>
            </div>
          </header>

          <main>
            <section className={styles.productsSection} aria-labelledby="products-title">
              <div className={styles.sectionIntro}>
                <h2 id="products-title" className={styles.sectionTitle}>
                  From Orbital Intelligence to Mission Action
                </h2>
              </div>

              <div className={styles.productsGrid}>
                <article id="argonavis" className={styles.productCard}>
                  <span className={styles.productLabel}>Agentic Operations Console</span>
                  <h3>ArgoNavis</h3>
                  <p>Operator-facing workflows for risk triage, maneuver planning, and safety gates.</p>
                  <ArgoNavisGraphic />
                  <a className={styles.exploreLink} href="/contact">Request Demo</a>
                </article>

                <article id="argusorb" className={styles.productCard}>
                  <span className={styles.productLabel}>Orbital Intelligence Foundation</span>
                  <h3>ArgusOrb</h3>
                  <p>Data, models, and algorithms for space traffic, uncertainty, and anomalies.</p>
                  <ArgusOrbGraphic />
                  <a className={styles.exploreLink} href="https://argusorb.io/" target="_blank" rel="noreferrer">
                    Explore ArgusOrb
                  </a>
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
                <p>Intelligent infrastructure for space operations.</p>
              </div>
            </div>

            <div className={styles.footerColumns}>
              <div>
                <h3>Products</h3>
                <a href="#argonavis">ArgoNavis</a>
                <a href="https://argusorb.io/">ArgusOrb</a>
              </div>
              <div>
                <h3>Research</h3>
                <a href="/blog">Research & Technical Notes</a>
              </div>
              <div>
                <h3>Open Source</h3>
                <a href="https://github.com/substratum-labs/castor">Castor</a>
                <a href="https://github.com/substratum-labs/roche">Roche</a>
                <a href="https://github.com/substratum-labs">All repositories</a>
              </div>
              <div>
                <h3>Company</h3>
                <a href="/about">About</a>
                <a href="/contact">Contact</a>
              </div>
            </div>

            <div className={styles.footerBottom}>© 2026 Substratum Labs. All systems nominal.</div>
          </footer>
        </div>
      </Layout>
    </HtmlClassNameProvider>
  );
}
