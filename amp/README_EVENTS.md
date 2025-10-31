# Events Management with JSON-LD for dev.events Integration

This documentation explains how to manage events on the Azure Meetup Puglia website with automatic integration to dev.events.

## Overview

The website now includes an automated event management system that uses JSON-LD Schema.org markup. Once your first event is approved on [dev.events](https://dev.events), all future events added to the website will be automatically detected and proposed for publication.

## How It Works

1. **JSON-LD Markup**: Each event uses the standardized Schema.org Event format
2. **Automatic Detection**: dev.events monitors your website for new events using the structured data
3. **Auto-Publishing**: New events trigger moderator notifications for quick publication

## Adding a New Event

### Step 1: Edit the Events Data File

Open [`data/events.ts`](data/events.ts) and add your event to the `events` array:

```typescript
{
  name: "Azure Meetup Puglia - Gennaio 2025",
  description: "Incontro mensile dedicato alle novità Azure, sessioni tecniche su Azure DevOps e AI Services.",
  startDate: "2025-01-15T18:00:00+01:00", // ISO 8601 format with timezone
  endDate: "2025-01-15T21:00:00+01:00",
  eventStatus: "EventScheduled", // Options: EventScheduled, EventCancelled, EventPostponed, EventRescheduled
  eventAttendanceMode: "MixedEventAttendanceMode", // Options: OfflineEventAttendanceMode, OnlineEventAttendanceMode, MixedEventAttendanceMode
  location: {
    "@type": "Place", // Use "VirtualLocation" for online-only events
    name: "Innovation Hub Bari",
    address: {
      "@type": "PostalAddress",
      streetAddress: "Via Example 123",
      addressLocality: "Bari",
      addressRegion: "Puglia",
      postalCode: "70100",
      addressCountry: "IT"
    },
    url: "https://www.meetup.com/azure-meetup-puglia" // Registration URL
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
    url: "https://www.meetup.com/azure-meetup-puglia",
    price: "0", // Use "0" for free events
    priceCurrency: "EUR",
    availability: "https://schema.org/InStock",
    validFrom: "2024-12-01T00:00:00+01:00"
  },
  performer: [
    {
      "@type": "Person",
      name: "Speaker Name",
      description: "Azure MVP"
    }
  ]
}
```

### Step 2: Date Format

Always use ISO 8601 format with timezone:
- Format: `YYYY-MM-DDTHH:mm:ss+HH:mm`
- Example: `2025-01-15T18:00:00+01:00` (6:00 PM CET)

### Step 3: Event Attendance Modes

Choose the appropriate mode:
- **OfflineEventAttendanceMode**: In-person only
- **OnlineEventAttendanceMode**: Online only (use `VirtualLocation` for location)
- **MixedEventAttendanceMode**: Hybrid (both in-person and online)

### Step 4: Virtual Events

For online-only events, use this location format:

```typescript
location: {
  "@type": "VirtualLocation",
  name: "Microsoft Teams",
  url: "https://teams.microsoft.com/..."
}
```

## Event Status Values

- **EventScheduled**: Event is confirmed and scheduled
- **EventCancelled**: Event has been cancelled
- **EventPostponed**: Event has been postponed (update with new date when rescheduled)
- **EventRescheduled**: Event has been moved to a new date

## Testing Your Events

### Local Testing

1. Start the development server:
   ```bash
   npm run dev
   ```

2. Visit http://localhost:3000/events

3. Check the JSON-LD schema in the page source

### Validate JSON-LD

Use Google's Rich Results Test:
1. Build and deploy your site
2. Visit https://search.google.com/test/rich-results
3. Enter your events page URL: `https://azure-meetup-puglia.github.io/events`
4. Verify the Event schema is detected correctly

## Submitting to dev.events

### First Event

For your first event, you'll need to manually submit it to dev.events:

1. Visit [dev.events](https://dev.events)
2. Click the "new event" button (bottom right corner)
3. Fill out the submission form with your event details
4. Wait ~3 business days for approval

### Subsequent Events

After your first event is approved:

1. Add new events to `data/events.ts`
2. Commit and push changes
3. GitHub Actions will automatically build and deploy
4. dev.events will detect the new event and notify moderators
5. Your event will be published after quick approval

## RSS Feed Integration

dev.events provides an RSS feed with your events:
- Feed URL: https://dev.events/rss
- Filter by category, location, or search terms
- Use tools like Siftrss for custom filtering

## Event Requirements

To ensure your events are eligible for dev.events:

- ✅ Clear event date and time
- ✅ Specific location (city/venue or online platform)
- ✅ Registration/event link
- ✅ Speaker information
- ✅ Event description (what participants will learn)

## Troubleshooting

### Event Not Appearing on dev.events

1. Verify your first event was manually submitted and approved
2. Check JSON-LD markup using Google's Rich Results Test
3. Ensure the event meets all requirements listed above
4. Contact dev.events support: hello@dev.events

### JSON-LD Not Rendering

1. Check for TypeScript errors: `npm run build`
2. Verify date format is valid ISO 8601
3. Ensure all required fields are present
4. Check browser console for JavaScript errors

## Best Practices

1. **Add Events Early**: Submit events at least 2-3 weeks in advance
2. **Include Rich Descriptions**: Help attendees understand what they'll learn
3. **Add Speaker Info**: Builds credibility and attracts attendees
4. **Use High-Quality Images**: Professional images improve social sharing
5. **Keep Information Updated**: Update event status if plans change

## Example: Complete Event Entry

```typescript
{
  name: "Azure AI Services Deep Dive - Bari",
  description: "Esplorazione approfondita di Azure AI Services con demo pratiche su GPT-4, Vision, e Speech. Include hands-on lab e Q&A con Azure MVP. Livello: intermedio-avanzato.",
  startDate: "2025-02-20T18:30:00+01:00",
  endDate: "2025-02-20T21:00:00+01:00",
  eventStatus: "EventScheduled",
  eventAttendanceMode: "MixedEventAttendanceMode",
  location: {
    "@type": "Place",
    name: "Microsoft Innovation Center Bari",
    address: {
      "@type": "PostalAddress",
      streetAddress: "Via Amendola 172/5",
      addressLocality: "Bari",
      addressRegion: "Puglia",
      postalCode: "70126",
      addressCountry: "IT"
    },
    url: "https://www.meetup.com/azure-meetup-puglia/events/example"
  },
  image: [
    "https://azure-meetup-puglia.github.io/images/events/ai-deep-dive.jpg"
  ],
  organizer: {
    "@type": "Organization",
    name: "Azure Meetup Puglia",
    url: "https://azure-meetup-puglia.github.io/"
  },
  offers: {
    "@type": "Offer",
    url: "https://www.meetup.com/azure-meetup-puglia/events/example",
    price: "0",
    priceCurrency: "EUR",
    availability: "https://schema.org/InStock",
    validFrom: "2025-01-20T00:00:00+01:00"
  },
  performer: [
    {
      "@type": "Person",
      name: "Mario Rossi",
      description: "Azure MVP, AI Specialist"
    },
    {
      "@type": "Person",
      name: "Laura Bianchi",
      description: "Senior Cloud Architect"
    }
  ]
}
```

## Support

- **dev.events**: hello@dev.events
- **Technical Issues**: Create an issue on the GitHub repository
- **Community Questions**: Ask in the Azure Meetup Puglia Telegram channel

---

For more information about dev.events integration, visit:
- [dev.events About Page](https://dev.events/about)
- [Schema.org Event Documentation](https://schema.org/Event)
