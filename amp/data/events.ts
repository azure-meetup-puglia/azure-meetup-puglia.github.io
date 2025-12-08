/**
 * Events data with JSON-LD Schema.org Event format
 * This data structure is designed to be automatically detected by dev.events
 *
 * Last synced: 2025-12-08T12:51:03.778Z
 * Auto-synced from Meetup.com
 */

export interface EventData {
  name: string;
  description: string;
  startDate: string; // ISO 8601 format
  endDate: string; // ISO 8601 format
  eventStatus: 'EventScheduled' | 'EventCancelled' | 'EventPostponed' | 'EventRescheduled';
  eventAttendanceMode: 'OfflineEventAttendanceMode' | 'OnlineEventAttendanceMode' | 'MixedEventAttendanceMode';
  location: {
    '@type': 'Place' | 'VirtualLocation';
    name: string;
    address?: {
      '@type': 'PostalAddress';
      streetAddress?: string;
      addressLocality: string;
      addressRegion: string;
      postalCode?: string;
      addressCountry: string;
    };
    url?: string; // For virtual events
  };
  image?: string[];
  organizer: {
    '@type': 'Organization';
    name: string;
    url: string;
  };
  offers?: {
    '@type': 'Offer';
    url: string;
    price: string;
    priceCurrency: string;
    availability: string;
    validFrom: string;
  };
  performer?: Array<{
    '@type': 'Person';
    name: string;
    description?: string;
  }>;
}

/**
 * Upcoming and past events
 * Synced from Meetup.com
 */
