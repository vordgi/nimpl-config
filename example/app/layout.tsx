import RuntimeConfigProvider from 'next-impl-config/runtime-config-provider';

export const metadata = {
  title: 'Next-impl-config Example',
  description: 'Example for next-impl-config package',
  metadataBase: new URL('https://next-impl-config-example.vercel.app'),
};

export default function RootLayout(props: {
  children: React.ReactNode;
}) {
  return (
    <html>
      <body>
        <RuntimeConfigProvider apiPath='/api/config/runtime'>
          <main>
            {props.children}
          </main>
        </RuntimeConfigProvider>
      </body>
    </html>
  );
}
