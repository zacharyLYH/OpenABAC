"use client"

import useAttachEntityStore from "@/zustand/attach-entity-store"
import { SelectComponent } from "./selectors"

const AttachEntity = () => {
    const { addOrRemove, setAddOrRemove, left, setLeft, right, setRight, rightOptions, leftOptions } = useAttachEntityStore();
    const setAddOrRemoveOptions = ['Add', 'Remove']
    return (
        <section className="flex flex-col p-8">
            <p className="text-lg bold">Start by selecting an operation: </p>
            <SelectComponent options={setAddOrRemoveOptions} container={setAddOrRemove} />
            {addOrRemove &&
                <>
                    <p className="text-lg bold">Next select to and from: </p>
                    <div className="flex flex-row gap-x-10 w-full">
                        <SelectComponent options={leftOptions} container={setLeft} />
                        <SelectComponent options={rightOptions} container={setRight} disabled={left === ""} />
                    </div>
                </>
            }
            {addOrRemove && left && right &&
                <div className="flex flex-row gap-x-10 w-full">
                    <div className="flex items-center justify-center w-full border rounded-xl ">
                        SIngle
                    </div>
                    <div className="flex items-center justify-center w-full border rounded-xl ">
                        Many
                    </div>
                </div>
            }
        </section>
    )
}

export default AttachEntity