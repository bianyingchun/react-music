export function hasClass(el: HTMLElement, className: string) {
  const reg = new RegExp("(^|\\s)" + className + "(\\s|$)");
  return reg.test(el.className);
}

export function addClass(el: HTMLElement, className: string) {
  if (hasClass(el, className)) {
    return;
  }

  const newClass = el.className.split(" ");
  newClass.push(className);
  el.className = newClass.join(" ");
}

export function getData(el: HTMLElement, name: string, val: any) {
  const prefix = "data-";
  if (val) {
    return el.setAttribute(prefix + name, val);
  }
  return el.getAttribute(prefix + name);
}

const elementStyle = document.createElement("div").style;

const vendor = (() => {
  const transformNames = {
    webkit: "webkitTransform",
    Moz: "MozTransform",
    O: "OTransform",
    ms: "msTransform",
    standard: "transform",
  } as any;

  for (const key in transformNames) {
    if (elementStyle[transformNames[key]] !== undefined) {
      return key;
    }
  }

  return false;
})();

export function prefixStyle(style: string) {
  if (vendor === false) {
    return false;
  }

  if (vendor === "standard") {
    return style;
  }

  return vendor + style.charAt(0).toUpperCase() + style.substr(1);
}
