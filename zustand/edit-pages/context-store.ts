import { SearchBarInterface } from '@/components/edit-page-components/search';
import { Context } from '@/lib/interface';
import { create } from 'zustand';

interface ContextStore {
    createdContext: Context | null;
    setCreatedContext: (context: Context | null) => void;
    actionsForSearch: SearchBarInterface[] | [];
    setActionsForSearch: (contexts: SearchBarInterface[] | []) => void;
    selectedActionsFromSearch: SearchBarInterface[] | [];
    setSelectedActionsFromSearch: (contexts: SearchBarInterface[] | []) => void;
}

const useContextStore = create<ContextStore>(set => ({
    // createdContext: null,
    createdContext: {
        id: 'uuid-1',
        contextDescription: 'Context Desc 1',
        operator: 'equals',
        entity: 'Entity1',
        textValue: 'Text1',
        timeValue1: '2023-01-01T00:00:00.000Z',
        timeValue2: '2023-01-02T00:00:00.000Z',
        modifiedDate: new Date('2023-01-01'),
        createdDate: new Date('2023-01-01'),
    },
    setCreatedContext: (context: Context | null) =>
        set({ createdContext: context }),
    actionsForSearch: [],
    setActionsForSearch: (actions: SearchBarInterface[] | []) =>
        set({ actionsForSearch: actions }),
    selectedActionsFromSearch: [],
    setSelectedActionsFromSearch: (actions: SearchBarInterface[] | []) =>
        set({ selectedActionsFromSearch: actions }),
}));

export default useContextStore;
