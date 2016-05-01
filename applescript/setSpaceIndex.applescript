(**
*
* Set the active space on the desktop.
*
* @author Salvatore Garbesi <sal@dolox.com>
* @module applescript/setSpaceIndex
* @param {number} inputIndex The desktop space to change to.
* @param {number} inputListIndex The list space to change to.
* @param {number} inputGroupIndex The group space to change to.
* @returns {undefined} Nothing is returned.
**)
on setSpaceIndex(inputIndex, inputListIndex, inputGroupIndex)
	tell application "System Events" to click (first button whose value of attribute "AXDescription" is "exit to Desktop " & inputIndex) of list inputListIndex of group inputGroupIndex of process "Dock"
end setSpaceIndex
