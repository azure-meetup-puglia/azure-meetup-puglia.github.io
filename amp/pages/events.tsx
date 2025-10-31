import type { NextPage } from 'next';
import Head from 'next/head';
import Image from 'next/image';
import Link from 'next/link';
import { Calendar, MapPin, Clock, Users, ExternalLink, Video, ArrowLeft } from 'lucide-react';
import { events, EventData, generateEventsListSchema, getUpcomingEvents, getPastEvents } from '../data/events';

interface EventCardProps {
  event: EventData;
}

const EventCard: React.FC<EventCardProps> = ({ event }) => {
  const startDate = new Date(event.startDate);
  const endDate = new Date(event.endDate);
  const isPast = endDate < new Date();

  const formatDate = (date: Date) => {
    return date.toLocaleDateString('it-IT', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  const formatTime = (date: Date) => {
    return date.toLocaleTimeString('it-IT', {
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const getAttendanceModeIcon = () => {
    switch (event.eventAttendanceMode) {
      case 'OnlineEventAttendanceMode':
        return <Video className="w-5 h-5 text-blue-400" aria-hidden="true" />;
      case 'OfflineEventAttendanceMode':
        return <MapPin className="w-5 h-5 text-green-400" aria-hidden="true" />;
      case 'MixedEventAttendanceMode':
        return <MapPin className="w-5 h-5 text-purple-400" aria-hidden="true" />;
    }
  };

  const getAttendanceModeLabel = () => {
    switch (event.eventAttendanceMode) {
      case 'OnlineEventAttendanceMode':
        return 'Online';
      case 'OfflineEventAttendanceMode':
        return 'In Presenza';
      case 'MixedEventAttendanceMode':
        return 'Ibrido';
    }
  };

  const getStatusBadge = () => {
    if (isPast) {
      return <span className="px-3 py-1 text-xs font-semibold rounded-full bg-gray-700 text-gray-300">Concluso</span>;
    }

    switch (event.eventStatus) {
      case 'EventScheduled':
        return <span className="px-3 py-1 text-xs font-semibold rounded-full bg-green-900 text-green-300">In Programma</span>;
      case 'EventCancelled':
        return <span className="px-3 py-1 text-xs font-semibold rounded-full bg-red-900 text-red-300">Cancellato</span>;
      case 'EventPostponed':
        return <span className="px-3 py-1 text-xs font-semibold rounded-full bg-yellow-900 text-yellow-300">Posticipato</span>;
      case 'EventRescheduled':
        return <span className="px-3 py-1 text-xs font-semibold rounded-full bg-blue-900 text-blue-300">Riprogrammato</span>;
    }
  };

  return (
    <article className={`bg-gray-800 rounded-xl border border-gray-700 shadow-lg overflow-hidden transition-all duration-300 hover:shadow-blue-900/30 ${isPast ? 'opacity-75' : ''}`}>
      {event.image && event.image[0] && (
        <div className="relative w-full h-48 bg-gray-900">
          <Image
            src={event.image[0]}
            alt={event.name}
            fill
            unoptimized={true}
            className="object-cover"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          />
        </div>
      )}

      <div className="p-6">
        <div className="flex items-start justify-between mb-3">
          <h3 className="text-2xl font-bold text-white mb-2">{event.name}</h3>
          {getStatusBadge()}
        </div>

        <p className="text-gray-300 mb-4 leading-relaxed">{event.description}</p>

        <div className="space-y-3 mb-4">
          <div className="flex items-center gap-2 text-gray-400">
            <Calendar className="w-5 h-5 text-blue-400" aria-hidden="true" />
            <span className="text-sm">{formatDate(startDate)}</span>
          </div>

          <div className="flex items-center gap-2 text-gray-400">
            <Clock className="w-5 h-5 text-blue-400" aria-hidden="true" />
            <span className="text-sm">{formatTime(startDate)} - {formatTime(endDate)}</span>
          </div>

          <div className="flex items-center gap-2 text-gray-400">
            {getAttendanceModeIcon()}
            <span className="text-sm">{getAttendanceModeLabel()}</span>
            {event.location.name && <span className="text-sm">• {event.location.name}</span>}
            {event.location.address?.addressLocality && (
              <span className="text-sm">• {event.location.address.addressLocality}</span>
            )}
          </div>
        </div>

        {event.performer && event.performer.length > 0 && (
          <div className="mb-4 p-3 bg-gray-900 rounded-lg">
            <div className="flex items-center gap-2 mb-2">
              <Users className="w-4 h-4 text-purple-400" aria-hidden="true" />
              <span className="text-sm font-semibold text-gray-300">Speaker:</span>
            </div>
            <div className="space-y-1">
              {event.performer.map((speaker, index) => (
                <div key={index} className="text-sm text-gray-400">
                  <span className="text-white font-medium">{speaker.name}</span>
                  {speaker.description && <span className="ml-2">• {speaker.description}</span>}
                </div>
              ))}
            </div>
          </div>
        )}

        {event.offers && event.offers.url && (
          <a
            href={event.offers.url}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-offset-2 focus:ring-offset-gray-800"
            aria-label={`Registrati per ${event.name}`}
          >
            {event.offers.price === "0" ? "Partecipa Gratis" : `€${event.offers.price}`}
            <ExternalLink className="w-4 h-4" aria-hidden="true" />
          </a>
        )}
      </div>
    </article>
  );
};

const EventsPage: NextPage = () => {
  const siteUrl = "https://azure-meetup-puglia.github.io/";
  const pageUrl = `${siteUrl}events`;
  const imageUrl = "https://secure.meetupstatic.com/photos/event/c/4/f/d/clean_527690429.webp";

  const upcomingEvents = getUpcomingEvents(events);
  const pastEvents = getPastEvents(events);

  // Generate JSON-LD schema for all events
  const eventsSchema = generateEventsListSchema(events);

  return (
    <div className="min-h-screen bg-gray-900 text-gray-200 font-sans">
      <Head>
        {/* Meta Tags Essenziali */}
        <title>Eventi | Azure Meetup Puglia - Incontri, Workshop e Conferenze Azure</title>
        <meta name="description" content="Scopri gli eventi Azure Meetup Puglia: meetup tecnici, workshop e conferenze su Microsoft Azure, Cloud Computing, DevOps e AI in Puglia." />
        <meta name="keywords" content="Azure Events Puglia, Azure Meetup, Microsoft Azure, Cloud Events, Tech Meetups Bari, DevOps Events, AI Workshop Puglia" />
        <meta name="author" content="Azure Meetup Puglia" />
        <meta name="robots" content="index, follow" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />

        {/* Canonical URL */}
        <link rel="canonical" href={pageUrl} />

        {/* Open Graph / Facebook */}
        <meta property="og:type" content="website" />
        <meta property="og:site_name" content="Azure Meetup Puglia" />
        <meta property="og:title" content="Eventi Azure Meetup Puglia" />
        <meta property="og:description" content="Partecipa ai nostri eventi su Microsoft Azure, Cloud Computing e tecnologie correlate." />
        <meta property="og:image" content={imageUrl} />
        <meta property="og:url" content={pageUrl} />
        <meta property="og:locale" content="it_IT" />

        {/* Twitter Card */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Eventi Azure Meetup Puglia" />
        <meta name="twitter:description" content="Meetup tecnici e workshop su Microsoft Azure in Puglia" />
        <meta name="twitter:image" content={imageUrl} />

        {/* Theme */}
        <meta name="theme-color" content="#1f2937" />

        {/* Favicon */}
        <link rel="icon" href="/favicon.ico" />

        {/* JSON-LD Schema for all events */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(eventsSchema) }}
        />
      </Head>

      {/* Skip to main content */}
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 bg-blue-600 text-white px-4 py-2 rounded z-50"
      >
        Salta al contenuto principale
      </a>

      <div className="p-4 md:p-8">
        <header className="max-w-6xl mx-auto mb-12 pt-10">
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-blue-400 hover:text-blue-300 transition-colors mb-6 focus:outline-none focus:ring-2 focus:ring-blue-400 rounded px-2 py-1"
          >
            <ArrowLeft className="w-4 h-4" aria-hidden="true" />
            Torna alla Home
          </Link>

          <div className="text-center">
            <div className="inline-block p-4 bg-gradient-to-br from-blue-400 to-blue-600 rounded-full mb-4 shadow-lg" role="img" aria-label="Eventi Azure Meetup Puglia">
              <Calendar className="w-12 h-12 text-white" aria-hidden="true" />
            </div>
            <h1 className="text-4xl md:text-6xl font-bold text-white mb-3 tracking-tight">
              I Nostri Eventi
            </h1>
            <p className="text-xl md:text-2xl text-blue-300 max-w-3xl mx-auto">
              Scopri i prossimi meetup e rivivi gli eventi passati della community Azure Puglia
            </p>
          </div>
        </header>

        <main id="main-content" className="max-w-6xl mx-auto space-y-16 px-4">
          {/* Breadcrumb */}
          <nav aria-label="Breadcrumb" className="text-sm text-gray-400">
            <ol className="flex items-center space-x-2">
              <li><Link href="/" className="hover:text-blue-300">Home</Link></li>
              <li aria-hidden="true">/</li>
              <li aria-current="page" className="text-blue-300">Eventi</li>
            </ol>
          </nav>

          {/* Upcoming Events */}
          {upcomingEvents.length > 0 ? (
            <section id="upcoming-events" aria-labelledby="upcoming-events-title">
              <h2 id="upcoming-events-title" className="text-3xl font-bold text-white mb-8 flex items-center gap-3">
                <Calendar className="w-8 h-8 text-green-400" aria-hidden="true" />
                Prossimi Eventi
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {upcomingEvents.map((event, index) => (
                  <EventCard key={index} event={event} />
                ))}
              </div>
            </section>
          ) : (
            <section className="bg-gray-800 p-12 rounded-xl border border-gray-700 text-center">
              <Calendar className="w-16 h-16 text-gray-600 mx-auto mb-4" aria-hidden="true" />
              <h2 className="text-2xl font-bold text-white mb-3">Nessun evento in programma</h2>
              <p className="text-gray-400 mb-6">
                Stiamo lavorando ai prossimi eventi! Nel frattempo, unisciti ai nostri canali social per rimanere aggiornato.
              </p>
              <Link
                href="/"
                className="inline-flex items-center gap-2 px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-offset-2 focus:ring-offset-gray-900"
              >
                Vai alla Home
              </Link>
            </section>
          )}

          {/* Past Events */}
          {pastEvents.length > 0 && (
            <section id="past-events" aria-labelledby="past-events-title">
              <h2 id="past-events-title" className="text-3xl font-bold text-white mb-8 flex items-center gap-3">
                <Calendar className="w-8 h-8 text-gray-500" aria-hidden="true" />
                Eventi Passati
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {pastEvents.map((event, index) => (
                  <EventCard key={index} event={event} />
                ))}
              </div>
            </section>
          )}

          {/* Call to Action */}
          <section className="bg-gradient-to-r from-blue-900 to-purple-900 p-8 rounded-xl text-center">
            <h2 className="text-2xl font-bold text-white mb-3">Vuoi proporre un talk?</h2>
            <p className="text-gray-200 mb-6">
              Condividi le tue conoscenze con la community! Siamo sempre alla ricerca di speaker appassionati.
            </p>
            <Link
              href="/call-for-speakers"
              className="inline-flex items-center gap-2 px-6 py-3 bg-white hover:bg-gray-100 text-gray-900 font-semibold rounded-lg transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-blue-900"
            >
              Diventa Speaker
            </Link>
          </section>
        </main>

        <footer className="mt-16 pt-8 pb-6 border-t border-gray-700 text-center">
          <p className="text-xs text-gray-500">
            © {new Date().getFullYear()} Azure Meetup Puglia. Tutti i diritti riservati.
          </p>
        </footer>
      </div>
    </div>
  );
};

export default EventsPage;
