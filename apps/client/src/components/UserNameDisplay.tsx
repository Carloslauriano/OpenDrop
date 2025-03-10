"use client"

import type React from "react"
import { useState, useEffect, useContext } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Edit2 } from "lucide-react"
import { base, pt_BR, en, Faker } from '@faker-js/faker';
import { UserContexto } from "@/contexts/user-context"

export function UserNameDisplay() {
  const [userName, setUserName] = useState("")
  const [isEditing, setIsEditing] = useState(false)

  const connection = useContext(UserContexto);
  if (!connection) throw new Error("UserNameDisplay deve ser utilizado dentro do ConnectionProvider");
  const { dados, setDados, sendMessage } = connection;

  useEffect(() => {
    const storedName = localStorage.getItem("userName");

    if (storedName) {
      setUserName(storedName);
      setDados((prevDados) => ({ ...prevDados, nome: storedName }));
    } else {
      const customFaker = new Faker({
        locale: [base, pt_BR, en],
      });
      const randomName = customFaker.person.firstName();
      setUserName(randomName);
      setDados((prevDados) => ({ ...prevDados, nome: randomName }));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUserName(e.target.value)
  }

  const handleNameSubmit = () => {
    if (userName == '') {
      const customFaker = new Faker({
        locale: [base, pt_BR, en],
      });
      const randomName = customFaker.person.firstName();

      localStorage.removeItem("userName")

      setUserName(randomName);
      setDados((prevDados) => ({ ...prevDados, nome: randomName }));
      setIsEditing(false)

      const message = JSON.stringify({ type: 'device-name', data: { name: randomName, uuid: dados.id } })
      sendMessage(message)

      return
    }

    localStorage.setItem("userName", userName)
    setDados((prevDados) => ({ ...prevDados, nome: userName }));
    setIsEditing(false)
    const message = JSON.stringify({ type: 'device-name', data: { name: userName, uuid: dados.id } })
    sendMessage(message)
  }

  return (
    <div className="flex items-center justify-center">
      {isEditing ? (
        <div className="flex items-center space-x-2">
          <Input
            type="text"
            value={userName}
            onChange={handleNameChange}
            placeholder="Seu nome"
            className="max-w-[200px]"
          />
            <Button onClick={handleNameSubmit} aria-label="Salvar nome">Salvar</Button>
        </div>
      ) : (
        <div className="flex items-center space-x-2">
          <span className="text-lg font-semibold">{userName ? `Seu Nome: ${userName}` : "Defina seu nome"}</span>
            <Button variant="ghost" size="icon" onClick={() => setIsEditing(true)} className="hidden sm:inline-flex" aria-label="Editar nome">
            <Edit2 className="h-4 w-4" />
            </Button>
        </div>
      )}
    </div>
  )
}

