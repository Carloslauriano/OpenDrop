import DeviceList from "@/components/DeviceList"
import WifiBackground from "@/components/WifiBackground"
import { FileReceivedModal } from "@/components/FileReceivedModal"
import { FileReceiveProvider } from "@/lib/fileReceiveContext"
import { Toaster } from "@/components/ui/toaster"
import { UserNameDisplay } from "@/components/UserNameDisplay"

export default function Home() {
  return (
    <FileReceiveProvider>
      <main className="flex min-h-screen flex-col items-center justify-center p-24 relative">
        <WifiBackground />
        <h1 className="text-4xl font-bold mb-8">OpenDrop</h1>
        <UserNameDisplay />
        <DeviceList />
        <FileReceivedModal />
        <Toaster />
      </main>
    </FileReceiveProvider>
  )
}

