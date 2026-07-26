import { cookies } from "next/headers";
import { getDb } from "@/lib/db";
import { query } from "@/lib/mysql";

export default async function ReviewPage({ params, searchParams }) {
  const routeParams = await params;
  const search = await searchParams;
  const cookieStore = await cookies();
  const userId = cookieStore.get("user_id")?.value;

  if (!userId) {
    return (
      <main className="form-shell">
        <div className="form-card">
          <h2>Rate Your Trip</h2>
          <p>Please log in to continue.</p>
          <a className="btn" href="/user/login">Go to login</a>
        </div>
      </main>
    );
  }

  const bookingIdNumber = Number(routeParams.id);
  if (!bookingIdNumber) {
    return (
      <main className="form-shell">
        <div className="form-card">
          <h2>Rate Your Trip</h2>
          <p>Invalid booking ID.</p>
          <a className="btn" href="/user/dashboard">Back to dashboard</a>
        </div>
      </main>
    );
  }

  const bookingRows = await query(
    `SELECT b.booking_id, b.user_id, b.driver_id, b.status, b.payment_status,
            d.name AS driver_name, d.phone AS driver_phone,
            c.cab_number, c.cab_type
     FROM booking b
     LEFT JOIN drivers d ON b.driver_id = d.driver_id
     LEFT JOIN cabs c ON b.cab_id = c.cab_id
     WHERE b.booking_id = ? AND b.user_id = ?`,
    [bookingIdNumber, Number(userId)]
  );

  const booking = bookingRows[0];

  if (!booking) {
    return (
      <main className="form-shell">
        <div className="form-card">
          <h2>Rate Your Trip</h2>
          <p>Booking not found or not yours.</p>
          <a className="btn" href="/user/dashboard">Back to dashboard</a>
        </div>
      </main>
    );
  }

  const db = await getDb();
  const payment = await db.collection("payments").findOne({
    booking_id: bookingIdNumber,
    user_id: Number(userId),
  });

  const isPaid = payment?.status === "Paid" || booking.payment_status === "Paid";

  if (!isPaid) {
    return (
      <main className="form-shell">
        <div className="form-card">
          <h2>Rate Your Trip</h2>
          <p>You can only review after the payment is complete.</p>
          <a className="btn" href="/user/dashboard">Back to dashboard</a>
        </div>
      </main>
    );
  }

  if (!booking.driver_id) {
    return (
      <main className="form-shell">
        <div className="form-card">
          <h2>Rate Your Trip</h2>
          <p>No driver assigned to this booking.</p>
          <a className="btn" href="/user/dashboard">Back to dashboard</a>
        </div>
      </main>
    );
  }

  const existingReview = await db.collection("driver_reviews").findOne({
    booking_id: bookingIdNumber,
    user_id: Number(userId),
  });

  return (
    <main className="form-shell">
      <div className="form-card">
        <span className="pill">Payment successful</span>
        <h2>Rate Your Trip #{booking.booking_id}</h2>
        <p className="portal-meta">🚗 Driver: {booking.driver_name || "Unknown"} ({booking.driver_phone || "N/A"})</p>
        <p className="portal-meta">🚕 Cab: {booking.cab_number || "N/A"} ({booking.cab_type || "N/A"})</p>

        <hr />
        <p>How was your experience with the driver and the trip?</p>
        
        {search?.error && <p className="pill">Invalid rating or inputs.</p>}

        <form className="form-grid" action="/api/user/review" method="POST">
          <input type="hidden" name="booking_id" value={booking.booking_id} />
          
          <div>
            <label>Rating (1 to 5 Stars)</label>
            <select name="rating" defaultValue={existingReview?.rating || "5"} required>
              <option value="5">5 - Excellent</option>
              <option value="4">4 - Good</option>
              <option value="3">3 - Average</option>
              <option value="2">2 - Poor</option>
              <option value="1">1 - Terrible</option>
            </select>
          </div>

          <div>
            <label>Share your experience (Optional)</label>
            <textarea 
              name="feedback" 
              placeholder="Tell us about the trip, driver behavior, cab condition, etc."
              defaultValue={existingReview?.feedback || ""}
              rows="4"
              style={{
                width: "100%",
                padding: "0.75rem 1rem",
                borderRadius: "8px",
                border: "1px solid var(--border)",
                backgroundColor: "var(--background-alt)",
                color: "var(--text-main)",
                fontSize: "1rem",
                fontFamily: "inherit",
                resize: "vertical",
                marginTop: "0.5rem"
              }}
            ></textarea>
          </div>

          <div style={{ display: "flex", gap: "12px", marginTop: "1rem" }}>
            <button className="btn" type="submit">Submit Review</button>
            <a className="btn secondary" href="/user/dashboard" style={{ flex: 1, textAlign: "center" }}>Skip</a>
          </div>
        </form>
      </div>
    </main>
  );
}
