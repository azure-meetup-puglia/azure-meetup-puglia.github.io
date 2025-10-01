import type { NextPage } from 'next';
import Head from 'next/head';
import Link from 'next/link';
import { ArrowLeft, MapPin, Users, Calendar, TrendingUp, Handshake, Building2, Gift, Target, CheckCircle, ClipboardList, Shield, HelpCircle, Zap } from 'lucide-react';

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
            <p className="text-xl text-blue-300 mb-4">
              Azure Meetup Puglia
            </p>
            <p className="text-gray-400 max-w-2xl mx-auto">
              Community tecnica indipendente su Microsoft Azure, cloud-native, AI e DevOps. 
              Eventi mensili, formato snello, 100% volontario. Nessuna fee: lavoriamo con partnership in-kind.
            </p>
          </div>
        </header>

        <main className="max-w-4xl mx-auto space-y-12">
          {/* Quick Facts */}
          <section className="bg-gradient-to-r from-blue-900/20 to-purple-900/20 p-8 rounded-xl border border-blue-700/50">
            <h2 className="text-2xl font-semibold text-blue-400 mb-6 flex items-center gap-3">
              <Zap className="w-6 h-6" />
              Quick Facts
            </h2>
            <div className="grid md:grid-cols-2 gap-4 text-gray-300">
              <div className="space-y-2">
                <p><strong className="text-white">Formato:</strong> meetup tecnico mensile (in presenza oppure online)</p>
                <p><strong className="text-white">Focus:</strong> Azure • cloud-native • AI • DevOps • sviluppo • .NET • sicurezza • dati</p>
                <p><strong className="text-white">Area:</strong> Puglia (Bari, Lecce, Brindisi, Foggia, Taranto, Barletta, etc.) + pubblico online</p>
              </div>
              <div className="space-y-2">
                <p><strong className="text-white">Modello:</strong> non-profit, community-driven, trasparente</p>
                <p><strong className="text-white">Collaborazioni:</strong> Global AI Community (Bari e Lecce), a breve altre community tech sul territorio</p>
                <p><strong className="text-white">Canali:</strong> Meetup.com • LinkedIn • Instagram</p>
              </div>
            </div>
          </section>

          {/* Chi siamo */}
          <section className="bg-gray-800 p-8 rounded-xl border border-gray-700">
            <h2 className="text-2xl font-semibold text-blue-400 mb-6 flex items-center gap-3">
              <Users className="w-6 h-6" />
              Chi siamo
            </h2>
            <div className="space-y-4 text-gray-300">
              <p>
                <strong className="text-white">Azure Meetup Puglia</strong> nasce per riunire professionisti e appassionati del cloud in eventi <strong className="text-white">concreti, accessibili e utili</strong>. 
                Favoriamo lo scambio tra chi progetta, implementa e governa soluzioni su Azure ogni giorno.
              </p>
              <p>
                L'iniziativa è completamente volontaria e autofinanziata. Il nostro obiettivo è semplice: costruire una community reale, accessibile, formativa e orientata allo scambio concreto tra persone.
              </p>
              <div className="bg-blue-900/20 border border-blue-600 rounded-lg p-4 mt-4">
                <p className="text-blue-200 font-medium">
                  Non puntiamo all'effetto wow, ma al valore reale: talk tecnici, demo, casi d'uso, networking.
                </p>
              </div>
            </div>
          </section>

          {/* La nostra visione */}
          <section className="bg-gray-800 p-8 rounded-xl border border-gray-700">
            <h2 className="text-2xl font-semibold text-blue-400 mb-6">
              La nostra visione
            </h2>
            <div className="space-y-4 text-gray-300">
              <p>
                Crediamo che la condivisione della conoscenza generi <strong className="text-white">vantaggio competitivo</strong> per persone e aziende.
              </p>
              <p className="font-semibold text-white">Partecipare significa:</p>
              <ul className="list-disc list-inside space-y-2 ml-4">
                <li>vedere <strong className="text-white">soluzioni reali</strong> e best practice</li>
                <li>incontrare <strong className="text-white">speaker esperti</strong> (MVP, coach, professionisti di settore)</li>
                <li>scambiare idee con <strong className="text-white">sviluppatori, DevOps, architetti e data/AI engineer</strong></li>
                <li><strong className="text-white">imparare</strong> da esperienze diverse, in modo pratico</li>
              </ul>
            </div>
          </section>

          {/* Perché la Puglia */}
          <section className="bg-gray-800 p-8 rounded-xl border border-gray-700">
            <h2 className="text-2xl font-semibold text-blue-400 mb-6 flex items-center gap-3">
              <MapPin className="w-6 h-6" />
              Perché la Puglia
            </h2>
            <div className="space-y-4 text-gray-300">
              <ul className="space-y-3">
                <li>• Ecosistema in crescita (es. iniziative come <strong className="text-white">Puglia Data Center Valley</strong>)</li>
                <li>• Atenei (Univ. Bari, Univ. Salento, Politecnico di Bari) → <strong className="text-white">talenti</strong> e collaborazione con i dipartimenti</li>
                <li>• Territorio attrattivo per <strong className="text-white">nuove sedi</strong> e hub IT</li>
                <li>• La Puglia è un territorio in enorme crescita con molte possibilità dove molte aziende e società di consulenza stanno trasferendo o aprendo uffici e sedi sul territorio</li>
              </ul>
            </div>
          </section>

          {/* Chi partecipa */}
          <section className="bg-gray-800 p-8 rounded-xl border border-gray-700">
            <h2 className="text-2xl font-semibold text-blue-400 mb-6">
              Chi partecipa
            </h2>
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <h3 className="text-lg font-semibold text-white mb-3">Profilo demografico</h3>
                <ul className="space-y-2 text-gray-300">
                  <li><strong>Ruoli:</strong> Dev/DevOps, SRE, Cloud/Software Architect, Data/AI Engineer, SecOps, consulenti</li>
                  <li><strong>Figure dirigenziali:</strong> CTO, CIO, Tech Lead, Engineering Manager, Founder, CEO</li>
                  <li><strong>Settori:</strong> Startup, PMI, system integrator, enterprise, PA, università</li>
                  <li><strong>Profili universitari:</strong> Studenti, ricercatori, docenti, assistenti</li>
                  <li><strong>Junior:</strong> Neo-laureati e junior developer interessati a crescere</li>
                </ul>
              </div>
              <div>
                <h3 className="text-lg font-semibold text-white mb-3">Obiettivi del pubblico</h3>
                <ul className="space-y-2 text-gray-300">
                  <li>• Formazione continua</li>
                  <li>• Networking professionale</li>
                  <li>• Accesso a use case, demo, tecnologie</li>
                  <li>• Ispirazione e confronto</li>
                </ul>
                
                <div className="mt-4 bg-green-900/20 border border-green-600 rounded-lg p-3">
                  <p className="text-green-200 text-sm">
                    <strong>Inclusività:</strong> Eventi e materiali concepiti per accessibilità (spazi senza barriere, sottotitoli per online quando possibile)
                  </p>
                </div>
              </div>
            </div>

            <div className="mt-6 bg-blue-900/20 border border-blue-600 rounded-lg p-4">
              <h3 className="text-lg font-semibold text-white mb-2">🤝 Collaborazioni</h3>
              <p className="text-gray-300">
                Collaboriamo attivamente con <strong className="text-blue-300">Global AI Community</strong> (<a href="https://globalai.community/" target="_blank" rel="noopener noreferrer" className="text-blue-400 hover:text-blue-300 underline">globalai.community</a>) per i capitoli di Bari e Lecce. 
                <span className="text-yellow-200"> A breve aggiungeremo altre community tech sul territorio</span> per ampliare l'offerta formativa.
              </p>
            </div>
          </section>

          {/* Perché ospitarci */}
          <section className="bg-gradient-to-r from-green-900/20 to-blue-900/20 p-8 rounded-xl border border-green-700/50">
            <h2 className="text-2xl font-semibold text-green-400 mb-6 flex items-center gap-3">
              <Building2 className="w-6 h-6" />
              Perché ospitarci
            </h2>

            <div className="bg-green-900/30 border border-green-600 rounded-lg p-4 mb-6">
              <p className="text-green-100 font-semibold text-lg">
                In una riga
              </p>
              <p className="text-gray-200 mt-2">
                Porti in sede talento, idee e opportunità, con investimento minimo e impatto immediato su brand, recruiting e innovazione.
              </p>
            </div>

            <div className="space-y-6">
              <div>
                <h3 className="text-xl font-semibold text-white mb-4">I motivi principali</h3>
                <div className="grid md:grid-cols-2 gap-4">
                  <div className="bg-gray-700/50 p-4 rounded-lg">
                    <p className="text-white font-semibold mb-2">💼 Employer branding & recruiting</p>
                    <p className="text-gray-300 text-sm">Mostra team e progetti; incontri profili tecnici qualificati.</p>
                  </div>

                  <div className="bg-gray-700/50 p-4 rounded-lg">
                    <p className="text-white font-semibold mb-2">💡 Innovazione pratica</p>
                    <p className="text-gray-300 text-sm">Trend Azure/Cloud, casi reali e lesson learned riusabili.</p>
                  </div>

                  <div className="bg-gray-700/50 p-4 rounded-lg">
                    <p className="text-white font-semibold mb-2">📢 Marketing credibile</p>
                    <p className="text-gray-300 text-sm">Contenuti autentici (no marchette), visibilità locale.</p>
                  </div>

                  <div className="bg-gray-700/50 p-4 rounded-lg">
                    <p className="text-white font-semibold mb-2">🔄 Visibilità che si moltiplica</p>
                    <p className="text-gray-300 text-sm">Grazie alle partnership (es. Global AI), la promozione si propaga a cascata su reti e canali aggiuntivi senza effort extra, ampliando pubblico e territori.</p>
                  </div>

                  <div className="bg-gray-700/50 p-4 rounded-lg">
                    <p className="text-white font-semibold mb-2">📚 Formazione continua</p>
                    <p className="text-gray-300 text-sm">Aggiornamento gratuito per i tuoi tecnici, in sede.</p>
                  </div>

                  <div className="bg-gray-700/50 p-4 rounded-lg">
                    <p className="text-white font-semibold mb-2">🤝 Business & partnership</p>
                    <p className="text-gray-300 text-sm">Conversazioni ad alto valore con aziende e professionisti.</p>
                  </div>

                  <div className="bg-gray-700/50 p-4 rounded-lg">
                    <p className="text-white font-semibold mb-2">🌍 Impatto sul territorio</p>
                    <p className="text-gray-300 text-sm">Sostieni l'ecosistema locale e l'inclusione.</p>
                  </div>

                  <div className="bg-gray-700/50 p-4 rounded-lg">
                    <p className="text-white font-semibold mb-2">💰 Costo/beneficio eccellente</p>
                    <p className="text-gray-300 text-sm">Tu metti lo spazio; agenda, speaker e comunicazione li curiamo noi.</p>
                  </div>
                </div>
              </div>

              <div className="bg-blue-900/20 border border-blue-600 rounded-lg p-6">
                <h3 className="text-xl font-semibold text-white mb-4">Cosa ottieni concretamente</h3>
                <ul className="space-y-2 text-gray-300">
                  <li className="flex items-start gap-2">
                    <CheckCircle className="w-4 h-4 text-blue-400 mt-1 flex-shrink-0" />
                    <span>Logo su pagina evento/slide, ringraziamento live, welcome 3–5'</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="w-4 h-4 text-blue-400 mt-1 flex-shrink-0" />
                    <span>Cross-posting multi-community e co-branding nei materiali: reach e autorevolezza aumentano automaticamente</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="w-4 h-4 text-blue-400 mt-1 flex-shrink-0" />
                    <span>Recruiting corner opzionale e recap con metriche (iscritti/presenti, reach, feedback)</span>
                  </li>
                </ul>
              </div>

              <div className="bg-purple-900/20 border border-purple-600 rounded-lg p-6">
                <h3 className="text-xl font-semibold text-white mb-4">Garanzie editoriali</h3>
                <ul className="space-y-2 text-gray-300">
                  <li>• Eventi vendor-neutral e curati; niente pitch commerciali</li>
                  <li>• Gestione accessi e privacy; niente registrazioni salvo accordi</li>
                </ul>
              </div>

              <div className="bg-gradient-to-r from-green-900/30 to-blue-900/30 border border-green-600 rounded-lg p-6 text-center">
                <h3 className="text-xl font-semibold text-white mb-3">📞 Vuoi ospitarci?</h3>
                <p className="text-gray-200">
                  Vuoi portare la community in sede? <strong className="text-green-300">Candidati come Host Partner</strong> e definiamo insieme data, format e logistica.
                </p>
              </div>
            </div>
          </section>

          {/* Formati evento */}
          <section className="bg-gray-800 p-8 rounded-xl border border-gray-700">
            <h2 className="text-2xl font-semibold text-blue-400 mb-6 flex items-center gap-3">
              <Calendar className="w-6 h-6" />
              Formati evento
            </h2>
            
            <div className="grid md:grid-cols-2 gap-6">
              <div className="bg-gray-700 p-6 rounded-lg">
                <h3 className="text-lg font-semibold text-white mb-4">In presenza (90-120')</h3>
                <p className="text-sm text-gray-400 mb-3">Esempio agenda</p>
                <ol className="space-y-2 text-gray-300 text-sm">
                  <li><strong>1.</strong> Welcome & apertura – 10'</li>
                  <li><strong>2.</strong> Talk tecnico #1 – 30'</li>
                  <li><strong>3.</strong> Break / coffee – 15'</li>
                  <li><strong>4.</strong> Talk tecnico #2 – 30'</li>
                  <li><strong>5.</strong> Q&A + networking – 30'</li>
                </ol>
              </div>
              
              <div className="bg-gray-700 p-6 rounded-lg">
                <h3 className="text-lg font-semibold text-white mb-4">Online (60-75')</h3>
                <p className="text-sm text-gray-400 mb-3">Piattaforme: Teams/Zoom</p>
                <div className="text-gray-300 text-sm space-y-2">
                  <p>• Sessioni virtuali per raggiungere un pubblico più ampio</p>
                  <p>• Focus su tematiche specifiche e approfondimenti</p>
                  <p>• <strong className="text-green-200">Registrazione:</strong> disponibile per gli eventi online</p>
                </div>
              </div>
            </div>
          </section>

          {/* Cosa portiamo noi */}
          <section className="bg-gray-800 p-8 rounded-xl border border-gray-700">
            <h2 className="text-2xl font-semibold text-blue-400 mb-6 flex items-center gap-3">
              <Target className="w-6 h-6" />
              Cosa portiamo noi (organizzatori)
            </h2>
            <div className="grid md:grid-cols-2 gap-4">
              <ul className="space-y-2 text-gray-300">
                <li className="flex items-start gap-2">
                  <CheckCircle className="w-4 h-4 text-green-400 mt-1 flex-shrink-0" />
                  <span><strong className="text-white">Curatela contenuti:</strong> selezione talk, coaching speaker, agenda</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="w-4 h-4 text-green-400 mt-1 flex-shrink-0" />
                  <span><strong className="text-white">Onboarding speaker:</strong> abstract review, dry-run, checklist</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="w-4 h-4 text-green-400 mt-1 flex-shrink-0" />
                  <span><strong className="text-white">Promozione:</strong> pagina Meetup, post social, reminder</span>
                </li>
              </ul>
              <ul className="space-y-2 text-gray-300">
                <li className="flex items-start gap-2">
                  <CheckCircle className="w-4 h-4 text-green-400 mt-1 flex-shrink-0" />
                  <span><strong className="text-white">Gestione evento:</strong> MC/moderazione, tempi, Q&A, foto</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="w-4 h-4 text-green-400 mt-1 flex-shrink-0" />
                  <span><strong className="text-white">Trasparenza:</strong> post-evento con ringraziamenti, foto e form feedback</span>
                </li>
              </ul>
            </div>
          </section>

          {/* Metriche & Trasparenza */}
          <section className="bg-gray-800 p-8 rounded-xl border border-gray-700">
            <h2 className="text-2xl font-semibold text-blue-400 mb-6 flex items-center gap-3">
              <TrendingUp className="w-6 h-6" />
              Misurazione & Reportistica
            </h2>
            
            <div className="bg-blue-900/20 border border-blue-600 rounded-lg p-4 mb-6">
              <p className="text-blue-200">
                Dopo ogni evento condividiamo un <strong className="text-white">Event Recap</strong> con:
              </p>
            </div>
            
            <div className="grid md:grid-cols-2 gap-6">
              <ul className="space-y-2 text-gray-300">
                <li>• Iscritti su Meetup.com e <strong className="text-white">check-in</strong> partecipanti</li>
                <li>• Sintesi feedback (punteggi medi e commenti anonimi)</li>
                <li>• Job title/anzianità <strong className="text-white">auto-dichiarati</strong> (quando disponibili)</li>
              </ul>
              <ul className="space-y-2 text-gray-300">
                <li>• Reach social (impression/engagement) e link ai post</li>
                <li>• Foto selezionate (con consenso) e <strong className="text-white">menzione partner</strong></li>
                <li>• Report dettagliato per sponsor premium</li>
              </ul>
            </div>
          </section>

          {/* Partnership */}
          <section className="bg-gray-800 p-8 rounded-xl border border-gray-700">
            <h2 className="text-2xl font-semibold text-blue-400 mb-6 flex items-center gap-3">
              <Handshake className="w-6 h-6" />
              Partnership
            </h2>
            <div className="bg-yellow-900/20 border border-yellow-600 rounded-lg p-4 mb-6">
              <p className="text-yellow-200 font-medium">
                Nessun pagamento verso il meetup. Le aziende contribuiscono con beni/servizi a supporto degli eventi.
              </p>
            </div>

            <div className="space-y-6">
              {/* Sponsorizzazione Tecnica Improove */}
              <div className="bg-gradient-to-r from-purple-900/20 to-blue-900/20 border border-purple-600/50 p-6 rounded-lg mb-6">
                <h3 className="text-xl font-semibold text-white mb-4 flex items-center gap-2">
                  🚀 Partnership Tecnica con Improove
                </h3>
                <p className="text-gray-300 mb-3">
                  Collaboriamo con <strong className="text-purple-300">Improove</strong> (<a href="https://improove.tech" target="_blank" rel="noopener noreferrer" className="text-purple-400 hover:text-purple-300 underline">improove.tech</a>), piattaforma per la formazione continua aziendale.
                </p>
                <div className="bg-purple-900/10 border border-purple-700/30 rounded-lg p-4">
                  <h4 className="font-semibold text-white mb-2">Per le aziende host:</h4>
                  <p className="text-gray-300">
                    Bundle gratuiti di accesso alla piattaforma da usare in training interni (quantità e dettagli concordati per evento).
                  </p>
                </div>
              </div>

              {/* Host Partner */}
              <div className="bg-gray-700 p-6 rounded-lg">
                <h3 className="text-xl font-semibold text-white mb-4 flex items-center gap-2">
                  <Building2 className="w-5 h-5 text-blue-400" />
                  Host Partner
                </h3>
                <p className="text-gray-300 mb-4">
                  Aziende o enti che mettono a disposizione spazi, logistica e servizi di base
                </p>

                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <h4 className="font-semibold text-white mb-2">Cosa offre:</h4>
                    <ul className="text-gray-300 space-y-1 text-sm">
                      <li>• Location (sala, sedie, Wi-Fi)</li>
                      <li>• AV: proiettore/TV 1080p/4K, HDMI/USB-C, audio/microfoni</li>
                      <li>• Supporto logistico (accessi, badge/registrazione)</li>
                      <li>• <strong>Catering:</strong> acqua + coffee break/aperitivo (base)</li>
                    </ul>
                  </div>

                  <div>
                    <h4 className="font-semibold text-white mb-2">Cosa ottiene:</h4>
                    <ul className="text-gray-300 space-y-1 text-sm">
                      <li>• Logo su pagina meetup e <strong>slide</strong> dell'evento</li>
                      <li>• <strong>Ringraziamento live</strong> + 3-5' apertura istituzionale</li>
                      <li>• Recruiting corner / desk informativo</li>
                      <li>• Recap con <strong>menzione dedicata</strong> e link</li>
                    </ul>
                  </div>
                </div>
                
                <div className="mt-4 bg-gray-600 rounded-lg p-3">
                  <p className="text-xs text-gray-300">
                    <strong className="text-white">Requisiti minimi:</strong> Wi-Fi stabile (≥ 50/10 Mbps) • prese elettriche • accesso disabili • assistenza IT di sala
                  </p>
                </div>
              </div>

              {/* Sponsor Partner */}
              <div className="bg-gray-700 p-6 rounded-lg border-2 border-green-600/30">
                <h3 className="text-xl font-semibold text-white mb-4 flex items-center gap-2">
                  <Gift className="w-5 h-5 text-green-400" />
                  Sponsor Partner
                </h3>
                <p className="text-gray-300 mb-4">
                  Include <strong className="text-green-300">tutti i benefit dell'Host Partner</strong> + visibilità ampliata e servizi premium
                </p>

                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <h4 className="font-semibold text-white mb-2">Servizi premium (a scelta):</h4>
                    <ul className="text-gray-300 space-y-1 text-sm">
                      <li>• Catering <strong>premium</strong> / coffee esteso</li>
                      <li>• <strong>Gadget</strong> personalizzati per i partecipanti</li>
                      <li>• <strong>Speaker tecnico o demo</strong> (co-curata con la community)</li>
                      <li>• Facilities extra (segnaletica, registrazione ingressi, foto/video)</li>
                    </ul>
                  </div>

                  <div>
                    <h4 className="font-semibold text-white mb-2">Benefit esclusivi:</h4>
                    <ul className="text-gray-300 space-y-1 text-sm">
                      <li>• Una delle <strong>due sessioni</strong> riservata (talk tecnico o caso d'uso)</li>
                      <li>• Slot promozionale <strong>esteso (5-10')</strong></li>
                      <li>• Priorità su materiali e shout-out social</li>
                      <li>• Interazione diretta con candidature/speaker</li>
                    </ul>
                  </div>
                </div>
                
                <div className="mt-4 bg-green-900/20 border border-green-600/30 rounded-lg p-3">
                  <p className="text-xs text-green-200">
                    <strong>Focus Azure, zero sales pitch:</strong> i contenuti sono tecnici, indipendenti e curati per garantire qualità e imparzialità.
                  </p>
                </div>
              </div>
            </div>
          </section>

          {/* Checklist per ospitare un evento */}
          <section className="bg-gray-800 p-8 rounded-xl border border-gray-700">
            <h2 className="text-2xl font-semibold text-blue-400 mb-6 flex items-center gap-3">
              <ClipboardList className="w-6 h-6" />
              Checklist per ospitare un evento
            </h2>
            
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <h3 className="text-lg font-semibold text-white mb-4">📅 Tempistiche</h3>
                <ul className="space-y-2 text-gray-300 text-sm">
                  <li><strong className="text-yellow-200">T-8 settimane:</strong> conferma data/sede, capienza e AV</li>
                  <li><strong className="text-yellow-200">T-4 settimane:</strong> pubblicazione pagina Meetup e inizio promo social + locandina</li>
                  <li><strong className="text-yellow-200">T-2 e T-1 settimana:</strong> reminder</li>
                  <li><strong className="text-yellow-200">T+1 giorno:</strong> recap e reportistica</li>
                </ul>
              </div>
              
              <div>
                <h3 className="text-lg font-semibold text-white mb-4">🛠️ Setup tecnico</h3>
                <ul className="space-y-2 text-gray-300 text-sm">
                  <li>• Schermo + cavi HDMI/USB-C; eventuale adattatore</li>
                  <li>• Audio/microfoni; clicker; tavolo per demo</li>
                  <li>• Guest Wi-Fi o rete dedicata; credenziali su slide</li>
                </ul>
                
                <h3 className="text-lg font-semibold text-white mb-2 mt-4">♿ Accessibilità & sicurezza</h3>
                <ul className="space-y-2 text-gray-300 text-sm">
                  <li>• Indicazioni ingresso; accesso disabili; policy foto</li>
                </ul>
              </div>
            </div>
          </section>

          {/* Codice di condotta */}
          <section className="bg-gray-800 p-8 rounded-xl border border-gray-700">
            <h2 className="text-2xl font-semibold text-blue-400 mb-6 flex items-center gap-3">
              <Shield className="w-6 h-6" />
              Codice di condotta (estratto)
            </h2>
            <div className="text-gray-300 space-y-4">
              <p>
                Siamo una community <strong className="text-white">inclusiva e rispettosa</strong>. 
                Zero tolleranza per comportamenti molesti o discriminatori.
              </p>
              <p>
                Gli speaker evitano contenuti offensivi o pitch puramente commerciali. 
              </p>
              <p>
                <strong className="text-yellow-200">Segnalazioni:</strong> direttamente agli organizzatori in loco o via DM sui canali ufficiali.
              </p>
            </div>
          </section>

          {/* FAQ */}
          <section className="bg-gray-800 p-8 rounded-xl border border-gray-700">
            <h2 className="text-2xl font-semibold text-blue-400 mb-6 flex items-center gap-3">
              <HelpCircle className="w-6 h-6" />
              FAQ
            </h2>
            <div className="space-y-4">
              <div>
                <p className="font-semibold text-white mb-1">Gli eventi sono gratuiti?</p>
                <p className="text-gray-300">Sì, tutti gli eventi sono completamente gratuiti.</p>
              </div>
              
              <div>
                <p className="font-semibold text-white mb-1">Registrate gli eventi?</p>
                <p className="text-gray-300">In presenza no; online sì, le registrazioni sono disponibili.</p>
              </div>
              
              <div>
                <p className="font-semibold text-white mb-1">Possiamo fare recruiting?</p>
                <p className="text-gray-300">Sì: desk dedicato se predisposto e concordato, job board nei post-evento.</p>
              </div>
              
              <div>
                <p className="font-semibold text-white mb-1">Chi seleziona gli speaker?</p>
                <p className="text-gray-300">Program committee; Call for Speakers sempre aperta.</p>
              </div>
              
              <div>
                <p className="font-semibold text-white mb-1">Come vi contattiamo?</p>
                <p className="text-gray-300">Via LinkedIn (Azure Meetup Puglia) o pagina Meetup dell'evento.</p>
              </div>
            </div>
          </section>

          {/* Call to Action */}
          <section className="bg-gradient-to-r from-blue-900/30 to-purple-900/30 border border-blue-600 rounded-xl p-8">
            <h2 className="text-2xl font-semibold text-blue-400 mb-6 text-center">
              Call to Action
            </h2>
            <div className="grid md:grid-cols-3 gap-6 text-center">
              <div className="bg-gray-800/50 p-4 rounded-lg">
                <h3 className="font-semibold text-white mb-2">🏢 Ospita un meetup</h3>
                <p className="text-gray-300 text-sm">Proponi una data e capienza</p>
              </div>
              <div className="bg-gray-800/50 p-4 rounded-lg">
                <h3 className="font-semibold text-white mb-2">💎 Diventa sponsor</h3>
                <p className="text-gray-300 text-sm">Scegli tra Host o Sponsor Partner</p>
              </div>
              <div className="bg-gray-800/50 p-4 rounded-lg">
                <h3 className="font-semibold text-white mb-2">🎤 Proponi un talk</h3>
                <p className="text-gray-300 text-sm">Abstract, titolo, livello e demo</p>
              </div>
            </div>
            
            <p className="text-center mt-6 text-gray-300">
              Ti va di collaborare? Scrivici su LinkedIn o tramite la pagina del prossimo evento su <strong className="text-white">Meetup.com</strong>.
            </p>
          </section>

          {/* Nota finale */}
          <section className="bg-blue-900/20 border border-blue-600 rounded-xl p-8 text-center">
            <h2 className="text-2xl font-semibold text-blue-400 mb-4">
              Nota finale
            </h2>
            <div className="space-y-3 text-gray-300">
              <p>
                <strong className="text-white">Azure Meetup Puglia</strong> è un progetto 100% volontario, sostenibile e orientato al valore reale per la community.
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