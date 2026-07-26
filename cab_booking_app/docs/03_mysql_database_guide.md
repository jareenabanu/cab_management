# 3. DATABASE GUIDE (MySQL Primary)

The primary brain of the Cab Management System is a Relational Database managed by **MySQL**. 

## The Concept of Relations
MySQL is "Relational", meaning tables physically link to each other using invisible chains called **Foreign Keys**.
For example, if you delete a `Driver`, the Database will automatically hunt down and delete their `Cab` and their `Bookings` because they are permanently mathematically linked.

## The 7 Core Tables:
1. **`admin`**: Stores administrative credentials.
2. **`users`**: Customer data (name, email, phone, secure password).
3. **`drivers`**: The physical operators. It has a special column `driver_status` acting as a flip-switch between "On Duty" and "Offline".
4. **`cabs`**: Car information (number plate, Sedan/SUV). This table is physically chained to `drivers` by a foreign key `driver_id`.
5. **`booking`**: The ledger. It holds strings linking a User ID, a Cab ID, locations, times, distances, and prices.
6. **`driver_edit_requests`**: A security buffer. If a driver alters their profile, it goes here instead of the main `drivers` table, requiring an Admin to approve it before it overwrites the master record.
7. **`payments` (MongoDB)**: (Covered in File 05).

## Concurrency Protection (The Pessimistic Lock)
If two users book the same Cab at the exact same physical millisecond, the database prevents duplication!
We wrote a command using `SELECT ... FOR UPDATE` inside `api/booking/create`. 
* This acts as a physical security padlock on that specific cab's row. 
* The MySQL computer hardware literally forces the second user's connection to pause and wait in a line until the first user finishes their booking. The second user is then rejected because the cab is no longer available!
