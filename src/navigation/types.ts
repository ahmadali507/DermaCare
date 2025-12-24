/**
 * React Navigation type definitions for type-safe navigation
 */

export type RootStackParamList = {
    Landing: undefined;
    Login: undefined;
    OTPVerification: { phoneNumber: string };
    ResetPassword: undefined;
    FormStep1: undefined;
    FormStep2: undefined;
    FormStep3: undefined;
    FormStep4: undefined;
    FormStep5: undefined;
    FormStep6: undefined;
    Results: undefined;
    PrivacyPolicy: undefined;
    Terms: undefined;
    Contact: undefined;
};

declare global {
    namespace ReactNavigation {
        interface RootParamList extends RootStackParamList { }
    }
}
