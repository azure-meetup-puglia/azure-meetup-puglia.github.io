#!/usr/bin/env node

/**
 * Sync events from Meetup.com to events.ts
 * This script fetches events from the Meetup.com public page and updates the events.ts file
 */

const https = require('https');
const fs = require('fs');
const path = require('path');

// Configuration
const MEETUP_GROUP_URLNAME = 'azure-meetup-puglia';
const MEETUP_EVENTS_URL = `https://www.meetup.com/${MEETUP_GROUP_URLNAME}/events/`;
const EVENTS_FILE_PATH = path.join(__dirname, '../amp/data/events.ts');
const SITE_URL = 'https://azure-meetup-puglia.github.io/';
const DEFAULT_IMAGE = 'https://secure.meetupstatic.com/photos/event/c/4/f/d/clean_527690429.webp';

/**
 * Strip all HTML tags from a string, applying repeatedly to handle
 * nested or concatenated tag patterns (e.g. "<<script>script>").
 */
function stripHtmlTags(str) {
  const tagPattern = /<[^>]*>/g;
  let result = str;
  let previous;
  do {
    previous = result;
    result = result.replace(tagPattern, '');
  } while (result !== previous);
  return result;
}

/**
 * Fetch events from Meetup.com page
 * Uses a simpler approach by fetching the JSON embedded in the page
 */
async function fetchMeetupEvents() {
  return new Promise((resolve, reject) => {
    const options = {
      hostname: 'www.meetup.com',
      path: `/${MEETUP_GROUP_URLNAME}/events/json/`,
      method: 'GET',
      headers: {
        'User-Agent': 'Mozilla/5.0 (compatible; EventSync/1.0)',
        'Accept': 'application/json'
      }
    };

    const req = https.request(options, (res) => {
      let data = '';

      res.on('data', (chunk) => {
        data += chunk;
      });

      res.on('end', () => {
        if (res.statusCode === 404 || res.statusCode === 403) {
          // Fallback: try to parse from HTML page
          console.log('ℹ️  JSON endpoint not available, trying HTML page...');
          fetchMeetupEventsFromHTML().then(resolve).catch(reject);
          return;
        }

        try {
          const events = JSON.parse(data);
          resolve(events);
        } catch (error) {
          // If JSON parsing fails, try HTML
          console.log('ℹ️  JSON parsing failed, trying HTML page...');
          fetchMeetupEventsFromHTML().then(resolve).catch(reject);
        }
      });
    });

    req.on('error', (error) => {
      reject(error);
    });

    req.end();
  });
}

/**
 * Fallback: Parse events from HTML page using __NEXT_DATA__ JSON
 * Events are stored in __APOLLO_STATE__ with keys like "Event:123456"
 */
async function fetchMeetupEventsFromHTML() {
  return new Promise((resolve, reject) => {
    const options = {
      hostname: 'www.meetup.com',
      path: `/${MEETUP_GROUP_URLNAME}/events/`,
      method: 'GET',
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
        'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8'
      }
    };

    const req = https.request(options, (res) => {
      let data = '';

      res.on('data', (chunk) => {
        data += chunk;
      });

      res.on('end', () => {
        try {
          // Extract __NEXT_DATA__ JSON from HTML
          const match = data.match(/<script id="__NEXT_DATA__" type="application\/json">(.*?)<\/script>/s);
          if (match) {
            const nextData = JSON.parse(match[1]);
            const events = [];

            // Events are in __APOLLO_STATE__ with keys like "Event:123456"
            if (nextData.props?.pageProps?.__APOLLO_STATE__) {
              const apolloState = nextData.props.pageProps.__APOLLO_STATE__;
              const eventKeys = Object.keys(apolloState).filter(k => k.startsWith('Event:'));

              for (const key of eventKeys) {
                const event = apolloState[key];
                if (event && event.title) {
                  events.push({
                    id: event.id,
                    title: event.title,
                    description: event.description || '',
                    eventUrl: event.eventUrl,
                    dateTime: event.dateTime,
                    endTime: event.endTime,
                    timezone: event.timezone,
                    venue: event.venue,
                    isOnline: event.isOnline,
                    images: event.images
                  });
                }
              }

              console.log(`📍 Found ${events.length} events in Apollo state`);
            }

            if (events.length === 0) {
              console.log('⚠️  No events found in page data');
              console.log('ℹ️  This might mean:');
              console.log('   1. There are no upcoming events');
              console.log('   2. The Meetup page structure has changed');
              console.log('   3. Manual event management may be needed');
            }

            resolve(events);
          } else {
            reject(new Error('Could not find __NEXT_DATA__ in HTML'));
          }
        } catch (error) {
          reject(error);
        }
      });
    });

    req.on('error', (error) => {
      reject(error);
    });

    req.end();
  });
}

