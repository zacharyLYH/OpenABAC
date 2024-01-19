import { Policy } from '@/lib/interface';
import { create } from 'zustand';

interface PolicyStore {
    createdPolicy: Policy | null;
    setCreatedPolicy: (Policy: Policy | null) => void;
    editClickedIndicator: boolean;
    setEditClickedIndicator: (clicked: boolean) => void;
    deleteClickedIndicator: boolean;
    setDeleteClickedIndicator: (clicked: boolean) => void;
}

const usePolicyStore = create<PolicyStore>(set => ({
    // createdPolicy: null,
    createdPolicy: {
        id: '1',
        policyName: 'Policy 1',
        policyDescription: 'Description of Policy 1',
        modifiedDate: new Date('2023-01-01'),
        createdDate: new Date('2023-01-01'),
        allow: true,
    },
    setCreatedPolicy: (Policy: Policy | null) =>
        set({ createdPolicy: Policy }),
    editClickedIndicator: false,
    setEditClickedIndicator: (clicked: boolean) =>
        set({ editClickedIndicator: clicked }),
    deleteClickedIndicator: false,
    setDeleteClickedIndicator: (clicked: boolean) =>
        set({ deleteClickedIndicator: clicked }),
}));

export default usePolicyStore;
