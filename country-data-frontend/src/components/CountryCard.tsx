import React,{useState, useEffect} from 'react';
import Link from 'next/link';
import { offsetToTimezoneMap } from '../constants';
import Image from 'next/image';

interface CountryCardProps {
  country: {
    name: string;
    region: string;
    flag: string;
    code: string; // Use the `code` field 
  };
}
// Convert UTC offset to valid IANA timezone
const convertOffsetToTimezone = (offset:any) => {
    return offsetToTimezoneMap[offset] || offset;  // Default to original if no mapping exists
  };

/**
 * 
 * Country Card Component 
 */
const CountryCard: React.FC<CountryCardProps> = ({ country }) => {

    const [currentTime, setCurrentTime] = useState('');

    // Function to format time in 12-hour format for a given timezone
    const getCurrentTime = (timezone) => {
        const options = {
            hour: '2-digit',
            minute: '2-digit',
            second: '2-digit',
            hour12: true,  // 12-hour format
            timeZone: timezone
        };
      
        const time = new Date();
        return new Intl.DateTimeFormat('en-US', options).format(time);
    };
  
    useEffect(() => {

        // Convert UTC offset to IANA timezone if necessary
        const validTimezone = convertOffsetToTimezone(country.timezones);

        // Update the time every minute
        const interval = setInterval(() => {
            setCurrentTime(getCurrentTime(validTimezone));
        }, 60000); // Update every 60 seconds
  
        // Set initial time
        setCurrentTime(getCurrentTime(validTimezone));
  
        // Cleanup the interval on component unmount
        return () => clearInterval(interval);
    }, [country.timezones]);

    return (
        <Link href={`/countries/${country.code}`} passHref>
        <div className="bg-white rounded-lg shadow-md p-4 hover:shadow-lg transition-shadow cursor-pointer">
            {country.flag ? (
            <Image
                className="w-full h-32 object-cover rounded-t-lg"
                src={country.flag}
                alt={`Flag of ${country.name}`}
                width={200}
                height={300}
            />
            ) : (
            <p className="text-center">No Flag Available</p>
            )}
            <div className="mt-4 text-center">
            <h2 className="text-lg font-semibold">{country.name}</h2>
            <p className="text-gray-500 text-xl mt-2">Current Time: {currentTime}</p>
            <p className="text-gray-500">{country.region}</p>
            </div>
        </div>
        </Link>
    );
};

export default CountryCard;