/**
  * ERROR PAGE
  * 
**/

import { NavigateFunction, useNavigate } from "react-router-dom";
import Wrapper from "../components/wrapper";
import Plate from "../components/plate";
import Button from "../components/button";

function ErrorRoute(){
  
  const navigate: NavigateFunction = useNavigate()

  const searchParams: URLSearchParams = new URLSearchParams(window.location.search)

  const code: number | string | null = searchParams.get("code")

  return(

    <Wrapper pageTitle="Error">

      <Plate>

        {code &&
        <div>{"error : " + code}</div>
        }

        <Button title={"home"} onClick={() => navigate("/u/me")} />

      </Plate>

    </Wrapper>
  )
  
}

export default ErrorRoute