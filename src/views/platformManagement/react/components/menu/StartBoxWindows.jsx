import React, {Component, Fragment} from 'react'
import { View } from 'react-desktop'
import { Nav,Button,Balloon,Grid,Animate } from '@alifd/next'
import { ElMessage, ElMessageBox } from "element-plus";
import { logoutApi } from "@/api/login";
import { useUserStore } from "@/stores/user";
import router from "@/routers/index";
import Cookies from 'js-cookie';
// const route = useRoute();
// const router = useRouter();
const userStore = useUserStore();
// 退出登录
const logoutClick = () => {
  ElMessageBox.confirm("确认退出吗?", "提示", {
    confirmButtonText: "确定",
    cancelButtonText: "取消",
  })
    .then(async () => {
      // 1. 调用退出登录接口
      await logoutApi();
      // 2. 清除 token 等缓存
      // debugger
      userStore.$reset();
		  localStorage.clear();
      document.cookie='';
      Cookies.remove('token');
      // document.cookie = "";
      // 3. 重定向到登录页,并携带当前页面地址和参数
      // debugger
      // const path = `/login?redirect=${route.path}&params=${JSON.stringify(route.query ? route.query : route.params)}`;
      const path = `/login`;
      // debugger
      router.replace(path);
      location.reload();
      ElMessage.success("退出登录成功！");
    })
    .catch((e) => {
      ElMessage.error(e)
    });
};

const{ Row,Col } = Grid
const { Item, Group,SubNav } = Nav

const Logout = <i className="iconfont">&#xeaf7;</i>

//左侧应用列表
class StartBoxLeftTree extends Component {
  render(){
    const { startBoxLeftApps } = this.props
    return (
      <Nav style={{width: '100%', height: 330, overflowY: 'auto'}}>
        {startBoxLeftApps.map((row,i)=>(
          <Group key={i} label={row.lab}>
            {this.tree(row.list)}
          </Group>
        ))}
      </Nav>
    )
  }
  tree = (data) => {
    const {
      openWindowList,
      setWindowOpenList,closeStartBox
    } = this.props
    return data.map((row)=>{
      if(row.children){
        return (
          <SubNav key={row.type} icon={<img src={row.logo} alt={row.name}/>} label={row.name}>
            {this.tree(row.children)}
          </SubNav>
        )
      }else{
        return(
          <Item
            key={row.type}
            onClick={()=>{
              row.isBlank ? window.open(row.url) : setWindowOpenList(row,openWindowList)
              closeStartBox()
            }}
            icon={<img src={row.logo} alt={row.name}/>}>{row.name}</Item>
        )
      }
    })
  }
}


class StartBoxWindows extends Component {

  state = {}

  render() {
    const {
      isOpenStartBox,startBoxLeftApps,startBoxRightApps,openWindowList,background,
      closeStartBox,setWindowOpenList
    } = this.props
    const backgroundStyle = {
      position: 'absolute',
      top:0,
      left:0
    }
    if(background.type === 'color'){
      backgroundStyle.backgroundColor = background.value
      backgroundStyle.opacity = 0.98
    }
    const backgroundChangeStyle = {
      position: 'absolute',
      top:0,
      left:0
    }
    return (
      <Fragment>
        <Animate
          animation="start_box_expand"
          beforeEnter={this.beforeEnter}
          onEnter={this.onEnter}
          afterEnter={this.afterEnter}
          beforeLeave={this.beforeLeave}
          onLeave={this.onLeave}
          afterLeave={this.afterLeave}
        >
        {isOpenStartBox ?
        <View className="start_box" style={{position: 'absolute', bottom: 0}}>
          {background.type === 'color' ?
            <Fragment>
              <View height="100%" width="100%" className={'start_box_background'} style={backgroundStyle}/>
              <View height="100%" width="100%" className={'start_box_background_change_color'} style={backgroundChangeStyle}/>
            </Fragment>
          :
            <Fragment>
              <View height="100%" width="100%" className={'start_box_background_change'} style={backgroundChangeStyle}/>
            </Fragment>
          }

          <View className="start_box_left">
            <div className="start_box_left_user">
              <div className="start_box_left_info">
                <img src="/logo/default_header.jpg" alt="header_img" onClick={()=>{setWindowOpenList({
                  name:'基本信息',type:'baseinfo',logo:'/logo/default_header.jpg',isShow:true,url:'/#/baseinfo',isIframe:true,isBlank:false
                },openWindowList);closeStartBox()}}/>
                {/* <div class="avatar">{ userStore?.userInfo?.sysUser?.username?.slice(0, 1).toUpperCase()}</div> */}
                <h3>{userStore?.userInfo?.sysUser?.username}</h3>
                <p>{userStore?.roleInfo[0]?.name}</p>
              </div>
              
              <div className="start_box_left_operating">
                <ul>
                  <li>
                    <div> 
                      <Balloon align="r" trigger={Logout} closable={false}  onClick={()=>{logoutClick();closeStartBox()}}>退出登录</Balloon>
                    </div>
                  </li>
                </ul>
              </div>
            </div>
            {/* <div className="start_box_left_menus">
                <StartBoxLeftTree
                  startBoxLeftApps={startBoxLeftApps}
                  setWindowOpenList={setWindowOpenList}
                  openWindowList={openWindowList}
                  closeStartBox={closeStartBox}
                />
            </div> */}
          </View>
          {/* <View className="start_box_right" layout="vertical">
            <View className="start_box_right_header">
              <h2>应用中心</h2>
            </View>
            <View className="start_box_right_content" layout="vertical">
              <Row gutter={8}>
                {startBoxRightApps.map(row=>(
                  <Col key={row.type} span={row.colSpan}>
                    <div className="start_box_application">
                      <img src={row.img} alt={row.type}/>
                      {row.name && <h4>{row.name}</h4>}
                      <div className="start_box_application_hover"/>
                    </div>
                  </Col>
                ))}
              </Row>
            </View>
          </View> */}
        </View>
          :
          null
        }
        </Animate>
        {isOpenStartBox && <div onClick={closeStartBox} className="start_box_cover" style={{position:'absolute',width:'100%',height:'calc(100% + 37px)',zIndex:999}} /> }
      </Fragment>
    )
  }
  beforeEnter = (node) => {
    this.height = node.offsetHeight;
    node.style.bottom = `-${this.height}px`;
  }

  onEnter = (node) => {
    node.style.bottom = `0px`;
  }

  afterEnter = (node) => {
    // this.width = null;
  }

  beforeLeave = (node) => {
    node.style.bottom = `0px`;
  }

  onLeave = (node) => {
    node.style.bottom = `-${this.height}px`;
  }

  afterLeave = (node) => {
    // node.style.bottom = null;
  }
}


export default StartBoxWindows