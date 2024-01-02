import { MainNav } from "@/components/navbar";

export default function HomeLayout({ children }: { children: React.ReactNode }) {
    return <section className="container relative">
        <div className="border-b">
            <div className="flex h-16 p-4 items-center">
                <MainNav />
            </div>
            <div className="overflow-hidden rounded-[0.5rem] border bg-background shadow-md md:shadow-xl h-full">
                {children}
            </div>
        </div>
    </section>
}