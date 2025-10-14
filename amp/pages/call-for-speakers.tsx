import type { NextPage } from 'next';
import Head from 'next/head';
import Link from 'next/link';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import useWeb3Forms from '@web3forms/react';
import { ArrowLeft, Users, Calendar, FileText, AlertCircle, CheckCircle, MapPin, Link as LinkIcon } from 'lucide-react';

interface FormData {
  first_name: string;
  last_name: string;
  email: string;
  session_title: string;
  message: string;
  session_type: string;
  session_duration: string;
  availability: string;
  preferred_city: string;
  has_venue: string;
  venue_name?: string;
  venue_address?: string;
  venue_contact?: string;
  linkedin: string;
  github: string;
  phone: string;
  materials_link?: string;
  privacyAccepted: boolean;
}

const CallForSpeakers: NextPage = () => {
  const siteUrl = "https://azure-meetup-puglia.github.io/";
  
  const [isSuccess, setIsSuccess] = useState(false);
  const [result, setResult] = useState<string>('');
  
  const { register, reset, handleSubmit, formState: { errors }, watch } = useForm<FormData>();
  
  const { submit: onSubmit } = useWeb3Forms({
    access_key: 'b6b08bc9-f2a1-4795-b970-b0b392f1a9c1',
    settings: {
      from_name: 'Azure Meetup Puglia - Proposta Speaker',
      subject: 'Nuova proposta speaker ricevuta'
    },
    onSuccess: () => {
      setIsSuccess(true);
      setResult('Candidatura inviata con successo! Ti contatteremo presto.');
      reset();
      // Scroll to top per mostrare il messaggio di successo
      window.scrollTo({ top: 0, behavior: 'smooth' });
    },
    onError: (msg) => {
      setIsSuccess(false);
      setResult('Errore nell\'invio. Riprova più tardi.');
      console.error('Web3Forms error:', msg);
      // Scroll to top per mostrare il messaggio di errore
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  });
  
  // Watch per conteggio caratteri e campo venue
  const messageValue = watch('message', '');
  const hasVenue = watch('has_venue', '');
  
  const handleFormSubmit = (data: FormData) => {
    if (!data.privacyAccepted) {
      setResult('Devi accettare la privacy policy per procedere.');
      setIsSuccess(false);
      return;
    }
    
    // Mapping per valori più leggibili nell'email
    const availabilityMap: { [key: string]: string } = {
      'next_event': 'Prossimo evento in programma',
      'specific_theme': 'Evento su tema specifico',
      'any_event': 'Qualsiasi evento quando serve',
      'workshop': 'Workshop dedicato',
      'online': 'Eventi online'
    };
    
    const cityMap: { [key: string]: string } = {
      'bari': 'Bari',
      'lecce': 'Lecce',
      'brindisi': 'Brindisi',
      'foggia': 'Foggia',
      'taranto': 'Taranto',
      'bat': 'BAT (Barletta-Andria-Trani)',
      'any': 'Qualsiasi città',
      'online': 'Solo online'
    };
    
    const sessionTypeMap: { [key: string]: string } = {
      'talk': 'Talk (Presentazione)',
      'workshop': 'Workshop (Hands-on)',
      'demo': 'Live Demo',
      'panel': 'Panel Discussion',
      'lightning': 'Lightning Talk (10-15 min)'
    };
    
    // Creiamo un oggetto con dati più leggibili
    const formattedData = {
      ...data,
      // Aggiungiamo campi con nomi più leggibili
      '_replyto': data.email, // Per rispondere direttamente allo speaker
      'Nome_Completo': `${data.first_name} ${data.last_name}`,
      'Disponibilità': availabilityMap[data.availability] || data.availability,
      'Città_Preferita': cityMap[data.preferred_city] || data.preferred_city,
      'Tipo_Sessione': sessionTypeMap[data.session_type] || data.session_type,
      'Durata_Minuti': data.session_duration,
      'Ha_Venue': data.has_venue === 'yes' ? 'Sì, ha uno spazio disponibile' : 'No'
    };
    
    onSubmit(formattedData);
  };



  return (
    <div className="min-h-screen bg-gray-900 text-gray-200 font-sans">
      <Head>
        {/* Meta Tags Essenziali */}
        <title>Diventa Speaker | Azure Meetup Puglia - Proponi il tuo Talk</title>
        <meta name="description" content="Proponi il tuo talk su Azure, Cloud, AI, .NET, DevOps o qualsiasi tema tech! Condividi le tue conoscenze con la community pugliese. Form sempre aperto per speaker da Bari, Lecce, Brindisi, Foggia e tutta la Puglia." />
        <meta name="keywords" content="Call for Speakers, Azure Meetup Puglia, Microsoft Azure, .NET, C#, Blazor, Cloud Computing, DevOps, Docker, Kubernetes, AI, Machine Learning, sviluppo software, Speaker, Tech Talk, Bari, Lecce, Brindisi, Foggia, Taranto, Community Tech Puglia" />
        <meta name="robots" content="index, follow, max-image-preview:large" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <meta httpEquiv="Content-Type" content="text/html; charset=UTF-8" />
        <meta name="author" content="Azure Meetup Puglia" />
        <meta name="language" content="Italian" />
        
        {/* Canonical URL */}
        <link rel="canonical" href={`${siteUrl}call-for-speakers`} />
        
        {/* Open Graph / Facebook */}
        <meta property="og:type" content="website" />
        <meta property="og:site_name" content="Azure Meetup Puglia" />
        <meta property="og:title" content="🎤 Diventa Speaker - Azure Meetup Puglia" />
        <meta property="og:description" content="Hai expertise su Azure, .NET, Cloud, AI o qualsiasi tema tech? Proponi il tuo talk alla community più attiva della Puglia! Form sempre aperto, eventi in tutta la regione 🚀" />
        <meta property="og:image" content="https://secure.meetupstatic.com/photos/event/c/4/f/d/clean_527690429.webp" />
        <meta property="og:image:alt" content="Azure Meetup Puglia - Call for Speakers" />
        <meta property="og:image:width" content="1200" />
        <meta property="og:image:height" content="630" />
        <meta property="og:url" content={`${siteUrl}call-for-speakers`} />
        <meta property="og:locale" content="it_IT" />
        
        {/* Twitter Card */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:site" content="@AzurePuglia" />
        <meta name="twitter:creator" content="@AzurePuglia" />
        <meta name="twitter:title" content="🎤 Diventa Speaker - Azure Meetup Puglia" />
        <meta name="twitter:description" content="Proponi il tuo talk su Azure, .NET, Cloud, AI o qualsiasi tema tech! Form sempre aperto per speaker da tutta la Puglia 🚀" />
        <meta name="twitter:image" content="https://secure.meetupstatic.com/photos/event/c/4/f/d/clean_527690429.webp" />
        <meta name="twitter:image:alt" content="Azure Meetup Puglia - Diventa Speaker" />
        
        {/* Additional Meta */}
        <meta name="theme-color" content="#0078D4" />
        <meta name="msapplication-TileColor" content="#0078D4" />
        
        {/* LinkedIn specific */}
        <meta property="article:author" content="Azure Meetup Puglia" />
        <meta property="article:published_time" content={new Date().toISOString()} />
        
        {/* WhatsApp/Telegram preview */}
        <meta property="og:image:secure_url" content="https://secure.meetupstatic.com/photos/event/c/4/f/d/clean_527690429.webp" />
        
        {/* Favicon */}
        <link rel="icon" href="/favicon.ico" />
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
              Diventa Speaker
            </h1>
            <p className="text-xl text-blue-300 max-w-2xl mx-auto mb-3">
              Condividi la tua expertise su Azure, Cloud, AI, .NET, DevOps, sviluppo software o qualsiasi tema tech con la community pugliese!
            </p>
            <p className="text-sm text-gray-400 max-w-xl mx-auto">
              Form sempre aperto • Eventi in tutta la Puglia • Supportiamo speaker di ogni livello
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
                  <p className="text-green-300 text-sm mt-3">Riceverai una risposta entro 2 settimane.</p>
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
            <h3 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
              <Calendar className="w-5 h-5 text-blue-400" />
              Come Funziona
            </h3>
            <div className="space-y-3 text-gray-300">
              <div className="flex items-start gap-3">
                <span className="text-blue-400 font-bold">1.</span>
                <p className="text-sm">Compila il form con la tua proposta di talk o workshop</p>
              </div>
              <div className="flex items-start gap-3">
                <span className="text-blue-400 font-bold">2.</span>
                <p className="text-sm">Ti contatteremo per organizzare la sessione più adatta</p>
              </div>
              <div className="flex items-start gap-3">
                <span className="text-blue-400 font-bold">3.</span>
                <p className="text-sm">Pubblicheremo l'evento sui nostri canali e su Meetup</p>
              </div>
              <div className="flex items-start gap-3">
                <span className="text-blue-400 font-bold">4.</span>
                <p className="text-sm">Condividi la tua expertise con la community!</p>
              </div>
            </div>
            <div className="mt-4 pt-4 border-t border-gray-600">
              <p className="text-xs text-gray-400">
                💡 <strong>Tip:</strong> Accettiamo proposte su tutti i temi tech: Azure, Cloud, AI/ML, .NET, C#, Blazor, DevOps, Docker, Kubernetes, sviluppo web/mobile, architetture software, best practices e tecnologie Microsoft in generale.
              </p>
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
                  {...register('email', { 
                    required: 'Email è obbligatoria',
                    pattern: {
                      value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                      message: 'Email non valida'
                    }
                  })}
                  className="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
                {errors.email && (
                  <p className="text-red-400 text-sm mt-1">{errors.email.message}</p>
                )}
              </div>

              {/* Availability Section */}
              <div className="border-t border-gray-600 pt-6">
                <h3 className="text-lg font-semibold text-white mb-4">Disponibilità</h3>
                
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <label htmlFor="availability" className="block text-sm font-medium text-gray-300 mb-2">
                      Mi propongo per *
                    </label>
                    <select
                      id="availability"
                      {...register('availability', { required: 'Seleziona la tua disponibilità' })}
                      className="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    >
                      <option value="">Seleziona...</option>
                      <option value="next_event">Il prossimo evento in programma</option>
                      <option value="specific_theme">Un evento su tema specifico (Azure AI, DevOps, etc.)</option>
                      <option value="any_event">Qualsiasi evento quando serve</option>
                      <option value="workshop">Workshop dedicato</option>
                      <option value="online">Eventi online</option>
                    </select>
                    {errors.availability && (
                      <p className="text-red-400 text-sm mt-1">{errors.availability.message}</p>
                    )}
                  </div>
                  
                  <div>
                    <label htmlFor="preferred_city" className="block text-sm font-medium text-gray-300 mb-2">
                      Città preferita *
                    </label>
                    <select
                      id="preferred_city"
                      {...register('preferred_city', { required: 'Seleziona una città' })}
                      className="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    >
                      <option value="">Seleziona...</option>
                      <option value="bari">Bari</option>
                      <option value="lecce">Lecce</option>
                      <option value="brindisi">Brindisi</option>
                      <option value="foggia">Foggia</option>
                      <option value="taranto">Taranto</option>
                      <option value="bat">BAT (Barletta-Andria-Trani)</option>
                      <option value="any">Qualsiasi città</option>
                      <option value="online">Solo online</option>
                    </select>
                    {errors.preferred_city && (
                      <p className="text-red-400 text-sm mt-1">{errors.preferred_city.message}</p>
                    )}
                  </div>
                </div>
              </div>

              {/* Session Info */}
              <div className="border-t border-gray-600 pt-6">
                <h3 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
                  <FileText className="w-5 h-5" />
                  Informazioni sulla Sessione
                </h3>
                
                <div className="grid md:grid-cols-2 gap-4 mb-4">
                  <div>
                    <label htmlFor="session_type" className="block text-sm font-medium text-gray-300 mb-2">
                      Tipo di Sessione *
                    </label>
                    <select
                      id="session_type"
                      {...register('session_type', { required: 'Seleziona il tipo di sessione' })}
                      className="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    >
                      <option value="">Seleziona...</option>
                      <option value="talk">Talk (Presentazione)</option>
                      <option value="workshop">Workshop (Hands-on)</option>
                      <option value="demo">Live Demo</option>
                      <option value="panel">Panel Discussion</option>
                      <option value="lightning">Lightning Talk (10-15 min)</option>
                    </select>
                    {errors.session_type && (
                      <p className="text-red-400 text-sm mt-1">{errors.session_type.message}</p>
                    )}
                  </div>
                  
                  <div>
                    <label htmlFor="session_duration" className="block text-sm font-medium text-gray-300 mb-2">
                      Durata Prevista *
                    </label>
                    <select
                      id="session_duration"
                      {...register('session_duration', { required: 'Seleziona la durata' })}
                      className="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    >
                      <option value="">Seleziona...</option>
                      <option value="15">15 minuti</option>
                      <option value="30">30 minuti</option>
                      <option value="45">45 minuti</option>
                      <option value="60">60 minuti</option>
                      <option value="90">90 minuti (workshop)</option>
                      <option value="120">2 ore (workshop esteso)</option>
                    </select>
                    {errors.session_duration && (
                      <p className="text-red-400 text-sm mt-1">{errors.session_duration.message}</p>
                    )}
                  </div>
                </div>
                
                <div>
                  <label htmlFor="sessionTitle" className="block text-sm font-medium text-gray-300 mb-2">
                    Titolo della Sessione *
                  </label>
                  <input
                    type="text"
                    id="sessionTitle"
                    {...register('session_title', { required: 'Titolo sessione è obbligatorio' })}
                    className="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
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
                    {...register('phone')}
                    className="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent disabled:opacity-50 disabled:cursor-not-allowed"
                    placeholder="Twitter, sito web, altri social..."
                  />
                </div>
              </div>

              {/* Venue Section */}
              <div className="border-t border-gray-600 pt-6">
                <h3 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
                  <MapPin className="w-5 h-5" />
                  Disponibilità Venue
                </h3>
                
                <div>
                  <label htmlFor="has_venue" className="block text-sm font-medium text-gray-300 mb-2">
                    Hai accesso a uno spazio per ospitare eventi?
                  </label>
                  <select
                    id="has_venue"
                    {...register('has_venue')}
                    className="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  >
                    <option value="no">No</option>
                    <option value="yes">Sì, ho uno spazio disponibile</option>
                  </select>
                </div>
                
                {hasVenue === 'yes' && (
                  <div className="mt-4 space-y-4 p-4 bg-gray-700/30 rounded-lg">
                    <div>
                      <label htmlFor="venue_name" className="block text-sm font-medium text-gray-300 mb-2">
                        Nome Società/Spazio
                      </label>
                      <input
                        type="text"
                        id="venue_name"
                        {...register('venue_name')}
                        className="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        placeholder="es. Innovation Hub Bari"
                      />
                    </div>
                    
                    <div>
                      <label htmlFor="venue_address" className="block text-sm font-medium text-gray-300 mb-2">
                        Indirizzo
                      </label>
                      <input
                        type="text"
                        id="venue_address"
                        {...register('venue_address')}
                        className="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        placeholder="es. Via Roma 123, 70100 Bari"
                      />
                    </div>
                    
                    <div>
                      <label htmlFor="venue_contact" className="block text-sm font-medium text-gray-300 mb-2">
                        Contatto Referente Venue
                      </label>
                      <input
                        type="text"
                        id="venue_contact"
                        {...register('venue_contact')}
                        className="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        placeholder="es. Mario Rossi - 320xxxxxxx"
                      />
                    </div>
                  </div>
                )}
              </div>

              {/* Link to Materials */}
              <div className="border-t border-gray-600 pt-6">
                <h3 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
                  <LinkIcon className="w-5 h-5" />
                  Materiale di Presentazione (Opzionale)
                </h3>
                <div>
                  <label htmlFor="materialsLink" className="block text-sm font-medium text-gray-300 mb-2">
                    Link a Slide o Materiale (Google Drive, Dropbox, etc.)
                  </label>
                  <input
                    type="url"
                    id="materialsLink"
                    {...register('materials_link')}
                    className="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent disabled:opacity-50 disabled:cursor-not-allowed"
                    placeholder="https://drive.google.com/..."
                  />
                  <p className="text-xs text-gray-400 mt-1">
                    Puoi condividere un link alle tue slide o materiali di presentazione
                  </p>
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
                  className="w-full bg-blue-600 hover:bg-blue-700 disabled:bg-gray-600 disabled:cursor-not-allowed text-white font-semibold py-3 px-6 rounded-lg transition-colors focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:ring-offset-gray-800"
                >
                  Invia Proposta
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