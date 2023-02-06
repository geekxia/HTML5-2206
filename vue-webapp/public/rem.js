// 作用：重置html的font-size大小
// 让html根字体的大小，等于当前屏幕px总像素的10分之1

function resetRootFZ() {
  var oHtml = document.querySelector('html')
  var w = oHtml.getBoundingClientRect().width  // px（当前屏幕的总宽度）
  // 设置根字体的大小等于html节点的宽度的十分之一
  oHtml.style.fontSize = w/10 + 'px'
}

resetRootFZ()

// 当window窗口尺寸变化时，重新设置根字体的大小
window.addEventListener('resize',function(){
  resetRootFZ()
})

// rem：root font size
// em：相对于最近一个父元素的fontSize
// px：绝对单位
// vw vh

// <html>
// <div>
//   <div style='font-size:20px;'>
//     <div style='fontSize: 30px;'>
//       <h1>
//         <div class='box'></div>
//       </h1>
//     </div>
//   </div>
// </div>
// </html>
//
// .box {
//   width: 2rem;
// }
