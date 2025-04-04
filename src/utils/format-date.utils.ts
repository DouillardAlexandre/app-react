const options: any = { weekday: "long", year: "numeric", month: "long", day: "numeric" }

export function formatDate(stringTimestamp: string | number): string{
  return new Date(parseInt(stringTimestamp+"", 10)).toLocaleDateString("fr-FR", options)
}