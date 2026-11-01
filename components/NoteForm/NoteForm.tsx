"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useQueryClient } from "@tanstack/react-query";
import css from "./NoteForm.module.css";
import type { NoteTag } from "@/types/note";
import { createNote } from "@/lib/api";
import { useNoteStore } from "@/lib/store/noteStore";

const tags: NoteTag[] = ["Todo", "Work", "Personal", "Meeting", "Shopping"];

export default function NoteForm() {
  const router = useRouter();
  const queryClient = useQueryClient();
  const draft = useNoteStore((state) => state.draft);
  const setDraft = useNoteStore((state) => state.setDraft);
  const clearDraft = useNoteStore((state) => state.clearDraft);
  const [isHydrated, setIsHydrated] = useState(false);

  useEffect(() => {
    setIsHydrated(true);
  }, []);

  const handleSubmit = async (formData: FormData) => {
    await createNote({
      title: String(formData.get("title") ?? ""),
      content: String(formData.get("content") ?? ""),
      tag: (formData.get("tag") as NoteTag) ?? "Todo",
    });

    clearDraft();
    await queryClient.invalidateQueries({ queryKey: ["notes"] });
    router.push("/notes/filter/all");
  };

  const handleCancel = () => {
    router.back();
  };

  if (!isHydrated) {
    return null;
  }

  return (
    <form className={css.form}>
      <div className={css.formGroup}>
        <label htmlFor="title">Title</label>
        <input
          id="title"
          type="text"
          name="title"
          className={css.input}
          defaultValue={draft.title}
          onChange={(event) =>
            setDraft({ ...draft, title: event.target.value })
          }
          required
          minLength={3}
          maxLength={50}
        />
      </div>

      <div className={css.formGroup}>
        <label htmlFor="content">Content</label>
        <textarea
          id="content"
          name="content"
          rows={8}
          className={css.textarea}
          defaultValue={draft.content}
          onChange={(event) =>
            setDraft({ ...draft, content: event.target.value })
          }
          maxLength={500}
        />
      </div>

      <div className={css.formGroup}>
        <label htmlFor="tag">Tag</label>
        <select
          id="tag"
          name="tag"
          className={css.select}
          defaultValue={draft.tag}
          onChange={(event) =>
            setDraft({ ...draft, tag: event.target.value as NoteTag })
          }
          required
        >
          {tags.map((tag) => (
            <option key={tag} value={tag}>
              {tag}
            </option>
          ))}
        </select>
      </div>

      <div className={css.actions}>
        <button
          type="button"
          className={css.cancelButton}
          onClick={handleCancel}
        >
          Cancel
        </button>
        <button
          type="submit"
          className={css.submitButton}
          formAction={handleSubmit}
        >
          Create note
        </button>
      </div>
    </form>
  );
}
