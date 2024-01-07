import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import {
    Check,
    Container,
    FileWarningIcon,
    Move,
    Scroll,
    User,
} from 'lucide-react';
import ViewUserTab from './_tab-options/user-tab';
import { Suspense } from 'react';
import { TableSuspenseSkeleton } from '@/components/table-suspense';
import ViewActionsTab from './_tab-options/actions-tab';
import { getAllUsers } from '@/lib/service/user/get-user';
import ViewPolicyTab from './_tab-options/policy-tab';
import ViewContextsTab from './_tab-options/context-tab';
import { getAllContext } from '@/lib/service/context/get-context';
import { getAllPolicy } from '@/lib/service/policy/get-policy';
import { getAllActions } from '@/lib/service/action/get-action';

function TabSectionCard({
    title,
    value,
    description,
    icon,
}: {
    title: string;
    value: string;
    description?: string;
    icon?: JSX.Element;
}) {
    return (
        <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">{title}</CardTitle>
                {icon}
            </CardHeader>
            <CardContent>
                <div className="text-2xl font-bold">{value}</div>
                <CardDescription>{description}</CardDescription>
            </CardContent>
        </Card>
    );
}

export default async function HomePage() {
    const [user, context, policy, action] = await Promise.all([
        getAllUsers(),
        getAllContext(),
        getAllPolicy(),
        getAllActions(),
    ]);
    return (
        <div className="flex-1 space-y-4 p-8 pt-6">
            <h2 className="text-5xl font-bold tracking-tight">Dashboard</h2>
            <Tabs defaultValue="overview" className="space-y-4">
                <TabsList>
                    <TabsTrigger value="overview">Overview</TabsTrigger>
                    <TabsTrigger value="user">Users</TabsTrigger>
                    <TabsTrigger value="policies">Policies</TabsTrigger>
                    <TabsTrigger value="actions">Actions</TabsTrigger>
                    <TabsTrigger value="context">Contexts</TabsTrigger>
                </TabsList>
                <TabsContent value="overview" className="space-y-4">
                    <Suspense fallback={<TableSuspenseSkeleton />}>
                        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
                            <TabSectionCard
                                title="#Users"
                                value={user.length.toString()}
                                icon={<User className="h-5 w-5" />}
                            />
                            <TabSectionCard
                                title="#Policies"
                                value={policy.length.toString()}
                                icon={<Scroll className="h-5 w-5" />}
                            />
                            <TabSectionCard
                                title="#Actions"
                                value={action.length.toString()}
                                icon={<Move className="h-5 w-5" />}
                            />
                            <TabSectionCard
                                title="#Context"
                                value={context.length.toString()}
                                icon={<Container className="h-5 w-5" />}
                            />
                            <TabSectionCard
                                title="#Successful Authorizations"
                                value="+573"
                                description="+201 since last hour"
                                icon={<Check className="h-5 w-5" />}
                            />
                            <TabSectionCard
                                title="#Failed Authorizations"
                                value="+573"
                                description="+201 since last hour"
                                icon={<FileWarningIcon className="h-5 w-5" />}
                            />
                        </div>
                    </Suspense>
                </TabsContent>
                <TabsContent value="user">
                    <Suspense fallback={<TableSuspenseSkeleton />}>
                        <ViewUserTab user={user} />
                    </Suspense>
                </TabsContent>
                <TabsContent value="actions">
                    <Suspense fallback={<TableSuspenseSkeleton />}>
                        <ViewActionsTab action={action} />
                    </Suspense>
                </TabsContent>
                <TabsContent value="policies">
                    <Suspense fallback={<TableSuspenseSkeleton />}>
                        <ViewPolicyTab policy={policy} />
                    </Suspense>
                </TabsContent>
                <TabsContent value="context">
                    <Suspense fallback={<TableSuspenseSkeleton />}>
                        <ViewContextsTab context={context} />
                    </Suspense>
                </TabsContent>
            </Tabs>
        </div>
    );
}
