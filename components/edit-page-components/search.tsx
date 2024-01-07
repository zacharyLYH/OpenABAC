import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

interface SearchBarProps {
    objName: string;
    placeholder: string;
}

export const SearchBar: React.FC<SearchBarProps> = ({
    objName,
    placeholder,
}) => {
    return (
        <div className="grid w-full max-w-sm items-center gap-1.5">
            <Label htmlFor="search-bar">Search {objName}</Label>
            <Input
                type="search-bar"
                id="search-bar"
                placeholder={placeholder}
            />
        </div>
    );
};
