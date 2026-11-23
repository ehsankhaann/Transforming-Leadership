import React from 'react';

interface PlaceholderTextProps {
  text: string;
  tone?: 'light' | 'dark' | 'button';
}

/** Keeps unconfirmed facts readable in brackets without visually highlighting them. */
export const PlaceholderText: React.FC<PlaceholderTextProps> = ({ text }) => <>{text}</>;
