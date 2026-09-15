import { createEntryAction } from "@/app/admin/(protected)/content/actions";
import { EntryEditor } from "@/components/admin/EntryEditor";
import { requirePermission } from "@/lib/auth/session";

export default async function NewContentPage() { await requirePermission("content:write"); return <><h1 className="text-3xl font-bold">محتوى جديد</h1><EntryEditor action={createEntryAction} /></>; }
