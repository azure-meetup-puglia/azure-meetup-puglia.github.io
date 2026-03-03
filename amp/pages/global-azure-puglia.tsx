import type { NextPage } from 'next';
import Head from 'next/head';
import Link from 'next/link';
import Image from 'next/image';
import { ArrowLeft, Calendar, MapPin, Clock, ExternalLink, Mic, Award, Building2, CheckCircle, Ticket } from 'lucide-react';

const GlobalAzurePugliaPage: NextPage = () => {
  const siteUrl = "https://azure-meetup-puglia.github.io";
  const pageUrl = `${siteUrl}/global-azure-puglia`;
  const eventImageUrl = "https://secure.meetupstatic.com/photos/event/c/4/f/d/clean_527690429.webp";
  const meetupUrl = "https://www.meetup.com/azure-meetup-puglia/events/313527271/";

  const eventDate = "17 Aprile 2026";
  const eventTime = "08:30 – 18:00";
  const eventVenue = "Ugolopez.it di Lopez Ugo";
  const eventAddress = "Via Aurelio Carrante 1/F, 70124 Bari";

  // JSON-LD Schema per l'evento
  const eventSchema = {
    "@context": "https://schema.org",
    "@type": "Event",
    "name": "Global Azure Puglia 2026",
    "description": "La prima edizione di Global Azure in Puglia. 2 Track, 12+ Sessioni, Workshop e un Keynote di apertura. Un evento per approfondire i temi Azure in modo pratico e concreto.",
    "startDate": "2026-04-17T08:30:00+02:00",
    "endDate": "2026-04-17T18:00:00+02:00",
    "eventStatus": "https://schema.org/EventScheduled",
    "eventAttendanceMode": "https://schema.org/OfflineEventAttendanceMode",
    "location": {
      "@type": "Place",
      "name": eventVenue,
      "address": {
        "@type": "PostalAddress",
        "streetAddress": "Via Aurelio Carrante 1/F",
        "addressLocality": "Bari",
        "postalCode": "70124",
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
      "availability": "https://schema.org/InStock",
      "url": meetupUrl
    },
    "isAccessibleForFree": true,
    "inLanguage": ["it", "en"]
  };

  return (
    <div className="min-h-screen bg-gray-900 text-gray-200 font-sans">
      <Head>
        {/* Meta Tags Essenziali */}
        <title>Global Azure Puglia 2026 | 17 Aprile - Bari | 2 Track, 12+ Sessioni</title>
        <meta name="description" content="Global Azure Puglia 2026 - La prima edizione dell'evento Global Azure in Puglia. Venerdì 17 Aprile a Bari. 2 Track, 12+ Sessioni, Workshop e Keynote di apertura. Iscriviti gratuitamente!" />
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
        <meta property="og:title" content="Global Azure Puglia 2026 - 17 Aprile, Bari" />
        <meta property="og:description" content="La prima edizione di Global Azure in Puglia. 2 Track, 12+ Sessioni, Workshop e Keynote. Venerdì 17 Aprile a Bari. Iscriviti gratuitamente!" />
        <meta property="og:image" content={eventImageUrl} />
        <meta property="og:image:alt" content="Global Azure Puglia 2026 - Evento Microsoft Azure" />
        <meta property="og:image:width" content="1200" />
        <meta property="og:image:height" content="675" />
        <meta property="og:url" content={pageUrl} />
        <meta property="og:locale" content="it_IT" />
        <meta property="event:start_time" content="2026-04-17T08:30:00+02:00" />
        <meta property="event:end_time" content="2026-04-17T18:00:00+02:00" />

        {/* Twitter Card */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Global Azure Puglia 2026 - 17 Aprile, Bari" />
        <meta name="twitter:description" content="La prima edizione di Global Azure in Puglia. 2 Track, 12+ Sessioni, Workshop e Keynote. Iscriviti gratuitamente!" />
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
          <div className="relative overflow-hidden rounded-2xl">
            <Image
              src="/img/Azure_Meetup_Puglia_Background_01.png"
              alt="Azure Meetup Puglia - Panorama della Puglia"
              width={1200}
              height={600}
              className="absolute inset-0 w-full h-full object-cover"
              priority
            />
            <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/50 to-black/80"></div>
            <div className="relative z-10 p-8 md:p-12 lg:p-16 text-center">
              <span className="inline-block px-4 py-2 bg-blue-600/80 text-white text-sm font-semibold rounded-full mb-6">
                Prima Edizione in Puglia
              </span>
              <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold text-white mb-4 tracking-tight">
                Global Azure Puglia 2026
              </h1>
              <p className="text-xl md:text-2xl text-blue-200 max-w-3xl mx-auto mb-8">
                Una giornata intera dedicata a Microsoft Azure: sessioni tecniche, workshop pratici e networking con la community
              </p>

              <div className="flex flex-wrap justify-center gap-4 md:gap-6 mb-8">
                <div className="flex items-center gap-2 bg-gray-900/60 backdrop-blur-sm px-4 py-2 rounded-lg">
                  <Calendar className="w-5 h-5 text-blue-400" aria-hidden="true" />
                  <span className="text-white font-medium">Venerdì {eventDate}</span>
                </div>
                <div className="flex items-center gap-2 bg-gray-900/60 backdrop-blur-sm px-4 py-2 rounded-lg">
                  <Clock className="w-5 h-5 text-yellow-400" aria-hidden="true" />
                  <span className="text-white font-medium">{eventTime}</span>
                </div>
                <div className="flex items-center gap-2 bg-gray-900/60 backdrop-blur-sm px-4 py-2 rounded-lg">
                  <MapPin className="w-5 h-5 text-green-400" aria-hidden="true" />
                  <span className="text-white font-medium">Bari</span>
                </div>
              </div>

              {/* Event Numbers */}
              <div className="flex flex-wrap justify-center gap-6 md:gap-10 mb-10">
                <div className="text-center">
                  <div className="text-3xl md:text-4xl font-bold text-white">2</div>
                  <div className="text-sm text-blue-300">Track</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl md:text-4xl font-bold text-white">12+</div>
                  <div className="text-sm text-blue-300">Sessioni</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl md:text-4xl font-bold text-white">1</div>
                  <div className="text-sm text-blue-300">Keynote</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl md:text-4xl font-bold text-white">Full</div>
                  <div className="text-sm text-blue-300">Day</div>
                </div>
              </div>

              <a
                href={meetupUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-8 py-4 bg-blue-600 hover:bg-blue-700 text-white text-lg font-semibold rounded-lg transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-offset-2 focus:ring-offset-gray-900 shadow-lg shadow-blue-600/30"
              >
                <Ticket className="w-6 h-6" aria-hidden="true" />
                Iscriviti Gratuitamente
                <ExternalLink className="w-5 h-5" aria-hidden="true" />
              </a>
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
                Questo evento fa parte dell&apos;iniziativa globale <strong className="text-blue-300">Global Azure</strong>, dove community di tutto il mondo
                partecipano simultaneamente durante il 16-18 Aprile 2026.
              </p>
              <p className="text-gray-300 leading-relaxed mb-6">
                Una giornata intera con 2 track paralleli, oltre 12 sessioni tecniche, workshop pratici e un keynote di apertura di alto profilo.
                Topic: sviluppo software, .NET, Web, infrastruttura, sicurezza, data platform, AI, MCP, Agents, DevOps, IoT e molto altro.
              </p>
              <div className="bg-gray-900/50 p-4 rounded-lg space-y-3">
                <div className="flex items-center gap-3 text-gray-300">
                  <Calendar className="w-5 h-5 text-blue-400 flex-shrink-0" aria-hidden="true" />
                  <span>Venerdì <strong className="text-white">{eventDate}</strong></span>
                </div>
                <div className="flex items-center gap-3 text-gray-300">
                  <Clock className="w-5 h-5 text-yellow-400 flex-shrink-0" aria-hidden="true" />
                  <span>Orario: <strong className="text-white">{eventTime}</strong> (tutto il giorno)</span>
                </div>
                <div className="flex items-start gap-3 text-gray-300">
                  <MapPin className="w-5 h-5 text-green-400 flex-shrink-0 mt-0.5" aria-hidden="true" />
                  <div>
                    <strong className="text-white">{eventVenue}</strong>
                    <br />
                    <span className="text-sm text-gray-400">{eventAddress}</span>
                  </div>
                </div>
                <div className="flex items-center gap-3 text-gray-300">
                  <Ticket className="w-5 h-5 text-purple-400 flex-shrink-0" aria-hidden="true" />
                  <span>Ingresso: <strong className="text-green-400">Gratuito</strong></span>
                </div>
              </div>
            </div>

            {/* Call for Speakers - Chiusa */}
            <div className="bg-gray-800/60 p-8 rounded-xl border border-gray-700/50 shadow-lg">
              <h2 className="text-2xl font-bold text-white mb-4 flex items-center gap-3">
                <Mic className="w-6 h-6 text-gray-500" aria-hidden="true" />
                Call for Speakers
                <span className="text-xs font-medium bg-red-600/80 text-white px-2 py-1 rounded-full">Chiusa</span>
              </h2>
              <p className="text-gray-400 leading-relaxed mb-6">
                La Call for Speakers per Global Azure Puglia 2026 è chiusa. Ringraziamo tutti i professionisti che hanno inviato le loro proposte!
              </p>
              <p className="text-gray-400 leading-relaxed mb-6">
                Stiamo lavorando alla definizione dell&apos;agenda con le sessioni selezionate. Resta aggiornato per scoprire il programma completo.
              </p>
              <div className="flex items-center gap-2 text-gray-500">
                <CheckCircle className="w-5 h-5 text-green-500" aria-hidden="true" />
                <span className="text-sm">Proposte ricevute e in fase di valutazione</span>
              </div>
            </div>
          </section>

          {/* Agenda Section */}
          <section className="bg-gray-800 p-8 rounded-xl border border-gray-700 shadow-lg">
            <h2 className="text-2xl font-bold text-white mb-6 flex items-center gap-3">
              <Clock className="w-6 h-6 text-blue-400" aria-hidden="true" />
              Programma della Giornata
            </h2>
            <div className="space-y-4">
              <div className="flex items-start gap-4 p-4 bg-gray-900/50 rounded-lg border-l-4 border-blue-500">
                <span className="text-blue-400 font-mono font-bold min-w-[60px]">08:30</span>
                <div>
                  <p className="text-white font-semibold">Welcome e Registrazione</p>
                  <p className="text-gray-400 text-sm">Accoglienza partecipanti e check-in</p>
                </div>
              </div>
              <div className="flex items-start gap-4 p-4 bg-gray-900/50 rounded-lg border-l-4 border-purple-500">
                <span className="text-purple-400 font-mono font-bold min-w-[60px]">09:00</span>
                <div>
                  <p className="text-white font-semibold">Keynote di Apertura</p>
                  <p className="text-gray-400 text-sm">Un keynote di alto profilo per aprire la giornata</p>
                </div>
              </div>
              <div className="flex items-start gap-4 p-4 bg-gray-900/50 rounded-lg border-l-4 border-green-500">
                <span className="text-green-400 font-mono font-bold min-w-[60px]">10:00</span>
                <div>
                  <p className="text-white font-semibold">Sessioni Tecniche e Workshop</p>
                  <p className="text-gray-400 text-sm">2 track paralleli con sessioni da 45 min e workshop pratici</p>
                </div>
              </div>
              <div className="flex items-start gap-4 p-4 bg-gray-900/50 rounded-lg border-l-4 border-yellow-500">
                <span className="text-yellow-400 font-mono font-bold min-w-[60px]">13:00</span>
                <div>
                  <p className="text-white font-semibold">Pausa Pranzo e Networking</p>
                  <p className="text-gray-400 text-sm">Un momento per connettersi con la community</p>
                </div>
              </div>
              <div className="flex items-start gap-4 p-4 bg-gray-900/50 rounded-lg border-l-4 border-green-500">
                <span className="text-green-400 font-mono font-bold min-w-[60px]">14:00</span>
                <div>
                  <p className="text-white font-semibold">Sessioni Pomeridiane</p>
                  <p className="text-gray-400 text-sm">Continua con 2 track paralleli di sessioni tecniche</p>
                </div>
              </div>
              <div className="flex items-start gap-4 p-4 bg-gray-900/50 rounded-lg border-l-4 border-blue-500">
                <span className="text-blue-400 font-mono font-bold min-w-[60px]">18:00</span>
                <div>
                  <p className="text-white font-semibold">Chiusura e Networking Finale</p>
                  <p className="text-gray-400 text-sm">Saluti finali e momento di networking</p>
                </div>
              </div>
            </div>
            <p className="text-gray-500 text-sm mt-4 text-center">
              L&apos;agenda dettagliata con le singole sessioni sarà pubblicata a breve.
            </p>
          </section>

          {/* Sponsor Section */}
          <section className="bg-gradient-to-br from-yellow-900/30 via-gray-800 to-yellow-900/30 p-8 rounded-xl border border-yellow-700/30 shadow-lg">
            <div className="text-center mb-8">
              <h2 className="text-3xl font-bold text-white mb-3 flex items-center justify-center gap-3">
                <Award className="w-7 h-7 text-yellow-400" aria-hidden="true" />
                Diventa Sponsor
              </h2>
              <p className="text-xl text-yellow-200 max-w-2xl mx-auto">
                Supporta la prima edizione di Global Azure in Puglia e dai visibilità al tuo brand nella community tech
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-8 items-center">
              <div className="space-y-6">
                <p className="text-gray-300 leading-relaxed">
                  <strong className="text-white">Global Azure Puglia 2026</strong> è un&apos;opportunità unica per entrare in contatto diretto
                  con professionisti IT, sviluppatori e decision maker del territorio. Una giornata intera, in presenza,
                  con un pubblico qualificato e appassionato di tecnologie cloud.
                </p>
                <div className="space-y-4">
                  <h3 className="text-lg font-semibold text-white flex items-center gap-2">
                    <Building2 className="w-5 h-5 text-yellow-400" aria-hidden="true" />
                    Perché sponsorizzare?
                  </h3>
                  <ul className="space-y-3">
                    <li className="flex items-start gap-3 text-gray-300">
                      <CheckCircle className="w-5 h-5 text-yellow-400 mt-0.5 flex-shrink-0" aria-hidden="true" />
                      <span><strong className="text-white">Visibilità diretta</strong> — Il tuo brand davanti a un pubblico tecnico qualificato in una giornata full-day</span>
                    </li>
                    <li className="flex items-start gap-3 text-gray-300">
                      <CheckCircle className="w-5 h-5 text-yellow-400 mt-0.5 flex-shrink-0" aria-hidden="true" />
                      <span><strong className="text-white">Networking</strong> — Connettiti con sviluppatori, architetti cloud e IT manager del Sud Italia</span>
                    </li>
                    <li className="flex items-start gap-3 text-gray-300">
                      <CheckCircle className="w-5 h-5 text-yellow-400 mt-0.5 flex-shrink-0" aria-hidden="true" />
                      <span><strong className="text-white">Talent Acquisition</strong> — Incontra i migliori talenti tech della regione Puglia</span>
                    </li>
                    <li className="flex items-start gap-3 text-gray-300">
                      <CheckCircle className="w-5 h-5 text-yellow-400 mt-0.5 flex-shrink-0" aria-hidden="true" />
                      <span><strong className="text-white">Community</strong> — Supporta l&apos;ecosistema tech locale e rafforza la tua presenza sul territorio</span>
                    </li>
                  </ul>
                </div>
                <a
                  href="mailto:azuremeetuppuglia@outlook.com?subject=Sponsorship%20Global%20Azure%20Puglia%202026"
                  className="inline-flex items-center gap-2 px-6 py-3 bg-yellow-600 hover:bg-yellow-700 text-white font-semibold rounded-lg transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-yellow-400 focus:ring-offset-2 focus:ring-offset-gray-900"
                >
                  <Award className="w-5 h-5" aria-hidden="true" />
                  Contattaci per Sponsorizzare
                </a>
              </div>

              <div className="flex justify-center">
                <Image
                  src="/img/Global-Azure-2026-Sponsor-Kit_L.jpeg"
                  alt="Pacchetti Sponsor Global Azure 2026 - Gold e Silver con desk space, pitch iniziale, sessione tecnica, comunicazione online e partner kit"
                  width={500}
                  height={600}
                  className="rounded-xl shadow-lg border border-yellow-700/30"
                />
              </div>
            </div>
          </section>

          {/* Registration CTA Section */}
          <section className="bg-gradient-to-r from-blue-900 to-purple-900 p-8 md:p-12 rounded-xl text-center">
            <h2 className="text-3xl font-bold text-white mb-3">Non perdere questo evento!</h2>
            <p className="text-xl text-gray-200 mb-4 max-w-2xl mx-auto">
              La prima edizione di Global Azure in Puglia ti aspetta. Una giornata intera di sessioni tecniche, workshop e networking.
            </p>
            <p className="text-gray-300 mb-8 max-w-xl mx-auto">
              L&apos;ingresso è gratuito ma i posti sono limitati. Iscriviti subito per assicurarti il tuo posto!
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <a
                href={meetupUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-8 py-4 bg-white hover:bg-gray-100 text-gray-900 text-lg font-semibold rounded-lg transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-blue-900 shadow-lg"
              >
                <Ticket className="w-6 h-6" aria-hidden="true" />
                Iscriviti su Meetup
                <ExternalLink className="w-5 h-5" aria-hidden="true" />
              </a>
              <Link
                href="/"
                className="inline-flex items-center gap-2 px-6 py-4 bg-transparent border-2 border-white/30 hover:border-white/60 text-white font-semibold rounded-lg transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-blue-900"
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
