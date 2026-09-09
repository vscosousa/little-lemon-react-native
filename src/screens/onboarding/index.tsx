import { useState } from "react";
import { KeyboardAvoidingView, Platform, ScrollView, Text } from "react-native";

import { AppButton } from "@/components/app-button";
import { AppFooter } from "@/components/app-footer";
import { FormField } from "@/components/form-field";
import { Header } from "@/components/header";
import { useUser } from "@/context/user-context";
import { useScrollElevation } from "@/hooks/use-scroll-elevation";
import { isValidEmail, isValidName } from "@/utils/profile-validation";

import styles from "./styles";

/**
 * First-run onboarding screen: collects a first name and email to create the profile.
 * @returns The rendered screen.
 */
export default function Onboarding() {
  const { completeOnboarding } = useUser();
  const [firstName, setFirstName] = useState("");
  const [email, setEmail] = useState("");
  const {
    handleContentSizeChange,
    handleScroll,
    handleScrollLayout,
    isFooterElevated,
    isHeaderElevated,
  } = useScrollElevation();
  const isFirstNameValid = isValidName(firstName);
  const isEmailValid = isValidEmail(email);
  const isButtonEnabled = isFirstNameValid && isEmailValid;

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === "ios" ? "padding" : undefined}
    >
      <Header elevated={isHeaderElevated} />

      <ScrollView
        contentContainerStyle={styles.content}
        keyboardShouldPersistTaps="handled"
        onContentSizeChange={handleContentSizeChange}
        onLayout={handleScrollLayout}
        onScroll={handleScroll}
        scrollEventThrottle={16}
        showsVerticalScrollIndicator={false}
      >
        <Text style={styles.intro}>Let us get to know you!</Text>
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
          containerStyle={styles.lastField}
        />
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
