import { SearchAndSelectInterface } from '@/components/edit-page-components/search';
import { create } from 'zustand';


interface AttachEntityStore {
    addOrRemove: string
    setAddOrRemove: (value: string) => void
    left: string | '';
    setLeft: (value: string | '') => void
    right: string | '';
    leftOptions: string[]
    leftSelected: SearchAndSelectInterface[]
    setLeftSelected: (item: SearchAndSelectInterface[]) => void
    rightSelected: SearchAndSelectInterface[]
    setRightSelected: (item: SearchAndSelectInterface[]) => void
}

const useAttachEntityStore = create<AttachEntityStore>(set => ({
    addOrRemove: "",
    setAddOrRemove: (value: string) =>
        set({ addOrRemove: value, left: '', right: '', leftSelected: [], rightSelected: [] }),
    left: '',
    setLeft: (value: string) => {
        set((state) => {
            const right = getRightOptions(value, state.addOrRemove);
            return { left: value, right, leftSelected: [], rightSelected: [] };
        });
    },
    right: '',
    leftOptions: ["Policy", "Action", "Context"],
    leftSelected: [],
    setLeftSelected: (item: SearchAndSelectInterface[]) => {
        set({ leftSelected: item });
    },
    rightSelected: [],
    setRightSelected: (item: SearchAndSelectInterface[]) => {
        set({ rightSelected: item });
    },
}));

const getRightOptions = (leftValue: string, addOrRemove: string): string => {
    if (addOrRemove) {
        switch (leftValue) {
            case 'Policy': return "User"
            case 'Action': return "Policy"
            case "Context": return "Action"
        }
    }
    return ""
};

export default useAttachEntityStore;
