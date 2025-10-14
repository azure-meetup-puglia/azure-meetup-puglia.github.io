import type { NextPage } from 'next';
import Head from 'next/head';
import Link from 'next/link';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import useWeb3Forms from '@web3forms/react';
import { ArrowLeft, MessageSquare, Star, CheckCircle, AlertCircle } from 'lucide-react';

interface FeedbackFormData {
  // Sezione 1 - Profilo e partecipazione
  email: string;
  participation_type: string;
  which_talk?: string;
  first_time: string;
  how_discovered: string[];
  how_discovered_other?: string;

  // Sezione 2 - Valutazioni (scala 1-5)
  rating_content_quality: string;
  rating_speaker_clarity: string;
  rating_relevance: string;
  rating_duration_pace: string;
  rating_networking: string;
  rating_organization: string;
  rating_venue: string;
  rating_logistics: string;

  // Materiali
  materials_useful: string;

  // Sezione 3 - Sponsor & community
  sponsor_visibility: string;
  want_to_contribute: string[];
  future_topics: string;

  // Sezione 4 - NPS e intenzione di ritorno
  nps_score: string;
  will_return: string;

  // Sezione 5 - Feedback aperto
  improvements: string;
  best_moment: string;
  speaker_comments?: string;

  // Sezione 6 - Follow-up
  follow_up_email?: string;

  // Privacy
  privacyAccepted: boolean;
}

