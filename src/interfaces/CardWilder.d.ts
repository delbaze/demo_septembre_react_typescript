import { INote } from "./Note.d";
export interface ICardWilderProps {
  id: number;
  firstName: string;
  getWilders: any;
  notes: INote[];
}
