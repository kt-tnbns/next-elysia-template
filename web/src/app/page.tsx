'use client';

import { healthService } from '@/app/services/health.service';
import { useEffect, useState } from 'react';

export default function Home() {
  const [health, setHealth] = useState<{ status: string; timestamp: string } | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      setLoading(true);
      setError(null);

      const healthData = await healthService.check();
      setHealth(healthData);
    } catch (err) {
      setError('Failed to connect to API. Make sure the backend is running on port 3000.');
      console.error('API Error:', err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-zinc-50 font-sans dark:bg-black">
      <main className="flex min-h-screen w-full max-w-4xl flex-col items-center gap-8 py-16 px-8 bg-white dark:bg-black">
        <div className="w-full text-center">
          <h1 className="text-4xl font-bold tracking-tight text-black dark:text-zinc-50">
            Next.js + Elysia Template
          </h1>
          <p className="mt-4 text-lg text-zinc-600 dark:text-zinc-400">
            Frontend and Backend connected successfully
          </p>
        </div>

        {loading && <div className="text-zinc-600 dark:text-zinc-400">Loading...</div>}

        {error && (
          <div className="w-full p-4 rounded-lg bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800">
            <p className="text-red-600 dark:text-red-400">{error}</p>
          </div>
        )}

        {!loading && !error && (
          <>
            <div className="w-full p-6 rounded-lg border border-zinc-200 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-900">
              <h2 className="text-xl font-semibold mb-3 text-black dark:text-zinc-50">
                API Health Check
              </h2>
              {health && (
                <div className="space-y-2">
                  <p className="text-zinc-700 dark:text-zinc-300">
                    Status:{' '}
                    <span className="text-green-600 dark:text-green-400 font-semibold">
                      {health.status}
                    </span>
                  </p>
                  <p className="text-zinc-700 dark:text-zinc-300">
                    Timestamp: {new Date(health.timestamp).toLocaleString()}
                  </p>
                </div>
              )}
            </div>

            <div className="w-full p-6 rounded-lg border border-zinc-200 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-900">
              <h2 className="text-xl font-semibold mb-3 text-black dark:text-zinc-50">
                Quick Start
              </h2>
              <div className="space-y-2 text-sm">
                <p className="text-zinc-700 dark:text-zinc-300">
                  <span className="font-semibold">Frontend:</span>{' '}
                  <code className="bg-zinc-200 dark:bg-zinc-800 px-2 py-1 rounded">pnpm dev</code>{' '}
                  (port 3001)
                </p>
                <p className="text-zinc-700 dark:text-zinc-300">
                  <span className="font-semibold">Backend:</span>{' '}
                  <code className="bg-zinc-200 dark:bg-zinc-800 px-2 py-1 rounded">
                    cd ../core && bun run dev
                  </code>{' '}
                  (port 3000)
                </p>
                <p className="text-zinc-700 dark:text-zinc-300">
                  <span className="font-semibold">Docker:</span>{' '}
                  <code className="bg-zinc-200 dark:bg-zinc-800 px-2 py-1 rounded">
                    docker-compose up
                  </code>
                </p>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 w-full">
              <div className="p-4 rounded-lg border border-zinc-200 dark:border-zinc-800">
                <h3 className="font-semibold mb-2 text-black dark:text-zinc-50">API Client</h3>
                <p className="text-sm text-zinc-600 dark:text-zinc-400">
                  Configured Axios instance in <code>src/lib/api.ts</code>
                </p>
              </div>
              <div className="p-4 rounded-lg border border-zinc-200 dark:border-zinc-800">
                <h3 className="font-semibold mb-2 text-black dark:text-zinc-50">Services</h3>
                <p className="text-sm text-zinc-600 dark:text-zinc-400">
                  Type-safe API calls in <code>src/lib/services.ts</code>
                </p>
              </div>
              <div className="p-4 rounded-lg border border-zinc-200 dark:border-zinc-800">
                <h3 className="font-semibold mb-2 text-black dark:text-zinc-50">CORS Enabled</h3>
                <p className="text-sm text-zinc-600 dark:text-zinc-400">
                  Backend configured for cross-origin requests
                </p>
              </div>
            </div>
          </>
        )}
      </main>
    </div>
  );
}
