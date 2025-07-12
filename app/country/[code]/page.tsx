import CountryDetail from "@/components/CountryDetail";
import { FC } from "react";

interface Props {
  params: Promise<{ code: string }>;
}

const CountryPage: FC<Props> = async ({ params }) => {
  const { code } = await params;

  return <CountryDetail countryCode={code} />;
};
export default CountryPage;
