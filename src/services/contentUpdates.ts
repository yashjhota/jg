/**
 * One-click content migration for the Nov 2026 developer brief.
 *
 * Seed files only reach Firestore on a brand-new database, so the live site needs this to pick up
 * the new events, gallery cards, news articles and settings. Every record has a fixed id and is
 * written with merge, so running it twice leaves the data unchanged (no duplicates).
 */
import { doc, writeBatch } from 'firebase/firestore';
import { db } from './firebase';
import { CMSStore, logActivity, sanitizeForFirestore } from './cmsStore';
import {
  LEGACY_SHIVIR_TITLE_PATTERN,
  NOV2026_EVENTS,
  NOV2026_GALLERY,
  NOV2026_NEWS,
  NOV2026_SETTINGS,
  RATRI_PRAVACHAN_CAPTION,
  RATRI_PRAVACHAN_TITLE_PATTERN,
  SHIVIR_EVENT_ID,
} from '../data/nov2026Content';

export interface UpdateReport {
  ok: boolean;
  lines: string[];
}

const EXPECTED_TESTIMONIALS = ['Dhruv', 'Virthi', 'Aadi'];

export async function applyNov2026Update(): Promise<UpdateReport> {
  const { events, gallery, testimonials } = CMSStore.getState();
  const lines: string[] = [];
  const batch = writeBatch(db);

  // Events. The Shivir card replaces the existing "3 Days!!!! Youth Workshop" record when there is one.
  const shivirSeed = NOV2026_EVENTS.find((e) => e.id === SHIVIR_EVENT_ID)!;
  const existingShivir = events.find(
    (e) =>
      !e.isDeleted &&
      (e.id === SHIVIR_EVENT_ID || LEGACY_SHIVIR_TITLE_PATTERN.test(e.title) || e.title === shivirSeed.title)
  );
  for (const ev of NOV2026_EVENTS) {
    if (ev.id === SHIVIR_EVENT_ID && existingShivir) {
      // Keep the existing poster and any registration form; replace the copy.
      batch.set(
        doc(db, 'events', existingShivir.id),
        sanitizeForFirestore({ ...shivirSeed, id: existingShivir.id }),
        { merge: true }
      );
      lines.push(`Event "${existingShivir.title}" updated to "${shivirSeed.title}" and linked to the Shivir page.`);
      continue;
    }
    batch.set(doc(db, 'events', ev.id), sanitizeForFirestore({ ...ev, createdAt: ev.createdAt ?? new Date().toISOString() }), {
      merge: true,
    });
  }
  lines.push(`${NOV2026_EVENTS.length - (existingShivir ? 1 : 0)} events written (1 upcoming, past events newest first).`);

  // Gallery: 5 new cards, plus a caption-only edit of the existing "Ratri Pravachan" card.
  for (const item of NOV2026_GALLERY) {
    batch.set(doc(db, 'gallery', item.id), sanitizeForFirestore({ ...item, createdAt: item.createdAt ?? new Date().toISOString() }), {
      merge: true,
    });
  }
  lines.push(`${NOV2026_GALLERY.length} gallery cards written.`);
  const ratri = gallery.find((g) => !g.isDeleted && RATRI_PRAVACHAN_TITLE_PATTERN.test(g.title));
  if (ratri) {
    batch.set(doc(db, 'gallery', ratri.id), { id: ratri.id, title: ratri.title, category: ratri.category, caption: RATRI_PRAVACHAN_CAPTION }, { merge: true });
    lines.push(`Gallery card "${ratri.title}": caption updated, image kept.`);
  } else {
    lines.push('Gallery card "Ratri Pravachan" not found — its caption was not changed.');
  }

  // News: 3 articles.
  for (const article of NOV2026_NEWS) {
    batch.set(doc(db, 'news', article.id), sanitizeForFirestore(article), { merge: true });
  }
  lines.push(`${NOV2026_NEWS.length} news articles written.`);

  // Settings: Instagram, X, Telegram, email and the hero copy.
  batch.set(doc(db, 'settings', 'site_settings'), sanitizeForFirestore(NOV2026_SETTINGS), { merge: true });
  lines.push('Site settings updated: Instagram @jaingenius.tcm, X, Telegram, admin@jaingenius.org, hero copy.');

  try {
    await batch.commit();
  } catch (err) {
    const msg = err instanceof Error ? err.message : String(err);
    return { ok: false, lines: [`Nothing was saved. Firestore said: ${msg}`] };
  }

  // Testimonials are entered by the team, so only report on them.
  const readyNames = testimonials
    .filter((t) => !t.isDeleted && t.status === 'ready')
    .map((t) => (t.studentName || t.name || '').trim())
    .filter(Boolean);
  const missing = EXPECTED_TESTIMONIALS.filter(
    (name) => !readyNames.some((n) => n.toLowerCase().includes(name.toLowerCase()))
  );
  lines.push(
    missing.length === 0
      ? 'Testimonials: Dhruv, Virthi and Aadi are published.'
      : `Testimonials: not yet published for ${missing.join(', ')}. Add them in the Testimonials tab (status "ready").`
  );

  logActivity('import', 'system', 'Applied the Nov 2026 site update (events, gallery, news, settings).');
  return { ok: true, lines };
}
