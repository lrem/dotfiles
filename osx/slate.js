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
var lap80width = "650";

// Operations
var lap80left = S.op("corner", {
    "screen" : monLaptop,
    "direction" : "top-left",
    "width" : lap80width,
    "height" : "screenSizeY"
});
var lap80right = S.op("corner", {
    "screen" : monLaptop,
    "direction" : "top-right",
    "width" : "650",
    "height" : "screenSizeY"
});
var chatContacts = lap80right.dup({"width": "150"})
var chatMain = S.op("move", {
    "x": "screenOriginX+screenSizeX-650",
    "y": "screenOriginY",
    "width": "500",
    "height": "screenSizeY"
})
var lapMainLeft = lap80left.dup({"width" : ["screenSizeX-", lap80width].join("") });
var lapMainRight = lap80right.dup({"width": "1030"});
//({"width" : ["screenSizeX-", lap80width].join("") });

// Toggle operations
var main = true;
var toggleRight = function() {
    if(main) {
        lapMainRight.run();
    } else {
        lap80right.run();
    }
    main = !main;
};
var toggleLeft = function() {
    if(main) {
        lapMainLeft.run();
    } else {
        lap80left.run();
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
var lapMain = lapMainLeft
var lap80 = lap80right

// common layout hashes
var lapMainHash = {
    "operations" : [lapMain],
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
    "operations" : [lap80left],
    "repeat" : true
};
var previewHash = {
    "operations": [lapMainRight],
    "ignore-fail" : true,
    "repeat" : true
}
var iTermHash = {
    "operations" : [lap80],
    "sort-title" : true,
    "repeat-last" : true
};

/*
// 2 monitor layout
var twoMonitorLayout = S.lay("twoMonitor", {
"Adium" : adiumHash,
"MacVim" : mvimHash,
"iTerm" : iTermHash,
"Google Chrome" : lapMainHash,
"Xcode" : {
"operations" : [tboltTop, lapMain],
"main-first" : true,
"repeat-last" : true
},
"Flex Builder" : tboltTopHash,
"GitX" : lapMainHash,
"Ooyala Player Debug Console" : lapMainHash,
"Firefox" : lapMainHash,
"Safari" : lapMainHash,
"Eclipse" : tboltTopHash,
"Spotify" : lapMainHash
});
*/

// 1 monitor layout
var oneMonitorLayout = S.lay("oneMonitor", {
    "Adium" : adiumHash,
    "MacVim" : mvimHash,
    "Skim": previewHash,
    "iTerm" : iTermHash,
    "Google Chrome" : lapMainHash,
    "Firefox" : lapMainHash,
    "Safari" : lapMainHash,
    //"Mail": lapMainHash,
});

// Defaults
//S.def([monTV, monLaptop], twoMonitorLayout);
S.def([monLaptop], oneMonitorLayout);

// Layout Operations
//var threeMonitor = S.op("layout", { "name" : threeMonitorLayout });
//var twoMonitor = S.op("layout", { "name" : twoMonitorLayout });
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
    //"padEnter:ctrl" : universalLayout,
    "space:ctrl;alt" : universalLayout,
    "right:ctrl,alt" : toggleRight,
    "left:ctrl,alt" : toggleLeft,
    "up:ctrl,alt" : toggleTop,
    "down:ctrl,alt" : toggleBottom,


    // Throw Bindings
    // NOTE: some of these may *not* work if you have not removed the expose/spaces/mission control bindings
    /*
       "pad1:ctrl;alt" : S.op("throw", { "screen" : "2", "width" : "screenSizeX", "height" : "screenSizeY" }),
       "pad2:ctrl;alt" : S.op("throw", { "screen" : "1", "width" : "screenSizeX", "height" : "screenSizeY" }),
       "pad3:ctrl;alt" : S.op("throw", { "screen" : "0", "width" : "screenSizeX", "height" : "screenSizeY" }),
       "right:ctrl;alt;cmd" : S.op("throw", { "screen" : "right", "width" : "screenSizeX", "height" : "screenSizeY" }),
       "left:ctrl;alt;cmd" : S.op("throw", { "screen" : "left", "width" : "screenSizeX", "height" : "screenSizeY" }),
       "up:ctrl;alt;cmd" : S.op("throw", { "screen" : "up", "width" : "screenSizeX", "height" : "screenSizeY" }),
       "down:ctrl;alt;cmd" : S.op("throw", { "screen" : "down", "width" : "screenSizeX", "height" : "screenSizeY" }),
       */

    // Focus Bindings
    // NOTE: some of these may *not* work if you have not removed the expose/spaces/mission control bindings
    /*
       "right:cmd" : S.op("focus", { "direction" : "right" }),
       "left:cmd" : S.op("focus", { "direction" : "left" }),
       "up:cmd" : S.op("focus", { "direction" : "up" }),
       "down:cmd" : S.op("focus", { "direction" : "down" }),
       "up:cmd;alt" : S.op("focus", { "direction" : "behind" }),
       "down:cmd;alt" : S.op("focus", { "direction" : "behind" }),
       */

    // Window Hints
    "esc:cmd" : S.op("hint"),

    // Switch currently doesn't work well so I'm commenting it out until I fix it.
    //"tab:cmd" : S.op("switch"),

    // Grid
    "esc:ctrl" : S.op("grid")
});

// Log that we're done configuring
S.log("[SLATE] -------------- Finished Loading Config --------------");

