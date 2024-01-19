import { create } from 'zustand';


interface AttachEntityStore {
    addOrRemove: string
    setAddOrRemove: (value: string) => void
    left: string | '';
    setLeft: (value: string | '') => void
    right: string | '';
    setRight: (value: string | '') => void
    rightOptions: string[];
    setRightOptions: (options: string[]) => void;
    leftOptions: string[]
}

const useAttachEntityStore = create<AttachEntityStore>(set => ({
    addOrRemove: "",
    setAddOrRemove: (value: string) =>
        set({ addOrRemove: value }),
    left: '',
    setLeft: (value) => {
        const rightOptions = getRightOptions(value);
        set({ left: value });
        set({ rightOptions });
    },
    right: '',
    setRight: (value) => set({ right: value }),
    rightOptions: [],
    setRightOptions: (options) => set({ rightOptions: options }),
    leftOptions: ["User", "Policy", "Action"]
}));

const getRightOptions = (leftValue: string | ''): string[] => {
    switch (leftValue) {
        case "User":
            return ["Policy", "Action", "Context"];
        case "Policy":
            return ["Action", "Context"];
        case "Action":
            return ["Context"];
        default:
            return [];
    }
};

export default useAttachEntityStore;
