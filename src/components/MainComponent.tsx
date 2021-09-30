import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import '../../node_modules/bootstrap/dist/css/bootstrap.css';
import '@grapecity/wijmo.styles/wijmo.css';
import './main-component.css';
import { MenuComponent } from './MenuComponent';
import { PortfelComponent } from './PortfelComponent';

import SlidingPane from "react-sliding-pane";
import "react-sliding-pane/dist/react-sliding-pane.css";

import { TabPanel, Tab } from '@grapecity/wijmo.react.nav';
import TabModel from '../models/Tab';

import ReactNotification from 'react-notifications-component'
import { store } from 'react-notifications-component';
import 'react-notifications-component/dist/theme.css'

import { ReactComponent as ArrowSVG } from '../assets/svg/arrow_next.svg';
import { ReactComponent as NotifySVG } from '../assets/svg/notify.svg';
import { ReactComponent as MessageSVG } from '../assets/svg/message.svg';
import { ReactComponent as LoupeSVG } from '../assets/svg/loupe.svg';
import { ReactComponent as UserSVG } from '../assets/svg/user.svg';
import { ReactComponent as CloseSVG } from '../assets/svg/close.svg';
import { ReactComponent as SuccessSVG } from '../assets/svg/success.svg';
import { ReactComponent as InfoSVG } from '../assets/svg/info.svg';
import { ReactComponent as WarnSVG } from '../assets/svg/warn.svg';
import { ReactComponent as ErrorSVG } from '../assets/svg/error.svg';
import { ReactComponent as UnReadedNotifySVG } from '../assets/svg/unReadedNotify.svg';
import { dodajTab, zaznaczTab } from '../store/actions';

export const MainComponent: React.FC = () => {
  const tabs = useSelector(state => state.tabs);
  const dispatch = useDispatch();

  const [unReadNotification, setUnReadNotification ] = useState(false);
  const [paneNotify, setPaneNotify ] = useState(false);
  const [paneMessage, setPaneMessage ] = useState(false);
  const [paneProfil, setPaneProfil ] = useState(false);

  function setStatePane(name: string, value: boolean): void {
    if (name === "notify") {      
      setPaneNotify(value);  
      setUnReadNotification(false);   
    } else if (name === "message") {      
      setPaneMessage(value); 
    } else if (name === "profil") {
      setPaneProfil(value); 
    }   
  }

  function closeTab(){
    const tab = tabs.data?.[tabs.selected] as TabModel;
    dispatch(dodajTab(tabs.data?.filter(a => a.id !== tab.id) as TabModel[]));
    if(tabs.data?.length != undefined) {
      dispatch(zaznaczTab(tabs.data?.length - 2));
    }
  }

  function selectedIndexChanged(tab: any): void {
    dispatch(zaznaczTab(tab.selectedIndex))
  }

  return (
    <div> 
          <ReactNotification />
          <div id="top">
            <div id="topLeft">               
              <div> 
                <MenuComponent/>     
              </div>
            </div>
            <div id="topCenter">
              <div id="search">                
                <LoupeSVG height={15} width={15} fill={"#495057"}/> 
                <input type="text" placeholder={"Szukaj"}/>
              </div>
            </div>
            <div id="topRight">              
              <button>
                {
                  unReadNotification === true ? 
                  <UnReadedNotifySVG height={20} width={20} fill={"#495057"} onClick={() => setStatePane("notify", true)}/>  
                  : 
                  <NotifySVG height={20} width={20} fill={"#495057"} onClick={() => setStatePane("notify", true)}/>                   
                }
              </button>    
              <button>
                <MessageSVG height={20} width={20} fill={"#495057"} onClick={() => setStatePane("message", true)}/> 
              </button> 
              <button>
                <UserSVG height={20} width={20} fill={"#495057"} onClick={() => setStatePane("profil", true)}/> 
              </button> 
            </div>
          </div>
          <div id="center">
          {
                tabs.data?.length !== undefined && tabs.data?.length > 0 
                ?  
                <div>
                  <TabPanel selectedIndex={tabs.selected} selectedIndexChanged={selectedIndexChanged.bind(this)}>
                  {
                    tabs.data?.map((tab) => (<Tab key={tab.id}>
                      <label id="labelTab">{tab.name}</label>
                      <div>{tab.body}</div>
                    </Tab>))
                  }            
                  </TabPanel>  
                  <button id="tabButtonClose" onClick={() => closeTab()}>
                    <CloseSVG height={15} width={15} fill={"#495057"}/> 
                  </button> 
                </div>
                : null
          }    
          </div>

          <SlidingPane    
            isOpen={paneNotify}
            from="right"
            width="450px"
            hideHeader
            onRequestClose={() => setStatePane("notify", false)}
            >
            <div>
              <div id="slider">
                <label id="slideLabelHeader">{"Powiadomienia"}</label>
              </div>
              <div>
              </div>
            </div>
          </SlidingPane>

          <SlidingPane       
            isOpen={paneMessage}
            from="right"
            width="400px"
            hideHeader
            onRequestClose={() => setStatePane("message", false)}
            >
            <div>
              <div id="slider">             
                <label id="slideLabelHeader">{"Wiadomości"}</label>
              </div>
              <div id="emptyNotify">{'Brak wiadomości'}</div>
            </div>
          </SlidingPane>

          <SlidingPane        
            isOpen={paneProfil}
            from="right"
            width="400px"
            hideHeader
            onRequestClose={() => setStatePane("profil", false)}
            >
            <div id="slider">           
              <label id="slideLabelHeader">{"Profil"}</label>
            </div>
          </SlidingPane>  
    </div>
  );
}