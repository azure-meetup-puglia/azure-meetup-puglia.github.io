import type { NextPage } from 'next';
import Head from 'next/head';
import Link from 'next/link';
import { useState, FormEvent } from 'react';
import { ArrowLeft, Users, Calendar, FileText, Upload, AlertCircle, CheckCircle, MapPin, Clock } from 'lucide-react';

interface FormData {
  nome: string;
  cognome: string;
  email: string;
  sessionTitle: string;
  sessionDescription: string;
  linkedinUrl: string;
  githubUrl: string;
  contatti: string;
  file?: File;
  privacyAccepted: boolean;
}

const CallForSpeakers: NextPage = () => {
  const siteUrl = "https://azure-meetup-puglia.github.io/";
  
  // Data di scadenza per la call for speakers
  const DEADLINE = new Date('2025-10-15T23:59:59');
  const isExpired = new Date() > DEADLINE;
  
  const [formData, setFormData] = useState<FormData>({
    nome: '',
    cognome: '',
    email: '',
    sessionTitle: '',
    sessionDescription: '',
    linkedinUrl: '',
    githubUrl: '',
    contatti: '',
    privacyAccepted: false
  });
  
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');
  const [fileError, setFileError] = useState('');

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value, type } = e.target;
    
    if (type === 'checkbox') {
      const checked = (e.target as HTMLInputElement).checked;
      setFormData(prev => ({ ...prev, [name]: checked }));
    } else {
      setFormData(prev => ({ ...prev, [name]: value }));
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    setFileError('');
    
    if (file) {
      const allowedTypes = [
        'application/pdf',
        'application/vnd.ms-powerpoint',
        'application/vnd.openxmlformats-officedocument.presentationml.presentation'
      ];
      
      if (!allowedTypes.includes(file.type)) {
        setFileError('Solo file PDF e PowerPoint (PPT/PPTX) sono consentiti.');
        e.target.value = '';
        return;
      }
      
      if (file.size > 5 * 1024 * 1024) { // 5MB limit for Web3Forms
        setFileError('Il file non può superare i 5MB.');
        e.target.value = '';
        return;
      }
      
      setFormData(prev => ({ ...prev, file }));
    }
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    
    if (isExpired) {
      return;
    }
    
    if (!formData.privacyAccepted) {
      alert('Devi accettare la privacy policy per procedere.');
      return;
    }
    
    if (formData.sessionDescription.length > 2000) {
      alert('La descrizione della sessione non può superare i 2000 caratteri.');
      return;
    }
    
    setIsSubmitting(true);
    setSubmitStatus('idle');
    
    try {
      const formDataToSend = new FormData();
      
      // Web3Forms access key (REQUIRED)
      formDataToSend.append('access_key', 'b6b08bc9-f2a1-4795-b970-b0b392f1a9c1');
      
      // Required honeypot field (for spam protection)
      formDataToSend.append('botcheck', '');
      
      // Form fields
      formDataToSend.append('name', `${formData.nome} ${formData.cognome}`);
      formDataToSend.append('email', formData.email);
      formDataToSend.append('message', `
CANDIDATURA CALL FOR SPEAKERS
==============================

Nome: ${formData.nome}
Cognome: ${formData.cognome}
Email: ${formData.email}

SESSIONE:
Titolo: ${formData.sessionTitle}
Descrizione: ${formData.sessionDescription}

CONTATTI:
LinkedIn: ${formData.linkedinUrl || 'Non fornito'}
GitHub: ${formData.githubUrl || 'Non fornito'}
Altri contatti: ${formData.contatti || 'Non fornito'}
`);
      
      // Subject for email
      formDataToSend.append('subject', `Call for Speakers: ${formData.sessionTitle}`);
      
      // Redirect URL (optional)
      formDataToSend.append('redirect', 'https://azure-meetup-puglia.github.io/call-for-speakers?success=true');
      
      // File upload (if present and under size limit)
      if (formData.file && formData.file.size <= 5 * 1024 * 1024) { // 5MB limit
        formDataToSend.append('attachment', formData.file);
      }
      
      const response = await fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        body: formDataToSend
      });
      
      if (response.ok) {
        setSubmitStatus('success');
        // Reset form
        setFormData({
          nome: '',
          cognome: '',
          email: '',
          sessionTitle: '',
          sessionDescription: '',
          linkedinUrl: '',
          githubUrl: '',
          contatti: '',
          privacyAccepted: false
        });
        // Reset file input
        const fileInput = document.getElementById('file') as HTMLInputElement;
        if (fileInput) fileInput.value = '';
      } else {
        setSubmitStatus('error');
      }
    } catch (error) {
      console.error('Errore nell\'invio del form:', error);
      setSubmitStatus('error');
    } finally {
      setIsSubmitting(false);
    }
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
          {submitStatus === 'success' && (
            <div className="mb-8 p-4 bg-green-900/50 border border-green-500 rounded-lg flex items-center gap-3">
              <CheckCircle className="w-5 h-5 text-green-400 flex-shrink-0" />
              <div>
                <h3 className="font-semibold text-green-300">Candidatura inviata con successo!</h3>
                <p className="text-green-200 text-sm">Grazie per il tuo interesse. Ti contatteremo presto.</p>
              </div>
            </div>
          )}

          {submitStatus === 'error' && (
            <div className="mb-8 p-4 bg-red-900/50 border border-red-500 rounded-lg flex items-center gap-3">
              <AlertCircle className="w-5 h-5 text-red-400 flex-shrink-0" />
              <div>
                <h3 className="font-semibold text-red-300">Errore nell'invio</h3>
                <p className="text-red-200 text-sm">Si è verificato un errore. Riprova più tardi.</p>
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
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Honeypot field for spam protection - must be hidden */}
              <input
                type="text"
                name="botcheck"
                tabIndex={-1}
                autoComplete="off"
                style={{ display: 'none' }}
                aria-hidden="true"
              />
              {/* Personal Info */}
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <label htmlFor="nome" className="block text-sm font-medium text-gray-300 mb-2">
                    Nome *
                  </label>
                  <input
                    type="text"
                    id="nome"
                    name="nome"
                    required
                    disabled={isExpired}
                    value={formData.nome}
                    onChange={handleInputChange}
                    className="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent disabled:opacity-50 disabled:cursor-not-allowed"
                  />
                </div>
                <div>
                  <label htmlFor="cognome" className="block text-sm font-medium text-gray-300 mb-2">
                    Cognome *
                  </label>
                  <input
                    type="text"
                    id="cognome"
                    name="cognome"
                    required
                    disabled={isExpired}
                    value={formData.cognome}
                    onChange={handleInputChange}
                    className="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent disabled:opacity-50 disabled:cursor-not-allowed"
                  />
                </div>
              </div>

              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-300 mb-2">
                  Email *
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  required
                  disabled={isExpired}
                  value={formData.email}
                  onChange={handleInputChange}
                  className="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent disabled:opacity-50 disabled:cursor-not-allowed"
                />
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
                    name="sessionTitle"
                    required
                    disabled={isExpired}
                    value={formData.sessionTitle}
                    onChange={handleInputChange}
                    className="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent disabled:opacity-50 disabled:cursor-not-allowed"
                    placeholder="es. Implementare CI/CD con Azure DevOps"
                  />
                </div>

                <div className="mt-4">
                  <label htmlFor="sessionDescription" className="block text-sm font-medium text-gray-300 mb-2">
                    Descrizione della Sessione * (max 2000 caratteri)
                  </label>
                  <textarea
                    id="sessionDescription"
                    name="sessionDescription"
                    required
                    disabled={isExpired}
                    rows={6}
                    maxLength={2000}
                    value={formData.sessionDescription}
                    onChange={handleInputChange}
                    className="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent disabled:opacity-50 disabled:cursor-not-allowed"
                    placeholder="Descrive di cosa parlerai, gli obiettivi della sessione e cosa impareranno i partecipanti..."
                  />
                  <div className="text-right text-sm text-gray-400 mt-1">
                    {formData.sessionDescription.length}/2000 caratteri
                  </div>
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
                      name="linkedinUrl"
                      disabled={isExpired}
                      value={formData.linkedinUrl}
                      onChange={handleInputChange}
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
                      name="githubUrl"
                      disabled={isExpired}
                      value={formData.githubUrl}
                      onChange={handleInputChange}
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
                    name="contatti"
                    disabled={isExpired}
                    value={formData.contatti}
                    onChange={handleInputChange}
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
                    Slide o Materiale (PDF o PowerPoint - max 5MB)
                  </label>
                  <input
                    type="file"
                    id="file"
                    name="file"
                    accept=".pdf,.ppt,.pptx"
                    disabled={isExpired}
                    onChange={handleFileChange}
                    className="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-blue-600 file:text-white hover:file:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed"
                  />
                  {fileError && (
                    <p className="text-red-400 text-sm mt-2">{fileError}</p>
                  )}
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
                    name="privacyAccepted"
                    required
                    disabled={isExpired}
                    checked={formData.privacyAccepted}
                    onChange={handleInputChange}
                    className="mt-1 w-4 h-4 text-blue-600 bg-gray-700 border-gray-600 rounded focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed"
                  />
                  <label htmlFor="privacyAccepted" className="text-sm text-gray-300">
                    Accetto la privacy policy e autorizzo il trattamento dei miei dati personali per le finalità indicate *
                  </label>
                </div>
              </div>

              {/* Submit Button */}
              <div className="pt-6">
                <button
                  type="submit"
                  disabled={isSubmitting || isExpired || !formData.privacyAccepted}
                  className="w-full bg-blue-600 hover:bg-blue-700 disabled:bg-gray-600 disabled:cursor-not-allowed text-white font-semibold py-3 px-6 rounded-lg transition-colors focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:ring-offset-gray-800"
                >
                  {isSubmitting ? 'Invio in corso...' : isExpired ? 'Call for Speakers chiusa' : 'Invia Candidatura'}
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