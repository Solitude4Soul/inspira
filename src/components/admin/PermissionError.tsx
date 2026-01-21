import { AlertCircle, ExternalLink } from "lucide-react";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { firebaseConfig } from "@/firebase/config";
import Link from "next/link";
import { Button } from "../ui/button";

export function PermissionErrorDisplay() {
  const firestoreUrl = `https://console.firebase.google.com/project/${firebaseConfig.projectId}/firestore/data/roles_admin`;
  const authUrl = `https://console.firebase.google.com/project/${firebaseConfig.projectId}/authentication/users`;

  return (
    <Alert variant="destructive">
      <AlertCircle className="h-4 w-4" />
      <AlertTitle>Admin Account Not Fully Configured</AlertTitle>
      <AlertDescription>
        <div className="space-y-4">
          <p>
            Your account is signed in, but it doesn't have administrative permissions in the database yet. To fix this, you need to create a document in your Firestore `roles_admin` collection.
          </p>
          <div>
            <h4 className="mb-2 font-semibold">Steps to resolve:</h4>
            <ol className="list-decimal list-inside space-y-3">
              <li>
                First, go to the Firebase Authentication console to find the UID for the admin user ({`inspira-admin-v2@inspira-v2-auth.com`}).
                <div className="mt-1">
                    <Button variant="outline" size="sm" asChild>
                        <Link href={authUrl} target="_blank" className="gap-1.5">
                            <ExternalLink className="h-3 w-3"/>
                            Find User UID
                        </Link>
                    </Button>
                </div>
              </li>
              <li>
                Next, go to the Firestore console and create a new document in the `roles_admin` collection.
                 <div className="mt-1">
                    <Button variant="outline" size="sm" asChild>
                        <Link href={firestoreUrl} target="_blank" className="gap-1.5">
                             <ExternalLink className="h-3 w-3"/>
                             Go to Firestore
                        </Link>
                    </Button>
                </div>
              </li>
              <li>Paste the UID from step 1 as the **Document ID**.</li>
              <li>Inside the document, add a field named `role` with the text value `Super Admin`.</li>
              <li>Save the document and refresh this page.</li>
            </ol>
          </div>
        </div>
      </AlertDescription>
    </Alert>
  );
}
