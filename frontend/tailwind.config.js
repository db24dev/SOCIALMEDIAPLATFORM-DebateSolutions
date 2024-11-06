import daisyui from "daisyui";
import daisyUIThemes from "daisyui/src/theming/themes";
/** @type {import('tailwindcss').Config} */
export default {
	content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
	theme: {
		extend: {},
	},
	plugins: [daisyui],

	daisyui: {
		themes: [
			"light",
			{
				black: {
					...daisyUIThemes["light"],
					primary: "rgb(171, 130, 255)",
					secondary: "rgb(255, 182, 193)",
					ELECTRIC_BLUE: "rgb(125, 249, 255)",
					HOT_PINK: "rgb(255, 105, 180)",
				},
			},
		],
	},
};


