export type CountryOption = {
  name: string;
  timezones: string[];
};

/** Primary IANA zones per country. Multi-zone countries list the usual business options. */
export const COUNTRIES: CountryOption[] = [
  { name: "Pakistan", timezones: ["Asia/Karachi"] },
  { name: "United Arab Emirates", timezones: ["Asia/Dubai"] },
  { name: "Saudi Arabia", timezones: ["Asia/Riyadh"] },
  { name: "Qatar", timezones: ["Asia/Qatar"] },
  { name: "Bahrain", timezones: ["Asia/Bahrain"] },
  { name: "Kuwait", timezones: ["Asia/Kuwait"] },
  { name: "Oman", timezones: ["Asia/Muscat"] },
  { name: "United States", timezones: ["America/New_York", "America/Chicago", "America/Denver", "America/Los_Angeles", "America/Anchorage", "Pacific/Honolulu"] },
  { name: "United Kingdom", timezones: ["Europe/London"] },
  { name: "Canada", timezones: ["America/Toronto", "America/Winnipeg", "America/Edmonton", "America/Vancouver", "America/Halifax"] },
  { name: "Australia", timezones: ["Australia/Sydney", "Australia/Melbourne", "Australia/Brisbane", "Australia/Adelaide", "Australia/Perth"] },
  { name: "Germany", timezones: ["Europe/Berlin"] },
  { name: "France", timezones: ["Europe/Paris"] },
  { name: "Netherlands", timezones: ["Europe/Amsterdam"] },
  { name: "India", timezones: ["Asia/Kolkata"] },
  { name: "Bangladesh", timezones: ["Asia/Dhaka"] },
  { name: "Sri Lanka", timezones: ["Asia/Colombo"] },
  { name: "Afghanistan", timezones: ["Asia/Kabul"] },
  { name: "Iran", timezones: ["Asia/Tehran"] },
  { name: "Turkey", timezones: ["Europe/Istanbul"] },
  { name: "Egypt", timezones: ["Africa/Cairo"] },
  { name: "South Africa", timezones: ["Africa/Johannesburg"] },
  { name: "Nigeria", timezones: ["Africa/Lagos"] },
  { name: "Kenya", timezones: ["Africa/Nairobi"] },
  { name: "Ghana", timezones: ["Africa/Accra"] },
  { name: "Morocco", timezones: ["Africa/Casablanca"] },
  { name: "China", timezones: ["Asia/Shanghai"] },
  { name: "Japan", timezones: ["Asia/Tokyo"] },
  { name: "South Korea", timezones: ["Asia/Seoul"] },
  { name: "Singapore", timezones: ["Asia/Singapore"] },
  { name: "Malaysia", timezones: ["Asia/Kuala_Lumpur"] },
  { name: "Indonesia", timezones: ["Asia/Jakarta", "Asia/Makassar", "Asia/Jayapura"] },
  { name: "Thailand", timezones: ["Asia/Bangkok"] },
  { name: "Vietnam", timezones: ["Asia/Ho_Chi_Minh"] },
  { name: "Philippines", timezones: ["Asia/Manila"] },
  { name: "Hong Kong", timezones: ["Asia/Hong_Kong"] },
  { name: "Taiwan", timezones: ["Asia/Taipei"] },
  { name: "New Zealand", timezones: ["Pacific/Auckland"] },
  { name: "Ireland", timezones: ["Europe/Dublin"] },
  { name: "Spain", timezones: ["Europe/Madrid"] },
  { name: "Italy", timezones: ["Europe/Rome"] },
  { name: "Portugal", timezones: ["Europe/Lisbon"] },
  { name: "Belgium", timezones: ["Europe/Brussels"] },
  { name: "Switzerland", timezones: ["Europe/Zurich"] },
  { name: "Austria", timezones: ["Europe/Vienna"] },
  { name: "Sweden", timezones: ["Europe/Stockholm"] },
  { name: "Norway", timezones: ["Europe/Oslo"] },
  { name: "Denmark", timezones: ["Europe/Copenhagen"] },
  { name: "Finland", timezones: ["Europe/Helsinki"] },
  { name: "Poland", timezones: ["Europe/Warsaw"] },
  { name: "Czech Republic", timezones: ["Europe/Prague"] },
  { name: "Romania", timezones: ["Europe/Bucharest"] },
  { name: "Greece", timezones: ["Europe/Athens"] },
  { name: "Ukraine", timezones: ["Europe/Kyiv"] },
  { name: "Russia", timezones: ["Europe/Moscow", "Asia/Yekaterinburg", "Asia/Novosibirsk", "Asia/Vladivostok"] },
  { name: "Brazil", timezones: ["America/Sao_Paulo", "America/Manaus", "America/Fortaleza", "America/Recife"] },
  { name: "Mexico", timezones: ["America/Mexico_City", "America/Monterrey", "America/Tijuana", "America/Cancun"] },
  { name: "Argentina", timezones: ["America/Argentina/Buenos_Aires"] },
  { name: "Chile", timezones: ["America/Santiago"] },
  { name: "Colombia", timezones: ["America/Bogota"] },
  { name: "Peru", timezones: ["America/Lima"] },
  { name: "Jordan", timezones: ["Asia/Amman"] },
  { name: "Lebanon", timezones: ["Asia/Beirut"] },
  { name: "Iraq", timezones: ["Asia/Baghdad"] },
  { name: "Israel", timezones: ["Asia/Jerusalem"] },
  { name: "Nepal", timezones: ["Asia/Kathmandu"] },
  { name: "Other", timezones: ["UTC"] },
];

export const CONSULTATION_BUDGETS = [
  "To be discussed",
  "Under $500",
  "$500 – $1,000",
  "$1,000 – $2,500",
  "$2,500 – $5,000",
  "$5,000+",
];

export const CONSULTATION_TIME_SLOTS = [
  "09:00",
  "09:30",
  "10:00",
  "10:30",
  "11:00",
  "11:30",
  "12:00",
  "12:30",
  "13:00",
  "13:30",
  "14:00",
  "14:30",
  "15:00",
  "15:30",
  "16:00",
  "16:30",
  "17:00",
  "17:30",
  "18:00",
];

export function timezonesForCountry(name: string) {
  return COUNTRIES.find((country) => country.name === name)?.timezones ?? [];
}

export function formatTimezoneLabel(iana: string) {
  try {
    const parts = new Intl.DateTimeFormat("en-GB", {
      timeZone: iana,
      timeZoneName: "shortOffset",
      hour: "2-digit",
      minute: "2-digit",
      hour12: false,
    }).formatToParts(new Date());
    const offset = parts.find((part) => part.type === "timeZoneName")?.value ?? "";
    const city = iana.split("/").pop()?.replaceAll("_", " ") ?? iana;
    return `${city} · ${offset}`;
  } catch {
    return iana;
  }
}
