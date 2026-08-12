/**
 * Home page photo gallery.
 *
 * Drop images into `public/gallery/` and list them here. Every entry needs real
 * alt text describing what is in the photo — this is a site about disability and
 * dignity, and screen-reader users are part of its audience.
 *
 * While this list is empty the gallery section does not render at all, so the
 * page never shows empty frames or "coming soon" placeholders.
 */

export type GalleryImage = {
  src: string;
  alt: string;
  width: number;
  height: number;
};

export const gallery: GalleryImage[] = [];
