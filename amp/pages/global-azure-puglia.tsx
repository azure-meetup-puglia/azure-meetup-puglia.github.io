import type { NextPage } from 'next';
import Head from 'next/head';
import Link from 'next/link';
import { ArrowLeft, Calendar, MapPin, Clock, Users, ExternalLink, Mic } from 'lucide-react';

const GlobalAzurePugliaPage: NextPage = () => {
  const siteUrl = "https://azure-meetup-puglia.github.io";
  const pageUrl = `${siteUrl}/global-azure-puglia`;
  const eventImageUrl = "https://secure.meetupstatic.com/photos/event/c/4/f/d/clean_527690429.webp";

  const eventDate = "17 Aprile 2026";
  const eventLocation = "Bari, Italia";
  const cfpDeadline = "7 Febbraio 2026";
  const sessionizeUrl = "https://sessionize.com/global-azure-puglia-2026/";

  // JSON-LD Schema per l'evento
  const eventSchema = {
    "@context": "https://schema.org",
    "@type": "Event",
    "name": "Global Azure Puglia 2026",
    "description": "La prima edizione di Global Azure in Puglia. Un evento per approfondire i temi Azure in modo pratico e concreto, favorendo le connessioni nella community.",
    "startDate": "2026-04-17T09:00:00+02:00",
    "endDate": "2026-04-17T18:00:00+02:00",
    "eventStatus": "https://schema.org/EventScheduled",
    "eventAttendanceMode": "https://schema.org/OfflineEventAttendanceMode",
    "location": {
      "@type": "Place",
      "name": "Bari",
      "address": {
        "@type": "PostalAddress",
        "addressLocality": "Bari",
        "addressRegion": "Puglia",
        "addressCountry": "IT"
      }
    },
    "organizer": {
      "@type": "Organization",
      "name": "Azure Meetup Puglia",
      "url": siteUrl
    },
    "image": eventImageUrl,
    "url": pageUrl,
    "offers": {
      "@type": "Offer",
      "price": "0",
      "priceCurrency": "EUR",
      "availability": "https://schema.org/InStock"
    },
    "isAccessibleForFree": true,
    "inLanguage": ["it", "en"]
  };

  return (
    <div className="min-h-screen bg-gray-900 text-gray-200 font-sans">
      <Head>
        {/* Meta Tags Essenziali */}
        <title>Global Azure Puglia 2026 | Prima Edizione - 17 Aprile 2026, Bari</title>
        <meta name="description" content="Global Azure Puglia 2026 - La prima edizione dell'evento Global Azure in Puglia. 17 Aprile 2026 a Bari. Sessioni su Azure, Cloud, AI, DevOps e molto altro. Call for Speakers aperta!" />
        <meta name="keywords" content="Global Azure Puglia, Global Azure 2026, Azure Bari, Microsoft Azure Event, Cloud Computing Puglia, Azure Conference Italy, DevOps Event Bari, AI Azure Puglia" />
        <meta name="author" content="Azure Meetup Puglia" />
        <meta name="robots" content="index, follow, max-image-preview:large" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <meta httpEquiv="Content-Type" content="text/html; charset=UTF-8" />
        <meta name="language" content="Italian" />
        <meta name="geo.region" content="IT-BA" />
        <meta name="geo.placename" content="Bari, Puglia, Italy" />

        {/* Canonical URL */}
        <link rel="canonical" href={pageUrl} />

        {/* Open Graph / Facebook */}
        <meta property="og:type" content="event" />
        <meta property="og:site_name" content="Azure Meetup Puglia" />
        <meta property="og:title" content="Global Azure Puglia 2026 - Prima Edizione" />
        <meta property="og:description" content="La prima edizione di Global Azure in Puglia. 17 Aprile 2026 a Bari. Sessioni su Azure, Cloud, AI, DevOps. Call for Speakers aperta!" />
        <meta property="og:image" content={eventImageUrl} />
        <meta property="og:image:alt" content="Global Azure Puglia 2026 - Evento Microsoft Azure" />
        <meta property="og:image:width" content="1200" />
        <meta property="og:image:height" content="675" />
        <meta property="og:url" content={pageUrl} />
        <meta property="og:locale" content="it_IT" />
        <meta property="event:start_time" content="2026-04-17T09:00:00+02:00" />
        <meta property="event:end_time" content="2026-04-17T18:00:00+02:00" />

        {/* Twitter Card */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Global Azure Puglia 2026 - Prima Edizione" />
        <meta name="twitter:description" content="La prima edizione di Global Azure in Puglia. 17 Aprile 2026 a Bari. Sessioni su Azure, Cloud, AI, DevOps." />
        <meta name="twitter:image" content={eventImageUrl} />
        <meta name="twitter:image:alt" content="Global Azure Puglia 2026" />

        {/* Additional Meta Tags */}
        <meta name="theme-color" content="#1f2937" />
        <meta name="msapplication-TileColor" content="#1f2937" />
        <meta name="application-name" content="Azure Meetup Puglia" />

        {/* Favicon */}
        <link rel="icon" href="/favicon.ico" />
        <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png" />
        <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png" />
        <link rel="apple-touch-icon" href="/apple-touch-icon.png" />

        {/* Preload Critical Resources */}
        <link rel="preload" href={eventImageUrl} as="image" />

        {/* JSON-LD Schema */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(eventSchema) }}
        />
      </Head>

      {/* Skip to main content per accessibilita */}
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 bg-blue-600 text-white px-4 py-2 rounded z-50"
      >
        Salta al contenuto principale
      </a>

      <div className="p-4 md:p-8">
        <header className="max-w-6xl mx-auto mb-8 pt-10">
          <Link
            href="/events"
            className="inline-flex items-center gap-2 text-blue-400 hover:text-blue-300 transition-colors mb-6 focus:outline-none focus:ring-2 focus:ring-blue-400 rounded px-2 py-1"
          >
            <ArrowLeft className="w-4 h-4" aria-hidden="true" />
            Torna agli Eventi
          </Link>
        </header>

        {/* Hero Section */}
        <section className="max-w-6xl mx-auto mb-12">
          <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-blue-900 via-purple-900 to-blue-900">
            <div className="absolute inset-0 bg-black/30"></div>
            <div className="relative z-10 p-8 md:p-12 lg:p-16 text-center">
              <span className="inline-block px-4 py-2 bg-blue-600/80 text-white text-sm font-semibold rounded-full mb-6">
                Prima Edizione in Puglia
              </span>
              <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold text-white mb-4 tracking-tight">
                Global Azure Puglia 2026
              </h1>
              <p className="text-xl md:text-2xl text-blue-200 max-w-3xl mx-auto mb-8">
                Un evento per approfondire i temi Azure in modo pratico e concreto, favorendo le connessioni nella community
              </p>

              <div className="flex flex-wrap justify-center gap-6 mb-8">
                <div className="flex items-center gap-2 bg-gray-900/50 px-4 py-2 rounded-lg">
                  <Calendar className="w-5 h-5 text-blue-400" aria-hidden="true" />
                  <span className="text-white font-medium">{eventDate}</span>
                </div>
                <div className="flex items-center gap-2 bg-gray-900/50 px-4 py-2 rounded-lg">
                  <MapPin className="w-5 h-5 text-green-400" aria-hidden="true" />
                  <span className="text-white font-medium">{eventLocation}</span>
                </div>
                <div className="flex items-center gap-2 bg-gray-900/50 px-4 py-2 rounded-lg">
                  <Users className="w-5 h-5 text-purple-400" aria-hidden="true" />
                  <span className="text-white font-medium">In Presenza</span>
                </div>
              </div>

              <div className="flex flex-wrap justify-center gap-4">
                <a
                  href={sessionizeUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-lg transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-offset-2 focus:ring-offset-gray-900"
                >
                  <Mic className="w-5 h-5" aria-hidden="true" />
                  Proponi un Talk
                  <ExternalLink className="w-4 h-4" aria-hidden="true" />
                </a>
              </div>
            </div>
          </div>
        </section>

        <main id="main-content" className="max-w-6xl mx-auto space-y-12 px-4">
          {/* Breadcrumb */}
          <nav aria-label="Breadcrumb" className="text-sm text-gray-400">
            <ol className="flex items-center space-x-2">
              <li><Link href="/" className="hover:text-blue-300">Home</Link></li>
              <li aria-hidden="true">/</li>
              <li><Link href="/events" className="hover:text-blue-300">Eventi</Link></li>
              <li aria-hidden="true">/</li>
              <li aria-current="page" className="text-blue-300">Global Azure Puglia 2026</li>
            </ol>
          </nav>

          {/* Info Section */}
          <section className="grid md:grid-cols-2 gap-8">
            {/* About the Event */}
            <div className="bg-gray-800 p-8 rounded-xl border border-gray-700 shadow-lg">
              <h2 className="text-2xl font-bold text-white mb-4 flex items-center gap-3">
                <Calendar className="w-6 h-6 text-blue-400" aria-hidden="true" />
                Info Evento
              </h2>
              <p className="text-gray-300 leading-relaxed mb-6">
                <strong className="text-white">Global Azure Puglia 2026</strong> rappresenta la prima edizione di Global Azure nella nostra regione.
                Questo evento fa parte dell'iniziativa globale <strong className="text-blue-300">Global Azure</strong>, dove community di tutto il mondo
                partecipano simultaneamente durante il 16-18 Aprile 2026.
              </p>
              <p className="text-gray-300 leading-relaxed">
                Sessioni da 45 minuti (+ Q&A) su Microsoft Azure, con focus su casi d'uso reali, lezioni apprese e soluzioni testate in produzione.
                Topic: sviluppo software, .NET, Web, infrastruttura, sicurezza, data platform, AI, MCP, Agents, DevOps, IoT e molto altro.
              </p>
            </div>

            {/* Call for Speakers */}
            <div className="bg-gradient-to-br from-purple-900/50 to-blue-900/50 p-8 rounded-xl border border-purple-700/50 shadow-lg">
              <h2 className="text-2xl font-bold text-white mb-4 flex items-center gap-3">
                <Mic className="w-6 h-6 text-purple-400" aria-hidden="true" />
                Call for Speakers
              </h2>
              <p className="text-gray-300 leading-relaxed mb-6">
                Vuoi condividere la tua esperienza con Azure? La Call for Speakers è aperta!
              </p>
              <ul className="space-y-3 mb-6">
                <li className="flex items-start gap-3 text-gray-300">
                  <Clock className="w-5 h-5 text-yellow-400 mt-0.5 flex-shrink-0" aria-hidden="true" />
                  <span>Deadline: <strong className="text-white">{cfpDeadline}</strong></span>
                </li>
                <li className="flex items-start gap-3 text-gray-300">
                  <Users className="w-5 h-5 text-green-400 mt-0.5 flex-shrink-0" aria-hidden="true" />
                  <span>Co-speaker ammessi</span>
                </li>
                <li className="flex items-start gap-3 text-gray-300">
                  <ExternalLink className="w-5 h-5 text-blue-400 mt-0.5 flex-shrink-0" aria-hidden="true" />
                  <span>Descrizioni in Italiano o Inglese</span>
                </li>
              </ul>
              <a
                href={sessionizeUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-6 py-3 bg-purple-600 hover:bg-purple-700 text-white font-semibold rounded-lg transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-purple-400 focus:ring-offset-2 focus:ring-offset-gray-900"
              >
                Invia la tua Proposta
                <ExternalLink className="w-4 h-4" aria-hidden="true" />
              </a>
            </div>
          </section>

          {/* Agenda Section */}
          <section className="bg-gray-800 p-8 rounded-xl border border-gray-700 shadow-lg">
            <h2 className="text-2xl font-bold text-white mb-4 flex items-center gap-3">
              <Clock className="w-6 h-6 text-blue-400" aria-hidden="true" />
              Agenda
            </h2>
            <div className="text-center py-8">
              <p className="text-xl text-gray-400">
                L'agenda dell'evento è in fase di definizione.
              </p>
              <p className="text-gray-500 mt-2">
                Torna a visitare questa pagina per gli aggiornamenti!
              </p>
            </div>
          </section>

          {/* CTA Section */}
          <section className="bg-gradient-to-r from-blue-900 to-purple-900 p-8 rounded-xl text-center">
            <h2 className="text-2xl font-bold text-white mb-3">Resta Aggiornato!</h2>
            <p className="text-gray-200 mb-6 max-w-2xl mx-auto">
              Segui i nostri canali social per ricevere aggiornamenti sull'evento, l'agenda completa e le modalità di registrazione.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Link
                href="/"
                className="inline-flex items-center gap-2 px-6 py-3 bg-white hover:bg-gray-100 text-gray-900 font-semibold rounded-lg transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-blue-900"
              >
                Scopri i Nostri Canali
              </Link>
            </div>
          </section>
        </main>

        <footer className="mt-16 pt-8 pb-6 border-t border-gray-700 text-center">
          <p className="text-xs text-gray-500">
            © {new Date().getFullYear()} Azure Meetup Puglia. Tutti i diritti riservati.
          </p>
          <p className="text-xs text-gray-600 mt-1">
            Microsoft e Azure sono marchi registrati di Microsoft Corporation.
          </p>
        </footer>
      </div>
    </div>
  );
};

export default GlobalAzurePugliaPage;
