import { Sheet, SheetHeader, SheetTitle } from '@/src/components/ui/sheet'

import { InterceptedSheetContent } from '@/src/components/intercepted-sheet-content'
import { OrganizationForm } from '../../org/organization-form'

export default function CreateOrganization() {
  return (
    <Sheet defaultOpen>
      <InterceptedSheetContent>
        <SheetHeader>
          <SheetTitle>Create organization</SheetTitle>
        </SheetHeader>

        <div className="py-4">
          <OrganizationForm />
        </div>
      </InterceptedSheetContent>
    </Sheet>
  )
}
