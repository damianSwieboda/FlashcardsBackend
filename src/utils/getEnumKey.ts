export default function getEnumKey(abbreviation: string, _enum: any): string | undefined {
  const keys = Object.keys(_enum);
  const foundKey = keys.find((key) => _enum[key] === abbreviation.toLowerCase());

  return foundKey ? foundKey : undefined;
}
