/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{ts,tsx,js,jsx}"
  ],
  theme: {
    extend: {
      colors: {
        surface: {
          100: "rgba(255,255,255,0.03)",
          200: "rgba(255,255,255,0.06)",
          300: "rgba(255,255,255,0.1)"
        }
      },
      boxShadow: {
        soft: "0 0 20px rgba(255,255,255,0.05)",
        softLg: "0 0 40px rgba(255,255,255,0.06)",
        glowLg: "0 8px 40px rgba(255,255,255,0.06), 0 0 80px rgba(255,255,255,0.02)"
      },
      keyframes: {
        float: {
          "0%": { transform: "translateY(0px)" },
          "50%": { transform: "translateY(-6px)" },
          "100%": { transform: "translateY(0px)" }
        },
        subtleGlow: {
          "0%": { opacity: 0.25 },
          "50%": { opacity: 0.4 },
          "100%": { opacity: 0.25 }
        },
        btnMorphIn: {
          "0%": { width: "auto", borderRadius: "999px", paddingLeft: "1rem", paddingRight: "1rem" },
          "50%": { width: "3rem", borderRadius: "999px", paddingLeft: "0.5rem", paddingRight: "0.5rem" },
          "100%": { width: "3rem", borderRadius: "999px", paddingLeft: "0.5rem", paddingRight: "0.5rem" }
        },
        btnMorphOut: {
          "0%": { width: "3rem", borderRadius: "999px", paddingLeft: "0.5rem", paddingRight: "0.5rem" },
          "100%": { width: "auto", borderRadius: "14px", paddingLeft: "1rem", paddingRight: "1rem" }
        },
        glowPulse: {
          "0%": { boxShadow: "0 0 0 0 rgba(255,255,255,0.06)" },
          "70%": { boxShadow: "0 0 30px 14px rgba(255,255,255,0.02)" },
          "100%": { boxShadow: "0 0 0 0 rgba(255,255,255,0.00)" }
        }
      },
      animation: {
        float: "float 6s ease-in-out infinite",
        subtleGlow: "subtleGlow 6s ease-in-out infinite",
        btnMorphIn: "btnMorphIn 280ms ease-in-out forwards",
        btnMorphOut: "btnMorphOut 280ms ease-in-out forwards",
        glowPulse: "glowPulse 1.6s ease-out"
      }
    }
  },
  plugins: []
}
