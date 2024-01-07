import { create } from 'zustand';

interface AppStore {
    modalOpen: boolean;
    toggleModal: () => void;
}

const useAppStore = create<AppStore>(set => ({
    modalOpen: false,
    toggleModal: () => set(state => ({ modalOpen: !state.modalOpen })),
}));

export default useAppStore;