const Feedback: NextPage = () => {
  const siteUrl = "https://azure-meetup-puglia.github.io/";

  const [isSuccess, setIsSuccess] = useState(false);
  const [result, setResult] = useState<string>('');

  const { register, reset, handleSubmit, formState: { errors }, watch } = useForm<FeedbackFormData>();

  const { submit: onSubmit } = useWeb3Forms({
    access_key: 'b6b08bc9-f2a1-4795-b970-b0b392f1a9c1',
    settings: {
      from_name: 'Azure Meetup Puglia - Feedback Evento',
      subject: 'Nuovo feedback ricevuto'
    },
    onSuccess: () => {
      setIsSuccess(true);
      setResult('Feedback inviato con successo! Grazie per il tuo contributo.');
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

  // Watch per logica condizionale
  const participationType = watch('participation_type', '');
  const howDiscoveredRaw = watch('how_discovered', []);
  const howDiscovered = Array.isArray(howDiscoveredRaw) ? howDiscoveredRaw : [];

  const handleFormSubmit = (data: FeedbackFormData) => {
    if (!data.privacyAccepted) {
      setResult('Devi accettare la privacy policy per procedere.');
      setIsSuccess(false);
      return;
    }

    // Formatta i dati per l'email
    const formattedData = {
      ...data,
      '_replyto': data.email,
      'Come_Scoperto': Array.isArray(data.how_discovered) ? data.how_discovered.join(', ') : data.how_discovered,
      'Vuole_Contribuire': Array.isArray(data.want_to_contribute) ? data.want_to_contribute.join(', ') : data.want_to_contribute,
      'NPS_Score': `${data.nps_score}/10`,
    };

    onSubmit(formattedData);
  };

  const ratingOptions = [
    { value: '1', label: '1' },
    { value: '2', label: '2' },
    { value: '3', label: '3' },
    { value: '4', label: '4' },
    { value: '5', label: '5' }
  ];

  const npsOptions = Array.from({ length: 11 }, (_, i) => ({ value: String(i), label: String(i) }));

  return (
    <div className="min-h-screen bg-gray-900 text-gray-200 font-sans">
      <Head>
        <title>Feedback Evento | Azure Meetup Puglia</title>
        <meta name="description" content="Condividi il tuo feedback sull'evento Azure Meetup Puglia. La tua opinione ci aiuta a migliorare e organizzare eventi sempre migliori." />
        <meta name="robots" content="noindex, nofollow" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <link rel="canonical" href={`${siteUrl}feedback`} />
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
              <span className="text-blue-300">Feedback Evento</span>
            </div>
          </nav>

          {/* Header */}
          <header className="text-center mb-12">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-blue-400 to-purple-600 rounded-full mb-6">
              <MessageSquare className="w-8 h-8 text-white" />
            </div>
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
              Feedback Evento
            </h1>
            <p className="text-xl text-blue-300 max-w-2xl mx-auto mb-3">
              La tua opinione è preziosa! Aiutaci a migliorare i nostri eventi condividendo il tuo feedback.
            </p>
            <p className="text-sm text-gray-400 max-w-xl mx-auto">
              Circa 3-5 minuti • Tutte le risposte sono anonime
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
                  <p className="text-green-300 text-sm mt-3">Il tuo feedback è stato registrato con successo.</p>
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
              <Star className="w-5 h-5 text-yellow-400" />
              Perché il tuo feedback è importante
            </h3>
            <div className="space-y-2 text-gray-300 text-sm">
              <p>• Miglioriamo la qualità di contenuti e organizzazione</p>
              <p>• Scegliamo argomenti che ti interessano davvero</p>
              <p>• Creiamo un'esperienza sempre migliore per tutta la community</p>
            </div>
          </div>

          {/* Form */}
          <div className="bg-gray-800 rounded-xl shadow-lg border border-gray-700 p-6 md:p-8">
            <form onSubmit={handleSubmit(handleFormSubmit)} className="space-y-10">

              {/* SEZIONE 1 - Profilo e Partecipazione */}
              <section>
                <h2 className="text-2xl font-bold text-white mb-6 pb-3 border-b border-gray-600">
                  1. Profilo e Partecipazione
                </h2>

                {/* Email */}
                <div className="mb-6">
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

                {/* Participation Type */}
                <div className="mb-6">
                  <label className="block text-sm font-medium text-gray-300 mb-3">
                    Partecipazione *
                  </label>
                  <div className="space-y-2">
                    <label className="flex items-center gap-3 cursor-pointer bg-gray-700/30 p-3 rounded-lg hover:bg-gray-700/50 transition-colors">
                      <input
                        type="radio"
                        value="full"
                        {...register('participation_type', { required: 'Seleziona il tipo di partecipazione' })}
                        className="w-4 h-4 text-blue-600 bg-gray-700 border-gray-600"
                      />
                      <span className="text-sm text-gray-300">Intero evento</span>
                    </label>
                    <label className="flex items-center gap-3 cursor-pointer bg-gray-700/30 p-3 rounded-lg hover:bg-gray-700/50 transition-colors">
                      <input
                        type="radio"
                        value="partial"
                        {...register('participation_type', { required: 'Seleziona il tipo di partecipazione' })}
                        className="w-4 h-4 text-blue-600 bg-gray-700 border-gray-600"
                      />
                      <span className="text-sm text-gray-300">Parte dell'evento</span>
                    </label>
                    <label className="flex items-center gap-3 cursor-pointer bg-gray-700/30 p-3 rounded-lg hover:bg-gray-700/50 transition-colors">
                      <input
                        type="radio"
                        value="networking"
                        {...register('participation_type', { required: 'Seleziona il tipo di partecipazione' })}
                        className="w-4 h-4 text-blue-600 bg-gray-700 border-gray-600"
                      />
                      <span className="text-sm text-gray-300">Networking soltanto</span>
                    </label>
                  </div>
                  {errors.participation_type && (
                    <p className="text-red-400 text-sm mt-2">{errors.participation_type.message}</p>
                  )}

                  {/* Quale talk - mostrato solo se "Solo un talk" */}
                  {participationType === 'partial' && (
                    <div className="mt-3">
                      <label htmlFor="which_talk" className="block text-sm font-medium text-gray-300 mb-2">
                        Quale talk?
                      </label>
                      <input
                        type="text"
                        id="which_talk"
                        {...register('which_talk')}
                        placeholder="es. 1° talk, 2° talk, talk su Azure AI..."
                        className="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      />
                    </div>
                  )}
                </div>

                {/* First Time */}
                <div className="mb-6">
                  <label className="block text-sm font-medium text-gray-300 mb-3">
                    È la tua prima volta al meetup? *
                  </label>
                  <div className="flex gap-4">
                    <label className="flex items-center gap-2 cursor-pointer">
                      <input
                        type="radio"
                        value="yes"
                        {...register('first_time', { required: 'Questo campo è obbligatorio' })}
                        className="w-4 h-4 text-blue-600 bg-gray-700 border-gray-600"
                      />
                      <span className="text-sm text-gray-300">Sì</span>
                    </label>
                    <label className="flex items-center gap-2 cursor-pointer">
                      <input
                        type="radio"
                        value="no"
                        {...register('first_time', { required: 'Questo campo è obbligatorio' })}
                        className="w-4 h-4 text-blue-600 bg-gray-700 border-gray-600"
                      />
                      <span className="text-sm text-gray-300">No</span>
                    </label>
                  </div>
                  {errors.first_time && (
                    <p className="text-red-400 text-sm mt-2">{errors.first_time.message}</p>
                  )}
                </div>

                {/* How Discovered */}
                <div className="mb-6">
                  <label className="block text-sm font-medium text-gray-300 mb-3">
                    Come hai scoperto l'evento? * (puoi selezionare più opzioni)
                  </label>
                  <div className="space-y-2">
                    {[
                      { value: 'linkedin', label: 'LinkedIn' },
                      { value: 'meetup', label: 'Meetup.com' },
                      { value: 'telegram', label: 'Telegram' },
                      { value: 'passaparola', label: 'Passaparola' },
                      { value: 'azienda', label: 'Azienda' },
                      { value: 'altro', label: 'Altro' }
                    ].map((option) => (
                      <label key={option.value} className="flex items-center gap-3 cursor-pointer bg-gray-700/30 p-3 rounded-lg hover:bg-gray-700/50 transition-colors">
                        <input
                          type="checkbox"
                          value={option.value}
                          {...register('how_discovered', { required: 'Seleziona almeno un\'opzione' })}
                          className="w-4 h-4 text-blue-600 bg-gray-700 border-gray-600 rounded"
                        />
                        <span className="text-sm text-gray-300">{option.label}</span>
                      </label>
                    ))}
                  </div>
                  {errors.how_discovered && (
                    <p className="text-red-400 text-sm mt-2">{errors.how_discovered.message}</p>
                  )}

                  {howDiscovered.includes('altro') && (
                    <div className="mt-3">
                      <input
                        type="text"
                        placeholder="Specifica..."
                        {...register('how_discovered_other')}
                        className="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      />
                    </div>
                  )}
                </div>
              </section>

              {/* SEZIONE 2 - Valutazioni */}
              <section>
                <h2 className="text-2xl font-bold text-white mb-6 pb-3 border-b border-gray-600">
                  2. Valutazioni
                </h2>
                <p className="text-sm text-gray-400 mb-6">
                  Valuta da 1 (Molto insoddisfatto) a 5 (Molto soddisfatto)
                </p>

                <div className="space-y-6">
                  {/* Rating Items */}
                  {[
                    { name: 'rating_content_quality', label: 'Qualità dei contenuti' },
                    { name: 'rating_speaker_clarity', label: 'Chiarezza/esposizione dei relatori' },
                    { name: 'rating_relevance', label: 'Rilevanza per il tuo lavoro/interessi' },
                    { name: 'rating_duration_pace', label: 'Durata e ritmo della serata' },
                    { name: 'rating_networking', label: 'Opportunità di networking' },
                    { name: 'rating_organization', label: 'Organizzazione generale' },
                    { name: 'rating_venue', label: 'Venue (location, accesso, comfort)' },
                    { name: 'rating_logistics', label: 'Logistica (registrazione, accoglienza, tempi)' }
                  ].map((item) => (
                    <div key={item.name} className="bg-gray-700/30 p-4 rounded-lg">
                      <label className="block text-sm font-medium text-gray-300 mb-3">
                        {item.label}
                      </label>
                      <div className="flex gap-3 justify-center flex-wrap">
                        {ratingOptions.map((option) => (
                          <label key={option.value} className="flex flex-col items-center gap-1 cursor-pointer">
                            <input
                              type="radio"
                              value={option.value}
                              {...register(item.name as any, { required: 'Valuta questo aspetto' })}
                              className="w-5 h-5 text-blue-600 bg-gray-700 border-gray-600"
                            />
                            <span className="text-xs text-gray-400">{option.label}</span>
                          </label>
                        ))}
                      </div>
                      {errors[item.name as keyof typeof errors] && (
                        <p className="text-red-400 text-sm mt-2 text-center">
                          {errors[item.name as keyof typeof errors]?.message as string}
                        </p>
                      )}
                    </div>
                  ))}


                  {/* Materials Useful */}
                  <div className="bg-gray-700/30 p-4 rounded-lg">
                    <label className="block text-sm font-medium text-gray-300 mb-3">
                      Materiali/slide utili?
                    </label>
                    <div className="flex gap-4">
                      <label className="flex items-center gap-2 cursor-pointer">
                        <input
                          type="radio"
                          value="yes"
                          {...register('materials_useful')}
                          className="w-4 h-4 text-blue-600 bg-gray-700 border-gray-600"
                        />
                        <span className="text-sm text-gray-300">Sì</span>
                      </label>
                      <label className="flex items-center gap-2 cursor-pointer">
                        <input
                          type="radio"
                          value="no"
                          {...register('materials_useful')}
                          className="w-4 h-4 text-blue-600 bg-gray-700 border-gray-600"
                        />
                        <span className="text-sm text-gray-300">No</span>
                      </label>
                    </div>
                  </div>

                </div>
              </section>

              {/* SEZIONE 3 - Sponsor & Community */}
              <section>
                <h2 className="text-2xl font-bold text-white mb-6 pb-3 border-b border-gray-600">
                  3. Sponsor & Community
                </h2>

                {/* Sponsor Visibility */}
                <div className="mb-6 bg-gray-700/30 p-4 rounded-lg">
                  <label className="block text-sm font-medium text-gray-300 mb-3">
                    Visibilità sponsor: adeguata e non invadente?
                  </label>
                  <div className="flex gap-3 justify-center flex-wrap">
                    {ratingOptions.map((option) => (
                      <label key={option.value} className="flex flex-col items-center gap-1 cursor-pointer">
                        <input
                          type="radio"
                          value={option.value}
                          {...register('sponsor_visibility')}
                          className="w-5 h-5 text-blue-600 bg-gray-700 border-gray-600"
                        />
                        <span className="text-xs text-gray-400">{option.label}</span>
                      </label>
                    ))}
                  </div>
                </div>

                {/* Want to Contribute */}
                <div className="mb-6">
                  <label className="block text-sm font-medium text-gray-300 mb-3">
                    Vorresti essere speaker/host/sponsor? (puoi selezionare più opzioni)
                  </label>
                  <div className="space-y-2">
                    {[
                      { value: 'speaker', label: 'Propongo un talk' },
                      { value: 'host', label: 'La mia azienda può ospitare' },
                      { value: 'sponsor', label: 'La mia azienda può sponsorizzare' },
                      { value: 'no', label: 'No per ora' }
                    ].map((option) => (
                      <label key={option.value} className="flex items-center gap-3 cursor-pointer bg-gray-700/30 p-3 rounded-lg hover:bg-gray-700/50 transition-colors">
                        <input
                          type="checkbox"
                          value={option.value}
                          {...register('want_to_contribute')}
                          className="w-4 h-4 text-blue-600 bg-gray-700 border-gray-600 rounded"
                        />
                        <span className="text-sm text-gray-300">{option.label}</span>
                      </label>
                    ))}
                  </div>
                </div>

                {/* Future Topics */}
                <div className="mb-6">
                  <label htmlFor="future_topics" className="block text-sm font-medium text-gray-300 mb-2">
                    Temi futuri che ti interessano (parole chiave)
                  </label>
                  <textarea
                    id="future_topics"
                    rows={3}
                    {...register('future_topics')}
                    className="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="es. Azure AI, Kubernetes, DevOps, .NET MAUI, Blazor, Security..."
                  />
                </div>
              </section>

              {/* SEZIONE 4 - NPS e Intenzione di Ritorno */}
              <section>
                <h2 className="text-2xl font-bold text-white mb-6 pb-3 border-b border-gray-600">
                  4. Raccomandazione e Partecipazione Futura
                </h2>

                {/* NPS Score */}
                <div className="mb-6 bg-gray-700/30 p-4 rounded-lg">
                  <label className="block text-sm font-medium text-gray-300 mb-3">
                    Consiglieresti l'evento a un collega? * (0 = Per niente, 10 = Assolutamente sì)
                  </label>
                  <div className="flex gap-2 justify-center flex-wrap">
                    {npsOptions.map((option) => (
                      <label key={option.value} className="flex flex-col items-center gap-1 cursor-pointer">
                        <input
                          type="radio"
                          value={option.value}
                          {...register('nps_score', { required: 'Questo campo è obbligatorio' })}
                          className="w-5 h-5 text-blue-600 bg-gray-700 border-gray-600"
                        />
                        <span className="text-xs text-gray-400">{option.label}</span>
                      </label>
                    ))}
                  </div>
                  {errors.nps_score && (
                    <p className="text-red-400 text-sm mt-2 text-center">{errors.nps_score.message}</p>
                  )}
                </div>

                {/* Will Return */}
                <div className="mb-6">
                  <label className="block text-sm font-medium text-gray-300 mb-3">
                    Parteciperai a un prossimo meetup? *
                  </label>
                  <div className="space-y-2">
                    {[
                      { value: 'definitely', label: 'Sicuramente sì' },
                      { value: 'probably', label: 'Probabilmente sì' },
                      { value: 'maybe', label: 'Non so' },
                      { value: 'probably_not', label: 'Probabilmente no' },
                      { value: 'no', label: 'No' }
                    ].map((option) => (
                      <label key={option.value} className="flex items-center gap-3 cursor-pointer bg-gray-700/30 p-3 rounded-lg hover:bg-gray-700/50 transition-colors">
                        <input
                          type="radio"
                          value={option.value}
                          {...register('will_return', { required: 'Questo campo è obbligatorio' })}
                          className="w-4 h-4 text-blue-600 bg-gray-700 border-gray-600"
                        />
                        <span className="text-sm text-gray-300">{option.label}</span>
                      </label>
                    ))}
                  </div>
                  {errors.will_return && (
                    <p className="text-red-400 text-sm mt-2">{errors.will_return.message}</p>
                  )}
                </div>
              </section>

              {/* SEZIONE 5 - Feedback Aperto */}
              <section>
                <h2 className="text-2xl font-bold text-white mb-6 pb-3 border-b border-gray-600">
                  5. Feedback Aperto
                </h2>

                {/* Best Moment */}
                <div className="mb-6">
                  <label htmlFor="best_moment" className="block text-sm font-medium text-gray-300 mb-2">
                    Il momento migliore della serata
                  </label>
                  <input
                    type="text"
                    id="best_moment"
                    {...register('best_moment')}
                    className="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="Cosa ti è piaciuto di più?"
                  />
                </div>

                {/* Improvements */}
                <div className="mb-6">
                  <label htmlFor="improvements" className="block text-sm font-medium text-gray-300 mb-2">
                    Cosa migliorare
                  </label>
                  <textarea
                    id="improvements"
                    rows={4}
                    {...register('improvements')}
                    className="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="Condividi i tuoi suggerimenti per migliorare gli eventi futuri..."
                  />
                </div>

                {/* Speaker Comments */}
                <div className="mb-6">
                  <label htmlFor="speaker_comments" className="block text-sm font-medium text-gray-300 mb-2">
                    Commenti per i relatori (opzionale, se presente)
                  </label>
                  <textarea
                    id="speaker_comments"
                    rows={3}
                    {...register('speaker_comments')}
                    className="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="Feedback specifico per uno o più relatori..."
                  />
                </div>
              </section>

              {/* SEZIONE 6 - Follow-up */}
              <section>
                <h2 className="text-2xl font-bold text-white mb-6 pb-3 border-b border-gray-600">
                  6. Follow-up
                </h2>

                {/* Follow-up Email */}
                <div className="mb-6">
                  <label htmlFor="follow_up_email" className="block text-sm font-medium text-gray-300 mb-2">
                    Email per invio slide/novità (opzionale)
                  </label>
                  <input
                    type="email"
                    id="follow_up_email"
                    {...register('follow_up_email')}
                    className="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="Email per ricevere aggiornamenti"
                  />
                  <p className="text-xs text-gray-400 mt-1">
                    Se diversa dall'email principale
                  </p>
                </div>

              </section>

              {/* SEZIONE 7 - Privacy */}
              <section>
                <h2 className="text-2xl font-bold text-white mb-6 pb-3 border-b border-gray-600">
                  7. Privacy
                </h2>

                <div className="bg-gray-700/50 rounded-lg p-4 mb-4">
                  <h4 className="text-sm font-semibold text-white mb-2">Informativa Privacy</h4>
                  <div className="text-xs text-gray-300 space-y-2">
                    <p>
                      I dati sono usati solo per fini statistici e di comunicazione del meetup; non saranno ceduti a terzi.
                      Puoi chiedere la cancellazione scrivendo a <a href="mailto:azuremeetuppuglia@gmail.com" className="text-blue-400 hover:text-blue-300">azuremeetuppuglia@gmail.com</a>.
                    </p>
                  </div>
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
              </section>

              {/* Submit Button */}
              <div className="pt-6">
                <button
                  type="submit"
                  className="w-full bg-blue-600 hover:bg-blue-700 disabled:bg-gray-600 disabled:cursor-not-allowed text-white font-semibold py-3 px-6 rounded-lg transition-colors focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:ring-offset-gray-800"
                >
                  Invia Feedback
                </button>
              </div>
            </form>
          </div>

          {/* Thank You Note */}
          <div className="mt-12 bg-gradient-to-r from-blue-900/40 to-purple-900/40 border border-blue-500/50 rounded-lg p-6 text-center">
            <h3 className="text-lg font-semibold text-white mb-2">Grazie per il tuo tempo!</h3>
            <p className="text-gray-300 text-sm">
              Il tuo feedback ci aiuta a crescere e a organizzare eventi sempre migliori per tutta la community Azure Puglia.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Feedback;
