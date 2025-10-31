/**
 * Events data with JSON-LD Schema.org Event format
 * This data structure is designed to be automatically detected by dev.events
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
 * Add new events here and they will automatically appear on the events page
 * with proper JSON-LD markup for dev.events automatic detection
 */
export const events: EventData[] = [
  {
    name: "Azure Meetup Puglia #2 - Desotech - 24 novembre",
    description: "Secondo incontro di Azure Meetup Puglia presso Desotech ad Altamura. Sessioni tecniche su Cloud Computing, Microsoft Azure, Intelligenza Artificiale, Software Development e DevOps. L'evento è gratuito con posti limitati. In collaborazione con Improove, ogni partecipante riceverà dei gadget. Networking e drinks inclusi.",
    startDate: "2025-11-24T18:30:00+01:00",
    endDate: "2025-11-24T21:30:00+01:00",
    eventStatus: "EventScheduled",
    eventAttendanceMode: "OfflineEventAttendanceMode",
    location: {
      "@type": "Place",
      name: "Desotech",
      address: {
        "@type": "PostalAddress",
        streetAddress: "Strada Privata Via Fortunato S. 61",
        addressLocality: "Altamura",
        addressRegion: "Puglia",
        postalCode: "70022",
        addressCountry: "IT"
      }
    },
    image: [
      "https://secure.meetupstatic.com/photos/event/c/4/f/d/clean_527690429.webp"
    ],
    organizer: {
      "@type": "Organization",
      name: "Azure Meetup Puglia",
      url: "https://azure-meetup-puglia.github.io/"
    },
    offers: {
      "@type": "Offer",
      url: "https://www.eventbrite.it/e/azure-meetup-puglia-desotech-24-novembre-tickets-1830963183169?aff=oddtdtcreator",
      price: "0",
      priceCurrency: "EUR",
      availability: "https://schema.org/InStock",
      validFrom: "2025-10-31T00:00:00+01:00"
    },
    performer: [
      {
        "@type": "Person",
        name: "Carlo Sacchi",
        description: "Organizer, Azure Meetup Puglia"
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
