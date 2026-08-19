import { getAllSyllabuses } from "@/utils/getData";
import SyllabusBrowseClient from "@/components/syllabus/SyllabusBrowseClient";

export const dynamic = "force-dynamic";

export default async function Page() {
    const syllabuses = await getAllSyllabuses();
    return <SyllabusBrowseClient syllabuses={syllabuses} />;
}
