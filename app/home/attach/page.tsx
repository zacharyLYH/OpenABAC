'use client';

import useAttachEntityStore from '@/zustand/attach-entity-store';
import { SelectComponent } from './selectors';
import AttachPageSearch, {
    AttachPageSearchProps,
} from '@/components/attach-page-components/search';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { cn } from '@/lib/utils';

const attachPageSearchGenerator = (obj: AttachPageSearchProps) => {
    return (
        <AttachPageSearch
            addOrRemove={obj.addOrRemove}
            entity={obj.entity}
            selected={obj.selected}
            setSelected={obj.setSelected}
            mountIndicator={obj.mountIndicator}
            placeholder={obj.placeholder}
            maxAllowSelect={obj.maxAllowSelect}
        />
    );
};

const AttachEntity = () => {
    const {
        addOrRemove,
        setAddOrRemove,
        left,
        setLeft,
        right,
        leftOptions,
        leftSelected,
        setLeftSelected,
        rightSelected,
        setRightSelected,
    } = useAttachEntityStore();
    const setAddOrRemoveOptions = ['Add', 'Remove'];
    const addLeft = {
        addOrRemove: addOrRemove,
        entity: left,
        selected: leftSelected,
        setSelected: setLeftSelected,
        mountIndicator: left.length > 0 && right.length > 0,
        placeholder: `Select ${left}...`,
        maxAllowSelect: 2000,
    };
    const addRight = {
        addOrRemove: right,
        entity: right,
        selected: rightSelected,
        setSelected: setRightSelected,
        mountIndicator:
            left.length > 0 && right.length > 0 && leftSelected.length > 0,
        placeholder: `Select (1) ${right}...`,
        maxAllowSelect: 1,
    };
    const removeLeft = {
        addOrRemove: right,
        entity: right,
        selected: rightSelected,
        setSelected: setRightSelected,
        mountIndicator: left.length > 0 && right.length > 0,
        placeholder: `Select (1) ${right}...`,
        maxAllowSelect: 1,
    };
    const removeRight = {
        addOrRemove: addOrRemove,
        entity: left,
        selected: leftSelected,
        setSelected: setLeftSelected,
        mountIndicator:
            left.length > 0 && right.length > 0 && rightSelected.length > 0,
        placeholder: `Select ${left}...`,
        maxAllowSelect: 2000,
    };
    return (
        <section>
            <div className="flex flex-row gap-x-4 items-center justify-center p-8">
                <SelectComponent
                    options={setAddOrRemoveOptions}
                    container={setAddOrRemove}
                    placeholder="Add/Remove..."
                />
                <SelectComponent
                    options={leftOptions}
                    container={setLeft}
                    placeholder="Entity..."
                    disabled={addOrRemove.length === 0}
                />
                <p>{addOrRemove === 'Add' ? 'To' : 'From'}</p>
                <Input className="max-w-24" value={right} disabled readOnly />
            </div>
            {addOrRemove && left && right && (
                <div className="flex flex-row w-full">
                    <div className="flex items-center justify-center w-full border rounded-xl mx-3">
                        {addOrRemove === 'Add'
                            ? attachPageSearchGenerator(addLeft)
                            : attachPageSearchGenerator(removeLeft)}
                    </div>
                    <div className="flex items-center justify-center w-full border rounded-xl mx-3">
                        {left.length > 0 && right.length > 0 ? (
                            addOrRemove === 'Add' && leftSelected.length > 0 ? (
                                attachPageSearchGenerator(addRight)
                            ) : addOrRemove === 'Remove' &&
                              rightSelected.length > 0 ? (
                                attachPageSearchGenerator(removeRight)
                            ) : (
                                <p>
                                    👈 Select{' '}
                                    {addOrRemove === 'Add' ? left : right} to{' '}
                                    {addOrRemove === 'Add'
                                        ? 'add to'
                                        : 'remove'}{' '}
                                    {addOrRemove === 'Add'
                                        ? right
                                        : left + ' from'}
                                </p>
                            )
                        ) : (
                            <p>👈 Both left and right lists must have items</p>
                        )}
                    </div>
                </div>
            )}
            <div
                className={cn(
                    'flex justify-center items-center my-4',
                    !(
                        addOrRemove &&
                        left &&
                        right &&
                        leftSelected.length > 0 &&
                        rightSelected.length > 0
                    ) && 'cursor-not-allowed',
                )}
            >
                <Button
                    disabled={
                        addOrRemove &&
                        left &&
                        right &&
                        leftSelected.length > 0 &&
                        rightSelected.length > 0
                            ? false
                            : true
                    }
                    className="cursor-pointer"
                    size="lg"
                >
                    Submit
                </Button>
            </div>
        </section>
    );
};

export default AttachEntity;
