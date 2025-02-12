"use client"

import type React from "react"
import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Edit2 } from "lucide-react"
import { base, pt_BR, en, Faker } from '@faker-js/faker';

export function UserNameDisplay() {
  const [userName, setUserName] = useState("")
  const [isEditing, setIsEditing] = useState(false)

  useEffect(() => {
    const storedName = localStorage.getItem("userName")
    if (storedName) {
      setUserName(storedName)
    } else {
      const customFaker = new Faker({
        locale: [base, pt_BR, en],
      });
      setUserName(customFaker.person.fullName())
    }
  }, [])

  const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUserName(e.target.value)
  }

  const handleNameSubmit = () => {
    localStorage.setItem("userName", userName)
    setIsEditing(false)
  }

  return (
    <div className="mb-4 flex items-center justify-center">
      {isEditing ? (
        <div className="flex items-center space-x-2">
          <Input
            type="text"
            value={userName}
            onChange={handleNameChange}
            placeholder="Seu nome"
            className="max-w-[200px]"
          />
          <Button onClick={handleNameSubmit}>Salvar</Button>
        </div>
      ) : (
        <div className="flex items-center space-x-2">
          <span className="text-lg font-semibold">{userName ? `Seu Nome: ${userName}` : "Defina seu nome"}</span>
          <Button variant="ghost" size="icon" onClick={() => setIsEditing(true)}>
            <Edit2 className="h-4 w-4" />
          </Button>
        </div>
      )}
    </div>
  )
}

