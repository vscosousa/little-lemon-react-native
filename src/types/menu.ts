/** A dish stored in the local menu database. */
export type MenuItem = {
  /** Local SQLite row identifier. */
  id: number;
  /** Display name of the dish. */
  name: string;
  /** Dish price in US dollars. */
  price: number;
  /** Short menu description. */
  description: string;
  /** Category used by the delivery filter. */
  category: string;
  /** Remote URL for the dish thumbnail. */
  imageUrl: string;
};

/** User-controlled filters applied to the menu query. */
export type MenuFilters = {
  /** Raw text entered in the dish search field. */
  searchQuery: string;
  /** Categories that rows must belong to; an empty set matches all. */
  selectedCategories: ReadonlySet<string>;
};
