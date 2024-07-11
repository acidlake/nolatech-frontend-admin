# Frontend Project

This is the frontend part of the nolatech job challange, the api is: [Nolatech Backend APi](https://github.com/acidlake/nolatech-backend-api) , built using SvelteKit, Tailwind CSS, and Shadcn. The application is deployed on Cloudflare Pages and uses Cloudflare for DNS, domain management, SSL certificates, and CI/CD, with GitHub for version control.

## Table of Contents

- [Tech Stack](#tech-stack)
- [Features](#features)
- [Setup and Installation](#setup-and-installation)
- [Development](#development)
- [Deployment](#deployment)
- [Project Structure](#project-structure)
- [Contributing](#contributing)
- [License](#license)

## Tech Stack

- **Framework**: SvelteKit
- **CSS Framework**: Tailwind CSS
- **Component Library**: Shadcn
- **Deployment**: Cloudflare Pages
- **Version Control**: GitHub

## Features

- Modern frontend setup with SvelteKit
- Responsive design using Tailwind CSS
- Pre-built components with Shadcn
- Continuous Deployment with Cloudflare Pages
- Easy to manage DNS and SSL with Cloudflare

## Setup and Installation

To set up and run the project locally, follow these steps:

1. **Clone the repository:**

   ```sh
   git clone https://github.com/acidlake/nolatech-frontend-admin.git
   cd nolatech-frontend-admin
   ```
2.	**Install dependencies:**

```sh
    pnpm install
```
3.	**Set up environment variables:**
Create a .env file in the root directory by copying .env.example and change the necessary environment variables.:
```sh
  cp .env.example .env
```

4.	**Run the development server:**
```sh
  pnpm dev
```
The application should now be running at http://localhost:1337

## Development

During development, you can use the following commands:

- Start the development server:
```sh
  pnpm dev
```
- Build the project for production:
```sh
  pnpm build
```

- Preview the production build:
```sh
  pnpm preview
```

## Deployment

The project is set up to be deployed on Cloudflare Pages. Follow these steps to deploy:

- Connect the repository to Cloudflare Pages:
- Log in to Cloudflare and navigate to the Pages section.
- Click on “Create a project” and connect your GitHub repository.
- Configure the build settings:
- Framework preset: SvelteKit
- Build command: npm run build
- Build output directory: build
