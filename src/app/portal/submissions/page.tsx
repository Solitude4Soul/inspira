"use client";

import { useMemo } from "react";
import { useSearchParams } from "next/navigation";
import { collection, Timestamp, doc } from "firebase/firestore";
import { format } from "date-fns";
import {
  useCollection,
  useFirestore,
  useMemoFirebase,
  useUser,
  deleteDocumentNonBlocking,
} from "@/firebase";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import { AlertCircle, Loader2, Trash2 } from "lucide-react";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { PermissionErrorDisplay } from "@/components/admin/PermissionError";

type Submission = {
  id: string;
  name: string;
  email: string;
  subject: string;
  message: string;
  submissionType: "brand" | "creator";
  submissionDate: Timestamp | null;
};

export default function AdminSubmissionsPage() {
  const firestore = useFirestore();
  const { user, isUserLoading: isAuthLoading } = useUser();
  const searchParams = useSearchParams();
  const submissionTypeFilter = searchParams.get("type") || "brand";

  const submissionsQuery = useMemoFirebase(
    () => (firestore && user ? collection(firestore, "contact_form_submissions") : null),
    [firestore, user]
  );
  const { data: submissions, isLoading, error } = useCollection<Submission>(
    submissionsQuery
  );

  const filteredAndSortedSubmissions = useMemo(() => {
    if (!submissions) return [];
    return submissions
      .filter(s => s.submissionType === submissionTypeFilter)
      .sort((a, b) => {
        const dateA = a.submissionDate?.toMillis() ?? 0;
        const dateB = b.submissionDate?.toMillis() ?? 0;
        return dateB - dateA; // Sort descending
      });
  }, [submissions, submissionTypeFilter]);

  if (isAuthLoading) {
    return (
      <div className="flex h-full w-full items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin" />
        <span className="sr-only">Loading...</span>
      </div>
    );
  }

  const pageTitle = submissionTypeFilter === 'brand' ? 'Brand Messages' : 'Creator Messages';
  const pageDescription = `Messages received from ${submissionTypeFilter === 'brand' ? 'brands' : 'creators'}. Click to view details.`;

  return (
    <div className="space-y-6">
      <h1 className="font-headline text-3xl font-bold">{pageTitle}</h1>
      <Card>
        <CardHeader>
          <CardTitle>Contact Form Submissions</CardTitle>
          <CardDescription>
            {pageDescription}
          </CardDescription>
        </CardHeader>
        <CardContent>
          {isLoading && <SubmissionsTableSkeleton />}
          {error && <PermissionErrorDisplay />}
          {!isLoading && !error && (
            <SubmissionsTable submissions={filteredAndSortedSubmissions} />
          )}
        </CardContent>
      </Card>
    </div>
  );
}

function SubmissionsTable({ submissions }: { submissions: Submission[] }) {
  const firestore = useFirestore();
  const { toast } = useToast();

  if (submissions.length === 0) {
    return (
      <div className="flex h-40 items-center justify-center rounded-md border border-dashed">
        <p className="text-muted-foreground">No submissions yet for this category.</p>
      </div>
    );
  }

  const handleDelete = (submissionId: string) => {
    if (!firestore) return;
    const submissionDocRef = doc(firestore, "contact_form_submissions", submissionId);
    deleteDocumentNonBlocking(submissionDocRef);
    toast({
      title: "Submission Deleted",
      description: "The submission has been removed from the list.",
    });
  };

  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead className="w-[200px]">Date</TableHead>
          <TableHead className="w-[180px]">From</TableHead>
          <TableHead>Subject</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {submissions.map((submission) => (
          <Dialog key={submission.id}>
            <DialogTrigger asChild>
              <TableRow className="cursor-pointer">
                <TableCell>
                  {submission.submissionDate
                    ? format(
                        submission.submissionDate.toDate(),
                        "MMM d, yyyy, h:mm a"
                      )
                    : "No date"}
                </TableCell>
                <TableCell className="font-medium">{submission.name}</TableCell>
                <TableCell className="max-w-[300px] truncate">{submission.subject}</TableCell>
              </TableRow>
            </DialogTrigger>
            <DialogContent className="sm:max-w-2xl">
              <DialogHeader>
                <DialogTitle>{submission.subject}</DialogTitle>
                <DialogDescription>
                  From: {submission.name} ({submission.email}) on{" "}
                  {submission.submissionDate
                    ? format(
                        submission.submissionDate.toDate(),
                        "MMM d, yyyy 'at' h:mm a"
                      )
                    : "No date"}
                </DialogDescription>
              </DialogHeader>
              <div className="my-4 max-h-[50vh] overflow-y-auto rounded-md border bg-muted/30 p-4">
                <p className="whitespace-pre-wrap">{submission.message}</p>
              </div>
              <DialogFooter>
                <DialogClose asChild>
                  <Button
                    type="button"
                    variant="destructive"
                    onClick={() => handleDelete(submission.id)}
                  >
                    <Trash2 className="mr-2 h-4 w-4" />
                    Delete
                  </Button>
                </DialogClose>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        ))}
      </TableBody>
    </Table>
  );
}

function SubmissionsTableSkeleton() {
  return (
    <div className="space-y-3">
      <div className="grid grid-cols-3 gap-4">
        <Skeleton className="h-5 w-full" />
        <Skeleton className="h-5 w-full" />
        <Skeleton className="h-5 w-full" />
      </div>
      <div className="space-y-2">
        {Array.from({ length: 5 }).map((_, i) => (
          <Skeleton key={i} className="h-10 w-full" />
        ))}
      </div>
    </div>
  );
}
