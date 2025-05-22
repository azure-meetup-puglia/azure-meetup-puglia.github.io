import Head from 'next/head';
import { Linkedin } from 'lucide-react';

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
        job: "Azure Cloud Engineer & DevOps, Azure Italia Podcast Founder",
        photoUrl: "/img/carlo.jpeg",
        linkedin: "https://www.linkedin.com/in/carlo-sacchi/"
    }
    // Aggiungi altri membri qui
];

export default function TeamPage() {
    return (
        <div className="min-h-screen bg-gray-900 text-gray-200 font-sans p-4 md:p-8">
            <Head>
                <title>Il Team | Azure Meetup Puglia</title>
            </Head>

            <div className="max-w-6xl mx-auto space-y-12">
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
            </div>
        </div>
    );
}