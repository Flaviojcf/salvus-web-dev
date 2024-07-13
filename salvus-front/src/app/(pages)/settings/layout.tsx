import {
  DashBoardPage,
  DashBoardPageHeader,
  DashBoardPageHeaderTitle,
  DashBoardPageMain,
} from '@/components/dashboard/page'
import { PropsWithChildren } from 'react'
import { SettingsSidebar } from './_components/settings-sidebar'

export default function Layout({ children }: PropsWithChildren) {
  return (
    <DashBoardPage>
      <DashBoardPageHeader>
        <DashBoardPageHeaderTitle>Configurações</DashBoardPageHeaderTitle>
      </DashBoardPageHeader>
      <DashBoardPageMain>
        <div className="max-w-[800px]">
          <div className="grid grid-cols-[10rem_1fr] gap-12">
            <SettingsSidebar />
            <div>{children}</div>
          </div>
        </div>
      </DashBoardPageMain>
    </DashBoardPage>
  )
}
