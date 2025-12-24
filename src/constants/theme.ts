/**
 * DermaCare Theme - Medical-Aesthetic Design System
 * Soft cream and sage green color palette for premium skincare app
 */

export const Colors = {
    // Primary Colors
    cream: '#F5F1ED',
    sageGreen: '#9CAF88',

    // Text Colors
    darkForest: '#2C3E2E',
    mutedSage: '#6B7566',

    // Accent Colors
    terracotta: '#D4A574',
    white: '#FFFFFF',

    // Functional Colors
    error: '#D4A574',
    border: '#D4D4D4',
    lightBorder: '#E8E8E8',

    // Overlay
    overlay: 'rgba(44, 62, 46, 0.5)',
};

export const Spacing = {
    xs: 4,
    sm: 8,
    md: 16,
    lg: 24,
    xl: 32,
    xxl: 48,
};

export const Typography = {
    h1: {
        fontSize: 32,
        fontWeight: '600' as const,
        lineHeight: 40,
        color: Colors.darkForest,
    },
    h2: {
        fontSize: 24,
        fontWeight: '600' as const,
        lineHeight: 32,
        color: Colors.darkForest,
    },
    h3: {
        fontSize: 18,
        fontWeight: '600' as const,
        lineHeight: 24,
        color: Colors.darkForest,
    },
    body: {
        fontSize: 15,
        fontWeight: '400' as const,
        lineHeight: 22,
        color: Colors.darkForest,
    },
    caption: {
        fontSize: 13,
        fontWeight: '400' as const,
        lineHeight: 18,
        color: Colors.mutedSage,
    },
    small: {
        fontSize: 12,
        fontWeight: '400' as const,
        lineHeight: 16,
        color: Colors.mutedSage,
    },
};

export const BorderRadius = {
    sm: 8,
    md: 12,
    lg: 24,
    full: 999,
};

export const Shadows = {
    small: {
        shadowColor: Colors.darkForest,
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 2,
    },
    medium: {
        shadowColor: Colors.darkForest,
        shadowOffset: {
            width: 0,
            height: 4,
        },
        shadowOpacity: 0.15,
        shadowRadius: 8,
        elevation: 4,
    },
};

export const Animation = {
    fast: 200,
    normal: 300,
    slow: 500,
};
