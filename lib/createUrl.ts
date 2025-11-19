"use server";
 
import getCollection, { URLS_COLLECTION } from "@/db";

//Defines the shape of the object
export interface UrlProps {
  id: string;
  alias: string;
  targetUrl: string;
}
//Create a helper to check if the URL is valid
function isValidUrl(url: string): boolean {
  try {
    new URL(url); //Use built-in function that checks if URL is valid
    return true;
  } catch {
    return false;
  }
}

export default async function createNewUrl(
  alias: string,
  targetUrl: string
): Promise<UrlProps> {
  console.log("createNewUrl triggered with:", alias, targetUrl);

  if (!isValidUrl(targetUrl)) {
    console.log("Invalid URL detected:", targetUrl);
    throw new Error("Invalid URL provided");
  }

  const urlsCollection = await getCollection(URLS_COLLECTION);
  console.log("Connected to MongoDB, using collection:", URLS_COLLECTION);

  // Check if alias already exists
  const existing = await urlsCollection.findOne({ alias });
  console.log("Alias lookup result:", existing);

  //Different test cases
  if (existing) {
    console.log("Alias already taken:", alias);
    throw new Error("Alias already taken");
  }

  const res = await urlsCollection.insertOne({ alias, targetUrl });
  console.log("Insert result:", res);

  if (!res.acknowledged) {
    console.log("Insert failed for:", alias, targetUrl);
    throw new Error("DB insert failed");
  }

  const result = { id: res.insertedId.toHexString(), alias, targetUrl };
  console.log("Returning new URL object:", result);
  return result;
}
