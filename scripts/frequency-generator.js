'use strict';
var DEFAULT_VOLUME = .75
    , FADE_TIME = .5
    , MIN_FREQ = 1
    , MAX_FREQ = 20154
    , MIN_PIANO_KEY = 1
    , MAX_PIANO_KEY = 99
    , FIRST_C = 4
    , NOTE_NAMES = ";A0 Dbl Pedal A;A\u266f0\u2009/\u2009B\u266d0;B0;C1 Pedal C;C\u266f1\u2009/\u2009D\u266d1;D1;D\u266f1\u2009/\u2009E\u266d1;E1;F1;F\u266f1\u2009/\u2009G\u266d1;G1;G\u266f1\u2009/\u2009A\u266d1;A1;A\u266f1\u2009/\u2009B\u266d1;B1;C2 Deep C;C\u266f2\u2009/\u2009D\u266d2;D2;D\u266f2\u2009/\u2009E\u266d2;E2;F2;F\u266f2\u2009/\u2009G\u266d2;G2;G\u266f2\u2009/\u2009A\u266d2;A2;A\u266f2\u2009/\u2009B\u266d2;B2;C3 Tenor C;C\u266f3\u2009/\u2009D\u266d3;D3;D\u266f3\u2009/\u2009E\u266d3;E3;F3;F\u266f3\u2009/\u2009G\u266d3;G3;G\u266f3\u2009/\u2009A\u266d3;A3;A\u266f3\u2009/\u2009B\u266d3;B3;C4 Middle C;C\u266f4\u2009/\u2009D\u266d4;D4;D\u266f4\u2009/\u2009E\u266d4;E4;F4;F\u266f4\u2009/\u2009G\u266d4;G4;G\u266f4\u2009/\u2009A\u266d4;A4;A\u266f4\u2009/\u2009B\u266d4;B4;C5;C\u266f5\u2009/\u2009D\u266d5;D5;D\u266f5\u2009/\u2009E\u266d5;E5;F5;F\u266f5\u2009/\u2009G\u266d5;G5;G\u266f5\u2009/\u2009A\u266d5;A5;A\u266f5\u2009/\u2009B\u266d5;B5;C6 Soprano C;C\u266f6\u2009/\u2009D\u266d6;D6;D\u266f6\u2009/\u2009E\u266d6;E6;F6;F\u266f6\u2009/\u2009G\u266d6;G6;G\u266f6\u2009/\u2009A\u266d6;A6;A\u266f6\u2009/\u2009B\u266d6;B6;C7 Dbl high C;C\u266f7\u2009/\u2009D\u266d7;D7;D\u266f7\u2009/\u2009E\u266d7;E7;F7;F\u266f7\u2009/\u2009G\u266d7;G7;G\u266f7\u2009/\u2009A\u266d7;A7;A\u266f7\u2009/\u2009B\u266d7;B7;C8;C\u266f8\u2009/\u2009D\u266d8;D8;D\u266f8\u2009/\u2009E\u266d8;E8;F8;F\u266f8\u2009/\u2009G\u266d8;G8;G\u266f8\u2009/\u2009A\u266d8;A8;A\u266f8\u2009/\u2009B\u266d8;B8".split(";");
