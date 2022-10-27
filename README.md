# Nurse Shift Scheduler

Mock shift scheduler, connectRN take home assessment.

## Set Up

# To get it to work locally with the local server:

Dev - Run `yarn dev` in a terminal.

Build - Run `yarn build`. Once the build is done run `yarn start`, check out the built app on [http://localhost:3000](http://localhost:3000)

## Requirements

-   List out all shifts from /shift_list.json
-   List out assigned nurses based on id
-   Have a button that pops open a modal to assign nurses to shifts
-   Be able to validate nurse qualifications against the selected shift
-   Be able to validate nurse shift time with the rest of their scheduled shifts
-   Form validation
-   Update table with new assigned nurses

This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `pages/index.tsx`. The page auto-updates as you edit the file.

[API routes](https://nextjs.org/docs/api-routes/introduction) can be accessed on [http://localhost:9001/shifts](http://localhost:9001/shifts) and [http://localhost:9001/nurses](http://localhost:9001/nurses).

The `pages/api` directory is mapped to `/api/*`. Files in this directory are treated as [API routes](https://nextjs.org/docs/api-routes/introduction) instead of React pages.

## Learn More

To learn more about Next.js, take a look at the following resources:

-   [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
-   [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js/) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/deployment) for more details.
