import type { NextPage } from 'next';
import Head from 'next/head';
import Image from 'next/image';
import Link from 'next/link';
import { Linkedin, Send, Users, Info, Code, UsersRound, Calendar, Lightbulb, Handshake, FileText, Mic, Shield } from 'lucide-react';

interface LinkCardProps {
  href: string;
  title: string;
  description: string;
  Icon: React.ElementType;
  isExternal?: boolean;
}

const LinkCard: React.FC<LinkCardProps> = ({ href, title, description, Icon, isExternal = true }) => (
  <a
    href={href}
    target={isExternal ? "_blank" : "_self"}
    rel={isExternal ? "noopener noreferrer" : undefined}
    className="group flex flex-col items-center justify-center p-6 bg-gray-800 rounded-xl border border-gray-700 hover:bg-gray-700 transition-all duration-300 transform hover:-translate-y-1 shadow-lg hover:shadow-blue-900/50 text-center h-full focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-offset-2 focus:ring-offset-gray-900"
    aria-label={`${title}: ${description}`}
  >
    <Icon className="w-12 h-12 mb-4 text-blue-400 group-hover:text-blue-300 transition-colors" aria-hidden="true" />
    <h3 className="text-xl font-semibold mb-2 text-white group-hover:text-blue-100">{title}</h3>
    <p className="text-gray-300 text-sm group-hover:text-gray-200">{description}</p>
  </a>
);

