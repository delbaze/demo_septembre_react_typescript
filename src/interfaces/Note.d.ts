import ILanguage from "@/interfaces";
import { ChangeEvent } from "react";
export interface INote {
  id: number;
  note: number;
  language: ILanguage;
}

export interface INoteInfos {
  [key: string] : any
  id?: number;
  note: string;
  languageId: string;
}

export interface INoteInput {
  languages: ILanguage[];
  handleChangeNote: (
    e: ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => void;
  noteIndex: number;
  note: string;
  languageId: string;
}

export interface INewNotes{
    [key: string] : any;
    notes: INotes[];
}
// {
//     "id": 1,
//     "note": 10,
//     "language": {
//         "id": 2,
//         "label": "JS"
//     }
// }
// ]
