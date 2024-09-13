This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

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

This project uses [`next/font`](https://nextjs.org/docs/basic-features/font-optimization) to automatically optimize and load Inter, a custom Google Font.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js/) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/deployment) for more details.

## Routes

### / (Home)

Description: Homepage of the website.

### /\_not-found

Description: Page displayed when the requested route is not found.

### /[notfound]

Description: Alternative page for not found routes.

### /about-us

Description: Page providing information about the company or organization.

### /auth/change-password

Description: Page for users to change their password.

### /auth/login

Description: Login page for users to authenticate.

### /auth/register

Description: Registration page for new users to sign up.

### /auth/reset-password/[email]

Description: Page for resetting the password using an email link.

### /auth/send-mail-forgot-password

Description: Endpoint for sending a reset password email.

### /contact-us

Description: Page providing contact information and a form for users to get in touch.

### /dashboard

Description: Dashboard page for authenticated users.

### /dashboard/change-password

Description: Page for users to change their password within the dashboard.

### /dashboard/my-space

Description: Page displaying personal space or account information within the dashboard.

### /dashboard/profile

Description: Page for users to view and update their profile information within the dashboard.

### /dashboard/subscriptions

Description: Page displaying subscription information for users within the dashboard.

### /dashboard/users

Description: Page for administrators to manage user accounts within the dashboard.

### /movies

Description: Page displaying a list of movies.

### /movies/add-movie

Description: Page for administrators to add new movies.

### /movies/categories

Description: Page displaying categories or genres of movies.

### /movies/edit-movie/[movieId]

Description: Page for administrators to edit specific movie details.

### /movies/favorites

Description: Page displaying favorite movies for authenticated users.

### /movies/movies-list

Description: Page displaying a list of available movies.

### /movies/single-movie-info/[movieId]

Description: Page displaying detailed information about a specific movie.

### /movies/watch-movie/[movieId]

Description: Page for users to watch a specific movie.

### /payment-success

Description: Page displayed after a successful payment transaction.

### /user-videos/edit-video/[videoId]

Description: Page for users to edit their uploaded videos.

### /user-videos/new-video

Description: Page for users to upload new videos.

## Shared Resources

### First Load JS shared by all

Description: JavaScript shared by all pages during the first load.
