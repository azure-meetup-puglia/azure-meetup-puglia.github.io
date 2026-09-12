// pages/code-of-conduct.tsx
import Head from 'next/head';
import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';
import { OG_IMAGE, OG_IMAGE_ALT, OG_IMAGE_HEIGHT, OG_IMAGE_TYPE, OG_IMAGE_WIDTH, SITE_URL } from '../data/site';

export default function CodeOfConduct() {
    const pageUrl = `${SITE_URL}code-of-conduct`;

    return (
        <div className="min-h-screen bg-gray-900 text-gray-200 font-sans p-4 md:p-8">
            <Head>
                <title>Codice di Condotta | Azure Meetup Puglia</title>
                <meta name="description" content="Il Codice di Condotta di Azure Meetup Puglia: un ambiente sicuro, accogliente e inclusivo per tutti i membri della community." />
                <meta name="robots" content="index, follow" />
                <link rel="canonical" href={pageUrl} />

                {/* Open Graph / Facebook */}
                <meta property="og:type" content="website" />
                <meta property="og:site_name" content="Azure Meetup Puglia" />
                <meta property="og:title" content="Codice di Condotta | Azure Meetup Puglia" />
                <meta property="og:description" content="Un ambiente sicuro, accogliente e inclusivo per tutti i membri della community Azure Meetup Puglia." />
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
                <meta name="twitter:title" content="Codice di Condotta | Azure Meetup Puglia" />
                <meta name="twitter:description" content="Le regole che rendono la nostra community un posto sicuro e inclusivo." />
                <meta name="twitter:image" content={OG_IMAGE} />
                <meta name="twitter:image:alt" content={OG_IMAGE_ALT} />
            </Head>

            <div className="max-w-4xl mx-auto space-y-8">
                <Link
                    href="/"
                    className="inline-flex items-center gap-2 text-blue-400 hover:text-blue-300 transition-colors mb-6"
                >
                    <ArrowLeft className="w-4 h-4" />
                    Torna alla Home
                </Link>

                <h1 className="text-4xl font-bold text-blue-400 text-center">Codice di Condotta</h1>

                <p>
                    Il nostro obiettivo è creare un ambiente sicuro, accogliente e inclusivo per tutti i membri della community,
                    indipendentemente da età, razza, etnia, identità di genere, orientamento sessuale, disabilità, religione,
                    provenienza o livello di esperienza.
                </p>

                <h2 className="text-2xl font-semibold text-white">Comportamenti attesi</h2>
                <ul className="list-disc list-inside space-y-2">
                    <li>Essere rispettosi e gentili con gli altri.</li>
                    <li>Favorire un dialogo aperto, costruttivo e privo di discriminazioni.</li>
                    <li>Accogliere e supportare persone di ogni background ed esperienza.</li>
                    <li>Accettare feedback con spirito di crescita.</li>
                </ul>

                <h2 className="text-2xl font-semibold text-white">Comportamenti inaccettabili</h2>
                <ul className="list-disc list-inside space-y-2">
                    <li>Molestie, intimidazioni o linguaggio offensivo.</li>
                    <li>Discriminazioni sotto qualsiasi forma.</li>
                    <li>Comportamenti non rispettosi durante eventi o discussioni.</li>
                    <li>Condivisione di contenuti non richiesti o pubblicità non autorizzata.</li>
                </ul>

                <h2 className="text-2xl font-semibold text-white">Applicazione e segnalazioni</h2>
                <p>
                    Gli organizzatori sono responsabili di far rispettare questo codice di condotta e possono intraprendere azioni
                    appropriate in caso di violazioni, inclusa l’espulsione temporanea o permanente dagli eventi o canali del gruppo.
                </p>
                <p>
                    Puoi segnalare violazioni scrivendo a:{" "}
                    <span
                        className="text-blue-400 underline cursor-pointer"
                        data-email="YXp1cmVtZWV0dXBwdWdsaWFAZ21haWwuY29t"
                        onClick={(e) => {
                            const el = e.currentTarget;
                            const encoded = el.getAttribute('data-email');
                            if (encoded) {
                                const decoded = atob(encoded);
                                window.location.href = `mailto:${decoded}`;
                            }
                        }}
                    >
                        azuremeetuppuglia [at] gmail [dot] com
                    </span>
                </p>
                <h2 className="text-2xl font-semibold text-white">Ambito di applicazione</h2>
                <p>
                    Questo Codice di Condotta si applica a tutti gli spazi della community Azure Meetup Puglia, inclusi eventi dal vivo, piattaforme online (come gruppi Telegram, LinkedIn, Meetup.com), presentazioni e qualsiasi altro luogo di interazione.
                </p>
                <h2 className="text-2xl font-semibold text-white">Licenza e attribuzione</h2>
                <p>
                    Questo Codice di Condotta è ispirato e adattato dal <a href="https://berlincodeofconduct.org" className="text-blue-400 underline">Berlin Code of Conduct</a> e dal <a href="https://developer.microsoft.com/en-us/azure-tech-groups/code-of-conduct" className="text-blue-400 underline">Codice ufficiale Microsoft Azure Tech Groups</a>.
                    È distribuito sotto licenza <strong>Creative Commons Attribution-ShareAlike 4.0 International</strong> (CC BY-SA 4.0).
                </p>
                <h2 className="text-2xl font-semibold text-white">Riferimenti</h2>
                <ul className="list-disc list-inside space-y-2">
                    <li>
                        Codice di Condotta ufficiale di Microsoft Azure Tech Groups:{" "}
                        <a href="https://developer.microsoft.com/en-us/azure-tech-groups/code-of-conduct" target="_blank" rel="noopener noreferrer" className="text-blue-400 underline">
                            developer.microsoft.com/en-us/azure-tech-groups/code-of-conduct
                        </a>
                    </li>
                    <li>
                        Ispirato anche dal Berlin Code of Conduct:{" "}
                        <a href="https://berlincodeofconduct.org" target="_blank" rel="noopener noreferrer" className="text-blue-400 underline">
                            berlincodeofconduct.org
                        </a>
                    </li>
                </ul>

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
