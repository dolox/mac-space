# mac-space

Automate spaces on Mac OS X.

---

## Dependencies

- Max OS X >= 10.11

- Node >= 4.2

---

## Installation

```bash
npm install -g mac-space-maker;
```

---

## Commands

- **Help:** `mac-space-maker --help`

- **Start:** `mac-space-maker --config /path/to/config.json`

---

## Configuration

*See [](./config/example.json) for a sample configuration.*

### System Preferences

The following settings are recommended. Be forewarned that using any other configuration may cause issues.

You can access these settings through `System Preferences -> Mission Control`.

![Mac OS X Mission Control System Preferences](https://raw.githubusercontent.com/dolox/mac-space/master/docs/img/system-preferences-mission-control.png)

### Variables

The application expects the following configuration in a valid JSON format.

|---------------------------------------------------------------------------------------------------------------------------------|
| Key                            | Type         | Default | Required | Description                                                |
|--------------------------------|--------------|---------|----------|------------------------------------------------------------|
| delay |                        | Number       | 0.5     | No       | The delay between launching windows.                       |
| space |                        | Array/Object | []      | No       | The configuration for the space.                           |
|       | column |               | Object       | {}      | No       | The grid columns configuration.                            |
|       |        | max           | Number       | 2       | No       | The maximum number of columns to allow.                    |
|       |        | spacing       | Number       | 0       | No       | The number of pixels to space the columns with.            |
|       | row    |               | Object       | {}      | No       | The grid rows configuration.                               |
|       |        | max           | Number       | 2       | No       | The maximum number of rows to allow.                       |
|       |        | spacing       | Number       | 0       | No       | The number of pixels to space the rows with.               |
|       | space  |               | Number       | 1       | No       | The Mac OS X space to assign the windows to.               |
|       | window |               | Array/Object | []      | No       | The configuration for each of the windows for the space.   |
|       |        | application   | String       |         | Yes      | The name of the application recognizable by AppleScript.   |
|       |        | osascriptPost | Array/String |         | No       | Invoke OSA commands after the window has launched.         |
|       |        | osascriptPre  | Array/String |         | No       | Invoke OSA commands before the window has launched.        |
|       |        | osascript     | Array/String |         | No       | Invoke OSA commands to assist with launching the window.   |
|       |        | shellPost     | Array/String |         | No       | Invoke shell commands after the window has launched.       |
|       |        | shellPre      | Array/String |         | No       | Invoke shell commands before the window has launched.      |
|       |        | shell         | Array/String |         | No       | Invoke shell commands to assist with launching the window. |
|       |        | title         | String       |         | No       | The title for the window.                                  |
|---------------------------------------------------------------------------------------------------------------------------------|

### Notes

- **Application:** The `space.window.application` field *usually* expects the name of the Application that lives in your `/Application/` folder. For example if you wanted to launch Mac OS X's native text application, then the value would be `TextEdit`.

- **Delay:** You may need to adjust the delay depending on the speed of your system.

- **Disabling Grid/Resizing/Moving:** Set the maximum number of columns and row to `0` to disable resizing and moving of windows. Doing this will simply assign the window to a specific space.

---

## Development

- **Help:** `npm run help`

- **Start:** `npm run start -- --config /path/to/config.json`

- **Test:** `npm run test`

---

## Known Issues

- **Resizing Problems:** Some OS X applications simply don't support resizing of their windows, and there's not much that can be done about this. If you have an idea or working example, please feel free to create a new issue or make a pull request.

- **Moving Windows Across Spaces:** Unfortunately this can't be done either without some major hacking. If you're able to achieve a working illustration please make a pull request. A work around is to simply close the window in question, then allow the application to re-open it in the space desired.

---

Copyright (c) 2016 Dolox, Inc. All rights reserved.
