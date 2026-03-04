import type { NextPage } from 'next';
import { useState, useEffect } from 'react';
import Head from 'next/head';
import Link from 'next/link';
import Image from 'next/image';
import { ArrowLeft, Calendar, MapPin, Clock, ExternalLink, Mic, Award, Building2, CheckCircle, Ticket, Users, LayoutGrid, List } from 'lucide-react';

const SESSIONIZE_BASE = "https://sessionize.com/api/v2/b481sscy/view";

/* eslint-disable @typescript-eslint/no-explicit-any */

function useSessionizeData<T>(endpoint: string) {
  const [data, setData] = useState<T | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    setLoading(true);
    fetch(`${SESSIONIZE_BASE}/${endpoint}`)
      .then(res => {
        if (!res.ok) throw new Error('Errore nel caricamento');
        return res.json();
      })
      .then(json => { setData(json); setLoading(false); })
      .catch(err => { setError(err.message); setLoading(false); });
  }, [endpoint]);

  return { data, loading, error };
}

function formatTime(iso: string) {
  return new Date(iso).toLocaleTimeString('it-IT', { hour: '2-digit', minute: '2-digit' });
}

function getDuration(startsAt: string, endsAt: string) {
  const start = new Date(startsAt);
  const end = new Date(endsAt);
  return Math.round((end.getTime() - start.getTime()) / 60000);
}

