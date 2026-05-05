import "@/styles/globals.css";
import "yet-another-react-lightbox/styles.css";
import type { AppProps } from "next/app";

export default function App({ Component, pageProps }: AppProps) {
  return <Component {...pageProps} />;
}
