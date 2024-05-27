studio.menu.addMenuItem({
    name: "Create Loop",
    isEnabled: function(){
        return studio.window.browserCurrent() !== undefined;
    },
    execute: function() { 
        files = {}
        createdEvents = 0;

        // get selected assets
        files = studio.window.browserSelection();
        
        // cycle through selection
        for(i = 0; i < files.length; i++){
            file = files[i];

            // if it's an audio file
            if (file != null && file.entity == "AudioFile"){

                fileLength = file.length;
                // get file name and remove .wav extension
                fileName = file.getAssetPath().split('/').pop();
                fileName = fileName.split('.').shift();

                // create event
                loopEvent = studio.project.create("Event");
                loopEvent.name = fileName;
                loopEvent.folder = studio.project.workspace.masterEventFolder;
                
                // create single instrument, set random start offset and set loop region
                loopTrack = loopEvent.addGroupTrack("Loop");
                instrument = loopTrack.addSound(loopEvent.timeline, 'SingleSound', 0, fileLength);
                instrument.audioFile = file;
                instrument.looping = true;
                instrument.startOffset = 50;
                RndModulator = instrument.addModulator("RandomizerModulator", "startOffset");
                RndModulator.amount = 100;
                markerTrack = loopEvent.markerTracks[0];
                region = markerTrack.addRegion(0, fileLength, "", 1);

                // count number of created events
                createdEvents +=1 ; 
            }

        }
        
        // print number of created events
        if(createdEvents > 0){
            alert(createdEvents + " event(s) created")
        }
        else{
            alert("No audio file selected");
        }
        
    },
    keySequence: "Ctrl+Q",
});

