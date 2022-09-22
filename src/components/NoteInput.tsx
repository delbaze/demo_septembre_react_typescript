import { INoteInput } from "@/interfaces";

function NoteInput({ languages, handleChangeNote, noteIndex, note, languageId }: INoteInput) {
  console.log("🟩🟩🟩🟩🟩 ~ file: NoteInput.tsx ~ line 4 ~ NoteInput ~ languageId", languageId)
  return (
    <div>
      <input
        data-noteindex={noteIndex}
        name="note"
        type="number"
        placeholder="Indiquez la note"
        onChange={handleChangeNote}
        value={note}
      />
      <select
        data-noteindex={noteIndex}
        name="languageId"
        onChange={handleChangeNote}
        value={languageId}
      >
        <option value="">Choisissez un langage</option>
        {languages.map((l) => (
          <option key={l.id} value={l.id}>
            {l.label}
          </option>
        ))}
      </select>
    </div>
  );
}

export default NoteInput;
