"use client";

interface NotesErrorProps {
  error: Error;
}

export default function NotesError({ error }: NotesErrorProps) {
  return <p>Could not fetch the list of notes. {error.message}</p>;
}
