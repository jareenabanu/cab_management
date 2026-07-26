import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { revalidatePath } from "next/cache";
import { getDb } from "@/lib/db";
import { query } from "@/lib/mysql";

export async function POST(request) {
  const cookieStore = await cookies();
  const userId = cookieStore.get("user_id")?.value;

  if (!userId) {
    return NextResponse.redirect(new URL("/user/login?error=auth", request.url));
  }

  const formData = await request.formData();
  const bookingId = Number(formData.get("booking_id") || 0);
  const rating = Number(formData.get("rating") || 0);
  const feedback = (formData.get("feedback") || "").toString().trim();

  if (!bookingId || rating < 1 || rating > 5) {
    return NextResponse.redirect(new URL("/user/dashboard?error=review_invalid", request.url));
  }

  const bookingRows = await query(
    "SELECT booking_id, user_id, driver_id, payment_status FROM booking WHERE booking_id = ? AND user_id = ?",
    [bookingId, Number(userId)]
  );
  const booking = bookingRows[0];

  if (!booking || !booking.driver_id) {
    return NextResponse.redirect(new URL("/user/dashboard?error=review_notfound", request.url));
  }

  const db = await getDb();
  const payment = await db
    .collection("payments")
    .findOne({ user_id: Number(userId), booking_id: bookingId });
  const isPaid = payment?.status === "Paid" || booking.payment_status === "Paid";

  if (!isPaid) {
    return NextResponse.redirect(new URL("/user/dashboard?error=review_unpaid", request.url));
  }

  const now = new Date().toISOString();
  await db.collection("driver_reviews").updateOne(
    { booking_id: bookingId, user_id: Number(userId) },
    {
      $set: {
        driver_id: Number(booking.driver_id),
        rating,
        feedback,
        updated_at: now,
      },
      $setOnInsert: {
        created_at: now,
      },
    },
    { upsert: true }
  );

  revalidatePath("/user/dashboard");
  revalidatePath("/driver/dashboard");
  revalidatePath("/admin/dashboard");
  return NextResponse.redirect(new URL("/user/dashboard?review_saved=1", request.url));
}
