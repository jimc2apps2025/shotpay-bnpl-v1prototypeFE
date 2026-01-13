'use client';

import { useEffect, useRef, useState } from 'react';

type Props = {
  /** Maximum hero height (caps at 500px by default) */
  maxHeightPx?: number;

  /**
   * Width/height ratio of the banner image (e.g. 2400/900).
   * This drives responsive height as the screen width changes.
   */
  aspectRatio?: number;

  backgroundImageUrl: string;
  backgroundColor?: string;
  videoUrl: string;
};

export default function HeroVideoModal({
  maxHeightPx = 500,
  aspectRatio = 2560 / 938, // TODO: set this to your banner's real ratio
  backgroundImageUrl,
  backgroundColor = '#0C0D0C',
  videoUrl,
}: Props) {
  const [open, setOpen] = useState(false);
  const videoRef = useRef<HTMLVideoElement | null>(null);

  // Lock page scroll when modal is open
  useEffect(() => {
	if (!open) return;
	const prev = document.body.style.overflow;
	document.body.style.overflow = 'hidden';
	return () => {
	  document.body.style.overflow = prev;
	};
  }, [open]);

  // Start playback on open
  useEffect(() => {
	if (!open) return;
	const v = videoRef.current;
	if (!v) return;
	v.currentTime = 0;
	const p = v.play();
	if (p?.catch) p.catch(() => {});
  }, [open]);

  const close = () => {
	const v = videoRef.current;
	if (v) {
	  v.pause();
	  v.currentTime = 0;
	}
	setOpen(false);
  };

  return (
	<>
	  <section
		className="w-full bg-center bg-no-repeat bg-contain cursor-pointer select-none relative"
		style={{
		  backgroundColor,
		  backgroundImage: `url('${backgroundImageUrl}')`,

		  // ✅ Responsive height: follows image aspect ratio, but never exceeds maxHeightPx
		  aspectRatio: String(aspectRatio),
		  maxHeight: `${maxHeightPx}px`,

		  // Optional: prevents it from getting too tiny on very small screens
		  // minHeight: '220px',
		}}
		role="button"
		tabIndex={0}
		aria-label="Play video"
		onClick={() => setOpen(true)}
		onKeyDown={(e) => {
		  if (e.key === 'Enter' || e.key === ' ') setOpen(true);
		}}
	  />

	  {open && (
		<div
		  className="fixed inset-0 z-[9999] bg-black/80 flex items-center justify-center p-4"
		  onClick={close}
		>
		  <div
			className="w-full max-w-4xl bg-black rounded-xl overflow-hidden relative"
			onClick={(e) => e.stopPropagation()}
		  >
			<button
			  onClick={close}
			  className="absolute top-3 right-3 z-10 bg-white/10 hover:bg-white/20 text-white rounded-full px-3 py-2"
			  aria-label="Close video"
			>
			  ✕
			</button>

			<div className="w-full aspect-video bg-black">
			  <video
				ref={videoRef}
				className="w-full h-full"
				controls
				playsInline
				preload="metadata"
			  >
				<source src={videoUrl} type="video/mp4" />
				Your browser does not support HTML5 video.
			  </video>
			</div>
		  </div>
		</div>
	  )}
	</>
  );
}
