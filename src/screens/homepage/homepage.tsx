import { useRef, useState } from "react";
import {
  type FlatList,
  Image,
  KeyboardAvoidingView,
  type LayoutChangeEvent,
  type ListRenderItemInfo,
  Platform,
  Text,
  View,
} from "react-native";
import { StickyHeaderFlatList } from "react-native-sticky-parallax-header";

import { CategoryFilter } from "@/components/category-filter/category-filter";
import { Header } from "@/components/header/header";
import { MenuItem } from "@/components/menu-item/menu-item";
import { SearchBar } from "@/components/search-bar/search-bar";
import { spacing } from "@/constants/theme";
import { useUser } from "@/context/user-context";
import { useMenu } from "@/hooks/use-menu";
import type { MenuItem as MenuItemData } from "@/types/menu";
import { getInitials } from "@/utils/profile";

import styles from "./styles";

/**
 * Displays the restaurant hero, sticky search, delivery categories, and menu.
 *
 * The parallax list collapses the hero while keeping search visible. Search
 * text and category selections are passed to {@link useMenu}, which performs
 * the actual filtering in SQLite.
 *
 * @returns The rendered screen.
 */
export default function Homepage() {
  const { profile } = useUser();
  const listRef = useRef<FlatList<MenuItemData>>(null);
  const [bodyHeight, setBodyHeight] = useState(0);
  const [heroHeight, setHeroHeight] = useState(0);
  const [tabsHeight, setTabsHeight] = useState(0);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategories, setSelectedCategories] = useState<Set<string>>(
    new Set(),
  );
  const { menu, categories, isLoading, error } = useMenu({
    searchQuery,
    selectedCategories,
  });
  const initials = getInitials(profile.firstName, profile.lastName);
  // Android leaves the list's top padding (the pinned search bar, added by the
  // library) out of its scroll range, so that much of the end is unreachable.
  const androidInset = Platform.OS === "android" ? tabsHeight : 0;

  function toggleCategory(category: string) {
    setSelectedCategories((current) => {
      const next = new Set(current);
      if (next.has(category)) {
        next.delete(category);
      } else {
        next.add(category);
      }
      return next;
    });
  }

  // Collapses the hero so the pinned search bar sits above the keyboard.
  function handleSearchFocus() {
    listRef.current?.scrollToOffset({ offset: heroHeight, animated: true });
  }

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === "ios" ? "padding" : undefined}
    >
      <Header
        showAvatar
        avatarUri={profile.imageUri}
        avatarInitials={initials}
        variant="light"
      />

      <View
        onLayout={(event) => setBodyHeight(event.nativeEvent.layout.height)}
        style={styles.body}
      >
        <StickyHeaderFlatList<MenuItemData>
          ref={listRef}
          contentContainerStyle={[
            styles.content,
            {
              minHeight: bodyHeight + heroHeight - tabsHeight + androidInset,
              paddingBottom: spacing["2xl"] - tabsHeight + androidInset,
            },
          ]}
          data={menu}
          ItemSeparatorComponent={() => <View style={styles.separator} />}
          keyExtractor={(item: MenuItemData) => String(item.id)}
          keyboardDismissMode="on-drag"
          keyboardShouldPersistTaps="handled"
          ListEmptyComponent={
            <Text style={styles.emptyText}>
              {isLoading
                ? "Loading menu…"
                : error
                  ? "Unable to load the menu. Please try again later."
                  : "No dishes match your search."}
            </Text>
          }
          ListHeaderComponent={
            <View style={styles.listHeader}>
              <Text style={styles.sectionTitle}>Order for delivery!</Text>

              <CategoryFilter
                categories={categories}
                selected={selectedCategories}
                onToggle={toggleCategory}
              />

              <View style={styles.separator} />
            </View>
          }
          onHeaderLayout={(event: LayoutChangeEvent) =>
            setHeroHeight(event.nativeEvent.layout.height)
          }
          onTabsLayout={(event: LayoutChangeEvent) =>
            setTabsHeight(event.nativeEvent.layout.height)
          }
          renderHeader={() => (
            <View style={styles.hero}>
              <Image
                accessibilityLabel="Chef plating appetizers"
                source={require("../../../assets/images/hero.jpg")}
                style={styles.heroImage}
              />

              <Text style={styles.heroTitle}>Little Lemon</Text>
              <Text style={styles.heroSubtitle}>Chicago</Text>
              <Text style={styles.heroDescription}>
                We are a family owned Mediterranean restaurant, focused on
                traditional recipes served with a modern twist.
              </Text>
            </View>
          )}
          renderTabs={() => (
            <View style={styles.heroPinned}>
              <SearchBar
                value={searchQuery}
                onChangeText={setSearchQuery}
                onFocus={handleSearchFocus}
              />
            </View>
          )}
          renderItem={({ item }: ListRenderItemInfo<MenuItemData>) => (
            <MenuItem item={item} />
          )}
          scrollEventThrottle={16}
          showsVerticalScrollIndicator={false}
          snapToOffsets={heroHeight > 0 ? [0, heroHeight] : undefined}
          snapToEnd={false}
        />
      </View>
    </KeyboardAvoidingView>
  );
}
