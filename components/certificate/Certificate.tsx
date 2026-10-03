import { Cormorant_Garamond } from "next/font/google";
import { TEMPLATES, type TemplateProps } from "./templates";
import theme from "./theme.module.css";

const cormorant = Cormorant_Garamond({
  variable: "--font-cormorant",
  subsets: ["latin"],
  style: ["normal", "italic"],
});

// The certificate root: shared theme and font, with the chosen template inside.
export function Certificate({ data }: TemplateProps) {
  const { Component } = TEMPLATES[data.templateId];

  return (
    <article className={`${cormorant.variable} ${theme.theme}`}>
      <Component data={data} />
    </article>
  );
}
