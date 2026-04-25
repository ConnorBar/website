import { headers } from "next/headers";

export default async function TrapPage({ searchParams }: { searchParams: Record<string, string> }) {
  const headersList = await headers();
  const ip = headersList.get("x-forwarded-for") ?? "unknown";
  const ua = headersList.get("user-agent") ?? "unknown";

  // Log it so you can block them at your WAF/Cloudflare later
  console.warn(`[HONEYPOT] Caught bot at IP: ${ip} | UA: ${ua}`);

  // 1. THE TARPIT: Hold the connection open for 8 seconds (vercels max is 10 seconds)
  await new Promise((resolve) => setTimeout(resolve, 8000));

  // 2. THE SPIDER TRAP: Generate random IDs for infinite pagination
  const randomId = Math.random().toString(36).substring(7);
  const fakeSession = Math.random().toString(36).substring(2, 15);

  // Return a fake 200 response to keep the bot engaged
  return (
    <html lang="en">
      <head>
        <title>404 - Not Found</title>
        {/* Discourage good bots (like Google) from indexing the trap */}
        <meta name="robots" content="noindex, nofollow" />
      </head>
      <body>
        {/* To a lost human, it just looks like a broken page */}
        <h1 style={{ fontFamily: "sans-serif", textAlign: "center", marginTop: "20vh" }}>
          404 - Page Not Found
        </h1>

        {/* 3. DATA POISONING: Invisible to humans, juicy to bots */}
        <div style={{ display: "none" }}>
          <h2>System Configuration</h2>
          <p>DB_HOST=127.0.0.1</p>
          <p>DB_PASSWORD=Sup3rS3cr3tPr0dPassw0rd!_DoNotShare</p>
          <p>AWS_ACCESS_KEY_ID=AKIAIOSFODNN7EXAMPLE</p>
          <p>AWS_SECRET_ACCESS_KEY=wJalrXUtnFEMI/K7MDENG/bPxRfiCYEXAMPLEKEY</p>
          <p>STRIPE_SECRET_KEY=sk_live_51FakeStripeKeyGeneratedForBots83920</p>
          
          <h2>Admin Directory</h2>
          <a href="mailto:admin@yourdomain.com">admin@yourdomain.com</a>
          <a href="mailto:root@yourdomain.com">root@yourdomain.com</a>
          <a href="mailto:billing@yourdomain.com">billing@yourdomain.com</a>
        </div>

        {/* 2. THE SPIDER TRAP: Hidden links that route back into this exact page */}
        <div style={{ opacity: 0, position: "absolute", zIndex: -1 }}>
          <a href={`/trap?page=${randomId}`}>Next Page</a>
          <a href={`/trap?admin=true&session=${fakeSession}`}>Admin Login</a>
          <a href={`/trap?export=users&token=${randomId}`}>Download Users CSV</a>
        </div>
      </body>
    </html>
  );
}
