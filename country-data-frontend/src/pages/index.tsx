import SearchBar from "@/src/components/SearchBar";
import CountryCard from "@/src/components/CountryCard";
import Header from "@/src/components/Header";
import CountryContextProvider from "@/src/contexts/CountryContext";

export default function Home() {

  return (
    <>
      <div className="p-6">
          <Header />
        <CountryContextProvider>
          <SearchBar />
          <CountryCard />
        </CountryContextProvider>
      </div>
    </>
  );
};