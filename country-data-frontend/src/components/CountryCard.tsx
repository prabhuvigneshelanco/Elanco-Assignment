import React from "react";
import Image from "next/image";
import Link from "next/link";

interface CountryCardProps {
    code: string;
    name: string;
    flag: string;
    region: string;
}

export const CountryCard = ({ code, name, flag, region }: CountryCardProps) => {
  return (
        <Link href={`/countries/${encodeURIComponent(code)}`}>
            <div className="bg-white rounded-lg shadow-md p-4 flex flex-col items-center transition-all duration-300 ease-in-out hover:shadow-lg">
                {flag ? (
                    <div className="relative w-16 h-16">
                        <Image
                            className="object-contain"
                            src={flag}
                            alt={`Flag of ${name}`}
                            fill
                            sizes="64px"
                        />
                    </div>
                ) : (
                    <p className="text-center">No Flag Available</p>
                )}

                <div className="mt-4 text-center">
                    <h2 className="font-semibold">{name}</h2>
                    <p className="text-sm text-gray-600">{region}</p>
                </div>
            </div>
        </Link>
    )
};