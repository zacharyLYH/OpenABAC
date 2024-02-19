import { Action } from '@/abac/interface';
import { create } from 'zustand';

interface ActionStore {
    createdAction: Action | null;
    setCreatedAction: (Action: Action | null) => void;
    editClickedIndicator: boolean;
    setEditClickedIndicator: (clicked: boolean) => void;
    deleteClickedIndicator: boolean;
    setDeleteClickedIndicator: (clicked: boolean) => void;
}

const useActionStore = create<ActionStore>(set => ({
    // createdAction: null,
    createdAction: {
        id: 'uuid1',
        actionName: 'Login',
        actionDescription: 'User login action',
        modifiedDate: new Date(),
        createdDate: new Date('2023-01-05'),
    },
    setCreatedAction: (Action: Action | null) => set({ createdAction: Action }),
    editClickedIndicator: false,
    setEditClickedIndicator: (clicked: boolean) =>
        set({ editClickedIndicator: clicked }),
    deleteClickedIndicator: false,
    setDeleteClickedIndicator: (clicked: boolean) =>
        set({ deleteClickedIndicator: clicked }),
}));

export default useActionStore;
