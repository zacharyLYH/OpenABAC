import { Context } from '@/lib/interface';
import { create } from 'zustand';

interface ContextStore {
    createdContext: Context | null;
    setCreatedContext: (context: Context | null) => void;
}

const useContextStore = create<ContextStore>(set => ({
    createdContext: null,
    setCreatedContext: (context: Context | null) =>
        set({ createdContext: context }),
}));

export default useContextStore;
