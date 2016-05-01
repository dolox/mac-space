#!/usr/bin/osascript

(**
*
* The AppleScript template used to generate the windows for the spaces.
*
* @author Salvatore Garbesi <sal@dolox.com>
* @module applescript/window
*
**)
<% if (window.shellPre) { %>
-- Invoke the pre-shell commmand.
do shell script "<%= window.shellPre.join(';') %>"
<% } %>

<% if (window.osascriptPre) { %>
-- Invoke the pre-osascript.
<%= window.osascriptPre %>
<% } %>

-- Activate the space.
spaceSet(<%= space.space %>)

<% if (window.shell) { %>
-- Invoke the shell commmand.
do shell script "<%= window.shell.join(';') %>"
<% } %>

-- Launch the Application.
tell application "<%= window.application %>" to launch

-- Run the Application.
tell application "<%= window.application %>" to run

-- Set the Application as the top window.
tell application "<%= window.application %>" to activate

-- Set the space again, in the event that the Application acivation changed the space.
spaceSet(<%= space.space %>)

<% if (window.osascript) { %>
-- Invoke the osascript.
<%= window.osascript %>
<% } %>

-- @todo if re-posisition
-- @todo re-size

tell application "System Events"
    set applicationProcess to first process whose name is "<%= window.application %>"
    tell applicationProcess
        tell first window
			try
				-- @todo don't resize if grid disable!!!
           	 set position to {<%= windowPosition.x %>, <%= windowPosition.y %>}
           	 set size to {<%= windowDimensions.width %>, <%= windowDimensions.height %>}
		 end try
        end tell
    end tell
end tell

<% if (window.shellPost) { %>
-- Invoke the post-shell commmand.
do shell script "<%= window.shellPost.join(';') %>"
<% } %>

<% if (window.osascriptPost) { %>
-- Invoke the post-osascript.
<%= window.osascriptPost %>
<% } %>
