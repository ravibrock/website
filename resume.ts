import type { VercelRequest, VercelResponse } from '@vercel/node';
export default async function handler(_: VercelRequest, res: VercelResponse) {
  const ghu = 'https://raw.githubusercontent.com/<user>/<repo>/<commit-or-branch>/resume.pdf';
  const ghRes = await fetch(ghu);
  if (!ghRes.ok || !ghRes.body) return res.status(404).send('not found');

  res.setHeader('content-type', 'application/pdf');
  res.setHeader('content-disposition', 'inline; filename="resume.pdf"');
  res.setHeader('cache-control', 'public, max-age=300');
  // stream through
  for await (const chunk of ghRes.body as any) res.write(chunk);
  res.end();
}
