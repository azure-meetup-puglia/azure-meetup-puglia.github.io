import type { NextPage } from 'next';
import Head from 'next/head';
import Link from 'next/link';
import { ArrowLeft, Utensils, CheckCircle, Heart, Mail } from 'lucide-react';

const GlobalAzurePugliaPranzo: NextPage = () => {
  const siteUrl = 'https://azure-meetup-puglia.github.io/';

  return (
    <div className="min-h-screen bg-gray-900 text-gray-200 font-sans">
      <Head>
        <title>Conferma Pranzo | Global Azure Puglia 2026</title>
        <meta name="description" content="Le conferme per il pranzo del Global Azure Puglia 2026 sono chiuse. Grazie a tutta la community!" />
        <meta name="robots" content="noindex, nofollow" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <link rel="canonical" href={`${siteUrl}global-azure-puglia-pranzo`} />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <div className="p-4 md:p-8">
        <div className="max-w-2xl mx-auto">
          {/* Navigation */}
          <nav className="mb-8" aria-label="Breadcrumb">
            <Link
              href="/global-azure-puglia"
              className="inline-flex items-center gap-2 text-blue-400 hover:text-blue-300 transition-colors"
            >
              <ArrowLeft className="w-4 h-4" />
              Torna alla pagina evento
            </Link>
            <div className="mt-2 text-sm text-gray-400">
              <span>Home</span>
              <span className="mx-2">/</span>
              <span>Global Azure Puglia 2026</span>
              <span className="mx-2">/</span>
              <span className="text-blue-300">Conferma Pranzo</span>
            </div>
          </nav>

          {/* Header */}
          <header className="text-center mb-10">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-blue-400 to-purple-600 rounded-full mb-6">
              <Utensils className="w-8 h-8 text-white" />
            </div>
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
              Conferme Pranzo Chiuse
            </h1>
            <p className="text-xl text-blue-300 max-w-2xl mx-auto">
              Global Azure Puglia 2026 &middot; Venerdì 17 Aprile
            </p>
          </header>

          {/* Closed Status Card */}
          <div className="mb-8 p-8 bg-gradient-to-r from-green-900/60 to-green-800/60 border-2 border-green-500/60 rounded-xl shadow-lg">
            <div className="flex flex-col items-center text-center gap-4">
              <div className="bg-green-500 rounded-full p-4">
                <CheckCircle className="w-12 h-12 text-white" />
              </div>
              <div>
                <h2 className="text-2xl font-bold text-green-100 mb-3">Grazie a tutti!</h2>
                <p className="text-green-100 text-base leading-relaxed">
                  Le conferme per il pranzo sono ufficialmente <strong className="text-white">chiuse</strong>.
                  Abbiamo raccolto tutte le informazioni che ci servono per organizzare al meglio il catering.
                </p>
              </div>
            </div>
          </div>

          {/* Community Thank You */}
          <div className="mb-8 bg-gradient-to-r from-blue-900/40 to-purple-900/40 border border-blue-500/50 rounded-lg p-6">
            <h3 className="text-lg font-semibold text-white mb-3 flex items-center gap-2">
              <Heart className="w-5 h-5 text-pink-400" />
              Un grazie alla community
            </h3>
            <div className="space-y-3 text-gray-300 text-sm leading-relaxed">
              <p>
                Un ringraziamento sincero a chi ha dedicato un minuto per compilare il form: ci avete
                permesso di dimensionare correttamente il pranzo, evitare sprechi e rispettare chi ci
                offre il catering.
              </p>
              <p>
                È anche grazie a gesti piccoli come questo che Azure Meetup Puglia riesce a crescere
                come community — fatta di persone che partecipano, contribuiscono e si prendono cura
                gli uni degli altri.
              </p>
              <p className="text-white">
                Ci vediamo venerdì 17 aprile!
              </p>
            </div>
          </div>

          {/* Info Box: cosa fare se hai dimenticato */}
          <div className="mb-8 bg-gray-800 border border-gray-700 rounded-lg p-6">
            <h3 className="text-lg font-semibold text-white mb-3 flex items-center gap-2">
              <Mail className="w-5 h-5 text-blue-400" />
              Non hai fatto in tempo a confermare?
            </h3>
            <p className="text-gray-300 text-sm leading-relaxed">
              Nessun problema: sei il benvenuto all'evento in ogni caso. Il pranzo però non potrà
              essere garantito — ti suggeriamo di organizzarti autonomamente. Se hai dubbi o esigenze
              particolari, scrivici a{' '}
              <a
                href="mailto:azuremeetuppuglia@gmail.com"
                className="text-blue-400 hover:text-blue-300 underline"
              >
                azuremeetuppuglia@gmail.com
              </a>{' '}
              e faremo il possibile per aiutarti.
            </p>
          </div>

          {/* CTA back to event */}
          <div className="text-center">
            <Link
              href="/global-azure-puglia"
              className="inline-flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-6 rounded-lg transition-colors focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:ring-offset-gray-900"
            >
              <ArrowLeft className="w-4 h-4" />
              Torna alla pagina dell'evento
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default GlobalAzurePugliaPranzo;
