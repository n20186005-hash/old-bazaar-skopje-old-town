// This page only renders when the app is built statically (output: 'export')
// For dynamic deployments, the middleware will intercept requests to `/`
// and redirect to the default locale (e.g. `/zh`).
export default function RootPage() {
  return (
    <html>
      <head>
        <meta httpEquiv="refresh" content="0;url=/zh" />
      </head>
      <body>
        <script dangerouslySetInnerHTML={{ __html: `window.location.replace('/zh')` }} />
      </body>
    </html>
  );
}