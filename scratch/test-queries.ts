import "dotenv/config";
import { getPopularVideos, getNewlyJoinedTutors, getPaidTutorAds } from "../src/utils/getData";

async function test() {
  console.log("Testing getPopularVideos...");
  try {
    const vids = await getPopularVideos(3);
    console.log("Popular Videos success:", vids.length);
  } catch (e) {
    console.error("Popular Videos error:", e);
  }

  console.log("Testing getNewlyJoinedTutors...");
  try {
    const tutors = await getNewlyJoinedTutors(6);
    console.log("Newly Joined Tutors success:", tutors.length);
  } catch (e) {
    console.error("Newly Joined Tutors error:", e);
  }

  console.log("Testing getPaidTutorAds...");
  try {
    const ads = await getPaidTutorAds();
    console.log("Paid Tutor Ads success:", ads.length);
  } catch (e) {
    console.error("Paid Tutor Ads error:", e);
  }
}

test();
