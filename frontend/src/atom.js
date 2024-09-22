// atoms.js
import { atom } from 'recoil';

export const emailAtom = atom({
  key: 'emailAtom', // unique ID (with respect to other atoms/selectors)
  default: '',      // default value (aka initial value)
});

export const todo9State = atom({
 key: 'todo9State', // unique ID for this atom
 default: [],       // default value, an empty list for todos
});
