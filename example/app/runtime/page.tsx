'use client';

import useRuntimeConfig from 'next-impl-config/use-runtime-config';

export default function Page() {
  const config = useRuntimeConfig();

  if (!config) return <p>Config not ready</p>

  return (
    <section>
      <p style={{ whiteSpace: 'break-spaces' }}>
        {JSON.stringify(config, null, 2)}
      </p>
    </section>
  );
}
