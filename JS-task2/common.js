/**
 * Created by yoyo on 2017-07-22.
 */

/**
 * 创建标签并添加到指定位置
 * @param tagName 要创建的标签的标签名 - 字符串类型
 * @param targetElement 要放入到的位置 - 标签
 * @returns {Element} 返回刚创建的标签
 */
function crt(tagName, targetElement) {
  var tag = document.createElement(tagName);//创建标签
  targetElement.appendChild(tag);//放到用户指定的位置
  //return操作不是必须的，但是可以让这个函数的功能更好用，方便用户直接获取到创建的标签
  return tag;
}

/**
 * 获取某个标签的所有同级元素
 * @param tag 要操作的标签
 * @returns {Array} 获取到的所有同级元素，数组形式
 */
function getSiblings(tag) {
  //1 先找爹(父元素)
  var fa = tag.parentNode;
  //2 再找儿子(所有子元素)
  var sons = fa.children;
  //3 取出除我以外的li即可
  var resultArr = [];//用于保存获取到的标签
  for (var i = 0; i < sons.length; i++) {
    if (sons[i] != tag) {//检测是否是当前操作的标签
      resultArr.push(sons[i]);//放入结果数组
    }
  }
  return resultArr;//返回
}

/**
 * 根据类名获取元素的函数
 * @param clsName 指定要获取的类名
 * @param targetElement 要进行元素的获取的位置(可选参数，默认为body中获取)
 * @returns {*} 返回获取到的标签，数组形式
 */
function getByClass(clsName, targetElement) {
  //由于targetElement是可选参数，应当给这个形参设置默认值
  targetElement = targetElement || document.body;
  
  //步骤1：进行能力检测
  if (targetElement.getElementsByClassName) {
    //支持的代码
    return targetElement.getElementsByClassName(clsName);
  } else {
    //如果进入到else，说明当前浏览器不支持此方法，自己书写功能实现。
    //需求：根据给定的类名进行元素的获取
    //1 获取指定的某个标签中的所有标签
    var tags = targetElement.getElementsByTagName("*");
    var resultArr = [];//结果数组，用于保存获取到的标签
    
    //2 遍历所有标签
    for (var i = 0; i < tags.length; i++) {
      //3 取出当前某个标签的类名，用于检测
      var oldCls = tags[i].className;
      
      //注意：验证时，需要考虑，如果取得的标签不是只有一个类名时，采用相等判断会导致不准确
      //4 将标签的类名按照空格分割
      var clsArr = oldCls.split(" ");
      
      //5 遍历，查找指定的部分是否存在
      for (var j = 0; j < clsArr.length; j++) {
        //如果某个部分和指定类名相等，取出即可
        if (clsArr[j] == clsName) {
          resultArr.push(tags[i]);
          break;//跳出
        }
      }
    }
    return resultArr;
  }
}

/**
 * 获取标签的某个指定样式值
 * @param tag 要进行样式获取的标签
 * @param styleName 要进行获取的样式名
 * @returns {*} 返回获取的样式值 - 字符串类型
 */
function getStyle(tag, styleName) {
  if (tag.currentStyle) {
    return tag.currentStyle[styleName];
  } else {
    return getComputedStyle(tag, null)[styleName];
  }
}

/**
 * 获取标签的纯文本内容
 * @param tag 要进行文本获取的标签
 * @returns {*} 获取到的文本内容
 */
function getText(tag) {
  if (typeof tag.innerText == "string") {
    return tag.innerText;
  } else {
    return tag.textContent;
  }
}

/**
 * 设置标签的纯文本内容
 * @param tag 要进行文本设置的标签
 * @param content 要设置的内容 - 字符串类型
 */
function setText(tag, content) {
  if (typeof tag.innerText == "string") {
    tag.innerText = content;
  } else {
    tag.textContent = content;
  }
}

/**
 * 给指定的元素设置选项卡切换效果
 * @param tag 要设置tab效果的父盒子
 */
function createTab(tag) {
  //需要制作tab效果的盒子是不确定的，可以让用户进行传入
  //1 获取元素
  var spans = tag.getElementsByTagName("span");
  var lis = tag.getElementsByTagName("li");
  
  //2 给每个span设置点击事件
  for (var i = 0; i < spans.length; i++) {
    spans[i].index = i;
    spans[i].onclick = function () {
      //3 先给span设置点击按钮变色效果
      for (var i = 0; i < spans.length; i++) {
        spans[i].className = "";
        //借助span清除的循环，对li进行排他操作
        lis[i].className = "";
      }
      this.className = "current";
      
      //4 使用当前span的索引值到所有的li中找到对应的li设置类名
      lis[this.index].className = "show";
    };
  }
}

/**
 * 修改标签的类名
 * @param tag 要进行类名修改的标签
 * @param searchVal 要修改的类名
 * @param replaceVal 修改为什么新类名
 */
function changeClass(tag, searchVal, replaceVal) {
  var clsArr = tag.className.split(" ");
  //2 找到需要修改的部分的索引值
  var index = clsArr.indexOf(searchVal);
  //3 将对应的值修改为新的内容即可
  clsArr[index] = replaceVal;
  //4 拼接后设置给er的className即可
  tag.className = clsArr.join(" ");
}

/**
 * 给据id名获取元素
 * @param idName 指定的id名
 * @returns {Element} 获取到的标签
 */
function id(idName) {
  return document.getElementById(idName);
}


/**
 * 可以进行样式设置
 * @param tag 要进行样式设置的标签
 * @param styleName 可能是字符串或者对象，字符串标签单个设置的样式名，对象表示多个设置的数据
 * @param styleVal （可选）如果传入，表示要设置的单个样式值
 */
function setStyle(tag, styleName, styleVal) {
  //可以根据传入参数的个数不同，执行不同的功能
  //也可以根据styleName的类型或者styleVal是否传了值，进行判断
  if (arguments.length == 2) {
    for (var k in styleName) {
      //k - 属性名 - 字符串类型 - 相当于styleName
      //obj[k] - 属性值 - 相当于styleVal
      tag.style[k] = styleName[k];
    }
  } else {
    tag.style[styleName] = styleVal;
  }
}