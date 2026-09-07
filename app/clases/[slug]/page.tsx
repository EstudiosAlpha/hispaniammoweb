import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { classBySlug, classes, TIER_LABEL, TIER_LEVEL } from '../../lib/data';
import ClassDetails from '../../components/ClassDetails';

export function generateStaticParams() {
  return classes.map((c) => ({ slug: c.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const cls = classBySlug(slug);
  if (!cls) return { title: 'Clase no encontrada' };
  const title = cls.name + ' — ' + TIER_LABEL[cls.tier] + ' (' + TIER_LEVEL[cls.tier] + ')';
  return {
    title,
    description: cls.description,
    openGraph: { title: title + ' · HispaniaMMO', description: cls.description, images: [] },
    twitter: { title: title + ' · HispaniaMMO', description: cls.description, images: [] },
  };
}

export default async function ClassPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const cls = classBySlug(slug);
  if (!cls) notFound();
  return <main id="contenido" className="page-shell codex-page class-page"><ClassDetails cls={cls} /></main>;
}
