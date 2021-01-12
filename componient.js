var createNavItem = (function () {
    var NAV_ITEM_TEMPLATE = document.createElement("a");
    NAV_ITEM_TEMPLATE.className = "nav__item";

    var NAV_ITEM_INDENT_STEP = 2;
    var NAV_ITEM_INDENT_UNIT = "em";

    function setSelected(selected) {
        if (selected)
            this.setAttribute("selected", "");
        else
            this.removeAttribute("selected");
    }

    function createNavItem(title, href, level) {
        var element = NAV_ITEM_TEMPLATE.cloneNode(true);
        element.innerHTML = title;
        element.href = href;
        element.style.paddingLeft = (level * NAV_ITEM_INDENT_STEP) + NAV_ITEM_INDENT_UNIT;
        element.setSelected = setSelected;
        return element;
    }

    return createNavItem;
})()