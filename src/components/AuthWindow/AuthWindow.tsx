import React, {FC} from 'react';
import './AuthWindow.scss'
import '../../styles/index.scss'
import Wrapper from "../Layouts/Wrapper";
import useConfig from "../../store/configStore";
import useAuthWindow from "../../store/authModalStore";
import AuthWindowInner from "../AuthWindowInner/AuthWindowInner";
import AutologinAuthWindowInner from "../AutologinAuthWindowInner/AutologinAuthWindowInner";


type PropsType = {
    setIsUnmount: (isUnmount: boolean) => void
    getTimer: (timer: number) => void
    authTypeProps?: 'MTS_ID' | 'BASIC_SMS'
    isAutologin: boolean
}


const AuthWindow: FC<PropsType> = ({setIsUnmount, getTimer, authTypeProps, isAutologin}) => {
    const isDesktop = useConfig(state => state.isDesktop)
    const setViewModal = useAuthWindow(state => state.setViewModal)

    return (
        <>
            <div className={'modal-container'} style={{
                perspective: 2000,
                display: location.pathname.includes('/pdf_/agreement') ? 'none' : 'flex'
            }}>
                <Wrapper
                    style={{
                        maxWidth: 400, margin: 20, padding: 30, overflow: 'hidden', transition: 'all .5s',
                        boxShadow: '0px 0px 100px rgba(0,0,0,.4)'
                    }}
                >
                    <div onClick={() => setViewModal(false)} className={'notification-close'}>
                        <div className={'notification-close-first-line'}/>
                        <div className={'notification-close-second-line'}/>
                    </div>
                    <div style={{maxWidth: isDesktop ? '100%' : '90%'}}>

                        {isAutologin ? <AutologinAuthWindowInner/> : <AuthWindowInner authTypeProps={authTypeProps}/>}
                    </div>
                </Wrapper>
            </div>
        </>
    );
};

export default AuthWindow;
