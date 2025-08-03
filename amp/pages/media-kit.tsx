import type { NextPage } from 'next';
import Head from 'next/head';
import Link from 'next/link';
import { ArrowLeft, MapPin, Users, Calendar, TrendingUp, Handshake, Building2, Gift } from 'lucide-react';

const MediaKit: NextPage = () => {
  const siteUrl = "https://azure-meetup-puglia.github.io/";

  return (
    <div className="min-h-screen bg-gray-900 text-gray-200 font-sans">
      <Head>
        <title>Media Kit - Azure Meetup Puglia | Informazioni per Partner e Sponsor</title>
        <meta name="description" content="Media Kit ufficiale di Azure Meetup Puglia. Informazioni per partner, sponsor e aziende interessate a collaborare con la nostra community cloud." />
        <meta name="robots" content="index, follow" />
        <link rel="canonical" href={`${siteUrl}media-kit`} />
      </Head>

      <div className="p-4 md:p-8">
        {/* Header */}
        <header className="max-w-4xl mx-auto mb-12">
          <Link 
            href="/"
            className="inline-flex items-center gap-2 text-blue-400 hover:text-blue-300 transition-colors mb-6"
          >
            <ArrowLeft className="w-4 h-4" />
            Torna alla Home
          </Link>
          
          <div className="text-center">
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
              🌐 MEDIA KIT
            </h1>
            <p className="text-xl text-blue-300">
              Azure Meetup Puglia
            </p>
          </div>
        </header>

        <main className="max-w-4xl mx-auto space-y-12">
          {/* Chi siamo */}
          <section className="bg-gray-800 p-8 rounded-xl border border-gray-700">
            <h2 className="text-2xl font-semibold text-blue-400 mb-6 flex items-center gap-3">
              <Users className="w-6 h-6" />
              📌 Chi siamo
            </h2>
            <div className="space-y-4 text-gray-300">
              <p>
                <strong className="text-white">Azure Meetup Puglia</strong> è una community tech indipendente nata per riunire appassionati e professionisti del mondo Microsoft Azure, sviluppo cloud-native, AI e DevOps in Puglia e oltre.
              </p>
              <p>
                L'iniziativa è completamente volontaria e autofinanziata. Il nostro obiettivo è semplice: costruire una community reale, accessibile, formativa e orientata allo scambio concreto tra persone.
              </p>
            </div>
          </section>

          {/* La nostra visione */}
          <section className="bg-gray-800 p-8 rounded-xl border border-gray-700">
            <h2 className="text-2xl font-semibold text-blue-400 mb-6">
              🧭 La nostra visione
            </h2>
            <div className="space-y-4 text-gray-300">
              <p>
                Crediamo che la condivisione della conoscenza porti vantaggi competitivi reali, a livello individuale e aziendale. Partecipare a una community significa:
              </p>
              <ul className="list-disc list-inside space-y-2 ml-4">
                <li>vedere soluzioni tecniche reali,</li>
                <li>entrare in contatto con professionisti verticali, speaker esperti e MVP,</li>
                <li>scambiare idee con sviluppatori, ingegneri cloud, architetti software locali,</li>
                <li>imparare anche solo ascoltando chi ha esperienze diverse dalla propria.</li>
              </ul>
              <p className="mt-4">
                Non promettiamo eventi hollywoodiani: vogliamo solo creare un punto d'incontro tra chi lavora seriamente nel cloud e chi vuole imparare.
              </p>
            </div>
          </section>

          {/* Perché la Puglia */}
          <section className="bg-gray-800 p-8 rounded-xl border border-gray-700">
            <h2 className="text-2xl font-semibold text-blue-400 mb-6 flex items-center gap-3">
              <MapPin className="w-6 h-6" />
              📍 Perché la Puglia
            </h2>
            <div className="space-y-4 text-gray-300">
              <ul className="space-y-3">
                <li>La regione è al centro di investimenti tech con progetti come la <strong className="text-white">Puglia Data Center Valley</strong>.</li>
                <li>Le università di Bari, Lecce e il Politecnico offrono nuovi talenti IT ogni anno.</li>
                <li>Le PMI locali si stanno digitalizzando rapidamente, ma manca ancora un ecosistema cloud tecnico forte e continuo.</li>
              </ul>
            </div>
          </section>

          {/* Chi partecipa */}
          <section className="bg-gray-800 p-8 rounded-xl border border-gray-700">
            <h2 className="text-2xl font-semibold text-blue-400 mb-6">
              👥 Chi partecipa
            </h2>
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <h3 className="text-lg font-semibold text-white mb-3">Profilo demografico</h3>
                <ul className="space-y-2 text-gray-300">
                  <li><strong>Età:</strong> 20+ anni</li>
                  <li><strong>Professionisti IT:</strong> DevOps, sviluppatori, architetti cloud, consulenti, CTO, CIO</li>
                  <li><strong>Figure dirigenziali:</strong> Tech Lead, Engineering Manager, IT Director</li>
                  <li><strong>Settori:</strong> Startup, PMI, system integrator, grandi aziende</li>
                  <li><strong>Profili universitari:</strong> Studenti, ricercatori, docenti informatica</li>
                  <li><strong>Junior:</strong> Neo-laureati e junior developer interessati a crescere</li>
                </ul>
              </div>
              <div>
                <h3 className="text-lg font-semibold text-white mb-3">Obiettivi del pubblico</h3>
                <ul className="space-y-2 text-gray-300">
                  <li>Formazione continua</li>
                  <li>Networking professionale</li>
                  <li>Accesso a use case, demo, tecnologie, ispirazione</li>
                </ul>
              </div>
            </div>
            
            <div className="mt-6 bg-blue-900/20 border border-blue-600 rounded-lg p-4">
              <h3 className="text-lg font-semibold text-white mb-2">🤝 Collaborazioni</h3>
              <p className="text-gray-300">
                Collaboriamo attivamente con <strong className="text-blue-300">Global AI Community</strong> (<a href="https://globalai.community/" target="_blank" rel="noopener noreferrer" className="text-blue-400 hover:text-blue-300 underline">globalai.community</a>) per i capitoli di Bari e Lecce, ampliando l'offerta formativa su AI e Machine Learning.
              </p>
            </div>
          </section>

          {/* Eventi 2025 */}
          <section className="bg-gray-800 p-8 rounded-xl border border-gray-700">
            <h2 className="text-2xl font-semibold text-blue-400 mb-6 flex items-center gap-3">
              <Calendar className="w-6 h-6" />
              📆 Eventi 2025
            </h2>
            <div className="text-gray-300 space-y-4">
              <p className="text-lg">
                <strong className="text-white">Impegno mensile:</strong> un evento al mese, alternando modalità in presenza e online per massimizzare la partecipazione e l'accessibilità.
              </p>
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <h3 className="font-semibold text-white mb-2">Eventi in presenza</h3>
                  <p className="text-gray-300">Meetup nelle principali città pugliesi (Bari, Lecce, Brindisi, Foggia) con networking, talk tecnici e demo pratiche.</p>
                </div>
                <div>
                  <h3 className="font-semibold text-white mb-2">Eventi online</h3>
                  <p className="text-gray-300">Sessioni virtuali su Zoom/Teams per raggiungere un pubblico più ampio e approfondire tematiche specifiche.</p>
                </div>
              </div>
            </div>
          </section>

          {/* Metriche & Trasparenza */}
          <section className="bg-gray-800 p-8 rounded-xl border border-gray-700">
            <h2 className="text-2xl font-semibold text-blue-400 mb-6 flex items-center gap-3">
              <TrendingUp className="w-6 h-6" />
              📈 Metriche & Trasparenza
            </h2>
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <table className="w-full text-left">
                  <thead>
                    <tr className="border-b border-gray-600">
                      <th className="py-2 text-white font-semibold">Metrica</th>
                      <th className="py-2 text-white font-semibold">Modalità</th>
                    </tr>
                  </thead>
                  <tbody className="text-gray-300">
                    <tr><td className="py-2">Iscritti</td><td className="py-2">Meetup.com</td></tr>
                    <tr><td className="py-2">Feedback</td><td className="py-2">Raccolta post-evento</td></tr>
                    <tr><td className="py-2">Visibilità social</td><td className="py-2">LinkedIn + Instagram</td></tr>
                  </tbody>
                </table>
              </div>
              <div className="text-gray-300">
                <h3 className="text-lg font-semibold text-white mb-3">📌 Dopo ogni evento invieremo:</h3>
                <ul className="space-y-2">
                  <li>una mail ai partecipanti con ringraziamenti, link a foto e form feedback</li>
                  <li>un recap sintetico con menzione sponsor e host</li>
                </ul>
              </div>
            </div>
          </section>

          {/* Partnership */}
          <section className="bg-gray-800 p-8 rounded-xl border border-gray-700">
            <h2 className="text-2xl font-semibold text-blue-400 mb-6 flex items-center gap-3">
              <Handshake className="w-6 h-6" />
              🤝 Partnership
            </h2>
            <div className="bg-yellow-900/20 border border-yellow-600 rounded-lg p-4 mb-6">
              <p className="text-yellow-200 font-medium">
                Nessun pagamento verso il meetup. Le aziende possono contribuire direttamente, attraverso beni o servizi, per supportare gli eventi.
              </p>
            </div>

            <div className="space-y-6">
              {/* Host Partner */}
              <div className="bg-gray-700 p-6 rounded-lg">
                <h3 className="text-xl font-semibold text-white mb-4 flex items-center gap-2">
                  <Building2 className="w-5 h-5 text-blue-400" />
                  🏢 Host Partner
                </h3>
                <p className="text-gray-300 mb-4">
                  Aziende o enti che mettono a disposizione spazi, logistica e servizi di base
                </p>
                
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <h4 className="font-semibold text-white mb-2">Cosa offre:</h4>
                    <ul className="text-gray-300 space-y-1 text-sm">
                      <li>• Location (sala, sedie, WiFi, proiettore)</li>
                      <li>• Supporto logistico</li>
                      <li>• Catering o coffee break</li>
                    </ul>
                  </div>
                  
                  <div>
                    <h4 className="font-semibold text-white mb-2">Cosa ottiene:</h4>
                    <ul className="text-gray-300 space-y-1 text-sm">
                      <li>• Logo su sito e slide evento</li>
                      <li>• Ringraziamento live</li>
                      <li>• Speech di apertura evento (3-5 min)</li>
                      <li>• Connessione diretta con i partecipanti</li>
                    </ul>
                  </div>
                </div>
              </div>

              {/* Sponsor Partner */}
              <div className="bg-gray-700 p-6 rounded-lg border-2 border-green-600/30">
                <h3 className="text-xl font-semibold text-white mb-4 flex items-center gap-2">
                  <Gift className="w-5 h-5 text-green-400" />
                  🎁 Sponsor Partner
                </h3>
                <p className="text-gray-300 mb-4">
                  <strong className="text-green-300">Include tutti i benefit dell'Host Partner</strong> + servizi premium e maggiore visibilità
                </p>
                
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <h4 className="font-semibold text-white mb-2">Servizi premium:</h4>
                    <ul className="text-gray-300 space-y-1 text-sm">
                      <li>• Catering premium o coffee break esteso</li>
                      <li>• Gadget a tema personalizzati</li>
                      <li>• Speaker tecnico o demo</li>
                      <li>• Facilities premium</li>
                    </ul>
                  </div>
                  
                  <div>
                    <h4 className="font-semibold text-white mb-2">Benefit esclusivi:</h4>
                    <ul className="text-gray-300 space-y-1 text-sm">
                      <li>• Una delle due sessioni dell'evento assicurata</li>
                      <li>• Slot tecnico o promozionale esteso (5-10 min)</li>
                      <li>• Maggiore visibilità sui materiali evento</li>
                      <li>• Interazione privilegiata con i partecipanti</li>
                      <li>• Menzione prioritaria nel post-evento</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Perché diventare partner */}
          <section className="bg-gray-800 p-8 rounded-xl border border-gray-700">
            <h2 className="text-2xl font-semibold text-blue-400 mb-6">
              🎯 Perché diventare partner
            </h2>
            <div className="grid md:grid-cols-2 gap-6">
              <ul className="space-y-3 text-gray-300">
                <li>• <strong className="text-white">Posizionamento</strong> tra i promotori del cloud in Puglia</li>
                <li>• <strong className="text-white">Employer branding:</strong> accesso a talenti e visibilità tra i professionisti</li>
              </ul>
              <ul className="space-y-3 text-gray-300">
                <li>• <strong className="text-white">Networking reale:</strong> conoscere chi fa Azure sul campo</li>
                <li>• <strong className="text-white">Valore sociale:</strong> supportare la crescita tecnica del territorio</li>
              </ul>
            </div>
          </section>


          {/* Nota finale */}
          <section className="bg-blue-900/20 border border-blue-600 rounded-xl p-8 text-center">
            <h2 className="text-2xl font-semibold text-blue-400 mb-4">
              🎓 Nota finale
            </h2>
            <div className="space-y-3 text-gray-300">
              <p>
                <strong className="text-white">Azure Meetup Puglia</strong> è un progetto 100% volontario.
              </p>
              <p>
                Nessun profitto, nessuna pubblicità invasiva. Solo community, crescita e confronto tarato per un meetup.
              </p>
            </div>
          </section>
        </main>

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
};

export default MediaKit;