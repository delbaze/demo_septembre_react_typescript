import { useState, useEffect, FormEvent, ChangeEvent } from "react";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import NoteInput from "../components/NoteInput";
import { useParams, useNavigate } from "react-router-dom";
import { ILanguage, INewNotes, INoteInfos } from "@/interfaces";
function CreateWilder() {
  const params = useParams();
  const navigate = useNavigate();
  const { id } = params;
  const [state, setState] = useState({
    first_name: "",
    last_name: "",
    age: "",
  });
  const [noMoreSelected, setNoMoreSelected] = useState<boolean>(false);

  const [languages, setLanguages] = useState<ILanguage[]>([]);
  const [notes, setNotes] = useState<INoteInfos[]>([]); //{ note: 3, languageId: 1}
  const canBeSubmit = () => {
    return !state.first_name || !state.last_name || !state.age;
  };
  useEffect(() => {
    if (id) {
      axios
        .get(`/wilders/${id}`)
        .then((response) => {
          if (response.data.success) {
            setState(response.data.wilder);
            if (response.data.wilder.notes.length > 0) {
              setNotes(response.data.wilder.notes);
            }
          }
        })
        .catch((err) => {
          console.log(err.response.status);
          if (err.response.status === 404) {
            toast("Ce wilder n'existe pas", { type: "error" });
          }
        });
    } else {
      setState({
        first_name: "",
        last_name: "",
        age: "",
      });
      setNotes([]);
    }
    axios.get("/languages").then((response) => {
      setLanguages(response.data.languages);
    });
  }, [id]);

  const handleSubmit = (e: FormEvent) => {
    // const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault(); //On stoppe le comportement initial du onSubmit
    if (state.first_name && state.last_name && state.age) {
      if (id) {
        //edition
        axios
          .patch(`/wilders/update/${id}`, { ...state, notes })
          .then((response) => {
            if (response.data.wilder.affected !== 0) {
              navigate("/", { replace: true });
            } else {
              console.log("afficher une erreur");
            }
          })
          .catch((err) => {
            console.log(err);
          });
      } else {
        axios
          .post("/wilders/create", { ...state, notes })
          .then(function (response) {
            toast(response.data.message, {
              type: response.data.success ? "success" : "error",
            });
            // e.target.reset(); // on vide les champs du formulaire
            setState({ first_name: "", last_name: "", age: "" });
          })
          .catch(function (error) {
            console.log(error);
          });
      }
    }
  };

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    let name = e.target.name; //first_name
    let value = e.target.value; //
    setState({ ...state, [name]: value });
  };

  const addNote = () => {
    setNotes([...notes, { note: "", language: {} }]);
  };

  const handleChangeNote = (
    e: ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    let value = e.target.value;
    let noteIndex = e.target.dataset.noteindex as any as number;
    let name = e.target.name;
    let newNotes = [...notes];
    if (noteIndex) {
      if (name !== "language") {
        newNotes[noteIndex][name] = value;
      } else {
        newNotes[noteIndex][name]["id"] = value;
      }
      setNotes(newNotes);
    }
  };
  useEffect(() => {
    setNoMoreSelected(notes.length === languages.length);
  }, [notes, languages]);

  const deleteNote = (e: FormEvent<HTMLButtonElement>): void => {
    let noteIndex = e.currentTarget.getAttribute(
      "data-noteindex"
    ) as any as number;
    let listNotes = [...notes];
    listNotes.splice(noteIndex, 1);
    setNotes(listNotes);
  };

  return (
    <div>
      <form onSubmit={handleSubmit} action="/">
        <div>
          <label htmlFor="first_name">Nom du wilder</label>
          <input
            name="first_name"
            onChange={handleChange}
            required
            value={state.first_name}
          />
        </div>
        <div>
          <label htmlFor="last_name">Prénom du wilder</label>
          <input
            name="last_name"
            onChange={handleChange}
            required
            value={state.last_name}
          />
        </div>
        <div>
          <label htmlFor="age">Age du wilder</label>
          <input
            name="age"
            type="number"
            onChange={handleChange}
            required
            value={state.age}
          />
          <button type="button" disabled={noMoreSelected} onClick={addNote}>
            {noMoreSelected
              ? "Plus de langages disponibles"
              : "Ajouter une note"}
          </button>
          {notes.map((n, index) => (
            <NoteInput
              languages={languages}
              key={index}
              note={n.note}
              languageId={n.language.id}
              noteIndex={index}
              handleChangeNote={handleChangeNote}
              deleteNote={deleteNote}
              notes={notes}
            />
          ))}
        </div>

        <button type="submit" disabled={canBeSubmit()}>
          {id ? "Editer" : "Ajouter"}
        </button>
      </form>
      <ToastContainer />
    </div>
  );
}

export default CreateWilder;
