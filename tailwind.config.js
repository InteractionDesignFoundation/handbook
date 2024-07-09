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
  },
  plugins: [],
}
