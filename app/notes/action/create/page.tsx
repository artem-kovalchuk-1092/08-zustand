import type { Metadata } from "next";
import NoteForm from "@/components/NoteForm/NoteForm";
import css from "./CreateNote.module.css";

const ogImage = {
  url: "https://ac.goit.global/fullstack/react/notehub-og-meta.jpg",
  width: 1200,
  height: 630,
  alt: "NoteHub",
};

export const metadata: Metadata = {
  title: "Create note | NoteHub",
  description: "Create a new note and save it to your NoteHub collection.",
  openGraph: {
    title: "Create note | NoteHub",
    description: "Create a new note and save it to your NoteHub collection.",
    url: "https://notehub.com/notes/action/create",
    images: [ogImage],
  },
};

export default function CreateNote() {
  return (
    <main className={css.main}>
      <div className={css.container}>
        <h1 className={css.title}>Create note</h1>
        <NoteForm />
      </div>
    </main>
  );
}
