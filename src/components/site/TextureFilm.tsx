import { useEffect, useRef, useState } from "react";
import { Pause, Play } from "lucide-react";
import { Button } from "@/components/ui/button";
import film from "@/assets/melanvee-texture-film.mp4.asset.json";

export function TextureFilm({ poster }: { poster: string }) {
  const video = useRef<HTMLVideoElement>(null);
  const [enabled, setEnabled] = useState(false);
  const [playing, setPlaying] = useState(false);
  const [failed, setFailed] = useState(false);

  useEffect(() => {
    const preference = window.matchMedia("(prefers-reduced-motion: reduce)");
    const update = () => {
      setEnabled(!preference.matches);
      if (preference.matches) video.current?.pause();
    };
    update();
    preference.addEventListener("change", update);
    return () => preference.removeEventListener("change", update);
  }, []);

  async function toggle() {
    const element = video.current;
    if (!element) {
      setEnabled(true);
      return;
    }
    if (element.paused) {
      try { await element.play(); } catch { setPlaying(false); }
    } else element.pause();
  }

  return (
    <>
      <img src={poster} alt="A woman wearing textured curls" className="absolute inset-0 h-full w-full object-cover" fetchPriority="high" />
      {enabled && !failed && (
        <video ref={video} src={film.url} poster={poster} autoPlay muted loop playsInline preload="metadata"
          className="absolute inset-0 h-full w-full object-cover" onPlay={() => setPlaying(true)} onPause={() => setPlaying(false)} onError={() => setFailed(true)} />
      )}
      {!failed && <Button variant="outline" size="icon" onClick={toggle} title={playing ? "Pause film" : "Play film"} aria-label={playing ? "Pause film" : "Play film"}
        className="absolute right-5 top-5 z-10 rounded-full border-cream/50 bg-burgundy/50 text-cream hover:bg-burgundy hover:text-cream">
        {playing ? <Pause /> : <Play />}
      </Button>}
    </>
  );
}