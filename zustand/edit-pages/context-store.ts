import { SearchAndSelectInterface } from '@/components/edit-page-components/search';
import { Context } from '@/lib/interface';
import { create } from 'zustand';

interface ContextStore {
    createdContext: Context | null;
    setCreatedContext: (context: Context | null) => void;
    actionsForSearch: SearchAndSelectInterface[] | [];
    setActionsForSearch: (contexts: SearchAndSelectInterface[] | []) => void;
    selectedActionsFromSearch: SearchAndSelectInterface[] | [];
    setSelectedActionsFromSearch: (actions: SearchAndSelectInterface[] | []) => void;
    editClickedIndicator: boolean;
    setEditClickedIndicator: (clicked: boolean) => void;
}

const useContextStore = create<ContextStore>(set => ({
    createdContext: null,
    // createdContext: {
    //     id: 'uuid-1',
    //     contextDescription: 'Context Desc 1',
    //     operator: 'equals',
    //     entity: 'Entity1',
    //     textValue: 'Text1',
    //     timeValue1: '2023-01-01T00:00:00.000Z',
    //     timeValue2: '2023-01-02T00:00:00.000Z',
    //     modifiedDate: new Date('2023-01-01'),
    //     createdDate: new Date('2023-01-01'),
    // },
    setCreatedContext: (context: Context | null) =>
        set({ createdContext: context }),
    actionsForSearch: [],
    setActionsForSearch: (actions: SearchAndSelectInterface[] | []) =>
        set({ actionsForSearch: actions }),
    selectedActionsFromSearch: [],
    setSelectedActionsFromSearch: (actions: SearchAndSelectInterface[] | []) =>
        set({ selectedActionsFromSearch: actions }),
    editClickedIndicator: false,
    setEditClickedIndicator: (clicked: boolean) =>
        set({ editClickedIndicator: clicked })
}));

export default useContextStore;
