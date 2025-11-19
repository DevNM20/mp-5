import { redirect } from "next/navigation";
import getUrlByAlias from "../../lib/getUrlByAlias";

interface Props {
  params: Promise<{ alias: string }>;
}

export default async function AliasPage({ params }: Props) {
  const { alias } = await params; 
  const targetUrl = await getUrlByAlias(alias);

  if (!targetUrl) {
    return <div>Alias not found</div>;
  }

  redirect(targetUrl);
}
