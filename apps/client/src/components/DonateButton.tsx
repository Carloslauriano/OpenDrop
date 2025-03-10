import { Heart } from "lucide-react"
import { Button } from "@/components/ui/button"

export function DonateButton() {
  return (
    <Button variant="outline" size="icon" asChild>
      <a
        href="https://example.com/donate"
        target="_blank"
        rel="noopener noreferrer"
        className="text-foreground hover:text-foreground/80"
        aria-label="Fazer uma doação"
      >
        <Heart className="h-[1.2rem] w-[1.2rem]" />
        <span className="sr-only">Fazer uma doação</span>
      </a>
    </Button>
  )
}