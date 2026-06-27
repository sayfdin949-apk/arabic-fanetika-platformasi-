import { useState, useEffect } from "react";
import { store } from "./storage";

export function useLessonImages(type: "nazariy" | "amaliy", id: number) {
  const key = `lesson_imgs_${type}_${id}`;
  const [images, setImages] = useState<string[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let alive = true;
    store.get<string[]>(key).then((imgs) => {
      if (alive) { setImages(imgs ?? []); setLoading(false); }
    });
    return () => { alive = false; };
  }, [key]);

  const add = async (files: FileList) => {
    const toBase64 = (f: File) =>
      new Promise<string>((res) => {
        const r = new FileReader();
        r.onload = () => res(String(r.result));
        r.readAsDataURL(f);
      });
    const newImgs = await Promise.all(Array.from(files).map(toBase64));
    const next = [...images, ...newImgs];
    setImages(next);
    await store.set(key, next);
  };

  const remove = async (idx: number) => {
    const next = images.filter((_, i) => i !== idx);
    setImages(next);
    await store.set(key, next);
  };

  return { images, loading, add, remove };
}
