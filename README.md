# OpenABAC

OpenABAC is an open sourced [attribute based access control](https://www.okta.com/blog/2020/09/attribute-based-access-control-abac/) system that largely follows the industry standard definition of ABAC. Forking and deploying this repo, developers can get an ABAC system up and running quickly and easily. The stand out feature of OpenABAC is a non technical friendly dashboard, aimed to lower the skill ceiling for system administrators to manage their enterprise's fork.

## Technical & Example

An attribute based access control (ABAC) is the granular cousin of the familiar and intuitive role based access control ([RBAC](https://www.digitalguardian.com/blog/what-role-based-access-control-rbac-examples-benefits-and-more)) system. Where RBAC defines access control at the role level, and then assigning each user type to a specific role/roles, ABAC systems define access control as **policies**, then associating policies to users. For further reading, here is a good [article](https://www.okta.com/identity-101/role-based-access-control-vs-attribute-based-access-control/) providing a comparison between these two authorization frameworks.

In a team, it is common for team members to have a core task, say addressing tickets from customer support. However, it is not uncommon for teams to be subdivided further into smaller tasks, like, developing feature X, documenting feature Y, cleaning dirty data in DB Z, etc. These sub teams may need access to certain tools that other sub teams don't require. In RBAC, since access permissions are defined ahead of time, you'll need N number of RBAC policies for the N sub teams you have. It is also not uncommon for another team outside the current team to access the same stuff, for example another M teams with only this permission in common might be contributing to documentation of feature Y. Suppose we want to revoke access to all contributors of feature Y, we will be required to change permissions in all M policies.

In ABAC, `Actions` are the building blocks of `Policies`, and `Policies` are a grouping of allowed actions for the policy holder. Every task from the previous paragraph can be considered an `Action`. In fact, it is **_best practice_** to further divide those tasks into components. For example, developing feature X might become

1. Read access for X
2. Write access for X
3. Export access for X
4. ...

Then, having your actions split into their smallest logical components, you may compose policies for various groups. Down the line, should a permission need to be revised, if your policies are correctly defined, revoking or simply updating the policy will cause all policy holders across M teams to be affected. Moreover, since policies are reusable, each team can just be thought of as a collection of policies. Adding and subtracting policies is trivial.

The "action oriented" nature of ABAC allows further access control that "user oriented" doesn't. Let's say, we want to allow access to the DB Z during work hours only. In RBAC, you would have to implement that logic in the application layer, polluting business logic with access control logic. In ABAC, a `Context` defines a parameter under which the `Action` requested shall be entertained.

> Pro tip: To determine if an Action requires further breaking down, ask yourself, is there a potential for different users to only require a subset of this Action?

> The key to defining policies intelligently is to understand your business case very well. Don't worry, OpenABAC provides APIs to create, delete, and modify policies. Your business logic can safely require changes to policies without any manual intervention.

## Is OpenABAC for me?

This project is for you if:
| | |
|-|-|
|✅|You want system administrators to be able to help diagnose authorization issues with minimal training |
|✅|[RBAC](https://www.digitalguardian.com/blog/what-role-based-access-control-rbac-examples-benefits-and-more) alone isn't sufficient|
|✅|You have an application where your users might need different permissions often |
|✅|You need a free and open sourced solution |
|✅|You want the convenience of a plug and play experience while leaving ability for optimization down the road |
|✅|You don't mind self hosting the ABAC system |

This project is **not** for you if:
| | |
|-|-|
|❌|You want a hosted solution |
|❌|Your application doesn't involve multiple entities accessing and modifying shared sensitive data |
|❌|You don't want to manage the complexity of an ABAC system |
|❌|You don't forsee access requirements changing often in your application |

## Usage pattern

[JWT](https://jwt.io/introduction)s are an industry standard for securely transmitting data. A private key, only known to the application and authorization service (OpenABAC) is used to digitally sign some data. Consider 2 sources of the same data, one properly signed with a private key and the other one a mere copy of the data, the data that was signed can be guaranteed to have come from the application's computation, while the mere copy will be identified and can be deemed illegitimate. OpenABAC is powered by this very principle.

To use OpenABAC, you will host a copy of OpenABAC. You'll also have your application. Imporatantly, it is extremely common for applications to have a method to identify users. By far, the most common method is [UUID](https://en.wikipedia.org/wiki/Universally_unique_identifier).

In the simplest implementation, when your user requests for some sensitive data from your application, your application will make an external api call to your hosted OpenABAC service for authorization. **That external API call needs to contain a JWT signed Bearer token of the user's unique identifier**, and in the url, the unique `actionName` your user is trying to perform. Between these 2 components, you'll tell OpenABAC the action your user is requesting to perform, and a non-fraudulent identification of the user. OpenABAC will then return a response telling you if your user has a policy that includes the `actionName`. Since the JWT was cryptographically signed by a private key only your server and your copy of OpenABAC knows, any successful JWT decoding on the ABAC side can be assumed to come from your server. To ensure that your JWT encoding stays secret, be sure to communicate via HTTPS and to rotate private keys regularly.

In advanced implementations, if your applciation runs on Typescript and you don't mind starting a MySQL data connection, you may copy the folder from `/abac`and all of its contents into your project. This folder contains all the logic for authorization. Doing so, your application will reduce some latency since you won't be making an authorization request from a separately hosted service.

## OpenABAC concepts

The authorization model in OpenABAC is simple. Whenever you need to know if a particular user of your application is allowed to perform a requested action, just send over the `actionName` and the `applicationUserId`. In the background, OpenABAC will efficiently lookup this `actionName` among all the possible actions this `applicationUserId` has a policy for, and if there's a match, an authorized message is sent back to the authorization caller (usually your apis).

An action is the smallest unit of work that your application will perform. To decide what should be an action and what shouldn't, consider whether the action in question needs to be restricted. If yes, it should be included, otherwise, it should be assumed that the public has access to this action. A detail that is often underdiscussed is the maintenance of these actions. Indeed, your application needs to be aware of these `actionName`s - the authorization model assumes you pass in the requisite `actionName`, so it implies your application is aware of these `actionName`s. Smartly maintaining this is key to reducing bugs in your authorization scheme.

`actionName`s have to be unique across the abac - otherwise authorization will not be effective. The action name is a 255 character field, and OpenABAC is not opinionated on how you should construct good action names. A suggested technique is to logically modularize your authorization requirements, inspired by directories and URLs. Being proficient in your application's requirements will help you make smart decisions and "feature-proofing" your action name schema.

A policy is a group of actions. Policies exist so that instead of assigning all the actions to a user, the policy will allow you to do less work to assign all the same actions. The benefit to such a grouping is a reduced mental overhead for development and debugging, and less overall work if an identical set of actions can be reused. A good way to think about policies are the "things" that are actually "attached" to the user. By thinking as such, constructing good policies become more intuitive. As rules of thumb, good policies represent a minimal set of actions that will be commonly used together. The same action can be attached to multiple policies.

Policies can be further divided into an `allow` policy or a `deny` policy. Lets suppose you have a critical internal service that you don't want junior engineers to ever come close to. In addition to not provisioning a policy to access that critical service, you may even supply a `deny` policy that wraps all the actions that you don't want junior engineers to touch. So, if a junior engineer ever requests for an action that belongs to the critical service, the deny policy kicks in and rejects the authorization request. By default, all policies are allow policies. When you attach a deny policy to an `applicationUserId`, an check in the background makes sure that a contradiction doesn't happen - an allow policy with some action A will not be found in the deny policy. During an authorization request, deny policies are always checked before allow policies - if the action requested is found in a deny policies, the request is rejected immediately.

`policyName`s, like `actionName`s, are unique across the abac. Similar care and foresight should be practiced in deciding how policies should be named.

A Context is an additional parameter that needs to be cleared before authorization is approved in the event of a match in Action. It is essentially a second layer of authorization after an Action matches. This is strictly optional and Actions to Contexts can have a many to many relationship. There are 2 types of contexts, time based and text based. Time based contexts are usually used to restrict an action to only be available in a certain time frame. The available operators are >, <, >=, <=, BETWEEN, ==, !=. You are provided 2 time related fields `timeValue1` and `timeValue2`. You will only use both if the BETWEEN operator is selected, otherwise only `timeValue1` will be used. Text based contexts will read from the `User`'s `jsonCol` field. In `textValue`, provide the field from `jsonCol` that the Context should expect, then the operators >, <, >=, <=, IN, ==, != can be used to check for authorization. If the `textValue` doesn't get found in the `jsonCol` beloging to this user, an error gets thrown and authorization fails. Since `Context`s are attached to `Action`s, it is beneficial to think of Contexts as a furhter authorization after Action.

A User is probably the simplest concepts there is in OpenABAC. The `applicationUserId` is the user id that you associate this user in your main business application. This field does not discriminate any of the methods of generating user ids, but each id has to be under 255 characters long. The `jsonCol` is a JSON object that you may use only with `Context`s discussed above. The `jsonCol` is a good place to provide some additional data about this user that should influence authorization of this user. However, keep in mind, since Contexts are further authorizations after Actions, it is erroneous to think that "authorization can come from `jsonCol`". The previous statement is only partly true. When thinking about setting up a good authorization scheme, do not focus on beefing up `jsonCol`s to start. Instead, think about `Action`s, and then any `Context`s that actions require, then if the context is a text based context, think about `jsonCol`s. However, as a general rule of thumb, do not treat the `jsonCol` as a "replica" of the data from your main application - keep it as lean and as general as possible.

## Features & APIs

One of the out standing features of OpenABAC is the administrator UI. This UI allows less technical team members to avoid upskilling in OpenABAC's implementation and MySQL. In this section, we'll outline the various APIs available for consumption via your application. It will however not specify the APIs that are used within the UI.

As mentioned in Usage Pattern, authorization requests to OpenABAC requires a signed JWT with the user's application user id. Note, "application" refers to the app you're primarily building.

> Note: All APIs assume the initial JWT signature check passed. If it didn't, OpenABAC will immediately return a `403: Forbidden Error`. Recall, every request needs to contain the user's application id in the JWT.

### Authorization APIs

#### `GET /api/abac/authorize/:applicationUserId/:actionName`

-   The main authorization API
-   Params:
    -   `applicationUserId` is the unique id from your app of this user
    -   `actionName` is the unique action name that your user is requesting access for
-   Note:
    -   `Contexts` conditions associated with the action has to be satisfied, otherwise it will fail.
-   Returns:
    -   `authorized`: boolean. True if authorized, false otherwise.
    -   `message`: string. An additional message if request is unauthorized.

#### `GET /api/abac/getAllActions/:applicationUserId`

-   Gets all the actions associated with this user
-   Params:
    -   `applicationUserId` is the unique id from your app of this user
-   Returns:
    -   `actions`: string[]. A list of action all names that this user is allowed to do.

### CRUD User & UserPolicy APIs

#### `GET /api/abac/user/getUser/:applicationUserId`

-   Gets the entire user object including its associated policy names.
-   Params:
    -   `applicationUserId` is the unique id from your app of this user
-   Returns:
    -   `success`: boolean. Indication of successful update of the user.
    -   `data`: string of json objects
        -   `id` (from ABAC), `jsonCol`, list of `policyName`

#### `PUT /api/abac/user/upsertUser`

-   Upserts info on the user object itself - not this user's associated policies (for that check the next api).
-   Body:
    -   `applicationUserId`: the unique id from your app of this user
    -   `jsonCol`: additional metadata that will only be used in verifying `Context`. Note that `Context` may only be checked via data from this jsonCol.
-   Returns:
    -   `success`: boolean. Indication of successful update of the user.
    -   `data`: string. If this endpoint suceeds, the ABAC User ID will be returned as `id`

### `PUT /api/abac/edit/UserPolicyMapping`

-   **Upserts** the UserPolicy mapping.
-   Body:
    -   `applicationUserId`: the unique id from your app of this user
    -   `policyNames`: A list of `policyName`
-   Returns:
    -   `success`: boolean. Indication of successful update of the user.
    -   `data`: string. If this endpoint suceeds, the list of `policyNames` is returned here.

#### `DELETE /api/abac/user/deleteUser/:applicationUserId`

-   At the time of deletion, the `User` can't have any `Policy` attached.
-   Params:
    -   `applicationUserId` is the unique id from your app of this user
-   Returns:
    -   `success`: boolean. Indication of successful update of the user.
    -   `data`: string. If this endpoint suceeds, the `applicationUserId` is returned here.

### CRUD Policy & PolicyAction APIs

#### `POST /api/abac/policy/createPolicy`

-   Creates policies. Commonly used in immediately with `/abac/createAction` to create policies out of newly created actions. This endpoint is a transaction behind the scenes. Meaning, either all your policies get created or none.
-   Body:
    > Note that `policyName` has to be unique. If either one isn't, a 409 conflict is returned

```
body.listOfPolicies: [
    {
        policyName : string
        policyDescription: string
        allow: boolean
    },
    {
        ...
    }
]
```

-   Returns:
    -   `success`: boolean. Indication of successful creation of **ALL** policies from `body.listOfPolicies`.
    -   `message`: string. An additional message in case a policy fails to get created.

#### `GET /api/abac/policy/getPolicy/:policyName`

-   Returns the policy object and the actions associated with this policy. Commonly used if you have a use case for reading more about the policy and or the policy's associated actions.
-   Params:
    -   `policyName`: Name of the policy you want to read
-   Return:
    -   `data`:
        -   `actionsAssociated`: list of `actionName`s
        -   `policy`: The entire policy object

#### `PUT /api/abac/policy/editPolicy/:policyName`

-   Updates the policy object, not the PolicyActionMapping (that comes later). Must provide all the fields of a policy, not just the one you want to patch.
-   Params:
    -   `policyName`: Name of the policy you want to update
-   Body:
    -   `policyName`: Has to be a unique name, otherwise a 409 conflict error is returned
    -   `policyDescription`: Description of the policy
    -   `allow`: boolean
-   Returns:
    -   `success`: boolean. Indication of successful update.
    -   `message`: string. An additional message in case a policy fails to get updated.
    -   `data`: The updated policy object

#### `DELETE /api/abac/policy/deletePolicy/:policyName`

-   Deletes a policy. No action can be attached to the policy at the time of deletion, otherwise a 400 error is returned
-   Params:
    -   `policyName`: Name of the policy you want to delete
-   Returns:
    -   `success`: boolean. Indication of successful deletion.
    -   `message`: string. An additional message in case a policy fails to get deleted.

#### `PUT /api/abac/edit/PolicyActionMapping`

-   Used to attach or remove actions in a policy (Upsert). The entire list of wanted `actionName`s must be provided. This is essentially an **upsert** operation.
-   Body
    -   `actionNames`: List of `actionName` to be set into a policy
    -   `policyName`: Name of policy to set actions into.
-   Returns
    -   `success`: boolean. Indication of successful attachment of all `actionName` into `policyName`
    -   `message`: string. An additional message in case any action fails to be attached to the policy.

### CRUD Action & ActionContext APIs

#### `POST /api/abac/action/createAction`

-   Creates actions. Commonly used when a new resource is created and provisioning some actions is required. This endpoint is a transaction behind the scenes. Meaning, either all your actions get created or none.
    > Note that `actionName` has to be unique. If either one isn't, a 409 conflict is returned

```
body.listOfActions: [
    {
        actionName : string
        actionDescription: string
    },
    {
        ...
    }
]
```

-   Returns
    -   `success`: boolean. Indication of successful creation of **ALL** actions from `body.listOfActions`.
    -   `message`: string. An additional message in case an action fails to get created.

#### `GET /api/abac/action/getAction/:actionName`

-   Returns the action, policies associated with this action, and contexts associated with this action.
-   Params:
    -   `actionName`: Name of the action to read
-   Returns
    -   `success`: boolean. Indication of successful read
    -   `data`:
        -   `policyList`: List of `policyName`
        -   `action`: The action object
        -   `contextList`: List of `contextName`

#### `PUT /api/abac/action/editAction/:actionName`

-   Updates an action object - not the action-context mappings nor the policy-action mappings. Provide the entire action object since this is a PUT request
-   Params:
    -   `actionName`: Name of the action to update
-   Body:
    -   `actionName`: Updated action name
    -   `actionDescription`: Updated action description
-   Returns:
    -   `success`: boolean. Indication of successful update
    -   `message`: string of error logs if any
    -   `data`: updated action object

#### `DELETE /api/abac/action/deleteAction/:actionName`

-   Deletes the action. This action must not be attached to any policy and context to succeed.
-   Params:
    -   `actionName`: Name of the action to delete
-   Returns:
    -   `success`: boolean. Indication of successful delete
    -   `message`: string of error logs if any

#### `PUT /api/abac/edit/ContextActionMapping`

-   Used to attach or remove context in an action (Upsert). The entire list of wanted `contextName`s must be provided. This is essentially an **upsert** operation.
-   Body
    -   `contextNames`: List of `contextName` to be set into an action
    -   `actionName`: Name of action to set contexts into.
-   Returns
    -   `success`: boolean. Indication of successful attachment of all `contextNames` into `actionName`
    -   `message`: string. An additional message in case any action fails to be attached to the policy.

### CRUD Context APIs

#### `POST /api/abac/context/createContext/:contextName`

-   Creates ABAC `Context`. Usage pattern varies.
-   Body:
    -   `contextName`
        -   Unique across the entire system.
    -   `contextDescription`
        -   Describes what this context does.
    -   `operator`
        -   Operators can only be
            -   `BETWEEN`
            -   `IN`
            -   `<`
            -   `>`
            -   `<=`
            -   `>=`
            -   `==`
            -   `!=`
    -   `entity`
        -   This refers to a field from the `jsonCol` field from the User object
    -   Depending on the operator, different values are used. The special cases are
    -   `BETWEEN`
        -   In this case, `timeValue1` and `timeValue2` must be filled in and `textValue` must remain empty
    -   `IN`
        -   In this case, `textValue` must not be empty and if this clause needs to contain multiple items, the items should be comma separated. **DO NOT** place square brackets or any other indication this is an array. The `textValue` field is stored as a string.
    -   With every other operator, only `textValue` or `timeValue1` can be used.
-   Return:
    -   `success`: boolean. Indication of successful creation of context.
    -   `data`: a json object of the created context.

#### `GET /api/abac/context/getContext/:contextName`

-   Param
    -   `contextName`: The unique name of the context
-   Gets the context and all the actions associated with it.
-   Return
    -   `data`
        -   `context`: The context object
        -   `actions`: A list of actions attaching the context

#### `PUT /api/abac/context/updateContext/:contextName`

-   Body
    -   `context`: The full context object since this is not a patch operation. If the intent is to update `contextName`, if its not unique, an error will be thrown.
-   Return
    -   `success`: Indication of successful update
    -   `message`: Additional message incase update fails

#### `DELETE /api/abac/context/deleteContext/:contextName`

-   Param
    -   `contextName`: The unique name of the context
-   This `Context` cannot be attached to any `Action` at the time of deletion
-   Return
    -   `success`: Indication of successful update
    -   `message`: Additional message incase update fails

## Contribute

### Prerequisite:

-   Next14^
-   Docker
-   NodeJS (version that supports Next14)

### ENV for development with Docker

```
DATABASE_URL_DEV=mysql://user1:root_password@localhost:3306/openabac
DATABASE_HOST_DEV=localhost
DATABASE_USER_DEV=user1
DATABASE_PASSWORD_DEV=password1
DATABASE_NAME_DEV=openabac
IS_PRODUCTION=false (Set to true in production)
USE_PRODUCTION_DB=false (Set to true if using Docker MySQL or in production)
JWT_SECRET=0aJFfCNpsvvlcIJ2DXlPjnZN8BD2OUXe0sgdfhR1IGp8jrH84kGCuZmGkV41vFW
```

First, set up a local database:

```bash
yarn run dev:up
```

Then, start the server:

```bash
npm run dev
# or
yarn dev
```

Close the database connection when you're done with:

```bash
yarn run db:down
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

### Usable JWT for testing

`eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJhcHBsaWNhdGlvblVzZXJJZCI6IjEyMzQ1Njc4OTAiLCJleHAiOjE3NDI5NDU2MDMuNzQ1OTY2fQ.NpzKHrobl3BIrlt92yKYnQ8z95KO-DferZSgOugK5zU`
