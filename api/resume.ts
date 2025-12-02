export const config = {
  runtime: "edge"
};

export default async function handler() {
  const url =
    "https://github.com/ravibrock/resume/releases/download/latest/resume.pdf";

  // fetch pdf from github → follows redirects automatically
  const upstream = await fetch(url);

  if (!upstream.ok || !upstream.body) {
    return new Response("failed to fetch pdf", { status: 502 });
  }

  // stream back EXACTLY as received
  return new Response(upstream.body, {
    headers: {
      "content-type": "application/pdf",
      "cache-control": "public, max-age=0, s-maxage=600"
    }
  });
}
