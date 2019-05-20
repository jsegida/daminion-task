const _add = DOMTokenList.prototype.add;

DOMTokenList.prototype.add = function add(...classNames) {
    return classNames.forEach(className => _add.call(this, className));
};
