/** @type {import('tailwindcss').Config} */
module.exports = {
	content: ["./src/**/*.{js,ts,jsx,tsx,mdx}"],
	theme: {
		extend: {
			fontFamily: {
				urbanist: ["var(--font-urbanist)"],
			},
			colors: {
				"camb-primary": {
					100: "#232324",
					500: "#1C1C1E",
				},
				"camb-white": "#FAFAFA",
				"camb-orange": "#F05C0C",
				"camb-purple": "#6742B6",
				"camb-pink": "#B21C56",
			},
		},
	},
	plugins: [],
};
