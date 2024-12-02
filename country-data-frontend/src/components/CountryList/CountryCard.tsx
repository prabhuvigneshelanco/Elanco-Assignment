import Image from "next/image";
import Link from "next/link";

type CountryCardProps = {
  name: string;
  flag: string | null;
  region: string;
  code: string;
};

export default function CountryCard({
  name,
  flag,
  region,
  code,
}: CountryCardProps) {
  return (
    <Link href={`/countries/${code}`}>
      <div className="bg-white rounded-lg shadow-md p-4 text-center">
        {flag ? (
          <Image
            className="mx-auto object-cover rounded-md w-16 h-16"
            src={flag}
            alt={`Flag of ${name}`}
            width={64}
            height={64}
          />
        ) : (
          <p className="text-gray-500 italic">No Flag Available</p>
        )}
        <div className="mt-4">
          <h2 className="text-lg font-semibold">{name}</h2>
          <p className="text-gray-500">{region}</p>
        </div>
      </div>
    </Link>
  );
}
