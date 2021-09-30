import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { dajMenu, dodajTab, zaznaczTab } from '../store/actions';
import './menu-component.css';

import { ReactComponent as ArrowSVG } from '../assets/svg/arrow_next.svg';
import Tab from '../models/Tab';

export const MenuComponent: React.FC = () => {
  const menu = useSelector(state => state.menu); 
  const tabs = useSelector(state => state.tabs);
  const dispatch = useDispatch();
       
  useEffect(() => {
    dispatch(dajMenu());
  }, [dispatch])


  function menuClick(tab: Tab): void {
    if(!tabs.data?.some(x=>x.id === tab.id)){
      let newTabs = tabs.data as Tab[];
      newTabs.push(tab);
      dispatch(dodajTab(newTabs));
      dispatch(zaznaczTab(newTabs.length - 1));
    } else { 
      const index = tabs.data?.findIndex(x => x.id === tab.id); 
      dispatch(zaznaczTab(index));
    }
  }

  return (  
        <div id="menu">
                {
                  menu.data?.map((item) => (
                    <div className="menuHeader">
                        <label className="olLabel">{item.name}</label> 
                        <div className="menuPanel">
                          {
                            item.tab.map((tab) => (
                              <div className="menuParent" onClick={() => { if(tab.tab.length === 0) {menuClick(tab)}}}>
                                <div className="menuIcon">{tab.icon}</div>
                                  <label className="menuTitle">{tab.name}</label>
                                <div id="arrowRight">
                                 { tab.tab.length > 0 ? <ArrowSVG width={12} height={12} fill={"#495057"}/> : null }
                                </div>
                                <div className="menuPanelChild">
                                  {
                                    tab.tab.map((child) => (
                                      <div className="menuParent" onClick={() => menuClick(child)}>
                                        <div className="menuIcon">{child.icon}</div>
                                          <label className="menuTitle">{child.name}</label>
                                      </div>
                                    ))
                                  }
                                </div>
                              </div> ))
                          }
                        </div>                      
                    </div> ))
                }         
              </div>    
  );
}