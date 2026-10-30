import { getAllCategories, getAllSyllabuses } from "@/utils/getData";
import SyllabusBrowseClient from "@/components/syllabus/SyllabusBrowseClient";
// ISR: Cache curriculum taxonomy for 1 hour
export const revalidate = 3600;

export default async function Page() {
    const categories = await getAllCategories();
    const syllabuses = await getAllSyllabuses();
    return <SyllabusBrowseClient categories={categories} syllabuses={syllabuses} />;
}
