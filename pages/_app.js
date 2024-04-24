import Head from "next/head";
import "styles/global.scss";
import "github-markdown-css";

export default function App({ Component, pageProps }) {
  return (
    <>
      <Head>
        <title>Hasson‘s blog</title>
        <meta
          name="viewport"
          content="width=device-width,initial-scale=1,minimum-scale=1,maximum-scale=1,user-scalable=no,viewport-fit=cover"
        />
      </Head>
      <Component className="App" {...pageProps} />
    </>
  );
}
