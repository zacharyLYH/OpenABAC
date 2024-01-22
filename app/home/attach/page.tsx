"use client"

import useAttachEntityStore from "@/zustand/attach-entity-store"
import { SelectComponent } from "./selectors"
import AttachPageSearch from "@/components/attach-page-components/search";
import { Button } from "@/components/ui/button";
import { Input } from '@/components/ui/input';

const AttachEntity = () => {
    const { addOrRemove, setAddOrRemove, left, setLeft, right, leftOptions, leftSelected, setLeftSelected, rightSelected, setRightSelected } = useAttachEntityStore();
    const setAddOrRemoveOptions = ['Add', 'Remove']
    return (
        <section>
            <div className="flex flex-row gap-x-4 items-center justify-center p-8">
                <SelectComponent options={setAddOrRemoveOptions} container={setAddOrRemove} placeholder="Add/Remove..." />
                <SelectComponent options={leftOptions} container={setLeft} placeholder="Entity..." disabled={addOrRemove.length === 0} />
                <p>{addOrRemove === 'Add' ? 'To' : 'From'}</p>
                <Input className="max-w-24" value={right} disabled readOnly />
            </div>
            {addOrRemove && left && right &&
                <div className="flex flex-row w-full">
                    <div className="flex items-center justify-center w-full border rounded-xl mx-3">
                        <AttachPageSearch
                            addOrRemove={addOrRemove}
                            entity={left}
                            selected={leftSelected}
                            setSelected={setLeftSelected}
                            mountIndicator={left.length > 0 && right.length > 0}
                            placeholder={`Select ${left}...`}
                        />
                    </div>
                    <div className="flex items-center justify-center w-full border rounded-xl mx-3">
                        {left.length > 0 && right.length > 0 && leftSelected.length > 0 ?
                            <AttachPageSearch
                                addOrRemove={right}
                                entity={right}
                                selected={rightSelected}
                                setSelected={setRightSelected}
                                mountIndicator={left.length > 0 && right.length > 0 && leftSelected.length > 0}
                                placeholder={`Select (1) ${right}...`}
                                maxAllowSelect={1}
                            /> : <p>👈 Select {left} to {addOrRemove === "Add" ? "add to" : "remove from "} {right} </p>}
                    </div>
                </div>
            }
            <div className="flex justify-center items-center my-4">
                <Button
                    disabled={addOrRemove && left && right && leftSelected.length > 0 && rightSelected.length > 0 ? false : true}
                    size='lg'>
                    Submit
                </Button>
            </div>
        </section>
    )
}

export default AttachEntity