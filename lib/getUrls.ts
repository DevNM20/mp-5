import getCollection, { URLS_COLLECTION } from "@/db";
import { UrlProps } from "@/types";

export default async function getAllUrls(): Promise<UrlProps[]> {
  const urlsCollection = await getCollection(URLS_COLLECTION);
  const data = await urlsCollection.find().toArray();

  const urls: UrlProps[] = data.map((u: any) => ({
    id: u._id,
    alias: u.alias,
    url: u.url,
    createdAt: u.createdAt,
  }));
  
  return urls.reverse();
}
