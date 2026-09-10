import AsyncStorage from "@react-native-async-storage/async-storage";
import {
  createContext,
  type PropsWithChildren,
  useContext,
  useEffect,
  useState,
} from "react";

const PROFILE_STORAGE_KEY = "profile";
/** Pre-cleanup onboarding flag; a stored profile now implies onboarding. */
const LEGACY_ONBOARDING_STORAGE_KEY = "isOnboarded";

/** Persisted Little Lemon customer profile and notification preferences. */
export type ProfileData = {
  /** Customer's given name. */
  firstName: string;
  /** Customer's family name, if provided. */
  lastName: string;
  /** Customer's contact email address. */
  email: string;
  /** Customer's formatted phone number, if provided. */
  phoneNumber: string;
  /** URI of the profile image, or `null` when none is set. */
  imageUri: string | null;
  /** Per-category email notification preferences. */
  notifications: {
    orderStatuses: boolean;
    passwordChanges: boolean;
    specialOffers: boolean;
    newsletter: boolean;
  };
};

const EMPTY_PROFILE: ProfileData = {
  firstName: "",
  lastName: "",
  email: "",
  phoneNumber: "",
  imageUri: null,
  notifications: {
    orderStatuses: true,
    passwordChanges: true,
    specialOffers: true,
    newsletter: true,
  },
};

type UserContextValue = {
  /** Whether persisted onboarding/profile state is still being restored. */
  isLoading: boolean;
  /** Whether onboarding was completed and persisted. */
  isOnboarded: boolean;
  /** The current profile, or the empty profile before onboarding. */
  profile: ProfileData;
  /** Creates the initial profile and marks onboarding done. */
  completeOnboarding: (firstName: string, email: string) => Promise<void>;
  /** Persists a profile and updates the current profile state. */
  saveProfile: (profile: ProfileData) => Promise<void>;
  /** Clears persisted state and resets to an empty, non-onboarded profile. */
  logOut: () => Promise<void>;
};

const UserContext = createContext<UserContextValue | null>(null);

/**
 * Loads, persists, and exposes onboarding and profile state via {@link useUser}.
 * A persisted profile means onboarding is complete.
 *
 * @param props - Provider properties.
 * @param props.children - Descendants that can access the user context.
 * @returns A context provider wrapping `children`.
 * @example
 * <SafeAreaProvider>
 *   <UserProvider>
 *     <RootNavigator />
 *   </UserProvider>
 * </SafeAreaProvider>
 */
export function UserProvider({ children }: PropsWithChildren) {
  const [isLoading, setIsLoading] = useState(true);
  const [isOnboarded, setIsOnboarded] = useState(false);
  const [profile, setProfile] = useState<ProfileData>(EMPTY_PROFILE);

  useEffect(() => {
    async function restoreUserState() {
      try {
        const storedProfile = await AsyncStorage.getItem(PROFILE_STORAGE_KEY);

        if (storedProfile) {
          const savedProfile = JSON.parse(
            storedProfile,
          ) as Partial<ProfileData>;
          setProfile({
            ...EMPTY_PROFILE,
            ...savedProfile,
            notifications: {
              ...EMPTY_PROFILE.notifications,
              ...savedProfile.notifications,
            },
          });
          setIsOnboarded(true);
        }
      } catch {
        // Unreadable storage leaves the user on onboarding.
      } finally {
        setIsLoading(false);
      }
    }

    void restoreUserState();
  }, []);

  async function completeOnboarding(firstName: string, email: string) {
    const initialProfile: ProfileData = {
      ...EMPTY_PROFILE,
      firstName: firstName.trim(),
      email: email.trim().toLowerCase(),
    };

    await saveProfile(initialProfile);
    setIsOnboarded(true);
  }

  async function saveProfile(updatedProfile: ProfileData) {
    await AsyncStorage.setItem(
      PROFILE_STORAGE_KEY,
      JSON.stringify(updatedProfile),
    );
    setProfile(updatedProfile);
  }

  async function logOut() {
    await AsyncStorage.multiRemove([
      PROFILE_STORAGE_KEY,
      LEGACY_ONBOARDING_STORAGE_KEY,
    ]);
    setProfile(EMPTY_PROFILE);
    setIsOnboarded(false);
  }

  return (
    <UserContext.Provider
      value={{
        isLoading,
        isOnboarded,
        profile,
        completeOnboarding,
        saveProfile,
        logOut,
      }}
    >
      {children}
    </UserContext.Provider>
  );
}

/**
 * Accesses onboarding and profile state and actions from {@link UserProvider}.
 *
 * @returns The current onboarding/profile state and actions.
 * @throws If called outside a {@link UserProvider}.
 * @example
 * const { profile, saveProfile, logOut } = useUser();
 */
export function useUser() {
  const context = useContext(UserContext);

  if (!context) {
    throw new Error("useUser must be used inside UserProvider");
  }

  return context;
}
