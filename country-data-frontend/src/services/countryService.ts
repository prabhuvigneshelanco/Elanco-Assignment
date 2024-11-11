export const filterCountries = (countries: Array<any>, searchTerm: string) => {
    return countries.filter((country: any) =>
        country.name.toLowerCase().includes(searchTerm.toLowerCase())
    )
}