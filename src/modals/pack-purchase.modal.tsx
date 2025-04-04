import React, { useEffect, useState } from 'react';
import Modal from '@/components/modal';
import Checkbox from '@/components/checkbox';
import Tabs from '@/components/tabs';
import CardTemplatesWidget from '@/widgets/card-templates.widget';
import Scroller from '@/components/scroller';
import { connect } from 'react-redux';
import { PackTemplateState } from '@/classes/pack-template.class';
import { CardTemplate, CardTemplateState } from '@/classes/card-template.class';
import { getProbability } from '@/utils/probability.utils';
import { sum } from 'lodash';
import CardTemplateDisplayer from '@/components/card-template-displayer';
import Button from '@/components/button';


interface StateProps /*extends WithTranslation*/{
  //_session : Session
  cardTemplate : CardTemplateState
  packTemplate : PackTemplateState
}

interface OwnProps {
  accountId : string
  onClose: Function
}

type Props = StateProps & OwnProps

const MODAL_CARD_DETAILS: string = "MODAL_CARD_DETAILS"

function PackPurchaseModal(props: Props){

  const [currentModal, setCurrentModal] = useState<string | null>(null)
  const [currentTab, setCurrentTab] = useState<string>("INFOS")
  const [selectedCards, setSelectedCards] = useState<CardTemplate[]>([])
  const [simulationMode, setSimulationMode] = useState<boolean>(false)
  const [probability, setProbability] = useState<number>(100)
  const [factor, setFactor] = useState<number>(0)

  useEffect(()=>{
    if(selectedCards.length > 0 && selectedCards.length <= props.packTemplate.active.nbToDraft){
      setProbability(getProbability(props.cardTemplate.list.map((x: CardTemplate)=>{return{ id : x.id, qtty : x.quantityTotal - x.nbTotalDrafted}}), props.packTemplate.active.nbToDraft, selectedCards.map((x: CardTemplate)=>{return{ id : x.id, qtty : x.quantityTotal - x.nbTotalDrafted}})))
    }
    else{
      setProbability(selectedCards.length > 0 ? 0 : 1)
    }
  }, [
    selectedCards.length,
    props.packTemplate.active.nbToDraft
  ])

  useEffect(()=>{
    setFactor(getFactor())
  }, [
    probability
  ])

  function getFactor(){
    const nbTotalDraftedSum: number = sum(selectedCards.map((x: CardTemplate)=>x.quantityTotal - x.nbTotalDrafted))
    const nbTotalDraftedProduct: number = selectedCards.map((x: CardTemplate)=>x.quantityTotal - x.nbTotalDrafted).reduce((accumulator: number, currentValue: number) => accumulator * (nbTotalDraftedSum/currentValue), 1)

    const factor: number = Math.pow(probability * nbTotalDraftedProduct, 1 / (selectedCards.length > 0 ? selectedCards.length : 1))

    return factor
  }

  function toggleCardTemplate(cardTemplate: CardTemplate){

    if(selectedCards.map((x: CardTemplate)=>x.id).indexOf(cardTemplate.id)>-1){
      setSelectedCards(selectedCards.filter(((x: CardTemplate)=>x.id !== cardTemplate.id)))
    }
    else{
      setSelectedCards([...selectedCards, new CardTemplate(cardTemplate)])
    }
  }

  return(
    <Modal onClose={props.onClose}>

      { currentModal === MODAL_CARD_DETAILS &&
      <Modal onClose={()=>setCurrentModal(null)}>
        <CardTemplateDisplayer cardTemplate={props.cardTemplate.active}/>
      </Modal>
      }

      <h2>Modal Title</h2>
      <div className="padding20">
        <Tabs
          tabs={[ "INFOS", "POOL" ]}
          onClick={(tab: string)=>{setCurrentTab(tab)}}
        />
        { currentTab === "INFOS" ?
        <div>
          <h3>{props.packTemplate.active.name}</h3>
          <div>{props.packTemplate.active.description}</div>
          { props.packTemplate.active.datePresale &&
          <div>{"date presale : " + new Date(props.packTemplate.active.datePresale)}</div>
          }
          <div>{"date release : " + new Date(props.packTemplate.active.dateRelease)}</div>
          { props.packTemplate.active.dateEnd &&
          <div>{"date end : " + new Date(props.packTemplate.active.dateEnd)}</div>
          }
        </div>
        :
        <div>
          <h3>{ simulationMode ? "Simulate draft probability" : "Draft pool"}</h3>

          { simulationMode ?
          <div>
            { `Select 1 to ${props.packTemplate.active.nbToDraft} card templates to simulate the probability to obtain them.` }
          </div>
          :
          <div>
            { "On the left you can see all possible cards you can draft from the pack" }
          </div>
          }

          <div className="flex">
            <div className="flex1 padding10">
              <div>{"here's the pool"}</div>

              <Scroller maxHeight={300}>
                <CardTemplatesWidget
                  accountId={props.accountId}
                  packTemplateId={props.packTemplate.active.id}
                  selectedList={simulationMode ? selectedCards.map((card: CardTemplate)=>card.id) : []}
                  onClick={(cardTemplate: CardTemplate) => simulationMode ? toggleCardTemplate(cardTemplate) : setCurrentModal(MODAL_CARD_DETAILS)}
                />
              </Scroller>
            </div>

            <div className="width20" />

            { props.packTemplate.active.type === "BOOSTER" &&

            <div className="flex1 padding10">
              { simulationMode ? "what you could get" : "what you get" }

              <div className="flex flex-wrap">

                <div className="flex flex-dcol">
                  <div className="flex1"/>
                  <div style={{marginLeft:-25}}>{"=>"}</div>
                  <div className="flex1"/>
                </div>

                {[...Array(props.packTemplate.active.nbToDraft)].map((e: any, i: number) => 
                <div
                  key={i}
                  className="padding10"
                  onClick={selectedCards[i] ? () => toggleCardTemplate(selectedCards[i]) : undefined}
                >
                  {( simulationMode && selectedCards[i] ) ?
                  <div className="card-display-mini" >
                    <div>
                      {//<img src="url" +
                      //selectedCards[i].thumbnail
                      }
                      picture
                    </div>

                    <div>{"#" + selectedCards[i].collectionNumber}</div>

                    <div>
                      {(((selectedCards[i].quantityTotal - selectedCards[i].nbTotalDrafted) / sum(selectedCards.map((x: CardTemplate) => x.quantityTotal - x.nbTotalDrafted))) * factor * 100).toFixed(2) + "%"}
                    </div>
                  </div>
                  :
                  <div className="card-display-mini flex flex-dcol">
                    <div className="flex1"/>

                    <div className="flex" style={{fontSize: 24}}>
                      <div className="flex1"/>
                        { simulationMode ? "X" : "?" }
                      <div className="flex1"/>
                    </div>

                    <div className="flex1"/>
                  </div>
                  }

                </div>
                )}

              </div>

              {( simulationMode && selectedCards.length > props.packTemplate.active.nbToDraft ) &&
              <div className="flex flex-wrap">
                { selectedCards.slice(props.packTemplate.active.nbToDraft).map((cardTemplate: CardTemplate, i: number) => 
                <div
                  key={i}
                  className="padding10 element-inactive flex1"
                  onClick={() => toggleCardTemplate(cardTemplate)}
                >
                  <div className="card-display-mini" >
                    <div>
                      {//<img src="url" +
                      //selectedCards[i].thumbnail
                      }
                      picture
                    </div>

                    <div>{"#" + cardTemplate.collectionNumber}</div>

                    <div>{(0).toFixed(2) + "%"}</div>
                  </div>
                </div>
                )}
                <div>warning : you selected more cards than you could draft</div>
              </div>
              }

              { simulationMode &&
              <div>
                {`probability : ${(probability * 100).toFixed(2)}%`}
              </div>
              }

            </div>

            }
          </div>
        </div>
        }

        <div className="flex">

          {( currentTab === "POOL" && props.packTemplate.active.type === "BOOSTER" ) &&
            <Checkbox text="simulation mode" active={simulationMode} onClick={()=>setSimulationMode(!simulationMode)}/>
          }
          <div className="flex1" />

          <Button
            title={"buy_button"}
            inactive={( currentTab === "POOL" && simulationMode)}
            onClick={()=>console.log("buy")}
          />
        </div>

      </div>
    </Modal>
  )
}

const mapStateToProps = (state:any) => ({
  cardTemplate : state.cardTemplate,
  packTemplate : state.packTemplate
})

export default connect(mapStateToProps)(PackPurchaseModal)