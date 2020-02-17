# Auto-mount script for Linux

## Usage

```bash
sudo cp 99-scale-interface.rules /etc/udev/rules.d/
sudo cp scale_interface_automount@.service /etc/systemd/system/

sudo systemctl enable scale_interface_automount@.service
systemctl status scale_interface_automount@.service
```


---

Udev rules and systemd service written in /automount project directory to detect
a valid scale interface USB device at /dev and mount this device to
/media/scale_interface_mountpoint. This mountpoint will be created and destroyed
automatically, so if it exists, the program can assume a valid USB device is
attached. The locations of where these two files should be saved to in the
Raspberry Pi's filesystem is documented as a comment at the top of each file.
