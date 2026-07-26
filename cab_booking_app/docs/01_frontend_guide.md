# 1. FRONTEND GUIDE (The Visual Layer)

Because we used **Next.js 16**, our frontend is built using **React Components** located in the `src/app` folder.

## How it works:
The frontend is strictly what the User, Driver, or Admin sees on their screen (The UI or User Interface).
* **Language:** HTML / JavaScript (JSX)
* **CSS Framework:** We built custom styles using pure Vanilla CSS inside `src/app/globals.css`.

## Location of Files:
* `src/app/page.js` - This is the main Landing Page you see when you go to localhost:3000. It contains the large text asking you to choose a portal.
* `src/app/user/dashboard/page.js` - The visual dashboard for the User.
* `src/app/driver/dashboard/page.js` - The visual dashboard for the Driver.
* `src/app/admin/dashboard/page.js` - The visual dashboard for the Admin.

## Unique Design Elements:
We used advanced modern design concepts:
1. **Glassmorphism:** Elements have a `backdrop-filter: blur(10px)` effect to make them look like frosted glass over a background.
2. **Dynamic Gradients:** The User Dashboard uses an oceanic blue `linear-gradient`, while the Driver Dashboard uses an amber-charcoal gradient to visually separate their environments.

## How it talks to the system:
When a user types their password into the Login Page screen, the Frontend takes those letters and secretly "fetches" (sends an HTTP POST request) to the Backend API route to ask for permission.
