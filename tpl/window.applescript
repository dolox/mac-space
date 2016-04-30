#!/usr/bin/osascript

-- @todo cleanup and doc

on openNewSpace()
    tell application "System Events"
        —start mission control
        do shell script "/Applications/Mission\\ Control.app/Contents/MacOS/Mission\\ Control"
        tell process "Dock"
            set countSpaces to count buttons of list 1 of group 1
            --new space
            click button 1 of group 1
            --switch to new space
            repeat until (count buttons of list 1 of group 1) = (countSpaces + 1)
            end repeat
            click button (countSpaces + 1) of list 1 of group 1
        end tell
    end tell
end openNewSpace



on spaceSet(index)
	-- Launch the Mission Control Application.
	do shell script "/Applications/Mission\\ Control.app/Contents/MacOS/Mission\\ Control"
	
	-- Set a slight delay for Mission Control to finish loading.
	delay <%= delay %>
	
	-- Catch any errors.
	try
		-- @todo exaust this listIndexes ??????
		spaceSetIndex(<%= space %>, 1, 1)
		-- on fail loop through and generate each of the spaces before exhausting
	on error
	end try
end spaceSet

on spaceSetIndex(spaceIndex, listIndex, groupIndex)
	tell application "System Events" to click (first button whose value of attribute "AXDescription" is "exit to Desktop " & spaceIndex) of list listIndex of group groupIndex of process "Dock"
end spaceSetIndex

-- Invoke the clients pre-script.
<%= pre %>

-- Set the space.
spaceSet(<%= space %>)

-- Invoke the clients command.
do shell script "<%= command %>"

-- Launch the Application.
tell application "<%= application %>" to launch
tell application "<%= application %>" to run

-- Set the Application as the top window.
tell application "<%= application %>" to activate

-- Set the space again, in the event that the Application acivation changed the space.
spaceSet(<%= space %>)

-- Invoke the clients script.
<%= script %>

tell application "System Events"
    set applicationProcess to first process whose name is "<%= application %>"
    tell applicationProcess
        tell first window
			try
           	 set position to {<%= x %>, <%= y %>}
           	 set size to {<%= width %>, <%= height %>}
		 end try
        end tell
    end tell
end tell