// Configuration for the Global AI Lecce chapter page
const GLOBALAI_LECCE_HOST = 'globalai.community';
const GLOBALAI_LECCE_PATH = '/chapters/lecce/';
const GLOBALAI_BASE_URL = `https://${GLOBALAI_LECCE_HOST}`;

const MONTH_NAMES = {
  january: 0, february: 1, march: 2, april: 3, may: 4, june: 5,
  july: 6, august: 7, september: 8, october: 9, november: 10, december: 11
};

/**
 * Returns the last day-of-month number that is a Sunday for the given month.
 */
function lastSundayOfMonth(year, monthIndex) {
  const lastDay = new Date(Date.UTC(year, monthIndex + 1, 0));
  return lastDay.getUTCDate() - lastDay.getUTCDay();
}

/**
 * Determine the Central European timezone offset for a given calendar date,
 * accounting for European DST (CEST +02:00 vs CET +01:00).
 */
function centralEuropeOffset(year, monthIndex, day) {
  const date = Date.UTC(year, monthIndex, day);
  const dstStart = Date.UTC(year, 2, lastSundayOfMonth(year, 2)); // last Sunday March
  const dstEnd = Date.UTC(year, 9, lastSundayOfMonth(year, 9)); // last Sunday October
  return date >= dstStart && date < dstEnd ? '+02:00' : '+01:00';
}

/**
 * Decode a small set of HTML entities found in the Global AI page text.
 */
