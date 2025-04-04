/**
 * PACK-TEMPLATE-DISPLAYER
 * 
 */

import React from 'react';
import { _authRegister, _authSignin } from "../api/_auth.api";
import { PackTemplate } from '@/classes/pack-template.class';
import { packTemplateActivate } from '@/redux/pack-template.slice';
import { Dispatch } from '@reduxjs/toolkit';
import { useAppDispatch } from '@/redux/_hooks';


interface OwnProps {
  packTemplate: PackTemplate
  isActive?: boolean
  onClick?: Function
}

type Props = OwnProps

function PackTemplateDisplayer(props: Props){
  const dispatch: Dispatch = useAppDispatch()

  function click(){
    dispatch(packTemplateActivate(props.packTemplate))
    
    if(props.onClick){
      props.onClick(props.packTemplate)
    }
  }

  return (
    <div
      onClick={click}
      className={"pack-display" + (props.isActive ? " element-selected" : "")}
    >

      <div>{props.packTemplate.name}</div>
      <div>{props.packTemplate.description}</div>
      <div>{props.packTemplate.basePrice}</div>
      
      <div>{props.packTemplate.nbToDraft}</div>

    </div>
  )
}


export default PackTemplateDisplayer

