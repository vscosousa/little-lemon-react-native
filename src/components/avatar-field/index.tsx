import { View } from "react-native";

import { AppButton } from "@/components/app-button";
import { Avatar } from "@/components/avatar";
import { FormControl } from "@/components/form-control";

import styles from "./styles";

type AvatarFieldProps = {
  /** Image passed through to the avatar. Also toggles the label between "Add photo" and "Change". */
  imageUri?: string | null;
  /** Initials fallback passed through to the avatar. */
  initials?: string;
  /** The field's visible label. Defaults to `"Avatar"`. */
  label?: string;
  /** Called when "Add photo"/"Change" is pressed. */
  onChangePress: () => void;
  /** Called when "Remove" is pressed. Only rendered while `imageUri` is set. */
  onRemovePress: () => void;
};

/**
 * Editable profile avatar with change/remove actions, presented with form-field styling.
 * @returns The rendered field.
 * @example
 * <AvatarField
 *   imageUri={draft.imageUri}
 *   initials={initials}
 *   onChangePress={pickImage}
 *   onRemovePress={() => updateField("imageUri", null)}
 * />
 */
export function AvatarField({
  imageUri,
  initials,
  label = "Avatar",
  onChangePress,
  onRemovePress,
}: AvatarFieldProps) {
  return (
    <FormControl label={label}>
      <View style={styles.control}>
        <Avatar imageUri={imageUri} initials={initials} />
        <View style={styles.actions}>
          <AppButton
            compact
            label={imageUri ? "Change" : "Add photo"}
            onPress={onChangePress}
            style={imageUri && styles.action}
          />
          {imageUri && (
            <AppButton
              compact
              label="Remove"
              onPress={onRemovePress}
              style={styles.action}
              variant="secondary"
            />
          )}
        </View>
      </View>
    </FormControl>
  );
}
