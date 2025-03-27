import { tv } from "tailwind-variants";

export type Colors = "primary" | "secondary" | "accent" | "success" | "danger" | "warning" | "info";

export const featureCard = tv({
	variants: {
		color: {
			primary: {
                subContainer: 'bg-primary/30',
				container: "bg-primary",
				text: "text-primary",
			},
			secondary: {
                subContainer: 'bg-secondary/30',
				container: "bg-secondary",
				text: "text-secondary",
			},
			accent: {
                subContainer: 'bg-accent/30',
				container: "bg-accent",
				text: "text-accent",
			},
            success: {
                subContainer: 'bg-success/30',
                container: "bg-success",
                text: "text-success",
            },
            danger: {
                subContainer: 'bg-error/30',
                container: "bg-error",
                text: "text-error",
            },
            warning: {
                subContainer: 'bg-warning/30',
                container: "bg-warning",
                text: "text-warning",
            },
            info: {
                subContainer: 'bg-info/30',
                container: "bg-info",
                text: "text-info",
            },
		},
	},
	defaultVariants: {
		color: "primary",
	},
});


