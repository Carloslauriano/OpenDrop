"use client"

import { createContext, useContext, useState, type ReactNode } from "react"

interface ReceivedFile {
  fileName: string
  fromDevice: string
}

interface FileReceiveContextType {
  receivedFile: ReceivedFile | null
  setReceivedFile: (file: ReceivedFile | null) => void
}

const FileReceiveContext = createContext<FileReceiveContextType | undefined>(undefined)

export function FileReceiveProvider({ children }: { children: ReactNode }) {
  const [receivedFile, setReceivedFile] = useState<ReceivedFile | null>(null)

  return <FileReceiveContext.Provider value={{ receivedFile, setReceivedFile }}>{children}</FileReceiveContext.Provider>
}

export function useFileReceive() {
  const context = useContext(FileReceiveContext)
  if (context === undefined) {
    throw new Error("useFileReceive must be used within a FileReceiveProvider")
  }
  return context
}

