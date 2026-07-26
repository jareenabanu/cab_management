import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { exec } from "@/lib/mysql";

export async function POST(request) {
  const cookieStore = await cookies();
  const userId = cookieStore.get("user_id")?.value;

  if (!userId) {
    return NextResponse.redirect(new URL("/user/login?error=auth", request.url));
  }

  const formData = await request.formData();
  const action = (formData.get("action") || "").toString();

  if (action === "delete") {
    const locationName = (formData.get("location_name") || "").toString().trim();
    if (locationName) {
      await exec("DELETE FROM user_favorites WHERE user_id = ? AND location_name = ?", [Number(userId), locationName]);
    }
  } else {
    // Add favorite
    const locationName = (formData.get("location_name") || "").toString().trim();
    const fullAddress = (formData.get("full_address") || "").toString().trim();

    if (!locationName || !fullAddress) {
      return NextResponse.redirect(new URL("/user/dashboard?error=fav_missing", request.url));
    }

    try {
      await exec("INSERT INTO user_favorites (user_id, location_name, full_address) VALUES (?, ?, ?)", [Number(userId), locationName, fullAddress]);
    } catch (err) {
      // ER_DUP_ENTRY is triggered when they violate the Composite Primary Key!
      if (err.code === "ER_DUP_ENTRY") {
        return NextResponse.redirect(new URL("/user/dashboard?error=fav_dup", request.url));
      }
      return NextResponse.redirect(new URL("/user/dashboard?error=fav_fail", request.url));
    }
  }

  return NextResponse.redirect(new URL("/user/dashboard?fav_updated=1", request.url));
}
