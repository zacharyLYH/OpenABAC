import { User } from '@/abac/interface';
import { create } from 'zustand';

interface UserStore {
    createdUser: User | null;
    setCreatedUser: (User: User | null) => void;
    editClickedIndicator: boolean;
    setEditClickedIndicator: (clicked: boolean) => void;
    deleteClickedIndicator: boolean;
    setDeleteClickedIndicator: (clicked: boolean) => void;
}

const useUserStore = create<UserStore>(set => ({
    // createdUser: null,
    createdUser: {
        jsonCol: {
            name: 'John Doe',
            age: 30,
            occupation: 'Engineer',
        },
        applicationUserId: '012345',
        id: '001',
        modifiedDate: new Date(), // Current date and time
        createdDate: new Date('2023-01-01'), // Specific date
    },
    setCreatedUser: (User: User | null) => set({ createdUser: User }),
    editClickedIndicator: false,
    setEditClickedIndicator: (clicked: boolean) =>
        set({ editClickedIndicator: clicked }),
    deleteClickedIndicator: false,
    setDeleteClickedIndicator: (clicked: boolean) =>
        set({ deleteClickedIndicator: clicked }),
}));

export default useUserStore;
