# <div>Jobify Recruit 💼</div>

✅ A Full stack Job Posting web application built by a job-seeker 😜

🚀[View Demo](https://jobify-recruit.vercel.app)

<details>
<summary>Authentication</summary>



</details>

<details>
<summary>Create a Job Post</summary>



</details>

<details>
<summary>Apply to a Job</summary>



</details>

<details>
<summary>Job application - Accept</summary>



</details>

<details>
<summary>Job application - Reject</summary>



</details>

</br>

## Features

- Secure Authentication (credentials)
- Role Based access control (user & admin)
- Create job categories and job posts (admin)
- Upload Resume (user)
- Apply to a job post (user)
- Update the job application (admin)
- Email functionality

## Tech Stack

- [Next.js / TailwindCSS](https://nextjs.org/docs/getting-started/installation)
- [Auth.js](https://authjs.dev/getting-started/migrating-to-v5)
- [Prisma ORM](https://www.prisma.io/docs/orm/overview/introduction/what-is-prisma)
- [PostgreSQL DB](https://neon.tech/)
- [Uploadthing](https://docs.uploadthing.com/)
- [shadcn/ui](https://ui.shadcn.com/docs/installation/next)

## Installation

1. Clone the repository: `git clone https://github.com/ranepaarth/jobify-recruit.git`
2. Navigate to the project directory: `cd jobify-recruit`
3. Install the dependencies: `npm install`

### Environment Variables

Create a copy of .env.sample and name the file `.env`

## Usage

1. Generate prisma client using `npx prisma generate` and push your updated models to the database using `npx prisma db push`
2. Start development server `npm run dev`
3. Get your prisma studio up and running using `npx prisma studio` command to view the changes made and visit [http://localhost:5555](http://localhost:5555) to start editing in your database.
4. Open your Browser and visit [http://localhost:3000](http://localhost:3000) to start developing.

## Concepts covered

- [x] NextJs 14 App routing & SSR
- [x] Auth.js Authentication
- [x] Extending User sessions
- [x] Server Actions
- [x] Resume file upload
- [x] Email Notifications
- [ ] Forgot / reset password
