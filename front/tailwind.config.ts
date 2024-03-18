import type { Config } from 'tailwindcss'

const config: Config = {
  darkMode: ["class"],
  prefix: '',
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic':
          'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
      },
      fontFamily: {
        genjyuu: ['GenJyuuGothicL', 'sans-serif'],
      },
      width: {
        'custom': '128px',
      },
      height: {
        'custom': '128px',
      },
      colors: {
        'button-color': '#506D7D', // ボタンの色
        'text-color': '#48352F',   // テキストの色
        'background-color': '#F5F5F5', // 背景色
        'line-color': '#E0DBD2',   // 線の色
        'F5F5F5': '#F5F5F5',
        'E0DBD2': '#E0DBD2',
        '48352F': '#48352F',
        '506D7D': '#506D7D',
        'c94a4a': '#c94a4a',
        'custom-color': '#E0DBD2',
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        primary: {
          DEFAULT: "hsl(var(--primary))",
          foreground: "hsl(var(--primary-foreground))",
        },
        secondary: {
          DEFAULT: "hsl(var(--secondary))",
          foreground: "hsl(var(--secondary-foreground))",
        },
        destructive: {
          DEFAULT: "hsl(var(--destructive))",
          foreground: "hsl(var(--destructive-foreground))",
        },
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
        accent: {
          DEFAULT: "hsl(var(--accent))",
          foreground: "hsl(var(--accent-foreground))",
        },
        popover: {
          DEFAULT: "hsl(var(--popover))",
          foreground: "hsl(var(--popover-foreground))",
        },
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },
      },
      boxShadow: {
        'custom': '0 10px 10px -4px rgba(0, 0, 0, 0.2), 0 4px 6px -4px rgba(0, 0, 0, 0.1)',
        'top-shadow': '0 -10px 10px -4px rgba(0, 0, 0, 0.2), 0 -4px 6px -4px rgba(0, 0, 0, 0.1)',
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
      keyframes: {
        "accordion-down": {
          from: { height: "0" },
          to: { height: "var(--radix-accordion-content-height)" },
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: "0" },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
      },
    },
  },
  plugins: [
    require("tailwindcss-animate"),
    require('daisyui'),
  ],
  daisyui: {
    themes: ["light"],
  },
}
export default config
