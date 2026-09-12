import Head from 'next/head';
import Link from 'next/link';
import { Linkedin, ArrowLeft } from 'lucide-react';
import { OG_IMAGE, OG_IMAGE_ALT, OG_IMAGE_HEIGHT, OG_IMAGE_TYPE, OG_IMAGE_WIDTH, OG_LOGO, SITE_URL } from '../data/site';

interface TeamMember {
    name: string;
    surname: string;
    role: string;
    job: string;
    photoUrl: string;
    linkedin: string;
}

const teamMembers: TeamMember[] = [
    {
        name: "Carlotta",
        surname: "Castelluccio",
        role: "Founder & Organizer",
        job: "Senior AI Advocate presso Microsoft",
        photoUrl: "/img/carlotta.jpeg",
        linkedin: "https://www.linkedin.com/in/carlotta-castelluccio"
    },
    {
        name: "Carlo",
        surname: "Sacchi",
        role: "Founder & Organizer",
        job: "Azure Cloud Engineer & DevOps, Microsoft MVP, Azure Italia Podcast Founder",
        photoUrl: "/img/carlo.jpeg",
        linkedin: "https://www.linkedin.com/in/carlo-sacchi/"
    },
    {
        name: "Vito",
        surname: "Macina",
        role: "Organizer",
        job: "Digital Specialist & Microsoft MVP",
        photoUrl: "/img/vito.png",
        linkedin: "https://www.linkedin.com/in/vmacina/"
    },
    {
        name: "Marco",
        surname: "Mansi",
        role: "Organizer",
        job: "Freelance Azure Architect and Developer",
        photoUrl: "/img/marco_mansi.jpeg",
        linkedin: "https://www.linkedin.com/in/mansimarco/"
    }
    // Aggiungi altri membri qui
];

export default function TeamPage() {
    const pageUrl = `${SITE_URL}team`;

    return (
        <div className="min-h-screen bg-gray-900 text-gray-200 font-sans p-4 md:p-8">
            <Head>
                <title>Il Team | Azure Meetup Puglia</title>
                <meta name="description" content="Il team di organizzatori di Azure Meetup Puglia: founder, organizer e volontari che portano avanti la community Microsoft Azure in Puglia." />
                <meta name="robots" content="index, follow" />
                <link rel="canonical" href={pageUrl} />

                {/* Open Graph / Facebook */}
                <meta property="og:type" content="website" />
                <meta property="og:site_name" content="Azure Meetup Puglia" />
                <meta property="og:logo" content={OG_LOGO} />
                <meta property="og:title" content="Il Team | Azure Meetup Puglia" />
                <meta property="og:description" content="Chi organizza Azure Meetup Puglia: founder e organizer della community Microsoft Azure pugliese." />
                <meta property="og:url" content={pageUrl} />
                <meta property="og:image" content={OG_IMAGE} />
                <meta property="og:image:secure_url" content={OG_IMAGE} />
                <meta property="og:image:type" content={OG_IMAGE_TYPE} />
                <meta property="og:image:alt" content={OG_IMAGE_ALT} />
                <meta property="og:image:width" content={OG_IMAGE_WIDTH} />
                <meta property="og:image:height" content={OG_IMAGE_HEIGHT} />
                <meta property="og:locale" content="it_IT" />

                {/* Twitter Card */}
                <meta name="twitter:card" content="summary_large_image" />
                <meta name="twitter:title" content="Il Team | Azure Meetup Puglia" />
                <meta name="twitter:description" content="Founder e organizer della community Microsoft Azure pugliese." />
                <meta name="twitter:image" content={OG_IMAGE} />
                <meta name="twitter:image:alt" content={OG_IMAGE_ALT} />
            </Head>

            <div className="max-w-6xl mx-auto space-y-12">
                <Link
                    href="/"
                    className="inline-flex items-center gap-2 text-blue-400 hover:text-blue-300 transition-colors mb-6"
                >
                    <ArrowLeft className="w-4 h-4" />
                    Torna alla Home
                </Link>

                <h1 className="text-4xl font-bold text-blue-400 text-center">Il Team</h1>
                <p className="text-center text-gray-400 max-w-xl mx-auto text-lg">
                    Scopri chi c'è dietro la community Azure Meetup Puglia. Persone appassionate di cloud, tecnologie Microsoft e voglia di condividere.
                </p>

                <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-10">
                    {teamMembers.map((member, index) => (
                        <div
                            key={index}
                            className="bg-gray-800 rounded-xl border border-gray-700 shadow-lg p-6 flex flex-col items-center text-center"
                        >
                            <div className="w-32 h-32 rounded-full overflow-hidden border-4 border-blue-500 mb-4">
                                <img
                                    src={member.photoUrl}
                                    alt={`${member.name} ${member.surname}`}
                                    className="w-full h-full object-cover"
                                />
                            </div>
                            <h3 className="text-xl font-semibold text-white">
                                {member.name} {member.surname}
                            </h3>
                            <p className="text-sm text-blue-300 mb-1">{member.role}</p>
                            <p className="text-sm text-gray-400 italic mb-2">{member.job}</p>

                            <a
                                href={member.linkedin}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-gray-400 hover:text-blue-400 transition-colors flex items-center gap-2 text-sm"
                            >
                                <Linkedin className="w-4 h-4" />
                                Profilo LinkedIn
                            </a>
                        </div>
                    ))}
                </div>

                <footer className="mt-16 pt-8 pb-6 border-t border-gray-700 text-center">
                    <Link
                        href="/"
                        className="inline-flex items-center gap-2 text-blue-400 hover:text-blue-300 transition-colors"
                    >
                        <ArrowLeft className="w-4 h-4" />
                        Torna alla Home
                    </Link>
                </footer>
            </div>
        </div>
    );
}