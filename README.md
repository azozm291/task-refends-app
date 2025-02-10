Refund Orders Dashboard

Overview

This project is a Refund Orders Dashboard built with Next.js. It includes a navigation sidebar and a table displaying a list of refund orders. The application supports actions such as updating order decisions, toggling the active status, and viewing order details. The table is reusable, dynamic, and supports pagination.

Features

Navigation Sidebar for easy access to different sections.

Reusable Table Component that supports:

Dynamic columns and data types.

Custom actions for each row.

Live updates without page reloads.

Refund Orders Table with the following data:

ID (string)

Reason (string)

Store Name, Logo, and URL

Amount (number)

Active Status (boolean)

Decision (default: "Not Yet")

Items Count (displayed as a number)

Actions Per Row:

Dropdown menu to update decision (Reject, Accept, Escalate)

Toggle switch to activate/deactivate a record

IconButton to navigate to the order detail page

Live Updates: All actions are instantly reflected without reloading the page.

Pagination: Max 15 records per page.

Toaster Notifications: Provides feedback on actions.

Loading & Error Handling for smooth data fetching.

Mock API Integration using JSON Server.

Tech Stack

Next.js (App Router) - Framework for server-side rendering and API handling.

TypeScript - Strongly typed language for maintainable and scalable code.

Tailwind CSS - Styling framework for rapid UI development.

ShadCN/UI - For reusable UI components.

Lucide React - Icons used for UI elements.

Prisma ORM

Installation & Setup

Clone the repository:

git clone https://github.com/mohamedeld/task-refends-app.git
cd refund-orders-dashboard

Install dependencies:

npm install  # or yarn install



Run the development server:

npm run dev  # or yarn dev

Open http://localhost:3000 in your browser.
