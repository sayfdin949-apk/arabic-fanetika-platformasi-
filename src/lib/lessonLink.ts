/**
 * `lessons.source_key` ("naz:3", "amal:7", "gram:12") ni tegishli dars
 * sahifasi route'iga aylantiradi. Darsning nomi endi `lessons.title`dan
 * to'g'ridan-to'g'ri o'qiladi (DB source-of-truth) — bu yerda faqat route
 * kerak, chunki marshrutlar bazada saqlanmaydi.
 */
export function sourceKeyToRoute(sourceKey: string): string {
  const [prefix, id] = sourceKey.split(":");
  switch (prefix) {
    case "naz":
      return `/dars/nazariy/${id}`;
    case "amal":
      return `/dars/amaliy/${id}`;
    case "gram":
      return `/grammatika/dars/${id}`;
    default:
      return "/dars";
  }
}
