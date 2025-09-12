import type { NextPage } from 'next';
import Head from 'next/head';
import Link from 'next/link';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import useWeb3Forms from '@web3forms/react';
import { ArrowLeft, Users, Calendar, FileText, Upload, AlertCircle, CheckCircle, MapPin, Clock } from 'lucide-react';

interface FormData {
  first_name: string;
  last_name: string;
  email: string;
  session_title: string;
  message: string;
  linkedin: string;
  github: string;
  phone: string;
  attachment?: FileList;
  privacyAccepted: boolean;
}

const CallForSpeakers: NextPage = () => {
  const siteUrl = "https://azure-meetup-puglia.github.io/";
  
  // Data di scadenza per la call for speakers
  const DEADLINE = new Date('2025-10-15T23:59:59');
  const isExpired = new Date() > DEADLINE;
  
  const [isSuccess, setIsSuccess] = useState(false);
  const [result, setResult] = useState<string>('');
  
  const { register, reset, handleSubmit, formState: { errors }, watch } = useForm<FormData>();
  
  const { submit: onSubmit } = useWeb3Forms({
    access_key: 'b6b08bc9-f2a1-4795-b970-b0b392f1a9c1',
    settings: {
      from_name: 'Azure Meetup Puglia Call for Speakers',
      subject: 'Nuova candidatura Call for Speakers'
    },
    onSuccess: () => {
      setIsSuccess(true);
      setResult('Candidatura inviata con successo! Ti contatteremo presto.');
      reset();
    },
    onError: (msg) => {
      setIsSuccess(false);
      setResult('Errore nell\'invio. Riprova più tardi.');
      console.error('Web3Forms error:', msg);
    }
  });
  
  // Watch per conteggio caratteri descrizione
  const messageValue = watch('message', '');
  
  const handleFormSubmit = (data: FormData) => {
    if (isExpired) return;
    if (!data.privacyAccepted) {
      setResult('Devi accettare la privacy policy per procedere.');
      setIsSuccess(false);
      return;
    }
    
    // File size validation
    if (data.attachment && data.attachment.length > 0) {
      const file = data.attachment[0];
      if (file.size > 1024 * 1024) {
        setResult('Il file deve essere inferiore a 1MB.');
        setIsSuccess(false);
        return;
      }
    }
    
    onSubmit(data);
  };


  const formatDeadline = (date: Date) => {
    return date.toLocaleDateString('it-IT', {
      day: 'numeric',
      month: 'long',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  return (
    <div className="min-h-screen bg-gray-900 text-gray-200 font-sans">
      <Head>
        <title>Call for Speakers | Azure Meetup Puglia</title>
        <meta name="description" content="Diventa speaker per Azure Meetup Puglia! Condividi le tue conoscenze su Microsoft Azure con la community pugliese." />
        <meta name="keywords" content="Call for Speakers, Azure Meetup Puglia, Microsoft Azure, Speaker, Presentazione, Community Tech" />
        <meta name="robots" content="index, follow" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        
        <link rel="canonical" href={`${siteUrl}call-for-speakers`} />
        
        <meta property="og:type" content="website" />
        <meta property="og:title" content="Call for Speakers | Azure Meetup Puglia" />
        <meta property="og:description" content="Diventa speaker per Azure Meetup Puglia! Condividi le tue conoscenze su Microsoft Azure con la community." />
        <meta property="og:url" content={`${siteUrl}call-for-speakers`} />
        
        <meta name="twitter:card" content="summary" />
        <meta name="twitter:title" content="Call for Speakers | Azure Meetup Puglia" />
        <meta name="twitter:description" content="Diventa speaker per Azure Meetup Puglia! Condividi le tue conoscenze su Microsoft Azure." />
      </Head>

      <div className="p-4 md:p-8">
        <div className="max-w-4xl mx-auto">
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
              <span className="text-blue-300">Call for Speakers</span>
            </div>
          </nav>

          {/* Header */}
          <header className="text-center mb-12">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-blue-400 to-blue-600 rounded-full mb-6">
              <Users className="w-8 h-8 text-white" />
            </div>
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
              Call for Speakers
            </h1>
            <p className="text-xl text-blue-300 max-w-2xl mx-auto">
              Condividi la tua esperienza con Microsoft Azure e ispira la community pugliese!
            </p>
          </header>

          {/* Status Messages */}
          {result && isSuccess && (
            <div className="mb-8 p-4 bg-green-900/50 border border-green-500 rounded-lg flex items-center gap-3">
              <CheckCircle className="w-5 h-5 text-green-400 flex-shrink-0" />
              <div>
                <h3 className="font-semibold text-green-300">Candidatura inviata con successo!</h3>
                <p className="text-green-200 text-sm">{result}</p>
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

          {/* Event Info */}
          <div className="mb-8 bg-gradient-to-r from-blue-900/40 to-purple-900/40 border border-blue-500/50 rounded-lg p-6">
            <h3 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
              <Calendar className="w-5 h-5 text-blue-400" />
              Kick Off Meeting - Azure Meetup Puglia
            </h3>
            <div className="grid md:grid-cols-2 gap-4 mb-4">
              <div className="flex items-center gap-3">
                <Calendar className="w-4 h-4 text-blue-400 flex-shrink-0" />
                <div>
                  <p className="text-sm text-gray-300">Data</p>
                  <p className="text-white font-medium">Lunedì 20 Ottobre 2025</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <Clock className="w-4 h-4 text-green-400 flex-shrink-0" />
                <div>
                  <p className="text-sm text-gray-300">Orario</p>
                  <p className="text-white font-medium">18:00 - 21:00</p>
                </div>
              </div>
              <div className="flex items-start gap-3 md:col-span-2">
                <MapPin className="w-4 h-4 text-red-400 flex-shrink-0 mt-1" />
                <div>
                  <p className="text-sm text-gray-300">Località</p>
                  <p className="text-white font-medium">BIP - Business Integration Partners</p>
                  <p className="text-gray-300 text-sm">Via Venezia 13, 70122 Bari</p>
                </div>
              </div>
            </div>
            <div className="border-t border-gray-600 pt-4">
              <div className="flex items-start gap-3">
                <AlertCircle className="w-4 h-4 text-yellow-400 flex-shrink-0 mt-0.5" />
                <div>
                  <p className="text-sm text-gray-300 mb-1">
                    <strong>Scadenza candidature:</strong> {formatDeadline(DEADLINE)}
                  </p>
                  {isExpired && (
                    <p className="text-red-300 text-sm font-semibold">
                      ⚠️ La call for speakers è chiusa
                    </p>
                  )}
                </div>
              </div>
            </div>
          </div>

          {/* Form */}
          <div className="bg-gray-800 rounded-xl shadow-lg border border-gray-700 p-8">
            <form onSubmit={handleSubmit(handleFormSubmit)} className="space-y-6">
              {/* Personal Info */}
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <label htmlFor="nome" className="block text-sm font-medium text-gray-300 mb-2">
                    Nome *
                  </label>
                  <input
                    type="text"
                    id="nome"
                    disabled={isExpired}
                    {...register('first_name', { required: 'Nome è obbligatorio' })}
                    className="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent disabled:opacity-50 disabled:cursor-not-allowed"
                  />
                  {errors.first_name && (
                    <p className="text-red-400 text-sm mt-1">{errors.first_name.message}</p>
                  )}
                </div>
                <div>
                  <label htmlFor="cognome" className="block text-sm font-medium text-gray-300 mb-2">
                    Cognome *
                  </label>
                  <input
                    type="text"
                    id="cognome"
                    disabled={isExpired}
                    {...register('last_name', { required: 'Cognome è obbligatorio' })}
                    className="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent disabled:opacity-50 disabled:cursor-not-allowed"
                  />
                  {errors.last_name && (
                    <p className="text-red-400 text-sm mt-1">{errors.last_name.message}</p>
                  )}
                </div>
              </div>

              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-300 mb-2">
                  Email *
                </label>
                <input
                  type="email"
                  id="email"
                  disabled={isExpired}
                  {...register('email', { 
                    required: 'Email è obbligatoria',
                    pattern: {
                      value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                      message: 'Email non valida'
                    }
                  })}
                  className="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent disabled:opacity-50 disabled:cursor-not-allowed"
                />
                {errors.email && (
                  <p className="text-red-400 text-sm mt-1">{errors.email.message}</p>
                )}
              </div>

              {/* Session Info */}
              <div className="border-t border-gray-600 pt-6">
                <h3 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
                  <FileText className="w-5 h-5" />
                  Informazioni sulla Sessione
                </h3>
                
                <div>
                  <label htmlFor="sessionTitle" className="block text-sm font-medium text-gray-300 mb-2">
                    Titolo della Sessione *
                  </label>
                  <input
                    type="text"
                    id="sessionTitle"
                    disabled={isExpired}
                    {...register('session_title', { required: 'Titolo sessione è obbligatorio' })}
                    className="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent disabled:opacity-50 disabled:cursor-not-allowed"
                    placeholder="es. Implementare CI/CD con Azure DevOps"
                  />
                  {errors.session_title && (
                    <p className="text-red-400 text-sm mt-1">{errors.session_title.message}</p>
                  )}
                </div>

                <div className="mt-4">
                  <label htmlFor="sessionDescription" className="block text-sm font-medium text-gray-300 mb-2">
                    Descrizione della Sessione * (max 2000 caratteri)
                  </label>
                  <textarea
                    id="sessionDescription"
                    disabled={isExpired}
                    rows={6}
                    {...register('message', { 
                      required: 'Descrizione è obbligatoria',
                      maxLength: {
                        value: 2000,
                        message: 'Massimo 2000 caratteri'
                      }
                    })}
                    className="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent disabled:opacity-50 disabled:cursor-not-allowed"
                    placeholder="Descrive di cosa parlerai, gli obiettivi della sessione e cosa impareranno i partecipanti..."
                  />
                  <div className="text-right text-sm text-gray-400 mt-1">
                    {messageValue?.length || 0}/2000 caratteri
                  </div>
                  {errors.message && (
                    <p className="text-red-400 text-sm mt-1">{errors.message.message}</p>
                  )}
                </div>

              </div>

              {/* Social Links */}
              <div className="border-t border-gray-600 pt-6">
                <h3 className="text-lg font-semibold text-white mb-4">Contatti e Social</h3>
                
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <label htmlFor="linkedinUrl" className="block text-sm font-medium text-gray-300 mb-2">
                      LinkedIn URL
                    </label>
                    <input
                      type="url"
                      id="linkedinUrl"
                      disabled={isExpired}
                      {...register('linkedin')}
                      className="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent disabled:opacity-50 disabled:cursor-not-allowed"
                      placeholder="https://linkedin.com/in/tuo-profilo"
                    />
                  </div>
                  <div>
                    <label htmlFor="githubUrl" className="block text-sm font-medium text-gray-300 mb-2">
                      GitHub URL
                    </label>
                    <input
                      type="url"
                      id="githubUrl"
                      disabled={isExpired}
                      {...register('github')}
                      className="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent disabled:opacity-50 disabled:cursor-not-allowed"
                      placeholder="https://github.com/tuo-username"
                    />
                  </div>
                </div>

                <div className="mt-4">
                  <label htmlFor="contatti" className="block text-sm font-medium text-gray-300 mb-2">
                    Altri Contatti
                  </label>
                  <input
                    type="text"
                    id="contatti"
                    disabled={isExpired}
                    {...register('phone')}
                    className="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent disabled:opacity-50 disabled:cursor-not-allowed"
                    placeholder="Twitter, sito web, altri social..."
                  />
                </div>
              </div>

              {/* File Upload */}
              <div className="border-t border-gray-600 pt-6">
                <h3 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
                  <Upload className="w-5 h-5" />
                  Materiale Opzionale
                </h3>
                
                <div>
                  <label htmlFor="file" className="block text-sm font-medium text-gray-300 mb-2">
                    Slide o Materiale (PDF o PowerPoint - max 1MB)
                  </label>
                  <input
                    type="file"
                    id="file"
                    accept=".pdf,.ppt,.pptx"
                    disabled={isExpired}
                    {...register('attachment')}
                    className="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-blue-600 file:text-white hover:file:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed"
                  />
                </div>
              </div>

              {/* Privacy Policy */}
              <div className="border-t border-gray-600 pt-6">
                <div className="bg-gray-700/50 rounded-lg p-4 mb-4">
                  <h4 className="text-sm font-semibold text-white mb-2">Privacy Policy - Gestione Dati Call for Speakers</h4>
                  <div className="text-xs text-gray-300 space-y-2 max-h-32 overflow-y-auto">
                    <p>I dati personali raccolti tramite questo form saranno utilizzati esclusivamente per:</p>
                    <ul className="list-disc list-inside space-y-1 ml-4">
                      <li>Valutare la candidatura come speaker per gli eventi Azure Meetup Puglia</li>
                      <li>Comunicare con i candidati riguardo la loro proposta</li>
                      <li>Organizzare gli eventi e coordinare le sessioni</li>
                      <li>Promuovere gli speaker e le loro sessioni sui canali ufficiali</li>
                    </ul>
                    <p>I dati non saranno condivisi con terze parti e saranno conservati solo per il tempo necessario alla valutazione e organizzazione degli eventi. È possibile richiedere la cancellazione dei propri dati in qualsiasi momento.</p>
                  </div>
                </div>
                
                <div className="flex items-start gap-3">
                  <input
                    type="checkbox"
                    id="privacyAccepted"
                    disabled={isExpired}
                    {...register('privacyAccepted', { required: 'Devi accettare la privacy policy' })}
                    className="mt-1 w-4 h-4 text-blue-600 bg-gray-700 border-gray-600 rounded focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed"
                  />
                  {errors.privacyAccepted && (
                    <p className="text-red-400 text-sm mt-2">{errors.privacyAccepted.message}</p>
                  )}
                  <label htmlFor="privacyAccepted" className="text-sm text-gray-300">
                    Accetto la privacy policy e autorizzo il trattamento dei miei dati personali per le finalità indicate *
                  </label>
                </div>
              </div>

              {/* Submit Button */}
              <div className="pt-6">
                <button
                  type="submit"
                  disabled={isExpired}
                  className="w-full bg-blue-600 hover:bg-blue-700 disabled:bg-gray-600 disabled:cursor-not-allowed text-white font-semibold py-3 px-6 rounded-lg transition-colors focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:ring-offset-gray-800"
                >
                  {isExpired ? 'Call for Speakers chiusa' : 'Invia Candidatura'}
                </button>
              </div>
            </form>
          </div>

          {/* Additional Info */}
          <div className="mt-12 bg-gray-800/50 rounded-lg p-6 border border-gray-700">
            <h3 className="text-lg font-semibold text-white mb-3">Cosa succede dopo?</h3>
            <div className="text-gray-300 space-y-2">
              <p>• Riceverai una conferma di ricezione della tua candidatura</p>
              <p>• Il team valuterà la tua proposta</p>
              <p>• Ti contatteremo entro 2 settimane per comunicarti l'esito</p>
              <p>• Se selezionato, organizzeremo insieme i dettagli della sessione</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CallForSpeakers;