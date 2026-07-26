# 2. BACKEND GUIDE (The Engine)

The Backend acts as the hidden "Brain" of your application. Users can never see this code, which makes it totally secure.

## The Environment:
Because Next.js is a Full-Stack framework, the backend lives inside the exact same folder as the frontend, but it executes on a private Node.js Server Environment.

## Location of Files:
Any folder inside `src/app/api/...` is completely invisible to users and belongs to the Backend.
* `src/app/api/user/login/route.js` - Checks passwords.
* `src/app/api/booking/create/route.js` - Processes logic for writing new bookings.
* `src/lib/mysql.js` - This is a central utility file that contains the instructions for the Backend on how to connect specifically to the Database.

## Core Responsibilities:
1. **Sanitization:** The backend always checks what the user typed in (like a username) to make sure they aren't trying to hack the server.
2. **Database Management:** The Backend is the ONLY part of the system allowed to talk to MySQL. The Frontend has to ask the Backend to do it for them.
3. **Session Cookies:** When a user successfully logs in, the Backend uses `next/headers` to physically inject an encrypted "Cookie" (a digital stamped passport) into the User's browser, so the system remembers they are logged in.
