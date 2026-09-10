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
import { FormField } from "@/components/form-field/form-field";
import { Header } from "@/components/header/header";
import { useUser } from "@/context/user-context";
import { useScrollElevation } from "@/hooks/use-scroll-elevation";
import { isValidEmail, isValidName } from "@/utils/profile-validation";

import styles from "./styles";

/**
 * Collects and validates the minimum profile information required for onboarding.
 *
 * Submitting a valid first name and email persists the initial profile through
 * {@link useUser}; protected routing then reveals the authenticated screens.
 *
 * @returns The rendered screen.
 */
export default function Onboarding() {
  const { completeOnboarding } = useUser();
  const [firstName, setFirstName] = useState("");
  const [email, setEmail] = useState("");
  const { isFooterElevated, isHeaderElevated, scrollProps } =
    useScrollElevation();
  const isButtonEnabled = isValidName(firstName) && isValidEmail(email);

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === "ios" ? "padding" : undefined}
    >
      <Header elevated={isHeaderElevated} />

      <ScrollView
        {...scrollProps}
        contentContainerStyle={styles.content}
        keyboardShouldPersistTaps="handled"
        showsVerticalScrollIndicator={false}
      >
        <Text style={styles.intro}>Let us get to know you!</Text>
        <View style={styles.fields}>
          <FormField
            label="First name"
            value={firstName}
            onChangeText={setFirstName}
            placeholder="First name"
            autoCapitalize="words"
            autoComplete="name"
          />

          <FormField
            label="Email"
            value={email}
            onChangeText={setEmail}
            placeholder="Email"
            keyboardType="email-address"
            autoCapitalize="none"
            autoComplete="email"
            autoCorrect={false}
          />
        </View>
      </ScrollView>

      <AppFooter elevated={isFooterElevated}>
        <AppButton
          label="Next"
          variant="yellow"
          disabled={!isButtonEnabled}
          onPress={() => void completeOnboarding(firstName, email)}
          labelStyle={styles.nextButtonLabel}
        />
      </AppFooter>
    </KeyboardAvoidingView>
  );
}
