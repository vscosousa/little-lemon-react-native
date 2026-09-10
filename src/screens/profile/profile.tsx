import { File, Paths } from "expo-file-system";
import * as ImagePicker from "expo-image-picker";
import { useState } from "react";
import {
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  Text,
  View,
} from "react-native";

import { AppButton } from "@/components/app-button/app-button";
import { AppFooter } from "@/components/app-footer/app-footer";
import { AvatarField } from "@/components/avatar-field/avatar-field";
import { FormField } from "@/components/form-field/form-field";
import { Header } from "@/components/header/header";
import { SettingToggle } from "@/components/setting-toggle/setting-toggle";
import { Toast, type ToastVariant } from "@/components/toast/toast";
import { type ProfileData, useUser } from "@/context/user-context";
import { useScrollElevation } from "@/hooks/use-scroll-elevation";
import { getInitials } from "@/utils/profile";
import { isValidEmail, isValidName } from "@/utils/profile-validation";

import styles from "./styles";

type NotificationKey = keyof ProfileData["notifications"];

type ToastMessage = {
  id: number;
  message: string;
  variant: ToastVariant;
};

let nextToastId = 0;

const NOTIFICATION_OPTIONS: { key: NotificationKey; label: string }[] = [
  { key: "orderStatuses", label: "Order statuses" },
  { key: "passwordChanges", label: "Password changes" },
  { key: "specialOffers", label: "Special offers" },
  { key: "newsletter", label: "Newsletter" },
];

/**
 * Edits personal details, avatar, and email-notification preferences.
 *
 * Changes remain in local draft state until saved. The screen also coordinates
 * image persistence, validation feedback, discard, and logout behavior.
 *
 * @returns The rendered screen.
 */
