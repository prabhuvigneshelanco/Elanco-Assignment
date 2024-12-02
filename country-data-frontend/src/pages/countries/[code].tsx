import CountryDetail from "@/components/CountriesDetail";
import axios from "axios";
import { GetServerSideProps } from "next";

type Country = {
  name: string;
  flag: string;
  population: number;
  region: string;
  languages: { [key: string]: string };
  currency: { [key: string]: { name: string; symbol: string } };
};

export const getServerSideProps: GetServerSideProps = async (context) => {
  const { code } = context.params || {};
  if (!code) {
    return {
      notFound: true,
    };
  }

  try {
    const response = await axios.get<Country[]>(
      `${process.env.API_URL}/countries/${code}`
    );
    console.log("responseresponse", response);

    if (Object.keys(response.data).length === 0) {
      return { notFound: true };
    }

    return { props: { country: response.data } };
  } catch (error) {
    console.error("Error fetching country data:", error);
    return { notFound: true };
  }
};

function Countries({ country }: { country: Country }) {
  return <CountryDetail country={country} />;
}

export default Countries;
