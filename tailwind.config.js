/** @type {import('tailwindcss').Config} */
export default {
  content: [
    './docs/.vitepress/**/*.{js,ts,vue}',
		'./docs/**/*.md',
		'./vitepress/**/*.{js,ts,vue}',
    './development/**/*.md',
    './development/**/**/*.md',
    './guides/**/*.md',
    './guides/**/**/*.md',
    './library/**/*.md',
    './library/**/**/*.md',
    './outdated/**/*.md',
    './outdated/**/**/*.md',
		'./docs/**/*.md',
	],
  theme: {
    extend: {},
    screens: {
      'sm': '640px',
      // => @media (min-width: 640px) { ... }

      'md': '768px',
      // => @media (min-width: 768px) { ... }

      'lg': '1056px',
      // => @media (min-width: 1056px) { ... }

      'xl': '1280px',
      // => @media (min-width: 1280px) { ... }

      '2xl': '1536px',
      // => @media (min-width: 1536px) { ... }
    }
  },
  plugins: [],
}
