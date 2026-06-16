tailwind.config = {
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        medical: {
          navy: '#0A192F',       // Deep Navy
          navyLight: '#112240',  // Medical Navy Light
          blue: '#1E40AF',       // Medical Blue
          blueLight: '#3B82F6',  // Bright Medical Blue
          cyan: '#06B6D4',       // Soft Cyan
          teal: '#14B8A6',       // Soft Teal
          light: '#F8FAFC',      // White-ish Gray
          darkBg: '#0B0F19',     // Main Dark Mode background
          darkCard: '#111827',   // Dark Card
          darkText: '#E2E8F0',   // Light slate text
        }
      },
      fontFamily: {
        sans: ['Outfit', 'Inter', 'sans-serif'],
      }
    }
  }
}
