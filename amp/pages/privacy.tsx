// pages/privacy.tsx
import Head from 'next/head';
import Link from 'next/link';
import { ArrowLeft, Shield } from 'lucide-react';

export default function Privacy() {
    return (
        <div className="min-h-screen bg-gray-900 text-gray-200 font-sans p-4 md:p-8">
            <Head>
                <title>Informativa Privacy | Azure Meetup Puglia</title>
                <meta name="description" content="Informativa Privacy per gli eventi di Azure Meetup Puglia in conformità all'art. 13 GDPR" />
                <meta name="robots" content="index, follow" />
            </Head>

            <div className="max-w-4xl mx-auto space-y-8">
                <Link
                    href="/"
                    className="inline-flex items-center gap-2 text-blue-400 hover:text-blue-300 transition-colors mb-6"
                >
                    <ArrowLeft className="w-4 h-4" />
                    Torna alla Home
                </Link>

                <div className="flex items-center justify-center gap-3 mb-8">
                    <Shield className="w-10 h-10 text-blue-400" aria-hidden="true" />
                    <h1 className="text-4xl font-bold text-blue-400 text-center">Informativa Privacy</h1>
                </div>

                <div className="bg-gray-800 p-6 rounded-lg border border-gray-700">
                    <p className="text-center text-lg text-gray-300">
                        Eventi Azure Meetup Puglia (Art. 13 GDPR)
                    </p>
                </div>

                <section>
                    <h2 className="text-2xl font-semibold text-white mb-4">Titolare del trattamento</h2>
                    <div className="bg-gray-800 p-6 rounded-lg border border-gray-700">
                        <p className="mb-2"><strong className="text-blue-300">Azure Meetup Puglia</strong></p>
                        <p className="mb-2">Referente: <strong className="text-white">Carlo Sacchi</strong></p>
                        <p>
                            Contatto:{" "}
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
                    </div>
                </section>

                <section>
                    <h2 className="text-2xl font-semibold text-white mb-4">Dati trattati</h2>
                    <div className="bg-gray-800 p-6 rounded-lg border border-gray-700">
                        <p>Nome, cognome, email; eventuale azienda/ruolo (se forniti).</p>
                    </div>
                </section>

                <section>
                    <h2 className="text-2xl font-semibold text-white mb-4">Finalità e basi giuridiche</h2>
                    <div className="space-y-4">
                        <div className="bg-gray-800 p-6 rounded-lg border border-gray-700">
                            <h3 className="text-lg font-semibold text-blue-300 mb-2">1. Gestione iscrizione e comunicazioni operative</h3>
                            <p className="mb-2">
                                Accesso in sede, registrazione partecipanti, reminder, variazioni dell'evento. Include condivisione con venue host/partner per motivi di sicurezza e gestione accessi in loco.
                            </p>
                            <p className="text-sm text-gray-400">
                                <strong>Base giuridica:</strong> Esecuzione di misure precontrattuali/contratto (art. 6.1.b GDPR)
                            </p>
                        </div>

                        <div className="bg-gray-800 p-6 rounded-lg border border-gray-700">
                            <h3 className="text-lg font-semibold text-blue-300 mb-2">2. Follow-up strettamente correlato all'evento</h3>
                            <p className="mb-2">
                                Invio di materiali dell'evento, survey di feedback.
                            </p>
                            <p className="text-sm text-gray-400">
                                <strong>Base giuridica:</strong> Legittimo interesse (art. 6.1.f GDPR)
                            </p>
                        </div>

                        <div className="bg-gray-800 p-6 rounded-lg border border-gray-700">
                            <h3 className="text-lg font-semibold text-blue-300 mb-2">3. Condivisione con partner/sponsor</h3>
                            <p className="mb-2">
                                Per esigenze organizzative e attivazione di omaggi/promozioni.
                            </p>
                            <p className="text-sm text-gray-400">
                                <strong>Base giuridica:</strong> Consenso (art. 6.1.a GDPR) - <span className="text-yellow-400">facoltativa</span>
                            </p>
                        </div>

                        <div className="bg-gray-800 p-6 rounded-lg border border-gray-700">
                            <h3 className="text-lg font-semibold text-blue-300 mb-2">4. Comunicazioni su futuri eventi/iniziative</h3>
                            <p className="mb-2">
                                Newsletter e aggiornamenti sulla community.
                            </p>
                            <p className="text-sm text-gray-400">
                                <strong>Base giuridica:</strong> Consenso (art. 6.1.a GDPR) - <span className="text-yellow-400">facoltativa</span>
                            </p>
                        </div>
                    </div>
                </section>

                <section>
                    <h2 className="text-2xl font-semibold text-white mb-4">Destinatari</h2>
                    <div className="bg-gray-800 p-6 rounded-lg border border-gray-700 space-y-4">
                        <div>
                            <h3 className="text-lg font-semibold text-blue-300 mb-2">Venue Host e Partner per gestione evento</h3>
                            <p className="mb-2">
                                Venue host e partner organizzativi ricevono i dati necessari per:
                            </p>
                            <ul className="list-disc list-inside space-y-1 text-gray-300 ml-4">
                                <li>Registrazione e controllo accessi in loco (sicurezza, badge)</li>
                                <li>Gestione logistica dell'evento (catering, emergenze)</li>
                                <li>Adempimenti normativi (es. GDPR, sicurezza sul lavoro)</li>
                            </ul>
                            <p className="text-sm text-gray-400 mt-2">
                                <strong>Base giuridica:</strong> Esecuzione del contratto (necessario per la partecipazione all'evento)
                            </p>
                        </div>
                        <div>
                            <h3 className="text-lg font-semibold text-blue-300 mb-2">Sponsor per attività promozionali</h3>
                            <p>
                                Sponsor dell'evento (es. Improove, Global AI Community) per attivazione di omaggi, promozioni e comunicazioni commerciali <strong>solo se hai dato consenso specifico</strong>.
                            </p>
                            <p className="text-sm text-gray-400 mt-2">
                                <strong>Base giuridica:</strong> Consenso (art. 6.1.a GDPR) - <span className="text-yellow-400">facoltativo</span>
                            </p>
                        </div>
                        <div>
                            <h3 className="text-lg font-semibold text-blue-300 mb-2">Fornitori di servizi</h3>
                            <p className="mb-2">
                                Fornitori di servizi (es. Eventbrite/Meetup, email, cloud) come responsabili del trattamento.
                            </p>
                            <p className="text-sm text-gray-400">
                                <strong>Nota:</strong> Eventbrite/Meetup trattano anche come titolari autonomi per le attività svolte sulle loro piattaforme.
                            </p>
                        </div>
                    </div>
                </section>

                <section>
                    <h2 className="text-2xl font-semibold text-white mb-4">Trasferimenti extra-UE</h2>
                    <div className="bg-gray-800 p-6 rounded-lg border border-gray-700">
                        <p>
                            Possibili tramite servizi cloud/email: in tal caso si applicano garanzie adeguate
                            (Standard Contractual Clauses).
                        </p>
                    </div>
                </section>

                <section>
                    <h2 className="text-2xl font-semibold text-white mb-4">Conservazione</h2>
                    <div className="bg-gray-800 p-6 rounded-lg border border-gray-700 space-y-3">
                        <div>
                            <p className="mb-1">
                                <strong className="text-blue-300">Per gestione evento e follow-up:</strong>
                            </p>
                            <p>Massimo 12 mesi dall'evento.</p>
                        </div>
                        <div>
                            <p className="mb-1">
                                <strong className="text-blue-300">Per finalità basate su consenso (promo/marketing):</strong>
                            </p>
                            <p>Fino a revoca o massimo 24 mesi.</p>
                        </div>
                    </div>
                </section>

                <section>
                    <h2 className="text-2xl font-semibold text-white mb-4">Diritti</h2>
                    <div className="bg-gray-800 p-6 rounded-lg border border-gray-700 space-y-4">
                        <p>
                            Puoi esercitare i seguenti diritti in qualsiasi momento:
                        </p>
                        <ul className="list-disc list-inside space-y-2 text-gray-300">
                            <li>Accesso ai tuoi dati personali</li>
                            <li>Rettifica dei dati inesatti</li>
                            <li>Cancellazione dei dati</li>
                            <li>Limitazione del trattamento</li>
                            <li>Portabilità dei dati</li>
                            <li>Opposizione al trattamento</li>
                            <li>Revoca del consenso in ogni momento</li>
                        </ul>
                        <p className="mt-4">
                            Per esercitare i tuoi diritti, scrivi a:{" "}
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
                        <p className="mt-4 text-sm text-gray-400">
                            <strong>Reclami:</strong> Hai il diritto di presentare un reclamo al Garante per la Protezione dei Dati Personali:{" "}
                            <a
                                href="https://www.garanteprivacy.it"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-blue-400 underline hover:text-blue-300"
                            >
                                www.garanteprivacy.it
                            </a>
                        </p>
                    </div>
                </section>

                <section>
                    <h2 className="text-2xl font-semibold text-white mb-4">Obbligatorietà</h2>
                    <div className="bg-gray-800 p-6 rounded-lg border border-gray-700 space-y-3">
                        <p>
                            Il conferimento dei dati per la <strong className="text-blue-300">gestione dell'evento</strong> (iscrizione, accesso in sede, registrazione partecipanti, comunicazioni operative) è <strong className="text-blue-300">necessario per partecipare</strong>.
                        </p>
                        <p>
                            Questo include la condivisione dei dati con il venue host/partner per motivi di sicurezza e gestione accessi in loco.
                        </p>
                        <p className="pt-2 border-t border-gray-700">
                            I consensi <strong className="text-yellow-300">facoltativi</strong> (condivisione con sponsor per attività promozionali e comunicazioni future) non incidono sulla partecipazione all'evento.
                        </p>
                    </div>
                </section>

                <footer className="mt-16 pt-8 pb-6 border-t border-gray-700">
                    <p className="text-center text-sm text-gray-500 mb-6">
                        Ultimo aggiornamento: 25 ottobre 2025
                    </p>
                    <div className="text-center">
                        <Link
                            href="/"
                            className="inline-flex items-center gap-2 text-blue-400 hover:text-blue-300 transition-colors"
                        >
                            <ArrowLeft className="w-4 h-4" />
                            Torna alla Home
                        </Link>
                    </div>
                </footer>
            </div>
        </div>
    );
}
