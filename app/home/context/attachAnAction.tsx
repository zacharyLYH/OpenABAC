import {
    Card,
    CardContent,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import { TextBubble } from "@/components/ui/text-bubble"
import { Button } from "@/components/ui/button"
import useContextStore from "@/zustand/edit-pages/context-store"
import { useEffect, useState } from "react"
import { SearchAndSelect, SearchAndSelectInterface } from "@/components/edit-page-components/search"
import { PreviewCreateContext } from "./previewCreateContext"
import { MultiSkeleton } from "@/components/ui/multi-skeleton"
import { ArrowLeft, Link } from "lucide-react"
import { toast } from "sonner"

export const AttachToAction = () => {
    const { createdContext, setCreatedContext } = useContextStore()
    const [searchAndSelect, toggleSearchAndSelect] = useState(false)
    const [isFetching, setIsFetching] = useState(false)
    const [selectedActionsFromSearch, setSelectedActionsFromSearch] = useState<SearchAndSelectInterface[]>([])
    const [actionsForSearch, setActionsForSearch] = useState<SearchAndSelectInterface[]>([])
    const [isAttaching, setIsAttaching] = useState(false)
    useEffect(() => {
        const fetchAllContext = async () => {
            try {
                setIsFetching(true)
                const response = await fetch("/api/action/getActionViaSearch", { cache: "no-cache" });
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                const data = await response.json();
                setActionsForSearch(data.message);
            } catch (error) {
                console.error('Error fetching data:', error);
            } finally {
                setIsFetching(false)
            }
        };
        if (searchAndSelect) {
            fetchAllContext();
        }
    }, [searchAndSelect]);
    const attachContextToAction = () => {
        try {
            setIsAttaching(true)
            console.log("Trying to attach context to action ", selectedActionsFromSearch)
            toast.error(`Successfully attached context to ${selectedActionsFromSearch.length} action(s)`)
            setCreatedContext(null)
        } catch (error) {
            console.error(error)
            toast.error("Something went wrong. Try again.")
        } finally {
            setIsAttaching(false)
        }
    }
    return (
        <>
            {createdContext &&
                <div className="flex flex-col">
                    <Card>
                        <CardHeader>
                            <CardTitle>✅ Created</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <div className="flex flex-row">
                                <p className="text-muted-foreground">Description:</p>
                                <TextBubble text={createdContext.contextDescription} />
                            </div>
                            <div className="flex flex-row">
                                <p className="text-muted-foreground">Operator:</p>
                                <TextBubble text={createdContext.contextDescription} />
                            </div>
                            <div className="flex flex-row">
                                <p className="text-muted-foreground">Entity:</p>
                                <TextBubble text={createdContext.contextDescription} />
                            </div>
                            {createdContext.textValue ?
                                <div className="flex flex-row">
                                    <p className="text-muted-foreground">Text Value:</p>
                                    <TextBubble text={createdContext.textValue} />
                                </div> :
                                <>
                                    <div className="flex flex-row">
                                        <p className="text-muted-foreground">Time 1</p>
                                        <TextBubble text={createdContext.timeValue1!} />
                                    </div>
                                    <div className="flex flex-row">
                                        <p className="text-muted-foreground">Time 2</p>
                                        <TextBubble text={createdContext.timeValue2!} />
                                    </div>
                                </>
                            }
                        </CardContent>
                        <CardFooter>
                            <PreviewCreateContext context={createdContext} />
                        </CardFooter>
                    </Card>
                    {!searchAndSelect &&
                        <>
                            <p className="mt-4 font-mono">Would you like to attach this context to an Action while you're here? </p>
                            <div className="flex mx-2 gap-x-2">
                                <Button onClick={() => toggleSearchAndSelect(true)} className="w-1/2">
                                    Let's do it
                                </Button>
                                <Button onClick={() => setCreatedContext(null)} variant="destructive" className="w-1/2">
                                    No thanks
                                </Button>
                            </div>
                        </>
                    }
                    {
                        searchAndSelect && (
                            isFetching ? (
                                <div className="space-y-2 mt-4">
                                    <MultiSkeleton number={5} />
                                </div>
                            ) : (
                                <div className="mt-2 space-y-2">
                                    <Button disabled={selectedActionsFromSearch.length !== 0} variant="outline" className="w-full" onClick={() => { toggleSearchAndSelect(false); setSelectedActionsFromSearch([]) }}>
                                        <ArrowLeft className="w-5 h-5" />{selectedActionsFromSearch.length !== 0 ? "Remove all selections to go back" : "Back"}
                                    </Button>
                                    <SearchAndSelect container={selectedActionsFromSearch} setContainer={setSelectedActionsFromSearch} objName="Action" data={actionsForSearch ?? []} placeholder="Search Actions..." />
                                    <Button onClick={attachContextToAction}>
                                        <Link className="w-r h-4" />{isAttaching ? "Attaching..." : "Attach"}
                                    </Button>
                                </div>
                            )
                        )
                    }
                </div>
            }
        </>
    )
}