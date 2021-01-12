var ui = {
    article: document.getElementById("article"),
    nav: document.getElementById("nav"),
    navBody: document.getElementById("nav__body"),
    navHandle: document.getElementById("nav__handle"),
    navItems: {}
};

var headers = ui.article.querySelectorAll("h1, h2, h3");
for (var i = 0; i < headers.length; ++i) {
    var header = headers[i];
    var href = "#" + header.id;
    var level = Number(header.tagName[1]) - 1;
    var navItem = createNavItem(header.innerHTML, href, level);

    ui.navBody.appendChild(navItem);
    ui.navItems[href] = navItem;
}

window.addEventListener("hashchange", function (event) {
    var oldHash = getHash(event.oldURL);
    var newHash = getHash(event.newURL);
    var oldSelection, newSelection;
    if (oldHash !== null && (oldSelection = ui.navItems[oldHash]) !== null)
        oldSelection.setSelected(false);
    if (newHash !== null && (newSelection = ui.navItems[newHash]) !== null)
        newSelection.setSelected(true);
})

function getHash(url) {
    var hashIndex = url.indexOf('\#');
    if (hashIndex >= 0)
        return url.substring(hashIndex);
    else
        return null;
}

ui.navHandle.addEventListener("click", function() {
    if (ui.nav.hasAttribute("closed"))
        ui.nav.removeAttribute("closed");
    else
        ui.nav.setAttribute("closed", "");
})



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