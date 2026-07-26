# 4. ADVANCED SQL (Views, Procedures, & Triggers)

Normally, the Node.js backend has to do a lot of difficult math. We optimized this by putting the heavy lifting directly into the MySQL hardware using Advanced SQL concepts!

## 1. Views ("Virtual Tables")
The `booking` table only holds numbers (like `user_id = 5` and `cab_id = 12`). To make this readable for the Admin Dashboard, we use Views.
* Views act like a magic pair of X-Ray glasses.
* Our **`view_recent_bookings`** secretly joins the Bookings, Users, Cabs, and Drivers tables together. When the Admin Dashboard asks to see the bookings, the View instantly replaces the numbers with "John Doe", "Sedan XYZ", etc.
* **`view_driver_earnings`** calculates math on-the-fly, showing exactly how much money each driver has made in total.

## 2. Stored Procedures ("Pre-Compiled Functions")
A stored procedure is a heavy block of code permanently saved into the MySQL database's memory.
* We created **`sp_driver_earnings(p_driver_id)`**. 
* The Node.js server just yells "Execute sp_driver_earnings for Driver #4!". The MySQL processor instantly grabs Driver #4, counts up all their trips, calculates their total money earned, and tosses the final answer back to the server. This is infinitely faster than doing the math in Node.js.

## 3. Triggers ("Invisible Domino Effects")
A trigger is a robotic watcher that fires off automatically the instant a record is added or modified.
* **`trg_booking_updated_at`**: If a Driver clicks "Pick up User", the database row changes. The instant it changes, this Trigger fires off and overwrites the `updated_at` column with the exact current timestamp, maintaining perfect historical tracking.
* **`trg_booking_payment_default`**: If a booking is somehow accidentally created missing the payment info, this Trigger catches the error right before it writes to the hard drive, and forcibly changes the status to `Not Paid` so the system doesn't crash!
