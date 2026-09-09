import AsyncStorage from "@react-native-async-storage/async-storage";
import {
  createContext,
  type PropsWithChildren,
  useContext,
  useEffect,
  useState,
} from "react";

const ONBOARDING_STORAGE_KEY = "isOnboarded";
const PROFILE_STORAGE_KEY = "profile";

export type ProfileData = {
  firstName: string;
  lastName: string;
  email: string;
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
  /** Whether {@link completeOnboarding} has been called. */
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
    /** Loads persisted onboarding and profile state on mount. */
    async function restoreUserState() {
      try {
        const [onboardingValue, profileValue] = await AsyncStorage.multiGet([
          ONBOARDING_STORAGE_KEY,
          PROFILE_STORAGE_KEY,
        ]);

        setIsOnboarded(onboardingValue[1] === "true");

        if (profileValue[1]) {
          const savedProfile = JSON.parse(
            profileValue[1],
          ) as Partial<ProfileData>;
          setProfile({
            ...EMPTY_PROFILE,
            ...savedProfile,
            notifications: {
              ...EMPTY_PROFILE.notifications,
              ...savedProfile.notifications,
            },
          });
        }
      } catch {
        setIsOnboarded(false);
        setProfile(EMPTY_PROFILE);
      } finally {
        setIsLoading(false);
      }
    }

    void restoreUserState();
  }, []);

  /**
   * Creates the initial profile from the onboarding form and marks onboarding done.
   * @param firstName - The onboarding form's first name input.
   * @param email - The onboarding form's email input.
   */
  async function completeOnboarding(firstName: string, email: string) {
    const initialProfile: ProfileData = {
      ...EMPTY_PROFILE,
      firstName: firstName.trim(),
      email: email.trim().toLowerCase(),
    };

    await AsyncStorage.multiSet([
      [ONBOARDING_STORAGE_KEY, "true"],
      [PROFILE_STORAGE_KEY, JSON.stringify(initialProfile)],
    ]);
    setProfile(initialProfile);
    setIsOnboarded(true);
  }

  /**
   * Persists the given profile and updates the current profile state.
   * @param updatedProfile - The full profile to persist.
   */
  async function saveProfile(updatedProfile: ProfileData) {
    await AsyncStorage.setItem(
      PROFILE_STORAGE_KEY,
      JSON.stringify(updatedProfile),
    );
    setProfile(updatedProfile);
  }

  /** Clears persisted onboarding and profile state and resets to an empty profile. */
  async function logOut() {
    await AsyncStorage.multiRemove([
      ONBOARDING_STORAGE_KEY,
      PROFILE_STORAGE_KEY,
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
 * @returns The current onboarding/profile state and actions.
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
