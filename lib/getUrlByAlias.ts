import getCollection, { URLS_COLLECTION } from "@/db";

export default async function getUrlByAlias(alias: string): Promise<string | null> {
  const urlsCollection = await getCollection(URLS_COLLECTION);
  const entry = await urlsCollection.findOne({ alias });
  return entry ? entry.targetUrl : null;
}