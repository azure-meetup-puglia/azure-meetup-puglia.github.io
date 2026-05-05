import fs from 'fs';
import path from 'path';
import type { GetStaticProps, InferGetStaticPropsType, NextPage } from 'next';
import Head from 'next/head';
import Image from 'next/image';
import Link from 'next/link';
import { ArrowLeft, Images } from 'lucide-react';
import { useState } from 'react';
import Lightbox from 'yet-another-react-lightbox';

interface GalleryImage {
    alt: string;
    src: string;
}

interface GalleryPageProps {
    images: GalleryImage[];
}

const galleryBasePath = '/img/events/global-azure-puglia-2026/gallery';

export const getStaticProps: GetStaticProps<GalleryPageProps> = async () => {
    const galleryDir = path.join(
        process.cwd(),
        'public',
        'img',
        'events',
        'global-azure-puglia-2026',
        'gallery'
    );

    const images = fs
        .readdirSync(galleryDir)
        .filter((fileName) => /\.(jpe?g|png|webp)$/i.test(fileName))
        .sort((left, right) => left.localeCompare(right, 'it', { numeric: true }))
        .map((fileName, index) => ({
            alt: `Global Azure Puglia 2026 - Foto ${index + 1}`,
            src: `${galleryBasePath}/${encodeURIComponent(fileName)}`
        }));

    return {
        props: {
            images
        }
    };
};