function decodeHtmlEntities(str) {
  return str
    .replace(/&#x([0-9a-fA-F]+);/g, (_, hex) => String.fromCodePoint(parseInt(hex, 16)))
    .replace(/&#(\d+);/g, (_, dec) => String.fromCodePoint(parseInt(dec, 10)))
    .replace(/&amp;/g, '&')
    .replace(/&quot;/g, '"')
    .replace(/&#x27;/g, "'")
    .replace(/&apos;/g, "'")
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>')
    .replace(/&nbsp;/g, ' ');
}

/**
 * Build an ISO 8601 datetime string from date parts, a HH:mm time and the
 * proper Central European offset.
 */
function buildIsoDate(year, monthIndex, day, time) {
  const [hh, mm] = time.split(':');
  const mo = String(monthIndex + 1).padStart(2, '0');
  const dd = String(day).padStart(2, '0');
  const offset = centralEuropeOffset(year, monthIndex, day);
  return `${year}-${mo}-${dd}T${hh.padStart(2, '0')}:${mm}:00${offset}`;
}

/**
 * Fetch and parse events from the Global AI Lecce chapter page.
 * The page is rendered server-side with `.gai-day` / `.gai-event` blocks.
 */
async function fetchGlobalAILecceEvents() {
  return new Promise((resolve, reject) => {
    const options = {
      hostname: GLOBALAI_LECCE_HOST,
      path: GLOBALAI_LECCE_PATH,
      method: 'GET',
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
        'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8'
      }
    };

    const req = https.request(options, (res) => {
      let data = '';
      res.on('data', (chunk) => { data += chunk; });
      res.on('end', () => {
        try {
          resolve(parseGlobalAILecceEvents(data));
        } catch (error) {
          reject(error);
        }
      });
    });

    req.on('error', (error) => reject(error));
    req.end();
  });
}

/**
 * Parse the Global AI Lecce HTML into EventData objects.
 */
function parseGlobalAILecceEvents(html) {
  const events = [];

  // Each day group carries the date header followed by one or more events.
  const dayBlocks = html.split('<div class="gai-day">').slice(1);

  for (const block of dayBlocks) {
    const dayMatch = block.match(/<div class="gai-day-num">\s*(\d+)\s*<\/div>/);
    const monthMatch = block.match(/<div class="gai-day-month[^"]*">\s*([^<]+?)\s*<\/div>/);
    if (!dayMatch || !monthMatch) continue;

    const day = parseInt(dayMatch[1], 10);
    const [monthName, yearStr] = decodeHtmlEntities(monthMatch[1]).trim().split(/\s+/);
    const monthIndex = MONTH_NAMES[monthName.toLowerCase()];
    const year = parseInt(yearStr, 10);
    if (monthIndex === undefined || Number.isNaN(year)) continue;

    // Extract each event anchor within this day block.
    const eventPattern = /<a href="([^"]+)" class="gai-event[\s\S]*?<\/a>/g;
    let eventMatch;
    while ((eventMatch = eventPattern.exec(block)) !== null) {
      const eventHtml = eventMatch[0];
      const href = eventMatch[1];

      const timeMatch = eventHtml.match(/<div class="gai-event-time">\s*(\d{1,2}:\d{2})/);
      const endMatch = eventHtml.match(/<span>\s*[–-]\s*(\d{1,2}:\d{2})\s*<\/span>/);
      const titleMatch = eventHtml.match(/<h3 class="gai-event-title">\s*([\s\S]*?)\s*<\/h3>/);
      const locationMatch = eventHtml.match(/<span class="gai-event-location">[\s\S]*?<\/svg>\s*([^<]+?)\s*<\/span>/);
      const onlineMatch = /gai-tag-online|Online/i.test(eventHtml);
      const imgMatch = eventHtml.match(/<img src="([^"]+)"/);

      if (!titleMatch) continue;

      const title = decodeHtmlEntities(stripHtmlTags(titleMatch[1])).trim();
      const startTime = timeMatch ? timeMatch[1] : '09:00';
      const startDate = buildIsoDate(year, monthIndex, day, startTime);
      const endDate = endMatch
        ? buildIsoDate(year, monthIndex, day, endMatch[1])
        : new Date(new Date(startDate).getTime() + 3 * 60 * 60 * 1000).toISOString();

      const locationText = locationMatch ? decodeHtmlEntities(locationMatch[1]).trim() : 'Lecce, Italia';
      const city = locationText.split(',')[0].trim() || 'Lecce';
      const eventUrl = href.startsWith('http') ? href : `${GLOBALAI_BASE_URL}${href}`;
      const imageUrl = imgMatch
        ? (imgMatch[1].startsWith('http') ? imgMatch[1] : `${GLOBALAI_BASE_URL}${decodeHtmlEntities(imgMatch[1])}`)
        : DEFAULT_IMAGE;

      events.push({
        name: title,
        description: `Evento della community Global AI Lecce: ${title} (${locationText}).`,
        startDate,
        endDate,
        eventStatus: 'EventScheduled',
        eventAttendanceMode: onlineMatch ? 'OnlineEventAttendanceMode' : 'OfflineEventAttendanceMode',
        location: onlineMatch
          ? { '@type': 'VirtualLocation', name: 'Online Event', url: eventUrl }
          : {
            '@type': 'Place',
            name: locationText,
            address: {
              '@type': 'PostalAddress',
              streetAddress: '',
              addressLocality: city,
              addressRegion: 'Puglia',
              postalCode: '',
              addressCountry: 'IT'
            }
          },
        image: [imageUrl],
        organizer: {
          '@type': 'Organization',
          name: 'Global AI Lecce',
          url: `${GLOBALAI_BASE_URL}${GLOBALAI_LECCE_PATH}`
        },
        offers: {
          '@type': 'Offer',
          url: eventUrl,
          price: '0',
          priceCurrency: 'EUR',
          availability: 'https://schema.org/InStock',
          validFrom: new Date().toISOString().split('T')[0]
        }
      });
    }
  }

  console.log(`📍 Found ${events.length} event(s) on Global AI Lecce`);
  return events;
}

