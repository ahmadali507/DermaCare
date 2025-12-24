/**
 * Main Navigator - Stack Navigation Setup
 */

import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { RootStackParamList } from './types';
import { Colors, Typography } from '../constants/theme';

// Import screens
import OTPVerificationScreen from '../screens/auth/OTPVerificationScreen';
import ResetPasswordScreen from '../screens/auth/ResetPasswordScreen';
import Step4Structure from '../screens/form/Step4Structure';
import Step5Lifestyle from '../screens/form/Step5Lifestyle';
import ResultsScreen from '../screens/ResultsScreen';
import PrivacyPolicyScreen from '../screens/legal/PrivacyPolicyScreen';
import LandingScreen from '../screens/onboarding/LandingScreen';
import LoginScreen from '../screens/auth/LoginScreen';
import Step1Demographics from '../screens/form/Step1Demographics';
import Step2Dietary from '../screens/form/Step2Dietary';
import Step3Symptoms from '../screens/form/Step3Symptoms';
import Step6Photos from '../screens/form/Step6Photos';
import TermsScreen from '../screens/legal/TermsScreen';
import ContactScreen from '../screens/legal/ContactScreen';

const Stack = createStackNavigator<RootStackParamList>();

const MainNavigator: React.FC = () => {
    return (
        <NavigationContainer>
            <Stack.Navigator
                screenOptions={{
                    headerStyle: {
                        backgroundColor: Colors.cream,
                        elevation: 0,
                        shadowOpacity: 0,
                    },
                    headerTitleStyle: {
                        ...Typography.h3,
                    },
                    headerTintColor: Colors.sageGreen,
                    cardStyle: {
                        backgroundColor: Colors.cream,
                    },
                }}
            >
                <Stack.Screen
                    name="Landing"
                    component={LandingScreen}
                    options={{ headerShown: false }}
                />
                <Stack.Screen
                    name="Login"
                    component={LoginScreen}
                    options={{ headerShown: false }}
                />
                <Stack.Screen
                    name="OTPVerification"
                    component={OTPVerificationScreen}
                    options={{ title: 'Verify Phone' }}
                />
                <Stack.Screen
                    name="ResetPassword"
                    component={ResetPasswordScreen}
                    options={{ title: 'Reset Password' }}
                />
                <Stack.Screen
                    name="FormStep1"
                    component={Step1Demographics}
                    options={{ title: 'Demographics' }}
                />
                <Stack.Screen
                    name="FormStep2"
                    component={Step2Dietary}
                    options={{ title: 'Dietary Habits' }}
                />
                <Stack.Screen
                    name="FormStep3"
                    component={Step3Symptoms}
                    options={{ title: 'Skin Symptoms' }}
                />
                <Stack.Screen
                    name="FormStep4"
                    component={Step4Structure}
                    options={{ title: 'Physical Structure' }}
                />
                <Stack.Screen
                    name="FormStep5"
                    component={Step5Lifestyle}
                    options={{ title: 'Lifestyle' }}
                />
                <Stack.Screen
                    name="FormStep6"
                    component={Step6Photos}
                    options={{ title: 'Photos' }}
                />
                <Stack.Screen
                    name="Results"
                    component={ResultsScreen}
                    options={{ headerShown: false }}
                />
                <Stack.Screen
                    name="PrivacyPolicy"
                    component={PrivacyPolicyScreen}
                    options={{ title: 'Privacy Policy' }}
                />
                <Stack.Screen
                    name="Terms"
                    component={TermsScreen}
                    options={{ title: 'Terms of Service' }}
                />
                <Stack.Screen
                    name="Contact"
                    component={ContactScreen}
                    options={{ title: 'Contact Us' }}
                />
            </Stack.Navigator>
        </NavigationContainer>
    );
};

export default MainNavigator;
