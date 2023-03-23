// 默认初始值
const defaultV = -10;

// 方式一：推荐
const getScrollRatio = (sectionEl: HTMLElement):number => {
  // 判空处理
  if (!sectionEl) { 
    return defaultV;
  } 
  // 获取窗口滚动条高度
  const scrollTop = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop; 
  // 获取浏览器可视区的高度
  const clientHeight = document.documentElement.clientHeight || document.body.clientHeight; 
  // section元素的高度
  const elClientHeight = sectionEl.clientHeight; 
  // 距离顶部高度少了一屏的高度 卷起 可视区域 一部分高度，大于等于0
  let ps = Math.floor(sectionEl.offsetTop - clientHeight); 
  ps = ps < 0 ? 0 : ps;
  // 每一个section头部滚动到底部  0 ----> 1的变化
  return (scrollTop - ps) / elClientHeight; 
}

// 方式二：次推荐
const getScrollProgress = (sectionEl: HTMLElement):number => {
  // 判空处理
  if (!sectionEl) { 
    return defaultV;
  } 
  // const remommendPageDom =  document.getElementById('remommendPage');
  let windowInnerHeight = window.innerHeight;
  let domOffsetHeight = sectionEl.offsetHeight;
  let domClientRectTop = sectionEl.getBoundingClientRect().top;
  return (windowInnerHeight - domClientRectTop) / domOffsetHeight;
} 

// 方式三：普通
const getScrollRate = (sectionEl: HTMLElement):number => {
  // 判空处理
  if (!sectionEl) { 
    return defaultV;
  } 
  
  // 视口高度
  const innerHeight = window.innerHeight
  // 获取滚动位置
  const scrollTop = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop
  // 自身内容的高度
  // const offsetHeight = sectionEl.offsetHeight;
  // 获取dom偏移量
  const offsetTop = sectionEl.offsetTop;
  // 从rect中获取元素的高度
  const { height: rectHeight } = sectionEl.getBoundingClientRect();
  // 获取粘性高度H值和粘性Y值
  const stickyH = rectHeight - innerHeight;
  // 滚动的相对位置
  const stickyY = scrollTop - offsetTop;
  // 计算滚动比例
  return stickyY / stickyH;
}

// 设置透明度
const setOpacityCallback = ({ratio,count}, callBack)=> {
  for (let i = 0; i < count; i++) {
    const start = 1 / count * i;
    const end = 1 / count * (i + 1);
    let progress = (ratio - start) / (end - start);
    if (progress >= 1) progress = 1;
    if (progress <= 0) progress = 0;
    callBack && callBack(i, progress);
  }
}

// 对外统一暴露计算位置方法
export const useCalPos = ()=> { 
  return {
    getScrollRatio,
    getScrollProgress,
    getScrollRate,
    setOpacityCallback
  }
}
