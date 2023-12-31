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
import { SearchBar } from "@/components/edit-page-components/search"
import { PreviewCreateContext } from "./previewCreateContext"
import { Skeleton } from "@/components/ui/skeleton"

export const AttachToAction = () => {
    const { createdContext, setCreatedContext, contextForSearch, setContextForSearch } = useContextStore()
    const [searchBar, toggleSearchBar] = useState(false)
    const [isFetching, setIsFetching] = useState(false)
    useEffect(() => {
        const fetchAllContext = async () => {
            try {
                setIsFetching(true)
                const response = await fetch("/api/context/getAll");
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                const data = await response.json();
                setContextForSearch(data.message);
            } catch (error) {
                console.error('Error fetching data:', error);
            } finally {
                setIsFetching(false)
            }
        };
        if (contextForSearch.length === 0) {
            fetchAllContext();
        }
    }, [searchBar]);
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
                    {!searchBar &&
                        <>
                            <p className="mt-4 font-mono">Would you like to attach this context to an Action while you're here? </p>
                            <div className="flex mx-2 gap-x-2">
                                <Button onClick={() => toggleSearchBar(true)} className="w-1/2">
                                    Let's do it
                                </Button>
                                <Button onClick={() => setCreatedContext(null)} variant="destructive" className="w-1/2">
                                    No thanks
                                </Button>
                            </div>
                        </>
                    }
                    {
                        searchBar && (
                            isFetching ? (
                                <div className="space-y-2">
                                    <Skeleton className="h-16 w-3/4" />
                                    <Skeleton className="h-16 w-3/4" />
                                    <Skeleton className="h-16 w-3/4" />
                                    <Skeleton className="h-16 w-3/4" />
                                </div>
                            ) : (
                                <SearchBar objName="actions to add" data={contextForSearch ?? []} placeholder="Search Actions..." />
                            )
                        )
                    }
                </div>
            }
        </>
    )
}