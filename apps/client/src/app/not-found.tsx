import Link from "next/link"
import { Button } from "@/components/ui/button"
import { FileWarning } from "lucide-react"

export default function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center min-h-[calc(100vh-128px)] sm:min-h-[calc(100vh-64px)] p-4 text-center">
      <FileWarning className="w-16 h-16 mb-4 text-muted-foreground" />
      <h1 className="text-4xl font-bold mb-2">404</h1>
      <h2 className="text-2xl font-semibold mb-4">Página não encontrada</h2>
      <p className="text-muted-foreground mb-8">
        Desculpe, a página que você está procurando não existe ou foi movida.
      </p>
      <Button asChild>
        <Link href="/">Voltar para a página inicial</Link>
      </Button>
    </div>
  )
}

