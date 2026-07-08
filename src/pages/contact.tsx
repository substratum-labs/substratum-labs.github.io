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
              <h1>Contact</h1>
              <p className={styles.lede}>
                Reach out to discuss Substratum Labs, ArgoNavis, ArgusOrb, or intelligent infrastructure for
                space operations.
              </p>
            </div>
          </section>

          <section className={styles.contactGrid} aria-label="Contact options">
            <article className={styles.contactCard}>
              <span className={styles.metric}>Request Demo</span>
              <h2>Talk with us about an operational workflow.</h2>
              <p className={styles.contactLine}>
                For satellite fleet safety, risk triage, maneuver planning, orbital intelligence, or
                operator-reviewed AI systems.
              </p>
              <div className={`${styles.ctaRow} ${styles.contactCta}`}>
                <a
                  className={styles.button}
                  href="mailto:contact@substratumlabs.ai?subject=Request%20demo">
                  Request demo
                </a>
              </div>
            </article>
            <article className={styles.contactCard}>
              <span className={styles.metric}>General Inquiry</span>
              <h2>Contact the team.</h2>
              <p className={styles.contactLine}>
                For partnerships, research, company questions, or anything that does not fit a product demo.
              </p>
              <div className={`${styles.ctaRow} ${styles.contactCta}`}>
                <a
                  className={styles.button}
                  href="mailto:contact@substratumlabs.ai?subject=General%20inquiry">
                  Email Substratum Labs
                </a>
              </div>
            </article>
          </section>

          <div className={styles.footer}>© 2026 Substratum Labs. All systems nominal.</div>
        </div>
      </main>
    </Layout>
  );
}
