import { useState, useEffect } from "react";
import { store } from "./storage";

export interface AudioTrack {
  name: string;
  src: string;
}

export function useLessonAudio(type: "nazariy" | "amaliy", id: number) {
  const key = `lesson_audio_${type}_${id}`;
  const [tracks, setTracks] = useState<AudioTrack[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let alive = true;
    store.get<AudioTrack[]>(key).then((data) => {
      if (alive) { setTracks(data ?? []); setLoading(false); }
    });
    return () => { alive = false; };
  }, [key]);

  const add = async (files: FileList) => {
    const MAX_MB = 3;
    const toBase64 = (f: File) =>
      new Promise<AudioTrack | null>((res) => {
        if (f.size > MAX_MB * 1024 * 1024) { res(null); return; }
        const r = new FileReader();
        r.onload = () => res({ name: f.name, src: String(r.result) });
        r.readAsDataURL(f);
      });
    const results = await Promise.all(Array.from(files).map(toBase64));
    const newTracks = results.filter((t): t is AudioTrack => t !== null);
    const next = [...tracks, ...newTracks];
    setTracks(next);
    await store.set(key, next);
    return results.length - newTracks.length; // number rejected
  };

  const remove = async (idx: number) => {
    const next = tracks.filter((_, i) => i !== idx);
    setTracks(next);
    await store.set(key, next);
  };

  return { tracks, loading, add, remove };
}
