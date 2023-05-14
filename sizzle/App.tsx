import { useEffect, useState } from 'react';
import { BrowserView, MobileView } from 'react-device-detect';
import PhoneMain from './PhoneMain';
import Main from './Main';


const App = () => {

  document.documentElement.style.overflowY = "auto";
  document.documentElement.style.marginRight = '0';



  const [asPhone, setAsPhone] = useState(false);

  const resizeUpdate = (e) => {
    // 通过事件对象获取浏览器窗口的高度
    let w = e.target.innerWidth;
    const widthasphone = w < 900;
    setAsPhone(widthasphone);
  };

  useEffect(() => {
    // 页面刚加载完成后获取浏览器窗口的大小
    let w = window.innerWidth;

    const widthasphone = w < 900;
    setAsPhone(widthasphone)
    // 页面变化时获取浏览器窗口的大小 
    window.addEventListener('resize', resizeUpdate);

    return function unmount() {
      // 组件销毁时移除监听事件
      window.removeEventListener('resize', resizeUpdate);
    };
  }, []);







  return (
    < >
      <BrowserView style={{ width: '100%' }}>
        <>{asPhone ?
          <PhoneMain mobile={false} />
          :
          <Main />}
        </>
      </BrowserView>
      <MobileView>
        <PhoneMain mobile={true} />
      </MobileView>
    </>



  );
}

export default App;
