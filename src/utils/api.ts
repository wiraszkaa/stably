import { Entry } from "./types";

export async function addEntry(entry: Entry): Promise<void> {
  const path = entry.id ? `/${entry.id}.json` : ".json";
  const response = await fetch(
    `${import.meta.env.VITE_DATABASE}/entries${path}`,
    {
      method: entry.id ? "PUT" : "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(entry),
    }
  );

  if (!response.ok) throw new Error("Dodanie zapisu nie powiodło się!");
}

export async function getEntries(): Promise<Entry[]> {
  const response = await fetch(`${import.meta.env.VITE_DATABASE}/entries.json`);

  if (!response.ok) throw new Error("Nie udało się załadować zapisów!");

  const data: { [key in string]: Entry } | null = await response.json();

  return Object.entries(data || {}).map(([id, entry]) => ({
    ...entry,
    id,
  }));
}

export async function removeEntry(id: string): Promise<void> {
  const response = await fetch(
    `${import.meta.env.VITE_DATABASE}/entries/${id}.json`,
    {
      method: "DELETE",
    }
  );
  if (!response.ok) throw new Error("Usunięcie zapisu nie powiodło się!");
}
