import {  INoteInput } from "@/interfaces";
import { ImBin2 } from "react-icons/im";
function NoteInput({
  languages,
  handleChangeNote,
  noteIndex,
  note,
  languageId,
  deleteNote,
  notes,
}: INoteInput) {

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
        name="language"
        onChange={handleChangeNote}
        value={languageId}
      >
        <option value="">Choisissez un langage</option>
        {languages.map((l) => (
          <option
            key={l.id}
            value={l.id}
            hidden={ notes.some((n) => n.language.id == l.id)}
          >
            {l.label}
          </option>
        ))}
      </select>
      <button data-noteindex={noteIndex} type="button" onClick={deleteNote}>
        <ImBin2 style={{ pointerEvents: "none" }} />
      </button>
    </div>
  );
}

export default NoteInput;
