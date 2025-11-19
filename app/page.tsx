"use client"

import { useState } from "react";
import createNewUrl from "../lib/createNewUrl";

export default function HomePage() {
  const [shortUrl, setShortUrl] = useState<string | null>(null);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const alias = (formData.get("alias") as string).trim();
    const targetUrl = (formData.get("targetUrl") as string).trim();

    const result = await createNewUrl(alias, targetUrl);
    setShortUrl(`${window.location.origin}/${result.alias}`);
  }

  return (
    <div>
      <h1>URL Shortener</h1>

      <form onSubmit={handleSubmit}>
        <div>
          <label>Alias</label>
          <input
            name="alias"
            required
          />
        </div>

        <div>
          <label>Target URL</label>
          <input
            name="targetUrl"
            required
          />
        </div>

        <button type="submit">Shorten</button>
      </form>

      {shortUrl && (
        <div>
          <p>Your shortened link:</p>
          <a href={shortUrl}>
            {shortUrl}
          </a>
        </div>
      )}
    </div>
  );
}
