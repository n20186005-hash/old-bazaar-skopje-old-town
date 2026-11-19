'use client';

import {useTranslations, useLocale} from 'next-intl';
import {useEffect, useRef, useState} from 'react';

// All fourteen original files remain in public/gallery. Image 1 is withheld
// from display because its bridge/river scene does not match this bazaar guide.
const photos = [
  {id: 8, en: 'Old Bazaar street and shopfronts', zh: '旧巴扎街巷与商铺'},
  {id: 2, en: 'Skopje riverfront and museum building', zh: '斯科普里河畔与博物馆建筑'},
  {id: 3, en: 'Mosque dome and minaret above the shops', zh: '商铺上方的清真寺圆顶与宣礼塔'},
  {id: 4, en: 'Brick-vaulted historic passage', zh: '历史建筑的砖拱廊道'},
  {id: 5, en: 'Stone objects beneath an arched gallery', zh: '拱廊下的石质展品'},
  {id: 6, en: 'Enclosed courtyard and wooden bell tower', zh: '围墙庭院与木质钟楼'},
  {id: 7, en: 'Courtyard with a two-storey gallery', zh: '带双层廊道的庭院'},
  {id: 9, en: 'Cafés and street lights after dark', zh: '夜色中的咖啡馆与街灯'},
  {id: 10, en: 'Illuminated museum façade at dusk', zh: '暮色中亮灯的博物馆立面'},
  {id: 11, en: 'Shaded lane through the bazaar', zh: '遮阳篷下的巴扎街巷'},
  {id: 12, en: 'Colourful umbrellas above a shopping lane', zh: '购物街巷上方的彩色雨伞'},
  {id: 13, en: 'Historic courtyard framed by an arch', zh: '拱门框景中的历史庭院'},
  {id: 14, en: 'Museum and bridge in central Skopje', zh: '斯科普里市中心的博物馆与桥梁'},
];
const PER_PAGE = 8;
export default function Gallery() {
  const t = useTranslations('gallery'), zh = useLocale() === 'zh';
  const [page, setPage] = useState(0), [index, setIndex] = useState(0), [open, setOpen] = useState(false);
  const dialog = useRef<HTMLDialogElement>(null), closer = useRef<HTMLButtonElement>(null), opener = useRef<HTMLButtonElement | null>(null);
  const pages = Math.ceil(photos.length / PER_PAGE);
  const caption = (photo: typeof photos[number]) => zh ? photo.zh : photo.en;
  const src = (photo: typeof photos[number]) => `/gallery/images (${photo.id}).jpg`;
  const move = (delta: number) => setIndex(value => (value + delta + photos.length) % photos.length);
  useEffect(() => {
    if (!open || !dialog.current) return;
    const element = dialog.current, previousOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    element.showModal();
    closer.current?.focus({preventScroll: true});
    return () => {
      element.close();
      document.body.style.overflow = previousOverflow;
      opener.current?.focus({preventScroll: true});
    };
  }, [open]);
  const labels = zh ? {open: '打开照片', close: '关闭大图', previous: '上一张照片', next: '下一张照片', previousPage: '上一组照片', nextPage: '下一组照片', viewer: '照片浏览'} : {open: 'Open photo', close: 'Close lightbox', previous: 'Previous photo', next: 'Next photo', previousPage: 'Previous gallery page', nextPage: 'Next gallery page', viewer: 'Photo viewer'};
  return <>
    <section id="gallery" className="section-padding" style={{background: 'var(--bg-secondary)'}}><div className="max-w-6xl mx-auto">
      <h2 className="font-display text-3xl sm:text-4xl font-semibold mb-2">{t('title')}</h2>
      <p className="mb-8" style={{color: 'var(--text-muted)'}}>{t('subtitle')}</p>
      <div className="w-12 h-0.5 mb-10" style={{background: 'var(--accent)'}} />
      <div className="grid grid-cols-2 md:grid-cols-4 auto-rows-[180px] sm:auto-rows-[200px] gap-3 sm:gap-4">
        {photos.slice(page * PER_PAGE, (page + 1) * PER_PAGE).map((photo, offset) => <button type="button" key={photo.id}
          className={`gallery-item block min-w-0 relative group text-left ${offset === 0 ? 'col-span-2 row-span-2' : ''}`}
          aria-label={`${labels.open}: ${caption(photo)}`} onClick={event => {opener.current = event.currentTarget; setIndex(page * PER_PAGE + offset); setOpen(true);}}>
          <img src={src(photo)} alt={caption(photo)} className="w-full h-full object-cover" loading="lazy" />
          <span className="absolute inset-x-0 bottom-0 bg-black/65 text-white text-xs sm:text-sm p-3">{caption(photo)}</span>
        </button>)}
      </div>
      <div className="flex flex-wrap justify-center mt-6 gap-5 items-center">
        <button type="button" className="nearby-related" aria-label={labels.previousPage} onClick={() => setPage(value => (value + pages - 1) % pages)}>←</button>
        <span aria-live="polite">{page + 1} / {pages}</span>
        <button type="button" className="nearby-related" aria-label={labels.nextPage} onClick={() => setPage(value => (value + 1) % pages)}>→</button>
        <a className="nearby-link text-sm" href="https://maps.app.goo.gl/xp3NTVJ17rh27znU9" target="_blank" rel="noopener noreferrer">{t('viewAll')}</a>
      </div>
    </div></section>
    <dialog ref={dialog} className="gallery-dialog" aria-label={labels.viewer} aria-describedby="gallery-caption"
      onCancel={() => setOpen(false)} onClick={event => {if (event.target === event.currentTarget) setOpen(false);}}
      onKeyDown={event => {if (event.key === 'ArrowLeft') {event.preventDefault(); move(-1);} if (event.key === 'ArrowRight') {event.preventDefault(); move(1);}}}>
      {open && <><button ref={closer} type="button" className="gallery-close" aria-label={labels.close} onClick={() => setOpen(false)}>✕</button>
        <button type="button" className="gallery-prev" aria-label={labels.previous} onClick={() => move(-1)}>←</button>
        <img src={src(photos[index])} alt={caption(photos[index])} />
        <button type="button" className="gallery-next" aria-label={labels.next} onClick={() => move(1)}>→</button>
        <p id="gallery-caption" className="gallery-caption" aria-live="polite">{index + 1} / {photos.length} · {caption(photos[index])}</p></>}
    </dialog>
  </>;
}
