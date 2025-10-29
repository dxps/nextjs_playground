# Auth & Rich Text Editor

This is a demo project that showcases:

1. How to do local registration and sign-in (using better-auth).
2. How to do sign-in using Microsoft Entra ID.
3. How to use a rich text editor (using [tiptap](https://tiptap.dev/) and [shadcn/ui](https://ui.shadcn.com/)).

<br/>

## Prerequisites & Setup

1. Run `npm i` to install the dependencies.
1. Run `npx prisma generate` to generate the Prisma client.
1. Create a `.env` file in the root directory and populate it with:

    ```properties
    DATABASE_URL="postgresql://{user}:{password}@{host}/{database}?sslmode=require&channel_binding=require"

    BETTER_AUTH_SECRET='whatever-auth-secret'
    BETTER_AUTH_URL=http://localhost:3000         # Base URL of the app.

    MICROSOFT_ENTRA_ID_CLIENT_ID='{your-entra-id-client-id}'
    MICROSOFT_ENTRA_ID_CLIENT_SECRET='{your-entra-id-client-secret}'
    MICROSOFT_ENTRA_ID_TENANT_ID='{your-entra-id-tenant-id}'
    ```

1. Run `npx prisma db push` to push the Prisma database schema to the database.

<br/>

## Generated project notes

<details>
<summary>
Show/hide the generated project notes
</summary>
<br>

This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

-   [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
-   [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.
