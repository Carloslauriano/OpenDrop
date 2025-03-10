import { SiGithub } from '@icons-pack/react-simple-icons';
import { Button } from "@/components/ui/button"

export function GitHubIcon() {
  return (
    <Button variant="outline" size="icon" asChild>
      <a
        href="https://github.com/Carloslauriano/OpenDrop"
        target="_blank"
        rel="noopener noreferrer"
        className="text-foreground hover:text-foreground/80"
        aria-label="GitHub repository"
      >
        <SiGithub 
          className="h-[1.2rem] w-[1.2rem]"
        />
        <span className="sr-only">GitHub repository</span>
      </a>
    </Button>
  )
}
