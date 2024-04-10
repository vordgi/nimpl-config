import { buildConfig } from '@nimpl/config/build-config';

export default function Page() {
  return (
    <section>
      <p style={{ whiteSpace: 'break-spaces' }}>
        {JSON.stringify(buildConfig, null, 2)}
      </p>
    </section>
  );
}