function setCookie(a, b, c, d) {
    c = c ? "; path=" + c : "";
    if (d) {
        var e = new Date;
        e.setTime(e.getTime() + 864E5 * d);
        d = "; expires=" + e.toGMTString()
    } else
        d = "";
    document.cookie = a + "=" + escape(b) + d + c;
    cachedCookies && (cachedCookies[a] = b)
}
function loadCookies() {
    if (window.cachedCookies)
        return !1;
    window.cachedCookies = {};
    if (0 < document.cookie.length)
        for (var a = document.cookie.split("; "), b = 0; b < a.length; b++) {
            var c = a[b].indexOf("=")
                , d = a[b].substring(0, c);
            cachedCookies[d] = unescape(a[b].substring(c + 1))
        }
}
function getCookie(a) {
    return cachedCookies[a] ? cachedCookies[a] : null
}
function deleteCookie(a, b) {
    void 0 === b && (b = "/");
    setCookie(a, "", b, -1);
    delete cachedCookies[a]
}
function writeCookieMessage(a, b) {
    getCookie("cOK") || (window.onCookieConsent = function() {
        document.getElementById("cookie-message").style.display = "none";
        b && b();
        setCookie("cOK", "y", "/", 730, !0)
    }
        ,
        document.write("<div id=cookie-message>This site uses cookies. By using it, you agree to this. <a href='" + a + "'>Learn more</a> <a href='javascript:void(0)' onclick='onCookieConsent()'>Got it</a></div>"))
}
function DocumentClickTracker() {
    var a = this;
    a.mouseDownTarget = null;
    a.touchStartData = {
        id: null,
        target: null
    };
    a.callback = null;
    a.captureEsc = !0;
    a.start = function(b, c, d) {
        if (null !== a.callback)
            throw "Cannot execute DocumentClickTracker.start(): already started.";
        a.captureEsc = void 0 !== d ? d : !0;
        a.callback = b;
        a.ignoredElement = c;
        document.addEventListener("mousedown", a.onMouseDown, !0);
        a.captureEsc && document.addEventListener("keydown", a.onKeyDown, !0);
        void 0 !== document.ontouchstart && (document.addEventListener("touchstart", a.onTouchStart, !0),
            document.addEventListener("touchmove", a.onTouchMove, !0),
            document.addEventListener("touchend", a.onTouchEnd, !0))
    }
    ;
    a.stop = function() {
        null !== a.callback && (a.callback = null,
            document.removeEventListener("mousedown", a.onMouseDown, !0),
        a.captureEsc && document.removeEventListener("keydown", a.onKeyDown, !0),
        void 0 !== document.ontouchstart && (document.removeEventListener("touchstart", a.onTouchStart, !0),
            document.removeEventListener("touchmove", a.onTouchMove, !0),
            document.removeEventListener("touchend", a.onTouchEnd, !0)))
    }
    ;
    a.reset = function() {
        a.mouseDownTarget = null;
        a.touchStartData.id = null
    }
    ;
    a.onMouseDown = function(b) {
        0 !== b.button || a.ignoredElement && a.ignoredElement.contains(b.target) || a.callback(b.target)
    }
    ;
    a.onTouchStart = function(b) {
        1 != b.touches.length || b.altKey || b.shiftKey || b.ctrlKey || b.metaKey ? null !== a.touchStartData.id && (a.touchStartData.id = null) : (a.touchStartData.id = b.changedTouches[0].identifier,
            a.touchStartData.target = b.target)
    }
    ;
    a.onTouchMove = function(b) {
        null !== a.touchStartData.id && 1 == b.changedTouches.length && (a.touchStartData.id = null)
    }
    ;
    a.onTouchEnd = function(b) {
        0 != b.touches.length || b.altKey || b.shiftKey || b.ctrlKey || b.metaKey || b.changedTouches[0].identifier != a.touchStartData.id || a.ignoredElement && a.ignoredElement.contains(b.target) || (a.callback(a.touchStartData.target),
            a.touchStartData.id = null)
    }
    ;
    a.onKeyDown = function(b) {
        27 != b.keyCode || b.shiftKey || b.altKey || b.ctrlKey || b.metaKey || a.callback(document)
    }
}
function getViewportHeight() {
    return window.innerHeight ? window.innerHeight : 0 < document.documentElement.clientHeight ? document.documentElement.clientHeight : 0 < document.body.clientHeight ? document.body.clientHeight : !1
}
function getViewportWidth() {
    return window.innerWidth ? window.innerWidth : 0 < document.documentElement.clientWidth ? document.documentElement.clientWidth : 0 < document.body.clientWidth ? document.body.clientWidth : !1
}
function PlayIndicator(a) {
    var b = this;
    b.div = a;
    b.update = function() {
        b.div.className = tones.playing ? "playing " + window.waveType : "stopped " + window.waveType
    }
}
function onPlayButtonClick() {
    tones.playing ? (window.playButton.innerHTML = "Play",
        tones.stop()) : (window.playButton.innerHTML = "Stop",
        tones.play(window.sliderFreq, window.waveType));
    window.playIndicator.update()
}
function formatNumber(a) {
    a = a.toString().split(".");
    if (1 == a.length)
        return a[0].toLocaleString("en-US", {
            style: "currency",
            useGrouping: !0
        }) + " <small>Hz</small>";
    if (2 == a.length)
        return 2 >= a[1].length ? a[0].toLocaleString("en-US") + "<small>." + a[1] + " Hz</small>" : "<small>~&thinsp;</small>" + a[0].toLocaleString("en-US") + "<small>." + a[1].slice(0, 2) + " Hz</small>"
}
function separateThousands(a) {
    a = a.toString();
    for (var b = "", c = a.length - 1 - 2; 0 < c; c -= 3)
        b = "," + a.substr(c, 3) + b;
    return b = a.slice(0, c + 3) + b
}
function formatHertz(a) {
    a = a.toString().split(".");
    if (1 == a.length)
        return separateThousands(a[0]) + " <small>Hz</small>";
    if (2 == a.length) {
        if (2 >= a[1].length)
            return separateThousands(a[0]) + "<small>." + a[1] + " Hz</small>";
        var b = "5" <= a[1].charAt(2) ? parseInt(a[1].slice(0, 2)) + 1 : a[1].slice(0, 2);
        return "<small>~&thinsp;</small>" + separateThousands(a[0]) + "<small>." + b + " Hz</small>"
    }
}
function setFreq(a) {
    if (a < MIN_FREQ || a > MAX_FREQ)
        return !1;
    if (a == window.sliderFreq)
        return !0;
    window.slider_jq.slider("value", freqToSliderPos(a));
    window.sliderFreq = a;
    window.freqReadout.update();
    updateAriaValue();
    window.noteSelector.updateFromFreq();
    tones.current.setFreq(window.sliderFreq)
}
function setKey(a) {
    if (a < MIN_PIANO_KEY || a > MAX_PIANO_KEY)
        return !1;
    window.sliderFreq = 440 * Math.pow(2, (a - 49) / 12);
    window.slider_jq.slider("value", freqToSliderPos(window.sliderFreq));
    window.freqReadout.update();
    updateAriaValue();
    window.noteSelector.displayKey(a);
    tones.current.setFreq(window.sliderFreq)
}
function setVolume(a) {
    if (0 > a || 1 < a)
        return !1;
    window.volume = a;
    tones.current.setVolume(window.volume);
    $(window.volSlider).slider("value", 100 * a);
    $("#volume-readout").html(formatPercent(window.volume))
}
function setWaveType(a) {
    window.waveType = a;
    window.waveSelector.update();
    tones.playing && window.playIndicator.update();
    tones.current.setType(a)
}
function setBalance(a, b) {
    void 0 === b && (b = !0);
    if (-1 > a || 1 < a)
        return !1;
    window.balance = a;
    tones.current.setBalance(a);
    window.balanceControl.update(b)
}
function moveSliderBy(a) {
    a = window.slider_jq.slider("value") + a;
    window.slider_jq.slider("option", "value", a);
    window.sliderFreq = sliderPosToFreq(a);
    window.freqReadout.update();
    updateAriaValue();
    window.noteSelector.updateFromFreq();
    tones.current.setFreq(window.sliderFreq)
}
function formatPercent(a) {
    return Math.round(100 * a).toString() + "%"
}
function sliderPosToFreq(a) {
    return Math.round(20 * Math.pow(1.0025, a) - 19)
}
function freqToSliderPos(a) {
    return Math.round(Math.log((a + 19) / 20) / Math.log(1.0025))
}
function changeFreqBy1Hz(a) {
    1 == a ? window.setFreq(Math.floor(window.sliderFreq) + a) : -1 == a && window.setFreq(Math.ceil(window.sliderFreq) + a)
}
function changeFreqByHundredthHz(a) {
    1 == a ? window.setFreq((Math.floor(100 * (window.sliderFreq + 1E-7)) + a) / 100) : -1 == a && window.setFreq((Math.ceil(100 * (window.sliderFreq - 1E-7)) + a) / 100)
}
function changeFreqByThousandthHz(a) {
    1 == a ? window.setFreq((Math.floor(1E3 * (window.sliderFreq + 1E-7)) + a) / 1E3) : -1 == a && window.setFreq((Math.ceil(1E3 * (window.sliderFreq - 1E-7)) + a) / 1E3)
}
var getLinkWindow = {
    WIDTH: 450,
    button: null,
    div: null,
    input: null,
    windowHeight: 0,
    tracker: null,
    prepare: function() {
        getLinkWindow.div = document.createElement("div");
        getLinkWindow.div.id = "get-link-window";
        getLinkWindow.div.style.position = "fixed";
        getLinkWindow.div.style.visibility = "hidden";
        getLinkWindow.div.style.opacity = "0";
        getLinkWindow.div.style.width = getLinkWindow.WIDTH + "px";
        getLinkWindow.div.innerHTML = "<div class=desc>This URL goes straight to the current tone:</div>";
        getLinkWindow.box = document.createElement("div");
        getLinkWindow.box.className = "box";
        getLinkWindow.div.appendChild(getLinkWindow.box);
        var a = document.createElement("div");
        a.className = "message";
        a.appendChild(document.createTextNode("Esc or click outside window to close"));
        getLinkWindow.div.appendChild(a);
        document.body.appendChild(getLinkWindow.div);
        a = getLinkWindow.div.getBoundingClientRect();
        getLinkWindow.height = a.bottom - a.top
    },
    show: function(a) {
        null == getLinkWindow.div && getLinkWindow.prepare();
        getLinkWindow.button = a;
        getLinkWindow.button.classList.add("window-shown");
        getLinkWindow.box.innerHTML = getLinkWindow.getShortURL();
        a = getViewportHeight();
        var b = getViewportWidth();
        getLinkWindow.div.style.left = (0 < b - getLinkWindow.WIDTH ? Math.round((b - getLinkWindow.WIDTH) / 2) : 0) + "px";
        getLinkWindow.div.style.top = (0 < a - getLinkWindow.height ? Math.round((a - getLinkWindow.height) / 2) : 0) + "px";
        getLinkWindow.div.style.transition = "opacity 0.1s linear";
        getLinkWindow.div.style.visibility = "";
        getLinkWindow.div.style.opacity = "";
        a = new Range;
        a.selectNodeContents(getLinkWindow.box);
        b = window.getSelection();
        b.removeAllRanges();
        b.addRange(a);
        getLinkWindow.tracker = new DocumentClickTracker;
        getLinkWindow.tracker.start(getLinkWindow.hide, getLinkWindow.div);
        adUnits.disable()
    },
    hide: function(a) {
        getLinkWindow.div && (getLinkWindow.button.classList.remove("window-shown"),
            getLinkWindow.tracker.stop(),
            getLinkWindow.div.style.transition = "opacity 0.1s linear, visibility 0s linear 0.1s",
            getLinkWindow.div.style.opacity = "0",
            getLinkWindow.div.style.visibility = "hidden",
            adUnits.enable())
    },
    getShortURL: function() {
        var a = "www." == window.location.hostname.slice(0, 4) ? window.location.hostname.slice(4) : window.location.hostname;
        return window.location.protocol + "//" + a + "/tone#" + constructHash()
    }
};
function FrequencyReadout(a) {
    var b = this, c = document.querySelector(a), d, e;
    if (!c)
        throw "Cannot find element " + a;
    a = document.createElement("small");
    var g = document.createTextNode("")
        , f = document.createTextNode("")
        , h = document.createTextNode("")
        , k = document.createElement("small")
        , n = document.createTextNode(" Hz");
    a.appendChild(g);
    k.appendChild(h);
    k.appendChild(n);
    c.appendChild(a);
    c.appendChild(f);
    c.appendChild(k);
    b.tildeOn = !1;
    b.fractionOn = !1;
    b.update = function(a) {
        a || (a = 3);
        var c = Math.floor(window.sliderFreq);
        0 < window.sliderFreq - c ? window.sliderFreq.toString().length <= c.toString().length + a + 1 ? (a = c.toString(),
            f.nodeValue = separateThousands(a),
            h.nodeValue = window.sliderFreq.toString().slice(a.length),
            b.fractionOn = !0,
            g.nodeValue = "") : (c = Math.round(window.sliderFreq * Math.pow(10, a)) / Math.pow(10, a),
            f.nodeValue = separateThousands(Math.floor(c).toString()),
            h.nodeValue = c.toFixed(a).slice(-(a + 1)),
            b.fractionOn = !0,
            g.nodeValue = "~\u2009",
            b.tildeOn = !0) : (f.nodeValue = separateThousands(c.toString()),
        b.fractionOn && (h.nodeValue = ""),
        b.tildeOn && (g.nodeValue = ""))
    }
    ;
    var l = function() {
        isNaN(parseFloat(d.value)) || window.setFreq(parseFloat(d.value))
    }
        , p = function(a) {
        isNaN(parseFloat(d.value)) || window.setFreq(parseFloat(d.value));
        b.closeEdit()
    }
        , m = function(a) {
        if (!(a.shiftKey || a.ctrlKey || a.altKey || a.metaKey))
            switch (a.keyCode) {
                case 13:
                    b.edit(),
                        a.stopPropagation(),
                        a.preventDefault()
            }
    }
        , q = function(a) {
        l();
        b.closeEdit()
    }
        , r = function(a) {
        if (!(a.shiftKey || a.ctrlKey || a.altKey || a.metaKey))
            switch (a.keyCode) {
                case 13:
                    l();
                    break;
                case 27:
                    b.closeEdit()
            }
    };
    b.edit = function() {
        d && b.destroyEdit();
        c.classList.add("editing");
        d = document.createElement("input");
        d.type = "text";
        d.value = window.sliderFreq.toString();
        c.onclick = null;
        c.removeEventListener("keydown", m, !0);
        c.appendChild(d);
        d.onchange = l;
        d.onkeydown = r;
        d.onblur = q;
        d.style.opacity = "0";
        d.style.transition = "opacity 0.1s linear";
        d.tabIndex = c.tabIndex;
        c.tabIndex = "";
        d.focus();
        d.style.opacity = "1";
        e = new DocumentClickTracker;
        e.start(p, c, !1)
    }
    ;
    b.closeEdit = function() {
        if (!d)
            return !1;
        c.tabIndex = d.tabIndex;
        d.style.opacity = "0";
        d.addEventListener("transitionend", function(a) {
            "opacity" == a.propertyName && b.destroyEdit()
        })
    }
    ;
    b.destroyEdit = function() {
        if (!d)
            return !1;
        c.classList.remove("editing");
        c.removeChild(d);
        d = null;
        c.onclick = b.edit;
        c.addEventListener("keydown", m, !0);
        c.focus();
        e.stop()
    }
    ;
    c.onclick = b.edit;
    c.addEventListener("keydown", m, !0)
}
function Dialog(a, b, c) {
    var d = this;
    d.div = document.createElement("div");
    d.div.id = a;
    a = d.div.style;
    a.position = "fixed";
    a.visibility = "hidden";
    a.opacity = "0";
    var e = document.createElement("button");
    e.className = "close-button";
    e.appendChild(document.createTextNode("\u00d7"));
    d.div.appendChild(e);
    d.div.appendChild(b);
    document.body.appendChild(d.div);
    a.transition = "opacity 0.1s linear";
    a.visibility = "";
    a.opacity = "";
    d.callback = c;
    adUnits.disable();
    d.hide = function() {
        if (!d.div)
            return !1;
        d.div.addEventListener("transitionend", function(a) {
            "opacity" == a.propertyName && d.destroy()
        });
        d.div.style.transition = "opacity 0.1s linear, visibility 0s linear 0.1s";
        d.div.style.opacity = "0";
        d.div.style.visibility = "hidden";
        adUnits.enable();
        d.callback(Dialog.DIALOG_CLOSE)
    }
    ;
    d.destroy = function() {
        document.body.removeChild(d.div);
        d.div = null
    }
    ;
    e.onclick = d.hide
}
Dialog.DIALOG_CLOSE = 0;
var noteSelectorWindow = {
    panel: null,
    dialog: null,
    selectedButton: null,
    buttonArray: [],
    callback4NoteSelect: null,
    callback4WindowClose: null,
    prepare: function() {
        var a = document.createElement("table")
            , b = 1 < FIRST_C ? FIRST_C - 12 : 1
            , c = FIRST_C - 12;
        do {
            var d = document.createElement("tr");
            c += 12;
            for (b; b < c && b <= MAX_PIANO_KEY; b++) {
                var e = document.createElement("td")
                    , g = (b - FIRST_C + 12) % 12;
                if (1 == g || 3 == g || 6 == g || 8 == g || 10 == g)
                    e.className = "halftone";
                1 <= b && e.appendChild(noteSelectorWindow.createButton(b));
                d.appendChild(e)
            }
            a.appendChild(d)
        } while (b <= MAX_PIANO_KEY);
        noteSelectorWindow.panel = a
    },
    createButton: function(a) {
        var b = document.createElement("button")
            , c = 440 * Math.pow(2, (a - 49) / 12);
        b.value = a;
        var d = NOTE_NAMES[a].indexOf(" ")
            , e = NOTE_NAMES[a].indexOf("\u2009/");
        -1 == d && (d = NOTE_NAMES[a].length);
        -1 == e && (e = NOTE_NAMES[a].length);
        d = NOTE_NAMES[a].slice(0, Math.min(d, e));
        c = (c !== Math.floor(c) ? "~" : "") + c.toFixed(0);
        b.innerHTML = d + "<small>" + c + "</small>";
        b.title = NOTE_NAMES[a] + " (" + c + " Hz)";
        b.onclick = noteSelectorWindow.onButtonClick;
        return this.buttonArray[a] = b
    },
    onButtonClick: function(a) {
        noteSelectorWindow.selectedButton && noteSelectorWindow.selectedButton.classList.remove("selected");
        this.classList.add("selected");
        noteSelectorWindow.selectedButton = this;
        noteSelectorWindow.callback4NoteSelect(this.value)
    },
    onDialogOutput: function(a) {
        a === Dialog.DIALOG_CLOSE && noteSelectorWindow.callback4WindowClose()
    },
    show: function(a, b) {
        null == noteSelectorWindow.panel && noteSelectorWindow.prepare();
        noteSelectorWindow.dialog && noteSelectorWindow.dialog.hide();
        noteSelectorWindow.dialog = new Dialog("note-selector-panel",noteSelectorWindow.panel,noteSelectorWindow.onDialogOutput);
        noteSelectorWindow.callback4NoteSelect = a;
        noteSelectorWindow.callback4WindowClose = b;
        noteSelectorWindow.panel.querySelector("button").focus()
    },
    highlightButton: function(a) {
        noteSelectorWindow.selectedButton && noteSelectorWindow.selectedButton.classList.remove("selected");
        -1 != a && (a = noteSelectorWindow.buttonArray[a]) && (a.classList.add("selected"),
            noteSelectorWindow.selectedButton = a)
    }
};
function NoteSelector(a, b) {
    var c = this;
    c.button = a;
    c.windowShown = !1;
    c.tilde = document.createTextNode("");
    c.button.appendChild(c.tilde);
    c.buttonText = document.createTextNode("");
    c.button.appendChild(c.buttonText);
    c.button.onclick = function(a) {
        noteSelectorWindow.show(b, function() {
            c.windowShown = !1;
            c.button.classList.remove("window-shown")
        });
        c.windowShown = !0;
        c.button.classList.add("window-shown");
        c.updateFromFreq()
    }
    ;
    c.updateFromFreq = function() {
        var a = 12 * Math.log2(window.sliderFreq / 440) + 49
            , b = Math.round(a);
        b < MIN_PIANO_KEY ? (c.buttonText.nodeValue = "below A0",
            c.tilde.nodeValue = "") : b > MAX_PIANO_KEY ? (c.buttonText.nodeValue = "above " + NOTE_NAMES[MAX_PIANO_KEY],
            c.tilde.nodeValue = "") : (c.buttonText.nodeValue = window.NOTE_NAMES[b],
            c.tilde.nodeValue = a == b ? "" : "~ ",
        c.windowShown && noteSelectorWindow.highlightButton(a == b ? a : -1))
    }
    ;
    c.displayKey = function(a) {
        c.buttonText.nodeValue = window.NOTE_NAMES[a];
        c.tilde.nodeValue = ""
    }
}
function DropDown() {
    var a = this;
    a.show = function(b, c, d, e) {
        a.div && a.destroy();
        a.srcElement = d;
        a.div = document.createElement("div");
        a.div.className = "drop-down-menu";
        a.div.id = b;
        b = document.createElement("div");
        b.className = "tail";
        a.div.appendChild(b);
        var g = d.getBoundingClientRect();
        d = Math.round((g.left + g.right) / 2);
        var f = a.div.style;
        f.position = "fixed";
        f.visibility = "hidden";
        f.opacity = "0";
        document.body.appendChild(a.div);
        a.div.appendChild(c);
        var h = a.div.getBoundingClientRect()
            , k = getViewportWidth();
        c = Math.round((g.left + g.right - h.width) / 2);
        5 > c && (c = 5);
        c + h.width > k - 20 && (c = k - h.width - 20);
        g = Math.round(g.bottom + 25);
        f.left = c + "px";
        f.top = g + "px";
        b.style.left = d - c + "px";
        f.transition = "opacity 0.1s linear";
        f.visibility = "";
        f.opacity = "";
        a.callback = e;
        a.tracker = new DocumentClickTracker;
        a.tracker.start(a.onDocumentClick, a.div);
        adUnits.disable()
    }
    ;
    a.onDocumentClick = function(b) {
        a.hide()
    }
    ;
    a.hide = function() {
        if (!a.div)
            return !1;
        a.tracker.stop();
        a.srcElement.focus();
        a.div.addEventListener("transitionend", function(b) {
            "opacity" == b.propertyName && a.destroy()
        });
        a.div.style.transition = "opacity 0.1s linear, visibility 0s linear 0.1s";
        a.div.style.opacity = "0";
        a.div.style.visibility = "hidden";
        adUnits.enable();
        a.callback(DropDown.DROPDOWN_CLOSE)
    }
    ;
    a.destroy = function() {
        document.body.removeChild(a.div);
        a.div = null;
        a.callback = null;
        a.tracker.stop()
    }
}
DropDown.DROPDOWN_CLOSE = {};
var dropDownMenu = {
    dropDown: null,
    selectedButton: null,
    show: function(a, b, c, d, e) {
        for (var g = document.createDocumentFragment(), f = 0; f < b.length; f++) {
            var h = b[f];
            h.onclick = dropDownMenu.onOptionClick;
            h.value == c && (h.classList.add("selected"),
                dropDownMenu.selectedButton = h);
            g.appendChild(h)
        }
        dropDownMenu.dropDown = new DropDown;
        dropDownMenu.dropDown.show(a, g, d, e);
        dropDownMenu.dropDown.div.querySelector("button").focus()
    },
    onOptionClick: function(a) {
        dropDownMenu.selectedButton && dropDownMenu.selectedButton.classList.remove("selected");
        this.classList.add("selected");
        dropDownMenu.selectedButton = this;
        dropDownMenu.dropDown.callback(this.value)
    }
};
function WaveSelector(a, b) {
    var c = this;
    c.value = "";
    c.button = a;
    c.menuShown = !1;
    var d = document.createElement("span");
    d.className = "image-" + c.value;
    c.button.appendChild(d);
    var e = [];
    a = document.createElement("button");
    a.value = "sine";
    a.tabIndex = c.button.tabIndex + 1;
    var g = document.createElement("span");
    g.className = "image-" + a.value;
    a.appendChild(g);
    a.appendChild(document.createTextNode("sine"));
    e.push(a);
    a = document.createElement("button");
    a.value = "square";
    a.tabIndex = c.button.tabIndex + 2;
    g = document.createElement("span");
    g.className = "image-" + a.value;
    a.appendChild(g);
    a.appendChild(document.createTextNode("square"));
    e.push(a);
    a = document.createElement("button");
    a.value = "triangle";
    a.tabIndex = c.button.tabIndex + 3;
    g = document.createElement("span");
    g.className = "image-" + a.value;
    a.appendChild(g);
    a.appendChild(document.createTextNode("triangle"));
    e.push(a);
    a = document.createElement("button");
    a.value = "sawtooth";
    a.tabIndex = c.button.tabIndex + 4;
    g = document.createElement("span");
    g.className = "image-" + a.value;
    a.appendChild(g);
    a.appendChild(document.createTextNode("sawtooth"));
    e.push(a);
    c.onMenuOutput = function(a) {
        a === DropDown.DROPDOWN_CLOSE ? (c.button.classList.remove("control-shown"),
            c.menuShown = !1) : b(a)
    }
    ;
    c.update = function() {
        c.value = window.waveType;
        d.className = "image-" + c.value
    }
    ;
    c.button.onclick = function(a) {
        if (c.menuShown)
            return !1;
        dropDownMenu.show("wave-selector-menu", e, c.value, this, c.onMenuOutput);
        c.button.classList.add("control-shown");
        c.menuShown = !0
    }
}
function BalanceControl(a, b) {
    var c = this;
    c.sliderContainer = null;
    c.readoutLeftVal = c.readoutRightVal = null;
    c.button = a;
    c.shown = !1;
    c.LspeakerIcon = document.getElementById("balance-control-L-speaker-icon");
    c.RspeakerIcon = document.getElementById("balance-control-R-speaker-icon");
    c.onDropDownAction = function(a) {
        a === DropDown.DROPDOWN_CLOSE ? (c.button.classList.remove("control-shown"),
            c.shown = !1) : b(a)
    }
    ;
    c.update = function(a) {
        void 0 === a && (a = !0);
        var b = Math.min(1, 1 - window.balance)
            , d = Math.min(1, 1 + window.balance);
        c.LspeakerIcon && (c.LspeakerIcon.style.opacity = Math.round(100 * b) / 100);
        c.RspeakerIcon && (c.RspeakerIcon.style.opacity = Math.round(100 * d) / 100);
        c.shown && (c.readoutLeftVal.nodeValue = Math.round(100 * b) + "%",
            c.readoutRightVal.nodeValue = Math.round(100 * d) + "%",
        a && $(c.sliderContainer).slider("value", window.balance))
    }
    ;
    c.button.onclick = function(a) {
        if (c.shown)
            return !1;
        a = document.createDocumentFragment();
        var b = document.createElement("div");
        b.className = "balance-button-section";
        var d = document.createElement("button");
        d.className = "small-button";
        var f = d.cloneNode(!0)
            , h = d.cloneNode(!0);
        d.innerHTML = "L";
        d.value = "L";
        d.title = "Left";
        d.tabIndex = c.button.tabIndex + 1;
        f.innerHTML = "C";
        f.value = "C";
        f.title = "Center";
        f.tabIndex = c.button.tabIndex + 2;
        h.innerHTML = "R";
        h.value = "R";
        h.title = "Right";
        h.tabIndex = c.button.tabIndex + 3;
        d.onclick = f.onclick = h.onclick = c.onLCRButtonClick;
        b.appendChild(d);
        b.appendChild(f);
        b.appendChild(h);
        a.appendChild(b);
        b = document.createElementNS("http://www.w3.org/2000/svg", "svg");
        b.setAttribute("class", "speaker-icon");
        b.id = "left-speaker-icon";
        d = document.createElementNS("http://www.w3.org/2000/svg", "use");
        d.setAttributeNS("http://www.w3.org/1999/xlink", "href", "#svg-Lspeaker-icon");
        b.appendChild(d);
        a.appendChild(b);
        c.sliderContainer = document.createElement("span");
        c.sliderContainer.className = "balance-slider";
        a.appendChild(c.sliderContainer);
        b = document.createElementNS("http://www.w3.org/2000/svg", "svg");
        b.setAttribute("class", "speaker-icon");
        b.id = "right-speaker-icon";
        d = document.createElementNS("http://www.w3.org/2000/svg", "use");
        d.setAttributeNS("http://www.w3.org/1999/xlink", "href", "#svg-Rspeaker-icon");
        b.appendChild(d);
        a.appendChild(b);
        b = document.createElement("div");
        b.className = "balance-readout";
        d = document.createElement("div");
        f = document.createElement("span");
        c.readoutLeftVal = document.createTextNode("");
        f.appendChild(c.readoutLeftVal);
        d.appendChild(document.createTextNode("L: "));
        d.appendChild(f);
        f = document.createElement("div");
        h = document.createElement("span");
        c.readoutRightVal = document.createTextNode("");
        h.appendChild(c.readoutRightVal);
        f.appendChild(document.createTextNode("R: "));
        f.appendChild(h);
        b.appendChild(d);
        b.appendChild(f);
        a.appendChild(b);
        $(c.sliderContainer).slider({
            orientation: "horizontal",
            range: "min",
            min: -1,
            max: 1,
            value: 0,
            step: .01,
            slide: function(a, b) {
                window.setBalance(b.value, !1)
            },
            stop: function(a, b) {}
        });
        c.sliderContainer.querySelector(".ui-slider-handle").tabIndex = c.button.tabIndex + 4;
        c.shown = !0;
        c.update();
        c.dropDown = new DropDown;
        c.dropDown.show("balance-control-popup", a, this, c.onDropDownAction);
        c.dropDown.div.querySelector("button").focus();
        c.button.classList.add("control-shown")
    }
    ;
    c.onLCRButtonClick = function(a) {
        switch (a.target.value) {
            case "L":
                window.setBalance(-1);
                break;
            case "C":
                window.setBalance(0);
                break;
            case "R":
                window.setBalance(1)
        }
    }
}
function handleKeyDown(a) {
    if (!a.altKey && !a.metaKey)
        switch (a.keyCode) {
            case 37:
                if (a.target != document.body && "BUTTON" != a.target.nodeName && a.target.parentNode != window.slider)
                    break;
                a.preventDefault();
                a.stopPropagation();
                a.shiftKey ? a.ctrlKey ? window.changeFreqByThousandthHz(-1) : window.changeFreqBy1Hz(-1) : a.ctrlKey ? window.changeFreqByHundredthHz(-1) : window.moveSliderBy(-1);
                break;
            case 39:
                if (a.target != document.body && "BUTTON" != a.target.nodeName && a.target.parentNode != window.slider)
                    break;
                a.preventDefault();
                a.stopPropagation();
                a.shiftKey ? a.ctrlKey ? window.changeFreqByThousandthHz(1) : window.changeFreqBy1Hz(1) : a.ctrlKey ? window.changeFreqByHundredthHz(1) : window.moveSliderBy(1);
                break;
            case 32:
                a.preventDefault(),
                    onPlayButtonClick()
        }
}
function blockSpaceKeyUp(a) {
    a.ctrlKey || a.altKey || a.metaKey || 32 != a.keyCode || (a.preventDefault(),
        a.stopPropagation())
}
function UpDownButton(a, b) {
    this.button = document.getElementById(a);
    if (!this.button)
        return !1;
    this.intervalID = this.timeoutID = null;
    this.action = b;
    var c = this;
    this.startRepeatPress = function() {
        c.action();
        c.intervalID = setInterval(c.action, 80)
    }
    ;
    this.button.onmousedown = function(a) {
        c.timeoutID || c.intervalID || (c.action(),
            c.timeoutID = setTimeout(c.startRepeatPress, 500),
            window.addEventListener("mouseup", c.onMouseUp, !0))
    }
    ;
    this.onMouseUp = function(a) {
        c.timeoutID && (clearTimeout(c.timeoutID),
            c.timeoutID = null);
        c.intervalID && (clearInterval(c.intervalID),
            c.intervalID = null);
        window.removeEventListener("mouseup", c.onMouseUp)
    }
    ;
    this.button.ontouchstart = function(a) {
        c.timeoutID || c.intervalID || (a.preventDefault(),
            c.action(),
            c.timeoutID = setTimeout(c.startRepeatPress, 500))
    }
    ;
    this.button.ontouchend = function(a) {
        c.timeoutID && (clearTimeout(c.timeoutID),
            c.timeoutID = null);
        c.intervalID && (clearInterval(c.intervalID),
            c.intervalID = null);
        a.preventDefault()
    }
    ;
    this.button.onkeydown = function(a) {
        if (!(c.timeoutID || c.intervalID || a.shiftKey || a.ctrlKey || a.altKey || a.metaKey))
            switch (a.keyCode) {
                case 13:
                    c.action(),
                        a.preventDefault(),
                        a.stopPropagation()
            }
    }
}
function AdUnit(a, b, c) {
    var d = this
        , e = document.getElementById(a);
    if (!e)
        return !1;
    var g = e.querySelector("ins");
    if (!g)
        return !1;
    var f;
    d.id = a;
    d.size = b;
    d.removed = !1;
    d.blocked = !1;
    d.disable = function() {
        d.removed || d.blocked || (f ? f.style.visibility = "visible" : (f = document.createElement("div"),
            f.className = "ad-banner-blocker",
            f.style.visibility = "visible",
            f.addEventListener("touchend", function(a) {
                a.preventDefault()
            }, !1),
            g.appendChild(f)))
    }
    ;
    d.enable = function() {
        d.removed || d.blocked || !f || (f.style.visibility = "hidden")
    }
    ;
    d.remove = function(a) {
        function b(a) {
            if ("opacity" == a.propertyName) {
                h.style.display = "block";
                e.style.height = Math.round(e.getBoundingClientRect().height) + "px";
                a = h.getBoundingClientRect().height;
                for (var c = e.childNodes.length - 1; 0 <= c; c--)
                    e.childNodes[c] !== h && e.removeChild(e.childNodes[c]);
                e.removeEventListener("transitionend", b, !1);
                e.addEventListener("transitionend", f, !1);
                e.style.transition = "opacity 0.3s linear, height 0.3s linear";
                e.style.height = Math.ceil(a) + "px";
                e.style.opacity = ""
            }
        }
        function f(a) {
            "height" == a.propertyName && (e.classList.add("removed"),
            c && c(),
                e.removeEventListener("transitionend", f, !1))
        }
        d.removed = !0;
        ga("send", "event", "ad-banner", "remove", d.id + (void 0 === d.size ? "" : "-" + d.size));
        var g = d.id.lastIndexOf("-");
        void 0 !== a && (g = -1 < g ? d.id.slice(0, g) : d.id,
            setCookie("ab-" + escape(g), "y", "", a, !0));
        var h = e.querySelector(".ad-banner-remove-msg");
        e.addEventListener("transitionend", b, !1);
        e.style.transition = "opacity 0.2s linear";
        e.style.opacity = "0"
    }
    ;
    d.reactToAdBlock = function() {
        if (!d.blocked) {
            d.blocked = !0;
            e.classList.add("blocked");
            var a = e.querySelector(".ad-banner-adblock-msg");
            a && (a.style.display = "block");
            e.style.height = "auto";
            if (a = e.querySelector(".remove-ad-link"))
                a.style.visibility = "hidden";
            c && c()
        }
    }
}
var adUnits = {
    map: {},
    add: function(a, b, c) {
        if (this.map.hasOwnProperty(a))
            throw "An ad unit with this id is already present";
        this.map[a] = new AdUnit(a,b,c && "function" == typeof c ? c : void 0)
    },
    getUnit: function(a) {
        return this.map[a]
    },
    disable: function() {
        for (var a in this.map)
            this.map[a].disable()
    },
    enable: function() {
        for (var a in this.map)
            this.map[a].enable()
    },
    checkIfAdsensePresent: function() {
        if (!window.adsbygoogle)
            for (var a in this.map)
                this.map[a].reactToAdBlock()
    },
    checkIfAdsLoaded: function() {
        if (!window.adsbygoogle || !adsbygoogle.loaded)
            for (var a in this.map)
                this.map[a].reactToAdBlock()
    }
};
function parseHash(a) {
    var b, c, d;
    if ("" != a) {
        a = a.split(",");
        for (let h of a)
            if (/^\d+\.?\d*$/.test(h) && void 0 === e && void 0 === g)
                var e = parseFloat(h);
            else if (/^[A-G]s?\d$/.test(h) && void 0 === g && void 0 === e) {
                h = h.replace("s", "\u266f");
                var g = NOTE_NAMES.findIndex(function(a) {
                    return h == a.substr(0, h.length)
                })
            } else if (void 0 === f && (d = /^(squ|saw|tri|sin)/.exec(h)))
                switch (d[0]) {
                    case "squ":
                        var f = "square";
                        break;
                    case "saw":
                        f = "sawtooth";
                        break;
                    case "tri":
                        f = "triangle";
                        break;
                    case "sin":
                        f = "sine"
                }
            else
                void 0 === b && /^v\d\.?\d*$/.test(h) ? b = parseFloat(h.substr(1)) : void 0 === c && /^b-?\d\.?\d*$/.test(h) && (c = parseFloat(h.substr(1)))
    }
    if (void 0 === e)
        e = void 0 !== g && -1 != g ? 440 * Math.pow(2, (g - 49) / 12) : 440;
    else if (e < MIN_FREQ || e > MAX_FREQ)
        e = 440;
    void 0 === f && (f = "sine");
    if (void 0 === b || 0 > b || 1 < b)
        b = DEFAULT_VOLUME;
    if (void 0 === c || -1 > c || 1 < c)
        c = 0;
    return {
        freq: e,
        type: f,
        vol: b,
        bal: c
    }
}
function constructHash() {
    var a = 12 * Math.log2(window.sliderFreq / 440) + 49;
    0 == a % 1 && a >= MIN_PIANO_KEY && a <= MAX_PIANO_KEY ? (a = /^\w\u266f?\d/.exec(NOTE_NAMES[a]),
        a = null !== a ? a[0].replace("\u266f", "s") : window.sliderFreq) : a = window.sliderFreq;
    "sine" != window.waveType && (a += "," + window.waveType.slice(0, 3));
    a += ",v" + window.volume;
    0 != window.balance && (a += ",b" + window.balance);
    return a
}
function setTonePropertiesFromHash(a) {
    a = a ? parseHash(a) : parseHash(window.location.hash.substr(1));
    window.setFreq(a.freq);
    window.setWaveType(a.type);
    window.setVolume(a.vol);
    window.setBalance(a.bal)
}
function Tone(a) {
    var b = this;
    b.playing = !1;
    b.volume = 1;
    b.balance = 0;
    b.freq = 440;
    b.type = "sine";
    b.lastVolRampData = {
        startTime: null,
        startVal: null,
        endVal: null
    };
    b.oscillator = b.gainNode = b.fadeGainNode = b.mergerNode = b.leftGainNode = b.rightGainNode = null;
    b.oscillatorStopTimeoutID = null;
    b.init = function(c, d, e, g) {
        b.gainNode = a.createGain();
        b.fadeGainNode = a.createGain();
        b.mergerNode = a.createChannelMerger(2);
        b.leftGainNode = a.createGain();
        b.rightGainNode = a.createGain();
        b.leftGainNode.connect(b.mergerNode, 0, 0);
        b.rightGainNode.connect(b.mergerNode, 0, 1);
        b.mergerNode.connect(b.gainNode);
        b.gainNode.connect(b.fadeGainNode);
        b.fadeGainNode.connect(a.destination);
        b.freq = c || 440;
        b.type = d || "sine";
        b.volume = e || 1;
        b.balance = g || 0;
        b.leftGainNode.gain.value = Math.min(1, 1 - b.balance);
        b.rightGainNode.gain.value = Math.min(1, 1 + b.balance);
        b.gainNode.gain.value = b.volume;
        b.fadeGainNode.gain.value = 0
    }
    ;
    b.play = function(c) {
        void 0 === c && (c = tones.context.currentTime);
        if (b.oscillatorStopTimeoutID)
            clearTimeout(b.oscillatorStopTimeoutID);
        else {
            if (b.playing)
                return !1;
            b.oscillator = a.createOscillator();
            b.oscillator.connect(b.leftGainNode);
            b.oscillator.connect(b.rightGainNode);
            b.oscillator.frequency.value = b.freq;
            b.oscillator.type = b.type;
            b.oscillator.start(c)
        }
        b.fadeGainNode.gain.setTargetAtTime(1, c, tones.SET_TARGET_TIME_CONSTANT);
        b.playing = !0
    }
    ;
    b.stop = function(c) {
        if (!b.playing)
            return !1;
        void 0 === c && (c = tones.context.currentTime);
        b.fadeGainNode.gain.setTargetAtTime(0, c, tones.SET_TARGET_TIME_CONSTANT);
        b.oscillatorStopTimeoutID = setTimeout(function() {
            b.oscillator.stop();
            b.oscillatorStopTimeoutID = null;
            b.playing = !1
        }, 1E3 * (c - a.currentTime + 8 * tones.SET_TARGET_TIME_CONSTANT))
    }
    ;
    b.setFreq = function(c) {
        b.freq = c;
        b.playing && b.oscillator.frequency.setTargetAtTime(c, a.currentTime, .03)
    }
    ;
    b.setType = function(a) {
        b.type = a;
        b.playing && (b.oscillator.type = a)
    }
    ;
    b.setBalance = function(c) {
        b.balance = c;
        b.playing ? (b.leftGainNode.gain.setTargetAtTime(Math.min(1, 1 - c), a.currentTime, tones.SET_TARGET_TIME_CONSTANT),
            b.rightGainNode.gain.setTargetAtTime(Math.min(1, 1 + c), a.currentTime, tones.SET_TARGET_TIME_CONSTANT)) : (b.leftGainNode.gain.setValueAtTime(Math.min(1, 1 - c), a.currentTime),
            b.rightGainNode.gain.setValueAtTime(Math.min(1, 1 + c), a.currentTime))
    }
    ;
    b.setVolume = function(c) {
        b.playing ? b.gainNode.gain.setTargetAtTime(c, a.currentTime, tones.SET_TARGET_TIME_CONSTANT) : b.gainNode.gain.setValueAtTime(c, a.currentTime);
        b.volume = c
    }
}
var tones = {
    array: [],
    current: null,
    playing: !1,
    CAN_RELY_ON_GAIN_VALUE: !0,
    SET_TARGET_TIME_CONSTANT: .05,
    init: function() {
        if (window.AudioContext)
            tones.context = new AudioContext;
        else if (window.webkitAudioContext)
            tones.context = new webkitAudioContext;
        else
            throw "Cannot initialize AudioContext";
    },
    add: function() {
        tones.current = new Tone(tones.context);
        tones.current.init();
        tones.array.push(tones.current)
    },
    remove: function(a) {
        if (!tones.array[a])
            return !1;
        for (a += 1; a < tones.array[length]; a++)
            tones.array[a - 1] = tones.array[a];
        --tones.array.length
    },
    select: function(a) {
        if (!tones.array[a])
            return !1;
        tones.current = tones.array[a]
    },
    play: function() {
        tones.playing = !0;
        "suspended" == tones.context.state && tones.context.resume();
        for (var a = 0; a < tones.array.length; a++)
            tones.array[a].play(tones.context.currentTime + .1)
    },
    stop: function() {
        tones.playing = !1;
        for (var a = 0; a < tones.array.length; a++)
            tones.array[a].stop(tones.context.currentTime + .1)
    }
};
function updateAriaValue() {
    window.sliderHandle.setAttribute("aria-valuenow", window.sliderFreq)
}
document.addEventListener ? document.addEventListener("DOMContentLoaded", init, !1) : window.onload = init;
window.addEventListener("load", onLoad, !1);
loadCookies();
function init() {
    if ((window.AudioContext === undefined && window.webkitAudioContext === undefined) || Math.log2 === undefined) {
        var a = document.createElement("div");
        a.id = "browser-warning";
        a.innerHTML = "The Online Tone Generator won\u2019t work because your browser does not fully support the Web Audio API. You can use the Online Tone Generator if you install a recent version of Firefox, Chrome or Safari.";
        document.body.appendChild(a)
    }
    document.addEventListener("keydown", handleKeyDown, !0);
    window.slider = document.getElementById("slider");
    window.volSlider = document.getElementById("volume-slider");
    $("#slider").slider({
        orientation: "horizontal",
        range: "min",
        min: 0,
        max: 2770,
        value: 440,
        step: 1,
        slide: function(a, b) {
            window.sliderFreq = sliderPosToFreq(b.value);
            window.freqReadout.update();
            updateAriaValue();
            window.noteSelector.updateFromFreq();
            tones.current.setFreq(window.sliderFreq)
        },
        stop: function(a, b) {}
    });
    $("#volume-slider").slider({
        orientation: "horizontal",
        range: "min",
        min: 0,
        max: 100,
        value: 100,
        step: 1,
        slide: function(a, b) {
            window.volume = b.value / 100;
            $("#volume-readout").html(formatPercent(window.volume));
            tones.current.setVolume(window.volume)
        },
        stop: function(a, b) {}
    });
    window.sliderHandle = document.querySelector("#slider .ui-slider-handle");
    sliderHandle && (sliderHandle.tabIndex = 20,
        sliderHandle.setAttribute("role", "slider"));
    if (a = document.querySelector("#volume-slider .ui-slider-handle"))
        a.tabIndex = 30;
    window.playButton = document.getElementById("play-button");
    window.playButton.onclick = onPlayButtonClick;
    new UpDownButton("freq-up-button",function() {
            window.changeFreqBy1Hz(1)
        }
    );
    new UpDownButton("freq-down-button",function() {
            window.changeFreqBy1Hz(-1)
        }
    );
    a = document.getElementById("octave-up-button");
    var b = document.getElementById("octave-down-button");
    a.onclick = function() {
        window.setFreq(2 * window.sliderFreq)
    }
    ;
    b.onclick = function() {
        window.setFreq(window.sliderFreq / 2)
    }
    ;
    window.slider_jq = $("#slider");
    window.freqReadout = new FrequencyReadout("#freq-readout");
    window.playIndicator = new PlayIndicator(document.getElementById("play-indicator"));
    window.balanceControl = new BalanceControl(document.getElementById("balance-control"),window.setBalance);
    window.noteSelector = new NoteSelector(document.getElementById("note-selector"),window.setKey);
    window.waveSelector = new WaveSelector(document.getElementById("wave-selector"),window.setWaveType);
    window.getLinkButton = document.getElementById("get-link");
    window.getLinkButton.onclick = function() {
        getLinkWindow.show(window.getLinkButton)
    }
    ;
    tones.init();
    tones.add();
    setTonePropertiesFromHash();
    window.playButton = document.getElementById("play-button");
    window.playButton.addEventListener("keyup", blockSpaceKeyUp);
    AD_FREE || adUnits.checkIfAdsensePresent()
}
function onLoad() {
    AD_FREE || adUnits.checkIfAdsLoaded()
}
;