export const events: EventData[] = [
  {
    "name": "Santa Cloud Day - Christmas Edition - 20 dicembre",
    "description": "**🚨🚨**\n**L’evento è gratuito e la registrazione è attiva [SOLO tramite questo link dal portale di Global-AI](https://globalai.community/chapters/lecce/events/santa-cloud-day-christmas-edition/)! (l'RSVP della pagina del Meetup non è ancora attivo).**\n**🚨🚨**\n\nSanta Cloud Day - Christmas edition\n📍 Università del Salento – Polo Urbano STUDIUM 2000\nVia di Valesio 2, Lecce\n🗓 20 dicembre 2025\n⏰ 09:00 – 13:30\n\nLa [Global AI Community](https://globalai.community/chapters/lecce/events/santa-cloud-d",
    "startDate": "2025-12-20T09:00:00+01:00",
    "endDate": "2025-12-20T11:00:00+01:00",
    "eventStatus": "EventScheduled",
    "eventAttendanceMode": "OfflineEventAttendanceMode",
    "location": {
      "@type": "Place",
      "name": "TBD",
      "address": {
        "@type": "PostalAddress",
        "streetAddress": "",
        "addressLocality": "Puglia",
        "addressRegion": "Puglia",
        "postalCode": "",
        "addressCountry": "IT"
      }
    },
    "image": [
      "https://secure.meetupstatic.com/photos/event/c/4/f/d/clean_527690429.webp"
    ],
    "organizer": {
      "@type": "Organization",
      "name": "Azure Meetup Puglia",
      "url": "https://azure-meetup-puglia.github.io/"
    },
    "offers": {
      "@type": "Offer",
      "url": "https://www.meetup.com/azure-meetup-puglia/events/312342685/",
      "price": "0",
      "priceCurrency": "EUR",
      "availability": "https://schema.org/InStock",
      "validFrom": "2025-12-08"
    }
  },
  {
    "name": "Azure Meetup Puglia #2 - Desotech - 24 novembre",
    "description": "Secondo incontro di Azure Meetup Puglia presso Desotech ad Altamura. Sessioni tecniche su Cloud Computing, Microsoft Azure, Intelligenza Artificiale, Software Development e DevOps. L'evento è gratuito con posti limitati. In collaborazione con Improove, ogni partecipante riceverà dei gadget. Networking e drinks inclusi.",
    "startDate": "2025-11-24T18:30:00+01:00",
    "endDate": "2025-11-24T21:30:00+01:00",
    "eventStatus": "EventScheduled",
    "eventAttendanceMode": "OfflineEventAttendanceMode",
    "location": {
      "@type": "Place",
      "name": "Desotech",
      "address": {
        "@type": "PostalAddress",
        "streetAddress": "Strada Privata Via Fortunato S. 61",
        "addressLocality": "Altamura",
        "addressRegion": "Puglia",
        "postalCode": "70022",
        "addressCountry": "IT"
      }
    },
    "image": [
      "https://secure.meetupstatic.com/photos/event/c/4/f/d/clean_527690429.webp"
    ],
    "organizer": {
      "@type": "Organization",
      "name": "Azure Meetup Puglia",
      "url": "https://azure-meetup-puglia.github.io/"
    },
    "offers": {
      "@type": "Offer",
      "url": "https://www.eventbrite.it/e/azure-meetup-puglia-desotech-24-novembre-tickets-1830963183169?aff=oddtdtcreator",
      "price": "0",
      "priceCurrency": "EUR",
      "availability": "https://schema.org/InStock",
      "validFrom": "2025-10-31T00:00:00+01:00"
    },
    "performer": [
      {
        "@type": "Person",
        "name": "Carlo Sacchi",
        "description": "Organizer, Azure Meetup Puglia"
      }
    ]
  },
  {
    "name": "Nasce Azure Meetup Puglia - Kick Off meeting @ BIP Bari - 20 Ottobre",
    "description": "Primo incontro inaugurale di Azure Meetup Puglia presso BIP a Bari. Due sessioni tecniche: deployment di applicazioni PHP su Azure App Service con GitHub Actions, e fondamenti di LLMs e Copilot in Microsoft 365. Evento in presenza con networking, gadget omaggio grazie alla partnership con Improove, e refreshments.",
    "startDate": "2025-10-20T18:30:00+02:00",
    "endDate": "2025-10-20T21:30:00+02:00",
    "eventStatus": "EventScheduled",
    "eventAttendanceMode": "OfflineEventAttendanceMode",
    "location": {
      "@type": "Place",
      "name": "BIP",
      "address": {
        "@type": "PostalAddress",
        "streetAddress": "Via Venezia 13",
        "addressLocality": "Bari",
        "addressRegion": "Puglia",
        "postalCode": "70100",
        "addressCountry": "IT"
      }
    },
    "image": [
      "https://secure.meetupstatic.com/photos/event/c/4/f/d/clean_527690429.webp"
    ],
    "organizer": {
      "@type": "Organization",
      "name": "Azure Meetup Puglia",
      "url": "https://azure-meetup-puglia.github.io/"
    },
    "offers": {
      "@type": "Offer",
      "url": "https://www.meetup.com/azure-meetup-puglia/events/310886158/",
      "price": "0",
      "priceCurrency": "EUR",
      "availability": "https://schema.org/InStock",
      "validFrom": "2025-09-20T00:00:00+02:00"
    },
    "performer": [
      {
        "@type": "Person",
        "name": "Carlo Sacchi",
        "description": "Organizer, Azure Meetup Puglia"
      }
    ]
  }
];

/**
 * Generates JSON-LD schema for a single event
 */
export function generateEventSchema(event: EventData) {
  return {
    "@context": "https://schema.org",
    "@type": "Event",
    ...event
  };
}

/**
 * Generates JSON-LD schema for all events (ItemList)
 */
export function generateEventsListSchema(events: EventData[]) {
  return {
    "@context": "https://schema.org",
    "@type": "ItemList",
    "itemListElement": events.map((event, index) => ({
      "@type": "ListItem",
      "position": index + 1,
      "item": {
        "@type": "Event",
        ...event
      }
    }))
  };
}

/**
 * Filter upcoming events (events that haven't ended yet)
 */
export function getUpcomingEvents(events: EventData[]): EventData[] {
  const now = new Date();
  return events
    .filter(event => new Date(event.endDate) >= now)
    .sort((a, b) => new Date(a.startDate).getTime() - new Date(b.startDate).getTime());
}

/**
 * Filter past events
 */
export function getPastEvents(events: EventData[]): EventData[] {
  const now = new Date();
  return events
    .filter(event => new Date(event.endDate) < now)
    .sort((a, b) => new Date(b.startDate).getTime() - new Date(a.startDate).getTime());
}