const GalleryAzureMeetupPugliaPage: NextPage<InferGetStaticPropsType<typeof getStaticProps>> = ({ images }) => {
    const [activeIndex, setActiveIndex] = useState(-1);
    const siteUrl = 'https://azure-meetup-puglia.github.io/';
    const pageUrl = `${siteUrl}gallery-azure-meetup-puglia`;
    const previewImage = images[0]?.src ? `${siteUrl}${images[0].src.replace(/^\//, '')}` : undefined;

    return (
        <div className="min-h-screen bg-gray-900 text-gray-200 font-sans">
            <Head>
                <title>Gallery Azure Meetup Puglia | Foto Global Azure Puglia 2026</title>
                <meta
                    name="description"
                    content="Gallery fotografica del Global Azure Puglia 2026: scorri le immagini dell'evento e rivivi la giornata della community Azure in Puglia."
                />
                <meta name="robots" content="index, follow, max-image-preview:large" />
                <link rel="canonical" href={pageUrl} />
                <meta property="og:type" content="website" />
                <meta property="og:site_name" content="Azure Meetup Puglia" />
                <meta property="og:title" content="Gallery Azure Meetup Puglia" />
                <meta property="og:description" content="Le foto del Global Azure Puglia 2026 raccolte in una gallery navigabile." />
                <meta property="og:url" content={pageUrl} />
                {previewImage && <meta property="og:image" content={previewImage} />}
                <meta name="twitter:card" content="summary_large_image" />
                <meta name="twitter:title" content="Gallery Azure Meetup Puglia" />
                <meta name="twitter:description" content="Sfoglia la gallery fotografica del Global Azure Puglia 2026." />
                {previewImage && <meta name="twitter:image" content={previewImage} />}
            </Head>

            <a
                href="#main-content"
                className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 bg-blue-600 text-white px-4 py-2 rounded z-50"
            >
                Salta alla gallery
            </a>

            <div className="p-4 md:p-8">
                <header className="max-w-6xl mx-auto mb-12 pt-10">
                    <Link
                        href="/global-azure-puglia"
                        className="inline-flex items-center gap-2 text-blue-400 hover:text-blue-300 transition-colors mb-6 focus:outline-none focus:ring-2 focus:ring-blue-400 rounded px-2 py-1"
                    >
                        <ArrowLeft className="w-4 h-4" aria-hidden="true" />
                        Torna al Global Azure Puglia 2026
                    </Link>

                    <div className="text-center">
                        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-amber-400 text-gray-950 text-sm font-bold uppercase tracking-wide mb-4">
                            Novita'
                        </div>
                        <div className="inline-block p-4 bg-gradient-to-br from-blue-500 to-cyan-400 rounded-full mb-4 shadow-lg" role="img" aria-label="Gallery Azure Meetup Puglia">
                            <Images className="w-12 h-12 text-white" aria-hidden="true" />
                        </div>
                        <h1 className="text-4xl md:text-6xl font-bold text-white mb-3 tracking-tight">
                            Gallery Azure Meetup Puglia
                        </h1>
                        <p className="text-xl md:text-2xl text-blue-300 max-w-3xl mx-auto mb-4">
                            Le foto del Global Azure Puglia 2026 raccolte in una gallery navigabile, direttamente dal repository GitHub del sito.
                        </p>
                        <p className="text-sm text-gray-400">
                            {images.length} immagini disponibili. Clicca una foto per aprire il lightbox e navigare con frecce, swipe o tastiera.
                        </p>
                    </div>
                </header>

                <main id="main-content" className="max-w-6xl mx-auto space-y-10 px-4">
                    <nav aria-label="Breadcrumb" className="text-sm text-gray-400">
                        <ol className="flex items-center space-x-2 flex-wrap">
                            <li><Link href="/" className="hover:text-blue-300">Home</Link></li>
                            <li aria-hidden="true">/</li>
                            <li><Link href="/events" className="hover:text-blue-300">Eventi</Link></li>
                            <li aria-hidden="true">/</li>
                            <li><Link href="/global-azure-puglia" className="hover:text-blue-300">Global Azure Puglia 2026</Link></li>
                            <li aria-hidden="true">/</li>
                            <li aria-current="page" className="text-blue-300">Gallery</li>
                        </ol>
                    </nav>

                    <section className="bg-gray-800 border border-gray-700 rounded-2xl p-6 md:p-8 shadow-lg">
                        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4 mb-6">
                            <div>
                                <h2 className="text-2xl md:text-3xl font-bold text-white mb-2">Momenti dall'evento</h2>
                                <p className="text-gray-400 max-w-2xl">
                                    Una selezione fotografica della giornata: community, talk, backstage e momenti condivisi durante la prima edizione pugliese del Global Azure.
                                </p>
                            </div>
                            <div className="text-sm text-gray-500">
                                Archivio statico pubblicato su GitHub Pages
                            </div>
                        </div>

                        {images.length > 0 ? (
                            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
                                {images.map((image, index) => (
                                    <button
                                        key={image.src}
                                        type="button"
                                        onClick={() => setActiveIndex(index)}
                                        className="group relative aspect-[4/3] overflow-hidden rounded-xl border border-gray-700 bg-gray-950 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-offset-2 focus:ring-offset-gray-900"
                                        aria-label={`Apri ${image.alt}`}
                                    >
                                        <Image
                                            src={image.src}
                                            alt={image.alt}
                                            fill
                                            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                                            className="object-cover transition-transform duration-300 group-hover:scale-[1.03]"
                                        />
                                        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                                        <div className="absolute left-4 bottom-4 text-left opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                                            <span className="inline-flex items-center px-3 py-1 rounded-full bg-white/90 text-gray-900 text-xs font-semibold">
                                                Apri foto {index + 1}
                                            </span>
                                        </div>
                                    </button>
                                ))}
                            </div>
                        ) : (
                            <div className="bg-gray-900 rounded-xl border border-gray-700 p-8 text-center text-gray-400">
                                Nessuna immagine trovata nella cartella della gallery.
                            </div>
                        )}
                    </section>
                </main>
            </div>

            <Lightbox
                open={activeIndex >= 0}
                index={activeIndex >= 0 ? activeIndex : 0}
                close={() => setActiveIndex(-1)}
                slides={images}
            />
        </div>
    );
};

export default GalleryAzureMeetupPugliaPage;