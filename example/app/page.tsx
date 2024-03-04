import Link from 'next/link';

export default function Page() {
  return (
    <section>
      <p>
        <Link href="/api/config/server">
          Server (/app/api/config/server/route.tsx)
        </Link>
      </p>
      <p>
        <Link href="/runtime">
          Runtime (/app/runtime/page.tsx)
        </Link>
      </p>
      <p>
        <Link href="/build">
          Build (/app/build/page.tsx)
        </Link>
      </p>
      <p>
        <Link href="/postbuild">
          Postbuild (/middleware.tsx)
        </Link>
      </p>
      <p>
        <Link href="https://github.com/vordgi/next-impl-config/tree/main/example">
          Example github
        </Link>
      </p>
    </section>
  );
}