/**
 * Read current events from events.ts
 */
function readCurrentEvents() {
  try {
    const fileContent = fs.readFileSync(EVENTS_FILE_PATH, 'utf8');

    // Extract the events array using regex
    const match = fileContent.match(/export const events: EventData\[\] = (\[[\s\S]*?\]);/);
    if (!match) {
      console.log('No existing events found, starting fresh');
      return [];
    }

    // Parse the array - simple approach, read as JSON-like
    const eventsArrayStr = match[1];

    // Try to parse it (may need manual events kept)
    try {
      const events = eval('(' + eventsArrayStr + ')');
      return events;
    } catch (e) {
      console.warn('Could not parse existing events, starting fresh');
      return [];
    }
  } catch (error) {
    console.log('Events file not found or unreadable, will create new one');
    return [];
  }
}

/**
 * Convert Meetup event to our EventData format
 */
function convertMeetupEventToEventData(meetupEvent) {
  const startDate = meetupEvent.dateTime || new Date().toISOString();
  const endDate = meetupEvent.endTime || new Date(new Date(startDate).getTime() + 3 * 60 * 60 * 1000).toISOString();

  // Build location
  let location;
  if (meetupEvent.isOnline) {
    location = {
      '@type': 'VirtualLocation',
      name: 'Online Event',
      url: meetupEvent.eventUrl
    };
  } else if (meetupEvent.venue) {
    const venue = meetupEvent.venue;
    location = {
      '@type': 'Place',
      name: venue.name || 'TBD',
      address: {
        '@type': 'PostalAddress',
        streetAddress: venue.address || '',
        addressLocality: venue.city || 'Puglia',
        addressRegion: 'Puglia',
        postalCode: venue.postalCode || '',
        addressCountry: 'IT'
      }
    };
  } else {
    location = {
      '@type': 'Place',
      name: 'TBD',
      address: {
        '@type': 'PostalAddress',
        addressLocality: 'Puglia',
        addressRegion: 'Puglia',
        addressCountry: 'IT'
      }
    };
  }

  // Extract image
  const images = [];
  if (meetupEvent.images && meetupEvent.images.length > 0) {
    images.push(meetupEvent.images[0].source || meetupEvent.images[0]);
  } else {
    images.push(DEFAULT_IMAGE);
  }

  return {
    name: meetupEvent.title,
    description: stripHtmlTags(meetupEvent.description || '').slice(0, 500),
    startDate: startDate,
    endDate: endDate,
    eventStatus: 'EventScheduled',
    eventAttendanceMode: meetupEvent.isOnline ? 'OnlineEventAttendanceMode' : 'OfflineEventAttendanceMode',
    location: location,
    image: images,
    organizer: {
      '@type': 'Organization',
      name: 'Azure Meetup Puglia',
      url: SITE_URL
    },
    offers: {
      '@type': 'Offer',
      url: meetupEvent.eventUrl,
      price: '0',
      priceCurrency: 'EUR',
      availability: 'https://schema.org/InStock',
      validFrom: new Date().toISOString().split('T')[0]
    }
  };
}

/**
 * Generate the events.ts file content
 */
function generateEventsFileContent(events) {
  const template = `/**
 * Events data with JSON-LD Schema.org Event format
 * This data structure is designed to be automatically detected by dev.events
 *
 * Last synced: ${new Date().toISOString()}
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
export const events: EventData[] = ${JSON.stringify(events, null, 2)};

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
`;

  return template;
}

/**
 * Normalize an event name for fuzzy duplicate detection:
 * lowercase, strip accents and any non-alphanumeric characters.
 */
function normalizeEventName(name) {
  return name
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .toLowerCase()
    .replace(/[^a-z0-9]/g, '');
}

/**
 * Decide whether a fetched event already exists among the current events.
 * Matches on the offer URL, exact name, or same calendar day with a
 * normalized-name containment (handles e.g. "Santa Cloud Day - Christmas
 * edition" vs "Santa Cloud Day - Christmas Edition - 20 dicembre").
 */