export default function Profile() {
  const { profile, saveProfile, logOut } = useUser();
  const [draft, setDraft] = useState<ProfileData>(profile);
  const [isSaving, setIsSaving] = useState(false);
  const [toast, setToast] = useState<ToastMessage | null>(null);
  const { isFooterElevated, isHeaderElevated, scrollProps } =
    useScrollElevation();

  // Key order is stable: every draft is spread from the stored profile.
  const hasChanges = JSON.stringify(draft) !== JSON.stringify(profile);
  const canSave =
    hasChanges &&
    isValidName(draft.firstName) &&
    isValidEmail(draft.email) &&
    !isSaving;
  const initials = getInitials(draft.firstName, draft.lastName);

  function updateField<Key extends keyof ProfileData>(
    key: Key,
    value: ProfileData[Key],
  ) {
    setDraft((current) => ({ ...current, [key]: value }));
  }

  function updateNotification(key: NotificationKey, value: boolean) {
    setDraft((current) => ({
      ...current,
      notifications: { ...current.notifications, [key]: value },
    }));
  }

  function showToast(message: string, variant: ToastVariant) {
    nextToastId += 1;
    setToast({ id: nextToastId, message, variant });
  }

  async function pickImage() {
    try {
      const permission =
        await ImagePicker.requestMediaLibraryPermissionsAsync();

      if (!permission.granted) {
        showToast("Allow photo access to choose a profile picture.", "error");
        return;
      }

      const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ["images"],
        allowsEditing: true,
        aspect: [1, 1],
        quality: 0.7,
      });

      if (!result.canceled) {
        updateField("imageUri", result.assets[0].uri);
      }
    } catch {
      showToast("Unable to open photos. Please try again.", "error");
    }
  }

  async function handleSave() {
    if (!canSave) return;

    setIsSaving(true);
    let copiedImageUri: string | null = null;
    try {
      let imageUri = draft.imageUri;
      if (imageUri && imageUri !== profile.imageUri) {
        imageUri = await persistProfileImage(imageUri);
        copiedImageUri = imageUri;
      }

      const updatedProfile: ProfileData = {
        ...draft,
        firstName: draft.firstName.trim(),
        lastName: draft.lastName.trim(),
        email: draft.email.trim().toLowerCase(),
        imageUri,
      };

      await saveProfile(updatedProfile);
      setDraft(updatedProfile);

      if (profile.imageUri && profile.imageUri !== imageUri) {
        removePersistedProfileImage(profile.imageUri);
      }

      showToast("Your profile changes were saved.", "success");
    } catch {
      if (copiedImageUri) removePersistedProfileImage(copiedImageUri);
      showToast("Unable to save your profile. Please try again.", "error");
    } finally {
      setIsSaving(false);
    }
  }

  async function handleLogOut() {
    try {
      await logOut();
      if (profile.imageUri) removePersistedProfileImage(profile.imageUri);
    } catch {
      showToast("Unable to log out. Please try again.", "error");
    }
  }

  return (
    <KeyboardAvoidingView
      style={styles.screen}
      behavior={Platform.OS === "ios" ? "padding" : undefined}
    >
      <Header
        showBackButton
        showAvatar
        avatarUri={draft.imageUri}
        avatarInitials={initials}
        elevated={isHeaderElevated}
      />

      <ScrollView
        {...scrollProps}
        contentContainerStyle={styles.content}
        keyboardShouldPersistTaps="handled"
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.sections}>
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Personal information</Text>
            <AvatarField
              imageUri={draft.imageUri}
              initials={initials}
              onChangePress={pickImage}
              onRemovePress={() => updateField("imageUri", null)}
            />
            <FormField
              label="First name"
              value={draft.firstName}
              onChangeText={(value) => updateField("firstName", value)}
              autoCapitalize="words"
              autoComplete="given-name"
            />
            <FormField
              label="Last name"
              value={draft.lastName}
              onChangeText={(value) => updateField("lastName", value)}
              autoCapitalize="words"
              autoComplete="family-name"
            />
            <FormField
              label="Email"
              value={draft.email}
              onChangeText={(value) => updateField("email", value)}
              keyboardType="email-address"
              autoCapitalize="none"
              autoComplete="email"
              autoCorrect={false}
            />
            <FormField
              label="Phone number"
              mask="(999) 999-9999"
              value={draft.phoneNumber}
              onChangeText={(formatted) =>
                updateField("phoneNumber", formatted)
              }
              keyboardType="phone-pad"
              placeholder="(000) 000-0000"
            />
          </View>

          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Email notifications</Text>
            <View style={styles.notificationGroup}>
              {NOTIFICATION_OPTIONS.map((option, index) => (
                <SettingToggle
                  key={option.key}
                  label={option.label}
                  value={draft.notifications[option.key]}
                  onValueChange={(value) =>
                    updateNotification(option.key, value)
                  }
                  showDivider={index < NOTIFICATION_OPTIONS.length - 1}
                />
              ))}
            </View>
          </View>
        </View>
      </ScrollView>

      <AppFooter elevated={isFooterElevated}>
        <AppButton label="Log out" variant="yellow" onPress={handleLogOut} />

        <View style={styles.footerButtons}>
          <AppButton
            label="Discard changes"
            variant="secondary"
            disabled={!hasChanges || isSaving}
            onPress={() => setDraft(profile)}
            style={styles.footerButton}
          />
          <AppButton
            label="Save changes"
            disabled={!canSave}
            onPress={handleSave}
            style={styles.footerButton}
          />
        </View>
      </AppFooter>

      {toast && (
        <Toast
          key={toast.id}
          message={toast.message}
          variant={toast.variant}
          onDismiss={() =>
            setToast((current) => (current?.id === toast.id ? null : current))
          }
        />
      )}
    </KeyboardAvoidingView>
  );
}

/** Copies a picked image into permanent document storage, if not already there. */
async function persistProfileImage(uri: string) {
  if (Platform.OS === "web" || uri.startsWith(Paths.document.uri)) return uri;

  const source = new File(uri);
  const destination = new File(
    Paths.document,
    `profile-${Date.now()}${source.extension || ".jpg"}`,
  );
  await source.copy(destination);
  return destination.uri;
}

/** Best-effort delete of a previously persisted profile image. */
function removePersistedProfileImage(uri: string) {
  if (Platform.OS === "web" || !uri.startsWith(Paths.document.uri)) return;

  try {
    const file = new File(uri);
    if (file.exists) file.delete();
  } catch {
    // Profile data has already been saved; stale image cleanup is best-effort.
  }
}
