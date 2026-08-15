import Script from "next/script";

export function Analytics() {
  const gaId = process.env.NEXT_PUBLIC_GA_ID;
  const gscVerification = process.env.NEXT_PUBLIC_GSC_VERIFICATION;

  return (
    <>
      {/* Google Search Console Meta Verification Tag if provided */}
      {gscVerification && (
        <meta name="google-site-verification" content={gscVerification} />
      )}

      {/* Google Analytics Script if GA_ID provided */}
      {gaId && (
        <>
          <Script
            src={`https://www.googletagmanager.com/gtag/js?id=${gaId}`}
            strategy="afterInteractive"
          />
          <Script id="google-analytics" strategy="afterInteractive">
            {`
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());
              gtag('config', '${gaId}', {
                page_path: window.location.pathname,
              });
            `}
          </Script>
        </>
      )}
    </>
  );
}
