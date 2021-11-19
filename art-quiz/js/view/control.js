class Control{
  constructor(parentNode = null, tagName = 'div', className = '', content = '') {
    this.node;
    const el = document.createElement(tagName);
    el.className = className;
    el.textContent = content;
    if (parentNode) {
      parentNode.append(el);
    }
    this.node = el;
  }
  destroy(){
    this.node.remove();
  }

}

export default Control;