import { render, screen, waitFor } from "@testing-library/react";
import  userEvent  from "@testing-library/user-event";
import axios from "axios";
import Pokecard from "../components/Pokecard";
import { PokeCardMock } from "./PokeCardMock";

jest.mock("axios")

const urlMock = "https://pokeapi.co/api/v2/pokemon/charmander"

const openModalMock = jest.fn()

//resposta do axios.get mockado
const axiosResponseMock = {
    data: PokeCardMock
}

describe("PokeCard", () => {
    test("Renderizar card", async () => {
        axios.get.mockResolvedValueOnce(axiosResponseMock)
        render(<Pokecard url={urlMock} openModal={openModalMock} />)
        //screen.debug()

        await waitFor(() => { })
        //screen.debug()
        const name = screen.getByRole('heading', {
            name: /charmander/i
          })
          const image = screen.getByRole('img', {
            name: /charmander/i
          })
          const type = screen.getByText(/fire/i)

          expect(image).toBeInTheDocument()
          expect(name).toBeInTheDocument()
          expect(type).toBeInTheDocument()
    })

    test("Open Modal",async()=>{
        axios.get.mockResolvedValueOnce(axiosResponseMock)
        const user = userEvent.setup()
        render(<Pokecard url={urlMock} openModal={openModalMock}/> )

        await waitFor(()=>{})
    
        //screen.logTestingPlaygroundURL()
        const card = screen.getByRole('article')
        await user.click(card)
        expect(openModalMock).toBeCalled()
    })
})