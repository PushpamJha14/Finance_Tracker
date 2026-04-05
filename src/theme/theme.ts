export const theme = {
  colors: {
    primary: '#22D3EE', // Bright cyan/teal
    primaryDark: '#0E7490', // Darker teal for interactions
    background: '#FFFFFF',
    surface: '#F8FAFC', // Light tint for backgrounds
    text: {
      primary: '#0F172A', // Near black
      secondary: '#64748B', // Gray
      inverse: '#FFFFFF',
    },
    border: '#E2E8F0',
    error: '#EF4444',
    success: '#10B981',
    warning: '#F59E0B',
    charts: {
      main: '#22D3EE',
      secondary: '#818CF8',
      tertiary: '#F472B6',
      quaternary: '#34D399',
    },
  },
  typography: {
    fontFamily: {
      regular: 'System', // Use system font for simplicity in this scaffold
      bold: 'System',
    },
    sizes: {
      xs: 12,
      sm: 14,
      md: 16,
      lg: 18,
      xl: 24,
      xxl: 32,
    },
    weights: {
      regular: '400' as const,
      medium: '500' as const,
      bold: '700' as const,
    },
  },
  spacing: {
    xs: 4,
    sm: 8,
    md: 16,
    lg: 24,
    xl: 32,
    xxl: 48,
  },
  borderRadius: {
    sm: 8,
    md: 12,
    lg: 16,
    xl: 20,
    round: 9999,
  },
  shadows: {
    soft: {
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.05,
      shadowRadius: 10,
      elevation: 2,
    },
    medium: {
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 4 },
      shadowOpacity: 0.1,
      shadowRadius: 12,
      elevation: 4,
    },
  },
};
