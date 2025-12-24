import React, { useState } from 'react';
import {
    View,
    Text,
    StyleSheet,
    TouchableOpacity,
    Modal,
    FlatList,
    SafeAreaView,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Colors, Typography, Spacing, BorderRadius } from '../constants/theme';

interface DropdownProps {
    label: string;
    options: string[];
    value: string;
    onSelect: (value: string) => void;
    placeholder?: string;
}

export const Dropdown: React.FC<DropdownProps> = ({
    label,
    options,
    value,
    onSelect,
    placeholder = 'Select an option',
}) => {
    const [visible, setVisible] = useState(false);

    const handleSelect = (item: string) => {
        onSelect(item);
        setVisible(false);
    };

    return (
        <View style={styles.container}>
            <Text style={styles.label}>{label}</Text>
            <TouchableOpacity
                style={styles.button}
                onPress={() => setVisible(true)}
                activeOpacity={0.7}
            >
                <Text style={[styles.valueText, !value && styles.placeholderText]}>
                    {value || placeholder}
                </Text>
                <Ionicons name="chevron-down" size={20} color={Colors.mutedSage} />
            </TouchableOpacity>

            <Modal
                visible={visible}
                transparent={true}
                animationType="fade"
                onRequestClose={() => setVisible(false)}
            >
                <TouchableOpacity
                    style={styles.modalOverlay}
                    activeOpacity={1}
                    onPress={() => setVisible(false)}
                >
                    <View style={styles.modalContent}>
                        <View style={styles.modalHeader}>
                            <Text style={styles.modalTitle}>{label}</Text>
                            <TouchableOpacity onPress={() => setVisible(false)}>
                                <Ionicons name="close" size={24} color={Colors.darkForest} />
                            </TouchableOpacity>
                        </View>
                        <FlatList
                            data={options}
                            keyExtractor={(item) => item}
                            renderItem={({ item }) => (
                                <TouchableOpacity
                                    style={[
                                        styles.option,
                                        value === item && styles.optionSelected,
                                    ]}
                                    onPress={() => handleSelect(item)}
                                >
                                    <Text
                                        style={[
                                            styles.optionText,
                                            value === item && styles.optionTextSelected,
                                        ]}
                                    >
                                        {item}
                                    </Text>
                                    {value === item && (
                                        <Ionicons
                                            name="checkmark"
                                            size={20}
                                            color={Colors.sageGreen}
                                        />
                                    )}
                                </TouchableOpacity>
                            )}
                        />
                    </View>
                </TouchableOpacity>
            </Modal>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        marginBottom: Spacing.md,
    },
    label: {
        ...Typography.h3,
        fontSize: 16,
        marginBottom: Spacing.sm,
    },
    button: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        backgroundColor: Colors.white,
        borderWidth: 1,
        borderColor: Colors.border,
        borderRadius: BorderRadius.md,
        paddingHorizontal: Spacing.md,
        paddingVertical: Spacing.md,
        minHeight: 56,
    },
    valueText: {
        ...Typography.body,
        color: Colors.darkForest,
    },
    placeholderText: {
        color: Colors.mutedSage,
    },
    modalOverlay: {
        flex: 1,
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
        justifyContent: 'flex-end',
    },
    modalContent: {
        backgroundColor: Colors.cream,
        borderTopLeftRadius: BorderRadius.lg,
        borderTopRightRadius: BorderRadius.lg,
        maxHeight: '70%',
        paddingBottom: Spacing.xl,
    },
    modalHeader: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: Spacing.lg,
        borderBottomWidth: 1,
        borderBottomColor: Colors.lightBorder,
    },
    modalTitle: {
        ...Typography.h3,
    },
    option: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingVertical: Spacing.md,
        paddingHorizontal: Spacing.lg,
        borderBottomWidth: 1,
        borderBottomColor: Colors.lightBorder,
    },
    optionSelected: {
        backgroundColor: `${Colors.sageGreen}10`,
    },
    optionText: {
        ...Typography.body,
        fontSize: 16,
    },
    optionTextSelected: {
        color: Colors.sageGreen,
        fontWeight: '600',
    },
});