function isDuplicateEvent(candidate, existingEvents) {
  const candName = normalizeEventName(candidate.name);
  const candDay = (candidate.startDate || '').slice(0, 10);
  const candUrl = candidate.offers && candidate.offers.url;

  return existingEvents.some((existing) => {
    if (candUrl && existing.offers && existing.offers.url === candUrl) return true;

    const exName = normalizeEventName(existing.name);
    if (exName === candName) return true;

    const exDay = (existing.startDate || '').slice(0, 10);
    if (candDay && exDay === candDay && candName && exName &&
      (exName.includes(candName) || candName.includes(exName))) {
      return true;
    }
    return false;
  });
}

/**
 * Main sync function
 */
async function syncEvents() {
  try {
    console.log('🔄 Syncing events from Meetup.com...');
    console.log(`📍 Group: ${MEETUP_GROUP_URLNAME}`);
    console.log(`🔗 URL: ${MEETUP_EVENTS_URL}`);

    // Read current events first
    const currentEvents = readCurrentEvents();
    console.log(`📚 Current events in file: ${currentEvents.length}`);

    // Try to fetch from Meetup
    let meetupEvents = [];
    try {
      meetupEvents = await fetchMeetupEvents();
      console.log(`📅 Found ${meetupEvents.length} events on Meetup.com`);
    } catch (error) {
      console.warn(`⚠️  Could not fetch from Meetup.com: ${error.message}`);
    }

    // Try to fetch from the Global AI Lecce chapter page
    console.log(`🔗 URL: ${GLOBALAI_BASE_URL}${GLOBALAI_LECCE_PATH}`);
    let globalAiEvents = [];
    try {
      globalAiEvents = await fetchGlobalAILecceEvents();
    } catch (error) {
      console.warn(`⚠️  Could not fetch from Global AI Lecce: ${error.message}`);
    }

    // Convert all fetched events to our EventData format.
    // Meetup events need conversion; Global AI events are already EventData.
    const convertedEvents = [
      ...meetupEvents.map(e => convertMeetupEventToEventData(e)),
      ...globalAiEvents
    ];

    if (convertedEvents.length === 0) {
      console.log('ℹ️  No events fetched from any source, keeping all existing events (including past events)');

      // Keep ALL events (both upcoming and past) to show event history
      const now = new Date();
      const upcomingCount = currentEvents.filter(event => new Date(event.endDate) >= now).length;
      const pastCount = currentEvents.filter(event => new Date(event.endDate) < now).length;

      console.log(`📊 Current status:`);
      console.log(`   - Upcoming events: ${upcomingCount}`);
      console.log(`   - Past events: ${pastCount}`);
      console.log(`   - Total events: ${currentEvents.length}`);
      console.log(`ℹ️  No changes needed - all events maintained for history`);

      return;
    }

    // Merge with existing events (keep past events, update/add new ones).
    // Past events are kept in the file and split into the "past events"
    // section automatically by getPastEvents() based on their endDate.
    const newEvents = convertedEvents.filter(e => !isDuplicateEvent(e, currentEvents));

    if (newEvents.length > 0) {
      console.log(`🆕 Found ${newEvents.length} new event(s):`);
      newEvents.forEach(e => console.log(`   - ${e.name}`));

      const allEvents = [...currentEvents, ...newEvents];
      // Sort by date (newest first for upcoming, then past)
      allEvents.sort((a, b) => new Date(b.startDate).getTime() - new Date(a.startDate).getTime());

      const fileContent = generateEventsFileContent(allEvents);
      fs.writeFileSync(EVENTS_FILE_PATH, fileContent, 'utf8');
      console.log(`✅ Events file updated: ${EVENTS_FILE_PATH}`);
    } else {
      console.log('ℹ️  All fetched events already exist in local file');
    }

  } catch (error) {
    console.error('❌ Error syncing events:', error.message);
    process.exit(1);
  }
}

// Run the sync
syncEvents();
