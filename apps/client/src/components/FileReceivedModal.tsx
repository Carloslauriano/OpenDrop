"use client"
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { useFileReceive } from "@/lib/fileReceiveContext"
import { toast } from "@/hooks/use-toast"

export function FileReceivedModal() {
  const { receivedFile, setReceivedFile } = useFileReceive()

  const handleClose = () => {
    setReceivedFile(null)
  }

  const handleSave = () => {
    // Implement file saving logic here
    toast({
      title: "Arquivo salvo",
      description: `${receivedFile?.fileName} foi salvo com sucesso.`,
    })
    setReceivedFile(null)
  }

  if (!receivedFile) return null

  return (
    <Dialog open={!!receivedFile} onOpenChange={handleClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Arquivo Recebido</DialogTitle>
          <DialogDescription>
            Você recebeu o arquivo: {receivedFile.fileName} de {receivedFile.fromDevice}
          </DialogDescription>
        </DialogHeader>
        <DialogFooter>
          <Button variant="outline" onClick={handleClose}>
            Fechar
          </Button>
          <Button onClick={handleSave}>Salvar</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}

