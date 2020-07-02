import React from "react";
import img1 from "../../assets/1.jpg";
import img2 from "../../assets/2.jpg";
import "./magnifer.scss";


const imgTimes = 3;
class Magnifer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      selectImgIndex: 0,
      shadowX: 0,
      shadowY: 0,
      isShowImgShadow: false,
      isShowMagniferImg: false,
    };
    this.magniferWrap = React.createRef();    
  }

  componentDidMount() {
    const { showPicSize, shadowMoveSize } = this.props;
    this.magniferWrapDom = this.magniferWrap.current;
    this.magniferWrapLeft = this.magniferWrapDom.offsetLeft;
    this.magniferWrapTop = this.magniferWrapDom.offsetTop;
    this.shadowToLeftMin = this.magniferWrapLeft + shadowMoveSize.width/2;
    this.shadowToLeftMax = this.magniferWrapLeft + showPicSize.width - shadowMoveSize.width/2;
    this.shadowToTopMin = this.magniferWrapTop + shadowMoveSize.height/2;
    this.shadowToTopMax = this.magniferWrapTop + showPicSize.height - shadowMoveSize.height/2;
    this.imgToLef = this.magniferWrapDom.offsetLeft + showPicSize.width;
    this.imgToTop = this.magniferWrapDom.offsetTop + showPicSize.height;
    this.shadowImgHeightMax = showPicSize.height - shadowMoveSize.height;
    this.shadowImgWidthMAx = showPicSize.width - shadowMoveSize.width;
  }

  selectImg = (i) => {
    if (i === this.state.selectImgIndex) {
      return;
    }
    this.setState({
      selectImgIndex: i,
    });
  };

  shadowMove = (e) => {  
    this.setState({
      isShowImgShadow: true,
      isShowMagniferImg: true,
    })  
    // 中间区域
    if (e.pageY > this.shadowToTopMin && e.pageX > this.shadowToLeftMin && e.pageX < this.shadowToLeftMax && e.pageY < this.shadowToTopMax) {
      this.setState({
        shadowX: e.pageX - this.shadowToLeftMin,
        shadowY: e.pageY - this.shadowToTopMin,
      });
    }
    // 沿上边滑动
    if (e.pageY < this.shadowToTopMin && e.pageX > this.shadowToLeftMin && e.pageX < this.shadowToLeftMax) {
      this.setState({
        shadowX: e.pageX - this.shadowToLeftMin,
        shadowY: 0,
      });
    }
    // 沿左边滑动
    if (e.pageY > this.shadowToTopMin && e.pageX < this.shadowToLeftMin && e.pageY < this.shadowToTopMax) {
      this.setState({
        shadowY: e.pageY - this.shadowToTopMin,
        shadowX: 0,
      });
    }
    // 沿下边滑动
    if(e.pageX > this.shadowToLeftMin && e.pageX < this.shadowToLeftMax && e.pageY > this.shadowToTopMax && e.pageY < 500) {
      this.setState({
        shadowX: e.pageX -this.shadowToLeftMin,
        shadowY: this.shadowImgHeightMax,
      });
    }
    // 沿右边滑动
    if(e.pageX > this.shadowToLeftMax && e.pageX < 500 && e.pageY > this.shadowToTopMin && e.pageY < this.shadowToTopMax) {
      this.setState({
        shadowY: e.pageY -this.shadowToTopMin,
        shadowX: this.shadowImgWidthMAx
      });
    }

    // 出区域 消失
    if(e.pageX > this.imgToLef || e.pageY > this.imgToTop || e.pageY < this.magniferWrapTop || e.pageY < this.magniferWrapTop) {
      this.setState({
        isShowImgShadow: false,
        isShowMagniferImg: false
      })
    }
  };
  shadowLeave = () => {
    this.setState({
      isShowImgShadow: false,
      isShowMagniferImg: false
    });
  };

  render() {
    const { buttonPicSize, showPicSize, shadowMoveSize } = this.props;    
    const imgUrl = [img1, img2];
    const { selectImgIndex, isShowImgShadow, shadowX, shadowY, isShowMagniferImg } = this.state;
    const shadowPostion = { left: shadowX + 'px', top: shadowY + 'px',  height: shadowMoveSize.height + 'px', width: shadowMoveSize.width + 'px'};    
    const magniferImgStyle = { 
      height: imgTimes*showPicSize.height + 'px', 
      width: imgTimes*showPicSize.width + 'px',
      position: 'relative',
      left: -1*imgTimes*shadowX + 'px',
      top: -1*imgTimes*shadowY + 'px'
    }
    return (
      <div className={"magnifer-warp"} ref={this.magniferWrap}>
        <div className={"magnifer-img"}>
          <div
            className={"img-show-left"}
            onMouseMove={this.shadowMove}
            onMouseLeave={this.shadowLeave}
          >
            <img
              src={imgUrl[selectImgIndex]}
              alt=""
              height={showPicSize["height"] + 'px'}
              width={showPicSize["width"] + 'px'}
              className={"img-display"}
            />
            {isShowImgShadow && (
              <div className={"img-shadow"} style={shadowPostion}>                
              </div>
            )}
          </div>

          <div className={"img-btn-wrap"}>
            {imgUrl.map((ele, i) => {
              return (
                <img
                  key={i}
                  src={ele}
                  alt={i}
                  height={buttonPicSize["height"] + 'px'}
                  width={buttonPicSize["width"] + 'px'}
                  className={"img-btn"}
                  onClick={this.selectImg.bind(this, i)}
                />
              );
            })}
          </div>
        </div>       
        <div className={"magnifer-show"}>
          {isShowMagniferImg &&  
          <img src={imgUrl[selectImgIndex]} alt="" style={magniferImgStyle}/>
          }
        </div>       
      </div>
    );
  }
}

export default Magnifer;
