import { Suspense } from "react"
import { TalentProfile } from "@/components/talent-profile"
import { TalentProfileSkeleton } from "@/components/talent-profile-skeleton"

interface TalentProfilePageProps {
  params: {
    id: string
  }
}

export default async function TalentProfilePage({ params }: TalentProfilePageProps) {
  return (
    <div className="min-h-screen bg-gray-50">
      <Suspense fallback={<TalentProfileSkeleton />}>
        <TalentProfile profileId={await params.id} />
      </Suspense>
    </div>
  )
}
