/**
 * Nav Bar
 * 
 */

import React, { useState } from 'react';
import { connect } from 'react-redux';
import { Session } from '@/classes/_session.class';
import { NavigateFunction, useNavigate } from "react-router-dom";
import LoginModal from "@/modals/login.modal"
import Button from "./button"
import { destroySession } from '@/utils/session.utils';
import { useAppSelector } from '@/redux/_hooks';
import { RootState } from '@/redux/_store';


const MODAL_LOGIN: string = "MODAL_LOGIN"

function NavBar(){
  const _storeSession: Session = useAppSelector((state: RootState) => state._session)

  const navigate: NavigateFunction = useNavigate()

  const [currentModal, setCurrentModal] = useState<string | null>(null)

  function clickToHome(){
    navigate('/')
  }

  return (
    <div className="nav-bar flex">

      {currentModal === MODAL_LOGIN &&
      <LoginModal onClose={() => setCurrentModal(null)}/>
      }

      <div className="width40" />

      <Button onClick={clickToHome} title={"Click to Home"} />

      <div className="flex1" />

      { _storeSession.Account.id ?
      <div className="flex">
        <div>{"user : " + _storeSession.Account.alias }</div>
        <Button color={"#74529f"} onClick={destroySession} title={"Log out"}/>
      </div>
      :
      <div>
        <Button color={"#74529f"} onClick={()=>{setCurrentModal(MODAL_LOGIN)}} title={"Register / Sign In"} />
      </div>
      }
    </div>
  )
}

const mapStateToProps = (state: any) => ({
  _session : state._session,
})

export default connect(mapStateToProps)(NavBar)