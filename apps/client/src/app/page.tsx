import DeviceList from "@/components/DeviceList"
import { FileReceivedModal } from "@/components/FileReceivedModal"
import { FileReceiveProvider } from "@/lib/fileReceiveContext"
import { Toaster } from "@/components/ui/toaster"
import { UserNameDisplay } from "@/components/UserNameDisplay"
import { ThemeToggle } from "@/components/ThemeToggle"
import { GitHubIcon } from "@/components/GitHubIcon"
import { ConnectionProvider } from "@/contexts/connection-context"

export default function Home() {
  return (
    <>
      <noscript>
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-background/80 backdrop-blur-sm">
          <div className="rounded-lg bg-destructive p-8 text-center text-destructive-foreground shadow-lg">
            <h2 className="text-2xl font-bold mb-4">JavaScript Desativado</h2>
            <p>Para usar o OpenDrop, você precisa ativar o JavaScript no seu navegador.</p>
          </div>
        </div>
      </noscript>
      <ConnectionProvider>
        <FileReceiveProvider>
          <header className="container mx-auto p-4 flex flex-col sm:flex-row justify-between items-center space-y-4 sm:space-y-0">
            <h1 className="text-2xl font-bold">OpenDrop</h1>
            <UserNameDisplay />
            <div className="flex gap-4">
              <GitHubIcon />
              <ThemeToggle />
            </div>
          </header>
          <main className="flex min-h-screen flex-col items-center p-24 relative">
            <DeviceList />
            <FileReceivedModal />
            <Toaster />
          </main>
        </FileReceiveProvider>
      </ConnectionProvider>
    </>
  )
}

