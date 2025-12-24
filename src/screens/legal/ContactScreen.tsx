/**
 * Contact/Support Screen
 */

import React, { useState } from 'react';
import {
    View,
    Text,
    StyleSheet,
    ScrollView,
    TouchableOpacity,
    Linking,
} from 'react-native';
import { Button } from '../../components/Button';
import { Input } from '../../components/Input';
import { Card } from '../../components/Card';
import { Colors, Typography, Spacing } from '../../constants/theme';

const ContactScreen: React.FC = () => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [message, setMessage] = useState('');
    const [expanded, setExpanded] = useState<number | null>(null);

    const handleSend = () => {
        // TODO: Implement actual contact form submission
        console.log('Contact form:', { name, email, message });
    };

    const faqs = [
        {
            question: 'How long until I see results?',
            answer: 'Most users see improvements within 4-6 weeks of following their personalized routine.',
        },
        {
            question: 'Can I edit my answers?',
            answer: 'Yes! You can retake the assessment anytime from your profile settings.',
        },
        {
            question: 'Is my data secure?',
            answer: 'Absolutely. We use industry-standard encryption and never share your data without consent.',
        },
    ];

    return (
        <ScrollView style={styles.container} contentContainerStyle={styles.content}>
            <Text style={styles.heading}>We're here to help</Text>

            <Card style={styles.contactCard}>
                <TouchableOpacity
                    style={styles.contactMethod}
                    onPress={() => Linking.openURL('mailto:support@dermacare.com')}
                >
                    <Text style={styles.contactIcon}>📧</Text>
                    <View style={styles.contactInfo}>
                        <Text style={styles.contactLabel}>Email</Text>
                        <Text style={styles.contactValue}>support@dermacare.com</Text>
                    </View>
                </TouchableOpacity>
            </Card>

            <Card style={styles.contactCard}>
                <TouchableOpacity
                    style={styles.contactMethod}
                    onPress={() => Linking.openURL('tel:+18005746227')}
                >
                    <Text style={styles.contactIcon}>☎️</Text>
                    <View style={styles.contactInfo}>
                        <Text style={styles.contactLabel}>Phone</Text>
                        <Text style={styles.contactValue}>+1 (800) SKIN-CARE</Text>
                    </View>
                </TouchableOpacity>
            </Card>

            <Text style={styles.sectionHeading}>Send us a message</Text>

            <Input
                label="Name"
                value={name}
                onChangeText={setName}
            />

            <Input
                label="Email"
                value={email}
                onChangeText={setEmail}
                keyboardType="email-address"
            />

            <Input
                label="Message"
                value={message}
                onChangeText={setMessage}
                multiline={true}
                numberOfLines={4}
            />

            <Button
                title="Send Message"
                onPress={handleSend}
                style={styles.sendButton}
            />

            <Text style={styles.sectionHeading}>Frequently Asked Questions</Text>

            {faqs.map((faq, index) => (
                <Card key={index} style={styles.faqCard}>
                    <TouchableOpacity
                        onPress={() => setExpanded(expanded === index ? null : index)}
                    >
                        <Text style={styles.faqQuestion}>
                            {expanded === index ? '▼' : '▶'} {faq.question}
                        </Text>
                    </TouchableOpacity>
                    {expanded === index && (
                        <Text style={styles.faqAnswer}>{faq.answer}</Text>
                    )}
                </Card>
            ))}
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: Colors.cream,
    },
    content: {
        paddingHorizontal: Spacing.lg,
        paddingVertical: Spacing.xl,
    },
    heading: {
        ...Typography.h2,
        marginBottom: Spacing.lg,
    },
    contactCard: {
        marginBottom: Spacing.md,
    },
    contactMethod: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    contactIcon: {
        fontSize: 32,
        marginRight: Spacing.md,
    },
    contactInfo: {
        flex: 1,
    },
    contactLabel: {
        ...Typography.caption,
        color: Colors.mutedSage,
    },
    contactValue: {
        ...Typography.body,
        color: Colors.sageGreen,
        fontWeight: '600',
    },
    sectionHeading: {
        ...Typography.h3,
        marginTop: Spacing.xl,
        marginBottom: Spacing.md,
    },
    sendButton: {
        marginTop: Spacing.md,
        marginBottom: Spacing.lg,
    },
    faqCard: {
        marginBottom: Spacing.sm,
    },
    faqQuestion: {
        ...Typography.body,
        fontWeight: '600',
    },
    faqAnswer: {
        ...Typography.body,
        color: Colors.mutedSage,
        marginTop: Spacing.sm,
        lineHeight: 22,
    },
});

export default ContactScreen;
