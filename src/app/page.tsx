import DeviceList from "@/components/DeviceList"
import { FileReceivedModal } from "@/components/FileReceivedModal"
import { FileReceiveProvider } from "@/lib/fileReceiveContext"
import { Toaster } from "@/components/ui/toaster"
import { UserNameDisplay } from "@/components/UserNameDisplay"
import { ThemeToggle } from "@/components/ThemeToggle"

export default function Home() {
  return (
    <FileReceiveProvider>
      <header className="container mx-auto p-4 flex justify-between items-center">
        <h1 className="text-2xl font-bold">OpenDrop</h1>
        <UserNameDisplay />
        <ThemeToggle />
      </header>
      <main className="flex min-h-screen flex-col items-center p-24 relative">
        <DeviceList />
        <FileReceivedModal />
        <Toaster />
      </main>
    </FileReceiveProvider>
  )
}

