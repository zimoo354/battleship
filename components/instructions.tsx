import { CONTENT } from "@/constants/content";
import Markdown from "react-markdown";

const { instructions } = CONTENT;

export const Instructions = () => (
  <div className="markdown border border-slate-300 bg-slate-50 p-8 rounded-lg max-w-2xl shadow-md">
    <Markdown>{instructions}</Markdown>
  </div>
);
