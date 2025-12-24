import React from 'react';
import Svg, { Path, SvgProps } from 'react-native-svg';
import { Colors } from '../../constants/theme';

interface IconProps extends SvgProps {
    color?: string;
    size?: number;
}

export const JawlineDefined: React.FC<IconProps> = ({ color = Colors.sageGreen, size = 100, ...props }) => (
    <Svg width={size} height={size} viewBox="0 0 100 100" fill="none" {...props}>
        <Path
            d="M35 20 C35 35 32 45 38 55 C40 58 42 58 44 55 C46 58 46 60 44 63 L45 68 C45 68 40 85 65 80 L75 65"
            stroke={color}
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
        />
    </Svg>
);

export const JawlineModerate: React.FC<IconProps> = ({ color = Colors.sageGreen, size = 100, ...props }) => (
    <Svg width={size} height={size} viewBox="0 0 100 100" fill="none" {...props}>
        <Path
            d="M35 20 C35 35 32 45 38 55 C40 58 42 58 44 55 C46 58 46 60 44 63 L45 68 C45 68 45 85 70 75 L75 65"
            stroke={color}
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
        />
    </Svg>
);

export const JawlineSoft: React.FC<IconProps> = ({ color = Colors.sageGreen, size = 100, ...props }) => (
    <Svg width={size} height={size} viewBox="0 0 100 100" fill="none" {...props}>
        <Path
            d="M35 20 C35 35 32 45 38 55 C40 58 42 58 44 55 C46 58 46 60 44 63 L45 68 C45 68 50 85 75 70 L75 65"
            stroke={color}
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
        />
    </Svg>
);

export const ChinProminent: React.FC<IconProps> = ({ color = Colors.sageGreen, size = 100, ...props }) => (
    <Svg width={size} height={size} viewBox="0 0 100 100" fill="none" {...props}>
        <Path
            d="M30 40 C30 50 45 55 40 60 C45 60 50 62 45 65 C45 65 35 75 55 80"
            stroke={color}
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
        />
    </Svg>
);

export const ChinBalanced: React.FC<IconProps> = ({ color = Colors.sageGreen, size = 100, ...props }) => (
    <Svg width={size} height={size} viewBox="0 0 100 100" fill="none" {...props}>
        <Path
            d="M30 40 C30 50 45 55 40 60 C45 60 50 62 45 65 C45 65 45 75 60 75"
            stroke={color}
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
        />
    </Svg>
);

export const ChinRecessed: React.FC<IconProps> = ({ color = Colors.sageGreen, size = 100, ...props }) => (
    <Svg width={size} height={size} viewBox="0 0 100 100" fill="none" {...props}>
        <Path
            d="M30 40 C30 50 45 55 40 60 C45 60 50 62 45 65 C45 65 55 70 65 70"
            stroke={color}
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
        />
    </Svg>
);
