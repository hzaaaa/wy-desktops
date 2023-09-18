import React, {Component} from 'react'
import { View } from 'react-desktop'
import { str_cut } from 'ljtools'
import { addLogApi } from "@/api/system/role";

let platformTypeSet = new Set();
    // console.log(platformTypeSet)
class DesktopApps extends Component {

  state = {}

  render() {
    const {
      desktopApps,desktopAppsShowControl,openWindowList,
      setWindowOpenList
    } = this.props
    
    let setWindowOpenListWrap = (row,openWindowList)=>{
      // debugger
      console.log('row',row)
      if(row.platformType){
        if(platformTypeSet.has(row.platformType)){

        }else{
          platformTypeSet.add(row.platformType);
          console.log('first',row.platformType)
          addLogApi({state:1,platformType:row.platformType}).then((res)=>{
            console.log('addLogApi',res)
          })
        }
      }
      setWindowOpenList(row,openWindowList)
    }
    return (
      <View width="100%" style={{padding:'10px 0 0 10px'}}>
        {desktopAppsShowControl.isShow &&
          <View
            className="desktop_apps"
            layout="vertical"
          >
            {desktopApps.map((row)=>(
              <div
                key={row.type}
                className={"desktop_app "+desktopAppsShowControl.size}
                onDoubleClick={()=>{row.isBlank?window.open(row.url):setWindowOpenListWrap(row,openWindowList)}}
              >
                <img src={row.logo} alt="file1"/>
                <h3>{str_cut(row.name,7)}</h3>
              </div>
            ))}
          </View>
        }
      </View>
    )
  }
}


export default DesktopApps