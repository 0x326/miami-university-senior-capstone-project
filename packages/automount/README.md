# Auto-mount script for Linux

## Usage

```bash
sudo cp 99-scale-interface.rules /etc/udev/rules.d/
sudo cp scale_interface_automount@.service /etc/systemd/system/

sudo systemctl enable scale_interface_automount@.service
systemctl status scale_interface_automount@.service
```

## Details

Detects new USB devices in `/dev` and mounts them to `/media/scale_interface_mountpoint`.
(Note: This currently only supports one USB device at a time).

The mount directory (`/media/scale_interface_mountpoint`) will be removed on unmount.
