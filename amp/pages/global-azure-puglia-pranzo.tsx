import type { NextPage } from 'next';
import Head from 'next/head';
import Link from 'next/link';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import useWeb3Forms from '@web3forms/react';
import { ArrowLeft, Utensils, CheckCircle, AlertCircle, Clock } from 'lucide-react';

interface LunchFormData {
  full_name: string;
  email: string;
  lunch_attendance: string;
  dietary_notes?: string;
  privacyAccepted: boolean;
}

const GlobalAzurePugliaPranzo: NextPage = () => {
  const siteUrl = 'https://azure-meetup-puglia.github.io/';

  const [isSuccess, setIsSuccess] = useState(false);
  const [result, setResult] = useState<string>('');

  const { register, reset, handleSubmit, formState: { errors } } = useForm<LunchFormData>();

  const { submit: onSubmit } = useWeb3Forms({
    access_key: 'b6b08bc9-f2a1-4795-b970-b0b392f1a9c1',
    settings: {
      from_name: 'Azure Meetup Puglia - Conferma Pranzo',
      subject: 'Conferma Pranzo Global Azure Puglia 2026'
    },
    onSuccess: () => {
      setIsSuccess(true);
      setResult('Conferma registrata! Grazie, ci vediamo il 17 aprile.');
      reset();
      window.scrollTo({ top: 0, behavior: 'smooth' });
    },
    onError: (msg) => {
      setIsSuccess(false);
      setResult('Errore nell\'invio. Riprova più tardi.');
      console.error('Web3Forms error:', msg);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  });

  const handleFormSubmit = (data: LunchFormData) => {
    if (!data.privacyAccepted) {
      setResult('Devi accettare la privacy policy per procedere.');
      setIsSuccess(false);
      return;
    }

    const formattedData = {
      ...data,
      '_replyto': data.email,
      'Evento': 'Global Azure Puglia 2026 - 17 Aprile',
      'Pranzo': data.lunch_attendance === 'yes' ? 'Sì, parteciperò' : 'No, mi autogestisco'
    };

    onSubmit(formattedData);
  };

  return (
    <div className="min-h-screen bg-gray-900 text-gray-200 font-sans">
      <Head>
        <title>Conferma Pranzo | Global Azure Puglia 2026</title>
        <meta name="description" content="Conferma la tua partecipazione al pranzo del Global Azure Puglia 2026 per aiutarci a organizzare al meglio il catering." />
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
              Conferma Pranzo
            </h1>
            <p className="text-xl text-blue-300 max-w-2xl mx-auto mb-3">
              Global Azure Puglia 2026 &middot; Venerdì 17 Aprile
            </p>
            <p className="text-sm text-gray-400 max-w-xl mx-auto">
              Ci bastano 30 secondi per aiutarci a organizzare al meglio.
            </p>
          </header>

          {/* Status Messages */}
          {result && isSuccess && (
            <div className="mb-8 p-6 bg-gradient-to-r from-green-900/70 to-green-800/70 border-2 border-green-400 rounded-xl shadow-lg">
              <div className="flex flex-col items-center text-center gap-4">
                <div className="bg-green-500 rounded-full p-4">
                  <CheckCircle className="w-12 h-12 text-white" />
                </div>
                <div>
                  <h3 className="text-2xl font-bold text-green-100 mb-2">Conferma ricevuta!</h3>
                  <p className="text-green-200 text-lg">{result}</p>
                </div>
              </div>
            </div>
          )}

          {result && !isSuccess && (
            <div className="mb-8 p-4 bg-red-900/50 border border-red-500 rounded-lg flex items-center gap-3">
              <AlertCircle className="w-5 h-5 text-red-400 flex-shrink-0" />
              <div>
                <h3 className="font-semibold text-red-300">Errore nell'invio</h3>
                <p className="text-red-200 text-sm">{result}</p>
              </div>
            </div>
          )}

          {/* Info Box */}
          <div className="mb-8 bg-gradient-to-r from-blue-900/40 to-purple-900/40 border border-blue-500/50 rounded-lg p-6">
            <h3 className="text-lg font-semibold text-white mb-3 flex items-center gap-2">
              <Clock className="w-5 h-5 text-yellow-400" />
              Perché ti chiediamo di confermare
            </h3>
            <div className="space-y-2 text-gray-300 text-sm leading-relaxed">
              <p>
                Il pranzo è offerto, a <strong className="text-white">menu fisso</strong>, con posti limitati.
                Per non sprecare pasti e garantire la giusta quantità al catering ci serve sapere chi sarà presente.
              </p>
              <p>
                <strong className="text-white">Ti chiediamo di confermare entro mercoledì 15 aprile.</strong> In
                assenza di conferma entro quella data il pranzo non potrà essere garantito.
              </p>
              <p className="text-gray-400">
                Se hai intolleranze o esigenze alimentari incompatibili con un menu fisso,
                segnalacele: potrai comunque partecipare all'evento autogestendoti il pasto.
              </p>
            </div>
          </div>

          {/* Form */}
          <div className="bg-gray-800 rounded-xl shadow-lg border border-gray-700 p-6 md:p-8">
            <form onSubmit={handleSubmit(handleFormSubmit)} className="space-y-8">

              {/* Nome e Cognome */}
              <div>
                <label htmlFor="full_name" className="block text-sm font-medium text-gray-300 mb-2">
                  Nome e Cognome *
                </label>
                <input
                  type="text"
                  id="full_name"
                  {...register('full_name', { required: 'Nome e cognome sono obbligatori' })}
                  className="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="Mario Rossi"
                />
                {errors.full_name && (
                  <p className="text-red-400 text-sm mt-1">{errors.full_name.message}</p>
                )}
              </div>

              {/* Email */}
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-300 mb-2">
                  Email *
                </label>
                <input
                  type="email"
                  id="email"
                  {...register('email', {
                    required: 'Email è obbligatoria',
                    pattern: {
                      value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                      message: 'Email non valida'
                    }
                  })}
                  className="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="Preferibilmente la stessa usata per il biglietto"
                />
                {errors.email && (
                  <p className="text-red-400 text-sm mt-1">{errors.email.message}</p>
                )}
              </div>

              {/* Lunch Attendance */}
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-3">
                  Parteciperai al pranzo? *
                </label>
                <div className="space-y-2">
                  <label className="flex items-center gap-3 cursor-pointer bg-gray-700/30 p-3 rounded-lg hover:bg-gray-700/50 transition-colors">
                    <input
                      type="radio"
                      value="yes"
                      {...register('lunch_attendance', { required: 'Seleziona un\'opzione' })}
                      className="w-4 h-4 text-blue-600 bg-gray-700 border-gray-600"
                    />
                    <span className="text-sm text-gray-300">Sì, parteciperò al pranzo</span>
                  </label>
                  <label className="flex items-center gap-3 cursor-pointer bg-gray-700/30 p-3 rounded-lg hover:bg-gray-700/50 transition-colors">
                    <input
                      type="radio"
                      value="no"
                      {...register('lunch_attendance', { required: 'Seleziona un\'opzione' })}
                      className="w-4 h-4 text-blue-600 bg-gray-700 border-gray-600"
                    />
                    <span className="text-sm text-gray-300">No, mi autogestisco</span>
                  </label>
                </div>
                {errors.lunch_attendance && (
                  <p className="text-red-400 text-sm mt-2">{errors.lunch_attendance.message}</p>
                )}
              </div>

              {/* Dietary Notes */}
              <div>
                <label htmlFor="dietary_notes" className="block text-sm font-medium text-gray-300 mb-2">
                  Intolleranze o esigenze alimentari <span className="text-gray-500 font-normal">(opzionale)</span>
                </label>
                <textarea
                  id="dietary_notes"
                  rows={3}
                  {...register('dietary_notes')}
                  className="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="es. celiaco, vegetariano, allergia alla frutta a guscio..."
                />
                <p className="text-xs text-gray-400 mt-2">
                  Faremo del nostro meglio per segnalarlo al catering; il menu è fisso, quindi potrebbe
                  non essere possibile garantire un'alternativa.
                </p>
              </div>

              {/* Privacy */}
              <div className="pt-2">
                <div className="bg-gray-700/50 rounded-lg p-4 mb-4">
                  <h4 className="text-sm font-semibold text-white mb-2">Informativa Privacy</h4>
                  <p className="text-xs text-gray-300 leading-relaxed">
                    I dati raccolti saranno usati solo per organizzare il catering dell'evento e non saranno
                    ceduti a terzi. Puoi chiedere la cancellazione scrivendo a{' '}
                    <a href="mailto:azuremeetuppuglia@gmail.com" className="text-blue-400 hover:text-blue-300">
                      azuremeetuppuglia@gmail.com
                    </a>.
                  </p>
                </div>

                <div className="flex items-start gap-3">
                  <input
                    type="checkbox"
                    id="privacyAccepted"
                    {...register('privacyAccepted', { required: 'Devi accettare la privacy policy' })}
                    className="mt-1 w-4 h-4 text-blue-600 bg-gray-700 border-gray-600 rounded focus:ring-blue-500"
                  />
                  <label htmlFor="privacyAccepted" className="text-sm text-gray-300">
                    Ho letto e acconsento al trattamento dei miei dati personali *
                  </label>
                </div>
                {errors.privacyAccepted && (
                  <p className="text-red-400 text-sm mt-2">{errors.privacyAccepted.message}</p>
                )}
              </div>

              {/* Submit */}
              <div className="pt-4">
                <button
                  type="submit"
                  className="w-full bg-blue-600 hover:bg-blue-700 disabled:bg-gray-600 disabled:cursor-not-allowed text-white font-semibold py-3 px-6 rounded-lg transition-colors focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:ring-offset-gray-800"
                >
                  Conferma
                </button>
              </div>
            </form>
          </div>

          {/* Thank You Note */}
          <div className="mt-10 bg-gradient-to-r from-blue-900/40 to-purple-900/40 border border-blue-500/50 rounded-lg p-6 text-center">
            <h3 className="text-lg font-semibold text-white mb-2">Grazie!</h3>
            <p className="text-gray-300 text-sm">
              Ci aiuti a organizzare un evento migliore, senza sprechi. Ci vediamo il 17 aprile!
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default GlobalAzurePugliaPranzo;
