/**
 * HOME PAGE
 * 
**/

import Wrapper from "../components/wrapper";
import Plate from "../components/plate";
import TestWidget from "@/widgets/test.widget";

function _HomeRoute(){

  return(

    <Wrapper pageTitle="Home page">

      <Plate withPadding>
        <a href={`${process.env.REACT_APP_URL}:${process.env.REACT_APP_PORT}`}>{ `url : ${process.env.REACT_APP_URL} ,\n\n port : ${process.env.REACT_APP_PORT }`}</a>

        <TestWidget mode="JAVA" />

        <TestWidget mode="NODE" />

      </Plate>

    </Wrapper>
  )
  
}

export default _HomeRoute


