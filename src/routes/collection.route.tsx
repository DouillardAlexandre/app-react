/**
  * PROFIL PAGE
  * 
**/

import { connect } from "react-redux";
import { NavigateFunction, useNavigate, useParams } from "react-router-dom";
import Button from "../components/button";
import CardsEditorWidget from "../widgets/cards-editor.widget";
import Plate from "../components/plate";
import Wrapper from "../components/wrapper";
import FileDropper from "../components/file-dropper"

/*interface StateProps{
  _session: Session
  collection: CollectionState
}*/

function CollectionRoute(/*props: StateProps*/){
  
  const navigate: NavigateFunction = useNavigate()
  //const queryParams: URLSearchParams = new URLSearchParams(window.location.search)
  //const collectionId: string = queryParams.get('id')!

  //const [collection, setCollection] = useState<Collection[]>([])

  const { alias } : any = useParams()


  function clickToHome(){
    navigate('/')
  }

  return(
    <Wrapper pageTitle="Collection page">

      {alias}

      <FileDropper
        path={"medias"}
        onDrop={()=>{}}
        onUpload={()=>{}}
      />

      <Button onClick={clickToHome} title={"Click to Home"} />
      
      <Plate withPadding>
        <CardsEditorWidget />
        {/*
        <CollectionBuilderWidget />
        */}
      </Plate>

    </Wrapper>
  )
  
}

const mapStateToProps = (state:any) => ({
  _session : state._session,
  collection : state.collection
})

export default connect(mapStateToProps)(CollectionRoute)