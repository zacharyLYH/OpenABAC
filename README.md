# OpenABAC
OpenABAC is an open sourced [attribute based access control](https://www.okta.com/blog/2020/09/attribute-based-access-control-abac/) system that largely follows the industry standard definition of ABAC. Forking and deploying this repo, developers can get an ABAC system up and running quickly and easily. The stand out feature of OpenABAC is a non technical friendly dashboard, aimed to lower the skill ceiling for system administrators to manage their enterprise's fork.

## Technical & Example
An attribute based access control (ABAC) is the granular cousin of the familiar and intuitive role based access control ([RBAC](https://www.digitalguardian.com/blog/what-role-based-access-control-rbac-examples-benefits-and-more)) system. Where RBAC defines access control at the role level, and then assigning each user type to a specific role/roles, ABAC systems define access control as **policies**, then associating policies to users. For further reading, here is a good [article](https://www.okta.com/identity-101/role-based-access-control-vs-attribute-based-access-control/) providing a comparison between these two authorization frameworks. 

In a team, it is common for team members to have a core task, say addressing tickets from customer support. However, it is not uncommon for teams to be subdivided further into smaller tasks, like, developing feature X, documenting feature Y, cleaning dirty data in DB Z, etc. These sub teams may need access to certain tools that other sub teams don't require. In RBAC, since access permissions are defined ahead of time, you'll need N number of RBAC policies for the N sub teams you have. It is also not uncommon for another team outside the current team to access the same stuff, for example another M teams with only this permission in common might be contributing to documentation of feature Y. Suppose we want to revoke access to all contributors of feature Y, we will be required to change permissions in all M policies. 

In ABAC, `Actions` are the building blocks of `Policies`, and `Policies` are a grouping of allowed actions for the policy holder. Every task from the previous paragraph can be considered an `Action`. In fact, it is ***best practice*** to further divide those tasks into components. For example, developing feature X might become
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
|  |  |
|-|-|
|✅|You want system administrators to be able to help diagnose authorization issues with minimal training |
|✅|[RBAC](https://www.digitalguardian.com/blog/what-role-based-access-control-rbac-examples-benefits-and-more) alone isn't sufficient|
|✅|You have an application where your users might need different permissions often |
|✅|You need a free and open sourced solution |
|✅|You want the convenience of a plug and play experience while leaving ability for optimization down the road |
|✅|You don't mind self hosting the ABAC system |

This project is **not** for you if:
|  |  |
|-|-|
|❌|You want a hosted solution |
|❌|Your application doesn't involve multiple entities accessing and modifying shared sensitive data |
|❌|You don't want to manage the complexity of an ABAC system |
|❌|You don't forsee access requirements changing often in your application |


## Usage pattern
[JWT](https://jwt.io/introduction)s are an industry standard for securely transmitting data. A private key, only known to the application and authorization service (OpenABAC) is used to digitally sign some data. Consider 2 sources of the same data, one properly signed with a private key and the other one a mere copy of the data, the data that was signed can be guaranteed to have come from the application's computation, while the mere copy will be identified and can be deemed illegitimate. OpenABAC is powered by this very principle. 

To use OpenABAC, you will host a copy of OpenABAC. You'll also have your application. Imporatantly, it is extremely common for applications to have a method to identify users. By far, the most common method is [UUID](https://en.wikipedia.org/wiki/Universally_unique_identifier). 

In the simplest implementation, when your user requests for some sensitive data from your application, your application will make an external api call to your hosted OpenABAC service for authorization. **That external API call needs to contain a JWT signed Bearer token of the user's unique identifier**, and in the url, the unique `actionName` your user is trying to perform. Between these 2 components, you'll tell OpenABAC the action your user is requesting to perform, and a non-fraudulent identification of the user. OpenABAC will then return a response telling you if your user has a policy that includes the `actionName`.

In advanced implementations, if your applciation runs on Typescript and you don't mind starting a MySQL data connection, you may copy the folder from `/abac`and all of its contents into your project. This folder contains all the logic for authorization. Doing so, your application will reduce some latency since you won't be making an authorization request from a separately hosted service.

## Features & APIs
One of the out standing features of OpenABAC is the administrator UI. This UI allows less technical team members to avoid upskilling in OpenABAC's implementation and MySQL. In this section, we'll outline the various APIs available for consumption via your application. It will however not specify the APIs that are used within the UI. 

As mentioned in Usage Pattern, authorization requests to OpenABAC requires a signed JWT with the user's application user id. Note, "application" refers to the app you're primarily building. 

> Note: All APIs assume the initial JWT signature check passed. If it didn't, OpenABAC will immediately return a `403: Forbidden Error`. Recall, every request needs to contain the user's application id in the JWT.

#### `GET /api/abac/authorize/:actionName`
- The main authorization API
- `actionName` is the unique action name that your user is requesting access for
- Returns 
    - `authorized`: boolean. True if authorized, false otherwise.
    - `message`: string. An additional message if request is unauthorized.

#### `GET /api/abac/getAllActions`
- Gets all the actions associated with this user
- Returns 
    - `actions`: string[]. A list of action all names that this user is allowed to do.

#### `POST /api/abac/createAction/`
- Creates an action. Commonly used when a new resource is created and provisioning some actions is required. This endpoint is a transaction behind the scenes. Meaning, either all your actions get created or none. 

``` 
body.createAction: [  
    {  
        actionName : string  
        actionDescription: string  
        conflictingActionName: string[]  

    }  
]
```
A list 
- Returns 
    - `success`: boolean. Indication of successful creation of **ALL** actions from `body.listOfActionName`.
    - `message`: string. An additional message in case an action fails to get created.

#### `POST /api/abac/authorize/attachAction/:actionName`
- Gets all the actions associated with this user
- Returns 
    - `actions`: string[]. A list of action all names that this user is allowed to do.

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
