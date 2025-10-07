# EZLAW

EZLAW is a comprehensive web application built with Next.js, designed to make learning and understanding Thai law accessible and engaging. The platform provides tools for browsing legal texts, studying with flashcards, and connecting with legal professionals.

## Key Features

-   **Law Database**: Browse and search through Thai Civil & Commercial and Criminal codes, with content sourced from a structured database.
-   **Search Functionality**: A powerful search feature to quickly find specific laws and articles by keyword or section number.
-   **Flashcard System**: Create and manage personalized folders of flashcards to aid in studying legal terminology and concepts.
-   **User & Lawyer Authentication**: Separate authentication flows for regular users and lawyers, managed by a dedicated backend service.
-   **Subscription Service**: A multi-tiered membership plan (weekly, monthly, yearly) powered by Stripe, granting access to premium features like lawyer consultations.
-   **Lawyer Directory & Profiles**: Members can browse a directory of lawyers, view their profiles, and initiate consultations.
-   **Profile Management**: Users and lawyers can edit their personal information, bio, and profile pictures.
-   **Modern UI**: Built with Tailwind CSS and shadcn/ui for a clean, responsive, and modern user interface.

## Tech Stack

-   **Frontend**: Next.js, React, Tailwind CSS, shadcn/ui
-   **Database**:
    -   **MySQL**: Stores the main legal text data (laws, sections, hierarchy).
    -   **MongoDB**: Manages user-generated content, including flashcard folders and individual flashcards.
-   **Payments**: Stripe for secure subscription management and payment processing.
-   **Authentication**: Relies on an external backend API for user and lawyer authentication.

## Project Structure

The project is organized using the Next.js App Router.

```
.
├── data/              # JSON data files for laws (potentially for seeding/fallback)
├── lib/               # Utility functions, including MongoDB connection
├── models/            # Mongoose schemas for MongoDB (Flashcard, Folder)
├── pages/api/         # Legacy API routes (Stripe, Law Search, etc.)
├── public/            # Static assets
└── src/
    ├── app/           # Main application directory (App Router)
    │   ├── api/       # API Routes for folder and flashcard management
    │   ├── components/  # General React components
    │   ├── (routes)/  # Various application pages like /folder, /laws, etc.
    └── components/
        └── ui/        # Reusable UI components from shadcn/ui
```

## API Endpoints

The application uses a combination of internal Next.js API routes and an external backend.

### Internal API Routes

-   `GET /api/laws?lawTypeId=<id>`: Fetches structured law data from the MySQL database.
-   `GET /api/search?query=<term>`: Searches for law sections based on a search term.
-   `POST /api/create-checkout-session`: Creates a new Stripe checkout session for subscriptions.
-   `POST /api/folders`: Creates a new flashcard folder.
-   `GET /api/folders?userId=<id>`: Retrieves all folders for a specific user.
-   `PUT /api/folders/[id]`: Updates a specific folder's details.
-   `DELETE /api/folders/[id]`: Deletes a specific folder.
-   `POST /api/folders/[id]/flashcards`: Creates a new flashcard within a folder.
-   `GET /api/folders/[id]/flashcards`: Retrieves all flashcards for a specific folder.
-   `DELETE /api/folders/[id]/flashcards`: Deletes a specific flashcard.

## Getting Started

To get a local copy up and running, follow these steps.

### Prerequisites

-   Node.js (v18 or later)
-   npm, yarn, or pnpm
-   MongoDB instance
-   MySQL instance
-   A running instance of the required authentication backend API at `http://localhost:8080`.

### Installation

1.  **Clone the repository:**
    ```bash
    git clone https://github.com/thunwaaa/ezlaw.git
    cd ezlaw
    ```

2.  **Install dependencies:**
    ```bash
    npm install
    ```

3.  **Set up environment variables:**

    Create a `.env.local` file in the root of the project and add the following variables:

    ```env
    # MongoDB Connection URI
    MONGODB_URI=your_mongodb_connection_string

    # Stripe API Keys
    STRIPE_SECRET_KEY=your_stripe_secret_key
    NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=your_stripe_publishable_key

    # Cloudinary for Image Uploads
    NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME=your_cloudinary_cloud_name

    # Base URL for the application
    NEXT_PUBLIC_SITE_URL=http://localhost:3000
    ```

4.  **Database Setup:**

    -   **MySQL**: Ensure your MySQL server is running. Create a database named `law_db` and import the required schema and data for laws and sections.
    -   **MongoDB**: Ensure your MongoDB server is running and accessible via the `MONGODB_URI`.

5.  **Run the development server:**
    ```bash
    npm run dev
    ```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.
