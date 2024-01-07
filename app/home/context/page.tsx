import { CreateContextForm } from '@/components/edit-page-components/create-button/context/form';
import { CreateButton } from '@/components/edit-page-components/create-button/create-button';

export default async function ContextPage() {
    return (
        <div>
            Edit Context data page
            <CreateButton objName="Context" form={<CreateContextForm />} />
        </div>
    );
}
