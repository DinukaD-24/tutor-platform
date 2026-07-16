import { getAllTutors } from "@/utils/getData";
import TutorsClient from "@/components/tutor/TutorsClient";

export default async function TutorPage() {
  const tutors = await getAllTutors();
  return <TutorsClient tutors={tutors} />;
}