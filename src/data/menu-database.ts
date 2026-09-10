import type { SQLiteDatabase } from "expo-sqlite";

import type { MenuItem } from "@/types/menu";

const MENU_API_URL =
  "https://raw.githubusercontent.com/Meta-Mobile-Developer-PC/Working-With-Data-API/main/capstone.json";
const MENU_IMAGE_BASE_URL =
  "https://raw.githubusercontent.com/Meta-Mobile-Developer-PC/Working-With-Data-API/main/images";

/** Menu row shape returned by the remote course API. */
type ApiMenuItem = {
  name: string;
  price: number;
  description: string;
  category: string;
  image: string;
};

/**
 * Creates the local menu table when it does not already exist.
 *
 * @param db - The database opened by `SQLiteProvider`.
 * @returns A promise that resolves after the schema is ready.
 */
export async function migrateMenuDb(db: SQLiteDatabase) {
  await db.execAsync(`
    CREATE TABLE IF NOT EXISTS menu (
      id INTEGER PRIMARY KEY NOT NULL,
      name TEXT NOT NULL,
      price REAL NOT NULL,
      description TEXT NOT NULL,
      category TEXT NOT NULL,
      imageUrl TEXT NOT NULL
    );
  `);
}

/**
 * Seeds an empty menu cache and returns every available category.
 *
 * @param db - The open Little Lemon database.
 * @returns The alphabetically ordered menu categories.
 */
export async function prepareMenuDatabase(db: SQLiteDatabase) {
  const storedMenu = await db.getFirstAsync<{ count: number }>(
    "SELECT COUNT(*) AS count FROM menu",
  );

  if (!storedMenu?.count) {
    const menu = await fetchMenu();
    await saveMenu(db, menu);
  }

  const rows = await db.getAllAsync<{ category: string }>(
    "SELECT DISTINCT category FROM menu ORDER BY category",
  );

  return rows.map(({ category }) => category);
}

/**
 * Queries cached dishes using parameterized name and category predicates.
 *
 * Active filters are joined with `AND`, so a dish must match both the name
 * substring and one of the selected categories. With no filters, all rows are
 * returned.
 *
 * @param db - The open Little Lemon database.
 * @param searchQuery - Debounced dish-name text.
 * @param selectedCategories - Categories to match, or an empty set for all.
 * @returns Menu rows matching every active filter, ordered by local id.
 */
export async function queryMenu(
  db: SQLiteDatabase,
  searchQuery: string,
  selectedCategories: ReadonlySet<string>,
) {
  const clauses: string[] = [];
  const parameters: string[] = [];
  const normalizedQuery = searchQuery.trim();

  if (normalizedQuery) {
    clauses.push("name LIKE ? COLLATE NOCASE");
    parameters.push(`%${normalizedQuery}%`);
  }

  if (selectedCategories.size > 0) {
    const categories = [...selectedCategories];
    const placeholders = categories.map(() => "?").join(", ");

    clauses.push(`category IN (${placeholders})`);
    parameters.push(...categories);
  }

  const where = clauses.length > 0 ? ` WHERE ${clauses.join(" AND ")}` : "";

  return db.getAllAsync<MenuItem>(
    `SELECT id, name, price, description, category, imageUrl
     FROM menu${where}
     ORDER BY id`,
    parameters,
  );
}

/** Downloads the course menu and converts it to the local row shape. */
async function fetchMenu(): Promise<Omit<MenuItem, "id">[]> {
  const response = await fetch(MENU_API_URL);

  if (!response.ok) {
    throw new Error(`Menu request failed with status ${response.status}`);
  }

  const { menu } = (await response.json()) as { menu: ApiMenuItem[] };

  return menu.map(({ image, ...item }) => ({
    ...item,
    imageUrl: `${MENU_IMAGE_BASE_URL}/${image}`,
  }));
}

/** Persists fetched menu items in one SQLite transaction. */
async function saveMenu(db: SQLiteDatabase, menu: Omit<MenuItem, "id">[]) {
  await db.withTransactionAsync(async () => {
    for (const item of menu) {
      await db.runAsync(
        "INSERT INTO menu (name, price, description, category, imageUrl) VALUES (?, ?, ?, ?, ?)",
        item.name,
        item.price,
        item.description,
        item.category,
        item.imageUrl,
      );
    }
  });
}
