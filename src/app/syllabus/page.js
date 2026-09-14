import { getAllCategories, getAllSyllabuses } from "@/utils/getData";
import SyllabusBrowseClient from "@/components/syllabus/SyllabusBrowseClient";

export const dynamic = "force-dynamic";

export default async function Page() {
    const categories = await getAllCategories();
    const syllabuses = await getAllSyllabuses();
    return <SyllabusBrowseClient categories={categories} syllabuses={syllabuses} />;
}
