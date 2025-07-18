import { Suspense } from "react";
import { TalentProfile } from "@/components/talent-profile";
import { TalentProfileSkeleton } from "@/components/talent-profile-skeleton";

interface TalentProfilePageProps {
  params: {
    id: string;
  };
}

export default async function TalentProfilePage({ params }: TalentProfilePageProps) {
  const { id } = await params
  
  return (
    <div className="min-h-screen" style={{ background: '#201A2C' }}>
      <Suspense fallback={<TalentProfileSkeleton />}>
        <TalentProfile profileId={id} />
      </Suspense>
    </div>
  );
}
