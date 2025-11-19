import { useState } from "react";

type Action = (formData: FormData) => Promise<{ alias: string }>;

export default function FormClient({ action }: { action: Action }) {
  const [alias, setAlias] = useState("");
  const [targetUrl, setTargetUrl] = useState("");
  const [shortened, setShortened] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setError(null);
    setIsSubmitting(true);

    const fd = new FormData(e.currentTarget);

    try {
      const res = await action(fd);
      const origin =
        typeof window !== "undefined" ? window.location.origin : "";
      setShortened(`${origin}/${res.alias}`);
    } catch (e) {
      console.error(e);
      setError("Something went wrong. Please try again later.");
  } 
}

  function copyToClipboard() {
    if (shortened) {
      navigator.clipboard.writeText(shortened);
    }
  }

  return (
    <div>
      <form onSubmit={onSubmit}>
        <div>
          <label>Alias</label>
          <input
            name="alias"
            value={alias}
            onChange={(e) => setAlias(e.target.value)}
            required
          />
        </div>

        <div>
          <label>Target URL</label>
          <input
            name="targetUrl"
            value={targetUrl}
            onChange={(e) => setTargetUrl(e.target.value)}
            required
          />
        </div>

        <button type="submit" disabled={isSubmitting}>
          {isSubmitting ? "Creating..." : "Shorten URL"}
        </button>
      </form>

      {error && <p style={{ color: "red" }}>{error}</p>}

      {shortened && (
        <div>
          <p>Shortened URL</p>
          <a href={shortened}>{shortened}</a>
          <button onClick={copyToClipboard}>Copy</button>
        </div>
      )}
    </div>
  );
}
