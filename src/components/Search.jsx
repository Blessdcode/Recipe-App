import React, { useState } from 'react'
import styled from 'styled-components'
import { FaSearch } from 'react-icons/fa'
import { useNavigate } from 'react-router-dom'



const Search = () => {
    const [input, setInput] = useState("")
    const navigate = useNavigate()


    const submitHandler = (e) => {
        e.preventDefault()
        navigate('/searched/' + input)
    }

    return (
        <FormStyle onSubmit={submitHandler}>
            <div>
                <FaSearch onClick={submitHandler}/>
                <input type="text"
                    onChange={(e) => setInput(e.target.value)}
                    value={input}
                />
            </div>
        </FormStyle>
    )
}



const FormStyle = styled.div`
    margin: 2rem auto;


    div{
        position: relative;
        margin: auto 0;
        width: 100%;
        display: flex;
        justify-content: center;
        align-items: center;
    }


    input{
        border: none;
        background: linear-gradient(35deg, #494949, #313131);
        font-size: 1.5rem;
        color: white;
        padding: 1rem 3rem;
        border-radius: 1rem;
        outline: none;
        margin: auto 0;
        display: flex;
        width: 100%;
        
    }
    svg{
        position: absolute;
        top: 50%;
        left: 0%;
        transform: translate(100%, -50%);
        color: white;
    }
`




export default Search