function formatDate(iso: string) {
  return new Date(iso).toLocaleDateString('it-IT', { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' });
}

const LoadingSpinner = () => (
  <div className="flex items-center justify-center py-12">
    <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-400"></div>
    <span className="ml-3 text-gray-400">Caricamento...</span>
  </div>
);

const ErrorMessage = ({ message }: { message: string }) => (
  <p className="text-center text-red-400 py-8">{message}</p>
);

// --- Schedule Grid (Sessionize style with rowSpan for workshops) ---
const ScheduleGrid = () => {
  const { data, loading, error } = useSessionizeData<any[]>('GridSmart');
  if (loading) return <LoadingSpinner />;
  if (error || !data) return <ErrorMessage message={error || 'Dati non disponibili'} />;

  const day = data[0];
  if (!day) return <ErrorMessage message="Nessun programma disponibile" />;

  const rooms = day.rooms as any[];
  const numRooms = rooms.length;
  const CONTAINER_HEIGHT = 1600;
  const TIME_COL = 52;
  const GAP = 4;

  // Use exact session times from rooms[].sessions (no slot-based workarounds needed)
  const allSessions = rooms.flatMap((r: any) => r.sessions as any[]);
  const startMs = Math.min(...allSessions.map((s: any) => new Date(s.startsAt).getTime()));
  const endMs = Math.max(...allSessions.map((s: any) => new Date(s.endsAt).getTime()));
  const totalMs = endMs - startMs;

  function toTop(iso: string): number {
    return ((new Date(iso).getTime() - startMs) / totalMs) * CONTAINER_HEIGHT;
  }
  function toHeight(s: string, e: string): number {
    return ((new Date(e).getTime() - new Date(s).getTime()) / totalMs) * CONTAINER_HEIGHT;
  }

  // Hourly time labels
  const labels: { label: string; top: number }[] = [];
  const cur = new Date(startMs);
  cur.setMinutes(0, 0, 0);
  while (cur.getTime() <= endMs) {
    const top = toTop(cur.toISOString());
    if (top >= 0) labels.push({ label: cur.toLocaleTimeString('it-IT', { hour: '2-digit', minute: '2-digit' }), top });
    cur.setHours(cur.getHours() + 1);
  }

  // Deduplicated plenum sessions (full-width, from any room)
  const seenIds = new Set<string>();
  const plenumSessions = allSessions.filter((s: any) => {
    if (s.isPlenumSession && !seenIds.has(s.id)) { seenIds.add(s.id); return true; }
    return false;
  });

  function colLeft(ri: number): string {
    return numRooms === 1 ? '0' : `calc(${(ri * 100) / numRooms}% + ${ri > 0 ? GAP / 2 : 0}px)`;
  }
  function colWidth(): string {
    return numRooms === 1 ? '100%' : `calc(${100 / numRooms}% - ${GAP / 2}px)`;
  }

  return (
    <div className="rounded-xl overflow-hidden" style={{ background: '#112240', padding: '16px 12px 20px' }}>
      <div className="text-center py-2 mb-3 text-lg font-semibold" style={{ color: '#5ba4e6' }}>
        {formatDate(day.date)}
      </div>

      {/* Room column headers */}
      <div style={{ display: 'flex', paddingLeft: TIME_COL + GAP, gap: GAP, marginBottom: 8 }}>
        {rooms.map((room: any) => (
          <div key={room.id} style={{ flex: 1, textAlign: 'center', padding: '6px 8px', border: '1px solid #0078d4', color: '#0078d4', borderRadius: 6, fontSize: 13, fontWeight: 500 }}>
            {room.name}
          </div>
        ))}
      </div>

      {/* Main timeline */}
      <div style={{ position: 'relative', height: CONTAINER_HEIGHT }}>
        {/* Time labels */}
        {labels.map(({ label, top }) => (
          <div key={label} style={{ position: 'absolute', top: top - 8, left: 0, width: TIME_COL, textAlign: 'right', paddingRight: 8, fontSize: 11, color: '#5ba4e6', fontWeight: 500, lineHeight: '16px', zIndex: 3 }}>
            {label}
          </div>
        ))}
        {/* Horizontal lines */}
        {labels.map(({ label, top }) => (
          <div key={`line-${label}`} style={{ position: 'absolute', top, left: TIME_COL, right: 0, height: 1, background: 'rgba(91,164,230,0.12)' }} />
        ))}

        <div style={{ position: 'absolute', left: TIME_COL + GAP, right: 0, top: 0, bottom: 0 }}>
          {/* Per-room sessions (non-plenum) */}
          {rooms.map((room: any, ri: number) =>
            (room.sessions as any[])
              .filter((s: any) => !s.isPlenumSession)
              .map((sess: any) => {
                const top = toTop(sess.startsAt);
                const height = toHeight(sess.startsAt, sess.endsAt) - GAP;
                const dur = getDuration(sess.startsAt, sess.endsAt);
                const isSvc = sess.isServiceSession;
                return (
                  <div key={`${room.id}-${sess.id}`} style={{
                    position: 'absolute', top: top + GAP / 2,
                    left: colLeft(ri), width: colWidth(), height,
                    background: isSvc ? '#0a1929' : '#104581',
                    borderRadius: 8, padding: '5px 8px', overflow: 'hidden', boxSizing: 'border-box',
                    display: 'flex', flexDirection: 'column',
                    justifyContent: isSvc ? 'center' : 'flex-start',
                    textAlign: isSvc ? 'center' : 'left', zIndex: 1,
                  }}>
                    <div style={{ fontSize: 10, color: '#8cb4d8', marginBottom: 2 }}>
                      {formatTime(sess.startsAt)} → {dur} min
                    </div>
                    <div style={{ fontSize: 12, fontWeight: 600, color: isSvc ? '#8cb4d8' : '#e0e0e0', lineHeight: 1.3 }}>
                      {sess.title}
                    </div>
                    {sess.speakers?.length > 0 && (
                      <div style={{ fontSize: 10, color: '#8cb4d8', marginTop: 2 }}>
                        {sess.speakers.map((s: any) => s.name).join(', ')}
                      </div>
                    )}
                  </div>
                );
              })
          )}

          {/* Plenum sessions — full width overlay */}
          {plenumSessions.map((sess: any) => {
            const top = toTop(sess.startsAt);
            const height = toHeight(sess.startsAt, sess.endsAt) - GAP;
            const dur = getDuration(sess.startsAt, sess.endsAt);
            const isKt = !sess.isServiceSession;
            return (
              <div key={sess.id} style={{
                position: 'absolute', top: top + GAP / 2, left: 0, right: GAP, height,
                background: isKt ? '#104581' : '#0a1929',
                borderRadius: 8, padding: '6px 12px', overflow: 'hidden', boxSizing: 'border-box',
                display: 'flex', flexDirection: 'column', justifyContent: 'center', textAlign: 'center', zIndex: 2,
              }}>
                <div style={{ fontSize: 11, color: '#8cb4d8', marginBottom: 2 }}>
                  {formatTime(sess.startsAt)} → {dur} min
                </div>
                <div style={{ fontSize: 14, fontWeight: 700, color: isKt ? '#e0e0e0' : '#8cb4d8', lineHeight: 1.3 }}>
                  {sess.title}
                </div>
                {sess.speakers?.length > 0 && (
                  <div style={{ fontSize: 12, color: '#8cb4d8', marginTop: 2 }}>
                    {sess.speakers.map((s: any) => s.name).join(', ')}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

// --- Sessions List ---
const SessionsList = () => {
  const { data, loading, error } = useSessionizeData<any[]>('Sessions');
  if (loading) return <LoadingSpinner />;
  if (error || !data) return <ErrorMessage message={error || 'Dati non disponibili'} />;

  const sessions = (data[0]?.sessions || []).filter((s: any) => !s.isServiceSession);

  return (
    <div className="rounded-xl overflow-hidden" style={{ background: '#0d2137' }}>
      <div className="p-4 space-y-3">
        {sessions.map((session: any) => {
          const duration = getDuration(session.startsAt, session.endsAt);
          return (
            <div key={session.id} className="rounded-lg p-5" style={{ background: '#104581' }}>
              <div className="flex flex-wrap items-center gap-2 mb-3">
                {session.room && (
                  <span className="px-2 py-0.5 rounded text-white text-xs font-semibold" style={{ background: '#0078d4' }}>
                    {session.room.toUpperCase()}
                  </span>
                )}
                <span className="text-xs" style={{ color: '#8cb4d8' }}>
                  {formatTime(session.startsAt)} → {duration} min
                </span>
              </div>
              <h3 className="font-semibold text-base mb-2" style={{ color: '#e0e0e0' }}>{session.title}</h3>
              {session.description && (
                <p className="text-sm leading-relaxed mb-3" style={{ color: '#8cb4d8' }}>{session.description}</p>
              )}
              {session.speakers?.length > 0 && (
                <div className="flex items-center gap-2 text-sm" style={{ color: '#a0c4e8' }}>
                  <Users className="w-4 h-4" aria-hidden="true" />
                  {session.speakers.map((s: any) => s.name).join(', ')}
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};

// --- Speaker Wall ---
const SpeakerWall = () => {
  const { data, loading, error } = useSessionizeData<any[]>('SpeakerWall');
  if (loading) return <LoadingSpinner />;
  if (error || !data) return <ErrorMessage message={error || 'Dati non disponibili'} />;

  return (
    <div className="rounded-xl overflow-hidden p-4" style={{ background: '#0d2137' }}>
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
        {data.map((speaker: any) => (
          <div key={speaker.id} className="rounded-lg p-4 text-center" style={{ background: '#104581' }}>
            {speaker.profilePicture && (
              <img
                src={speaker.profilePicture}
                alt={speaker.fullName}
                className="w-24 h-24 rounded-full mx-auto mb-3 object-cover"
                style={{ borderWidth: '3px', borderStyle: 'solid', borderColor: '#0078d4' }}
              />
            )}
            <p className="font-semibold text-sm" style={{ color: '#e0e0e0' }}>{speaker.fullName}</p>
            {speaker.tagLine && (
              <p className="text-xs mt-1" style={{ color: '#8cb4d8' }}>{speaker.tagLine}</p>
            )}
            {speaker.isTopSpeaker && (
              <span className="inline-block mt-2 text-xs font-semibold px-2 py-0.5 rounded-full" style={{ background: '#0078d4', color: '#ffffff' }}>
                Keynote
              </span>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

// --- Tabs ---
const tabConfig = [
  { id: 'programma', label: 'Programma', icon: LayoutGrid },
  { id: 'sessioni', label: 'Sessioni', icon: List },
  { id: 'speaker', label: 'Speaker', icon: Users },
] as const;

const SessionizeTabs: React.FC = () => {
  const [activeTab, setActiveTab] = useState<string>('programma');

  return (
    <div>
      <div className="flex flex-wrap gap-2 mb-6 border-b border-gray-700 pb-4" role="tablist" aria-label="Sezioni evento">
        {tabConfig.map((tab) => {
          const Icon = tab.icon;
          const isActive = activeTab === tab.id;
          return (
            <button
              key={tab.id}
              role="tab"
              aria-selected={isActive}
              aria-controls={`panel-${tab.id}`}
              onClick={() => setActiveTab(tab.id)}
              className={`inline-flex items-center gap-2 px-4 py-2 rounded-lg font-medium text-sm transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-blue-400 ${isActive
                ? 'bg-blue-600 text-white shadow-md'
                : 'bg-gray-700/50 text-gray-400 hover:bg-gray-700 hover:text-gray-200'
                }`}
            >
              <Icon className="w-4 h-4" aria-hidden="true" />
              {tab.label}
            </button>
          );
        })}
      </div>

      <div role="tabpanel">
        {activeTab === 'programma' && <ScheduleGrid />}
        {activeTab === 'sessioni' && <SessionsList />}
        {activeTab === 'speaker' && <SpeakerWall />}
      </div>
    </div>
  );
};

/* eslint-enable @typescript-eslint/no-explicit-any */

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

          {/* Agenda Section with Sessionize Embeds */}
          <section className="bg-gray-800 p-8 rounded-xl border border-gray-700 shadow-lg">
            <h2 className="text-2xl font-bold text-white mb-6 flex items-center gap-3">
              <Clock className="w-6 h-6 text-blue-400" aria-hidden="true" />
              Programma, Sessioni e Speaker
            </h2>

            {/* Tabs */}
            <SessionizeTabs />
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
