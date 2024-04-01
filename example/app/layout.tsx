import RuntimeConfigProvider from '@nimpl/config/runtime-config-provider';

export const metadata = {
  title: '@nimpl/config Example',
  description: 'Example for @nimpl/config package',
  metadataBase: new URL('https://nimpl-config-example.vercel.app'),
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
