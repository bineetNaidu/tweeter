import create from 'zustand';
import { User } from '../generated/graphql';

interface IState {
  isLogged: boolean;
  user: User | null;
  setUser: (user: User) => void;
}

export const useStore = create<IState>((set) => ({
  isLogged: false,
  user: null,
  setUser: (user) =>
    set(() => ({
      isLogged: user ? true : false,
      user,
    })),
}));
