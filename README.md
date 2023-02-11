# gd-ed
> THIS IS UNFINISHED

Google Drive (Encrypted) Enterprise Drive (Cloning)

## Description
gd-ed is a self-hostable tool to clone Google Drive links to an Enterprise Drive, and let the user clone it to their own drive folder or download it directly from the site.

## Demo
N/A, soon

## Site
There are no official links for gd-ed.

## Self-Hosting
### Requirements
- [Rclone](https://rclone.org/)
- [NodeJS](https://nodejs.dev)
- A shared drive/enterprise drive

### Steps
1. Clone repository
2. Install npm packages
3. Create drive remote for rclone
4. Create crypt remote for drive remote
5. Configure .env accordingly
6. `npm run build`
7. Run `index.js` file in the build folder
8. Run `rclone rcd --rc-user <username> --rc-pass <password> --rc-serve` in a separate terminal
9. Run `rclone cmount crypt: Y: --vfs-cache-mode full --vfs-cache-max-size 5G --dir-cache-time 10s` in a separate terminal
