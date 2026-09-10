import { useEffect, useState } from "react";
import { useSQLiteContext } from "expo-sqlite";

import { prepareMenuDatabase, queryMenu } from "@/data/menu-database";
import { useDebouncedValue } from "@/hooks/use-debounced-value";
import type { MenuFilters, MenuItem } from "@/types/menu";

const SEARCH_DEBOUNCE_MS = 500;

/**
 * Provides the locally cached menu filtered through SQLite.
 *
 * Dish-name searches wait 500 ms before querying. Category changes apply
 * immediately, and SQLite combines active name and category filters with
 * `AND`.
 *
 * @param filters - The current dish-name query and selected categories.
 * @returns The filtered menu, available categories, and request state.
 */
export function useMenu({ searchQuery, selectedCategories }: MenuFilters) {
  const db = useSQLiteContext();
  const debouncedQuery = useDebouncedValue(
    searchQuery,
    SEARCH_DEBOUNCE_MS,
  );
  const [menu, setMenu] = useState<MenuItem[]>([]);
  const [categories, setCategories] = useState<string[]>([]);
  const [isDatabaseReady, setIsDatabaseReady] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    let isActive = true;

    async function prepareDatabase() {
      try {
        const availableCategories = await prepareMenuDatabase(db);

        if (isActive) {
          setCategories(availableCategories);
          setIsDatabaseReady(true);
        }
      } catch {
        if (isActive) {
          setError(true);
          setIsLoading(false);
        }
      }
    }

    void prepareDatabase();

    return () => {
      isActive = false;
    };
  }, [db]);

  useEffect(() => {
    if (!isDatabaseReady) return;

    let isActive = true;

    async function loadMenu() {
      try {
        const filteredMenu = await queryMenu(
          db,
          debouncedQuery,
          selectedCategories,
        );

        if (isActive) {
          setMenu(filteredMenu);
          setError(false);
        }
      } catch {
        if (isActive) setError(true);
      } finally {
        if (isActive) setIsLoading(false);
      }
    }

    void loadMenu();

    return () => {
      isActive = false;
    };
  }, [db, debouncedQuery, isDatabaseReady, selectedCategories]);

  return { menu, categories, isLoading, error };
}
