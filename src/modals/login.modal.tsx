/** 
 * MODAL
 * Dialog
 */

import { useState } from "react"
import Modal from "@/components/modal"
import Tabs from "@/components/tabs"
import RegisterWidget from "@/widgets/register.widget"
import SigninWidget from "@/widgets/signin.widget"

interface OwnProps{
  onClose: Function
}

type Props = OwnProps

type LoginMode = "REGISTER" | "SIGNIN"

function LoginModal(props:Props) {

  const [loginMode, setLoginMode] = useState<LoginMode>("SIGNIN")

  function close(){
    props.onClose()
  }

  return (
    <Modal
      onClose={close}
      title={"Login"}
    >
      <Tabs
        tabs={[ "SIGNIN", "REGISTER" ]}
        currentTab={loginMode}
        onClick={(tab: LoginMode) => setLoginMode(tab)}
      />

      { loginMode === "SIGNIN" ?
      <SigninWidget onSuccess={close} />
      :
      <RegisterWidget onSuccess={close} />
      }
    </Modal>
  )
}

export default LoginModal