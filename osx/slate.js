// Configs
S.cfga({
    "defaultToCurrentScreen" : true,
"secondsBetweenRepeat" : 0.1,
"checkDefaultsOnLoad" : true,
"focusCheckWidthMax" : 3000
});

// Monitors
var monLaptop = "1680x1050";
var monTV = "1920x1080";

// Window sizes
var curr80widthInt = 650;
var curr80width = String(curr80widthInt);

// Simple Operations
var currfull = S.op("corner", {
    "direction" : "top-left",
    "width" : "screenSizeX",
    "height": "screenSizeY"
});
var currhalfleft = S.op("corner", {
    "direction" : "top-left",
    "width" : "screenSizeX/2",
    "height": "screenSizeY"
});
var currhalfright = S.op("corner", {
    "direction" : "top-right",
    "width" : "screenSizeX/2",
    "height": "screenSizeY"
});
var curr80left = S.op("corner", {
    "direction" : "top-left",
    "width" : curr80width,
    "height" : "screenSizeY"
});
var curr80right = S.op("corner", {
    "direction" : "top-right",
    "width" : "650",
    "height" : "screenSizeY"
});
var chatContacts = curr80right.dup({"width": "150"})
var chatMain = S.op("move", {
    "x": "screenOriginX+screenSizeX-650",
    "y": "screenOriginY",
    "width": "500",
    "height": "screenSizeY"
})
var currMainLeft = curr80left.dup({"width" : ["screenSizeX-", curr80width].join("") });
var currMainRight = curr80right.dup({
    "width": String(slate.screen().rect().width - curr80widthInt)
});
//({"width" : ["screenSizeX-", curr80width].join("") });

// Toggle operations
var main = true;
var toggleRight = function() {
    if(main) {
        currMainRight.run();
    } else {
        curr80right.run();
    }
    main = !main;
};
var toggleLeft = function() {
    if(main) {
        currMainLeft.run();
    } else {
        curr80left.run();
    }
    main = !main;
};
var fullHeight = S.op("move", {
    "x": "windowTopLeftX",
    "y": "screenOriginY",
    "width": "windowSizeX",
    "height": "screenSizeY"
});
var full = true;
var toggleTop = function() {
    if(full) {
        fullHeight.run();
    } else {
        fullHeight.dup({
            "y": "screenOriginY",
            "height": "screenSizeY/2"
        }).run();
    }
    full = !full;
}
var toggleBottom = function() {
    if(full) {
        fullHeight.run();
    } else {
        fullHeight.dup({
            "y": "screenOriginY+screenSizeY/2",
            "height": "screenSizeY/2"
        }).run();
    }
    full = !full;
}

// Default
var currMain = currMainLeft
var curr80 = curr80right

// common layout hashes
var currMainHash = {
    "operations" : [currMain],
    "ignore-fail" : true,
    "repeat" : true
};
var adiumHash = {
    "operations" : [chatContacts, chatMain],
    "ignore-fail" : true,
    "title-order" : ["Contacts"],
    "repeat-last" : true
};
var mvimHash = {
    "operations" : [curr80left],
    "repeat" : true
};
var previewHash = {
    "operations": [currMainRight],
    "ignore-fail" : true,
    "repeat" : true
}
var iTermHash = {
    "operations" : [curr80],
    "sort-title" : true,
    "repeat-last" : true
};

// 2 monitor layout
var twoMonitorLayout = S.lay("twoMonitor", {
    "Adium" : adiumHash,
    "MacVim" : mvimHash,
    "Skim": previewHash,
    "iTerm" : iTermHash,
    "Google Chrome" : currMainHash,
    "Firefox" : currMainHash,
    "Safari" : currMainHash,
});

// 1 monitor layout
var oneMonitorLayout = S.lay("oneMonitor", {
    "Adium" : adiumHash,
    "MacVim" : mvimHash,
    "Skim": previewHash,
    "iTerm" : iTermHash,
    "Google Chrome" : currMainHash,
    "Firefox" : currMainHash,
    "Safari" : currMainHash,
    //"Mail": currMainHash,
});

// Defaults
S.def([monTV, monLaptop], twoMonitorLayout);
S.def([monLaptop], oneMonitorLayout);

// Layout Operations
var twoMonitor = S.op("layout", { "name" : twoMonitorLayout });
var oneMonitor = S.op("layout", { "name" : oneMonitorLayout });
var universalLayout = function() {
    // Should probably make sure the resolutions match but w/e
    if (S.screenCount() === 3) {
        threeMonitor.run();
    } else if (S.screenCount() === 2) {
        twoMonitor.run();
    } else if (S.screenCount() === 1) {
        oneMonitor.run();
    }
};

// Batch bind everything. Less typing.
S.bnda({
    // Layout Bindings
    "return:ctrl,alt" : universalLayout,
    "space:ctrl;alt" : universalLayout,
    "f:ctrl,alt" : currfull,
    "right:ctrl,alt" : toggleRight,
    "left:ctrl,alt" : toggleLeft,
    "right:ctrl,alt,shift" : currhalfright,
    "left:ctrl,alt,shift" : currhalfleft,
    "up:ctrl,alt" : toggleTop,
    "down:ctrl,alt" : toggleBottom,

    // Window Hints
    "esc:cmd" : S.op("hint"),

    // Grid
    "esc:ctrl,alt" : S.op("grid")
});

// Log that we're done configuring
S.log("[SLATE] -------------- Finished Loading Config --------------");

