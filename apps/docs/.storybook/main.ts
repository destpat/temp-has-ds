import type { StorybookConfig } from "@storybook/react-vite";
import tailwindcss from "@tailwindcss/vite";

const config: StorybookConfig = {
	stories: ["../../../packages/ui/src/**/*.stories.tsx"],
	addons: ["@storybook/addon-docs", "@storybook/addon-a11y"],
	framework: "@storybook/react-vite",
	docs: {
		autodocs: "tag",
	},
	viteFinal(config) {
		config.plugins ??= [];
		config.plugins.push(tailwindcss());
		return config;
	},
};

export default config;
