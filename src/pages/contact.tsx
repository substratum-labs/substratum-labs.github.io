import React from 'react';
import Head from '@docusaurus/Head';
import Layout from '@theme/Layout';
import styles from './internal.module.css';

export default function Contact(): React.JSX.Element {
  return (
    <Layout noFooter>
      <Head>
        <title>Contact | Substratum Labs</title>
        <meta
          name="description"
          content="Contact Substratum Labs to discuss ArgoNavis, ArgusOrb, and intelligent infrastructure for space operations."
        />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,400;0,500;0,600;1,400&family=Inter:wght@300;400;500;600;700&display=swap"
          rel="stylesheet"
        />
      </Head>

      <main className={styles.page}>
        <div className={styles.shell}>
          <section className={styles.hero}>
            <div>
              <span className={styles.eyebrow}>Contact</span>
              <h1>Request a demo.</h1>
              <p className={styles.lede}>
                Talk with us about satellite fleet safety, risk triage, maneuver planning, orbital data
                foundations, or operator-reviewed AI systems for mission operations.
              </p>
            </div>
            <aside className={styles.heroPanel}>
              <h2>Best first conversation</h2>
              <p>
                Share the fleet, workflow, or decision problem you want to improve. We will route the
                discussion toward ArgoNavis, ArgusOrb, or the underlying research.
              </p>
            </aside>
          </section>

          <section className={styles.contactCard} aria-label="Contact details">
            <span className={styles.metric}>Request Demo</span>
            <h2>Start with the operational problem.</h2>
            <p className={styles.contactLine}>
              Email <a href="mailto:contact@substratumlabs.ai">contact@substratumlabs.ai</a> with a short
              note on your mission context, current workflow, and what needs to become safer or more
              autonomous.
            </p>
            <div className={styles.ctaRow}>
              <a className={styles.button} href="mailto:contact@substratumlabs.ai">Email Substratum Labs</a>
              <a className={styles.textLink} href="/blog">Read research</a>
            </div>
          </section>

          <section className={styles.grid} aria-label="Contact topics">
            <article className={styles.card}>
              <span className={styles.metric}>ArgoNavis</span>
              <h2>Operations console</h2>
              <p>Operator-facing workflows for risk triage, maneuver planning, and safety gates.</p>
            </article>
            <article className={styles.card}>
              <span className={styles.metric}>ArgusOrb</span>
              <h2>Orbital foundation</h2>
              <p>Data, models, and algorithms for space traffic, uncertainty, and anomalies.</p>
            </article>
            <article className={styles.card}>
              <span className={styles.metric}>Research</span>
              <h2>Auditable autonomy</h2>
              <p>Operator-reviewed AI systems for high-trust space operations.</p>
            </article>
          </section>

          <div className={styles.footer}>© 2026 Substratum Labs. All systems nominal.</div>
        </div>
      </main>
    </Layout>
  );
}
