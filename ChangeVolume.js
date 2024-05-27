studio.menu.addMenuItem({
    name: "Increase Mixer Volume",
    isEnabled: function () {
        return studio.window.browserCurrent() !== undefined;
    },
    execute: function () {

        //function findEventsRecursively(items, filter) {
        //    var result = [];
        //    items.forEach(function (item) {
        //        if (item.isOfExactType("Event")) {
        //            result.push(item);
        //        }
        //        if (item.isOfType("Folder")) {
        //            result = result.concat(findEventsRecursively(item.items));
        //        }
        //    });
        //    return result;
        //}

        /*var selectedEvents = studio.window.browserCurrent().selection;*/
        function IncreaseVolumeOnEvents(widget, commit) {
            var findValue = widget.findWidget("m_VolumeValue").value();

            var allEvents = studio.window.browserSelection();
            if (commit) {
                

                if (allEvents.length > 0) {
                    
                    allEvents.forEach(function (event) {
                        //console.log("nombre event");
                        event.groupTracks.forEach(function (track) {
                            //console.log("findvalue " + track.mixerGroup.volume);
                            track.mixerGroup.volume += findValue;
                                
                        });
                    });


                }
            }
            
        }

        studio.ui.showModalDialog({
            windowTitle: "Increase Volume",
            widgetType: studio.ui.widgetType.Layout,
            layout: studio.ui.layoutType.VBoxLayout,
            items: [
                { widgetType: studio.ui.widgetType.Label, text: "VolumeAmount" },
                {
                    widgetType: studio.ui.widgetType.Layout,
                    layout: studio.ui.layoutType.VBoxLayout,
                    contentsMargins: { top: 0, bottom: 6, },
                    items: [
                        {
                            widgetType: studio.ui.widgetType.SpinBox,
                            widgetId: "m_VolumeValue",
                            value : 0,
                            range: {minimum :0, maximum : 5},
                            onValueChanged: function () { IncreaseVolumeOnEvents(this); },
                        },
                    ],
                },
                {
                    widgetType: studio.ui.widgetType.Layout,
                    layout: studio.ui.layoutType.HBoxLayout,
                    contentsMargins: { left: 0, top: 12, right: 0, bottom: 0 },
                    items: [
                        { widgetType: studio.ui.widgetType.Spacer, sizePolicy: { horizontalPolicy: studio.ui.sizePolicy.MinimumExpanding } },
                        { widgetType: studio.ui.widgetType.PushButton, text: "Apply", onClicked: function () { IncreaseVolumeOnEvents(this, true); this.closeDialog(); } },
                    ],
                },

            ],
        });
    },
});


