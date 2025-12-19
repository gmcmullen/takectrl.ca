# Site Cleanup - December 19, 2025

## Completed

### Files Deleted
- Removed entire `_about/` folder (contained outdated placeholder pages superseded by `pages/` folder)
  - `_about/mission.md`
  - `_about/contact.md`
  - `_about/support.md`
- Removed all `.DS_Store` files (macOS system files)
  - Root, files/, fonts/, _data/, and subdirectories
- Removed `_posts/2025-03-26-rcmp-ai-tools-foi.md` (incomplete draft with no content)

### Files Fixed
- Fixed typo in `pages/mission.md` (line 26: "usd" → "used")
- Fixed typo in `_projects/public-private-data.md` (line 8: missing space in heading)
- Cleaned up `.gitignore` (removed duplicate entries)

## Remaining Issues

### `pages/contact.md`
Currently only has a header with no actual contact information. Contact info is already displayed in the site sidebar ("info [at] takectrl.ca"), so this page may be redundant.

**Options:**
- Add full contact form/information
- Delete the file (contact info is in sidebar)

### `pages/support.md`
Has minimal content (one line) with no actionable donation/support information.

**Options:**
- Expand with actual donation links/methods
- Keep as placeholder for future development
- Delete if not planning to add support options soon
