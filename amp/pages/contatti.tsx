import type { NextPage } from 'next';
import Head from 'next/head';
import Link from 'next/link';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import useWeb3Forms from '@web3forms/react';
import { ArrowLeft, Mail, CheckCircle, AlertCircle } from 'lucide-react';

interface ContactFormData {
  nome: string;
  cognome: string;
  email: string;
  telefono?: string;
  tipo_richiesta: string;
  messaggio: string;
  privacyAccepted: boolean;
}

const Contatti: NextPage = () => {
  const siteUrl = "https://azure-meetup-puglia.github.io/";

  const [isSuccess, setIsSuccess] = useState(false);
  const [result, setResult] = useState<string>('');

  const { register, reset, handleSubmit, formState: { errors } } = useForm<ContactFormData>();

  const { submit: onSubmit } = useWeb3Forms({
    access_key: 'b6b08bc9-f2a1-4795-b970-b0b392f1a9c1',
    settings: {
      from_name: 'Azure Meetup Puglia - Contatti',
      subject: 'Nuova richiesta di contatto'
    },
    onSuccess: () => {
      setIsSuccess(true);
      setResult('Messaggio inviato con successo! Ti risponderemo il prima possibile.');
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

  const handleFormSubmit = (data: ContactFormData) => {
    if (!data.privacyAccepted) {
      setResult('Devi accettare la privacy policy per procedere.');
      setIsSuccess(false);
      return;
    }

    const formattedData = {
      ...data,
      '_replyto': data.email,
      'Nome_Completo': `${data.nome} ${data.cognome}`,
    };

    onSubmit(formattedData);
  };

  const tipiRichiesta = [
    { value: '', label: 'Seleziona il tipo di richiesta' },
    { value: 'richiesta_generica', label: 'Richiesta Generica' },
    { value: 'prova_improove_play', label: 'Richiesta Piano Prova Improove Play (1 Mese)' },
    { value: 'proposta_collaborazione', label: 'Proposta di Collaborazione' },
    { value: 'proposta_ospitalita', label: 'Proposta Ospitalità Meetup' }
  ];

  return (
    <div className="min-h-screen bg-gray-900 text-gray-200 font-sans">
      <Head>
        <title>Contatti | Azure Meetup Puglia</title>
        <meta name="description" content="Contattaci per informazioni, proposte di collaborazione o per ospitare un meetup Azure in Puglia." />
        <meta name="robots" content="index, follow" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <link rel="canonical" href={`${siteUrl}contatti`} />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <div className="p-4 md:p-8">
        <div className="max-w-2xl mx-auto">
          {/* Navigation */}
          <nav className="mb-8" aria-label="Breadcrumb">
            <Link
              href="/"
              className="inline-flex items-center gap-2 text-blue-400 hover:text-blue-300 transition-colors"
            >
              <ArrowLeft className="w-4 h-4" />
              Torna alla Home
            </Link>
            <div className="mt-2 text-sm text-gray-400">
              <span>Home</span>
              <span className="mx-2">/</span>
              <span className="text-blue-300">Contatti</span>
            </div>
          </nav>

          {/* Header */}
          <header className="text-center mb-12">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-blue-400 to-purple-600 rounded-full mb-6">
              <Mail className="w-8 h-8 text-white" />
            </div>
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
              Contattaci
            </h1>
            <p className="text-xl text-blue-300 max-w-2xl mx-auto">
              Hai domande, proposte o vuoi collaborare con noi? Compila il form e ti risponderemo al più presto.
            </p>
          </header>

          {/* Status Messages */}
          {result && isSuccess && (
            <div className="mb-8 p-6 bg-gradient-to-r from-green-900/70 to-green-800/70 border-2 border-green-400 rounded-xl shadow-lg animate-in fade-in duration-500">
              <div className="flex flex-col items-center text-center gap-4">
                <div className="bg-green-500 rounded-full p-4">
                  <CheckCircle className="w-12 h-12 text-white" />
                </div>
                <div>
                  <h3 className="text-2xl font-bold text-green-100 mb-2">Grazie!</h3>
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

          {/* Form */}
          <div className="bg-gray-800 rounded-xl shadow-lg border border-gray-700 p-6 md:p-8">
            <form onSubmit={handleSubmit(handleFormSubmit)} className="space-y-6">

              {/* Nome e Cognome */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label htmlFor="nome" className="block text-sm font-medium text-gray-300 mb-2">
                    Nome *
                  </label>
                  <input
                    type="text"
                    id="nome"
                    {...register('nome', { required: 'Il nome è obbligatorio' })}
                    className="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="Il tuo nome"
                  />
                  {errors.nome && (
                    <p className="text-red-400 text-sm mt-1">{errors.nome.message}</p>
                  )}
                </div>

                <div>
                  <label htmlFor="cognome" className="block text-sm font-medium text-gray-300 mb-2">
                    Cognome *
                  </label>
                  <input
                    type="text"
                    id="cognome"
                    {...register('cognome', { required: 'Il cognome è obbligatorio' })}
                    className="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="Il tuo cognome"
                  />
                  {errors.cognome && (
                    <p className="text-red-400 text-sm mt-1">{errors.cognome.message}</p>
                  )}
                </div>
              </div>

              {/* Email e Telefono */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-gray-300 mb-2">
                    Email *
                  </label>
                  <input
                    type="email"
                    id="email"
                    {...register('email', {
                      required: 'L\'email è obbligatoria',
                      pattern: {
                        value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                        message: 'Email non valida'
                      }
                    })}
                    className="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="La tua email"
                  />
                  {errors.email && (
                    <p className="text-red-400 text-sm mt-1">{errors.email.message}</p>
                  )}
                </div>

                <div>
                  <label htmlFor="telefono" className="block text-sm font-medium text-gray-300 mb-2">
                    Telefono
                  </label>
                  <input
                    type="tel"
                    id="telefono"
                    {...register('telefono')}
                    className="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="Il tuo numero di telefono"
                  />
                </div>
              </div>

              {/* Tipo Richiesta */}
              <div>
                <label htmlFor="tipo_richiesta" className="block text-sm font-medium text-gray-300 mb-2">
                  Tipo di Richiesta *
                </label>
                <select
                  id="tipo_richiesta"
                  {...register('tipo_richiesta', { required: 'Seleziona il tipo di richiesta' })}
                  className="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                >
                  {tipiRichiesta.map((tipo) => (
                    <option key={tipo.value} value={tipo.value}>
                      {tipo.label}
                    </option>
                  ))}
                </select>
                {errors.tipo_richiesta && (
                  <p className="text-red-400 text-sm mt-1">{errors.tipo_richiesta.message}</p>
                )}
              </div>

              {/* Messaggio */}
              <div>
                <label htmlFor="messaggio" className="block text-sm font-medium text-gray-300 mb-2">
                  Messaggio *
                </label>
                <textarea
                  id="messaggio"
                  rows={5}
                  {...register('messaggio', { required: 'Il messaggio è obbligatorio' })}
                  className="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="Scrivi il tuo messaggio..."
                />
                {errors.messaggio && (
                  <p className="text-red-400 text-sm mt-1">{errors.messaggio.message}</p>
                )}
              </div>

              {/* Privacy */}
              <div className="bg-gray-700/50 rounded-lg p-4">
                <h4 className="text-sm font-semibold text-white mb-2">Informativa Privacy</h4>
                <p className="text-xs text-gray-300 mb-4">
                  I dati sono usati solo per rispondere alla tua richiesta; non saranno ceduti a terzi.
                  Puoi chiedere la cancellazione scrivendo a <a href="mailto:azuremeetuppuglia@gmail.com" className="text-blue-400 hover:text-blue-300">azuremeetuppuglia@gmail.com</a>.
                </p>
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

              {/* Submit Button */}
              <div className="pt-4">
                <button
                  type="submit"
                  className="w-full bg-blue-600 hover:bg-blue-700 disabled:bg-gray-600 disabled:cursor-not-allowed text-white font-semibold py-3 px-6 rounded-lg transition-colors focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:ring-offset-gray-800"
                >
                  Invia Messaggio
                </button>
              </div>
            </form>
          </div>

          {/* Contact Info */}
          <div className="mt-12 bg-gradient-to-r from-blue-900/40 to-purple-900/40 border border-blue-500/50 rounded-lg p-6 text-center">
            <h3 className="text-lg font-semibold text-white mb-2">Contatto diretto</h3>
            <p className="text-gray-300 text-sm mb-3">
              Puoi anche scriverci direttamente via email:
            </p>
            <a
              href="mailto:azuremeetuppuglia@gmail.com"
              className="text-blue-400 hover:text-blue-300 font-medium"
            >
              azuremeetuppuglia@gmail.com
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contatti;
