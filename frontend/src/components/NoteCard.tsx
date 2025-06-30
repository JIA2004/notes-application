import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "./ui/card";
import { Button } from "./ui/button";
import { Note } from "@/lib/api";
import { formatDistanceToNow } from "date-fns";

interface NoteCardProps {
  note: Note;
  onEdit: (note: Note) => void;
  onDelete: (id: number) => void;
  onArchive: (id: number) => void;
}

export function NoteCard({ note, onEdit, onDelete, onArchive }: NoteCardProps) {
  return (
    <Card className="h-full flex flex-col">
      <CardHeader>
        <CardTitle>{note.title}</CardTitle>
      </CardHeader>
      <CardContent className="flex-grow">
        <p className="whitespace-pre-wrap">{note.content}</p>
      </CardContent>
      <CardFooter className="flex justify-between items-center text-sm text-muted-foreground">
        <div>
          Updated {formatDistanceToNow(new Date(note.updatedAt), { addSuffix: true })}
        </div>
        <div className="flex gap-2">
          <Button variant="outline" size="sm" onClick={() => onEdit(note)}>
            Edit
          </Button>
          <Button variant="outline" size="sm" onClick={() => onArchive(note.id)}>
            {note.isArchived ? "Unarchive" : "Archive"}
          </Button>
          <Button
            variant="destructive"
            size="sm"
            onClick={() => onDelete(note.id)}
          >
            Delete
          </Button>
        </div>
      </CardFooter>
    </Card>
  );
}
