(**
*
* Set the active space on the desktop.
*
* @author Salvatore Garbesi <sal@dolox.com>
* @method setSpace
* @param {number} inputDelay The delay between opening Mission Control and switching desktops.
* @param {number} inputIndex The desktop space to change to.
* @returns {undefined} Nothing is returned.
*
**)
on setSpace(inputDelay, inputIndex)
	-- Launch the Mission Control Application.
	do shell script "/Applications/Mission\\ Control.app/Contents/MacOS/Mission\\ Control"
	
	-- Set a slight delay for Mission Control to finish loading.
	delay inputDelay
	
	-- Catch any errors.
	try
		-- Attempt to set the active space.
		setSpaceIndex(inputIndex, 1, 1)
	end try
end setSpace