const AzureMeetupPuglia: NextPage = () => {
  const siteUrl = "https://azure-meetup-puglia.github.io/";
  const imageUrl = "https://secure.meetupstatic.com/photos/event/c/4/f/d/clean_527690429.webp";

  const communityLinks = [
    {
      href: "https://www.linkedin.com/groups/10098125/",
      title: "LinkedIn Group",
      description: "Connettiti con professionisti e condividi esperienze nel settore Azure",
      Icon: Linkedin
    },
    {
      href: "https://www.meetup.com/azure-meetup-puglia",
      title: "Pagina Meetup",
      description: "Iscriviti per ricevere notifiche su tutti i nostri eventi",
      Icon: UsersRound
    },
    {
      href: "https://t.me/azuremeetuppuglia",
      title: "Canale Telegram",
      description: "Notifiche eventi e discussioni della community Azure Puglia",
      Icon: Send
    }
  ];

  // JSON-LD Schema per SEO
  const organizationSchema = {
    "@context": "https://schema.org",
    "@type": "Organization",
    "name": "Azure Meetup Puglia",
    "description": "Community pugliese dedicata al Cloud Microsoft Azure",
    "url": siteUrl,
    "logo": `${siteUrl}/logo.png`,
    "sameAs": [
      "https://www.linkedin.com/groups/10098125/",
      "https://www.meetup.com/azure-meetup-puglia",
      "https://t.me/azuremeetuppuglia"
    ],
    "address": {
      "@type": "PostalAddress",
      "addressRegion": "Puglia",
      "addressCountry": "IT"
    },
    "foundingDate": "2024",
    "knowsAbout": ["Microsoft Azure", "Cloud Computing", "DevOps", "AI", "Machine Learning"],
    "memberOf": {
      "@type": "Organization",
      "name": "Microsoft Community"
    }
  };

  return (
    <div className="min-h-screen bg-gray-900 text-gray-200 font-sans">
      <Head>
        {/* Meta Tags Essenziali */}
        < title > Azure Meetup Puglia | Community Cloud Microsoft Azure - Bari, Lecce, Brindisi</title >
        <meta name="description" content="Community tech pugliese dedicata a Microsoft Azure. Meetup tecnici, networking e formazione cloud per professionisti IT in Puglia. Eventi a Bari, Lecce, Brindisi." />
        <meta name="keywords" content="Azure Meetup Puglia, Microsoft Azure User Group, Cloud Computing, Bari, Brindisi, Foggia, Lecce, Taranto, Barletta, Andria, Trani, Community Tech, Tecnologia, DevOps, AI, Machine Learning, Software development, Programming, Coding" />
        <meta name="author" content="Azure Meetup Puglia" />
        <meta name="robots" content="index, follow, max-image-preview:large" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <meta httpEquiv="Content-Type" content="text/html; charset=UTF-8" />
        <meta name="language" content="Italian" />
        <meta name="geo.region" content="IT-PU" />
        <meta name="geo.placename" content="Puglia, Italy" />

        {/* Canonical URL */}
        < link rel="canonical" href={siteUrl} />

        {/* Open Graph / Facebook */}
        < meta property="og:type" content="website" />
        <meta property="og:site_name" content="Azure Meetup Puglia" />
        <meta property="og:title" content="Azure Meetup Puglia | Community Cloud Microsoft Azure" />
        <meta property="og:description" content="Community pugliese per professionisti Microsoft Azure. Meetup tecnici, networking e crescita professionale nel cloud computing." />
        <meta property="og:image" content={imageUrl} />
        <meta property="og:image:alt" content="Azure Meetup Puglia - Community Microsoft Azure" />
        <meta property="og:image:width" content="1200" />
        <meta property="og:image:height" content="675" />
        <meta property="og:url" content={siteUrl} />
        <meta property="og:locale" content="it_IT" />

        {/* Twitter Card */}
        < meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Azure Meetup Puglia | Community Cloud Microsoft" />
        <meta name="twitter:description" content="Community pugliese Microsoft Azure. Meetup tecnici e networking per professionisti cloud." />
        <meta name="twitter:image" content={imageUrl} />
        <meta name="twitter:image:alt" content="Azure Meetup Puglia Community" />

        {/* Additional Meta Tags */}
        < meta name="theme-color" content="#1f2937" />
        <meta name="msapplication-TileColor" content="#1f2937" />
        <meta name="application-name" content="Azure Meetup Puglia" />

        {/* Favicon */}
        < link rel="icon" href="/favicon.ico" />
        <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png" />
        <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png" />
        <link rel="apple-touch-icon" href="/apple-touch-icon.png" />

        {/* Preload Critical Resources */}
        < link rel="preload" href={imageUrl} as="image" />

        {/* JSON-LD Schema */}
        < script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }}
        />
      </Head >

      {/* Skip to main content per accessibilità */}
      < a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 bg-blue-600 text-white px-4 py-2 rounded z-50"
      >
        Salta al contenuto principale
      </a >

      <div className="p-4 md:p-8">
        <header className="text-center mb-12 md:mb-16 pt-10">
          <div className="inline-block p-4 bg-gradient-to-br from-blue-400 to-blue-600 rounded-full mb-4 shadow-lg" role="img" aria-label="Logo Azure Meetup Puglia - Fico d'India">
            <Image
              src="/img/opuntia_icon.png"
              alt="Fico d'India - Simbolo della Puglia"
              width={48}
              height={48}
              className="w-12 h-12 text-white filter brightness-0 invert"
              priority
            />
          </div>
          <h1 className="text-4xl md:text-6xl font-bold text-white mb-3 tracking-tight">
            Azure Meetup Puglia
          </h1>
          <p className="text-xl md:text-2xl text-blue-300 max-w-3xl mx-auto">
            La community pugliese dedicata al Cloud Microsoft Azure. Condividiamo, impariamo e cresciamo insieme.
          </p>
        </header>

        <div className="w-full max-w-6xl mx-auto mb-16 overflow-hidden rounded-lg">
          <Image
            src={imageUrl}
            alt="Evento Azure Meetup Puglia - Community di professionisti Microsoft Azure che si incontrano per condividere knowledge e best practice"
            width={1200}
            height={675}
            unoptimized={true}
            className="w-full h-auto object-cover"
            style={{ maxHeight: '600px' }}
            priority
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 80vw, 1200px"
          />
        </div>

        <main id="main-content" className="max-w-6xl mx-auto space-y-16 md:space-y-24 px-4">
          {/* Breadcrumb per SEO */}
          <nav aria-label="Breadcrumb" className="text-sm text-gray-400">
            <ol className="flex items-center space-x-2">
              <li><Link href="/" className="hover:text-blue-300">Home</Link></li>
              <li aria-hidden="true">/</li>
              <li aria-current="page" className="text-blue-300">Azure Meetup Puglia</li>
            </ol>
          </nav>

          {/* Chi Siamo */}
          <section id="chi-siamo" className="bg-gray-800 p-8 rounded-xl shadow-lg border border-gray-700">
            <h2 className="text-3xl font-semibold text-center mb-8 text-blue-400 flex items-center justify-center gap-3">
              <UsersRound className='w-8 h-8' aria-hidden="true" />
              Chi Siamo
            </h2>
            <div className="text-lg text-gray-300 leading-relaxed text-center max-w-3xl mx-auto">
              <p className="mb-4">
                <strong className="text-white">Azure Meetup Puglia</strong> è una community di appassionati, professionisti ed esperti della tecnologia <strong className="text-blue-300">Cloud Microsoft Azure</strong> residenti o legati alla Puglia.
              </p>
              <p>
                La nostra missione è creare un punto d'incontro per favorire la condivisione di conoscenze, esperienze e best practice legate ad Azure e alle tecnologie correlate come DevOps, AI e Machine Learning.
              </p>
            </div>
          </section>

          {/* Cosa Facciamo */}
          <section id="cosa-facciamo" aria-labelledby="cosa-facciamo-title">
            <h2 id="cosa-facciamo-title" className="text-3xl font-semibold text-center mb-8 text-blue-400 flex items-center justify-center gap-3">
              <Calendar className='w-8 h-8' aria-hidden="true" />
              Cosa Facciamo
            </h2>
            <div className="grid md:grid-cols-2 gap-8 items-center">
              <article className="bg-gray-800 p-6 rounded-lg border border-gray-700 shadow-md">
                <h3 className="text-xl font-semibold mb-3 text-white flex items-center gap-2">
                  <Lightbulb className='w-5 h-5 text-yellow-400' aria-hidden="true" />
                  Meetup Tecnici
                </h3>
                <p className="text-gray-300">
                  Organizziamo incontri periodici (online e in presenza) con talk tecnici, demo pratiche e sessioni di Q&A su vari aspetti di Azure, dalle basi alle funzionalità più avanzate.
                </p>
              </article>
              <article className="bg-gray-800 p-6 rounded-lg border border-gray-700 shadow-md">
                <h3 className="text-xl font-semibold mb-3 text-white flex items-center gap-2">
                  <Handshake className='w-5 h-5 text-green-400' aria-hidden="true" />
                  Networking Professionale
                </h3>
                <p className="text-gray-300">
                  Creiamo opportunità per connettersi con altri professionisti del settore cloud, scambiare idee e costruire relazioni professionali nel contesto pugliese.
                </p>
              </article>
              <article className="bg-gray-800 p-6 rounded-lg border border-gray-700 shadow-md md:col-span-2">
                <h3 className="text-xl font-semibold mb-3 text-white flex items-center gap-2">
                  <Info className='w-5 h-5 text-purple-400' aria-hidden="true" />
                  Condivisione Knowledge
                </h3>
                <p className="text-gray-300">
                  Utilizziamo i nostri canali social per condividere notizie, risorse utili, aggiornamenti sulla piattaforma Azure e opportunità lavorative nel settore Cloud.
                </p>
              </article>
            </div>
          </section>

          {/* Perché Unirsi */}
          <section id="perche-unirsi" className="bg-gray-800 p-8 rounded-xl shadow-lg border border-gray-700" aria-labelledby="perche-unirsi-title">
            <h2 id="perche-unirsi-title" className="text-3xl font-semibold text-center mb-8 text-blue-400">
              Perché Unirsi a Noi?
            </h2>
            <div className="grid md:grid-cols-2 gap-6 max-w-4xl mx-auto">
              <div className="text-gray-300">
                <h3 className="text-lg font-semibold text-white mb-2">🎓 Apprendimento Continuo</h3>
                <p>Rimani aggiornato sulle ultime novità di Azure e del cloud computing.</p>
              </div>
              <div className="text-gray-300">
                <h3 className="text-lg font-semibold text-white mb-2">🤝 Networking Locale</h3>
                <p>Conosci esperti e appassionati nella tua regione e costruisci il tuo network professionale.</p>
              </div>
              <div className="text-gray-300">
                <h3 className="text-lg font-semibold text-white mb-2">💡 Condivisione Pratica</h3>
                <p>Impara da casi d'uso reali, best practice e esperienze dirette sul campo.</p>
              </div>
              <div className="text-gray-300">
                <h3 className="text-lg font-semibold text-white mb-2">📈 Crescita Professionale</h3>
                <p>Amplia le tue competenze cloud e scopri nuove opportunità di carriera.</p>
              </div>
            </div>
          </section>

          {/* Unisciti a Noi */}
          <section id="unisciti" aria-labelledby="unisciti-title">
            <h2 id="unisciti-title" className="text-3xl font-semibold text-center mb-10 text-blue-400">
              Entra nella Community!
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 max-w-5xl mx-auto">
              {communityLinks.map((link, index) => (
                <div 
                  key={link.title} 
                  className={`${
                    communityLinks.length === 3 && index === 2 
                      ? 'sm:col-span-2 sm:max-w-md sm:mx-auto lg:col-span-1 lg:max-w-none' 
                      : ''
                  }`}
                >
                  <LinkCard {...link} />
                </div>
              ))}
            </div>
            <div className="text-center mt-8">
              <p className="text-gray-400 text-sm">
                Scegli il canale che preferisci per rimanere sempre aggiornato sui nostri eventi e attività!
              </p>
            </div>
          </section>
        </main>

        <footer className="mt-16 md:mt-24 pt-8 pb-6 border-t border-gray-700" role="contentinfo">
          <div className="max-w-6xl mx-auto px-4">
            <nav className="flex flex-col md:flex-row justify-center items-center gap-4 md:gap-8 mb-6" aria-label="Footer navigation">
              <Link
                href="/code-of-conduct"
                className="text-gray-400 hover:text-blue-300 transition-colors flex items-center gap-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-400 rounded px-2 py-1"
              >
                <Code className="w-4 h-4" aria-hidden="true" />
                Codice di Condotta
              </Link>
              <span className='hidden md:inline text-gray-600' aria-hidden="true">|</span>
              <Link
                href="/team"
                className="text-gray-400 hover:text-blue-300 transition-colors flex items-center gap-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-400 rounded px-2 py-1"
              >
                <Users className="w-4 h-4" aria-hidden="true" />
                Il Team
              </Link>
              <span className='hidden md:inline text-gray-600' aria-hidden="true">|</span>
              <Link
                href="/media-kit"
                className="text-gray-400 hover:text-blue-300 transition-colors flex items-center gap-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-400 rounded px-2 py-1"
              >
                <FileText className="w-4 h-4" aria-hidden="true" />
                Media Kit
              </Link>
              <span className='hidden md:inline text-gray-600' aria-hidden="true">|</span>
              <Link
                href="/call-for-speakers"
                className="text-gray-400 hover:text-blue-300 transition-colors flex items-center gap-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-400 rounded px-2 py-1"
              >
                <Mic className="w-4 h-4" aria-hidden="true" />
                Call for Speakers
              </Link>
              <span className='hidden md:inline text-gray-600' aria-hidden="true">|</span>
              <Link
                href="/privacy"
                className="text-gray-400 hover:text-blue-300 transition-colors flex items-center gap-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-400 rounded px-2 py-1"
              >
                <Shield className="w-4 h-4" aria-hidden="true" />
                Privacy
              </Link>
            </nav>
            <div className="text-center">
              <p className="text-xs text-gray-500">
                © {new Date().getFullYear()} Azure Meetup Puglia. Tutti i diritti riservati.
              </p>
              <p className="text-xs text-gray-600 mt-1">
                Microsoft e Azure sono marchi registrati di Microsoft Corporation.
              </p>
            </div>
          </div>
        </footer>
      </div>
    </div >
  );
};

export default AzureMeetupPuglia;